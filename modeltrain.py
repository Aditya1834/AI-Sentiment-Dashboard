
import torch
from transformers import AutoTokenizer, AutoModelForSequenceClassification
from torch.nn.functional import softmax
from transformers import AutoTokenizer




def load_model():
    """ Load pre-trained multilingual XLM-Roberta model fine-tuned for sentiment analysis."""
    model_name = "cardiffnlp/twitter-xlm-roberta-base-sentiment"
    tokenizer = AutoTokenizer.from_pretrained(model_name, use_fast=False)  # Slow tokenizer force karo
    model = AutoModelForSequenceClassification.from_pretrained(model_name)
    return tokenizer, model

def predict_sentiment(text, tokenizer, model):
    """ Predict sentiment for given text input. """
    inputs = tokenizer(text, return_tensors="pt", truncation=True, padding=True, max_length=512)
    with torch.no_grad():
        outputs = model(**inputs)
    probs = softmax(outputs.logits, dim=-1)
    sentiment_scores = probs.squeeze().tolist()
    labels = ["Negative", "Neutral", "Positive"]  # XLM-Roberta has 3 sentiment classes
    sentiment = labels[sentiment_scores.index(max(sentiment_scores))]
    return sentiment

if __name__ == "__main__":
    tokenizer, model = load_model()
    while True:
        text = input("Enter text (or type 'exit' to quit): ")
        if text.lower() == 'exit':
            break
        sentiment = predict_sentiment(text, tokenizer, model)
        print(f"Predicted Sentiment: {sentiment}")
