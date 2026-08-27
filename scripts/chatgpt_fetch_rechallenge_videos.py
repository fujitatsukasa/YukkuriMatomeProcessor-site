from __future__ import annotations

import csv
import hashlib
import json
import re
import subprocess
import sys
from pathlib import Path

import requests
import urllib3

urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

ROOT = Path('video_output')
VIDEOS = ROOT / 'videos'
FRAMES = ROOT / 'frames'
META = ROOT / 'meta'
for directory in (VIDEOS, FRAMES, META):
    directory.mkdir(parents=True, exist_ok=True)

UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/151 Safari/537.36'
SESSION = requests.Session()
SESSION.headers.update({'User-Agent': UA, 'Accept-Language': 'ja,en-US;q=0.8,en;q=0.6'})
SESSION.verify = False

VIDEO_IDS = {
    'Anr15FA9OCI': ('TBS NEWS DIG', '自殺対策NPOへの返還命令報道'),
    '7cM99k7Q8So': ('FNNプライムオンライン', '自殺対策NPO不正受給報道'),
}
ARTICLE_URLS = [
    ('テレビ朝日', 'https://news.tv-asahi.co.jp/news_society/articles/000528420.html'),
    ('ABCニュース', 'https://www.asahi.co.jp/webnews/pages/ann_000528420.html'),
    ('TBS NEWS DIG', 'https://newsdig.tbs.co.jp/articles/-/2893309?display=1'),
    ('FNNプライムオンライン', 'https://www.fnn.jp/articles/-/1100503'),
]
rows = []
seen_sha = set()


def sha256_file(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open('rb') as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b''):
            digest.update(chunk)
    return digest.hexdigest()


def valid_video(path: Path) -> bool:
    if not path.exists() or path.stat().st_size < 200000:
        return False
    completed = subprocess.run(
        ['ffprobe', '-v', 'error', '-show_entries', 'stream=codec_type,width,height', '-of', 'json', str(path)],
        capture_output=True,
        text=True,
    )
    if completed.returncode != 0:
        return False
    try:
        data = json.loads(completed.stdout)
        return any(stream.get('codec_type') == 'video' for stream in data.get('streams', []))
    except Exception:
        return False


