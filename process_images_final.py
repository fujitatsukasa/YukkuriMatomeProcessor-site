import os
import shutil
from glob import glob
from PIL import Image, ImageStat
from rembg import remove

downloads = glob(r'C:\Users\takas\Downloads\*')
images = [f for f in downloads if f.lower().endswith(('.png', '.jpg', '.jpeg'))]
images.sort(key=os.path.getmtime, reverse=True)
latest_images = images[:2]

target_dir = r'C:\VScode\YukkuriMatomeProcessor-site\assets\img'

icon_img_path = None
bg_img_path = None

for img_path in latest_images:
    with Image.open(img_path) as img:
        stat = ImageStat.Stat(img)
        avg_brightness = sum(stat.mean[:3]) / 3
        if avg_brightness > 180:
            icon_img_path = img_path
        else:
            bg_img_path = img_path

# Fallback checking just in case
if icon_img_path is None or bg_img_path is None:
    print("Could not distinguish by brightness, assigning arbitrarily.")
    icon_img_path = latest_images[0]
    bg_img_path = latest_images[1]

if bg_img_path:
    dest_bg = os.path.join(target_dir, 'time_compression_bg.jpg')
    shutil.copy(bg_img_path, dest_bg)
    print(f"Saved background to {dest_bg}")

if icon_img_path:
    img = Image.open(icon_img_path)
    w, h = img.size
    step_w = w // 5
    for i in range(5):
        left = i * step_w
        right = (i + 1) * step_w
        cropped = img.crop((left, 0, right, h))
        processed = remove(cropped)
        
        # Additional cleanup: crop to content bbox if exists
        bbox = processed.getbbox()
        if bbox:
            processed = processed.crop(bbox)
        
        dest_icon = os.path.join(target_dir, f'icon_step_{i+1}.png')
        processed.save(dest_icon, "PNG")
        print(f"Saved icon {i+1} to {dest_icon}")

print("Processing complete!")
