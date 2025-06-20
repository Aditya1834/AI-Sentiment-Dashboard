

# from fastapi import FastAPI
# import tweepy
# import praw
# import requests
# import os
# from transformers import AutoTokenizer, AutoModelForSequenceClassification
# from torch.nn.functional import softmax
# import torch

# app = FastAPI()

# # Load Sentiment Model
# tokenizer = AutoTokenizer.from_pretrained("cardiffnlp/twitter-xlm-roberta-base-sentiment", use_fast=False)
# model = AutoModelForSequenceClassification.from_pretrained("cardiffnlp/twitter-xlm-roberta-base-sentiment")
# labels = ["Negative", "Neutral", "Positive"]

# def predict_sentiment(text):
#     inputs = tokenizer(text, return_tensors="pt", truncation=True, padding=True, max_length=512)
#     with torch.no_grad():
#         outputs = model(**inputs)
#     probs = softmax(outputs.logits, dim=-1)
#     sentiment = labels[probs.argmax().item()]
#     return sentiment

# @app.get("/sentiment")
# def analyze_text(text: str):
#     sentiment = predict_sentiment(text)
#     return {"text": text, "sentiment": sentiment}

# # Twitter API
# TWITTER_BEARER_TOKEN = os.getenv("TWITTER_BEARER_TOKEN")

# def fetch_twitter_data(query):
#     headers = {"Authorization": f"Bearer {TWITTER_BEARER_TOKEN}"}
#     url = f"https://api.twitter.com/2/tweets/search/recent?query={query}&tweet.fields=text"
#     response = requests.get(url, headers=headers)
#     tweets = response.json().get("data", [])
#     return tweets

# @app.get("/twitter")
# def get_twitter_sentiment(query: str):
#     tweets = fetch_twitter_data(query)
#     results = [{"text": tweet["text"], "sentiment": predict_sentiment(tweet["text"])} for tweet in tweets]
#     return results

# # Reddit API
# import praw

# REDDIT_CLIENT_ID = "tgW5vrjQ745gQKgNXo40wg"
# REDDIT_CLIENT_SECRET = "wmhyIPBLegn8Bp-COl4lty-Ga2ROQQ"
# REDDIT_USER_AGENT = "test"

# try:
#     reddit = praw.Reddit(client_id=REDDIT_CLIENT_ID, client_secret=REDDIT_CLIENT_SECRET, user_agent=REDDIT_USER_AGENT)
#     print("✅ Reddit API Connected Successfully!")
# except Exception as e:
#     print(f"🚨 Reddit API Connection Failed: {e}")

# @app.get("/reddit")
# def get_reddit_sentiment(subreddit: str):
#     posts = reddit.subreddit(subreddit).hot(limit=10)
#     results = [{"text": post.title, "sentiment": predict_sentiment(post.title)} for post in posts]
#     return results


from fastapi import FastAPI
import tweepy
import praw
import requests
import os
from transformers import AutoTokenizer, AutoModelForSequenceClassification
from torch.nn.functional import softmax
import torch

app = FastAPI()

# Load Sentiment Model
tokenizer = AutoTokenizer.from_pretrained("cardiffnlp/twitter-xlm-roberta-base-sentiment", use_fast=False)
model = AutoModelForSequenceClassification.from_pretrained("cardiffnlp/twitter-xlm-roberta-base-sentiment")
labels = ["Negative", "Neutral", "Positive"]

def predict_sentiment(text):
    inputs = tokenizer(text, return_tensors="pt", truncation=True, padding=True, max_length=512)
    with torch.no_grad():
        outputs = model(**inputs)
    probs = softmax(outputs.logits, dim=-1)
    sentiment = labels[probs.argmax().item()]
    return sentiment

@app.get("/")
def root():
    return {"message": "API is working!"}

@app.get("/sentiment")
def analyze_text(text: str):
    sentiment = predict_sentiment(text)
    return {"text": text, "sentiment": sentiment}

# Twitter API
TWITTER_BEARER_TOKEN = os.getenv("TWITTER_BEARER_TOKEN")

def fetch_twitter_data(query):
    headers = {"Authorization": f"Bearer {TWITTER_BEARER_TOKEN}"}
    url = f"https://api.twitter.com/2/tweets/search/recent?query={query}&tweet.fields=text"
    response = requests.get(url, headers=headers)
    tweets = response.json().get("data", [])
    return tweets

@app.get("/twitter")
def get_twitter_sentiment(query: str):
    tweets = fetch_twitter_data(query)
    results = [{"text": tweet["text"], "sentiment": predict_sentiment(tweet["text"])} for tweet in tweets]
    return results

# Reddit API
REDDIT_CLIENT_ID = "tgW5vrjQ745gQKgNXo40wg"
REDDIT_CLIENT_SECRET = "wmhyIPBLegn8Bp-COl4lty-Ga2ROQQ"
REDDIT_USER_AGENT = "test"

try:
    reddit = praw.Reddit(client_id=REDDIT_CLIENT_ID, client_secret=REDDIT_CLIENT_SECRET, user_agent=REDDIT_USER_AGENT)
    print("✅ Reddit API Connected Successfully!")
except Exception as e:
    print(f"🚨 Reddit API Connection Failed: {e}")

@app.get("/reddit")
def get_reddit_sentiment(subreddit: str):
    posts = reddit.subreddit(subreddit).hot(limit=10)
    results = [{"text": post.title, "sentiment": predict_sentiment(post.title)} for post in posts]
    return results