def normalise_video(path: Path, output: Path) -> bool:
    completed = subprocess.run(['ffmpeg', '-y', '-i', str(path), '-c', 'copy', str(output)], capture_output=True, text=True, timeout=600)
    if completed.returncode == 0 and valid_video(output):
        return True
    completed = subprocess.run(
        ['ffmpeg', '-y', '-i', str(path), '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '22', '-c:a', 'aac', '-b:a', '128k', str(output)],
        capture_output=True,
        text=True,
        timeout=900,
    )
    return completed.returncode == 0 and valid_video(output)


def download_stream(url: str, path: Path, headers=None) -> bool:
    try:
        with SESSION.get(url, headers=headers or {}, stream=True, timeout=45, allow_redirects=True) as response:
            if response.status_code != 200:
                return False
            with path.open('wb') as handle:
                for chunk in response.iter_content(1024 * 1024):
                    if chunk:
                        handle.write(chunk)
        return path.exists() and path.stat().st_size > 200000
    except Exception:
        return False


def extract_frames(path: Path, prefix: str, source_url: str) -> None:
    try:
        completed = subprocess.run(
            ['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'default=nw=1:nk=1', str(path)],
            capture_output=True,
            text=True,
            timeout=30,
        )
        duration = float(completed.stdout.strip() or 60)
    except Exception:
        duration = 60
    for index in range(1, 9):
        stamp = max(0.2, duration * index / 9)
        output = FRAMES / f'{prefix}_frame_{index:02d}_{stamp:06.2f}s.jpg'
        completed = subprocess.run(
            ['ffmpeg', '-y', '-ss', f'{stamp:.2f}', '-i', str(path), '-frames:v', '1', '-q:v', '2', str(output)],
            capture_output=True,
            text=True,
            timeout=90,
        )
        if completed.returncode != 0:
            output.unlink(missing_ok=True)


def save_final(video_id: str, source: str, method: str, candidate: Path, source_url: str) -> Path | None:
    output = VIDEOS / f'{video_id}_{source.replace(" ", "_")}.mp4'
    if candidate.suffix.lower() == '.mp4' and valid_video(candidate):
        candidate.replace(output)
    else:
        if not normalise_video(candidate, output):
            candidate.unlink(missing_ok=True)
            return None
        candidate.unlink(missing_ok=True)
    digest = sha256_file(output)
    if digest in seen_sha:
        output.unlink(missing_ok=True)
        return None
    seen_sha.add(digest)
    rows.append(
        {
            'video_id': video_id,
            'source': source,
            'method': method,
            'source_url': source_url,
            'file': str(output),
            'sha256': digest,
            'bytes': output.stat().st_size,
            'status': 'SAVED',
        }
    )
    extract_frames(output, video_id or source, source_url)
    return output


def try_ytdlp(video_id: str, source: str) -> Path | None:
    clients = ['web_embedded', 'tv_embedded', 'android_vr', 'mweb', 'ios', 'android']
    for client in clients:
        template = str(VIDEOS / f'tmp_{video_id}_{client}.%(ext)s')
        command = [
            sys.executable,
            '-m',
            'yt_dlp',
            '--no-playlist',
            '--retries',
            '2',
            '--fragment-retries',
            '2',
            '--js-runtimes',
            'node',
            '--extractor-args',
            f'youtube:player_client={client}',
            '-f',
            'best[height<=720]/best',
            '--merge-output-format',
            'mp4',
            '-o',
            template,
            f'https://www.youtube.com/watch?v={video_id}',
        ]
        try:
            completed = subprocess.run(command, capture_output=True, text=True, timeout=500)
        except Exception as exc:
            rows.append({'video_id': video_id, 'source': source, 'method': 'yt-dlp ' + client, 'source_url': f'https://www.youtube.com/watch?v={video_id}', 'status': 'ERROR', 'note': repr(exc)})
            continue
        candidates = [
            path
            for path in VIDEOS.glob(f'tmp_{video_id}_{client}.*')
            if path.suffix.lower() in {'.mp4', '.webm', '.mkv', '.m4v', '.mov'}
        ]
        for path in candidates:
            if valid_video(path):
                return save_final(video_id, source, 'yt-dlp ' + client, path, f'https://www.youtube.com/watch?v={video_id}')
            path.unlink(missing_ok=True)
        rows.append(
            {
                'video_id': video_id,
                'source': source,
                'method': 'yt-dlp ' + client,
                'source_url': f'https://www.youtube.com/watch?v={video_id}',
                'status': 'FAILED',
                'note': (completed.stderr or completed.stdout)[-500:],
            }
        )
    return None


def choose_best_stream(items):
    if not isinstance(items, list):
        return None
    combined = [item for item in items if isinstance(item, dict) and not item.get('videoOnly') and item.get('url')]
    if combined:
        def score(item):
            try:
                height = int(item.get('height') or 0)
            except Exception:
                height = 0
            return (height <= 720, height, item.get('bitrate') or 0)
        under = [item for item in combined if int(item.get('height') or 0) <= 720]
        return max(under or combined, key=score)
    return None


def try_piped(video_id: str, source: str) -> Path | None:
    bases = [
        'https://pipedapi.kavin.rocks',
        'https://pipedapi.adminforge.de',
        'https://pipedapi.reallyaweso.me',
        'https://pipedapi.leptons.xyz',
        'https://pipedapi.privacy.com.de',
        'https://pipedapi.r4fo.com',
    ]
    for base in bases:
        api = f'{base}/streams/{video_id}'
        try:
            response = SESSION.get(api, timeout=25)
            if response.status_code != 200:
                rows.append({'video_id': video_id, 'source': source, 'method': 'piped', 'source_url': api, 'status': f'HTTP_{response.status_code}'})
                continue
            data = response.json()
            stream = choose_best_stream(data.get('videoStreams'))
            if stream:
                temporary = VIDEOS / f'tmp_{video_id}_piped.mp4'
                if download_stream(stream['url'], temporary, headers={'Referer': 'https://piped.video/'}):
                    final = save_final(video_id, source, 'piped', temporary, api)
                    if final:
                        return final
            videos = [item for item in data.get('videoStreams', []) if isinstance(item, dict) and item.get('videoOnly') and item.get('url')]
            audios = [item for item in data.get('audioStreams', []) if isinstance(item, dict) and item.get('url')]
            videos = [item for item in videos if int(item.get('height') or 0) <= 720] or videos
            if videos and audios:
                video_stream = max(videos, key=lambda item: (int(item.get('height') or 0), int(item.get('bitrate') or 0)))
                audio_stream = max(audios, key=lambda item: int(item.get('bitrate') or 0))
                video_temp = VIDEOS / f'tmp_{video_id}_piped_video.bin'
                audio_temp = VIDEOS / f'tmp_{video_id}_piped_audio.bin'
                merged = VIDEOS / f'tmp_{video_id}_piped_merged.mp4'
                if download_stream(video_stream['url'], video_temp, headers={'Referer': 'https://piped.video/'}) and download_stream(audio_stream['url'], audio_temp, headers={'Referer': 'https://piped.video/'}):
                    completed = subprocess.run(['ffmpeg', '-y', '-i', str(video_temp), '-i', str(audio_temp), '-c', 'copy', str(merged)], capture_output=True, text=True, timeout=600)
                    video_temp.unlink(missing_ok=True)
                    audio_temp.unlink(missing_ok=True)
                    if completed.returncode == 0 and valid_video(merged):
                        final = save_final(video_id, source, 'piped adaptive', merged, api)
                        if final:
                            return final
                video_temp.unlink(missing_ok=True)
                audio_temp.unlink(missing_ok=True)
                merged.unlink(missing_ok=True)
        except Exception as exc:
            rows.append({'video_id': video_id, 'source': source, 'method': 'piped', 'source_url': api, 'status': 'ERROR', 'note': repr(exc)[:300]})
    return None


def get_invidious_instances():
    instances = []
    try:
        response = SESSION.get('https://api.invidious.io/instances.json?sort_by=health', timeout=25)
        if response.status_code == 200:
            for host, information in response.json():
                if isinstance(information, dict) and information.get('api') and information.get('type') == 'https':
                    instances.append('https://' + host)
    except Exception:
        pass
    instances += ['https://inv.nadeko.net', 'https://invidious.nerdvpn.de', 'https://yewtu.be', 'https://inv.us.projectsegfau.lt']
    return list(dict.fromkeys(instances))[:20]


def try_invidious(video_id: str, source: str) -> Path | None:
    for base in get_invidious_instances():
        api = f'{base}/api/v1/videos/{video_id}'
        try:
            response = SESSION.get(api, timeout=25)
            if response.status_code != 200:
                continue
            data = response.json()
            formats = data.get('formatStreams') or []
            candidates = []
            for item in formats:
                if item.get('url'):
                    match = re.search(r'(\d+)', str(item.get('qualityLabel') or item.get('quality') or ''))
                    height = int(match.group(1)) if match else 0
                    candidates.append((height, item))
            under = [item for height, item in candidates if height <= 720]
            if candidates:
                stream = max(under or [item for _, item in candidates], key=lambda item: int(re.search(r'(\d+)', str(item.get('qualityLabel') or item.get('quality') or '0')).group(1)) if re.search(r'(\d+)', str(item.get('qualityLabel') or item.get('quality') or '0')) else 0)
                temporary = VIDEOS / f'tmp_{video_id}_invidious.mp4'
                if download_stream(stream['url'], temporary, headers={'Referer': base + '/'}):
                    final = save_final(video_id, source, 'invidious', temporary, api)
                    if final:
                        return final
        except Exception as exc:
            rows.append({'video_id': video_id, 'source': source, 'method': 'invidious', 'source_url': api, 'status': 'ERROR', 'note': repr(exc)[:300]})
    return None


def discover_article_streams():
    found = []
    for source, url in ARTICLE_URLS:
        try:
            response = SESSION.get(url, timeout=35)
            text = response.text.replace('\\/', '/')
            ids = re.findall(r'(?:youtube\.com/(?:embed|watch\?v=)|youtu\.be/)([A-Za-z0-9_-]{11})', text)
            for video_id in ids:
                VIDEO_IDS.setdefault(video_id, (source, '記事埋め込み動画'))
            urls = re.findall(r'https?://[^"\'<>\s]+?\.m3u8(?:\?[^"\'<>\s]*)?', text, re.I)
            urls += re.findall(r'https?://[^"\'<>\s]+?\.(?:mp4|m4v)(?:\?[^"\'<>\s]*)?', text, re.I)
            for stream in dict.fromkeys(urls):
                found.append((source, url, stream))
        except Exception as exc:
            rows.append({'video_id': '', 'source': source, 'method': 'article parse', 'source_url': url, 'status': 'ERROR', 'note': repr(exc)[:300]})
    return found


def try_article_stream(source: str, page_url: str, stream_url: str, index: int) -> Path | None:
    output = VIDEOS / f'article_{index:02d}_{source.replace(" ", "_")}.mp4'
    try:
        if '.m3u8' in stream_url:
            completed = subprocess.run(
                ['ffmpeg', '-y', '-headers', f'User-Agent: {UA}\r\nReferer: {page_url}\r\n', '-i', stream_url, '-c', 'copy', str(output)],
                capture_output=True,
                text=True,
                timeout=900,
            )
            if completed.returncode != 0:
                output.unlink(missing_ok=True)
                return None
        else:
            temporary = VIDEOS / f'article_{index:02d}.bin'
            if not download_stream(stream_url, temporary, headers={'Referer': page_url}):
                return None
            if not normalise_video(temporary, output):
                temporary.unlink(missing_ok=True)
                output.unlink(missing_ok=True)
                return None
            temporary.unlink(missing_ok=True)
        if not valid_video(output):
            output.unlink(missing_ok=True)
            return None
        digest = sha256_file(output)
        if digest in seen_sha:
            output.unlink(missing_ok=True)
            return None
        seen_sha.add(digest)
        rows.append({'video_id': '', 'source': source, 'method': 'article direct stream', 'source_url': stream_url, 'file': str(output), 'sha256': digest, 'bytes': output.stat().st_size, 'status': 'SAVED'})
        extract_frames(output, f'article{index}', page_url)
        return output
    except Exception as exc:
        rows.append({'video_id': '', 'source': source, 'method': 'article direct stream', 'source_url': stream_url, 'status': 'ERROR', 'note': repr(exc)[:300]})
        output.unlink(missing_ok=True)
        return None


def write_rows() -> None:
    fields = []
    for row in rows:
        for key in row:
            if key not in fields:
                fields.append(key)
    if not fields:
        fields = ['status']
        data = [{'status': 'NO_ROWS'}]
    else:
        data = rows
    with (META / 'video_fetch.csv').open('w', encoding='utf-8-sig', newline='') as handle:
        writer = csv.DictWriter(handle, fieldnames=fields, extrasaction='ignore')
        writer.writeheader()
        writer.writerows(data)
    summary = {
        'saved_videos': len(list(VIDEOS.glob('*.mp4'))),
        'frames': len(list(FRAMES.glob('*.jpg'))),
        'attempt_rows': len(rows),
    }
    (META / 'summary.json').write_text(json.dumps(summary, ensure_ascii=False, indent=2), encoding='utf-8')
    print(json.dumps(summary, ensure_ascii=False))


def main() -> None:
    streams = discover_article_streams()
    for video_id, (source, description) in list(VIDEO_IDS.items()):
        if try_ytdlp(video_id, source):
            continue
        if try_piped(video_id, source):
            continue
        try_invidious(video_id, source)
    for index, (source, page, stream) in enumerate(streams, 1):
        try_article_stream(source, page, stream, index)
    write_rows()


if __name__ == '__main__':
    try:
        main()
    except Exception as exc:
        rows.append({'status': 'TOP_ERROR', 'note': repr(exc)})
        write_rows()
        sys.exit(0)
