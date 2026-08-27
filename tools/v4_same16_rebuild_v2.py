#!/usr/bin/env python3
from __future__ import annotations

import csv
import hashlib
import io
import json
import math
import os
import re
import shutil
import subprocess
import sys
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
from resemblyzer import VoiceEncoder, preprocess_wav
from scipy.signal import resample_poly

ROOT = Path(__file__).resolve().parents[1]
IRODORI = ROOT / "Irodori-TTS"
sys.path.insert(0, str(IRODORI))

from irodori_tts.inference_runtime import (  # noqa: E402
    RuntimeKey,
    SamplingRequest,
    download_hf_checkpoint,
    get_cached_runtime,
    save_wav,
)

VOICE_INDEX = int(os.environ["VOICE_INDEX"])
PILOT = os.getenv("PILOT", "0") == "1"
TARGET_SR = 48_000
CHECKPOINT = "Aratako/Irodori-TTS-v4-Small"
CLONE_DATASET = "SynDataLab/irodori-clones-3m"
KAKASI = kakasi()

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
SPEAKER_IDS = [
    "speaker_08458", "speaker_03183", "speaker_09784", "speaker_04428",
    "speaker_02022", "speaker_01635", "speaker_01639", "speaker_01281",
    "speaker_00526", "speaker_09925", "speaker_03333", "speaker_00703",
    "speaker_02196", "speaker_02829", "speaker_00162", "speaker_09137",
]
MODE_BY_NUMBER = {
    1: "calm", 2: "natural", 3: "happy", 4: "angry", 5: "sad",
    6: "fear", 7: "sleepy", 8: "gentle", 9: "monologue", 10: "laugh",
}
CAPTIONS = {
    "calm": "穏やかで落ち着いた話し方。声を張らず、自然な間を取り、語尾まで明瞭に話す。",
    "natural": "親しい相手への自然な日常会話。演技を誇張せず、急に叫ばず、普通の会話の抑揚を保つ。",
    "happy": "心からうれしく、明るい笑顔が声に表れている。声が自然に弾むが、絶叫せず、言葉を明瞭に保つ。",
    "angry": "怒りと不満が明確に伝わるが、怒鳴らずに抑えている。重要語と語尾へ芯のある圧を置く。",
    "sad": "悲しみで気力が落ち、弱く少し震える声。明るくせず、言葉を崩さず、最後まで弱った調子を保つ。",
    "fear": "本気で怖がり、動揺して息が浅い。声が少し震えるが、悲鳴で台詞を潰さず、全語を聞き取れるように話す。",
    "sleepy": "本当に眠く、まぶたが重く、力が抜けている。小さな声でゆっくり話し、語尾を下げ、元気にしない。",
    "gentle": "相手を心から気遣う、やさしく親密な声。小さめの声量と少し遅い速度で、安心させるように話す。",
    "monologue": "ひとりで静かに考えながら話す、ゆったりした独り言。自然な間を取り、感情を誇張しない。",
    "laugh": "短く自然なくすっとした笑いが実際に入り、その後も微笑みが声ににじむ。笑いで台詞を潰さない。",
}
DURATION_SCALE = {
    "calm": 1.05, "natural": 1.00, "happy": 0.96, "angry": 0.97,
    "sad": 1.10, "fear": 0.96, "sleepy": 1.16, "gentle": 1.08,
    "monologue": 1.12, "laugh": 1.03,
}
STUDIO_CAPTION = (
    "同じ人物・同じ声質・同じ声域を厳密に維持する。"
    "静かな防音スタジオで、広帯域の高品質マイクにより乾いた近接収録をしたような、"
    "透明で聞き取りやすく自然な音。声の自然な厚みは保つ。"
    "こもり、電話音、帯域の狭さ、かすれ、鼻詰まり、金属的なざらつき、コーデック感、"
    "ヒス、部屋鳴り、破裂音、過度なノイズ抑制感を加えない。"
    "指定された台詞だけを明瞭に話し、終了後に別の言葉や意味不明な音を追加しない。"
)
EMOTION_EMOJIS = "😠😒💥😰😱🫣😭🥺😟😊😆🤭🥱😪😴🫶😮‍💨🐢🎵"
EMOTION_WORDS = [
    "怒", "腹立", "最悪", "怖", "震", "泣", "悲", "寂", "つら", "苦し",
    "眠", "寝", "うれ", "嬉", "楽しい", "笑", "叫", "不安", "限界",
]

VOICE_FOLDER = VOICE_FOLDERS[VOICE_INDEX]
FALLBACK_SPEAKER_ID = SPEAKER_IDS[VOICE_INDEX]
SOURCE_ROOT = ROOT / "source_voice"
WORK = ROOT / "v4_same16_work" / f"voice_{VOICE_INDEX:02d}"
OUT = ROOT / "v4_same16_output" / f"voice_{VOICE_INDEX:02d}"
WAV_DIR = OUT / "WAV" / VOICE_FOLDER
VALIDATION_DIR = OUT / "検証"
REFERENCE_DIR = WORK / "参照音声"
ANCHOR_DIR = WORK / "v4基準参照"
CANDIDATE_DIR = WORK / "候補"
for directory in (WORK, OUT, WAV_DIR, VALIDATION_DIR, REFERENCE_DIR, ANCHOR_DIR, CANDIDATE_DIR):
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


