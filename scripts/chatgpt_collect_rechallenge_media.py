from __future__ import annotations

import concurrent.futures as cf
import csv
import hashlib
import html
import io
import json
import os
import re
import subprocess
import sys
import time
import traceback
from datetime import datetime, timedelta, timezone
from pathlib import Path
from urllib.parse import quote_plus, unquote, urljoin, urlparse

import requests
import urllib3
from bs4 import BeautifulSoup
from PIL import Image

urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

ROOT = Path("output")
RAW = ROOT / "raw"
PDF_DIR = ROOT / "pdf_pages"
VIDEOS = ROOT / "videos"
FRAMES = ROOT / "video_frames"
SCREENSHOTS = ROOT / "page_screenshots"
META = ROOT / "meta"
for directory in (RAW, PDF_DIR, VIDEOS, FRAMES, SCREENSHOTS, META):
    directory.mkdir(parents=True, exist_ok=True)

JST = timezone(timedelta(hours=9))
UA = (
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
    "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36"
)
SESSION = requests.Session()
SESSION.headers.update(
    {
        "User-Agent": UA,
        "Accept-Language": "ja,en-US;q=0.8,en;q=0.6",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
    }
)
SESSION.verify = False
TIMEOUT = 35
MAX_IMAGES_PER_PAGE = 80
MAX_IMAGE_SEARCH_DOWNLOADS = 6
MAX_VIDEO_DOWNLOADS = 12

TARGETS: dict[str, tuple[str, str]] = {
    "T001": ("NPO法人再チャレンジ東京", '"再チャレンジ東京" NPO 法人'),
    "T002": ("代表者・関係者", '"再チャレンジ東京" 平林朋紀 高谷秀司'),
    "T003": ("東京都・保健医療局", '東京都 保健医療局 自殺対策 補助事業'),
    "T004": ("交付決定取消し・返還命令", '"再チャレンジ東京" 交付決定 取消し 返還命令 3779万円'),
    "T005": ("年度別金額・通知日", '"再チャレンジ東京" 4893万9000円 3779万3000円 2025年8月28日'),
    "T006": ("補助制度・交付要綱", '東京都 地域自殺対策強化補助事業 交付要綱 現地調査 立入検査'),
    "T007": ("相談事業・道徳授業", '"再チャレンジ東京" 対面相談 道徳特別授業 学校'),
    "T008": ("いじめ・自殺防止コンクール", '"再チャレンジ東京" いじめ 自殺防止 コンクール 審査発表会'),
    "T009": ("領収書・謝礼・架空実績", '"再チャレンジ東京" 領収書 偽造 謝礼 水増し 架空相談'),
    "T010": ("現地確認と発覚経緯", '"再チャレンジ東京" 2025年1月 現地確認 相談員 実績報告'),
    "T011": ("解散・破産・法人情報", '"再チャレンジ東京" 解散 破産手続 2025年10月29日'),
    "T012": ("警察連携・行政対応", '"再チャレンジ東京" 警視庁 新宿警察署 情報提供 東京都'),
    "T013": ("過去活動・出版物・ポスター", '"再チャレンジ東京" 作文集 ポスター 標語 いじめ 自殺'),
    "T014": ("独立報道・映像", '"再チャレンジ東京" 補助金 不正受給 2026年8月24日 ニュース'),
}

