from __future__ import annotations

import concurrent.futures as cf
import csv
import hashlib
import html
import json
import mimetypes
import re
import subprocess
import sys
import time
from datetime import datetime, timezone, timedelta
from pathlib import Path
from urllib.parse import quote_plus, unquote, urljoin, urlparse

import requests
from bs4 import BeautifulSoup
from PIL import Image

ROOT = Path('output')
RAW = ROOT / 'raw'
PDF_DIR = ROOT / 'pdf_pages'
VIDEOS = ROOT / 'videos'
FRAMES = ROOT / 'video_frames'
META = ROOT / 'meta'
for d in (RAW, PDF_DIR, VIDEOS, FRAMES, META):
    d.mkdir(parents=True, exist_ok=True)

JST = timezone(timedelta(hours=9))
UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/151 Safari/537.36'
SESSION = requests.Session()
SESSION.headers.update({'User-Agent': UA, 'Accept-Language': 'ja,en-US;q=0.7,en;q=0.5'})
TIMEOUT = 35

TARGETS = {
    'T001': ('NPO法人再チャレンジ東京', '再チャレンジ東京 NPO 法人 平林朋紀'),
    'T002': ('代表者・関係者', '平林朋紀 高谷秀司 再チャレンジ東京'),
    'T003': ('東京都・保健医療局', '東京都 保健医療局 自殺対策 補助事業'),
    'T004': ('交付決定取消し・返還命令', '再チャレンジ東京 交付決定 取消し 返還命令 3779万円'),
    'T005': ('年度別金額・通知日', '再チャレンジ東京 4893万9000円 3779万3000円 2025年8月28日'),
    'T006': ('補助制度・交付要綱', '東京都 地域自殺対策強化補助事業 交付要綱 現地調査 立入検査'),
    'T007': ('相談事業・道徳授業', '再チャレンジ東京 対面相談 道徳特別授業 学校'),
    'T008': ('いじめ・自殺防止コンクール', '再チャレンジ東京 いじめ 自殺防止 コンクール 審査発表会'),
    'T009': ('領収書・謝礼・架空実績', '再チャレンジ東京 領収書 偽造 謝礼 水増し 架空相談'),
    'T010': ('現地確認と発覚経緯', '再チャレンジ東京 2025年1月 現地確認 相談員 実績報告'),
    'T011': ('解散・破産・法人情報', '再チャレンジ東京 解散 破産手続 2025年10月29日'),
    'T012': ('警察連携・行政対応', '再チャレンジ東京 新宿警察署 情報提供 東京都'),
    'T013': ('過去活動・出版物・ポスター', '再チャレンジ東京 作文集 ポスター 標語 いじめ 自殺'),
    'T014': ('独立報道・映像', '再チャレンジ東京 補助金 不正受給 2026年8月24日 ニュース'),
}

