#!/usr/bin/env python3
from __future__ import annotations

import argparse
import glob
import locale
import os
import shlex
import shutil
import sys
import time
import socket
import webbrowser
import subprocess
import threading
import queue
from pathlib import Path


def _find_free_port(preferred: int = 4000) -> int:
    # preferred が空いていればそれ、ダメなら空きポートを探す
    def is_free(port: int) -> bool:
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
            s.settimeout(0.2)
            return s.connect_ex(("127.0.0.1", port)) != 0

    if is_free(preferred):
        return preferred

    for port in range(preferred + 1, preferred + 200):
        if is_free(port):
            return port

    # 最後の手段：OSに任せる
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        s.bind(("127.0.0.1", 0))
        return int(s.getsockname()[1])


def _run(cmd: str, cwd: Path, env: dict[str, str] | None = None) -> subprocess.Popen:
    # Windows の bundle(.bat) 対応のため、Windows は shell=True で動かす
    shell = (os.name == "nt")
    # Windows の cmd.exe エラーメッセージ等は環境のコードページ(CP932など)になるため、
    # UTF-8 固定で読むと文字化けしやすい。既定ロケールでデコードする。
    encoding = "utf-8"
    if os.name == "nt":
        encoding = locale.getpreferredencoding(False) or "utf-8"
    return subprocess.Popen(
        cmd,
        cwd=str(cwd),
        shell=shell,
        env=env,
        stdout=subprocess.PIPE,
        stderr=subprocess.STDOUT,
        text=True,
        encoding=encoding,
        errors="replace",
        bufsize=1,
        universal_newlines=True,
    )


def _env_bool(name: str, default: bool) -> bool:
    raw = os.getenv(name)
    if raw is None:
        return default
    return raw.strip().lower() in ("1", "true", "yes", "y", "on")


def _strip_quotes(value: str) -> str:
    if not value:
        return value
    if (value.startswith("'") and value.endswith("'")) or (
        value.startswith('"') and value.endswith('"')
    ):
        return value[1:-1]
    return value


def _parse_front_matter(path: Path) -> dict[str, str]:
    try:
        text = path.read_text(encoding="utf-8")
    except Exception:
        text = path.read_text(encoding="utf-8", errors="ignore")
    # UTF-8 BOM を許容して先頭判定を安定させる
    if text.startswith("\ufeff"):
        text = text.lstrip("\ufeff")
    if not text.startswith("---"):
        return {}
    end = text.find("\n---", 3)
    if end == -1:
        return {}
    block = text[3:end].strip().splitlines()
    data: dict[str, str] = {}
    for line in block:
        if not line or line.strip().startswith("#"):
            continue
        if ":" not in line:
            continue
        key, value = line.split(":", 1)
        data[key.strip()] = _strip_quotes(value.strip())
    return data


def _normalize_baseurl(value: str) -> str:
    if not value:
        return ""
    value = value.strip()
    if not value or value == "/":
        return ""
    return "/" + value.strip("/")


def _read_baseurl(config_path: Path) -> str:
    if not config_path.exists():
        return ""
    try:
        text = config_path.read_text(encoding="utf-8")
    except Exception:
        text = config_path.read_text(encoding="utf-8", errors="ignore")
    for line in text.splitlines():
        if line.strip().startswith("baseurl:"):
            _, value = line.split(":", 1)
            return _strip_quotes(value.strip())
    return ""


def _derive_page_path(path: Path, front_matter: dict[str, str]) -> str:
    permalink = front_matter.get("permalink")
    if permalink:
        if not permalink.startswith("/"):
            permalink = "/" + permalink
        return permalink
    if path.stem.lower() == "index":
        return "/"
    return f"/{path.stem}/"


def _collect_pages(project_dir: Path) -> list[dict[str, str]]:
    pages: list[dict[str, str]] = []
    for entry in project_dir.iterdir():
        if not entry.is_file():
            continue
        if entry.name.startswith("_"):
            continue
        if entry.suffix.lower() not in (".md", ".html"):
            continue
        fm = _parse_front_matter(entry)
        if not fm or "layout" not in fm:
            continue
        title = fm.get("title") or entry.stem
        path = _derive_page_path(entry, fm)
        pages.append({"title": title, "path": path, "file": entry.name})
    pages.sort(key=lambda item: (0 if item["path"] == "/" else 1, item["title"]))
    return pages


