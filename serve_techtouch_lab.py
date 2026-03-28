#!/usr/bin/env python3
from __future__ import annotations

import argparse
import html
import json
import locale
import os
import re
import socket
import sys
import threading
import urllib.parse
import urllib.request
import webbrowser
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

REMOTE_URL = "https://techtouch.jp/"
HOME_PATH = "/techtouch-lab/"
PROXY_PATH = "/proxy"
DEFAULT_PORT = 4100
URL_ATTRIBUTES = [
    "imagesrcset",
    "srcset",
    "src",
    "href",
    "poster",
    "action",
    "data-src",
    "data-href",
    "data-url",
    "data-video",
]
TRACKING_PATTERNS = [
    re.compile(pattern, re.I)
    for pattern in [
        r"googletagmanager",
        r"google-analytics",
        r"analytics\.google\.com",
        r"googleadservices",
        r"doubleclick",
        r"cloudflareinsights",
        r"karte\.io",
        r"px\.ads\.linkedin\.com",
        r"execute-api\.ap-northeast-1\.amazonaws\.com",
        r"apm\.yahoo\.co\.jp",
        r"slim02\.jp",
        r"gtag\(",
    ]
]


def _safe_echo(text: str) -> None:
    try:
        print(text, end="")
        return
    except UnicodeEncodeError:
        pass

    out = sys.stdout
    enc = out.encoding or locale.getpreferredencoding(False) or "utf-8"
    safe_text = text.encode(enc, errors="replace").decode(enc, errors="replace")
    try:
        out.write(safe_text)
        out.flush()
    except Exception:
        try:
            out.buffer.write(safe_text.encode(enc, errors="replace"))
            out.buffer.flush()
        except Exception:
            pass


def _env_bool(name: str, default: bool) -> bool:
    raw = os.getenv(name)
    if raw is None:
        return default
    return raw.strip().lower() in {"1", "true", "yes", "y", "on"}


def _find_free_port(preferred: int) -> int:
    def is_free(port: int) -> bool:
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as sock:
            sock.settimeout(0.2)
            return sock.connect_ex(("127.0.0.1", port)) != 0

    if is_free(preferred):
        return preferred

    for port in range(preferred + 1, preferred + 200):
        if is_free(port):
            return port

    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as sock:
        sock.bind(("127.0.0.1", 0))
        return int(sock.getsockname()[1])


def _parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Serve a local TechTouch lab mirror.")
    parser.add_argument(
        "--port",
        type=int,
        default=int(os.getenv("TECHTOUCH_LAB_PORT", str(DEFAULT_PORT))),
        help="Preferred local port.",
    )
    parser.add_argument(
        "--host",
        default=os.getenv("TECHTOUCH_LAB_HOST", "127.0.0.1"),
        help="Host to bind.",
    )
    parser.add_argument(
        "--open",
        dest="open_browser",
        action="store_true",
        default=_env_bool("TECHTOUCH_LAB_OPEN", True),
        help="Open the lab page in a browser.",
    )
    parser.add_argument(
        "--no-open",
        dest="open_browser",
        action="store_false",
        help="Do not open the lab page automatically.",
    )
    parser.add_argument(
        "--gui",
        dest="open_gui",
        action="store_true",
        default=_env_bool("TECHTOUCH_LAB_GUI", True),
        help="Open the dedicated launcher GUI.",
    )
    parser.add_argument(
        "--no-gui",
        dest="open_gui",
        action="store_false",
        help="Do not open the dedicated launcher GUI.",
    )
    return parser.parse_args()


def _is_allowed_host(host: str) -> bool:
    normalized = host.strip().lower()
    return normalized == "techtouch.jp" or normalized.endswith(".techtouch.jp")


def _is_local_proxy_path(value: str) -> bool:
    return value.startswith(PROXY_PATH) or f"{PROXY_PATH}?target=" in value


def _build_proxy_url(target: str) -> str:
    return f"{PROXY_PATH}?target={urllib.parse.quote(target, safe='')}"


def _extract_tag_attribute(tag_html: str, attribute_name: str) -> str | None:
    match = re.search(rf"\b{re.escape(attribute_name)}=(['\"])(.*?)\1", tag_html, re.I | re.S)
    return match.group(2) if match else None


def _decode_html_entities(value: str) -> str:
    return html.unescape(value)


