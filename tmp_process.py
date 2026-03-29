import os, glob
from PIL import Image

output_dir = r'C:\VScode\YukkuriMatomeProcessor-site\vite-site\public'
input_dir = r'C:\Users\takas\.gemini\antigravity\brain\ae4c9535-37fe-467d-be6f-53a955757e89'

mapping = [
    'bg_flow_master',
    'bg_speed_master',
    'bg_demo_master',
    'bg_usecases_master',
    'bg_pricing_master',
    'bg_faq_master',
    'bg_cta_master'
]

for prefix in mapping:
    files = glob.glob(os.path.join(input_dir, f'{prefix}_*.png'))
    if not files:
        print(f'Missing files for {prefix}')
        continue

    latest = max(files, key=os.path.getctime)
    print(f'Processing {latest}')

    try:
        img = Image.open(latest).convert('RGB')
        w, h = img.size
        target_ratio = 16 / 9
        current_ratio = w / h
        if current_ratio < target_ratio:
            new_h = int(w / target_ratio)
            top = (h - new_h) // 2
            img = img.crop((0, top, w, top + new_h))
        else:
            new_w = int(h * target_ratio)
            left = (w - new_w) // 2
            img = img.crop((left, 0, left + new_w, h))

        img = img.resize((3840, 2160), Image.Resampling.LANCZOS)
        out_path = os.path.join(output_dir, f'{prefix}.jpg')
        img.save(out_path, 'JPEG', quality=95)
        print(f'Saved {out_path}')
    except Exception as e:
        print(f'Error processing {prefix}: {e}')
