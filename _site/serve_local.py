#!/usr/bin/env python3
from __future__ import annotations

import argparse
import os
import shlex
import sys
import time
import socket
import webbrowser
import subprocess
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


def _run(cmd: str, cwd: Path) -> subprocess.Popen:
    # Windows の bundle(.bat) 対応のため、Windows は shell=True で動かす
    shell = (os.name == "nt")
    return subprocess.Popen(
        cmd,
        cwd=str(cwd),
        shell=shell,
        stdout=subprocess.PIPE,
        stderr=subprocess.STDOUT,
        text=True,
        encoding="utf-8",
        errors="replace",
        bufsize=1,
        universal_newlines=True,
    )


def _env_bool(name: str, default: bool) -> bool:
    raw = os.getenv(name)
    if raw is None:
        return default
    return raw.strip().lower() in ("1", "true", "yes", "y", "on")


def _parse_args() -> tuple[argparse.Namespace, list[str]]:
    default_port = int(os.getenv("JEKYLL_PORT", "4000"))
    default_host = os.getenv("JEKYLL_HOST", "127.0.0.1")
    default_open = _env_bool("JEKYLL_OPEN", True)
    default_livereload = _env_bool("JEKYLL_LIVERELOAD", True)
    default_incremental = _env_bool("JEKYLL_INCREMENTAL", False)

    parser = argparse.ArgumentParser(description="Run local Jekyll server with sane defaults.")
    parser.add_argument("--port", type=int, default=default_port, help="Preferred port.")
    parser.add_argument("--host", default=default_host, help="Host to bind.")
    parser.add_argument("--open", dest="open_browser", action="store_true", default=default_open, help="Open browser.")
    parser.add_argument("--no-open", dest="open_browser", action="store_false", help="Do not open browser.")
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


def main() -> int:
    project_dir = Path(__file__).resolve().parent
    args, extra_args = _parse_args()

    port = _find_free_port(args.port)
    if port != args.port:
        print(f"[INFO] Port {args.port} is busy; using {port} instead.")

    open_host = "127.0.0.1" if args.host in ("0.0.0.0", "::") else args.host
    url = f"http://{open_host}:{port}/"

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

    cmd = _join_args(cmd_parts)

    print(f"[INFO] Project: {project_dir}")
    print(f"[INFO] Command: {cmd}")
    print(f"[INFO] URL: {url}")
    print("[INFO] Starting Jekyll... (Ctrl+C to stop)")

    try:
        p = _run(cmd, project_dir)
    except FileNotFoundError:
        print("[ERROR] 'bundle' が見つかりません。Ruby/Bundler を入れてから実行してください。")
        return 1

    opened = False
    warned_pagination = False
    warned_wdm = False
    start = time.time()

    try:
        # 出力を読みつつ、起動っぽくなったらブラウザを開く
        while True:
            line = p.stdout.readline() if p.stdout else ""
            if line:
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

            # 何も出ないままでも数秒経ったら一旦開く（保険）
            if (not opened) and args.open_browser and (time.time() - start > 3.0):
                webbrowser.open(url)
                opened = True

            # プロセス終了
            if p.poll() is not None:
                return int(p.returncode or 0)

    except KeyboardInterrupt:
        print("\n[INFO] Stopping...")
        try:
            p.terminate()
            p.wait(timeout=5)
        except Exception:
            try:
                p.kill()
            except Exception:
                pass
        return 0


if __name__ == "__main__":
    raise SystemExit(main())