def _absolutize_url(raw_value: str, base_url: str) -> str:
    value = _decode_html_entities(raw_value.strip())
    value = re.sub(r"^(?:%20|\s)+", "", value, flags=re.I)
    if _is_local_proxy_path(value):
        return value
    if not value or value.startswith(("#", "mailto:", "tel:", "javascript:", "data:", "blob:")):
        return value
    if re.match(r"^https?://", value, re.I):
        return value
    if value.startswith("//"):
        return f"https:{value}"
    try:
        return urllib.parse.urljoin(base_url, value)
    except Exception:
        return value


def _proxy_aware_url(raw_value: str, base_url: str) -> str:
    if _is_local_proxy_path(raw_value):
        return raw_value
    absolute = _absolutize_url(raw_value, base_url)
    try:
        parsed = urllib.parse.urlsplit(absolute)
        base = urllib.parse.urlsplit(base_url)
        if parsed.scheme and parsed.netloc and parsed.scheme == base.scheme and parsed.netloc == base.netloc:
            return _build_proxy_url(absolute)
    except Exception:
        pass
    return absolute


def _is_same_origin(absolute_url: str, base_url: str) -> bool:
    try:
        parsed = urllib.parse.urlsplit(absolute_url)
        base = urllib.parse.urlsplit(base_url)
        return bool(parsed.scheme and parsed.netloc) and parsed.scheme == base.scheme and parsed.netloc == base.netloc
    except Exception:
        return False


def _should_proxy_tag_attribute(
    tag_name: str,
    attribute_name: str,
    tag_html: str,
    absolute_url: str,
    base_url: str,
) -> bool:
    if not _is_same_origin(absolute_url, base_url):
        return False
    if tag_name in {"script", "a", "form", "iframe"}:
        return False
    if tag_name == "link" and attribute_name == "href":
        rel = (_extract_tag_attribute(tag_html, "rel") or "").lower()
        as_value = (_extract_tag_attribute(tag_html, "as") or "").lower()
        if (
            "canonical" in rel
            or "alternate" in rel
            or "preconnect" in rel
            or "dns-prefetch" in rel
            or "modulepreload" in rel
            or ("preload" in rel and as_value == "script")
        ):
            return False
    return True


def _rewrite_tag_url(
    tag_name: str,
    attribute_name: str,
    raw_value: str,
    base_url: str,
    tag_html: str,
) -> str:
    absolute = _absolutize_url(raw_value, base_url)
    if _should_proxy_tag_attribute(tag_name, attribute_name, tag_html, absolute, base_url):
        return _build_proxy_url(absolute)
    return absolute


def _rewrite_srcset(raw_value: str, base_url: str, tag_name: str = "", tag_html: str = "") -> str:
    parts: list[str] = []
    for entry in raw_value.split(","):
        item = re.sub(r"^(?:%20|\s)+", "", entry.strip(), flags=re.I)
        if not item:
            continue
        split = re.split(r"\s+", item, maxsplit=1)
        candidate = split[0]
        descriptor = split[1] if len(split) > 1 else ""
        if tag_name and tag_html:
            normalized = _rewrite_tag_url(tag_name, "srcset", candidate, base_url, tag_html)
        else:
            normalized = _proxy_aware_url(candidate, base_url)
        parts.append(f"{normalized} {descriptor}".strip())
    return ", ".join(parts)


def _rewrite_style_urls(raw_value: str, base_url: str) -> str:
    def replace(match: re.Match[str]) -> str:
        quote = match.group(1) or ""
        candidate = match.group(2)
        normalized = _proxy_aware_url(candidate, base_url)
        return f"url({quote}{normalized}{quote})"

    return re.sub(r"url\((['\"]?)([^)'\"]+)\1\)", replace, raw_value, flags=re.I)


def _should_strip_tracking_markup(markup: str) -> bool:
    return any(pattern.search(markup) for pattern in TRACKING_PATTERNS)


_GUARD_TEMPLATE: str | None = None


