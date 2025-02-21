from flask import Flask, request, jsonify
from flask_cors import CORS
import torch
from transformers import AutoTokenizer, AutoModel
from pathlib import Path
import json

app = Flask(__name__)
CORS(app)  # Enable Cross-Origin Resource Sharing for React

# Define Model Classes
class EmbeddingModel(torch.nn.Module):
    def __init__(self, model_name):
        super(EmbeddingModel, self).__init__()
        self.model = AutoModel.from_pretrained(model_name)

    def forward(self, input_ids, attention_mask):
        outputs = self.model(input_ids=input_ids, attention_mask=attention_mask)
        return outputs.last_hidden_state[:, 0, :]

class ToxicityClassifier(torch.nn.Module):
    def __init__(self, embedding_dim):
        super(ToxicityClassifier, self).__init__()
        self.fc = torch.nn.Linear(embedding_dim, 2)

    def forward(self, x):
        return self.fc(x)

# Load Model
class ModelTester:
    def __init__(self, model_dir="LingoIITGN/mBERT_toxic_hindi"):
        self.model_dir = Path(model_dir)
        self.device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
        self.load_models()

    def load_models(self):
        with open(self.model_dir / "config.json", "r") as f:
            self.config = json.load(f)

        self.tokenizer = AutoTokenizer.from_pretrained(self.model_dir)
        self.embedding_model = EmbeddingModel(self.config["model_name"]).to(self.device)
        self.classifier = ToxicityClassifier(self.config["embedding_dim"]).to(self.device)

        self.embedding_model.load_state_dict(torch.load(self.model_dir / "embedding_model.pt", map_location=self.device))
        self.classifier.load_state_dict(torch.load(self.model_dir / "classifier.pt", map_location=self.device))

        self.embedding_model.eval()
        self.classifier.eval()

    def predict(self, text):
        encoding = self.tokenizer(
            text,
            padding='max_length',
            truncation=True,
            max_length=self.config["max_length"],
            return_tensors='pt'
        )

        input_ids = encoding['input_ids'].to(self.device)
        attention_mask = encoding['attention_mask'].to(self.device)

        with torch.no_grad():
            embeddings = self.embedding_model(input_ids, attention_mask)
            outputs = self.classifier(embeddings)
            probabilities = torch.softmax(outputs, dim=1)
            prediction = torch.argmax(outputs, dim=1)

        return {
            "toxic": bool(prediction.item()),
            "confidence": float(probabilities.max().item())
        }

# Initialize the model tester
tester = ModelTester()

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    text = data.get("text", "")

    if not text:
        return jsonify({"error": "No text provided"}), 400

    result = tester.predict(text)
    
    return jsonify({
        "toxicity": result["confidence"] * 100,  # Convert to percentage
        "is_toxic": result["toxic"]
    })

if __name__ == '__main__':
    app.run(host='10.0.62.187', port=2026)