PAGE_SEEDS = [
    ('T003,T004,T005,T009,T010,T011,T012', '東京都', 'https://www.metro.tokyo.lg.jp/information/press/2026/08/2026082406'),
    ('T003,T006', '東京都保健医療局', 'https://www.hokeniryo.metro.tokyo.lg.jp/kenkou/tokyokaigi/minkandantai'),
    ('T003,T006', '東京都保健医療局', 'https://www.hokeniryo.metro.tokyo.lg.jp/kenkou/tokyokaigi/rinji1/hojojigyoukoubo'),
    ('T003,T006', '東京都保健医療局', 'https://www.hokeniryo.metro.tokyo.lg.jp/kenkou/tokyokaigi/rinji1/hojojigyou'),
    ('T001,T002,T011', '内閣府NPO法人ポータル', 'https://www.npo-homepage.go.jp/npoportal/gyosei-print/013006834'),
    ('T014,T003,T004,T009,T010,T011,T012', 'テレビ朝日', 'https://news.tv-asahi.co.jp/news_society/articles/000528420.html'),
    ('T014,T003,T004,T009,T010,T011,T012', 'ABCニュース', 'https://www.asahi.co.jp/webnews/pages/ann_000528420.html'),
    ('T014,T003,T004,T009,T010,T011,T012', 'NCC長崎文化放送', 'https://www.ncctv.co.jp/news/article/16831490'),
    ('T014,T003,T004,T009,T010,T011,T012', 'TBS NEWS DIG', 'https://newsdig.tbs.co.jp/articles/-/2893309'),
    ('T014,T003,T004,T009,T010,T011,T012', 'ライブドア・TBS', 'https://news.livedoor.com/article/detail/32147654/'),
    ('T014,T003,T004,T009,T010,T011,T012', 'ライブドア・読売', 'https://news.livedoor.com/article/detail/32165265/'),
    ('T014,T003,T004,T009,T010,T011,T012', 'ライブドア・共同', 'https://news.livedoor.com/article/detail/32147099/'),
    ('T014,T003,T004,T009,T010,T011,T012', 'デイリースポーツ・共同', 'https://origin.daily.co.jp/society/national/2026/08/24/0020742605.shtml'),
    ('T001,T002,T007,T008,T013', 'PR TIMES転載・マピオン', 'https://www.mapion.co.jp/news/release/000000008.000104320-all/'),
    ('T007,T008,T013', '山脇美術専門学校', 'https://yamawaki.ac.jp/2025/02/11/ijime-boshi-compe-vd/'),
    ('T007,T008', '大田区立大森第三中学校', 'https://www.ota-school.ed.jp/oomoridai3-js/life/nikki/reiwa6/06060502.html'),
    ('T001,T002,T007,T013', '公明党議員ブログ', 'https://www.komei.or.jp/km/chigasaki-kikuchi-masasuke/2023/08/18/%E5%B4%87%E9%AB%98%E3%81%AA%E5%BE%A1%E6%B4%BB%E5%8B%95%E3%81%AB%E6%B7%B1%E8%AC%9D%E7%94%B3%E3%81%97%E4%B8%8A%E3%81%92%E3%81%BE%E3%81%99%E2%80%BC%EF%B8%8F/'),
    ('T002,T013', 'CCHR Japan', 'https://cchrjapan.org/event20250517/'),
    ('T001,T002,T008,T013', '公明党議員ブログ', 'https://www.komei.or.jp/km/miyajimasaiko/2016/11/27/%E5%AF%A9%E6%9F%BB%E7%99%BA%E8%A1%A8%E4%BC%9A/'),
    ('T008,T013', '登竜門', 'https://compe.japandesign.ne.jp/jigyo-saisei-hyogo-2024/'),
    ('T008,T013', '登竜門', 'https://compe.japandesign.ne.jp/jigyo-saisei-hyogo-2023/'),
    ('T007,T008,T013', '教育家庭新聞', 'https://www.kknews.co.jp/news/20210914yt02'),
    ('T001,T002,T007,T008,T013', 'Dream News転載・マピオン', 'https://www.mapion.co.jp/news/release/dn0000266566-all/'),
    ('T001,T002,T013', '財界オンライン転載・ライブドア', 'https://news.livedoor.com/article/detail/29430284/'),
    ('T013', '誠品オンライン', 'https://www.eslite.com/product/1001357605047277'),
    ('T013', 'HMV', 'https://www.hmv.co.jp/artist_Npo%E6%B3%95%E4%BA%BA%E5%86%8D%E3%83%81%E3%83%A3%E3%83%AC%E3%83%B3%E3%82%B8%E6%9D%B1%E4%BA%AC_000000000841899/item_%E3%81%84%E3%81%98%E3%82%81%E3%83%BB%E8%87%AA%E6%AE%BA%E3%82%B9%E3%83%88%E3%83%83%E3%83%97%E4%BD%9C%E6%96%87%E9%9B%86-%E5%85%A8%E5%9B%BD%E3%80%8C%E3%81%84%E3%81%98%E3%82%81%E3%83%BB%E8%87%AA%E6%AE%BA%E6%92%B2%E6%BB%85%E3%80%8D%E4%BD%9C%E6%96%87%E3%82%B3%E3%83%B3%E3%82%AF%E3%83%BC%E3%83%AB%E5%85%A5%E8%B3%9E%E4%BD%9C%E5%93%81%E3%82%88%E3%82%8A_11033088'),
    ('T001,T013', 'セントラルメディカルクラブ', 'https://central-mc.jp/company/contribution/'),
    ('T001,T007,T008,T013', '旧公式サイト', 'http://www.jigyo-saisei.com/'),
]

