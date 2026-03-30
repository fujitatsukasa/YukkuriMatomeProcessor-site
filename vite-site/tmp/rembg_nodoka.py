from rembg import remove
from PIL import Image
import os
import glob

files = glob.glob(r"C:\VScode\YukkuriMatomeProcessor-site\vite-site\public\nodoka\step*.png")
for file_path in files:
    try:
        with open(file_path, 'rb') as f:
            input_bytes = f.read()
        
        output_bytes = remove(input_bytes)
        
        with open(file_path, 'wb') as f:
            f.write(output_bytes)
        print(f"Removed background for {file_path}")
    except Exception as e:
        print(f"Error on {file_path}: {e}")
