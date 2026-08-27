from __future__ import annotations

import csv
import hashlib
import html
import json
import mimetypes
import re
import subprocess
import sys
import time
from pathlib import Path
from urllib.parse import unquote, urljoin, urlparse

import requests
from bs4 import BeautifulSoup
from PIL import Image

ROOT = Path("output")
RAW = ROOT / "raw"
PDF = ROOT / "pdf_pages"
VID = ROOT / "videos"
FRAMES = ROOT / "video_frames"
SHOTS = ROOT / "page_screenshots"
META = ROOT / "meta"
for directory in (RAW, PDF, VID, FRAMES, SHOTS, META):
    directory.mkdir(parents=True, exist_ok=True)

SESSION = requests.Session()
SESSION.headers.update(
    {
        "User-Agent": (
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
            "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151 Safari/537.36"
        ),
        "Accept-Language": "ja,en-US;q=0.8,en;q=0.6",
    }
)
TIMEOUT = 40
seen_sha: dict[str, str] = {}
asset_rows: list[dict[str, object]] = []
page_rows: list[dict[str, object]] = []

PAGE_SEEDS = [
    "https://www.gikai.pref.fukuoka.lg.jp/soshiki/2/gaiyou080825.html",
    "https://www.gikai.pref.fukuoka.lg.jp/site/gichou/",
    "https://www.gikai.pref.fukuoka.lg.jp/site/honkaigi/gian-0808.html",
    "https://www.gikai.pref.fukuoka.lg.jp/site/honkaigi/gikainittei-0808.html",
    "https://www.gikai.pref.fukuoka.lg.jp/site/honkaigi/saiketsu-0808.html",
    "https://www.gikai.pref.fukuoka.lg.jp/soshiki/2/gaiyou080818.html",
    "https://www.pref.fukuoka.lg.jp/press-release/0817-rinjigikai.html",
    "https://www.pref.fukuoka.lg.jp/press-release/gikai-dai3sha.html",
    "https://www.pref.fukuoka.lg.jp/press-release/hukugityojisyoku2026.html",
    "https://www.pref.fukuoka.lg.jp/site/chiji-kisha/teirei-kisyakaike20260821.html",
    "https://cms.city.onojo.fukuoka.jp/hpkiji/pub/List.aspx?c_id=3&class_id=141&class_set_id=1",
    "https://mainichi.jp/articles/20260825/k00/00m/010/223000c",
    "https://mainichi.jp/articles/20260805/k00/00m/010/305000c",
    "https://news.tnc.ne.jp/politics/928478_1.html",
    "https://news.tnc.co.jp/news/articles/NID2026070531083/",
    "https://news.tnc.co.jp/news/articles/NID2026070631089/",
    "https://news.tnc.co.jp/news/articles/NID2026070731120",
    "https://news.tnc.co.jp/news/articles/NID2026071031167/",
    "https://news.tnc.co.jp/news/articles/NID2026071431223/",
    "https://news.tnc.co.jp/news/articles/NID2026072731389/",
    "https://news.tnc.co.jp/news/articles/NID2026072731391",
    "https://news.tnc.co.jp/news/articles/NID2026081731690/",
    "https://news.tnc.co.jp/news/articles/NID2026081831705/",
    "https://news.tnc.co.jp/news/articles/NID2026081831716/",
    "https://news.tnc.co.jp/news/articles/NID2026081931732/",
    "https://news.tnc.co.jp/news/articles/NID2026082131761",
    "https://news.tnc.co.jp/news/articles/NID2026082431773/",
    "https://news.tnc.co.jp/news/articles/NID2026082531793/",
    "https://news.tnc.co.jp/news/articles/NID2026082631811/",
    "https://news.tv-asahi.co.jp/news_society/articles/000522015.html",
    "https://news.tv-asahi.co.jp/news_society/articles/000526946.html",
    "https://news.tv-asahi.co.jp/news_society/articles/000527386.html",
    "https://news.tv-asahi.co.jp/news_society/articles/000528592.html",
    "https://news.tv-asahi.co.jp/news_society/articles/900197296.html",
    "https://news.tv-asahi.co.jp/news_society/articles/900197325.html",
    "https://news.tv-asahi.co.jp/news_society/articles/900197828.html",
    "https://newsdig.tbs.co.jp/articles/-/2808682",
    "https://newsdig.tbs.co.jp/articles/-/2827721",
    "https://newsdig.tbs.co.jp/articles/-/2830029",
    "https://newsdig.tbs.co.jp/articles/rkb/2898531?display=1",
    "https://www.fnn.jp/articles/-/1074365",
    "https://www.fnn.jp/articles/-/1082388",
    "https://www.fnn.jp/articles/-/1095993",
    "https://www.fnn.jp/articles/-/1096862",
    "https://www.fnn.jp/articles/-/1099994",
    "https://www.fnn.jp/articles/-/1100008",
    "https://www.fnn.jp/articles/-/1100029",
    "https://www.fnn.jp/articles/-/1100731",
    "https://www.fnn.jp/articles/-/1100846?display=full",
    "https://www.ktv.jp/news/feature/260709-fukuoka/",
    "https://www.ktv.jp/news/feature/260713-fukuoka/",
    "https://www.ktv.jp/news/feature/260805-fukuoka/",
    "https://www.ktv.jp/news/feature/260807-fukuoka/",
    "https://www.ktv.jp/news/feature/260824-fukuoka/",
    "https://www.ktv.jp/news/feature/260826-hashimoto/",
    "https://www.ktv.jp/news/articles/?id=29019",
    "https://www.ktv.jp/news/articles/?id=29112",
    "https://www.ktv.jp/news/articles/?id=29158",
]

