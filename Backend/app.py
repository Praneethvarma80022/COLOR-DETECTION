from flask import Flask, request, jsonify
import cv2
import numpy as np
import pandas as pd
import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load color data
csv = pd.read_csv('colors.csv', names=["color", "color_name", "hex", "R", "G", "B"], header=None)

def getColorName(R, G, B):
    """Find the closest color name in the dataset."""
    minimum = float('inf')
    cname = "Unknown"
    for i in range(len(csv)):
        d = abs(R - int(csv.loc[i, "R"])) + abs(G - int(csv.loc[i, "G"])) + abs(B - int(csv.loc[i, "B"]))
        if d < minimum:
            minimum = d
            cname = csv.loc[i, "color_name"]
    return cname

@app.route("/detect_color", methods=["POST"])
def detect_color():
    if "image" not in request.files:
        return jsonify({"error": "No image uploaded"}), 400

    file = request.files["image"]
    image_path = "uploaded_image.jpg"
    file.save(image_path)

    img = cv2.imread(image_path)

    if img is None:
        return jsonify({"error": "Invalid image format"}), 400

    try:
        x = int(request.form["x"])
        y = int(request.form["y"])

        height, width, _ = img.shape
        print(f"Image size: {width}x{height}, Clicked coordinates: ({x}, {y})")  # Debug log

        if x < 0 or y < 0 or x >= width or y >= height:
            return jsonify({"error": "Coordinates out of bounds"}), 400

        b, g, r = img[y, x]
        color_name = getColorName(r, g, b)

        os.remove(image_path)

        return jsonify({
            "color_name": color_name,
            "r": int(r),
            "g": int(g),
            "b": int(b)
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
