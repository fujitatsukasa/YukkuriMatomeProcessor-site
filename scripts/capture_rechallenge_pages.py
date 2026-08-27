from __future__ import annotations

import csv
import hashlib
import json
import re
import subprocess
import time
from datetime import datetime, timedelta, timezone
from pathlib import Path
from urllib.parse import unquote, urlparse

import requests
from PIL import Image
from playwright.sync_api import TimeoutError as PlaywrightTimeoutError
from playwright.sync_api import sync_playwright

ROOT = Path('output_screens')
SCREENS = ROOT / 'screens'
IMAGES = ROOT / 'dynamic_images'
PDF_PAGES = ROOT / 'pdf_pages'
PDF_FILES = ROOT / 'pdf_files'
META = ROOT / 'meta'
for d in (SCREENS, IMAGES, PDF_PAGES, PDF_FILES, META):
    d.mkdir(parents=True, exist_ok=True)

JST = timezone(timedelta(hours=9))
UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151 Safari/537.36'
SESSION = requests.Session()
SESSION.headers.update({'User-Agent': UA, 'Accept-Language': 'ja,en-US;q=0.8,en;q=0.6'})

SOURCES = [
    {'media': '東京都', 'target_id': 'T003,T004,T005,T009,T010,T011,T012', 'url': 'https://www.metro.tokyo.lg.jp/information/press/2026/08/2026082406', 'keywords': ['交付決定額', '返還請求額', '返還請求年月日', '解散', '新宿警察署']},
    {'media': '東京都保健医療局', 'target_id': 'T003,T006', 'url': 'https://www.hokeniryo.metro.tokyo.lg.jp/kenkou/tokyokaigi/minkandantai', 'keywords': ['地域自殺対策', '補助事業', '交付要綱', '実績報告']},
    {'media': '東京都保健医療局', 'target_id': 'T003,T006', 'url': 'https://www.hokeniryo.metro.tokyo.lg.jp/kenkou/tokyokaigi/rinji1/hojojigyoukoubo', 'keywords': ['補助対象事業', '募集要項', '交付要綱', '応募']},
    {'media': '東京都保健医療局', 'target_id': 'T003,T006', 'url': 'https://www.hokeniryo.metro.tokyo.lg.jp/kenkou/tokyokaigi/rinji1/hojojigyou', 'keywords': ['補助事業', '実績報告', '交付申請', '交付要綱']},
    {'media': '内閣府NPO法人ポータル', 'target_id': 'T001,T002,T011', 'url': 'https://www.npo-homepage.go.jp/npoportal/gyosei-print/013006834', 'keywords': ['再チャレンジ東京', '代表者氏名', '解散', '破産手続開始']},
    {'media': 'テレビ朝日', 'target_id': 'T014,T003,T004,T009,T010,T011,T012', 'url': 'https://news.tv-asahi.co.jp/news_society/articles/000528420.html', 'keywords': ['領収書', '相談員', '赤字', '破産', '返還']},
    {'media': 'ABCニュース', 'target_id': 'T014,T003,T004,T009,T010,T011,T012', 'url': 'https://www.asahi.co.jp/webnews/pages/ann_000528420.html', 'keywords': ['領収書', '相談員', '赤字', '破産']},
    {'media': 'NCC長崎文化放送', 'target_id': 'T014,T003,T004,T009,T010,T011,T012', 'url': 'https://www.ncctv.co.jp/news/article/16831490', 'keywords': ['領収書', '相談員', '赤字', '破産']},
    {'media': 'TBS NEWS DIG', 'target_id': 'T014,T003,T004,T009,T010,T011,T012', 'url': 'https://newsdig.tbs.co.jp/articles/-/2893309', 'keywords': ['領収書', '対面相談', '実績報告', '破産', '返還命令']},
    {'media': 'ライブドア・読売', 'target_id': 'T014,T004,T009,T010,T011', 'url': 'https://news.livedoor.com/article/detail/32165265/', 'keywords': ['領収書', '実施していない', '破産手続', '返還']},
    {'media': 'ライブドア・共同', 'target_id': 'T014,T003,T004,T009,T010,T011', 'url': 'https://news.livedoor.com/article/detail/32147099/', 'keywords': ['見分けがつかなかった', '領収書', '返還', '解散']},
    {'media': 'デイリースポーツ・共同', 'target_id': 'T014,T003,T004,T009,T010,T011', 'url': 'https://origin.daily.co.jp/society/national/2026/08/24/0020742605.shtml', 'keywords': ['領収書', '返還', '解散']},
    {'media': 'PR TIMES', 'target_id': 'T001,T002,T007,T008,T013', 'url': 'https://prtimes.jp/main/html/rd/p/000000008.000104320.html', 'keywords': ['いじめ・自殺防止', '審査発表会', '作文コンクール', '道徳特別授業']},
    {'media': 'PR TIMES転載・マピオン', 'target_id': 'T001,T002,T007,T008,T013', 'url': 'https://www.mapion.co.jp/news/release/000000008.000104320-all/', 'keywords': ['いじめ・自殺防止', '審査発表会', '作文コンクール', '道徳特別授業']},
    {'media': '山脇美術専門学校', 'target_id': 'T007,T008,T013', 'url': 'https://yamawaki.ac.jp/2025/02/11/ijime-boshi-compe-vd/', 'keywords': ['いじめ・自殺防止', 'コンクール', '受賞', 'キャラクター']},
    {'media': '大田区立大森第三中学校', 'target_id': 'T007,T008', 'url': 'https://www.ota-school.ed.jp/oomoridai3-js/life/nikki/reiwa6/06060502.html', 'keywords': ['道徳特別授業', '再チャレンジ東京', 'いじめ', '自殺']},
    {'media': '公明党議員ブログ', 'target_id': 'T001,T002,T008,T013', 'url': 'https://www.komei.or.jp/km/miyajimasaiko/2016/11/27/%E5%AF%A9%E6%9F%BB%E7%99%BA%E8%A1%A8%E4%BC%9A/', 'keywords': ['審査発表会', '再チャレンジ東京', '表彰式', 'コンクール']},
    {'media': '公明党議員ブログ', 'target_id': 'T001,T002,T007,T013', 'url': 'https://www.komei.or.jp/km/chigasaki-kikuchi-masasuke/2023/08/18/%E5%B4%87%E9%AB%98%E3%81%AA%E5%BE%A1%E6%B4%BB%E5%8B%95%E3%81%AB%E6%B7%B1%E8%AC%9D%E7%94%B3%E3%81%97%E4%B8%8A%E3%81%92%E3%81%BE%E3%81%99%E2%80%BC%EF%B8%8F/', 'keywords': ['再チャレンジ東京', '自殺防止', '活動', '平林']},
    {'media': '登竜門', 'target_id': 'T008,T013', 'url': 'https://compe.japandesign.ne.jp/jigyo-saisei-hyogo-2024/', 'keywords': ['第12回', 'いじめ・自殺防止', '応募要項', '審査発表会']},
    {'media': '登竜門', 'target_id': 'T008,T013', 'url': 'https://compe.japandesign.ne.jp/jigyo-saisei-hyogo-2023/', 'keywords': ['第11回', 'いじめ・自殺防止', '応募要項', 'コンクール']},
    {'media': '教育家庭新聞', 'target_id': 'T007,T008,T013', 'url': 'https://www.kknews.co.jp/news/20210914yt02', 'keywords': ['いじめ・自殺を防止', '再チャレンジ東京', '道徳', '授業']},
    {'media': '旧公式サイト', 'target_id': 'T001,T002,T007,T008,T013', 'url': 'http://www.jigyo-saisei.com/', 'keywords': ['いじめ・自殺防止', '道徳特別授業', '審査発表会', '作文コンクール', '代表']},
    {'media': 'HMV', 'target_id': 'T001,T008,T013', 'url': 'https://www.hmv.co.jp/artist_Npo%E6%B3%95%E4%BA%BA%E5%86%8D%E3%83%81%E3%83%A3%E3%83%AC%E3%83%B3%E3%82%B8%E6%9D%B1%E4%BA%AC_000000000841899/item_%E3%81%84%E3%81%98%E3%82%81%E3%83%BB%E8%87%AA%E6%AE%BA%E3%82%B9%E3%83%88%E3%83%83%E3%83%97%E4%BD%9C%E6%96%87%E9%9B%86-%E5%85%A8%E5%9B%BD%E3%80%8C%E3%81%84%E3%81%98%E3%82%81%E3%83%BB%E8%87%AA%E6%AE%BA%E6%92%B2%E6%BB%85%E3%80%8D%E4%BD%9C%E6%96%87%E3%82%B3%E3%83%B3%E3%82%AF%E3%83%BC%E3%83%AB%E5%85%A5%E8%B3%9E%E4%BD%9C%E5%93%81%E3%82%88%E3%82%8A_11033088', 'keywords': ['いじめ・自殺ストップ作文集', '再チャレンジ東京', '作文コンクール']},
    {'media': 'セントラルメディカルクラブ', 'target_id': 'T001,T002,T007,T013', 'url': 'https://central-mc.jp/company/contribution/', 'keywords': ['再チャレンジ東京', '寄贈', '社会貢献', '自殺防止']},
]