def _build_runtime_guard(remote_url: str) -> str:
    global _GUARD_TEMPLATE
    if _GUARD_TEMPLATE is None:
        template_path = Path(__file__).with_name("techtouch_lab_guard.js")
        _GUARD_TEMPLATE = template_path.read_text(encoding="utf-8")

    parts = urllib.parse.urlsplit(remote_url)
    remote_origin = parts.scheme + "://" + parts.netloc
    guard_js = (
        _GUARD_TEMPLATE.replace("__REMOTE_ORIGIN__", json.dumps(remote_origin))
        .replace("__REMOTE_URL__", json.dumps(remote_url))
        .replace("__LAB_PROXY_PATH__", json.dumps(PROXY_PATH))
        .replace("__URL_ATTRIBUTES__", json.dumps(URL_ATTRIBUTES))
    )
    return f"<script data-site-lab-guard>\n{guard_js}\n</script>"


def _rewrite_html_like_response(text: str, base_url: str) -> str:
    def replace_tag(match: re.Match[str]) -> str:
        tag_html = match.group(0)
        tag_name = match.group(1).lower()
        rewritten = tag_html

        def replace_attr(attr_match: re.Match[str]) -> str:
            attribute_name = attr_match.group(1)
            quoted_value = attr_match.group(2)
            raw_value = attr_match.group(3) if attr_match.group(3) is not None else attr_match.group(4) or ""
            normalized_name = attribute_name.lower()
            if normalized_name in {"srcset", "imagesrcset"}:
                next_value = _rewrite_srcset(raw_value, base_url, tag_name, tag_html)
            else:
                next_value = _rewrite_tag_url(tag_name, normalized_name, raw_value, base_url, tag_html)
            quote = '"' if quoted_value.startswith('"') else "'"
            return f"{attribute_name}={quote}{next_value}{quote}"

        rewritten = re.sub(
            r"\b(imagesrcset|srcset|src|href|poster|action|data-src|data-href|data-url|data-video)=(\"([^\"]*)\"|'([^']*)')",
            replace_attr,
            rewritten,
            flags=re.I | re.S,
        )

        def replace_style(style_match: re.Match[str]) -> str:
            quoted_value = style_match.group(1)
            raw_value = style_match.group(2) if style_match.group(2) is not None else style_match.group(3) or ""
            quote = '"' if quoted_value.startswith('"') else "'"
            next_value = _rewrite_style_urls(raw_value, base_url)
            return f"style={quote}{next_value}{quote}"

        rewritten = re.sub(
            r"style=(\"([^\"]*)\"|'([^']*)')",
            replace_style,
            rewritten,
            flags=re.I | re.S,
        )
        return rewritten

    next_text = re.sub(r"<([a-z0-9:-]+)\b[^>]*>", replace_tag, text, flags=re.I)
    return re.sub(
        r"url\((['\"]?)(/[^)'\"]+)\1\)",
        lambda match: f"url({match.group(1) or ''}{_proxy_aware_url(match.group(2), base_url)}{match.group(1) or ''})",
        next_text,
        flags=re.I,
    )


def _rewrite_html(text: str, base_url: str) -> str:
    guard = _build_runtime_guard(base_url)
    next_html = re.sub(r"<meta[^>]+http-equiv=['\"]Content-Security-Policy['\"][^>]*>", "", text, flags=re.I)
    next_html = re.sub(
        r"<meta[^>]+http-equiv=['\"]Content-Security-Policy-Report-Only['\"][^>]*>",
        "",
        next_html,
        flags=re.I,
    )
    next_html = re.sub(r"<base[^>]*>", "", next_html, flags=re.I)
    next_html = re.sub(
        r"<script\b[\s\S]*?</script>",
        lambda match: "" if _should_strip_tracking_markup(match.group(0)) else match.group(0),
        next_html,
        flags=re.I,
    )
    next_html = re.sub(
        r"<noscript\b[\s\S]*?</noscript>",
        lambda match: "" if _should_strip_tracking_markup(match.group(0)) else match.group(0),
        next_html,
        flags=re.I,
    )
    next_html = _rewrite_html_like_response(next_html, base_url)

    if "<head" in next_html.lower():
        head_injection = f'<meta name="robots" content="noindex, nofollow">{guard}'
        injected = re.sub(
            r"(<head[^>]*>[\s\S]*?)(<script\b)",
            lambda match: f"{match.group(1)}{head_injection}{match.group(2)}",
            next_html,
            count=1,
            flags=re.I,
        )
        if injected != next_html:
            next_html = injected
        else:
            next_html = re.sub(r"</head>", f"{head_injection}</head>", next_html, count=1, flags=re.I)
    else:
        next_html = f"{guard}{next_html}"
    return next_html


