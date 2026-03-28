import os
from PIL import Image
from glob import glob

downloads = glob(r'C:\Users\takas\Downloads\*')
images = [f for f in downloads if f.lower().endswith(('.png', '.jpg', '.jpeg'))]
images.sort(key=os.path.getmtime, reverse=True)

latest_images = images[:2]
target_dir = r'C:\VScode\YukkuriMatomeProcessor-site\vite-site\src\assets\raw'

for img_path in latest_images:
    with Image.open(img_path) as img:
        print(f"File: {os.path.basename(img_path)}, Size: {img.size}")