screen_rows: list[dict] = []
image_rows: list[dict] = []
pdf_rows: list[dict] = []
page_rows: list[dict] = []
seen_sha: dict[str, str] = {}


def now_jst() -> str:
    return datetime.now(JST).isoformat(timespec='seconds')


def sha256(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


def slug(text: str, limit: int = 70) -> str:
    text = unquote(text)
    text = re.sub(r'[^0-9A-Za-z._-]+', '_', text).strip('._')
    return (text or 'item')[:limit]


def image_dimensions(path: Path) -> tuple[int, int]:
    with Image.open(path) as im:
        im.load()
        return im.size


def save_bytes(data: bytes, path: Path) -> tuple[str, bool]:
    h = sha256(data)
    if h in seen_sha:
        return h, False
    path.write_bytes(data)
    seen_sha[h] = str(path)
    return h, True


def click_consent(page) -> None:
    labels = ['同意する', '同意', 'Accept', 'すべて許可', '閉じる', 'あとで', 'OK']
    for label in labels:
        try:
            locator = page.get_by_role('button', name=re.compile(label, re.I)).first
            if locator.count() and locator.is_visible():
                locator.click(timeout=1000)
                page.wait_for_timeout(250)
        except Exception:
            pass


def capture_screenshot(page, src: dict, page_idx: int, label: str, position_note: str) -> str:
    page.wait_for_timeout(700)
    name = f's{page_idx:02d}_{slug(src["media"])}_{slug(label)}.png'
    path = SCREENS / name
    data = page.screenshot(type='png', full_page=False, animations='disabled')
    h, unique = save_bytes(data, path)
    if not unique:
        path.unlink(missing_ok=True)
        screen_rows.append({'target_id': src['target_id'], 'media': src['media'], 'source_page': src['url'], 'capture_label': label, 'position_note': position_note, 'status': 'SHA_DUPLICATE', 'file': seen_sha[h], 'sha256': h, 'width': 1920, 'height': 1080, 'captured_at': now_jst()})
        return 'duplicate'
    w, hgt = image_dimensions(path)
    screen_rows.append({'target_id': src['target_id'], 'media': src['media'], 'source_page': src['url'], 'capture_label': label, 'position_note': position_note, 'status': 'SAVED', 'file': str(path), 'sha256': h, 'width': w, 'height': hgt, 'captured_at': now_jst()})
    return 'saved'


def download_dynamic_images(page, src: dict, page_idx: int) -> tuple[int, int, int]:
    try:
        items = page.locator('img').evaluate_all('''els => els.map((e,i) => ({i, src:e.currentSrc || e.src || '', alt:e.alt || '', nw:e.naturalWidth || 0, nh:e.naturalHeight || 0})).filter(x => x.src)''')
    except Exception:
        return 0, 0, 0
    found = saved = duplicate = 0
    used_urls = set()
    for item in items:
        url = item.get('src', '')
        if not url or url.startswith('data:') or url in used_urls:
            continue
        used_urls.add(url)
        nw, nh = int(item.get('nw') or 0), int(item.get('nh') or 0)
        if nw < 500 or nh < 280:
            continue
        found += 1
        try:
            r = SESSION.get(url, timeout=35, allow_redirects=True, headers={'Referer': src['url']})
            if r.status_code != 200 or 'image' not in r.headers.get('content-type', '').lower():
                image_rows.append({'target_id': src['target_id'], 'media': src['media'], 'source_page': src['url'], 'asset_url': url, 'alt': item.get('alt', ''), 'status': f'HTTP_{r.status_code}', 'file': '', 'sha256': '', 'width': nw, 'height': nh, 'bytes': len(r.content)})
                continue
            ext = Path(urlparse(r.url).path).suffix.lower()
            if ext not in {'.jpg', '.jpeg', '.png', '.webp'}:
                ext = '.jpg'
            h = sha256(r.content)
            name = f'i{page_idx:02d}_{item.get("i",0):03d}_{slug(Path(urlparse(r.url).path).name)}_{h[:8]}{ext}'
            path = IMAGES / name
            if h in seen_sha:
                duplicate += 1
                image_rows.append({'target_id': src['target_id'], 'media': src['media'], 'source_page': src['url'], 'asset_url': r.url, 'alt': item.get('alt', ''), 'status': 'SHA_DUPLICATE', 'file': seen_sha[h], 'sha256': h, 'width': nw, 'height': nh, 'bytes': len(r.content)})
                continue
            path.write_bytes(r.content)
            try:
                w, hgt = image_dimensions(path)
            except Exception:
                path.unlink(missing_ok=True)
                image_rows.append({'target_id': src['target_id'], 'media': src['media'], 'source_page': src['url'], 'asset_url': r.url, 'alt': item.get('alt', ''), 'status': 'EXCLUDED_NOT_IMAGE', 'file': '', 'sha256': h, 'width': nw, 'height': nh, 'bytes': len(r.content)})
                continue
            seen_sha[h] = str(path)
            saved += 1
            image_rows.append({'target_id': src['target_id'], 'media': src['media'], 'source_page': src['url'], 'asset_url': r.url, 'alt': item.get('alt', ''), 'status': 'SAVED', 'file': str(path), 'sha256': h, 'width': w, 'height': hgt, 'bytes': len(r.content)})
        except Exception as exc:
            image_rows.append({'target_id': src['target_id'], 'media': src['media'], 'source_page': src['url'], 'asset_url': url, 'alt': item.get('alt', ''), 'status': 'ERROR', 'file': '', 'sha256': '', 'width': nw, 'height': nh, 'bytes': '', 'note': repr(exc)[:220]})
    return found, saved, duplicate


def get_pdf_links(page, src: dict) -> list[dict]:
    try:
        links = page.locator('a').evaluate_all('''els => els.map(e => ({href:e.href || '', text:(e.innerText || e.textContent || '').trim()})).filter(x => x.href)''')
    except Exception:
        return []
    out = []
    seen = set()
    terms = ('pdf', '要綱', '様式', '募集', '申請', '報告', '応募', '資料', '交付')
    for link in links:
        href = link.get('href', '')
        text = link.get('text', '')
        combo = (href + ' ' + text).lower()
        if href in seen:
            continue
        if any(term in combo for term in terms):
            seen.add(href)
            out.append(link)
    return out[:30]


def download_pdfs(page, src: dict, page_idx: int) -> tuple[int, int, int, int]:
    links = get_pdf_links(page, src)
    found_pages = saved_pages = duplicate_pages = excluded = 0
    for link_idx, link in enumerate(links, 1):
        href = link['href']
        try:
            r = SESSION.get(href, timeout=60, allow_redirects=True, headers={'Referer': src['url']})
            if r.status_code != 200 or not r.content.startswith(b'%PDF'):
                excluded += 1
                pdf_rows.append({'target_id': src['target_id'], 'media': src['media'], 'source_page': src['url'], 'pdf_url': href, 'link_text': link.get('text',''), 'status': 'EXCLUDED_NOT_PDF', 'file': '', 'sha256': '', 'pages': 0})
                continue
            pdf_sha = sha256(r.content)
            pdf_path = PDF_FILES / f'd{page_idx:02d}_{link_idx:02d}_{pdf_sha[:10]}.pdf'
            if not pdf_path.exists():
                pdf_path.write_bytes(r.content)
            prefix = PDF_PAGES / f'd{page_idx:02d}_{link_idx:02d}_{pdf_sha[:8]}_page'
            cp = subprocess.run(['pdftoppm', '-png', '-r', '180', str(pdf_path), str(prefix)], text=True, capture_output=True, timeout=300)
            page_files = sorted(PDF_PAGES.glob(prefix.name + '-*.png'))
            if not page_files:
                excluded += 1
                pdf_rows.append({'target_id': src['target_id'], 'media': src['media'], 'source_page': src['url'], 'pdf_url': href, 'link_text': link.get('text',''), 'status': 'EXCLUDED_RENDER_FAILED', 'file': str(pdf_path), 'sha256': pdf_sha, 'pages': 0, 'note': cp.stderr[-300:]})
                continue
            for pageno, img in enumerate(page_files, 1):
                found_pages += 1
                data = img.read_bytes()
                h = sha256(data)
                w, hgt = image_dimensions(img)
                if h in seen_sha:
                    duplicate_pages += 1
                    img.unlink(missing_ok=True)
                    pdf_rows.append({'target_id': src['target_id'], 'media': src['media'], 'source_page': src['url'], 'pdf_url': href, 'link_text': link.get('text',''), 'status': 'SHA_DUPLICATE_PAGE', 'file': seen_sha[h], 'sha256': h, 'width': w, 'height': hgt, 'page': pageno, 'pages': len(page_files)})
                else:
                    seen_sha[h] = str(img)
                    saved_pages += 1
                    pdf_rows.append({'target_id': src['target_id'], 'media': src['media'], 'source_page': src['url'], 'pdf_url': href, 'link_text': link.get('text',''), 'status': 'SAVED_PAGE', 'file': str(img), 'sha256': h, 'width': w, 'height': hgt, 'page': pageno, 'pages': len(page_files)})
        except Exception as exc:
            excluded += 1
            pdf_rows.append({'target_id': src['target_id'], 'media': src['media'], 'source_page': src['url'], 'pdf_url': href, 'link_text': link.get('text',''), 'status': 'ERROR', 'file': '', 'sha256': '', 'pages': 0, 'note': repr(exc)[:250]})
    return found_pages, saved_pages, duplicate_pages, excluded


def write_csv(path: Path, rows: list[dict]) -> None:
    fields: list[str] = []
    for row in rows:
        for key in row:
            if key not in fields:
                fields.append(key)
    with path.open('w', encoding='utf-8-sig', newline='') as f:
        writer = csv.DictWriter(f, fieldnames=fields)
        writer.writeheader()
        writer.writerows(rows)


def main() -> None:
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True, args=['--disable-dev-shm-usage', '--no-sandbox'])
        context = browser.new_context(viewport={'width': 1920, 'height': 1080}, user_agent=UA, locale='ja-JP', timezone_id='Asia/Tokyo', device_scale_factor=1)
        for page_idx, src in enumerate(SOURCES, 1):
            page = context.new_page()
            found = saved = duplicate = excluded = 0
            started = time.time()
            final_url = src['url']
            status = 'OK'
            note = ''
            try:
                response = page.goto(src['url'], wait_until='domcontentloaded', timeout=60000)
                final_url = page.url
                page.wait_for_timeout(2000)
                click_consent(page)
                page.evaluate('window.scrollTo(0,0)')
                result = capture_screenshot(page, src, page_idx, 'top', 'ページ先頭')
                found += 1
                if result == 'saved': saved += 1
                else: duplicate += 1
                used_scrolls = {0}
                for kw_idx, keyword in enumerate(src['keywords'], 1):
                    try:
                        locator = page.get_by_text(keyword, exact=False).first
                        if not locator.count():
                            excluded += 1
                            screen_rows.append({'target_id': src['target_id'], 'media': src['media'], 'source_page': src['url'], 'capture_label': keyword, 'position_note': 'キーワード該当箇所なし', 'status': 'EXCLUDED_NO_MATCH', 'file': '', 'sha256': '', 'width': '', 'height': '', 'captured_at': now_jst()})
                            continue
                        locator.scroll_into_view_if_needed(timeout=5000)
                        page.evaluate('window.scrollBy(0,-220)')
                        page.wait_for_timeout(500)
                        scroll_y = int(page.evaluate('window.scrollY'))
                        if any(abs(scroll_y - old) < 120 for old in used_scrolls):
                            excluded += 1
                            screen_rows.append({'target_id': src['target_id'], 'media': src['media'], 'source_page': src['url'], 'capture_label': keyword, 'position_note': f'既取得位置と近接 scrollY={scroll_y}', 'status': 'EXCLUDED_NEAR_DUPLICATE_POSITION', 'file': '', 'sha256': '', 'width': '', 'height': '', 'captured_at': now_jst()})
                            continue
                        used_scrolls.add(scroll_y)
                        result = capture_screenshot(page, src, page_idx, f'kw{kw_idx}_{keyword}', f'キーワード付近 scrollY={scroll_y}')
                        found += 1
                        if result == 'saved': saved += 1
                        else: duplicate += 1
                    except Exception as exc:
                        excluded += 1
                        screen_rows.append({'target_id': src['target_id'], 'media': src['media'], 'source_page': src['url'], 'capture_label': keyword, 'position_note': 'キーワード撮影失敗', 'status': 'ERROR', 'file': '', 'sha256': '', 'width': '', 'height': '', 'captured_at': now_jst(), 'note': repr(exc)[:200]})
                img_found, img_saved, img_dup = download_dynamic_images(page, src, page_idx)
                found += img_found
                saved += img_saved
                duplicate += img_dup
                img_excluded = sum(1 for row in image_rows if row.get('source_page') == src['url'] and row.get('status') not in {'SAVED', 'SHA_DUPLICATE'})
                excluded += img_excluded
                pdf_found, pdf_saved, pdf_dup, pdf_excluded = download_pdfs(page, src, page_idx)
                found += pdf_found
                saved += pdf_saved
                duplicate += pdf_dup
                excluded += pdf_excluded
                http_status = response.status if response else ''
            except PlaywrightTimeoutError as exc:
                status = 'TIMEOUT'
                note = repr(exc)[:250]
                http_status = ''
            except Exception as exc:
                status = 'ERROR'
                note = repr(exc)[:250]
                http_status = ''
            page_rows.append({'target_id': src['target_id'], 'media': src['media'], 'page_url': src['url'], 'final_url': final_url, 'status': status, 'http_status': http_status, 'found_total': found + excluded, 'saved': saved, 'sha_duplicate': duplicate, 'excluded': excluded, 'seconds': round(time.time()-started,2), 'note': note})
            page.close()
        context.close()
        browser.close()

    write_csv(META / 'screenshot_manifest.csv', screen_rows)
    write_csv(META / 'dynamic_image_manifest.csv', image_rows)
    write_csv(META / 'pdf_manifest.csv', pdf_rows)
    write_csv(META / 'page_reconciliation.csv', page_rows)
    inventory = []
    for path in sorted(ROOT.rglob('*')):
        if not path.is_file() or path.suffix.lower() in {'.csv', '.json', '.pdf'}:
            continue
        data = path.read_bytes()
        h = sha256(data)
        try:
            w, hgt = image_dimensions(path)
        except Exception:
            w = hgt = ''
        inventory.append({'file': str(path), 'sha256': h, 'bytes': len(data), 'width': w, 'height': hgt, 'suffix': path.suffix.lower()})
    write_csv(META / 'inventory.csv', inventory)
    summary = {
        'source_pages': len(SOURCES),
        'saved_screenshots': sum(r.get('status') == 'SAVED' for r in screen_rows),
        'saved_dynamic_images': sum(r.get('status') == 'SAVED' for r in image_rows),
        'saved_pdf_pages': sum(r.get('status') == 'SAVED_PAGE' for r in pdf_rows),
        'sha_duplicates': sum(r.get('status') == 'SHA_DUPLICATE' for r in screen_rows) + sum(r.get('status') == 'SHA_DUPLICATE' for r in image_rows) + sum(r.get('status') == 'SHA_DUPLICATE_PAGE' for r in pdf_rows),
        'inventory_images': len(inventory),
        'generated_at_jst': now_jst(),
    }
    (META / 'summary.json').write_text(json.dumps(summary, ensure_ascii=False, indent=2), encoding='utf-8')
    print(json.dumps(summary, ensure_ascii=False))


if __name__ == '__main__':
    main()
