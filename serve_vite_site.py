#!/usr/bin/env python3
from __future__ import annotations

import argparse
import locale
import os
import queue
import shutil
import socket
import subprocess
import sys
import threading
import time
import urllib.request
import webbrowser
from pathlib import Path

SITE_DIRNAME = "vite-site"
DEFAULT_PORT = 5173

PRIMARY_ROUTES = [
    ("Home", "/"),
    ("Download", "/download/"),
    ("Instructions", "/instructions/"),
    ("FAQ", "/faq/"),
    ("Purchase", "/purchase/"),
    ("Contact", "/contact/"),
    ("News", "/news/"),
    ("Updates", "/update/"),
]

LEGAL_ROUTES = [
    ("Terms", "/legal/terms/"),
    ("Privacy", "/legal/privacy/"),
    ("Refund Policy", "/legal/refund-policy/"),
    ("Commercial Transactions", "/legal/commercial-transactions/"),
]

ARTICLE_ROUTES = [
    ("Download Guide", "/2026-01-15-download-guide/"),
    ("FAQ Update", "/2026-01-20-faq-update/"),
    ("Site Renewal", "/2026-01-24-site-renewal/"),
]

SYSTEM_ROUTES = [
    ("Account Return", "/account/"),
    ("Billing Success", "/billing/success/"),
    ("Billing Cancel", "/billing/cancel/"),
    ("404", "/404.html"),
]


def _is_debugger_session() -> bool:
    return (sys.gettrace() is not None) or ("debugpy" in sys.modules)


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


def _parse_args() -> tuple[argparse.Namespace, list[str]]:
    parser = argparse.ArgumentParser(description="Run the Vite + React site with GUI-friendly defaults.")
    parser.add_argument(
        "--port",
        type=int,
        default=int(os.getenv("VITE_SITE_PORT", str(DEFAULT_PORT))),
        help="Preferred local port.",
    )
    parser.add_argument(
        "--host",
        default=os.getenv("VITE_SITE_HOST", "127.0.0.1"),
        help="Host to bind.",
    )
    parser.add_argument(
        "--open",
        dest="open_browser",
        action="store_true",
        default=_env_bool("VITE_SITE_OPEN", True),
        help="Open the site in a browser.",
    )
    parser.add_argument(
        "--no-open",
        dest="open_browser",
        action="store_false",
        help="Do not open a browser.",
    )
    parser.add_argument(
        "--gui",
        dest="open_gui",
        action="store_true",
        default=_env_bool("VITE_SITE_GUI", True),
        help="Open the launcher GUI.",
    )
    parser.add_argument(
        "--no-gui",
        dest="open_gui",
        action="store_false",
        help="Do not open the launcher GUI.",
    )
    return parser.parse_known_args()


def _which_npm() -> str | None:
    if os.name == "nt":
        return shutil.which("npm.cmd") or shutil.which("npm.exe") or shutil.which("npm")
    return shutil.which("npm")


def _run(cmd: list[str], cwd: Path) -> subprocess.Popen[str]:
    encoding = "utf-8"
    if os.name == "nt":
        encoding = locale.getpreferredencoding(False) or "utf-8"
    return subprocess.Popen(
        cmd,
        cwd=str(cwd),
        stdout=subprocess.PIPE,
        stderr=subprocess.STDOUT,
        text=True,
        encoding=encoding,
        errors="replace",
        bufsize=1,
        universal_newlines=True,
    )


def _start_output_reader(proc: subprocess.Popen[str], output_queue: queue.Queue[str]) -> None:
    def _reader() -> None:
        if not proc.stdout:
            return
        for line in proc.stdout:
            output_queue.put(line)

    threading.Thread(target=_reader, daemon=True).start()


def _is_http_ready(url: str) -> bool:
    try:
        with urllib.request.urlopen(url, timeout=0.6) as response:
            return 200 <= int(response.status) < 500
    except Exception:
        return False


def _report_nonzero_exit(code: int) -> None:
    if code == 0:
        return
    if os.name == "nt" and code >= 0xC0000000:
        _safe_echo(f"[ERROR] Vite dev server crashed with Windows status 0x{code:08X} ({code}).\n")
    else:
        _safe_echo(f"[ERROR] Vite dev server exited with code {code}.\n")


def _build_url(base_url: str, path: str) -> str:
    return base_url.rstrip("/") + path


def _stop_process_tree(proc: subprocess.Popen[str]) -> None:
    if proc.poll() is not None:
        return
    if os.name == "nt":
        try:
            subprocess.run(
                ["taskkill", "/PID", str(proc.pid), "/T", "/F"],
                stdout=subprocess.DEVNULL,
                stderr=subprocess.DEVNULL,
                check=False,
            )
            proc.wait(timeout=5)
            return
        except Exception:
            pass
    try:
        proc.terminate()
        proc.wait(timeout=5)
    except Exception:
        try:
            proc.kill()
        except Exception:
            pass


