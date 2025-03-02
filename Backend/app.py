from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Predefined responses for health-related symptoms
responses = {
    "fever": {
        "precautions": "Drink plenty of fluids, rest, and take paracetamol if needed.",
        "medication": "Paracetamol 500mg every 6 hours (if necessary)."
    },
    "cold": {
        "precautions": "Stay hydrated, take steam inhalation, and avoid cold foods.",
        "medication": "Antihistamines like Cetirizine can help."
    },
    "headache": {
        "precautions": "Rest in a quiet, dark room, drink water, and avoid stress.",
        "medication": "Take Ibuprofen or Paracetamol as needed."
    },
    "cough": {
        "precautions": "Drink warm fluids, use honey, and take steam inhalation.",
        "medication": "Cough syrup like Dextromethorphan or natural remedies."
    }
}

# Responses for normal conversations
general_responses = {
    "hi": "Hello! How can I assist you today?",
    "hello": "Hi there! How can I help you?",
    "how are you": "I'm just a bot, but I'm here to help!",
    "thank you": "You're welcome! Stay healthy! 😊",
    "bye": "Goodbye! Take care. 👋"
}

@app.route("/chat", methods=["POST"])
def chat():
    user_input = request.json.get("message", "").lower()

    # Check for symptoms
    for symptom, response in responses.items():
        if symptom in user_input:
            return jsonify(response)

    # Check for general conversations
    for phrase, response in general_responses.items():
        if phrase in user_input:
            return jsonify({"message": response})

<<<<<<< HEAD
    # Default response
    return jsonify({"message": "I'm not sure about that. Please consult a doctor if it's a medical issue."})
=======
    if img is None:
        return jsonify({"error": "Invalid image format"}), 400

    try:
        x = int(request.form["x"])
        y = int(request.form["y"])

        height, width, _ = img.shape
        print(f"Image size: {width}x{height}, Clicked coordinates: ({x}, {y})")  # Debug log

        if x < 0 or y < 0 or x >= width or y >= height:
            return jsonify({"error": "Coordinates out of bounds"}), 400

        b, g, r = img[y, x]  # OpenCV reads in BGR format
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
>>>>>>> f141db2 (Added all project files)

if __name__ == "__main__":
    app.run(debug=True, port=3000)
