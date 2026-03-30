from rembg import remove
from PIL import Image
import os
import io

src_dir = "c:/VScode/YukkuriMatomeProcessor-site/vite-site/public/nodoka"
for i in range(1, 8):
    file_path = f"{src_dir}/ai_step{i}.png"
    if os.path.exists(file_path):
        print(f"Removing background from {file_path}")
        with open(file_path, 'rb') as f:
            input_data = f.read()
            output_data = remove(input_data)
        
        with open(file_path, 'wb') as fout:
            fout.write(output_data)
        
        print(f"Success: {file_path}")
