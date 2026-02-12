#!/usr/bin/env python3
"""Generate responsive JPEG/WebP variants for brand-post hero images."""

from __future__ import annotations

from pathlib import Path

from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
SOURCE_DIR = ROOT / "assets" / "showcase" / "aurora"
OUTPUT_DIR = SOURCE_DIR / "responsive"
TARGET_FILES = ("lobby-1.jpg", "gold-abstract.jpg", "workstation-1.jpg", "lobby-2.jpg")
TARGET_WIDTHS = (480, 768, 1200)


def resize_image(source_path: Path, width: int) -> Image.Image:
    with Image.open(source_path) as image:
        rgb = image.convert("RGB")
        ratio = width / rgb.width
        height = max(1, int(rgb.height * ratio))
        return rgb.resize((width, height), Image.Resampling.LANCZOS)


def generate_variants(source_path: Path) -> None:
    with Image.open(source_path) as image:
        source_width = image.width

    stem = source_path.stem
    for width in TARGET_WIDTHS:
        if width > source_width:
            continue

        resized = resize_image(source_path, width)
        jpg_path = OUTPUT_DIR / f"{stem}-{width}.jpg"
        webp_path = OUTPUT_DIR / f"{stem}-{width}.webp"
        resized.save(jpg_path, format="JPEG", quality=85, optimize=True, progressive=True)
        resized.save(webp_path, format="WEBP", quality=82, method=6)
        print(f"generated: {jpg_path.relative_to(ROOT)}")
        print(f"generated: {webp_path.relative_to(ROOT)}")


def main() -> None:
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    for filename in TARGET_FILES:
        source_path = SOURCE_DIR / filename
        if not source_path.exists():
            raise FileNotFoundError(f"source image not found: {source_path}")
        generate_variants(source_path)


if __name__ == "__main__":
    main()
