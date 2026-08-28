#!/usr/bin/env python3
from __future__ import annotations

import csv
import hashlib
import json
import shutil
import subprocess
import zipfile
from pathlib import Path
from typing import Any

import soundfile as sf

ROOT = Path.cwd()
DOWNLOADED = ROOT / "downloaded_v4_same16"
WORK = ROOT / "v4_same16_package_work"
OUTPUT = ROOT / "v4_same16_package_output"
ALL_STAGE = WORK / "全16声"
MID_STAGE = WORK / "中くらい8声"
HIGH_STAGE = WORK / "高め8声"
VALIDATION_STAGE = WORK / "検証資料"
for directory in (ALL_STAGE, MID_STAGE, HIGH_STAGE, VALIDATION_STAGE, OUTPUT):
    if directory.exists():
        shutil.rmtree(directory)
    directory.mkdir(parents=True, exist_ok=True)

VOICE_FOLDERS = [
    "09_中音・穏やか・物語調",
    "10_中音・冷静・少し硬め",
    "11_中音・芯強め・クール",
    "12_中高音・囁き・近距離",
    "13_中高音・やさしい・透明",
    "14_中高音・丁寧・明瞭",
    "15_中高音・やわらかい・丸い",
    "16_中高音・軽快・話しやすい",
    "17_高い・小さめ・落ち着き",
    "18_高い・親密・息少なめ",
    "19_高い・軽い・自然会話",
    "20_高い・明るい・息多め",
    "21_かなり高い・元気・軽快",
    "22_かなり高い・繊細・透明",
    "23_かなり高い・はきはき・細め",
    "24_非常に高い・鋭い・感情的",
]


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as file:
        for chunk in iter(lambda: file.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def write_csv(path: Path, rows: list[dict[str, Any]]) -> None:
    fields: list[str] = []
    seen: set[str] = set()
    for row in rows:
        for key in row:
            if key not in seen:
                seen.add(key)
                fields.append(key)
    with path.open("w", encoding="utf-8-sig", newline="") as file:
        writer = csv.DictWriter(file, fieldnames=fields or ["empty"], extrasaction="ignore")
        writer.writeheader()
        writer.writerows(rows)


def validate_wav(path: Path) -> dict[str, Any]:
    info = sf.info(path)
    data, sample_rate = sf.read(path, dtype="float32", always_2d=True)
    if int(info.samplerate) != 48_000:
        raise RuntimeError(f"48kHzではありません: {path} -> {info.samplerate}")
    if int(info.channels) != 1:
        raise RuntimeError(f"モノラルではありません: {path} -> {info.channels}")
    if info.subtype != "PCM_24":
        raise RuntimeError(f"PCM 24-bitではありません: {path} -> {info.subtype}")
    duration = float(data.shape[0] / sample_rate)
    if duration < 0.5:
        raise RuntimeError(f"短すぎるWAVです: {path} -> {duration}")
    process = subprocess.run(
        ["ffmpeg", "-v", "error", "-i", str(path), "-f", "null", "-"],
        stdout=subprocess.PIPE, stderr=subprocess.PIPE, check=False,
    )
    if process.returncode != 0:
        raise RuntimeError(f"全編デコード失敗: {path}: {process.stderr[-500:]!r}")
    return {
        "file": path.as_posix(), "sample_rate": int(info.samplerate),
        "channels": int(info.channels), "subtype": info.subtype,
        "duration_sec": round(duration, 3), "sha256": sha256(path),
    }


def make_audio_zip(source: Path, destination: Path, expected_count: int) -> None:
    destination.unlink(missing_ok=True)
    with zipfile.ZipFile(destination, "w", zipfile.ZIP_DEFLATED, compresslevel=6, allowZip64=True) as archive:
        for wav in sorted(source.rglob("*.wav")):
            archive.write(wav, wav.relative_to(source).as_posix())
    with zipfile.ZipFile(destination) as archive:
        bad = archive.testzip()
        files = [name for name in archive.namelist() if not name.endswith("/")]
        wavs = [name for name in files if name.lower().endswith(".wav")]
        if bad:
            raise RuntimeError(f"ZIP CRC失敗: {destination} -> {bad}")
        if len(wavs) != expected_count or len(files) != expected_count:
            raise RuntimeError(f"音声ZIPの件数不正: {destination} -> WAV={len(wavs)}, files={len(files)}, expected={expected_count}")


def make_general_zip(source: Path, destination: Path) -> None:
    destination.unlink(missing_ok=True)
    with zipfile.ZipFile(destination, "w", zipfile.ZIP_DEFLATED, compresslevel=6, allowZip64=True) as archive:
        for file in sorted(source.rglob("*")):
            if file.is_file():
                archive.write(file, file.relative_to(source).as_posix())
    with zipfile.ZipFile(destination) as archive:
        bad = archive.testzip()
        if bad:
            raise RuntimeError(f"検証ZIP CRC失敗: {destination} -> {bad}")


def find_voice_root(folder: str) -> Path:
    matches = [path for path in DOWNLOADED.rglob(folder) if path.is_dir() and path.parent.name == "WAV"]
    if len(matches) != 1:
        raise RuntimeError(f"{folder}: WAVフォルダが一意ではありません: {len(matches)}")
    return matches[0]


def main() -> None:
    if not DOWNLOADED.exists():
        raise RuntimeError("v4音声artifactがダウンロードされていません")
    validation_rows: list[dict[str, Any]] = []
    final_catalog: list[dict[str, Any]] = []

    for index, folder in enumerate(VOICE_FOLDERS):
        source = find_voice_root(folder)
        wavs = sorted(source.glob("*.wav"))
        if len(wavs) != 10:
            raise RuntimeError(f"{folder}: WAV数 {len(wavs)} / 10")
        artifact_root = source.parent.parent
        validation = artifact_root / "検証"
        if not validation.exists():
            raise RuntimeError(f"{folder}: 検証フォルダがありません")
        fatal = validation / "致命的エラー.txt"
        if fatal.exists():
            raise RuntimeError(f"{folder}: 致命的エラー記録があります")
        final_csv = validation / "最終WAV検査.csv"
        if not final_csv.exists():
            raise RuntimeError(f"{folder}: 最終WAV検査.csvがありません")
        with final_csv.open(encoding="utf-8-sig", newline="") as file:
            rows = list(csv.DictReader(file))
        if len(rows) != 10:
            raise RuntimeError(f"{folder}: 最終検査行数 {len(rows)} / 10")
        controlled = sum(str(row.get("controlled_fallback", "")).lower() in {"true", "1"} for row in rows)
        if controlled > 3:
            raise RuntimeError(f"{folder}: 制御フォールバックが多すぎます: {controlled}")

        all_destination = ALL_STAGE / folder
        group_destination = (MID_STAGE if index < 8 else HIGH_STAGE) / folder
        all_destination.mkdir(parents=True, exist_ok=True)
        group_destination.mkdir(parents=True, exist_ok=True)
        for wav in wavs:
            shutil.copy2(wav, all_destination / wav.name)
            shutil.copy2(wav, group_destination / wav.name)
            check = validate_wav(wav)
            check["voice"] = folder
            validation_rows.append(check)
        validation_destination = VALIDATION_STAGE / folder
        validation_destination.mkdir(parents=True, exist_ok=True)
        for file in validation.rglob("*"):
            if file.is_file():
                target = validation_destination / file.relative_to(validation)
                target.parent.mkdir(parents=True, exist_ok=True)
                shutil.copy2(file, target)
        for row in rows:
            row["voice_folder"] = folder
            final_catalog.append(row)

    if len(list(ALL_STAGE.rglob("*.wav"))) != 160:
        raise RuntimeError("全16声が160WAVではありません")
    if len(list(MID_STAGE.rglob("*.wav"))) != 80:
        raise RuntimeError("中くらい8声が80WAVではありません")
    if len(list(HIGH_STAGE.rglob("*.wav"))) != 80:
        raise RuntimeError("高め8声が80WAVではありません")
    if len({row["sha256"] for row in validation_rows}) != 160:
        raise RuntimeError("完全一致重複WAVがあります")

    write_csv(VALIDATION_STAGE / "全160WAV_形式・全編デコード検証.csv", validation_rows)
    write_csv(VALIDATION_STAGE / "全160WAV_生成・ASR・話者・音質選抜台帳.csv", final_catalog)

    all_zip = OUTPUT / "Irodori_v4_同じ16声_演技維持・マイク音質再生成_全160WAV.zip"
    mid_zip = OUTPUT / "Irodori_v4_同じ中くらい8声_演技維持・マイク音質再生成_80WAV.zip"
    high_zip = OUTPUT / "Irodori_v4_同じ高め8声_演技維持・マイク音質再生成_80WAV.zip"
    validation_zip = OUTPUT / "Irodori_v4_同じ16声_生成・ASR・話者・音質検証資料.zip"
    make_audio_zip(ALL_STAGE, all_zip, 160)
    make_audio_zip(MID_STAGE, mid_zip, 80)
    make_audio_zip(HIGH_STAGE, high_zip, 80)
    make_general_zip(VALIDATION_STAGE, validation_zip)

    packages = [all_zip, mid_zip, high_zip, validation_zip]
    summary = {
        "model": "Aratako/Irodori-TTS-v4-Small",
        "voices": 16, "styles_per_voice": 10, "wav_count": 160,
        "sample_rate": 48_000, "channels": 1, "subtype": "PCM_24",
        "zip_crc": "PASS", "ffmpeg_full_decode": "160/160 PASS",
        "exact_sha256_duplicates": 0,
        "processing": "v4-Small再生成。前後無音整理、DC除去、ピーク安全制限のみ。EQ・ノイズ除去・ディエッサー・コンプレッサー・ピッチ変更なし。",
        "packages": {package.name: sha256(package) for package in packages},
    }
    (OUTPUT / "最終検証結果.json").write_text(json.dumps(summary, ensure_ascii=False, indent=2), encoding="utf-8")
    (OUTPUT / "SHA256SUMS.txt").write_text(
        "\n".join(f"{sha256(package)}  {package.name}" for package in packages) + "\n",
        encoding="utf-8",
    )
    print(json.dumps(summary, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