def _open_upstream(url: str, accept: str | None = None):
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Codex TechTouch Lab",
        "Accept-Language": "ja,en-US;q=0.9,en;q=0.8",
        "Referer": REMOTE_URL,
    }
    if accept:
        headers["Accept"] = accept
    request = urllib.request.Request(url, headers=headers)
    return urllib.request.urlopen(request, timeout=30)


def _read_text_response(response) -> tuple[str, str]:
    raw = response.read()
    content_type = response.headers.get("content-type", "text/plain; charset=utf-8")
    match = re.search(r"charset=([a-zA-Z0-9._-]+)", content_type, re.I)
    encoding = match.group(1) if match else "utf-8"
    try:
        text = raw.decode(encoding, errors="replace")
    except LookupError:
        text = raw.decode("utf-8", errors="replace")
    return text, content_type


def _rewrite_kind(content_type: str, target_url: str) -> str:
    pathname = urllib.parse.urlsplit(target_url).path.lower()
    lowered = content_type.lower()
    if "text/html" in lowered or "application/xhtml+xml" in lowered or pathname.endswith(".html"):
        return "html"
    if "text/css" in lowered or pathname.endswith(".css"):
        return "css"
    if "image/svg+xml" in lowered or "application/svg+xml" in lowered or pathname.endswith(".svg"):
        return "svg"
    return "passthrough"


class TechTouchLabHandler(BaseHTTPRequestHandler):
    server_version = "TechTouchLab/1.0"

    def log_message(self, fmt: str, *args) -> None:
        _safe_echo(f"[HTTP] {self.address_string()} - {fmt % args}\n")

    def do_GET(self) -> None:
        parsed = urllib.parse.urlsplit(self.path)
        path = parsed.path

        if path in {"", "/"}:
            self.send_response(302)
            self.send_header("Location", HOME_PATH)
            self.end_headers()
            return

        if path in {HOME_PATH, HOME_PATH.rstrip("/")}:
            self._serve_home()
            return

        if path == "/healthz":
            body = b"ok"
            self.send_response(200)
            self.send_header("Content-Type", "text/plain; charset=utf-8")
            self.send_header("Content-Length", str(len(body)))
            self.end_headers()
            self.wfile.write(body)
            return

        if path == PROXY_PATH:
            self._serve_proxy(parsed.query)
            return

        self.send_error(404, "Not Found")

    def _serve_home(self) -> None:
        try:
            with _open_upstream(
                REMOTE_URL,
                "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
            ) as response:
                source_html, _ = _read_text_response(response)
        except Exception as exc:
            self.send_error(502, f"TechTouch fetch failed: {exc}")
            return

        body = _rewrite_html(source_html, REMOTE_URL).encode("utf-8")
        self.send_response(200)
        self.send_header("Content-Type", "text/html; charset=utf-8")
        self.send_header("Cache-Control", "no-store, max-age=0")
        self.send_header("X-Robots-Tag", "noindex, nofollow")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def _serve_proxy(self, query: str) -> None:
        params = urllib.parse.parse_qs(query)
        target = params.get("target", [""])[0]
        if not target:
            self.send_error(400, "Missing target")
            return

        try:
            target_url = urllib.parse.urlsplit(target)
        except Exception:
            self.send_error(400, "Invalid target")
            return

        if target_url.scheme != "https" or not _is_allowed_host(target_url.netloc):
            self.send_error(400, "Blocked target")
            return

        try:
            with _open_upstream(target) as response:
                final_url = response.geturl()
                final_parts = urllib.parse.urlsplit(final_url)
                if final_parts.scheme != "https" or not _is_allowed_host(final_parts.netloc):
                    self.send_error(400, "Blocked redirect target")
                    return

                content_type = response.headers.get("content-type", "application/octet-stream")
                kind = _rewrite_kind(content_type, final_url)
                if kind == "passthrough":
                    body = response.read()
                    self.send_response(200)
                    self.send_header("Content-Type", content_type)
                    self.send_header("Cache-Control", "no-store, max-age=0")
                    self.send_header("Access-Control-Allow-Origin", "*")
                    self.send_header("X-Robots-Tag", "noindex, nofollow")
                    self.send_header("Content-Length", str(len(body)))
                    self.end_headers()
                    self.wfile.write(body)
                    return

                text, _ = _read_text_response(response)
        except Exception as exc:
            self.send_error(502, f"Proxy fetch failed: {exc}")
            return

        if kind == "html":
            rewritten = _rewrite_html(text, final_url)
            out_type = "text/html; charset=utf-8"
        else:
            rewritten = _rewrite_html_like_response(text, final_url)
            out_type = content_type if "charset=" in content_type.lower() else f"{content_type}; charset=utf-8"

        body = rewritten.encode("utf-8")
        self.send_response(200)
        self.send_header("Content-Type", out_type)
        self.send_header("Cache-Control", "no-store, max-age=0")
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("X-Robots-Tag", "noindex, nofollow")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)