def safe_component(value: str, limit: int = 118) -> str:
    text = unicodedata.normalize("NFKC", str(value))
    text = re.sub(r"[\U00010000-\U0010ffff]", "", text)
    text = re.sub(r'[\\/:*?"<>|\x00-\x1f]', "_", text)
    text = re.sub(r"\s+", " ", text).strip(" ._")
    return (text or "音声")[:limit]


def strip_emoji(value: str) -> str:
    text = unicodedata.normalize("NFKC", str(value))
    text = re.sub(r"[\U00010000-\U0010ffff]", "", text)
    return text.replace("⏩", "").replace("⏸️", "").strip()


def to_hiragana(value: str) -> str:
    parts: list[str] = []
    for item in KAKASI.convert(strip_emoji(value)):
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


def resample_mono(signal: np.ndarray, sample_rate: int, target_rate: int = TARGET_SR) -> np.ndarray:
    x = np.asarray(signal, dtype=np.float32)
    if x.ndim > 1:
        x = np.mean(x, axis=1)
    if int(sample_rate) != int(target_rate):
        divisor = math.gcd(int(sample_rate), int(target_rate))
        x = resample_poly(x, int(target_rate) // divisor, int(sample_rate) // divisor).astype(np.float32)
    return np.nan_to_num(x, nan=0.0, posinf=0.0, neginf=0.0).astype(np.float32)


def trim_silence(signal: np.ndarray, before: float = 0.07, after: float = 0.13) -> np.ndarray:
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


def preserve_audio(signal: np.ndarray, sample_rate: int) -> np.ndarray:
    """No EQ, denoiser, de-esser, compressor, pitch change, or bandwidth synthesis."""
    x = resample_mono(signal, sample_rate)
    x -= float(np.mean(x)) if x.size else 0.0
    x = trim_silence(x)
    if x.size == 0:
        return x
    peak = float(np.max(np.abs(x)))
    limit = 10.0 ** (-0.8 / 20.0)
    if peak > limit and peak > 0.0:
        x *= limit / peak
    return np.clip(x, -1.0, 1.0).astype(np.float32)


def decode_audio_cell(value: Any) -> tuple[np.ndarray, int]:
    if hasattr(value, "as_py"):
        value = value.as_py()
    payload: bytes | None = None
    if isinstance(value, dict) and value.get("bytes") is not None:
        payload = bytes(value["bytes"])
    elif isinstance(value, (bytes, bytearray, memoryview)):
        payload = bytes(value)
    if payload is None:
        raise RuntimeError("Parquet音声セルにバイト列がありません")
    try:
        audio, sample_rate = sf.read(io.BytesIO(payload), dtype="float32", always_2d=True)
        return np.mean(audio, axis=1).astype(np.float32), int(sample_rate)
    except Exception:
        source = WORK / "decode_source.bin"
        destination = WORK / "decode_destination.wav"
        source.write_bytes(payload)
        process = subprocess.run(
            ["ffmpeg", "-hide_banner", "-loglevel", "error", "-y", "-i", str(source),
             "-vn", "-ac", "1", "-ar", str(TARGET_SR), "-c:a", "pcm_s24le", str(destination)],
            stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True, timeout=180,
        )
        if process.returncode != 0:
            raise RuntimeError(f"音声デコード失敗: {process.stderr[-800:]}")
        audio, sample_rate = sf.read(destination, dtype="float32", always_2d=True)
        return np.mean(audio, axis=1).astype(np.float32), int(sample_rate)


def estimate_pitch(signal: np.ndarray, sample_rate: int) -> tuple[float, float]:
    x = resample_mono(signal, sample_rate, 16_000)
    frame_length = 1024
    hop = 320
    values: list[float] = []
    for start in range(0, max(1, x.size - frame_length), hop):
        frame = x[start:start + frame_length]
        if frame.size < frame_length:
            continue
        frame = frame - float(np.mean(frame))
        if float(np.sqrt(np.mean(frame * frame) + 1e-12)) < 0.007:
            continue
        autocorrelation = np.correlate(frame, frame, mode="full")[frame_length - 1:]
        low = int(16_000 / 520)
        high = min(len(autocorrelation), int(16_000 / 65))
        if high <= low:
            continue
        lag = int(np.argmax(autocorrelation[low:high]) + low)
        if lag > 0 and autocorrelation[lag] > autocorrelation[0] * 0.22:
            values.append(16_000.0 / lag)
    if not values:
        return 0.0, 0.0
    array = np.asarray(values, dtype=np.float64)
    return float(np.median(array)), float(np.percentile(array, 75) - np.percentile(array, 25))


def audio_metrics(signal: np.ndarray, sample_rate: int) -> dict[str, float]:
    x = np.asarray(signal, dtype=np.float32)
    duration = float(x.size / int(sample_rate)) if sample_rate else 0.0
    peak = float(np.max(np.abs(x))) if x.size else 0.0
    rms = float(np.sqrt(np.mean(np.square(x)) + 1e-12)) if x.size else 0.0
    clip_ratio = float(np.mean(np.abs(x) >= 0.999)) if x.size else 1.0
    absolute = np.abs(x)
    dynamic = 0.0
    if absolute.size:
        dynamic = 20.0 * math.log10(
            max(float(np.percentile(absolute, 95)), 1e-9) /
            max(float(np.percentile(absolute, 35)), 1e-9)
        )
    f0, f0_iqr = estimate_pitch(x, int(sample_rate))
    if x.size < 2048:
        centroid, flatness, high_ratio, air_ratio, box_ratio = 0.0, 1.0, 1.0, 0.0, 1.0
    else:
        size = 2048
        hop = 512
        count = 1 + max(0, (x.size - size) // hop)
        indices = np.arange(size)[None, :] + hop * np.arange(count)[:, None]
        frames = x[indices] * np.hanning(size)[None, :]
        power = np.abs(np.fft.rfft(frames, axis=1)) ** 2 + 1e-12
        frequencies = np.fft.rfftfreq(size, 1 / int(sample_rate))
        totals = np.maximum(power.sum(axis=1), 1e-12)
        centroid = float(np.mean((power * frequencies[None, :]).sum(axis=1) / totals))
        flatness = float(np.mean(np.exp(np.mean(np.log(power), axis=1)) / np.maximum(np.mean(power, axis=1), 1e-12)))
        high_ratio = float(np.mean(power[:, frequencies >= 7000].sum(axis=1) / totals))
        air_ratio = float(np.mean(power[:, frequencies >= 10000].sum(axis=1) / totals))
        box_mask = (frequencies >= 220) & (frequencies <= 520)
        box_ratio = float(np.mean(power[:, box_mask].sum(axis=1) / totals))
    return {
        "duration_sec": duration,
        "peak_dbfs": 20 * math.log10(max(peak, 1e-12)),
        "rms_dbfs": 20 * math.log10(max(rms, 1e-12)),
        "clip_ratio": clip_ratio,
        "dynamic_range_db": dynamic,
        "estimated_f0_median_hz": f0,
        "estimated_f0_iqr_hz": f0_iqr,
        "spectral_centroid_hz": centroid,
        "spectral_flatness": flatness,
        "high_frequency_ratio": high_ratio,
        "air_frequency_ratio": air_ratio,
        "boxiness_ratio": box_ratio,
    }


def quality_score(metrics: dict[str, float]) -> float:
    duration = float(metrics["duration_sec"])
    rms = float(metrics["rms_dbfs"])
    centroid = float(metrics["spectral_centroid_hz"])
    flatness = float(metrics["spectral_flatness"])
    high = float(metrics["high_frequency_ratio"])
    air = float(metrics["air_frequency_ratio"])
    box = float(metrics["boxiness_ratio"])
    clip = float(metrics["clip_ratio"])
    duration_score = float(np.exp(-((duration - 5.0) / 5.0) ** 2))
    rms_score = float(np.exp(-((rms + 20.0) / 9.0) ** 2))
    presence = float(np.exp(-((centroid - 2700.0) / 2600.0) ** 2))
    smooth = float(np.exp(-((flatness - 0.035) / 0.16) ** 2))
    high_score = float(np.exp(-((high - 0.055) / 0.12) ** 2))
    air_score = float(np.exp(-((air - 0.016) / 0.05) ** 2))
    box_score = float(np.exp(-((box - 0.18) / 0.20) ** 2))
    clean = max(0.0, 1.0 - clip / 0.0001)
    return float(np.clip(
        0.08 * duration_score + 0.10 * rms_score + 0.21 * presence + 0.19 * smooth +
        0.15 * high_score + 0.08 * air_score + 0.10 * box_score + 0.09 * clean,
        0.0, 1.0,
    ))


def integrity_ok(metrics: dict[str, float]) -> bool:
    return bool(
        0.55 <= float(metrics["duration_sec"]) <= 18.0
        and -38.0 <= float(metrics["rms_dbfs"]) <= -7.0
        and -20.0 <= float(metrics["peak_dbfs"]) <= -0.02
        and float(metrics["clip_ratio"]) <= 0.00015
        and float(metrics["spectral_flatness"]) <= 0.52
        and 250.0 <= float(metrics["spectral_centroid_hz"]) <= 10_500.0
    )


def load_source_targets() -> tuple[str, list[dict[str, Any]]]:
    csv_matches = list(SOURCE_ROOT.rglob("採用10本検査.csv"))
    if len(csv_matches) != 1:
        raise RuntimeError(f"採用10本検査.csvが一意ではありません: {len(csv_matches)}")
    with csv_matches[0].open(encoding="utf-8-sig", newline="") as file:
        rows = list(csv.DictReader(file))
    if len(rows) != 10:
        raise RuntimeError(f"採用台帳が10行ではありません: {len(rows)}")
    speaker_id = str(rows[0].get("speaker_id") or FALLBACK_SPEAKER_ID)
    if speaker_id != FALLBACK_SPEAKER_ID:
        raise RuntimeError(f"speaker_id不一致: {speaker_id} / {FALLBACK_SPEAKER_ID}")
    wav_root_matches = [path for path in SOURCE_ROOT.rglob(VOICE_FOLDER) if path.is_dir() and path.parent.name == "WAV"]
    if len(wav_root_matches) != 1:
        raise RuntimeError(f"元WAVフォルダが一意ではありません: {len(wav_root_matches)}")
    wav_root = wav_root_matches[0]
    targets: list[dict[str, Any]] = []
    for row in rows:
        number = int(row.get("number") or row.get("style_number") or 0)
        if number not in MODE_BY_NUMBER:
            raise RuntimeError(f"話法番号不正: {number}")
        source_wavs = sorted(wav_root.glob(f"{number:02d}_*.wav"))
        if len(source_wavs) != 1:
            raise RuntimeError(f"元WAVが一意ではありません: {number} / {len(source_wavs)}")
        text = str(row.get("source_text") or row.get("target_text") or row.get("visible_text") or "").strip()
        if not text:
            raise RuntimeError(f"元セリフが空です: {number}")
        targets.append({
            "number": number,
            "label": str(row.get("label") or row.get("style") or source_wavs[0].stem),
            "mode": MODE_BY_NUMBER[number],
            "text": text,
            "visible_text": str(row.get("visible_text") or strip_emoji(text)),
            "source_wav": str(source_wavs[0]),
            "output_name": source_wavs[0].name,
        })
    targets.sort(key=lambda item: int(item["number"]))
    return speaker_id, targets


def fetch_speaker_rows(speaker_id: str) -> list[dict[str, Any]]:
    index = int(speaker_id.split("_")[-1]) - 1
    filename = f"data/train-{index:05d}-of-10000.parquet"
    parquet_path = Path(hf_hub_download(
        repo_id=CLONE_DATASET, repo_type="dataset", filename=filename,
        local_dir=WORK / "clone_dataset",
    ))
    rows = pq.read_table(parquet_path, columns=["audio", "text", "speaker_id"]).to_pylist()
    if len(rows) != 299:
        raise RuntimeError(f"同一話者発話数が299ではありません: {len(rows)}")
    if {str(row.get("speaker_id")) for row in rows} != {speaker_id}:
        raise RuntimeError("Parquet内部のspeaker_idが一致しません")
    return rows


def neutral_text_score(text: str) -> float:
    raw = str(text)
    plain = strip_emoji(raw)
    emoji_penalty = sum(raw.count(char) for char in EMOTION_EMOJIS) * 3.0
    word_penalty = sum(1 for word in EMOTION_WORDS if word in plain) * 2.0
    length_score = float(np.exp(-((len(plain) - 32.0) / 28.0) ** 2)) * 4.0
    punctuation_penalty = max(0, raw.count("!") + raw.count("！") - 1) * 1.2
    return length_score - emoji_penalty - word_penalty - punctuation_penalty


def select_clean_references(rows: list[dict[str, Any]]) -> list[Path]:
    ranked_text = sorted(
        [(index, neutral_text_score(str(row["text"]))) for index, row in enumerate(rows)],
        key=lambda item: item[1], reverse=True,
    )
    evaluated: list[tuple[float, int, np.ndarray, dict[str, float], str]] = []
    for index, text_score in ranked_text[:70]:
        signal, sample_rate = decode_audio_cell(rows[index]["audio"])
        signal = preserve_audio(signal, sample_rate)
        metrics = audio_metrics(signal, TARGET_SR)
        if not integrity_ok(metrics) or not (1.4 <= metrics["duration_sec"] <= 10.5):
            continue
        score = 0.67 * quality_score(metrics) + 0.33 * float(np.clip((text_score + 6.0) / 10.0, 0, 1))
        evaluated.append((score, index, signal, metrics, str(rows[index]["text"])))
    evaluated.sort(key=lambda item: item[0], reverse=True)
    selected: list[Path] = []
    hashes: set[str] = set()
    reference_records: list[dict[str, Any]] = []
    for score, index, signal, metrics, text in evaluated:
        digest = hashlib.sha256(signal.tobytes()).hexdigest()
        if digest in hashes:
            continue
        hashes.add(digest)
        path = REFERENCE_DIR / f"参照_{len(selected)+1:02d}_{index:03d}.wav"
        sf.write(path, signal, TARGET_SR, subtype="PCM_24")
        selected.append(path)
        reference_records.append({
            "row_index": index, "text": text, "score": score,
            **metrics, "quality_score": quality_score(metrics), "file": path.name,
        })
        if len(selected) >= 6:
            break
    if len(selected) < 3:
        raise RuntimeError(f"状態のよい同一話者参照が3本未満です: {len(selected)}")
    write_csv(VALIDATION_DIR / "選択した同一話者参照.csv", reference_records)
    return selected


def load_whisper() -> WhisperModel:
    last_error: Exception | None = None
    for attempt in range(1, 7):
        try:
            log(f"faster-whisper small 読み込み {attempt}/6")
            return WhisperModel("small", device="cpu", compute_type="int8", cpu_threads=max(2, os.cpu_count() or 2))
        except Exception as error:
            last_error = error
            time.sleep(min(120, attempt * 15))
    assert last_error is not None
    raise last_error


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


def align_to_target(path: Path, target_text: str, model: WhisperModel) -> tuple[Path, str, float]:
    transcript, words = transcribe(path, model)
    target = to_hiragana(target_text)
    if not words or not target:
        return path, transcript, 0.0
    best_score = -1.0
    best_start = 0
    best_end = len(words) - 1
    for start in range(len(words)):
        cumulative = ""
        for end in range(start, min(len(words), start + 50)):
            cumulative += str(words[end]["text"])
            actual = to_hiragana(cumulative)
            ratio = fuzz.ratio(target, actual) / 100.0
            partial = fuzz.partial_ratio(target, actual) / 100.0 if actual else 0.0
            extra = max(0, len(actual) - len(target))
            missing = max(0, len(target) - len(actual))
            score = 0.72 * ratio + 0.28 * partial - 0.035 * extra - 0.003 * missing
            if score > best_score:
                best_score, best_start, best_end = score, start, end
    if best_score < 0.68:
        return path, transcript, best_score
    signal, sample_rate = sf.read(path, dtype="float32", always_2d=True)
    mono = np.mean(signal, axis=1).astype(np.float32)
    start_sample = max(0, int((float(words[best_start]["start"]) - 0.07) * int(sample_rate)))
    end_sample = min(mono.size, int((float(words[best_end]["end"]) + 0.13) * int(sample_rate)))
    if end_sample - start_sample < int(0.5 * int(sample_rate)):
        return path, transcript, best_score
    aligned = path.with_name(path.stem + "_台詞区間.wav")
    sf.write(aligned, preserve_audio(mono[start_sample:end_sample], int(sample_rate)), TARGET_SR, subtype="PCM_24")
    transcript2, _ = transcribe(aligned, model)
    old_ratio = fuzz.ratio(target, to_hiragana(transcript))
    new_ratio = fuzz.ratio(target, to_hiragana(transcript2))
    if new_ratio + 1 >= old_ratio:
        return aligned, transcript2, best_score
    aligned.unlink(missing_ok=True)
    return path, transcript, best_score


def asr_evaluation(target_text: str, transcript: str, mode: str) -> dict[str, Any]:
    target = to_hiragana(target_text)
    actual = to_hiragana(transcript)
    ratio = float(fuzz.ratio(target, actual) / 100.0)
    partial = float(fuzz.partial_ratio(target, actual) / 100.0) if actual else 0.0
    delta = len(actual) - len(target)
    threshold = 0.72 if mode in {"laugh", "sleepy", "sad", "fear"} else 0.78
    accepted = bool(ratio >= threshold and partial >= 0.84 and delta <= 4)
    return {
        "target_hiragana": target, "actual_hiragana": actual,
        "asr_ratio": ratio, "asr_partial_ratio": partial,
        "length_delta": delta, "asr_accepted": accepted,
    }


def build_runtime() -> Any:
    checkpoint = download_hf_checkpoint(CHECKPOINT)
    runtime, _ = get_cached_runtime(RuntimeKey(
        checkpoint=str(checkpoint), model_device="cpu", model_precision="fp32",
        codec_device="cpu", codec_precision="fp32", compile_model=False, compile_dynamic=False,
    ))
    return runtime


def embed_path(encoder: VoiceEncoder, path: Path) -> np.ndarray:
    return encoder.embed_utterance(preprocess_wav(path)).astype(np.float32)


def cosine(left: np.ndarray, right: np.ndarray) -> float:
    return float(np.dot(left, right) / max(float(np.linalg.norm(left) * np.linalg.norm(right)), 1e-12))


def average_reference_embedding(encoder: VoiceEncoder, paths: list[Path]) -> np.ndarray:
    embeddings = [embed_path(encoder, path) for path in paths]
    average = np.mean(np.stack(embeddings), axis=0)
    return average / max(float(np.linalg.norm(average)), 1e-12)


def synthesize_candidates(
    runtime: Any, *, text: str, caption: str, references: list[Path],
    seed: int, duration_scale: float, count: int,
) -> tuple[list[np.ndarray], int, dict[str, Any]]:
    messages: list[str] = []
    result = runtime.synthesize(SamplingRequest(
        text=text, caption=caption, ref_wav=None,
        ref_wavs=[str(path.resolve()) for path in references],
        ref_latent=None, ref_latents=None, ref_embed=None, no_ref=False,
        ref_normalize_db=-18.0, ref_ensure_max=True,
        num_candidates=count, decode_mode="sequential", seconds=None,
        duration_scale=float(duration_scale), min_seconds=0.5, max_seconds=18.0,
        max_ref_seconds=32.0, max_text_len=None, max_caption_len=None,
        num_steps=40, cfg_scale_text=3.1, cfg_scale_caption=3.05,
        cfg_scale_speaker=5.4, cfg_guidance_mode="independent", cfg_scale=None,
        cfg_min_t=0.5, cfg_max_t=1.0, truncation_factor=None,
        rescale_k=None, rescale_sigma=None, context_kv_cache=True,
        speaker_kv_scale=None, speaker_kv_min_t=None, speaker_kv_max_layers=None,
        speaker_uncond_mode="mask", seed=int(seed), t_schedule_mode="linear",
        sway_coeff=-1.0, trim_tail=True, tail_window_size=20,
        tail_std_threshold=0.05, tail_mean_threshold=0.1, lora_adapter=None,
    ), log_fn=messages.append)
    audios = [audio.detach().float().cpu().numpy().reshape(-1) for audio in result.audios]
    return audios, int(result.sample_rate), {
        "used_seed": int(result.used_seed), "messages": [*messages, *result.messages],
        "stage_timings": result.stage_timings,
    }


def build_clean_anchor(runtime: Any, references: list[Path], encoder: VoiceEncoder, reference_embedding: np.ndarray) -> Path:
    text = "きょうは、落ち着いて、ゆっくり話します。"
    caption = (
        "感情を誇張しない自然で穏やかな会話。すべての音を明瞭に発音する。" + STUDIO_CAPTION
    )
    audios, sample_rate, generation = synthesize_candidates(
        runtime, text=text, caption=caption, references=references[:6],
        seed=202608060000 + VOICE_INDEX * 1000, duration_scale=1.02, count=4,
    )
    records: list[dict[str, Any]] = []
    choices: list[tuple[float, Path]] = []
    for index, audio in enumerate(audios, start=1):
        signal = preserve_audio(audio, sample_rate)
        path = ANCHOR_DIR / f"基準候補_{index:02d}.wav"
        sf.write(path, signal, TARGET_SR, subtype="PCM_24")
        metrics = audio_metrics(signal, TARGET_SR)
        similarity = cosine(reference_embedding, embed_path(encoder, path))
        quality = quality_score(metrics)
        score = 0.64 * similarity + 0.36 * quality
        records.append({
            "candidate": index, "speaker_similarity": similarity,
            "quality_score": quality, "selection_score": score, **metrics,
        })
        if integrity_ok(metrics):
            choices.append((score, path))
    if not choices:
        raise RuntimeError("v4基準参照に信号条件を満たす候補がありません")
    choices.sort(key=lambda item: item[0], reverse=True)
    selected = choices[0][1]
    final = ANCHOR_DIR / "選択したv4透明基準参照.wav"
    shutil.copy2(selected, final)
    write_csv(VALIDATION_DIR / "v4基準参照候補.csv", records)
    (VALIDATION_DIR / "v4基準参照生成情報.json").write_text(
        json.dumps(generation, ensure_ascii=False, indent=2, default=str), encoding="utf-8"
    )
    return final


def acting_similarity(candidate: dict[str, float], source: dict[str, float]) -> float:
    def log_distance(left: float, right: float, floor: float = 1e-3) -> float:
        return abs(math.log(max(left, floor) / max(right, floor)))
    distance = (
        0.30 * log_distance(float(candidate["duration_sec"]), float(source["duration_sec"])) +
        0.20 * min(abs(float(candidate["rms_dbfs"]) - float(source["rms_dbfs"])) / 12.0, 2.0) +
        0.20 * log_distance(float(candidate["estimated_f0_median_hz"]), float(source["estimated_f0_median_hz"]), 20.0) +
        0.12 * log_distance(float(candidate["estimated_f0_iqr_hz"]), float(source["estimated_f0_iqr_hz"]), 2.0) +
        0.18 * log_distance(float(candidate["dynamic_range_db"]), float(source["dynamic_range_db"]), 1.0)
    )
    return float(math.exp(-1.7 * distance))


def generate_target(
    runtime: Any, whisper: WhisperModel, encoder: VoiceEncoder,
    reference_embedding: np.ndarray, references: list[Path], target: dict[str, Any],
) -> tuple[Path, list[dict[str, Any]], dict[str, Any]]:
    mode = str(target["mode"])
    source_path = Path(str(target["source_wav"]))
    source_signal, source_rate = sf.read(source_path, dtype="float32", always_2d=True)
    source_signal = preserve_audio(np.mean(source_signal, axis=1), int(source_rate))
    source_metrics = audio_metrics(source_signal, TARGET_SR)
    source_quality = quality_score(source_metrics)
    source_embedding = embed_path(encoder, source_path)
    caption = CAPTIONS[mode] + STUDIO_CAPTION
    style_dir = CANDIDATE_DIR / f"{int(target['number']):02d}_{safe_component(str(target['label']))}"
    style_dir.mkdir(parents=True, exist_ok=True)
    all_records: list[dict[str, Any]] = []
    accepted: list[tuple[float, Path, dict[str, Any]]] = []

    for round_number in range(2):
        round_caption = caption
        if round_number == 1:
            round_caption += " 第一候補よりさらに子音を明瞭にし、こもりと生成由来のざらつきを避ける。"
        audios, sample_rate, generation = synthesize_candidates(
            runtime, text=str(target["text"]), caption=round_caption,
            references=references, seed=202608060000 + VOICE_INDEX * 100_000 + int(target["number"]) * 1000 + round_number * 100_003,
            duration_scale=DURATION_SCALE[mode], count=4,
        )
        for local_index, audio in enumerate(audios, start=1):
            candidate_number = round_number * 4 + local_index
            raw_path = style_dir / f"候補_{candidate_number:02d}_生.wav"
            signal = preserve_audio(audio, sample_rate)
            sf.write(raw_path, signal, TARGET_SR, subtype="PCM_24")
            aligned_path, transcript_before, alignment_score = align_to_target(raw_path, str(target["text"]), whisper)
            aligned_signal, aligned_rate = sf.read(aligned_path, dtype="float32", always_2d=True)
            final_signal = preserve_audio(np.mean(aligned_signal, axis=1), int(aligned_rate))
            processed_path = style_dir / f"候補_{candidate_number:02d}_無加工整理.wav"
            sf.write(processed_path, final_signal, TARGET_SR, subtype="PCM_24")
            transcript, _ = transcribe(processed_path, whisper)
            asr = asr_evaluation(str(target["text"]), transcript, mode)
            metrics = audio_metrics(final_signal, TARGET_SR)
            quality = quality_score(metrics)
            speaker_similarity = cosine(reference_embedding, embed_path(encoder, processed_path))
            source_similarity = cosine(source_embedding, embed_path(encoder, processed_path))
            acting = acting_similarity(metrics, source_metrics)
            healthy = integrity_ok(metrics)
            quality_gate = quality >= max(0.40, source_quality - 0.08)
            hard_accept = bool(
                healthy and asr["asr_accepted"] and speaker_similarity >= 0.36 and quality_gate
            )
            selection_score = (
                0.31 * float(asr["asr_ratio"]) +
                0.10 * float(asr["asr_partial_ratio"]) +
                0.23 * speaker_similarity +
                0.10 * source_similarity +
                0.18 * quality +
                0.08 * acting
            )
            record: dict[str, Any] = {
                "voice": VOICE_FOLDER, "number": target["number"], "label": target["label"],
                "mode": mode, "candidate": candidate_number,
                "target_text": target["text"], "transcript_before": transcript_before,
                "transcript_final": transcript, "alignment_score": alignment_score,
                **asr, **metrics, "quality_score": quality,
                "source_quality_score": source_quality,
                "speaker_similarity": speaker_similarity,
                "source_utterance_similarity": source_similarity,
                "acting_similarity": acting, "integrity_ok": healthy,
                "quality_gate": quality_gate, "accepted": hard_accept,
                "selection_score": selection_score, "path": str(processed_path),
                "generation": json.dumps(generation, ensure_ascii=False, default=str),
            }
            all_records.append(record)
            log(
                f"{VOICE_FOLDER} / {target['label']} / cand={candidate_number} "
                f"ASR={asr['asr_ratio']:.3f} speaker={speaker_similarity:.3f} "
                f"quality={quality:.3f} acting={acting:.3f} accepted={hard_accept}"
            )
            if hard_accept:
                accepted.append((selection_score, processed_path, record))
        if accepted:
            break

    if not accepted:
        ranked = sorted(
            all_records,
            key=lambda row: (
                bool(row["integrity_ok"]), float(row["selection_score"]),
                float(row["asr_ratio"]), float(row["speaker_similarity"]), float(row["quality_score"]),
            ), reverse=True,
        )
        best = ranked[0]
        controlled_fallback = bool(
            best["integrity_ok"] and float(best["asr_ratio"]) >= 0.64
            and float(best["asr_partial_ratio"]) >= 0.78
            and int(best["length_delta"]) <= 6
            and float(best["speaker_similarity"]) >= 0.32
            and float(best["quality_score"]) >= 0.36
        )
        if not controlled_fallback:
            raise RuntimeError(
                f"合格候補なし: {VOICE_FOLDER} / {target['label']} / "
                f"ASR={best['asr_ratio']}, speaker={best['speaker_similarity']}, quality={best['quality_score']}"
            )
        best["controlled_fallback"] = True
        accepted = [(float(best["selection_score"]), Path(str(best["path"])), best)]

    accepted.sort(key=lambda item: item[0], reverse=True)
    return accepted[0][1], all_records, accepted[0][2]


def validate_wav(path: Path) -> dict[str, Any]:
    info = sf.info(path)
    data, sample_rate = sf.read(path, dtype="float32", always_2d=True)
    if int(info.samplerate) != TARGET_SR or int(info.channels) != 1 or info.subtype != "PCM_24":
        raise RuntimeError(f"WAV形式不正: {path} -> {info}")
    if data.shape[0] / sample_rate < 0.5:
        raise RuntimeError(f"WAVが短すぎます: {path}")
    process = subprocess.run(
        ["ffmpeg", "-v", "error", "-i", str(path), "-f", "null", "-"],
        stdout=subprocess.PIPE, stderr=subprocess.PIPE, check=False,
    )
    if process.returncode != 0:
        raise RuntimeError(f"全編デコード失敗: {path}: {process.stderr[-500:]!r}")
    return {
        "file": path.relative_to(OUT).as_posix(), "sample_rate": int(info.samplerate),
        "channels": int(info.channels), "subtype": info.subtype,
        "duration_sec": round(float(data.shape[0] / sample_rate), 3), "sha256": sha256(path),
    }


def main() -> None:
    try:
        speaker_id, targets = load_source_targets()
        if PILOT:
            targets = [target for target in targets if int(target["number"]) in {2, 7}]
        log(f"開始: {VOICE_FOLDER} / {speaker_id} / checkpoint={CHECKPOINT} / targets={len(targets)}")
        speaker_rows = fetch_speaker_rows(speaker_id)
        clean_references = select_clean_references(speaker_rows)
        encoder = VoiceEncoder(device="cpu")
        original_reference_embedding = average_reference_embedding(encoder, clean_references)
        runtime = build_runtime()
        anchor = build_clean_anchor(runtime, clean_references, encoder, original_reference_embedding)
        final_references = [anchor, *clean_references[:3]]
        final_reference_embedding = average_reference_embedding(encoder, final_references)
        whisper = load_whisper()

        all_candidate_records: list[dict[str, Any]] = []
        final_records: list[dict[str, Any]] = []
        ordered_targets = sorted(targets, key=lambda item: (0 if int(item["number"]) == 2 else 1, int(item["number"])))
        for target in ordered_targets:
            selected_path, records, selected = generate_target(
                runtime, whisper, encoder, final_reference_embedding, final_references, target,
            )
            all_candidate_records.extend(records)
            output_path = WAV_DIR / safe_component(str(target["output_name"]), 150)
            signal, sample_rate = sf.read(selected_path, dtype="float32", always_2d=True)
            final_signal = preserve_audio(np.mean(signal, axis=1), int(sample_rate))
            sf.write(output_path, final_signal, TARGET_SR, subtype="PCM_24")
            transcript, _ = transcribe(output_path, whisper)
            final_asr = asr_evaluation(str(target["text"]), transcript, str(target["mode"]))
            final_metrics = audio_metrics(final_signal, TARGET_SR)
            final_quality = quality_score(final_metrics)
            final_speaker = cosine(final_reference_embedding, embed_path(encoder, output_path))
            if not integrity_ok(final_metrics):
                raise RuntimeError(f"最終WAVの信号条件不合格: {output_path}")
            if int(final_asr["length_delta"]) > 6:
                raise RuntimeError(f"最終WAVに余計な発話の疑い: {output_path} -> {transcript!r}")
            if final_speaker < 0.32:
                raise RuntimeError(f"最終WAVの話者類似度不足: {output_path} -> {final_speaker}")
            final_records.append({
                "voice": VOICE_FOLDER, "speaker_id": speaker_id,
                "number": target["number"], "label": target["label"], "mode": target["mode"],
                "target_text": target["text"], "transcript": transcript,
                "file": output_path.relative_to(OUT).as_posix(),
                **final_asr, **final_metrics,
                "quality_score": final_quality, "speaker_similarity": final_speaker,
                "selected_candidate": selected.get("candidate"),
                "selected_selection_score": selected.get("selection_score"),
                "selected_acting_similarity": selected.get("acting_similarity"),
                "controlled_fallback": bool(selected.get("controlled_fallback", False)),
                "sha256": sha256(output_path),
            })

        final_records.sort(key=lambda item: int(item["number"]))
        write_csv(VALIDATION_DIR / "全候補検査.csv", all_candidate_records)
        write_csv(VALIDATION_DIR / "最終WAV検査.csv", final_records)
        checks = [validate_wav(path) for path in sorted(WAV_DIR.glob("*.wav"))]
        write_csv(VALIDATION_DIR / "形式・全編デコード検証.csv", checks)
        expected = 2 if PILOT else 10
        if len(checks) != expected:
            raise RuntimeError(f"最終WAV数が不正です: {len(checks)} / {expected}")
        summary = {
            "voice_index": VOICE_INDEX, "voice": VOICE_FOLDER, "speaker_id": speaker_id,
            "checkpoint": CHECKPOINT, "pilot": PILOT, "wav_count": len(checks),
            "reference_files": [path.name for path in clean_references],
            "v4_anchor": anchor.name,
            "final": [
                {
                    "number": row["number"], "label": row["label"],
                    "target": row["target_text"], "transcript": row["transcript"],
                    "asr_ratio": row["asr_ratio"], "speaker_similarity": row["speaker_similarity"],
                    "quality_score": row["quality_score"],
                    "controlled_fallback": row["controlled_fallback"],
                }
                for row in final_records
            ],
        }
        (VALIDATION_DIR / "集計.json").write_text(json.dumps(summary, ensure_ascii=False, indent=2), encoding="utf-8")
        log(f"完了: {VOICE_FOLDER} / {len(checks)} WAV")
    except Exception:
        error = traceback.format_exc()
        (VALIDATION_DIR / "致命的エラー.txt").write_text(error, encoding="utf-8")
        log(error)
        raise


if __name__ == "__main__":
    main()