def _collect_posts(project_dir: Path) -> list[dict[str, str]]:
    posts_dir = project_dir / "_posts"
    if not posts_dir.exists():
        return []
    posts: list[dict[str, str]] = []
    for entry in posts_dir.glob("*.md"):
        fm = _parse_front_matter(entry)
        title = fm.get("title") or entry.stem
        permalink = fm.get("permalink")
        if permalink:
            path = permalink if permalink.startswith("/") else f"/{permalink}"
        else:
            path = f"/{entry.stem}/"
        posts.append({"title": title, "path": path, "file": entry.name})
    posts.sort(key=lambda item: item["file"], reverse=True)
    return posts


def _build_full_url(base_url: str, path: str) -> str:
    base = base_url.rstrip("/")
    if not path.startswith("/"):
        path = "/" + path
    return base + path


def _start_output_reader(proc: subprocess.Popen, output_queue: queue.Queue) -> None:
    def _reader() -> None:
        if not proc.stdout:
            return
        for line in proc.stdout:
            output_queue.put(line)

    threading.Thread(target=_reader, daemon=True).start()


def _parse_args() -> tuple[argparse.Namespace, list[str]]:
    default_port = int(os.getenv("JEKYLL_PORT", "4000"))
    default_host = os.getenv("JEKYLL_HOST", "127.0.0.1")
    default_open = _env_bool("JEKYLL_OPEN", True)
    default_livereload = _env_bool("JEKYLL_LIVERELOAD", True)
    default_incremental = _env_bool("JEKYLL_INCREMENTAL", False)
    default_gui = _env_bool("JEKYLL_GUI", True)

    parser = argparse.ArgumentParser(description="Run local Jekyll server with sane defaults.")
    parser.add_argument("--port", type=int, default=default_port, help="Preferred port.")
    parser.add_argument("--host", default=default_host, help="Host to bind.")
    parser.add_argument("--open", dest="open_browser", action="store_true", default=default_open, help="Open browser.")
    parser.add_argument("--no-open", dest="open_browser", action="store_false", help="Do not open browser.")
    parser.add_argument("--gui", dest="open_gui", action="store_true", default=default_gui, help="Open GUI launcher.")
    parser.add_argument("--no-gui", dest="open_gui", action="store_false", help="Do not open GUI launcher.")
    parser.add_argument("--livereload", dest="livereload", action="store_true", default=default_livereload)
    parser.add_argument("--no-livereload", dest="livereload", action="store_false")
    parser.add_argument("--incremental", dest="incremental", action="store_true", default=default_incremental)
    parser.add_argument("--no-incremental", dest="incremental", action="store_false")

    return parser.parse_known_args()


def _join_args(args: list[str]) -> str:
    if not args:
        return ""
    if os.name == "nt":
        return subprocess.list2cmdline(args)
    return shlex.join(args)


def _find_ruby_bindir() -> Path | None:
    ruby = shutil.which("ruby") or shutil.which("ruby.exe")
    if ruby:
        return Path(ruby).resolve().parent

    # VSCode/デバッグ環境で PATH が欠けるケース向けに、よくあるインストール先も見る
    patterns = [
        r"C:\Ruby*\bin\ruby.exe",
        r"C:\Program Files\Ruby*\bin\ruby.exe",
        r"C:\Program Files (x86)\Ruby*\bin\ruby.exe",
    ]
    for pat in patterns:
        matches = glob.glob(pat)
        if matches:
            return Path(matches[0]).resolve().parent
    return None


def _which_bundle(ruby_bindir: Path | None = None) -> str | None:
    # `bundle` は RubyGems が `.bat`/`.cmd` を生成する場合がある
    if ruby_bindir:
        for name in ("bundle.bat", "bundle.cmd", "bundle"):
            p = ruby_bindir / name
            if p.exists():
                return str(p)
    return shutil.which("bundle") or shutil.which("bundle.bat") or shutil.which("bundle.cmd")


