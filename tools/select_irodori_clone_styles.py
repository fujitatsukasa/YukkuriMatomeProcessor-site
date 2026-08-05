#!/usr/bin/env python3
from __future__ import annotations

import csv
import hashlib
import io
import json
import math
import os
import re
import subprocess
import time
import traceback
import unicodedata
from pathlib import Path
from typing import Any

import numpy as np
import pyarrow.parquet as pq
import soundfile as sf
from faster_whisper import WhisperModel
from huggingface_hub import hf_hub_download
from pykakasi import kakasi
from rapidfuzz import fuzz
from scipy.signal import resample_poly

VOICE_INDEX = int(os.environ["VOICE_INDEX"])
TARGET_SR = 48_000
DATASET = "SynDataLab/irodori-clones-3m"
KAKASI = kakasi()

VOICES = [
    (9, "09_中音・穏やか・物語調", "speaker_08458"),
    (10, "10_中音・冷静・少し硬め", "speaker_03183"),
    (11, "11_中音・芯強め・クール", "speaker_09784"),
    (12, "12_中高音・囁き・近距離", "speaker_04428"),
    (13, "13_中高音・やさしい・透明", "speaker_02022"),
    (14, "14_中高音・丁寧・明瞭", "speaker_01635"),
    (15, "15_中高音・やわらかい・丸い", "speaker_01639"),
    (16, "16_中高音・軽快・話しやすい", "speaker_01281"),
    (17, "17_高い・小さめ・落ち着き", "speaker_00526"),
    (18, "18_高い・親密・息少なめ", "speaker_09925"),
    (19, "19_高い・軽い・自然会話", "speaker_03333"),
    (20, "20_高い・明るい・息多め", "speaker_00703"),
    (21, "21_かなり高い・元気・軽快", "speaker_02196"),
    (22, "22_かなり高い・繊細・透明", "speaker_02829"),
    (23, "23_かなり高い・はきはき・細め", "speaker_00162"),
    (24, "24_非常に高い・鋭い・感情的", "speaker_09137"),
]

# Candidate rows were chosen from the common 299-line script bank by reading the
# actual source text and emoji annotations. Each category has several backups;
# the final row is selected independently for every voice by audio quality and
# Japanese ASR agreement. The displayed filename uses the actual selected line.
CATEGORIES: list[dict[str, Any]] = [
    {"number": 1, "label": "穏やかに懐かしむ話し方", "rows": [88, 84, 177, 190, 196]},
    {"number": 2, "label": "自然な日常会話", "rows": [52, 53, 54, 55, 56]},
    {"number": 3, "label": "明るくうれしい話し方", "rows": [122, 123, 124, 137, 139, 176]},
    {"number": 4, "label": "怒りと不満を抑えた話し方", "rows": [16, 14, 21, 23, 142, 147, 162, 262]},
    {"number": 5, "label": "悲しく弱った話し方", "rows": [293, 275, 280, 285, 294, 57, 78, 87]},
    {"number": 6, "label": "怖がって慌てた話し方", "rows": [66, 67, 68, 89, 92, 93, 103, 119]},
    {"number": 7, "label": "眠く力の抜けた話し方", "rows": [38, 36, 40, 42, 44, 45, 50, 51]},
    {"number": 8, "label": "やさしく親密に話す声", "rows": [30, 32, 34, 35, 289, 293]},
    {"number": 9, "label": "ゆったりした独り言", "rows": [190, 177, 182, 192, 195, 196]},
    {"number": 10, "label": "笑い混じりの話し方", "rows": [238, 109, 111, 127, 129, 131, 133, 232, 233, 241]},
]

voice_number, voice_folder, speaker_id = VOICES[VOICE_INDEX]
file_index = int(speaker_id.split("_")[-1]) - 1
parquet_name = f"data/train-{file_index:05d}-of-10000.parquet"

ROOT = Path.cwd()
WORK = ROOT / "clone16_work" / f"voice_{VOICE_INDEX:02d}"
OUT = ROOT / "clone16_output" / f"voice_{VOICE_INDEX:02d}"
WAV_DIR = OUT / "WAV" / voice_folder
VALIDATION_DIR = OUT / "検証"
for directory in (WORK, OUT, WAV_DIR, VALIDATION_DIR):
    directory.mkdir(parents=True, exist_ok=True)