DIRECT_SEEDS = [
    ('T003,T004,T014', 'テレビ朝日', 'https://news.tv-asahi.co.jp/articles_img/000528420_1200.jpg'),
    ('T003,T004,T014', 'TBS NEWS DIG', 'https://newsdig.ismcdn.jp/mwimgs/b/3/680mw/img_b3de4030758813d89d40505d7e860b62745746.jpg'),
]

VIDEO_PAGE_URLS = [
    ('T014,T003,T004,T009,T010,T011,T012', 'テレビ朝日', 'https://news.tv-asahi.co.jp/news_society/articles/000528420.html'),
    ('T014,T003,T004,T009,T010,T011,T012', 'ABCニュース', 'https://www.asahi.co.jp/webnews/pages/ann_000528420.html'),
    ('T014,T003,T004,T009,T010,T011,T012', 'TBS NEWS DIG', 'https://newsdig.tbs.co.jp/articles/-/2893309'),
]

YOUTUBE_SEARCHES = [
    '自殺対策事業でNPO法人が補助金を虚偽申請 東京都 約3780万円 返還',
    '自殺防止NPO法人 再チャレンジ東京 補助金 4900万円 取消し 東京都',
]

seen_sha: dict[str, str] = {}
asset_rows: list[dict] = []
page_rows: list[dict] = []
pdf_rows: list[dict] = []
video_rows: list[dict] = []
search_rows: list[dict] = []


def now_jst() -> str:
    return datetime.now(JST).isoformat(timespec='seconds')