PAGE_SEEDS: list[tuple[str, str, str]] = [
    ("T003,T004,T005,T009,T010,T011,T012", "東京都", "https://www.metro.tokyo.lg.jp/information/press/2026/08/2026082406"),
    ("T003,T006", "東京都保健医療局", "https://www.hokeniryo.metro.tokyo.lg.jp/kenkou/tokyokaigi/minkandantai"),
    ("T003,T006", "東京都保健医療局", "https://www.hokeniryo.metro.tokyo.lg.jp/kenkou/tokyokaigi/rinji1/hojojigyoukoubo"),
    ("T003,T006", "東京都保健医療局", "https://www.hokeniryo.metro.tokyo.lg.jp/kenkou/tokyokaigi/rinji1/hojojigyou"),
    ("T001,T002,T011", "内閣府NPO法人ポータル", "https://www.npo-homepage.go.jp/npoportal/gyosei-print/013006834"),
    ("T001,T002,T011", "東京都NPO法人情報", "https://www.seikatubunka1.metro.tokyo.lg.jp/houjin/npo_houjin/list/ledger/0006834.html"),
    ("T014,T003,T004,T009,T010,T011,T012", "テレビ朝日", "https://news.tv-asahi.co.jp/news_society/articles/000528420.html"),
    ("T014,T003,T004,T009,T010,T011,T012", "ABCニュース", "https://www.asahi.co.jp/webnews/pages/ann_000528420.html"),
    ("T014,T003,T004,T009,T010,T011,T012", "NCC長崎文化放送", "https://www.ncctv.co.jp/news/article/16831490"),
    ("T014,T003,T004,T009,T010,T011,T012", "TBS NEWS DIG", "https://newsdig.tbs.co.jp/articles/-/2893309?display=1"),
    ("T014,T003,T004,T009,T010,T011,T012", "FNNプライムオンライン", "https://www.fnn.jp/articles/-/1100503"),
    ("T014,T003,T004,T009,T010,T011,T012", "ライブドア・共同通信", "https://news.livedoor.com/article/detail/32147099/"),
    ("T014,T003,T004,T009,T010,T011,T012", "ライブドア・TBS", "https://news.livedoor.com/article/detail/32147654/"),
    ("T014,T003,T004,T009,T010,T011,T012", "デイリースポーツ・共同通信", "https://origin.daily.co.jp/society/national/2026/08/24/0020742605.shtml"),
    ("T001,T002,T007,T008,T013", "PR TIMES転載・マピオン", "https://www.mapion.co.jp/news/release/000000008.000104320-all/"),
    ("T007,T008,T013", "山脇美術専門学校", "https://yamawaki.ac.jp/2025/02/11/ijime-boshi-compe-vd/"),
    ("T007,T008", "大田区立大森第三中学校", "https://www.ota-school.ed.jp/oomoridai3-js/life/nikki/reiwa6/06060502.html"),
    ("T001,T002,T007,T013", "公明党議員ブログ", "https://www.komei.or.jp/km/chigasaki-kikuchi-masasuke/2023/08/18/%E5%B4%87%E9%AB%98%E3%81%AA%E5%BE%A1%E6%B4%BB%E5%8B%95%E3%81%AB%E6%B7%B1%E8%AC%9D%E7%94%B3%E3%81%97%E4%B8%8A%E3%81%92%E3%81%BE%E3%81%99%E2%80%BC%EF%B8%8F/"),
    ("T002,T013", "CCHR Japan", "https://cchrjapan.org/event20250517/"),
    ("T001,T002,T008,T013", "公明党議員ブログ", "https://www.komei.or.jp/km/miyajimasaiko/2016/11/27/%E5%AF%A9%E6%9F%BB%E7%99%BA%E8%A1%A8%E4%BC%9A/"),
    ("T008,T013", "登竜門2024", "https://compe.japandesign.ne.jp/jigyo-saisei-hyogo-2024/"),
    ("T008,T013", "登竜門2023", "https://compe.japandesign.ne.jp/jigyo-saisei-hyogo-2023/"),
    ("T007,T008,T013", "教育家庭新聞", "https://www.kknews.co.jp/news/20210914yt02"),
    ("T001,T002,T007,T008,T013", "Dream News転載・マピオン", "https://www.mapion.co.jp/news/release/dn0000266566-all/"),
    ("T001,T002,T013", "財界オンライン転載・ライブドア", "https://news.livedoor.com/article/detail/29430284/"),
    ("T013", "誠品オンライン", "https://www.eslite.com/product/1001357605047277"),
    ("T013", "HMV", "https://www.hmv.co.jp/artist_Npo%E6%B3%95%E4%BA%BA%E5%86%8D%E3%83%81%E3%83%A3%E3%83%AC%E3%83%B3%E3%82%B8%E6%9D%B1%E4%BA%AC_000000000841899/item_%E3%81%84%E3%81%98%E3%82%81%E3%83%BB%E8%87%AA%E6%AE%BA%E3%82%B9%E3%83%88%E3%83%83%E3%83%97%E4%BD%9C%E6%96%87%E9%9B%86-%E5%85%A8%E5%9B%BD%E3%80%8C%E3%81%84%E3%81%98%E3%82%81%E3%83%BB%E8%87%AA%E6%AE%BA%E6%92%B2%E6%BB%85%E3%80%8D%E4%BD%9C%E6%96%87%E3%82%B3%E3%83%B3%E3%82%AF%E3%83%BC%E3%83%AB%E5%85%A5%E8%B3%9E%E4%BD%9C%E5%93%81%E3%82%88%E3%82%8A_11033088"),
    ("T001,T013", "セントラルメディカルクラブ", "https://central-mc.jp/company/contribution/"),
    ("T001,T007,T008,T013", "旧公式サイト", "http://www.jigyo-saisei.com/"),
]

DIRECT_SEEDS: list[tuple[str, str, str]] = [
    ("T003,T004,T014", "テレビ朝日", "https://news.tv-asahi.co.jp/articles_img/000528420_1200.jpg"),
    ("T003,T004,T014", "TBS NEWS DIG", "https://newsdig.ismcdn.jp/mwimgs/b/3/680mw/img_b3de4030758813d89d40505d7e860b62745746.jpg"),
]