def _hint_install_ruby_bundler() -> None:
    print("[HINT] Windows では Ruby(+DevKit) と Bundler が必要です。")
    print("[HINT] 例:")
    print("       1) RubyInstaller (Ruby+DevKit) をインストールし、PATH に追加")
    print("       2) (必要なら) RubyInstaller の DevKit セットアップ(ridk)")
    print("       3) このフォルダで `bundle install`")
    print("       4) `bundle exec jekyll serve` が通ることを確認")
    print("[HINT] すでに Ruby がある場合は `gem install bundler` で bundle を追加できます。")


def main() -> int:
    project_dir = Path(__file__).resolve().parent
    args, extra_args = _parse_args()

    port = _find_free_port(args.port)
    if port != args.port:
        print(f"[INFO] Port {args.port} is busy; using {port} instead.")

    open_host = "127.0.0.1" if args.host in ("0.0.0.0", "::") else args.host
    baseurl = _normalize_baseurl(_read_baseurl(project_dir / "_config.yml"))
    site_base = f"http://{open_host}:{port}{baseurl}"
    url = f"{site_base}/"

    # Jekyll 起動コマンド
    cmd_parts = ["bundle", "exec", "jekyll", "serve"]
    if args.livereload:
        cmd_parts.append("--livereload")
    if args.incremental:
        cmd_parts.append("--incremental")
    cmd_parts.extend(["--host", args.host, "--port", str(port)])

    env_extra = os.getenv("JEKYLL_EXTRA_ARGS", "")
    if env_extra:
        cmd_parts.extend(shlex.split(env_extra, posix=os.name != "nt"))
    if extra_args:
        cmd_parts.extend(extra_args)

    env: dict[str, str] | None = None
    if os.name == "nt":
        # shell=True の場合、`bundle`/`ruby` が無くても cmd.exe 自体は起動してしまい、
        # FileNotFoundError にならない。事前に存在チェックして、分かりやすく案内する。
        ruby_bindir = _find_ruby_bindir()
        if not ruby_bindir:
            print("[ERROR] Ruby が見つかりません (ruby.exe が見つからない/ PATH にありません)。")
            _hint_install_ruby_bundler()
            return 1

        env = os.environ.copy()
        env["PATH"] = str(ruby_bindir) + os.pathsep + env.get("PATH", "")

        bundle_path = _which_bundle(ruby_bindir)
        if not bundle_path:
            print("[ERROR] 'bundle' が見つかりません。Ruby/Bundler を入れてから実行してください。")
            _hint_install_ruby_bundler()
            return 1

        # 環境差異(WindowsApps の shim 等)を避けるため、Ruby 同梱側の bundle を優先する
        cmd_parts[0] = bundle_path

    cmd = _join_args(cmd_parts)

    print(f"[INFO] Project: {project_dir}")
    print(f"[INFO] Command: {cmd}")
    print(f"[INFO] URL: {url}")
    print("[INFO] Starting Jekyll... (Ctrl+C to stop)")

    try:
        p = _run(cmd, project_dir, env=env)
    except FileNotFoundError:
        print("[ERROR] 'bundle' が見つかりません。Ruby/Bundler を入れてから実行してください。")
        _hint_install_ruby_bundler()
        return 1

    opened = False
    warned_pagination = False
    warned_wdm = False
    start = time.time()

    output_queue: queue.Queue[str] = queue.Queue()
    _start_output_reader(p, output_queue)

    pages = _collect_pages(project_dir)
    posts = _collect_posts(project_dir)
    gui_enabled = bool(args.open_gui)

    def handle_line(line: str) -> None:
        nonlocal opened, warned_pagination, warned_wdm
        print(line, end="")
        if (not opened) and args.open_browser and (
            "Server address:" in line
            or "running on" in line.lower()
            or "http://127.0.0.1" in line
            or "http://localhost" in line
        ):
            webbrowser.open(url)
            opened = True
        if (not warned_pagination) and (
            "Pagination is enabled, but I couldn't find an index.html page" in line
        ):
            print(
                "[HINT] Pagination is enabled but no index.html template was found. "
                "Either add an index.html with a posts list, or remove "
                "'paginate' and 'jekyll-paginate' from _config.yml."
            )
            warned_pagination = True
        if (not warned_wdm) and (
            "Please add the following to your Gemfile to avoid polling for changes" in line
        ):
            print(
                "[HINT] On Windows, add "
                "\"gem \\\"wdm\\\", \\\">= 0.1.0\\\" if Gem.win_platform?\" "
                "to your Gemfile and run bundle install."
            )
            warned_wdm = True

    def pump_output() -> None:
        try:
            while True:
                line = output_queue.get_nowait()
                if line:
                    handle_line(line)
        except queue.Empty:
            pass

    def maybe_open_fallback() -> None:
        nonlocal opened
        if (not opened) and args.open_browser and (time.time() - start > 3.0):
            webbrowser.open(url)
            opened = True

    def stop_process() -> None:
        if p.poll() is not None:
            return
        print("\n[INFO] Stopping...")
        try:
            p.terminate()
            p.wait(timeout=5)
        except Exception:
            try:
                p.kill()
            except Exception:
                pass

    if gui_enabled:
        try:
            import tkinter as tk
            from tkinter import ttk
        except Exception:
            print("[WARN] tkinter is not available; GUI launcher is disabled.")
            gui_enabled = False

    if gui_enabled:
        def open_path(path: str) -> None:
            webbrowser.open(_build_full_url(site_base, path))

        root = tk.Tk()
        root.title("ローカルページランチャー")
        root.geometry("460x640")
        root.minsize(380, 420)

        header = ttk.Frame(root, padding=12)
        header.pack(fill="x")
        ttk.Label(header, text="ページランチャー", font=("Segoe UI", 12, "bold")).pack(anchor="w")
        ttk.Label(header, text=site_base, font=("Segoe UI", 9)).pack(anchor="w", pady=(4, 8))
        ttk.Button(header, text="ホームを開く", command=lambda: open_path("/")).pack(anchor="w")

        container = ttk.Frame(root, padding=(12, 4, 12, 12))
        container.pack(fill="both", expand=True)

        canvas = tk.Canvas(container, highlightthickness=0)
        scrollbar = ttk.Scrollbar(container, orient="vertical", command=canvas.yview)
        scroll_frame = ttk.Frame(canvas)
        scroll_frame.bind(
            "<Configure>",
            lambda e: canvas.configure(scrollregion=canvas.bbox("all")),
        )
        canvas.create_window((0, 0), window=scroll_frame, anchor="nw")
        canvas.configure(yscrollcommand=scrollbar.set)
        canvas.pack(side="left", fill="both", expand=True)
        scrollbar.pack(side="right", fill="y")

        def add_section(title: str, items: list[dict[str, str]]) -> None:
            if not items:
                return
            ttk.Label(scroll_frame, text=title, font=("Segoe UI", 10, "bold")).pack(
                anchor="w", pady=(10, 4)
            )
            for item in items:
                label = f"{item['title']}  ({item['path']})"
                ttk.Button(
                    scroll_frame,
                    text=label,
                    command=lambda p=item["path"]: open_path(p),
                ).pack(fill="x", pady=2)

        add_section("ページ", pages)
        add_section("投稿", posts)

        def on_close() -> None:
            stop_process()
            root.destroy()

        root.protocol("WM_DELETE_WINDOW", on_close)

        def tick() -> None:
            pump_output()
            maybe_open_fallback()
            if p.poll() is not None:
                root.after(200, root.destroy)
                return
            root.after(120, tick)

        root.after(120, tick)
        root.mainloop()
        return int(p.returncode or 0)

    try:
        while True:
            pump_output()
            maybe_open_fallback()
            if p.poll() is not None:
                return int(p.returncode or 0)
            time.sleep(0.1)
    except KeyboardInterrupt:
        stop_process()
        return 0


if __name__ == "__main__":
    raise SystemExit(main())
