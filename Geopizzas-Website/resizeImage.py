#! python3
"""
resizeImage.py - Resizes an image
"""

# Importing Modules
from PIL import Image
import os

# Size to shrink
newSize = (300, 250)

# Shrinking image
for filename in os.listdir():
	if not filename.endswith('.jpeg'):
		continue
	im = Image.open(filename)
	im = im.resize(newSize)
	im.save(filename)