VIDEO_PAGE_URLS: list[tuple[str, str, str]] = [
    ("T014,T003,T004,T009,T010,T011,T012", "テレビ朝日", "https://news.tv-asahi.co.jp/news_society/articles/000528420.html"),
    ("T014,T003,T004,T009,T010,T011,T012", "ABCニュース", "https://www.asahi.co.jp/webnews/pages/ann_000528420.html"),
    ("T014,T003,T004,T009,T010,T011,T012", "TBS NEWS DIG", "https://newsdig.tbs.co.jp/articles/-/2893309?display=1"),
    ("T014,T003,T004,T009,T010,T011,T012", "FNNプライムオンライン", "https://www.fnn.jp/articles/-/1100503"),
]

YOUTUBE_SEARCHES = [
    '自殺対策事業でNPO法人が補助金を虚偽申請 東京都 約3780万円 返還',
    '自殺防止NPO法人 再チャレンジ東京 補助金 4900万円 取消し 東京都',
    '再チャレンジ東京 補助金 不正受給 ニュース 2026年8月24日',
]

seen_sha: dict[str, str] = {}
asset_rows: list[dict] = []
page_rows: list[dict] = []
pdf_rows: list[dict] = []
video_rows: list[dict] = []
search_rows: list[dict] = []
section_errors: list[dict] = []
discovered_video_ids: set[str] = set()


def now_jst() -> str:
    return datetime.now(JST).isoformat(timespec="seconds")


