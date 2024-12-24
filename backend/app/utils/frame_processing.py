import cv2
import numpy as np

def decode_image(file):
    """Decode an image from a file."""
    return cv2.imdecode(np.frombuffer(file.read(), np.uint8), cv2.IMREAD_COLOR)
