import pickle
import os
from sklearn.feature_extraction.text import TfidfVectorizer

def save_pickle(obj, filename):
    os.makedirs(os.path.dirname(filename), exist_ok=True)
    with open(filename, "wb") as f:
        pickle.dump(obj, f)

def load_pickle(filename):
    with open(filename, "rb") as f:
        return pickle.load(f)

def prepare_text_vectorizer(texts, max_df=0.7):
    tfidf = TfidfVectorizer(stop_words="english", max_df=max_df)
    X_tfidf = tfidf.fit_transform(texts)
    return tfidf, X_tfidf