def sha256(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


def slug(text: str, maxlen: int = 90) -> str:
    text = unquote(text)
    text = re.sub(r'[^0-9A-Za-z._-]+', '_', text).strip('._')
    return (text or 'asset')[:maxlen]


def request(url: str, *, timeout: int = TIMEOUT) -> requests.Response:
    return SESSION.get(url, timeout=timeout, allow_redirects=True)


def save_image(data: bytes, asset_url: str, source_page: str, target_ids: str, media: str, prefix: str, *, min_size=(500, 280), force=False) -> str | None:
    if not data:
        return None
    h = sha256(data)
    if h in seen_sha:
        asset_rows.append({'target_id': target_ids, 'media': media, 'source_page': source_page, 'asset_url': asset_url, 'status': 'SHA_DUPLICATE', 'file': seen_sha[h], 'sha256': h, 'width': '', 'height': '', 'bytes': len(data), 'note': ''})
        return None
    ext = Path(urlparse(asset_url).path).suffix.lower()
    if ext not in {'.jpg', '.jpeg', '.png', '.webp', '.bmp', '.tif', '.tiff'}:
        ext = '.jpg'
    name = f'{prefix}_{slug(Path(urlparse(asset_url).path).name)}_{h[:10]}{ext}'
    path = RAW / name
    path.write_bytes(data)
    try:
        with Image.open(path) as im:
            im.load()
            w, hgt = im.size
            fmt = im.format or ''
        if not force and (w < min_size[0] or hgt < min_size[1]):
            path.unlink(missing_ok=True)
            asset_rows.append({'target_id': target_ids, 'media': media, 'source_page': source_page, 'asset_url': asset_url, 'status': 'EXCLUDED_LOW_RES', 'file': '', 'sha256': h, 'width': w, 'height': hgt, 'bytes': len(data), 'note': fmt})
            return None
    except Exception as exc:
        path.unlink(missing_ok=True)
        asset_rows.append({'target_id': target_ids, 'media': media, 'source_page': source_page, 'asset_url': asset_url, 'status': 'EXCLUDED_NOT_IMAGE', 'file': '', 'sha256': h, 'width': '', 'height': '', 'bytes': len(data), 'note': repr(exc)[:200]})
        return None
    seen_sha[h] = str(path)
    asset_rows.append({'target_id': target_ids, 'media': media, 'source_page': source_page, 'asset_url': asset_url, 'status': 'SAVED', 'file': str(path), 'sha256': h, 'width': w, 'height': hgt, 'bytes': len(data), 'note': ''})
    return str(path)


def download_image(url: str, source_page: str, target_ids: str, media: str, prefix: str, *, force=False) -> None:
    try:
        r = request(url)
        if r.status_code != 200:
            asset_rows.append({'target_id': target_ids, 'media': media, 'source_page': source_page, 'asset_url': url, 'status': f'HTTP_{r.status_code}', 'file': '', 'sha256': '', 'width': '', 'height': '', 'bytes': len(r.content), 'note': ''})
            return
        ct = r.headers.get('content-type', '').lower()
        if 'text/html' in ct:
            asset_rows.append({'target_id': target_ids, 'media': media, 'source_page': source_page, 'asset_url': url, 'status': 'EXCLUDED_HTML', 'file': '', 'sha256': '', 'width': '', 'height': '', 'bytes': len(r.content), 'note': ct})
            return
        save_image(r.content, r.url, source_page, target_ids, media, prefix, force=force)
    except Exception as exc:
        asset_rows.append({'target_id': target_ids, 'media': media, 'source_page': source_page, 'asset_url': url, 'status': 'ERROR', 'file': '', 'sha256': '', 'width': '', 'height': '', 'bytes': '', 'note': repr(exc)[:300]})


def add_json_images(obj, found: set[str]) -> None:
    if isinstance(obj, dict):
        for key, value in obj.items():
            if key.lower() in {'image', 'images', 'contenturl', 'thumbnailurl', 'url', 'imageurl'}:
                if isinstance(value, str) and re.search(r'\.(?:jpe?g|png|webp)(?:[?#].*)?$', value, re.I):
                    found.add(value)
                elif isinstance(value, (dict, list)):
                    add_json_images(value, found)
            elif isinstance(value, (dict, list)):
                add_json_images(value, found)
    elif isinstance(obj, list):
        for value in obj:
            add_json_images(value, found)


def best_srcset(value: str) -> str | None:
    choices = []
    for part in value.split(','):
        bits = part.strip().split()
        if not bits:
            continue
        score = 0
        if len(bits) > 1:
            m = re.match(r'(\d+)(w|x)', bits[1])
            if m:
                score = int(m.group(1))
        choices.append((score, bits[0]))
    return max(choices, default=(0, None))[1]


def crawl_page(target_ids: str, media: str, page_url: str, idx: int) -> None:
    started = time.time()
    found: set[str] = set()
    pdf_links: set[str] = set()
    try:
        r = request(page_url)
        status = f'HTTP_{r.status_code}'
        if r.status_code != 200:
            page_rows.append({'target_id': target_ids, 'media': media, 'page_url': page_url, 'status': status, 'found_total': 0, 'saved': 0, 'sha_duplicate': 0, 'excluded': 0, 'seconds': round(time.time()-started, 2)})
            return
        text = r.text
        soup = BeautifulSoup(text, 'lxml')
        for tag in soup.find_all(['meta', 'img', 'source', 'a', 'video']):
            values = []
            if tag.name == 'meta':
                values = [tag.get('content')]
            elif tag.name == 'a':
                href = tag.get('href')
                if href and re.search(r'\.pdf(?:[?#].*)?$', href, re.I):
                    pdf_links.add(urljoin(r.url, href))
                values = [href]
            else:
                values = [tag.get(k) for k in ('src', 'data-src', 'data-original', 'data-lazy-src', 'data-image', 'poster', 'content')]
            for value in values:
                if not value:
                    continue
                value = html.unescape(value).replace('\\/', '/')
                if re.search(r'\.(?:jpe?g|png|webp)(?:[?#].*)?$', value, re.I):
                    found.add(urljoin(r.url, value))
            for key in ('srcset', 'data-srcset'):
                value = tag.get(key)
                if value:
                    best = best_srcset(value)
                    if best:
                        found.add(urljoin(r.url, html.unescape(best).replace('\\/', '/')))
        for script in soup.find_all('script', type=re.compile(r'ld\+json', re.I)):
            try:
                add_json_images(json.loads(script.get_text(strip=True)), found)
            except Exception:
                pass
        raw = html.unescape(text).replace('\\/', '/')
        for u in re.findall(r'https?://[^"\'<>\s]+?\.(?:jpe?g|png|webp)(?:\?[^"\'<>\s]*)?', raw, re.I):
            found.add(u)
        for u in re.findall(r'https?://[^"\'<>\s]+?\.pdf(?:\?[^"\'<>\s]*)?', raw, re.I):
            pdf_links.add(u)
        before = len(asset_rows)
        for n, u in enumerate(sorted(found), 1):
            download_image(u, r.url, target_ids, media, f'p{idx:03d}_{n:03d}')
        new = asset_rows[before:]
        saved = sum(x['status'] == 'SAVED' for x in new)
        dup = sum(x['status'] == 'SHA_DUPLICATE' for x in new)
        excluded = len(new) - saved - dup
        page_rows.append({'target_id': target_ids, 'media': media, 'page_url': page_url, 'status': status, 'found_total': len(new), 'saved': saved, 'sha_duplicate': dup, 'excluded': excluded, 'pdf_links': len(pdf_links), 'seconds': round(time.time()-started, 2)})
        for pidx, pdf_url in enumerate(sorted(pdf_links), 1):
            download_render_pdf(target_ids, media, r.url, pdf_url, idx, pidx)
    except Exception as exc:
        page_rows.append({'target_id': target_ids, 'media': media, 'page_url': page_url, 'status': 'ERROR', 'found_total': 0, 'saved': 0, 'sha_duplicate': 0, 'excluded': 0, 'seconds': round(time.time()-started, 2), 'note': repr(exc)[:300]})


def download_render_pdf(target_ids: str, media: str, source_page: str, pdf_url: str, page_idx: int, pdf_idx: int) -> None:
    try:
        r = request(pdf_url, timeout=60)
        if r.status_code != 200 or not r.content.startswith(b'%PDF'):
            pdf_rows.append({'target_id': target_ids, 'media': media, 'source_page': source_page, 'pdf_url': pdf_url, 'status': f'HTTP_{r.status_code}_NOT_PDF', 'file': '', 'sha256': '', 'pages': 0})
            return
        h = sha256(r.content)
        pdf_path = META / f'p{page_idx:03d}_pdf{pdf_idx:02d}_{h[:10]}.pdf'
        pdf_path.write_bytes(r.content)
        prefix = PDF_DIR / f'p{page_idx:03d}_pdf{pdf_idx:02d}_{h[:8]}_page'
        cp = subprocess.run(['pdftoppm', '-png', '-r', '180', str(pdf_path), str(prefix)], text=True, capture_output=True, timeout=240)
        pages = 0
        for q in sorted(PDF_DIR.glob(prefix.name + '-*.png')):
            data = q.read_bytes()
            sh = sha256(data)
            with Image.open(q) as im:
                w, hgt = im.size
            if sh in seen_sha:
                q.unlink(missing_ok=True)
                asset_rows.append({'target_id': target_ids, 'media': media, 'source_page': source_page, 'asset_url': f'{pdf_url}#page={pages+1}', 'status': 'SHA_DUPLICATE', 'file': seen_sha[sh], 'sha256': sh, 'width': w, 'height': hgt, 'bytes': len(data), 'note': 'official PDF page'})
            else:
                seen_sha[sh] = str(q)
                asset_rows.append({'target_id': target_ids, 'media': media, 'source_page': source_page, 'asset_url': f'{pdf_url}#page={pages+1}', 'status': 'SAVED', 'file': str(q), 'sha256': sh, 'width': w, 'height': hgt, 'bytes': len(data), 'note': 'official PDF page'})
            pages += 1
        pdf_rows.append({'target_id': target_ids, 'media': media, 'source_page': source_page, 'pdf_url': pdf_url, 'status': 'SAVED', 'file': str(pdf_path), 'sha256': h, 'pages': pages, 'stderr': cp.stderr[-400:]})
    except Exception as exc:
        pdf_rows.append({'target_id': target_ids, 'media': media, 'source_page': source_page, 'pdf_url': pdf_url, 'status': 'ERROR', 'file': '', 'sha256': '', 'pages': 0, 'note': repr(exc)[:300]})


def search_url(surface: str, query: str) -> str:
    if surface == '画像検索':
        return 'https://www.bing.com/images/search?q=' + quote_plus(query)
    if surface == 'X':
        return 'https://www.bing.com/search?q=' + quote_plus('site:x.com ' + query)
    if surface == 'YouTube':
        return 'https://www.youtube.com/results?search_query=' + quote_plus(query)
    return 'https://www.bing.com/search?q=' + quote_plus(query)


def count_search_results(surface: str, text: str) -> int:
    if surface == '画像検索':
        return len(set(re.findall(r'"murl"\s*:\s*"([^"]+)"', text)))
    if surface == 'YouTube':
        return len(set(re.findall(r'"videoId"\s*:\s*"([A-Za-z0-9_-]{11})"', text)))
    return len(re.findall(r'class=["\']b_algo["\']', text))


def one_search(args):
    target_id, round_no, surface, query = args
    url = search_url(surface, query)
    try:
        r = request(url, timeout=25)
        count = count_search_results(surface, r.text) if r.status_code == 200 else 0
        result = 'SEARCHED_HIT' if count else ('SEARCHED_NO_HIT' if r.status_code == 200 else f'HTTP_{r.status_code}')
        return {'target_id': target_id, '探索巡': round_no, '探索面': surface, '実行検索語': query, '検索日時': now_jst(), '確認結果件数': count, '結果': result, 'search_url': url}
    except Exception as exc:
        return {'target_id': target_id, '探索巡': round_no, '探索面': surface, '実行検索語': query, '検索日時': now_jst(), '確認結果件数': 0, '結果': 'ERROR', 'search_url': url, 'note': repr(exc)[:200]}


def run_search_matrix() -> None:
    jobs = []
    for tid, (label, base) in TARGETS.items():
        round_queries = {1: base, 2: f'{base} {label} 写真 動画 資料 PDF 公式 2025 2026'}
        for round_no, q in round_queries.items():
            for surface in ('公式', '報道', '画像検索', 'X', 'YouTube'):
                if surface == '公式':
                    qq = q + ' site:metro.tokyo.lg.jp OR site:hokeniryo.metro.tokyo.lg.jp OR site:npo-homepage.go.jp OR site:jigyo-saisei.com'
                elif surface == '報道':
                    qq = q + ' ニュース 報道'
                elif surface == 'YouTube':
                    qq = q + ' ニュース'
                else:
                    qq = q
                jobs.append((tid, round_no, surface, qq))
    with cf.ThreadPoolExecutor(max_workers=8) as ex:
        for row in ex.map(one_search, jobs):
            search_rows.append(row)


def download_videos() -> None:
    candidates = [(t, m, u) for t, m, u in VIDEO_PAGE_URLS]
    for q in YOUTUBE_SEARCHES:
        candidates.append(('T014', 'YouTube検索', 'ytsearch5:' + q))
    for idx, (target_ids, media, url) in enumerate(candidates, 1):
        outtpl = str(VIDEOS / f'v{idx:02d}_%(id)s_%(title).80B.%(ext)s')
        cmd = [sys.executable, '-m', 'yt_dlp', '--no-playlist', '--newline', '--retries', '3', '--fragment-retries', '3',
               '--match-filter', 'duration < 900', '-f', 'bestvideo[height<=720]+bestaudio/best[height<=720]', '--merge-output-format', 'mp4',
               '--write-info-json', '--write-thumbnail', '--convert-thumbnails', 'jpg', '--max-filesize', '250M', '-o', outtpl, url]
        try:
            cp = subprocess.run(cmd, text=True, capture_output=True, timeout=1000)
            files = [p for p in sorted(VIDEOS.glob(f'v{idx:02d}_*')) if p.suffix.lower() in {'.mp4', '.webm', '.mkv', '.mov'}]
            for vp in files:
                extract_frames(vp, target_ids, media, url)
            video_rows.append({'target_id': target_ids, 'media': media, 'url': url, 'returncode': cp.returncode, 'files': ';'.join(str(p) for p in files), 'stdout_tail': cp.stdout[-800:], 'stderr_tail': cp.stderr[-1200:]})
        except Exception as exc:
            video_rows.append({'target_id': target_ids, 'media': media, 'url': url, 'returncode': -1, 'files': '', 'stderr_tail': repr(exc)})


def extract_frames(video_path: Path, target_ids: str, media: str, source_url: str) -> None:
    probe = subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'default=noprint_wrappers=1:nokey=1', str(video_path)], text=True, capture_output=True)
    try:
        duration = float(probe.stdout.strip())
    except Exception:
        duration = 60.0
    step = max(3.0, duration / 18.0)
    stamps = []
    t = 0.5
    while t < duration - 0.5 and len(stamps) < 20:
        stamps.append(t)
        t += step
    for n, stamp in enumerate(stamps, 1):
        out = FRAMES / f'{video_path.stem}_frame_{n:02d}_{stamp:06.2f}s.jpg'
        cp = subprocess.run(['ffmpeg', '-y', '-ss', f'{stamp:.2f}', '-i', str(video_path), '-frames:v', '1', '-q:v', '2', str(out)], text=True, capture_output=True, timeout=120)
        if cp.returncode != 0 or not out.exists():
            continue
        data = out.read_bytes()
        h = sha256(data)
        with Image.open(out) as im:
            w, hgt = im.size
        if h in seen_sha:
            out.unlink(missing_ok=True)
            asset_rows.append({'target_id': target_ids, 'media': media, 'source_page': source_url, 'asset_url': f'{source_url}#t={stamp:.2f}', 'status': 'SHA_DUPLICATE', 'file': seen_sha[h], 'sha256': h, 'width': w, 'height': hgt, 'bytes': len(data), 'note': f'video frame from {video_path.name}'})
        else:
            seen_sha[h] = str(out)
            asset_rows.append({'target_id': target_ids, 'media': media, 'source_page': source_url, 'asset_url': f'{source_url}#t={stamp:.2f}', 'status': 'SAVED', 'file': str(out), 'sha256': h, 'width': w, 'height': hgt, 'bytes': len(data), 'note': f'video frame from {video_path.name}'})