def main() -> int:
    project_dir = Path(__file__).resolve().parent
    site_dir = project_dir / SITE_DIRNAME
    args, extra_args = _parse_args()

    if not site_dir.exists():
        _safe_echo(f"[ERROR] Site directory not found: {site_dir}\n")
        return 1

    npm_cmd = _which_npm()
    if not npm_cmd:
        _safe_echo("[ERROR] npm was not found. Install Node.js and ensure npm is on PATH.\n")
        return 1

    if not (site_dir / "node_modules").exists():
        _safe_echo(f"[WARN] {SITE_DIRNAME}/node_modules was not found. Run `cd {SITE_DIRNAME} && npm install` first.\n")

    port = _find_free_port(args.port)
    if port != args.port:
        _safe_echo(f"[INFO] Port {args.port} is busy; using {port} instead.\n")

    open_host = "127.0.0.1" if args.host in {"0.0.0.0", "::"} else args.host
    base_url = f"http://{open_host}:{port}"
    start_url = f"{base_url}/"

    cmd = [npm_cmd, "run", "dev", "--", "--host", args.host, "--port", str(port)]
    cmd.extend(extra_args)

    _safe_echo(f"[INFO] Project: {site_dir}\n")
    _safe_echo(f"[INFO] URL: {start_url}\n")
    _safe_echo(f"[INFO] Command: {' '.join(cmd)}\n")
    _safe_echo("[INFO] Starting Vite dev server... (Ctrl+C to stop)\n")

    try:
        proc = _run(cmd, site_dir)
    except FileNotFoundError:
        _safe_echo("[ERROR] Failed to start npm. Check your Node.js installation.\n")
        return 1

    output_queue: queue.Queue[str] = queue.Queue()
    _start_output_reader(proc, output_queue)

    opened = False
    ready_announced = False

    def pump_output() -> None:
        try:
            while True:
                line = output_queue.get_nowait()
                if line:
                    _safe_echo(line)
        except queue.Empty:
            pass

    def maybe_open_browser() -> None:
        nonlocal opened, ready_announced
        if proc.poll() is not None:
            return
        if not _is_http_ready(start_url):
            return
        if not ready_announced:
            _safe_echo(f"[INFO] Preview ready: {start_url}\n")
            ready_announced = True
        if args.open_browser and not opened:
            webbrowser.open(start_url)
            opened = True

    def stop_process() -> None:
        if proc.poll() is not None:
            return
        _safe_echo("\n[INFO] Stopping Vite dev server...\n")
        _stop_process_tree(proc)

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

    if gui_enabled and root is not None:
        def open_path(path: str) -> None:
            webbrowser.open(_build_url(base_url, path))

        root.title("Vite Preview Launcher")
        root.geometry("500x720")
        root.minsize(420, 480)

        header = ttk.Frame(root, padding=14)
        header.pack(fill="x")
        ttk.Label(header, text="Yukkuri Matome Processor", font=("Segoe UI", 12, "bold")).pack(anchor="w")
        ttk.Label(header, text="Default local preview now uses Vite + React.", font=("Segoe UI", 9)).pack(anchor="w", pady=(4, 4))
        ttk.Label(header, text=start_url, font=("Consolas", 9)).pack(anchor="w", pady=(0, 10))
        ttk.Button(header, text="Open Home", command=lambda: open_path("/")).pack(anchor="w")

        container = ttk.Frame(root, padding=(14, 4, 14, 14))
        container.pack(fill="both", expand=True)

        canvas = tk.Canvas(container, highlightthickness=0)
        scrollbar = ttk.Scrollbar(container, orient="vertical", command=canvas.yview)
        scroll_frame = ttk.Frame(canvas)
        scroll_frame.bind(
            "<Configure>",
            lambda _event: canvas.configure(scrollregion=canvas.bbox("all")),
        )
        canvas.create_window((0, 0), window=scroll_frame, anchor="nw")
        canvas.configure(yscrollcommand=scrollbar.set)
        canvas.pack(side="left", fill="both", expand=True)
        scrollbar.pack(side="right", fill="y")

        def add_section(title: str, items: list[tuple[str, str]]) -> None:
            ttk.Label(scroll_frame, text=title, font=("Segoe UI", 10, "bold")).pack(anchor="w", pady=(10, 4))
            for label, path in items:
                ttk.Button(
                    scroll_frame,
                    text=f"{label}  ({path})",
                    command=lambda route=path: open_path(route),
                ).pack(fill="x", pady=2)

        add_section("Primary Pages", PRIMARY_ROUTES)
        add_section("Legal Pages", LEGAL_ROUTES)
        add_section("Articles", ARTICLE_ROUTES)
        add_section("System Routes", SYSTEM_ROUTES)

        ttk.Label(scroll_frame, text="Mobile Preview", font=("Segoe UI", 10, "bold")).pack(anchor="w", pady=(12, 4))
        ttk.Label(
            scroll_frame,
            text=(
                "1. Open any page from this launcher.\n"
                "2. In Chrome or Edge, press F12.\n"
                "3. Press Ctrl+Shift+M to enable the device toolbar.\n"
                "4. Choose iPhone 13 or Pixel 7 to review the mobile layout."
            ),
            wraplength=430,
            justify="left",
            font=("Segoe UI", 9),
        ).pack(anchor="w")

        notes = ttk.Label(
            scroll_frame,
            text="Close this window to stop the Vite dev server. The TechTouch Lab launcher remains separate.",
            wraplength=430,
            justify="left",
            font=("Segoe UI", 9),
        )
        notes.pack(anchor="w", pady=(12, 0))

        def on_close() -> None:
            stop_process()
            root.destroy()

        root.protocol("WM_DELETE_WINDOW", on_close)

        def tick() -> None:
            pump_output()
            maybe_open_browser()
            if proc.poll() is not None:
                code = int(proc.returncode or 0)
                _report_nonzero_exit(code)
                root.after(200, root.destroy)
                return
            root.after(120, tick)

        root.after(120, tick)
        root.mainloop()
        return int(proc.returncode or 0)

    try:
        while True:
            pump_output()
            maybe_open_browser()
            if proc.poll() is not None:
                code = int(proc.returncode or 0)
                _report_nonzero_exit(code)
                return code
            time.sleep(0.1)
    except KeyboardInterrupt:
        stop_process()
        return 0


if __name__ == "__main__":
    exit_code = int(main())
    if _is_debugger_session():
        if exit_code != 0:
            _safe_echo(f"[INFO] serve_vite_site.py finished with exit code {exit_code}.\n")
    else:
        raise SystemExit(exit_code)
