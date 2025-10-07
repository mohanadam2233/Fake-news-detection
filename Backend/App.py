from flask import Flask, request, jsonify
from flask_cors import CORS  # <--- Import CORS
import pandas as pd
from utilies import load_pickle

app = Flask(__name__)
CORS(app)  # <--- Enable CORS for all routes

# Load models
lr_model = load_pickle("Backend/models/lr_model.pkl")
nb_model = load_pickle("Backend/models/nb_model.pkl")
rf_model = load_pickle("Backend/models/rf_model.pkl")
tfidf    = load_pickle("Backend/models/tfidf_vectorizer.pkl")
metrics  = load_pickle("Backend/models/metrics.pkl")

def lab2str(v):
    return "Fake (0)" if v == 0 else "True (1)"

@app.route("/")
def home():
    return "Fake News Detection API is running!"

@app.route("/predict", methods=["POST"])
def predict():
    data = request.json
    text = data.get("text", "")
    if not text:
        return jsonify({"error": "No text provided"}), 400

    # Transform
    vect_text = tfidf.transform([text])

    # Predict
    lr_pred = int(lr_model.predict(vect_text)[0])
    nb_pred = int(nb_model.predict(vect_text)[0])
    rf_pred = int(rf_model.predict(vect_text.toarray())[0])

    return jsonify({
        "text": text,
        "predictions": {
            "LogisticRegression": lab2str(lr_pred),
            "NaiveBayes": lab2str(nb_pred),
            "RandomForest": lab2str(rf_pred)
        },
        "metrics": metrics
    })

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=8000)