def write_csv(path: Path, rows: list[dict]) -> None:
    fields = []
    for row in rows:
        for key in row:
            if key not in fields:
                fields.append(key)
    with path.open('w', encoding='utf-8-sig', newline='') as f:
        writer = csv.DictWriter(f, fieldnames=fields)
        writer.writeheader()
        writer.writerows(rows)


def main() -> None:
    run_search_matrix()
    for i, (target_ids, media, url) in enumerate(DIRECT_SEEDS, 1):
        download_image(url, url, target_ids, media, f'direct_{i:03d}', force=True)
    for i, (target_ids, media, url) in enumerate(PAGE_SEEDS, 1):
        crawl_page(target_ids, media, url, i)
    download_videos()
    inventory = []
    for p in sorted(ROOT.rglob('*')):
        if not p.is_file() or p.suffix.lower() in {'.csv', '.json'}:
            continue
        data = p.read_bytes()
        h = sha256(data)
        w = hgt = ''
        if p.suffix.lower() in {'.jpg', '.jpeg', '.png', '.webp', '.bmp', '.tif', '.tiff'}:
            try:
                with Image.open(p) as im:
                    w, hgt = im.size
            except Exception:
                pass
        inventory.append({'file': str(p), 'sha256': h, 'bytes': len(data), 'width': w, 'height': hgt, 'suffix': p.suffix.lower()})
    write_csv(META / 'search_log.csv', search_rows)
    write_csv(META / 'asset_discovery.csv', asset_rows)
    write_csv(META / 'page_reconciliation.csv', page_rows)
    write_csv(META / 'pdf_status.csv', pdf_rows)
    write_csv(META / 'video_status.csv', video_rows)
    write_csv(META / 'inventory.csv', inventory)
    summary = {'targets': len(TARGETS), 'search_rows': len(search_rows), 'pages': len(PAGE_SEEDS), 'direct_seeds': len(DIRECT_SEEDS),
               'video_inputs': len(VIDEO_PAGE_URLS) + len(YOUTUBE_SEARCHES), 'saved_asset_records': sum(r.get('status') == 'SAVED' for r in asset_rows),
               'sha_duplicate_records': sum(r.get('status') == 'SHA_DUPLICATE' for r in asset_rows), 'inventory_files': len(inventory), 'generated_at_jst': now_jst()}
    (META / 'summary.json').write_text(json.dumps(summary, ensure_ascii=False, indent=2), encoding='utf-8')
    print(json.dumps(summary, ensure_ascii=False))


if __name__ == '__main__':
    main()
