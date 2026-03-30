import os
from PIL import Image

public_dir = r"c:\VScode\YukkuriMatomeProcessor-site\vite-site\public"
images_to_convert = [
    "bg_abstract_1.png",
    "bg_abstract_2.png",
    "bg_cta_master.jpg",
    "bg_demo_master.jpg",
    "bg_faq_master.jpg",
    "bg_flow_master.jpg",
    "bg_hero_master.jpg",
    "bg_pricing_master.jpg",
    "bg_speed_master.jpg",
    "bg_usecases_master.jpg"
]

converted_count = 0
for img_name in images_to_convert:
    img_path = os.path.join(public_dir, img_name)
    if os.path.exists(img_path):
        webp_name = os.path.splitext(img_name)[0] + ".webp"
        webp_path = os.path.join(public_dir, webp_name)
        
        try:
            with Image.open(img_path) as img:
                img.save(webp_path, "WEBP", quality=80)
            print(f"Converted: {img_name} -> {webp_name}")
            os.remove(img_path) # remove original to force update references
            converted_count += 1
        except Exception as e:
            print(f"Failed to convert {img_name}: {e}")
    else:
        print(f"Skipped missing file: {img_name}")

print(f"Conversion complete. {converted_count} files processed.")
