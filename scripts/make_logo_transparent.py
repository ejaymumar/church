"""Make the white background of ecc_logo.png transparent and crop to content."""
from PIL import Image
import os

SRC = os.path.join("public", "ecc_logo.png")
DST = os.path.join("public", "ecc_logo.png")
THRESHOLD = 235  # pixels brighter than this on all channels become transparent

img = Image.open(SRC).convert("RGBA")
px = img.getdata()

new = []
for r, g, b, a in px:
    if r >= THRESHOLD and g >= THRESHOLD and b >= THRESHOLD:
        new.append((r, g, b, 0))          # white -> fully transparent
    else:
        new.append((r, g, b, a))
img.putdata(new)

# Crop to the bounding box of the visible (non-transparent) pixels
bbox = img.getbbox()
if bbox:
    img = img.crop(bbox)

img.save(DST)
print(f"Saved {DST} -> size {img.size}")