PDF_SEEDS = [
    "https://www.gikai.pref.fukuoka.lg.jp/uploaded/attachment/500.pdf",
]

DIRECT_SEEDS = [
    "https://news.tnc.co.jp/data/local/NID202608243177301.jpg",
    "https://news.tnc.co.jp/data/local/NID202608183170701.jpg",
    "https://www.ktv.jp/news/wp-content/uploads/sites/2/2026/07/1.png",
    "https://www.ktv.jp/news/wp-content/uploads/sites/2/2026/07/2.png",
    "https://www.ktv.jp/news/wp-content/uploads/sites/2/2026/07/3.png",
    "https://www.ktv.jp/news/wp-content/uploads/sites/2/2026/07/Still0713_00005.jpg",
    "https://www.ktv.jp/news/wp-content/uploads/sites/2/2026/07/Still0713_00064.jpg",
]

VIDEO_IDS = [
    "4UeFxnhS8VI",
    "n2bl_khzru4",
    "soIbAAMEzEM",
    "z_k2iQ6VTgc",
    "2bTM-ynhBrI",
    "PKwj23--qIQ",
    "C2FCmsgDUsI",
    "Qx_UkaQem-g",
    "K7WGmZsfDi8",
    "a-iMU_U868U",
    "R7ck2jdPmP0",
    "jqcZxuvRVzs",
    "h6Hvf_wlhfQ",
    "nuvo7KTEc20",
    "XU1MEA0XG58",
    "-JTNdxY524c",
    "8gmZ75u8Uvo",
    "VR-yPGNu2mA",
    "oJmecSTE5Hk",
    "1tBRm2UyafU",
]

SCREENSHOT_SEEDS = [
    "https://www.gikai.pref.fukuoka.lg.jp/soshiki/2/gaiyou080825.html",
    "https://www.gikai.pref.fukuoka.lg.jp/site/gichou/",
    "https://www.gikai.pref.fukuoka.lg.jp/site/honkaigi/gian-0808.html",
    "https://www.gikai.pref.fukuoka.lg.jp/site/honkaigi/saiketsu-0808.html",
    "https://www.pref.fukuoka.lg.jp/press-release/gikai-dai3sha.html",
    "https://mainichi.jp/articles/20260825/k00/00m/010/223000c",
    "https://news.tnc.ne.jp/politics/928478_1.html",
]


def slug(value: str, max_length: int = 100) -> str:
    value = unquote(value)
    value = re.sub(r"[^0-9A-Za-z._-]+", "_", value).strip("._")
    return (value or "asset")[:max_length]