def sha256(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


def slug(text: str, maxlen: int = 90) -> str:
    text = unquote(text or "")
    text = re.sub(r"[^0-9A-Za-z._-]+", "_", text).strip("._")
    return (text or "asset")[:maxlen]


def request(url: str, *, timeout: int = TIMEOUT) -> requests.Response:
    return SESSION.get(url, timeout=timeout, allow_redirects=True)


def image_extension(fmt: str | None) -> str:
    mapping = {"JPEG": ".jpg", "PNG": ".png", "WEBP": ".webp", "GIF": ".gif", "BMP": ".bmp", "TIFF": ".tiff"}
    return mapping.get((fmt or "").upper(), ".jpg")


def record_asset(
    *,
    target_ids: str,
    media: str,
    source_page: str,
    asset_url: str,
    status: str,
    file: str = "",
    sha: str = "",
    width: int | str = "",
    height: int | str = "",
    size: int | str = "",
    note: str = "",
) -> None:
    asset_rows.append(
        {
            "target_id": target_ids,
            "media": media,
            "source_page": source_page,
            "asset_url": asset_url,
            "status": status,
            "file": file,
            "sha256": sha,
            "width": width,
            "height": height,
            "bytes": size,
            "note": note,
        }
    )


def save_image_bytes(
    data: bytes,
    *,
    asset_url: str,
    source_page: str,
    target_ids: str,
    media: str,
    prefix: str,
    destination: Path = RAW,
    min_width: int = 480,
    min_height: int = 270,
    force: bool = False,
    note: str = "",
) -> str | None:
    if not data:
        record_asset(target_ids=target_ids, media=media, source_page=source_page, asset_url=asset_url, status="EXCLUDED_EMPTY", note=note)
        return None
    digest = sha256(data)
    if digest in seen_sha:
        record_asset(
            target_ids=target_ids,
            media=media,
            source_page=source_page,
            asset_url=asset_url,
            status="SHA_DUPLICATE",
            file=seen_sha[digest],
            sha=digest,
            size=len(data),
            note=note,
        )
        return None
    try:
        with Image.open(io.BytesIO(data)) as image:
            image.load()
            width, height = image.size
            fmt = image.format
    except Exception as exc:
        record_asset(
            target_ids=target_ids,
            media=media,
            source_page=source_page,
            asset_url=asset_url,
            status="EXCLUDED_NOT_IMAGE",
            sha=digest,
            size=len(data),
            note=(note + " " + repr(exc))[:300],
        )
        return None
    if not force and (width < min_width or height < min_height):
        record_asset(
            target_ids=target_ids,
            media=media,
            source_page=source_page,
            asset_url=asset_url,
            status="EXCLUDED_LOW_RES",
            sha=digest,
            width=width,
            height=height,
            size=len(data),
            note=(note + f" format={fmt}").strip(),
        )
        return None
    extension = image_extension(fmt)
    filename = f"{prefix}_{digest[:10]}{extension}"
    path = destination / filename
    path.write_bytes(data)
    seen_sha[digest] = str(path)
    record_asset(
        target_ids=target_ids,
        media=media,
        source_page=source_page,
        asset_url=asset_url,
        status="SAVED",
        file=str(path),
        sha=digest,
        width=width,
        height=height,
        size=len(data),
        note=note,
    )
    return str(path)


def download_image(
    url: str,
    *,
    source_page: str,
    target_ids: str,
    media: str,
    prefix: str,
    force: bool = False,
    note: str = "",
) -> None:
    try:
        response = request(url)
        if response.status_code != 200:
            record_asset(
                target_ids=target_ids,
                media=media,
                source_page=source_page,
                asset_url=url,
                status=f"HTTP_{response.status_code}",
                size=len(response.content),
                note=note,
            )
            return
        content_type = response.headers.get("content-type", "").lower()
        if "text/html" in content_type:
            record_asset(
                target_ids=target_ids,
                media=media,
                source_page=source_page,
                asset_url=url,
                status="EXCLUDED_HTML",
                size=len(response.content),
                note=(note + " " + content_type).strip(),
            )
            return
        save_image_bytes(
            response.content,
            asset_url=response.url,
            source_page=source_page,
            target_ids=target_ids,
            media=media,
            prefix=prefix,
            force=force,
            note=note,
        )
    except Exception as exc:
        record_asset(
            target_ids=target_ids,
            media=media,
            source_page=source_page,
            asset_url=url,
            status="ERROR",
            note=(note + " " + repr(exc))[:300],
        )


def add_json_images(value, found: set[str]) -> None:
    if isinstance(value, dict):
        for key, nested in value.items():
            if key.lower() in {"image", "images", "contenturl", "thumbnailurl", "url", "imageurl"}:
                if isinstance(nested, str) and re.search(r"\.(?:jpe?g|png|webp)(?:[?#].*)?$", nested, re.I):
                    found.add(nested)
                elif isinstance(nested, (dict, list)):
                    add_json_images(nested, found)
            elif isinstance(nested, (dict, list)):
                add_json_images(nested, found)
    elif isinstance(value, list):
        for nested in value:
            add_json_images(nested, found)


def best_srcset(value: str) -> str | None:
    candidates: list[tuple[float, str]] = []
    for part in value.split(","):
        bits = part.strip().split()
        if not bits:
            continue
        score = 0.0
        if len(bits) > 1:
            match = re.match(r"([0-9.]+)(w|x)", bits[1])
            if match:
                score = float(match.group(1))
        candidates.append((score, bits[0]))
    return max(candidates, default=(0.0, ""))[1] or None


def relevant_image_url(url: str) -> bool:
    lower = url.lower()
    blocked = (
        "favicon",
        "sprite",
        "icon_",
        "/icon/",
        "logo_",
        "/logo/",
        "share_",
        "sns_",
        "tracking",
        "beacon",
        "pixel",
        "doubleclick",
        "advert",
        "adsystem",
    )
    return not any(token in lower for token in blocked)


def download_render_pdf(target_ids: str, media: str, source_page: str, pdf_url: str, page_idx: int, pdf_idx: int) -> None:
    try:
        response = request(pdf_url, timeout=70)
        if response.status_code != 200 or not response.content.startswith(b"%PDF"):
            pdf_rows.append(
                {
                    "target_id": target_ids,
                    "media": media,
                    "source_page": source_page,
                    "pdf_url": pdf_url,
                    "status": f"HTTP_{response.status_code}_NOT_PDF",
                    "file": "",
                    "sha256": "",
                    "pages": 0,
                }
            )
            return
        digest = sha256(response.content)
        pdf_path = META / f"p{page_idx:03d}_pdf{pdf_idx:02d}_{digest[:10]}.pdf"
        pdf_path.write_bytes(response.content)
        prefix = PDF_DIR / f"p{page_idx:03d}_pdf{pdf_idx:02d}_{digest[:8]}_page"
        completed = subprocess.run(
            ["pdftoppm", "-png", "-r", "170", str(pdf_path), str(prefix)],
            text=True,
            capture_output=True,
            timeout=300,
        )
        pages = 0
        for image_path in sorted(PDF_DIR.glob(prefix.name + "-*.png")):
            data = image_path.read_bytes()
            image_path.unlink(missing_ok=True)
            pages += 1
            save_image_bytes(
                data,
                asset_url=f"{pdf_url}#page={pages}",
                source_page=source_page,
                target_ids=target_ids,
                media=media,
                prefix=f"p{page_idx:03d}_pdf{pdf_idx:02d}_page{pages:03d}",
                destination=PDF_DIR,
                force=True,
                note="公式・原資料PDFの無改変ページ画像",
            )
        pdf_rows.append(
            {
                "target_id": target_ids,
                "media": media,
                "source_page": source_page,
                "pdf_url": pdf_url,
                "status": "SAVED",
                "file": str(pdf_path),
                "sha256": digest,
                "pages": pages,
                "returncode": completed.returncode,
                "stderr": completed.stderr[-500:],
            }
        )
    except Exception as exc:
        pdf_rows.append(
            {
                "target_id": target_ids,
                "media": media,
                "source_page": source_page,
                "pdf_url": pdf_url,
                "status": "ERROR",
                "file": "",
                "sha256": "",
                "pages": 0,
                "note": repr(exc)[:300],
            }
        )


def crawl_page(target_ids: str, media: str, page_url: str, idx: int) -> None:
    started = time.time()
    found: set[str] = set()
    pdf_links: set[str] = set()
    before = len(asset_rows)
    try:
        response = request(page_url, timeout=50)
        status = f"HTTP_{response.status_code}"
        if response.status_code != 200:
            page_rows.append(
                {
                    "target_id": target_ids,
                    "media": media,
                    "page_url": page_url,
                    "status": status,
                    "found_total": 0,
                    "saved": 0,
                    "sha_duplicate": 0,
                    "excluded": 0,
                    "pdf_links": 0,
                    "seconds": round(time.time() - started, 2),
                }
            )
            return
        soup = BeautifulSoup(response.text, "lxml")
        for tag in soup.find_all(["meta", "img", "source", "a", "video", "link"]):
            values: list[str | None] = []
            if tag.name == "meta":
                values = [tag.get("content")]
            elif tag.name == "a":
                href = tag.get("href")
                if href and re.search(r"\.pdf(?:[?#].*)?$", href, re.I):
                    pdf_links.add(urljoin(response.url, href))
                values = [href]
            elif tag.name == "link":
                values = [tag.get("href")]
            else:
                values = [
                    tag.get(key)
                    for key in (
                        "src",
                        "data-src",
                        "data-original",
                        "data-lazy-src",
                        "data-image",
                        "poster",
                        "content",
                    )
                ]
            for value in values:
                if not value:
                    continue
                value = html.unescape(value).replace("\\/", "/")
                if re.search(r"\.(?:jpe?g|png|webp)(?:[?#].*)?$", value, re.I):
                    absolute = urljoin(response.url, value)
                    if relevant_image_url(absolute):
                        found.add(absolute)
            for key in ("srcset", "data-srcset"):
                value = tag.get(key)
                if value:
                    best = best_srcset(value)
                    if best:
                        absolute = urljoin(response.url, html.unescape(best).replace("\\/", "/"))
                        if relevant_image_url(absolute):
                            found.add(absolute)
        for script in soup.find_all("script", type=re.compile(r"ld\+json", re.I)):
            try:
                add_json_images(json.loads(script.get_text(strip=True)), found)
            except Exception:
                pass
        raw = html.unescape(response.text).replace("\\/", "/")
        for image_url in re.findall(r"https?://[^\"'<>\s]+?\.(?:jpe?g|png|webp)(?:\?[^\"'<>\s]*)?", raw, re.I):
            if relevant_image_url(image_url):
                found.add(image_url)
        for pdf_url in re.findall(r"https?://[^\"'<>\s]+?\.pdf(?:\?[^\"'<>\s]*)?", raw, re.I):
            pdf_links.add(pdf_url)
        candidates = sorted(found)[:MAX_IMAGES_PER_PAGE]
        with cf.ThreadPoolExecutor(max_workers=8) as executor:
            futures = [
                executor.submit(
                    download_image,
                    image_url,
                    source_page=response.url,
                    target_ids=target_ids,
                    media=media,
                    prefix=f"p{idx:03d}_{number:03d}_{slug(Path(urlparse(image_url).path).stem, 28)}",
                )
                for number, image_url in enumerate(candidates, 1)
            ]
            for future in futures:
                try:
                    future.result()
                except Exception as exc:
                    section_errors.append({"section": "crawl_page_image", "url": page_url, "error": repr(exc)})
        new_rows = asset_rows[before:]
        saved = sum(row.get("status") == "SAVED" for row in new_rows)
        duplicates = sum(row.get("status") == "SHA_DUPLICATE" for row in new_rows)
        excluded = len(new_rows) - saved - duplicates
        page_rows.append(
            {
                "target_id": target_ids,
                "media": media,
                "page_url": page_url,
                "status": status,
                "found_total": len(new_rows),
                "saved": saved,
                "sha_duplicate": duplicates,
                "excluded": excluded,
                "pdf_links": len(pdf_links),
                "seconds": round(time.time() - started, 2),
            }
        )
        for pdf_idx, pdf_url in enumerate(sorted(pdf_links)[:10], 1):
            download_render_pdf(target_ids, media, response.url, pdf_url, idx, pdf_idx)
    except Exception as exc:
        page_rows.append(
            {
                "target_id": target_ids,
                "media": media,
                "page_url": page_url,
                "status": "ERROR",
                "found_total": 0,
                "saved": 0,
                "sha_duplicate": 0,
                "excluded": 0,
                "pdf_links": 0,
                "seconds": round(time.time() - started, 2),
                "note": repr(exc)[:300],
            }
        )


def search_url(surface: str, query: str) -> str:
    if surface == "画像検索":
        return "https://www.bing.com/images/search?q=" + quote_plus(query)
    if surface == "X":
        return "https://www.bing.com/search?q=" + quote_plus("site:x.com " + query)
    if surface == "YouTube":
        return "https://www.youtube.com/results?search_query=" + quote_plus(query)
    return "https://www.bing.com/search?q=" + quote_plus(query)


def parse_image_search_urls(text: str) -> list[str]:
    urls: list[str] = []
    for raw in re.findall(r'"murl"\s*:\s*"([^"]+)"', text):
        value = html.unescape(raw).replace("\\/", "/").replace("\\u002f", "/")
        if value.startswith("http") and relevant_image_url(value):
            urls.append(value)
    return list(dict.fromkeys(urls))


def parse_youtube_ids(text: str) -> list[str]:
    return list(dict.fromkeys(re.findall(r'"videoId"\s*:\s*"([A-Za-z0-9_-]{11})"', text)))


def count_web_results(text: str) -> int:
    count = len(re.findall(r'class=["\']b_algo["\']', text))
    return count or len(re.findall(r"<li[^>]+class=[\"']b_algo", text, re.I))


def one_search(job: tuple[str, int, str, str]) -> dict:
    target_id, round_number, surface, query = job
    url = search_url(surface, query)
    try:
        response = request(url, timeout=30)
        result_count = 0
        found_images: list[str] = []
        found_videos: list[str] = []
        if response.status_code == 200:
            if surface == "画像検索":
                found_images = parse_image_search_urls(response.text)
                result_count = len(found_images)
            elif surface == "YouTube":
                found_videos = parse_youtube_ids(response.text)
                result_count = len(found_videos)
            else:
                result_count = count_web_results(response.text)
        result = "SEARCHED_HIT" if result_count else ("SEARCHED_NO_HIT" if response.status_code == 200 else f"HTTP_{response.status_code}")
        return {
            "target_id": target_id,
            "探索巡": round_number,
            "探索面": surface,
            "実行検索語": query,
            "検索日時": now_jst(),
            "確認結果件数": result_count,
            "結果": result,
            "search_url": url,
            "image_urls": found_images[:MAX_IMAGE_SEARCH_DOWNLOADS],
            "video_ids": found_videos[:10],
        }
    except Exception as exc:
        return {
            "target_id": target_id,
            "探索巡": round_number,
            "探索面": surface,
            "実行検索語": query,
            "検索日時": now_jst(),
            "確認結果件数": 0,
            "結果": "ERROR",
            "search_url": url,
            "image_urls": [],
            "video_ids": [],
            "note": repr(exc)[:250],
        }


def run_search_matrix() -> None:
    jobs: list[tuple[str, int, str, str]] = []
    for target_id, (label, base_query) in TARGETS.items():
        queries = {
            1: base_query,
            2: f'{base_query} "{label}" 写真 動画 資料 PDF 公式 2025 2026',
        }
        for round_number, query in queries.items():
            for surface in ("公式", "報道", "画像検索", "X", "YouTube"):
                if surface == "公式":
                    actual_query = query + " site:metro.tokyo.lg.jp OR site:hokeniryo.metro.tokyo.lg.jp OR site:npo-homepage.go.jp OR site:jigyo-saisei.com"
                elif surface == "報道":
                    actual_query = query + " ニュース 報道"
                elif surface == "YouTube":
                    actual_query = query + " ニュース"
                else:
                    actual_query = query
                jobs.append((target_id, round_number, surface, actual_query))
    results: list[dict] = []
    with cf.ThreadPoolExecutor(max_workers=8) as executor:
        for result in executor.map(one_search, jobs):
            results.append(result)
    for search_index, result in enumerate(results, 1):
        image_urls = result.pop("image_urls", [])
        video_ids = result.pop("video_ids", [])
        search_rows.append(result)
        discovered_video_ids.update(video_ids)
        if result.get("探索面") == "画像検索":
            target_id = str(result.get("target_id", ""))
            with cf.ThreadPoolExecutor(max_workers=4) as executor:
                futures = [
                    executor.submit(
                        download_image,
                        image_url,
                        source_page=str(result.get("search_url", "")),
                        target_ids=target_id,
                        media="Bing画像検索",
                        prefix=f"search_{search_index:03d}_{number:02d}",
                        note="二巡探索で発見した題材関連候補",
                    )
                    for number, image_url in enumerate(image_urls, 1)
                ]
                for future in futures:
                    try:
                        future.result()
                    except Exception as exc:
                        section_errors.append({"section": "search_image_download", "error": repr(exc)})


def capture_page_screenshots() -> None:
    try:
        from playwright.sync_api import sync_playwright
    except Exception as exc:
        section_errors.append({"section": "playwright_import", "error": repr(exc)})
        return
    try:
        with sync_playwright() as playwright:
            browser = playwright.chromium.launch(headless=True, args=["--no-sandbox", "--disable-dev-shm-usage"])
            context = browser.new_context(viewport={"width": 1440, "height": 900}, locale="ja-JP", user_agent=UA)
            for idx, (target_ids, media, page_url) in enumerate(PAGE_SEEDS, 1):
                page = context.new_page()
                try:
                    page.goto(page_url, wait_until="domcontentloaded", timeout=50000)
                    page.wait_for_timeout(1800)
                    try:
                        page.keyboard.press("Escape")
                    except Exception:
                        pass
                    body_height = page.evaluate("Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)")
                    max_y = max(0, int(body_height) - 900)
                    positions = [0]
                    if max_y >= 650:
                        positions.append(min(850, max_y))
                    if max_y >= 1500:
                        positions.append(min(1700, max_y))
                    positions = list(dict.fromkeys(positions))
                    for shot_no, y in enumerate(positions, 1):
                        page.evaluate(f"window.scrollTo(0, {y})")
                        page.wait_for_timeout(500)
                        shot_path = SCREENSHOTS / f"page_{idx:03d}_{shot_no:02d}_{slug(media, 30)}.png"
                        page.screenshot(path=str(shot_path), full_page=False)
                        data = shot_path.read_bytes()
                        shot_path.unlink(missing_ok=True)
                        save_image_bytes(
                            data,
                            asset_url=f"{page_url}#viewport_y={y}",
                            source_page=page_url,
                            target_ids=target_ids,
                            media=media,
                            prefix=f"page_{idx:03d}_{shot_no:02d}_{slug(media, 30)}",
                            destination=SCREENSHOTS,
                            force=True,
                            note="原ページの実ブラウザ表示を無改変で保存",
                        )
                except Exception as exc:
                    section_errors.append({"section": "page_screenshot", "url": page_url, "error": repr(exc)[:300]})
                finally:
                    page.close()
            context.close()
            browser.close()
    except Exception as exc:
        section_errors.append({"section": "playwright_run", "error": repr(exc)[:500]})


def youtube_search_ids(query: str, limit: int = 8) -> list[str]:
    try:
        response = request("https://www.youtube.com/results?search_query=" + quote_plus(query), timeout=30)
        if response.status_code != 200:
            return []
        return parse_youtube_ids(response.text)[:limit]
    except Exception:
        return []


def extract_frames(video_path: Path, target_ids: str, media: str, source_url: str) -> None:
    try:
        probe = subprocess.run(
            ["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "default=noprint_wrappers=1:nokey=1", str(video_path)],
            text=True,
            capture_output=True,
            timeout=60,
        )
        duration = float(probe.stdout.strip()) if probe.stdout.strip() else 60.0
    except Exception:
        duration = 60.0
    count = 14
    if duration < 20:
        count = 6
    stamps = [max(0.2, duration * (index + 1) / (count + 1)) for index in range(count)]
    for frame_no, stamp in enumerate(stamps, 1):
        temporary = FRAMES / f"tmp_{video_path.stem}_{frame_no:02d}.jpg"
        try:
            completed = subprocess.run(
                ["ffmpeg", "-y", "-ss", f"{stamp:.2f}", "-i", str(video_path), "-frames:v", "1", "-q:v", "2", str(temporary)],
                text=True,
                capture_output=True,
                timeout=120,
            )
            if completed.returncode != 0 or not temporary.exists():
                continue
            data = temporary.read_bytes()
            temporary.unlink(missing_ok=True)
            save_image_bytes(
                data,
                asset_url=f"{source_url}#t={stamp:.2f}",
                source_page=source_url,
                target_ids=target_ids,
                media=media,
                prefix=f"{video_path.stem[:70]}_frame_{frame_no:02d}_{stamp:06.2f}s",
                destination=FRAMES,
                force=True,
                note=f"原動画 {video_path.name} の実フレーム",
            )
        except Exception as exc:
            section_errors.append({"section": "extract_frame", "file": str(video_path), "error": repr(exc)[:250]})
            temporary.unlink(missing_ok=True)


def download_one_video(index: int, target_ids: str, media: str, url: str) -> None:
    output_template = str(VIDEOS / f"v{index:02d}_%(id)s_%(title).70B.%(ext)s")
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
        "--concurrent-fragments",
        "4",
        "--match-filter",
        "duration < 1200",
        "-f",
        "bestvideo[height<=720]+bestaudio/best[height<=720]/best",
        "--merge-output-format",
        "mp4",
        "--write-info-json",
        "--write-thumbnail",
        "--convert-thumbnails",
        "jpg",
        "--max-filesize",
        "260M",
        "--restrict-filenames",
        "-o",
        output_template,
        url,
    ]
    started = time.time()
    try:
        completed = subprocess.run(command, text=True, capture_output=True, timeout=1100)
        video_files = [
            path
            for path in sorted(VIDEOS.glob(f"v{index:02d}_*"))
            if path.suffix.lower() in {".mp4", ".webm", ".mkv", ".mov", ".m4v"}
        ]
        for video_file in video_files:
            extract_frames(video_file, target_ids, media, url)
        video_rows.append(
            {
                "target_id": target_ids,
                "media": media,
                "url": url,
                "returncode": completed.returncode,
                "files": ";".join(str(path) for path in video_files),
                "seconds": round(time.time() - started, 2),
                "stdout_tail": completed.stdout[-1200:],
                "stderr_tail": completed.stderr[-1800:],
            }
        )
    except Exception as exc:
        video_rows.append(
            {
                "target_id": target_ids,
                "media": media,
                "url": url,
                "returncode": -1,
                "files": "",
                "seconds": round(time.time() - started, 2),
                "stderr_tail": repr(exc)[:500],
            }
        )


def download_videos() -> None:
    candidates: list[tuple[str, str, str]] = list(VIDEO_PAGE_URLS)
    for query in YOUTUBE_SEARCHES:
        for video_id in youtube_search_ids(query, limit=6):
            discovered_video_ids.add(video_id)
    for video_id in sorted(discovered_video_ids):
        candidates.append(("T014", "YouTube公式・報道検索", "https://www.youtube.com/watch?v=" + video_id))
    unique: list[tuple[str, str, str]] = []
    seen_urls: set[str] = set()
    for item in candidates:
        if item[2] not in seen_urls:
            unique.append(item)
            seen_urls.add(item[2])
    for index, (target_ids, media, url) in enumerate(unique[:MAX_VIDEO_DOWNLOADS], 1):
        download_one_video(index, target_ids, media, url)


def write_csv(path: Path, rows: list[dict]) -> None:
    fields: list[str] = []
    for row in rows:
        for key in row:
            if key not in fields:
                fields.append(key)
    if not fields:
        fields = ["status"]
        rows = [{"status": "NO_ROWS"}]
    with path.open("w", encoding="utf-8-sig", newline="") as handle:
        writer = csv.DictWriter(handle, fieldnames=fields, extrasaction="ignore")
        writer.writeheader()
        writer.writerows(rows)


def build_inventory() -> list[dict]:
    inventory: list[dict] = []
    for path in sorted(ROOT.rglob("*")):
        if not path.is_file() or path.suffix.lower() in {".csv", ".json", ".txt"}:
            continue
        data = path.read_bytes()
        digest = sha256(data)
        width: int | str = ""
        height: int | str = ""
        if path.suffix.lower() in {".jpg", ".jpeg", ".png", ".webp", ".gif", ".bmp", ".tif", ".tiff"}:
            try:
                with Image.open(path) as image:
                    width, height = image.size
            except Exception:
                pass
        inventory.append(
            {
                "file": str(path),
                "sha256": digest,
                "bytes": len(data),
                "width": width,
                "height": height,
                "suffix": path.suffix.lower(),
            }
        )
    return inventory


def finalise() -> None:
    inventory = build_inventory()
    write_csv(META / "search_log.csv", search_rows)
    write_csv(META / "asset_discovery.csv", asset_rows)
    write_csv(META / "page_reconciliation.csv", page_rows)
    write_csv(META / "pdf_status.csv", pdf_rows)
    write_csv(META / "video_status.csv", video_rows)
    write_csv(META / "inventory.csv", inventory)
    write_csv(META / "section_errors.csv", section_errors)
    summary = {
        "targets": len(TARGETS),
        "search_rows": len(search_rows),
        "pages": len(PAGE_SEEDS),
        "direct_seeds": len(DIRECT_SEEDS),
        "video_inputs": len(video_rows),
        "saved_asset_records": sum(row.get("status") == "SAVED" for row in asset_rows),
        "sha_duplicate_records": sum(row.get("status") == "SHA_DUPLICATE" for row in asset_rows),
        "inventory_files": len(inventory),
        "section_errors": len(section_errors),
        "generated_at_jst": now_jst(),
    }
    (META / "summary.json").write_text(json.dumps(summary, ensure_ascii=False, indent=2), encoding="utf-8")
    print(json.dumps(summary, ensure_ascii=False))


def main() -> None:
    (META / "heartbeat.txt").write_text("collection started " + now_jst(), encoding="utf-8")
    sections = [
        ("search_matrix", run_search_matrix),
        ("direct_images", lambda: [
            download_image(url, source_page=url, target_ids=target_ids, media=media, prefix=f"direct_{index:03d}", force=True, note="記事配信元の原画像URL")
            for index, (target_ids, media, url) in enumerate(DIRECT_SEEDS, 1)
        ]),
        ("page_crawl", lambda: [crawl_page(target_ids, media, url, index) for index, (target_ids, media, url) in enumerate(PAGE_SEEDS, 1)]),
        ("page_screenshots", capture_page_screenshots),
        ("videos", download_videos),
    ]
    for section_name, function in sections:
        try:
            function()
        except Exception as exc:
            section_errors.append(
                {
                    "section": section_name,
                    "error": repr(exc)[:500],
                    "traceback": traceback.format_exc()[-2500:],
                }
            )
    finalise()
    (META / "heartbeat.txt").write_text("collection completed " + now_jst(), encoding="utf-8")


if __name__ == "__main__":
    try:
        main()
    except Exception as exc:
        section_errors.append({"section": "top_level", "error": repr(exc), "traceback": traceback.format_exc()[-3000:]})
        try:
            finalise()
        except Exception:
            pass
        print(traceback.format_exc())
        sys.exit(0)
