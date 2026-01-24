#!/usr/bin/env python3
from __future__ import annotations

import os
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


def main() -> int:
    project_dir = Path(__file__).resolve().parent

    port = _find_free_port(4000)
    url = f"http://127.0.0.1:{port}/"

    # Jekyll 起動コマンド
    # --host 127.0.0.1 に固定（LAN公開しない）
    cmd = f"bundle exec jekyll serve --livereload --host 127.0.0.1 --port {port}"

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
    start = time.time()

    try:
        # 出力を読みつつ、起動っぽくなったらブラウザを開く
        while True:
            line = p.stdout.readline() if p.stdout else ""
            if line:
                print(line, end="")

                if (not opened) and (
                    "Server address:" in line
                    or "running on" in line.lower()
                    or "http://127.0.0.1" in line
                    or "http://localhost" in line
                ):
                    webbrowser.open(url)
                    opened = True

            # 何も出ないままでも数秒経ったら一旦開く（保険）
            if (not opened) and (time.time() - start > 3.0):
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