def _create_server(host: str, port: int) -> ThreadingHTTPServer:
    return ThreadingHTTPServer((host, port), TechTouchLabHandler)


def main() -> int:
    args = _parse_args()
    port = _find_free_port(args.port)
    if port != args.port:
        _safe_echo(f"[INFO] Port {args.port} is busy; using {port} instead.\n")

    open_host = "127.0.0.1" if args.host in {"0.0.0.0", "::"} else args.host
    base_url = f"http://{open_host}:{port}"
    local_lab_url = f"{base_url}{HOME_PATH}"

    server = _create_server(args.host, port)
    server.daemon_threads = True
    thread = threading.Thread(target=server.serve_forever, daemon=True)
    thread.start()

    _safe_echo(f"[INFO] Local TechTouch lab: {local_lab_url}\n")
    _safe_echo(f"[INFO] Remote reference: {REMOTE_URL}\n")
    _safe_echo("[INFO] This lab is intended for local preview only.\n")

    if args.open_browser:
        webbrowser.open(local_lab_url)

    gui_enabled = bool(args.open_gui)
    root = None
    if gui_enabled:
        try:
            import tkinter as tk
            from tkinter import ttk
        except Exception as exc:
            _safe_echo(f"[WARN] tkinter is not available ({exc}); GUI launcher disabled.\n")
            gui_enabled = False

    if gui_enabled:
        try:
            root = tk.Tk()
        except Exception as exc:
            _safe_echo(f"[WARN] GUI launcher failed to initialize ({exc}); continuing without GUI.\n")
            gui_enabled = False

    def shutdown() -> None:
        try:
            server.shutdown()
        except Exception:
            pass
        try:
            server.server_close()
        except Exception:
            pass

    if gui_enabled and root is not None:
        root.title("TechTouch Lab Launcher")
        root.geometry("460x280")
        root.minsize(420, 240)

        def open_local() -> None:
            webbrowser.open(local_lab_url)

        def open_remote() -> None:
            webbrowser.open(REMOTE_URL)

        header = ttk.Frame(root, padding=14)
        header.pack(fill="both", expand=True)
        ttk.Label(header, text="TechTouch Lab", font=("Segoe UI", 13, "bold")).pack(anchor="w")
        ttk.Label(
            header,
            text="Dedicated local mirror for motion and interaction study.",
            font=("Segoe UI", 9),
        ).pack(anchor="w", pady=(4, 8))
        ttk.Label(header, text=local_lab_url, font=("Consolas", 9)).pack(anchor="w", pady=(0, 10))

        actions = ttk.Frame(header)
        actions.pack(fill="x", pady=(2, 10))
        ttk.Button(actions, text="Open Local Lab", command=open_local).pack(fill="x", pady=3)
        ttk.Button(actions, text="Open Remote Reference", command=open_remote).pack(fill="x", pady=3)
        ttk.Button(
            actions,
            text="Open Health Check",
            command=lambda: webbrowser.open(f"{base_url}/healthz"),
        ).pack(fill="x", pady=3)

        notes = ttk.Label(
            header,
            text="The default Vite launcher remains unchanged. Close this window to stop the lab server.",
            wraplength=410,
            font=("Segoe UI", 9),
            justify="left",
        )
        notes.pack(anchor="w", pady=(4, 0))

        def on_close() -> None:
            shutdown()
            root.destroy()

        root.protocol("WM_DELETE_WINDOW", on_close)
        root.mainloop()
        return 0

    try:
        while True:
            thread.join(timeout=0.5)
            if not thread.is_alive():
                break
    except KeyboardInterrupt:
        _safe_echo("\n[INFO] Stopping TechTouch lab...\n")
    finally:
        shutdown()

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
