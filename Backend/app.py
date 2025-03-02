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

    # Default response
    return jsonify({"message": "I'm not sure about that. Please consult a doctor if it's a medical issue."})

if __name__ == "__main__":
    app.run(debug=True, port=3000)