def log(message: str) -> None:
    print(message, flush=True)
    with (VALIDATION_DIR / "実行ログ.txt").open("a", encoding="utf-8") as file:
        file.write(message + "\n")


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as file:
        for chunk in iter(lambda: file.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def safe_component(value: str, limit: int = 52) -> str:
    text = unicodedata.normalize("NFKC", str(value))
    text = re.sub(r"[\U00010000-\U0010ffff]", "", text)
    text = re.sub(r'[\\/:*?"<>|\x00-\x1f]', "_", text)
    text = re.sub(r"[\r\n\t]+", " ", text)
    text = re.sub(r"\s+", " ", text).strip(" ._…")
    return (text or "セリフ")[:limit]


def remove_emojis(value: str) -> str:
    text = unicodedata.normalize("NFKC", str(value))
    text = re.sub(r"[\U00010000-\U0010ffff]", "", text)
    # Remove standalone annotation symbols used by the source corpus.
    return text.replace("⏩", "").replace("⏸️", "").strip()


def to_hiragana(value: str) -> str:
    parts: list[str] = []
    for item in KAKASI.convert(remove_emojis(value)):
        parts.append(str(item.get("hira") or item.get("orig") or ""))
    return re.sub(r"[^0-9a-zぁ-んゔー]", "", "".join(parts).lower())


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


def decode_audio_cell(value: Any) -> tuple[np.ndarray, int, str]:
    if hasattr(value, "as_py"):
        value = value.as_py()
    payload: bytes | None = None
    path_hint = ""
    if isinstance(value, dict):
        raw = value.get("bytes")
        if raw is not None:
            payload = bytes(raw)
        path_hint = str(value.get("path") or "")
    elif isinstance(value, (bytes, bytearray, memoryview)):
        payload = bytes(value)
    if payload is None:
        raise RuntimeError("audio bytes missing")
    try:
        audio, sample_rate = sf.read(io.BytesIO(payload), dtype="float32", always_2d=True)
        return np.mean(audio, axis=1).astype(np.float32), int(sample_rate), path_hint
    except Exception:
        source = WORK / "decode_source.bin"
        destination = WORK / "decode_destination.wav"
        source.write_bytes(payload)
        process = subprocess.run(
            ["ffmpeg", "-hide_banner", "-loglevel", "error", "-y", "-i", str(source), "-vn", "-ac", "1", "-ar", str(TARGET_SR), "-c:a", "pcm_s24le", str(destination)],
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True,
            timeout=180,
        )
        if process.returncode != 0:
            raise RuntimeError(f"audio decode failed: {process.stderr[-700:]}")
        audio, sample_rate = sf.read(destination, dtype="float32", always_2d=True)
        return np.mean(audio, axis=1).astype(np.float32), int(sample_rate), path_hint


def resample_mono(signal: np.ndarray, sample_rate: int) -> np.ndarray:
    x = np.asarray(signal, dtype=np.float32)
    if int(sample_rate) != TARGET_SR:
        divisor = math.gcd(int(sample_rate), TARGET_SR)
        x = resample_poly(x, TARGET_SR // divisor, int(sample_rate) // divisor).astype(np.float32)
    return np.nan_to_num(x, nan=0.0, posinf=0.0, neginf=0.0).astype(np.float32)


def trim_silence(signal: np.ndarray, before: float = 0.08, after: float = 0.14) -> np.ndarray:
    x = np.asarray(signal, dtype=np.float32)
    if x.size == 0:
        return x
    peak = float(np.max(np.abs(x)))
    threshold = max(10.0 ** (-58.0 / 20.0), peak * 0.004)
    active = np.flatnonzero(np.abs(x) >= threshold)
    if active.size == 0:
        return x
    start = max(0, int(active[0]) - int(before * TARGET_SR))
    end = min(x.size, int(active[-1]) + 1 + int(after * TARGET_SR))
    return x[start:end]


def audio_metrics(signal: np.ndarray) -> dict[str, float]:
    x = np.asarray(signal, dtype=np.float32)
    duration = float(x.size / TARGET_SR)
    peak = float(np.max(np.abs(x))) if x.size else 0.0
    rms = float(np.sqrt(np.mean(np.square(x)) + 1e-12)) if x.size else 0.0
    clip_ratio = float(np.mean(np.abs(x) >= 0.999)) if x.size else 1.0
    silence_ratio = float(np.mean(np.abs(x) < max(10 ** (-55 / 20), peak * 0.004))) if x.size else 1.0
    if x.size < 2048:
        centroid, flatness, high_ratio = 0.0, 1.0, 1.0
    else:
        size = 2048
        hop = 512
        count = 1 + max(0, (x.size - size) // hop)
        indices = np.arange(size)[None, :] + hop * np.arange(count)[:, None]
        frames = x[indices] * np.hanning(size)[None, :]
        power = np.abs(np.fft.rfft(frames, axis=1)) ** 2 + 1e-12
        frequencies = np.fft.rfftfreq(size, 1 / TARGET_SR)
        totals = np.maximum(power.sum(axis=1), 1e-12)
        centroid = float(np.mean((power * frequencies[None, :]).sum(axis=1) / totals))
        flatness = float(np.mean(np.exp(np.mean(np.log(power), axis=1)) / np.maximum(np.mean(power, axis=1), 1e-12)))
        high_ratio = float(np.mean(power[:, frequencies >= 7000].sum(axis=1) / totals))
    return {
        "duration_sec": duration,
        "peak_dbfs": 20 * math.log10(max(peak, 1e-12)),
        "rms_dbfs": 20 * math.log10(max(rms, 1e-12)),
        "clip_ratio": clip_ratio,
        "silence_ratio": silence_ratio,
        "spectral_centroid_hz": centroid,
        "spectral_flatness": flatness,
        "high_frequency_ratio": high_ratio,
    }


def quality_score(metrics: dict[str, float], text: str) -> float:
    duration = float(metrics["duration_sec"])
    rms = float(metrics["rms_dbfs"])
    clip = float(metrics["clip_ratio"])
    silence = float(metrics["silence_ratio"])
    centroid = float(metrics["spectral_centroid_hz"])
    flatness = float(metrics["spectral_flatness"])
    high = float(metrics["high_frequency_ratio"])
    duration_score = float(np.exp(-((duration - 5.0) / 4.5) ** 2))
    rms_score = float(np.exp(-((rms + 20.0) / 9.0) ** 2))
    presence = float(np.exp(-((centroid - 2500.0) / 2700.0) ** 2))
    smooth = float(np.exp(-((flatness - 0.035) / 0.16) ** 2))
    air = float(np.exp(-((high - 0.055) / 0.12) ** 2))
    clean = max(0.0, 1.0 - clip / 0.0001)
    silence_score = max(0.0, 1.0 - max(0.0, silence - 0.65) / 0.30)
    length_bonus = float(np.exp(-((len(remove_emojis(text)) - 34.0) / 35.0) ** 2))
    return float(np.clip(0.16 * duration_score + 0.14 * rms_score + 0.16 * presence + 0.16 * smooth + 0.10 * air + 0.12 * clean + 0.08 * silence_score + 0.08 * length_bonus, 0, 1))


def load_whisper() -> WhisperModel:
    last: Exception | None = None
    for attempt in range(1, 7):
        try:
            log(f"faster-whisper small loading {attempt}/6")
            return WhisperModel("small", device="cpu", compute_type="int8", cpu_threads=max(2, os.cpu_count() or 2))
        except Exception as error:
            last = error
            time.sleep(min(120, attempt * 15))
    assert last is not None
    raise last


def transcribe(path: Path, model: WhisperModel) -> tuple[str, list[dict[str, Any]]]:
    segments, _ = model.transcribe(
        str(path), language="ja", beam_size=5, best_of=5, temperature=0.0,
        condition_on_previous_text=False, word_timestamps=True, vad_filter=True,
        vad_parameters={"min_silence_duration_ms": 120},
    )
    texts: list[str] = []
    words: list[dict[str, Any]] = []
    for segment in segments:
        texts.append(str(segment.text))
        for word in segment.words or []:
            words.append({"text": str(word.word), "start": float(word.start), "end": float(word.end)})
    return "".join(texts).strip(), words


def align_to_text(signal: np.ndarray, target_text: str, model: WhisperModel, temp_path: Path) -> tuple[np.ndarray, str, float]:
    sf.write(temp_path, signal, TARGET_SR, subtype="PCM_24")
    transcript, words = transcribe(temp_path, model)
    target = to_hiragana(target_text)
    if not words:
        return signal, transcript, 0.0
    best_score = -1.0
    best_start = 0
    best_end = len(words) - 1
    for start in range(len(words)):
        cumulative = ""
        for end in range(start, min(len(words), start + 40)):
            cumulative += words[end]["text"]
            actual = to_hiragana(cumulative)
            ratio = fuzz.ratio(target, actual) / 100.0
            partial = fuzz.partial_ratio(target, actual) / 100.0 if actual else 0.0
            extra = max(0, len(actual) - len(target))
            missing = max(0, len(target) - len(actual))
            score = 0.72 * ratio + 0.28 * partial - 0.035 * extra - 0.003 * missing
            if score > best_score:
                best_score, best_start, best_end = score, start, end
    if best_score >= 0.73:
        start_sample = max(0, int((words[best_start]["start"] - 0.08) * TARGET_SR))
        end_sample = min(signal.size, int((words[best_end]["end"] + 0.14) * TARGET_SR))
        if end_sample - start_sample >= int(0.7 * TARGET_SR):
            signal = signal[start_sample:end_sample]
            sf.write(temp_path, signal, TARGET_SR, subtype="PCM_24")
            transcript2, _ = transcribe(temp_path, model)
            if fuzz.ratio(target, to_hiragana(transcript2)) + 2 >= fuzz.ratio(target, to_hiragana(transcript)):
                transcript = transcript2
    ratio = fuzz.ratio(target, to_hiragana(transcript)) / 100.0
    return signal, transcript, float(ratio)


def validate_wav(path: Path) -> dict[str, Any]:
    info = sf.info(path)
    data, sample_rate = sf.read(path, dtype="float32", always_2d=True)
    if int(info.samplerate) != TARGET_SR or int(info.channels) != 1 or info.subtype != "PCM_24":
        raise RuntimeError(f"invalid wav format: {path} -> {info}")
    if data.shape[0] / sample_rate < 0.7:
        raise RuntimeError(f"short wav: {path}")
    decoded = subprocess.run(["ffmpeg", "-v", "error", "-i", str(path), "-f", "null", "-"], stdout=subprocess.PIPE, stderr=subprocess.PIPE, check=False)
    if decoded.returncode != 0:
        raise RuntimeError(f"full decode failed: {path}")
    return {
        "file": path.relative_to(OUT).as_posix(), "sample_rate": int(info.samplerate),
        "channels": int(info.channels), "subtype": info.subtype,
        "duration_sec": round(float(data.shape[0] / sample_rate), 3), "sha256": sha256(path),
    }


def main() -> None:
    try:
        log(f"start {voice_folder} / {speaker_id} / {parquet_name}")
        parquet_path = Path(hf_hub_download(repo_id=DATASET, repo_type="dataset", filename=parquet_name, local_dir=WORK / "dataset"))
        table = pq.read_table(parquet_path, columns=["audio", "text", "speaker_id"])
        rows = table.to_pylist()
        if len(rows) != 299:
            raise RuntimeError(f"row count {len(rows)} != 299")
        if {str(row.get('speaker_id')) for row in rows} != {speaker_id}:
            raise RuntimeError("speaker_id mismatch in parquet")

        whisper = load_whisper()
        used_rows: set[int] = set()
        selected_rows: list[dict[str, Any]] = []
        candidate_records: list[dict[str, Any]] = []

        for category in CATEGORIES:
            candidates: list[dict[str, Any]] = []
            for row_index in category["rows"]:
                if row_index in used_rows:
                    continue
                row = rows[row_index]
                signal, sample_rate, source_path = decode_audio_cell(row["audio"])
                signal = trim_silence(resample_mono(signal, sample_rate))
                metrics = audio_metrics(signal)
                valid = bool(1.0 <= metrics["duration_sec"] <= 12.0 and -38 <= metrics["rms_dbfs"] <= -8 and metrics["clip_ratio"] <= 0.0002 and metrics["spectral_flatness"] <= 0.50)
                record = {
                    "voice": voice_folder, "speaker_id": speaker_id, "category": category["label"],
                    "row_index": row_index, "source_text": row["text"], "source_path": source_path,
                    **metrics, "quality_score": quality_score(metrics, str(row["text"])), "signal": signal,
                    "valid": valid,
                }
                candidate_records.append({k: v for k, v in record.items() if k != "signal"})
                if valid:
                    candidates.append(record)
            if not candidates:
                raise RuntimeError(f"no valid candidates: {category['label']}")
            candidates.sort(key=lambda item: float(item["quality_score"]), reverse=True)

            evaluated: list[dict[str, Any]] = []
            for candidate in candidates[:3]:
                temp_path = WORK / f"asr_{int(category['number']):02d}_{int(candidate['row_index']):03d}.wav"
                aligned, transcript, asr_ratio = align_to_text(candidate["signal"], str(candidate["source_text"]), whisper, temp_path)
                final_metrics = audio_metrics(aligned)
                candidate = dict(candidate)
                candidate.update({
                    "signal": aligned, "transcript": transcript, "asr_ratio": asr_ratio,
                    "final_quality_score": quality_score(final_metrics, str(candidate["source_text"])),
                    **{f"final_{key}": value for key, value in final_metrics.items()},
                })
                evaluated.append(candidate)
            evaluated.sort(key=lambda item: (float(item["asr_ratio"]), float(item["final_quality_score"])), reverse=True)
            selected = evaluated[0]
            # Source rows and ASR must broadly agree. Because expressive Japanese ASR is imperfect,
            # allow a lower ratio only when partial matching remains high and there is no evidence of a long tail.
            target = to_hiragana(str(selected["source_text"]))
            actual = to_hiragana(str(selected["transcript"]))
            partial = fuzz.partial_ratio(target, actual) / 100.0 if actual else 0.0
            if float(selected["asr_ratio"]) < 0.68 and partial < 0.82:
                raise RuntimeError(f"ASR mismatch {category['label']}: {selected['transcript']!r} / {selected['source_text']!r}")

            used_rows.add(int(selected["row_index"]))
            clean_text = remove_emojis(str(selected["source_text"]))
            filename = f"{int(category['number']):02d}_{safe_component(str(category['label']), 32)}_{safe_component(clean_text, 52)}.wav"
            output_path = WAV_DIR / filename
            sf.write(output_path, selected["signal"], TARGET_SR, subtype="PCM_24")
            wav_check = validate_wav(output_path)
            selected_rows.append({
                "voice": voice_folder, "speaker_id": speaker_id,
                "number": category["number"], "label": category["label"],
                "row_index": selected["row_index"], "source_text": selected["source_text"],
                "visible_text": clean_text, "transcript": selected["transcript"],
                "asr_ratio": selected["asr_ratio"], "asr_partial_ratio": partial,
                "quality_score": selected["final_quality_score"], **wav_check,
            })
            log(f"selected {category['number']:02d} {category['label']} row={selected['row_index']} ASR={selected['asr_ratio']:.3f}")

        selected_rows.sort(key=lambda item: int(item["number"]))
        if len(list(WAV_DIR.glob("*.wav"))) != 10:
            raise RuntimeError("final wav count is not 10")
        write_csv(VALIDATION_DIR / "候補検査.csv", candidate_records)
        write_csv(VALIDATION_DIR / "採用10本検査.csv", selected_rows)
        summary = {
            "voice_index": VOICE_INDEX, "voice": voice_folder, "speaker_id": speaker_id,
            "source_dataset": DATASET, "source_parquet": parquet_name,
            "wav_count": 10, "rows": [{k: item[k] for k in ("number", "label", "row_index", "source_text", "transcript", "asr_ratio", "quality_score")} for item in selected_rows],
        }
        (VALIDATION_DIR / "集計.json").write_text(json.dumps(summary, ensure_ascii=False, indent=2), encoding="utf-8")
        log("complete 10 WAV")
    except Exception:
        error = traceback.format_exc()
        (VALIDATION_DIR / "致命的エラー.txt").write_text(error, encoding="utf-8")
        log(error)
        raise


if __name__ == "__main__":
    main()
