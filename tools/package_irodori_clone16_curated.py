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
DOWNLOADED = ROOT / "downloaded_clone16"
WORK = ROOT / "clone16_package_work"
OUTPUT = ROOT / "clone16_package_output"
ALL_STAGE = WORK / "全16声"
MID_STAGE = WORK / "中くらい8声"
HIGH_STAGE = WORK / "高め8声"
VALIDATION_STAGE = WORK / "検証資料"
for directory in (ALL_STAGE, MID_STAGE, HIGH_STAGE, VALIDATION_STAGE, OUTPUT):
    directory.mkdir(parents=True, exist_ok=True)

VOICE_FOLDERS = [
    "09_中音・穏やか・物語調", "10_中音・冷静・少し硬め", "11_中音・芯強め・クール", "12_中高音・囁き・近距離",
    "13_中高音・やさしい・透明", "14_中高音・丁寧・明瞭", "15_中高音・やわらかい・丸い", "16_中高音・軽快・話しやすい",
    "17_高い・小さめ・落ち着き", "18_高い・親密・息少なめ", "19_高い・軽い・自然会話", "20_高い・明るい・息多め",
    "21_かなり高い・元気・軽快", "22_かなり高い・繊細・透明", "23_かなり高い・はきはき・細め", "24_非常に高い・鋭い・感情的",
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
    if int(info.samplerate) != 48_000 or int(info.channels) != 1 or info.subtype != "PCM_24":
        raise RuntimeError(f"WAV形式不正: {path} -> {info}")
    duration = float(data.shape[0] / sample_rate)
    if duration < 0.7:
        raise RuntimeError(f"短すぎるWAV: {path}")
    process = subprocess.run(["ffmpeg", "-v", "error", "-i", str(path), "-f", "null", "-"], stdout=subprocess.PIPE, stderr=subprocess.PIPE, check=False)
    if process.returncode != 0:
        raise RuntimeError(f"全編デコード失敗: {path}")
    return {
        "file": path.as_posix(), "sample_rate": int(info.samplerate), "channels": int(info.channels),
        "subtype": info.subtype, "duration_sec": round(duration, 3), "sha256": sha256(path),
    }


def make_audio_zip(source: Path, destination: Path) -> None:
    destination.unlink(missing_ok=True)
    with zipfile.ZipFile(destination, "w", zipfile.ZIP_DEFLATED, compresslevel=6, allowZip64=True) as archive:
        for wav in sorted(source.rglob("*.wav")):
            archive.write(wav, wav.relative_to(source).as_posix())
    with zipfile.ZipFile(destination) as archive:
        bad = archive.testzip()
        if bad:
            raise RuntimeError(f"ZIP CRC失敗: {destination}: {bad}")
        files = [name for name in archive.namelist() if not name.endswith("/")]
        if any(not name.lower().endswith(".wav") for name in files):
            raise RuntimeError(f"音声ZIPにWAV以外: {destination}")


def make_general_zip(source: Path, destination: Path) -> None:
    destination.unlink(missing_ok=True)
    with zipfile.ZipFile(destination, "w", zipfile.ZIP_DEFLATED, compresslevel=6, allowZip64=True) as archive:
        for file in sorted(source.rglob("*")):
            if file.is_file():
                archive.write(file, file.relative_to(source).as_posix())
    with zipfile.ZipFile(destination) as archive:
        bad = archive.testzip()
        if bad:
            raise RuntimeError(f"ZIP CRC失敗: {destination}: {bad}")


def find_voice_root(folder: str) -> Path:
    matches = [path for path in DOWNLOADED.rglob(folder) if path.is_dir() and path.parent.name == "WAV"]
    if len(matches) != 1:
        raise RuntimeError(f"{folder}: WAVフォルダ {len(matches)}")
    return matches[0]


def main() -> None:
    all_checks: list[dict[str, Any]] = []
    selected_catalog: list[dict[str, Any]] = []
    for position, folder in enumerate(VOICE_FOLDERS):
        source = find_voice_root(folder)
        wavs = sorted(source.glob("*.wav"))
        if len(wavs) != 10:
            raise RuntimeError(f"{folder}: WAV {len(wavs)}/10")
        all_dest = ALL_STAGE / folder
        group_dest = (MID_STAGE if position < 8 else HIGH_STAGE) / folder
        all_dest.mkdir(parents=True, exist_ok=True)
        group_dest.mkdir(parents=True, exist_ok=True)
        for wav in wavs:
            shutil.copy2(wav, all_dest / wav.name)
            shutil.copy2(wav, group_dest / wav.name)
            check = validate_wav(wav)
            check["voice"] = folder
            all_checks.append(check)
        artifact_root = source.parent.parent
        validation = artifact_root / "検証"
        error = validation / "致命的エラー.txt"
        if error.exists():
            raise RuntimeError(f"{folder}: 致命的エラーあり")
        destination = VALIDATION_STAGE / folder
        destination.mkdir(parents=True, exist_ok=True)
        for file in validation.rglob("*"):
            if file.is_file():
                target = destination / file.relative_to(validation)
                target.parent.mkdir(parents=True, exist_ok=True)
                shutil.copy2(file, target)
        selected_csv = validation / "採用10本検査.csv"
        if not selected_csv.exists():
            raise RuntimeError(f"{folder}: 採用台帳なし")
        with selected_csv.open(encoding="utf-8-sig", newline="") as file:
            rows = list(csv.DictReader(file))
        if len(rows) != 10:
            raise RuntimeError(f"{folder}: 採用台帳 {len(rows)}/10")
        for row in rows:
            row["voice_folder"] = folder
            selected_catalog.append(row)

    if len(list(ALL_STAGE.rglob("*.wav"))) != 160 or len(list(MID_STAGE.rglob("*.wav"))) != 80 or len(list(HIGH_STAGE.rglob("*.wav"))) != 80:
        raise RuntimeError("最終WAV数不一致")
    if len({row["sha256"] for row in all_checks}) != 160:
        raise RuntimeError("完全一致重複WAVがあります")

    write_csv(VALIDATION_STAGE / "全160WAV_形式・全編デコード検証.csv", all_checks)
    write_csv(VALIDATION_STAGE / "全16声_採用セリフ・ASR・品質台帳.csv", selected_catalog)

    all_zip = OUTPUT / "Irodori_同じ16声_セリフ・演技一致版_全160WAV.zip"
    mid_zip = OUTPUT / "Irodori_同じ中くらい8声_セリフ・演技一致版_80WAV.zip"
    high_zip = OUTPUT / "Irodori_同じ高め8声_セリフ・演技一致版_80WAV.zip"
    validation_zip = OUTPUT / "Irodori_同じ16声_セリフ・演技・ASR検証資料.zip"
    make_audio_zip(ALL_STAGE, all_zip)
    make_audio_zip(MID_STAGE, mid_zip)
    make_audio_zip(HIGH_STAGE, high_zip)
    make_general_zip(VALIDATION_STAGE, validation_zip)

    summary = {
        "voices": 16, "wav_per_voice": 10, "wav_count": 160,
        "sample_rate": 48000, "channels": 1, "subtype": "PCM_24",
        "zip_crc": "PASS", "ffmpeg_full_decode": "160/160 PASS",
        "exact_sha_duplicates": 0,
        "packages": {package.name: sha256(package) for package in (all_zip, mid_zip, high_zip, validation_zip)},
    }
    (OUTPUT / "最終集計.json").write_text(json.dumps(summary, ensure_ascii=False, indent=2), encoding="utf-8")
    (OUTPUT / "SHA256SUMS.txt").write_text("\n".join(f"{digest}  {name}" for name, digest in summary["packages"].items()) + "\n", encoding="utf-8")
    print(json.dumps(summary, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