def sha256(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


def get(url: str) -> requests.Response:
    return SESSION.get(url, timeout=TIMEOUT, allow_redirects=True)


def save_image_bytes(
    data: bytes,
    asset_url: str,
    source_page: str,
    prefix: str,
    keep_low_resolution: bool = False,
) -> tuple[str, int, int, str] | None:
    if not data:
        return None
    digest = sha256(data)
    if digest in seen_sha:
        asset_rows.append(
            {
                "record": "asset",
                "source_page": source_page,
                "asset_url": asset_url,
                "status": "SHA_DUPLICATE",
                "file": seen_sha[digest],
                "sha256": digest,
                "width": "",
                "height": "",
                "bytes": len(data),
                "note": "",
            }
        )
        return None
    extension = Path(urlparse(asset_url).path).suffix.lower()
    if extension not in {".jpg", ".jpeg", ".png", ".webp", ".bmp", ".tif", ".tiff"}:
        extension = ".jpg"
    name = f"{prefix}_{slug(Path(urlparse(asset_url).path).name or 'image')}_{digest[:10]}{extension}"
    path = RAW / name
    path.write_bytes(data)
    width = height = 0
    try:
        with Image.open(path) as image:
            image.load()
            width, height = image.size
            image_format = image.format or ""
    except Exception as exc:
        path.unlink(missing_ok=True)
        asset_rows.append(
            {
                "record": "asset",
                "source_page": source_page,
                "asset_url": asset_url,
                "status": "EXCLUDED_NOT_IMAGE",
                "file": "",
                "sha256": digest,
                "width": "",
                "height": "",
                "bytes": len(data),
                "note": repr(exc)[:250],
            }
        )
        return None
    if not keep_low_resolution and (width < 500 or height < 280):
        path.unlink(missing_ok=True)
        asset_rows.append(
            {
                "record": "asset",
                "source_page": source_page,
                "asset_url": asset_url,
                "status": "EXCLUDED_LOW_RES",
                "file": "",
                "sha256": digest,
                "width": width,
                "height": height,
                "bytes": len(data),
                "note": image_format,
            }
        )
        return None
    seen_sha[digest] = str(path)
    asset_rows.append(
        {
            "record": "asset",
            "source_page": source_page,
            "asset_url": asset_url,
            "status": "SAVED",
            "file": str(path),
            "sha256": digest,
            "width": width,
            "height": height,
            "bytes": len(data),
            "note": "",
        }
    )
    return str(path), width, height, digest


def download_image(
    url: str,
    source_page: str,
    prefix: str,
    keep_low_resolution: bool = False,
) -> None:
    try:
        response = get(url)
        content_type = response.headers.get("content-type", "").lower()
        if response.status_code != 200:
            asset_rows.append(
                {
                    "record": "asset",
                    "source_page": source_page,
                    "asset_url": url,
                    "status": f"HTTP_{response.status_code}",
                    "file": "",
                    "sha256": "",
                    "width": "",
                    "height": "",
                    "bytes": len(response.content),
                    "note": content_type,
                }
            )
            return
        if "text/html" in content_type:
            asset_rows.append(
                {
                    "record": "asset",
                    "source_page": source_page,
                    "asset_url": url,
                    "status": "EXCLUDED_HTML",
                    "file": "",
                    "sha256": "",
                    "width": "",
                    "height": "",
                    "bytes": len(response.content),
                    "note": content_type,
                }
            )
            return
        save_image_bytes(
            response.content,
            response.url,
            source_page,
            prefix,
            keep_low_resolution,
        )
    except Exception as exc:
        asset_rows.append(
            {
                "record": "asset",
                "source_page": source_page,
                "asset_url": url,
                "status": "ERROR",
                "file": "",
                "sha256": "",
                "width": "",
                "height": "",
                "bytes": "",
                "note": repr(exc)[:300],
            }
        )


def add_json_images(value: object, found: set[str]) -> None:
    if isinstance(value, dict):
        for key, child in value.items():
            lower = key.lower()
            if lower in {"image", "images", "contenturl", "thumbnailurl", "url"}:
                if isinstance(child, str) and re.search(
                    r"\.(?:jpe?g|png|webp)(?:\?|$)", child, re.IGNORECASE
                ):
                    found.add(child)
                elif isinstance(child, (dict, list)):
                    add_json_images(child, found)
            elif isinstance(child, (dict, list)):
                add_json_images(child, found)
    elif isinstance(value, list):
        for child in value:
            add_json_images(child, found)


def crawl_page(page_url: str, index: int) -> None:
    started = time.time()
    found: set[str] = set()
    try:
        response = get(page_url)
        status = f"HTTP_{response.status_code}"
        if response.status_code != 200:
            page_rows.append(
                {
                    "page_url": page_url,
                    "status": status,
                    "found": 0,
                    "saved": 0,
                    "sha_duplicate": 0,
                    "excluded": 0,
                    "seconds": round(time.time() - started, 2),
                }
            )
            return
        text = response.text
        soup = BeautifulSoup(text, "lxml")
        for tag in soup.find_all(["meta", "img", "source", "a"]):
            if tag.name == "meta":
                attrs = [tag.get("content")]
            elif tag.name == "a":
                attrs = [tag.get("href")]
            else:
                attrs = [
                    tag.get(name)
                    for name in (
                        "src",
                        "data-src",
                        "data-original",
                        "data-lazy-src",
                        "data-image",
                        "content",
                    )
                ]
            for raw_value in attrs:
                if not raw_value:
                    continue
                value = html.unescape(raw_value).replace("\\/", "/")
                if re.search(
                    r"\.(?:jpe?g|png|webp)(?:[?#].*)?$", value, re.IGNORECASE
                ):
                    found.add(urljoin(response.url, value))
            for name in ("srcset", "data-srcset"):
                value = tag.get(name)
                if not value:
                    continue
                for part in value.split(","):
                    candidate = part.strip().split()[0].replace("\\/", "/")
                    if re.search(
                        r"\.(?:jpe?g|png|webp)(?:[?#].*)?$",
                        candidate,
                        re.IGNORECASE,
                    ):
                        found.add(urljoin(response.url, candidate))
        for script in soup.find_all("script", type=re.compile(r"ld\+json", re.I)):
            try:
                add_json_images(json.loads(script.get_text(strip=True)), found)
            except Exception:
                pass
        raw_html = html.unescape(text).replace("\\/", "/")
        pattern = re.compile(
            r"https?://[^\"'<>\\s]+?\.(?:jpe?g|png|webp)(?:\?[^\"'<>\\s]*)?",
            re.IGNORECASE,
        )
        found.update(pattern.findall(raw_html))
        before = len(asset_rows)
        for number, asset_url in enumerate(sorted(found), start=1):
            download_image(asset_url, response.url, f"p{index:03d}_{number:03d}")
        new_rows = asset_rows[before:]
        saved = sum(row["status"] == "SAVED" for row in new_rows)
        duplicates = sum(row["status"] == "SHA_DUPLICATE" for row in new_rows)
        excluded = len(new_rows) - saved - duplicates
        page_rows.append(
            {
                "page_url": page_url,
                "final_page_url": response.url,
                "status": status,
                "found": len(found),
                "saved": saved,
                "sha_duplicate": duplicates,
                "excluded": excluded,
                "seconds": round(time.time() - started, 2),
            }
        )
    except Exception as exc:
        page_rows.append(
            {
                "page_url": page_url,
                "status": "ERROR",
                "found": 0,
                "saved": 0,
                "sha_duplicate": 0,
                "excluded": 0,
                "seconds": round(time.time() - started, 2),
                "note": repr(exc)[:300],
            }
        )


def write_csv(path: Path, rows: list[dict[str, object]]) -> None:
    fieldnames: list[str] = []
    for row in rows:
        for key in row:
            if key not in fieldnames:
                fieldnames.append(key)
    with path.open("w", encoding="utf-8-sig", newline="") as handle:
        writer = csv.DictWriter(handle, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(rows)


for direct_index, direct_url in enumerate(DIRECT_SEEDS, start=1):
    download_image(
        direct_url,
        direct_url,
        f"direct_{direct_index:03d}",
        keep_low_resolution=True,
    )

for page_index, seed_url in enumerate(PAGE_SEEDS, start=1):
    print(f"crawl {page_index}/{len(PAGE_SEEDS)} {seed_url}", flush=True)
    crawl_page(seed_url, page_index)

pdf_rows: list[dict[str, object]] = []
for pdf_index, pdf_url in enumerate(PDF_SEEDS, start=1):
    try:
        response = get(pdf_url)
        if response.status_code != 200:
            raise RuntimeError(f"HTTP {response.status_code}")
        pdf_path = META / f"official_{pdf_index:02d}.pdf"
        pdf_path.write_bytes(response.content)
        pdf_digest = sha256(response.content)
        out_prefix = PDF / f"official_{pdf_index:02d}_page"
        completed = subprocess.run(
            ["pdftoppm", "-png", "-r", "160", str(pdf_path), str(out_prefix)],
            text=True,
            capture_output=True,
            timeout=240,
            check=False,
        )
        pages: list[dict[str, object]] = []
        for image_path in sorted(PDF.glob(f"official_{pdf_index:02d}_page-*.png")):
            data = image_path.read_bytes()
            digest = sha256(data)
            with Image.open(image_path) as image:
                width, height = image.size
            seen_sha.setdefault(digest, str(image_path))
            pages.append(
                {
                    "file": str(image_path),
                    "sha256": digest,
                    "width": width,
                    "height": height,
                }
            )
        pdf_rows.append(
            {
                "url": pdf_url,
                "status": "SAVED",
                "file": str(pdf_path),
                "sha256": pdf_digest,
                "pages": pages,
                "returncode": completed.returncode,
                "stderr": completed.stderr[-500:],
            }
        )
    except Exception as exc:
        pdf_rows.append({"url": pdf_url, "status": "ERROR", "note": repr(exc)})

screenshot_rows: list[dict[str, object]] = []
chrome = None
for candidate in ("google-chrome", "google-chrome-stable", "chromium", "chromium-browser"):
    result = subprocess.run(["bash", "-lc", f"command -v {candidate}"], text=True, capture_output=True)
    if result.returncode == 0:
        chrome = result.stdout.strip()
        break
if chrome:
    for screenshot_index, screenshot_url in enumerate(SCREENSHOT_SEEDS, start=1):
        output_path = SHOTS / f"page_{screenshot_index:02d}_{slug(urlparse(screenshot_url).netloc)}.png"
        command = [
            chrome,
            "--headless=new",
            "--disable-gpu",
            "--no-sandbox",
            "--disable-dev-shm-usage",
            "--hide-scrollbars",
            "--window-size=1920,1080",
            f"--screenshot={output_path}",
            screenshot_url,
        ]
        try:
            completed = subprocess.run(command, text=True, capture_output=True, timeout=120, check=False)
            if output_path.exists():
                data = output_path.read_bytes()
                digest = sha256(data)
                with Image.open(output_path) as image:
                    width, height = image.size
                seen_sha.setdefault(digest, str(output_path))
                screenshot_rows.append(
                    {
                        "url": screenshot_url,
                        "status": "SAVED",
                        "file": str(output_path),
                        "sha256": digest,
                        "width": width,
                        "height": height,
                        "returncode": completed.returncode,
                    }
                )
            else:
                screenshot_rows.append(
                    {
                        "url": screenshot_url,
                        "status": "ERROR",
                        "returncode": completed.returncode,
                        "stderr": completed.stderr[-600:],
                    }
                )
        except Exception as exc:
            screenshot_rows.append(
                {"url": screenshot_url, "status": "ERROR", "note": repr(exc)}
            )
else:
    screenshot_rows.append({"url": "", "status": "CHROME_NOT_FOUND"})

video_rows: list[dict[str, object]] = []
for video_index, video_id in enumerate(VIDEO_IDS, start=1):
    video_url = f"https://www.youtube.com/watch?v={video_id}"
    print(f"video {video_index}/{len(VIDEO_IDS)} {video_url}", flush=True)
    thumbnail_url = f"https://i.ytimg.com/vi/{video_id}/maxresdefault.jpg"
    download_image(
        thumbnail_url,
        video_url,
        f"ytthumb_{slug(video_id)}",
        keep_low_resolution=True,
    )
    output_template = str(VID / "%(id)s_%(title).90B.%(ext)s")
    command = [
        sys.executable,
        "-m",
        "yt_dlp",
        "--no-playlist",
        "--newline",
        "--retries",
        "3",
        "--fragment-retries",
        "3",
        "--socket-timeout",
        "30",
        "-f",
        "bestvideo[height<=720]+bestaudio/best[height<=720]",
        "--merge-output-format",
        "mp4",
        "--write-info-json",
        "--write-thumbnail",
        "--convert-thumbnails",
        "jpg",
        "--max-filesize",
        "220M",
        "-o",
        output_template,
        video_url,
    ]
    try:
        completed = subprocess.run(
            command,
            text=True,
            capture_output=True,
            timeout=900,
            check=False,
        )
        matching_files = [str(path) for path in sorted(VID.glob(f"{video_id}_*"))]
        media_files = [
            path
            for path in sorted(VID.glob(f"{video_id}_*"))
            if path.suffix.lower() in {".mp4", ".mkv", ".webm", ".mov", ".m4v"}
        ]
        frame_files: list[str] = []
        if media_files:
            media_path = media_files[0]
            probe = subprocess.run(
                [
                    "ffprobe",
                    "-v",
                    "error",
                    "-show_entries",
                    "format=duration",
                    "-of",
                    "default=noprint_wrappers=1:nokey=1",
                    str(media_path),
                ],
                text=True,
                capture_output=True,
                timeout=60,
                check=False,
            )
            try:
                duration = float(probe.stdout.strip())
            except Exception:
                duration = 0.0
            for frame_number, fraction in enumerate((0.15, 0.50, 0.85), start=1):
                second = max(0.5, duration * fraction) if duration else frame_number * 2.0
                frame_path = FRAMES / f"{video_id}_frame_{frame_number}_{int(second):04d}s.jpg"
                frame_command = [
                    "ffmpeg",
                    "-y",
                    "-ss",
                    f"{second:.2f}",
                    "-i",
                    str(media_path),
                    "-frames:v",
                    "1",
                    "-q:v",
                    "2",
                    str(frame_path),
                ]
                subprocess.run(
                    frame_command,
                    text=True,
                    capture_output=True,
                    timeout=120,
                    check=False,
                )
                if frame_path.exists():
                    frame_files.append(str(frame_path))
        video_rows.append(
            {
                "video_id": video_id,
                "url": video_url,
                "returncode": completed.returncode,
                "files": matching_files,
                "frames": frame_files,
                "stdout_tail": completed.stdout[-1200:],
                "stderr_tail": completed.stderr[-1800:],
            }
        )
    except Exception as exc:
        video_rows.append(
            {
                "video_id": video_id,
                "url": video_url,
                "returncode": -1,
                "files": [],
                "frames": [],
                "stderr_tail": repr(exc),
            }
        )

inventory: list[dict[str, object]] = []
for file_path in sorted(ROOT.rglob("*")):
    if not file_path.is_file() or file_path.suffix.lower() in {".csv", ".json"}:
        continue
    data = file_path.read_bytes()
    digest = sha256(data)
    width: int | str = ""
    height: int | str = ""
    if file_path.suffix.lower() in {
        ".jpg",
        ".jpeg",
        ".png",
        ".webp",
        ".bmp",
        ".tif",
        ".tiff",
    }:
        try:
            with Image.open(file_path) as image:
                width, height = image.size
        except Exception:
            pass
    inventory.append(
        {
            "file": str(file_path),
            "sha256": digest,
            "bytes": len(data),
            "width": width,
            "height": height,
            "suffix": file_path.suffix.lower(),
        }
    )

write_csv(META / "asset_discovery.csv", asset_rows)
write_csv(META / "page_reconciliation.csv", page_rows)
write_csv(META / "inventory.csv", inventory)
(META / "pdf_status.json").write_text(
    json.dumps(pdf_rows, ensure_ascii=False, indent=2), encoding="utf-8"
)
(META / "screenshot_status.json").write_text(
    json.dumps(screenshot_rows, ensure_ascii=False, indent=2), encoding="utf-8"
)
(META / "video_status.json").write_text(
    json.dumps(video_rows, ensure_ascii=False, indent=2), encoding="utf-8"
)
summary = {
    "pages": len(PAGE_SEEDS),
    "direct_seeds": len(DIRECT_SEEDS),
    "videos_requested": len(VIDEO_IDS),
    "videos_with_media": sum(bool(row.get("files")) for row in video_rows),
    "screenshots_saved": sum(row.get("status") == "SAVED" for row in screenshot_rows),
    "saved_unique_files": len(inventory),
    "saved_image_records": sum(row.get("status") == "SAVED" for row in asset_rows),
    "sha_duplicate_records": sum(
        row.get("status") == "SHA_DUPLICATE" for row in asset_rows
    ),
    "generated_at_utc": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
}
(META / "summary.json").write_text(
    json.dumps(summary, ensure_ascii=False, indent=2), encoding="utf-8"
)
print(json.dumps(summary, ensure_ascii=False, indent=2))
