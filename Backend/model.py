# ==========================
# Fake News Detection using only 'text' column (Updated)
# ==========================

# --------------------------------
# 0) Imports
# --------------------------------
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.naive_bayes import MultinomialNB
from sklearn.ensemble import RandomForestClassifier
from utilies import save_pickle, prepare_text_vectorizer
from sklearn.metrics import (
    accuracy_score, precision_score, recall_score, f1_score, confusion_matrix, classification_report
)

RANDOM_STATE = 42

# --------------------------------
# 1) Load and prepare dataset
# --------------------------------
fake = pd.read_csv("Backend/Dataset/Fake.csv")[["text"]].copy()
true = pd.read_csv("Backend/Dataset/True.csv")[["text"]].copy()

fake["label"] = 0  # Fake
true["label"] = 1  # True

df = pd.concat([fake, true], axis=0)
df = df.sample(frac=1, random_state=RANDOM_STATE).reset_index(drop=True)

print("=== Dataset Info ===")
print(df.head())
print("Shape:", df.shape)

# --------------------------------
# 2) Features (X) and target (y)
# --------------------------------
X = df["text"].astype(str)
y = df["label"].astype(int)

# --------------------------------
# 3) Train/Test Split
# --------------------------------
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=RANDOM_STATE
)

print("\n=== Split Sizes ===")
print("Train:", X_train.shape[0], "| Test:", X_test.shape[0])

# --------------------------------
# 4) TF-IDF Vectorization
# --------------------------------
tfidf = TfidfVectorizer(stop_words="english", max_df=0.7)
X_train_tfidf = tfidf.fit_transform(X_train)
X_test_tfidf = tfidf.transform(X_test)

print("\n=== TF-IDF Shapes ===")
print("X_train:", X_train_tfidf.shape, "| X_test:", X_test_tfidf.shape)

# --------------------------------
# 5) Train Models
# --------------------------------
# Logistic Regression
lr_model = LogisticRegression(max_iter=1000, random_state=RANDOM_STATE)
lr_model.fit(X_train_tfidf, y_train)
lr_pred = lr_model.predict(X_test_tfidf)

# Naive Bayes
nb_model = MultinomialNB()
nb_model.fit(X_train_tfidf, y_train)
nb_pred = nb_model.predict(X_test_tfidf)

# Random Forest
rf_model = RandomForestClassifier(n_estimators=200, random_state=RANDOM_STATE)
rf_model.fit(X_train_tfidf, y_train)
rf_pred = rf_model.predict(X_test_tfidf.toarray())  # Dense needed for RF


# Save models
save_pickle(lr_model, "Backend/models/lr_model.pkl")
save_pickle(nb_model, "Backend/models/nb_model.pkl")
save_pickle(rf_model, "Backend/models/rf_model.pkl")
save_pickle(tfidf, "Backend/models/tfidf_vectorizer.pkl")

print("✅ Models and vectorizer saved successfully.")
# --------------------------------
# 6) Helper functions for metrics
# --------------------------------
def print_clf_metrics(name, y_true, y_pred, pos_label=0):
    acc  = accuracy_score(y_true, y_pred)
    prec = precision_score(y_true, y_pred, pos_label=pos_label)
    rec  = recall_score(y_true, y_pred, pos_label=pos_label)
    f1   = f1_score(y_true, y_pred, pos_label=pos_label)
    print(f"\n{name} Performance:")
    print(f"  Accuracy : {acc:.3f}")
    print(f"  Precision: {prec:.3f}  (positive = Fake=0)")
    print(f"  Recall   : {rec:.3f}  (positive = Fake=0)")
    print(f"  F1-Score : {f1:.3f}  (positive = Fake=0)")

def print_confmat(name, y_true, y_pred):
    cm = confusion_matrix(y_true, y_pred, labels=[1, 0])
    cm_df = pd.DataFrame(
        cm,
        index   = ["Actual: True (1)",  "Actual: Fake (0)"],
        columns = ["Pred: True (1)",    "Pred: Fake (0)"]
    )
    print(f"\n{name} – Confusion Matrix:\n{cm_df}")

# --------------------------------
# 7) Evaluate models
# --------------------------------
for model_name, pred in [("Logistic Regression", lr_pred),
                         ("Naive Bayes", nb_pred),
                         ("Random Forest", rf_pred)]:
    print_clf_metrics(model_name, y_test, pred, pos_label=0)
    print_confmat(model_name, y_test, pred)


# --------------------------------
# 7.1) Save metrics for API
# --------------------------------

def calc_metrics(y_true, y_pred):
    return {
        "accuracy": round(accuracy_score(y_true, y_pred)*100, 2),
        "precision": round(precision_score(y_true, y_pred, pos_label=0)*100, 2),
        "f1_score": round(f1_score(y_true, y_pred, pos_label=0)*100, 2)
    }

metrics_dict = {
    "LogisticRegression": calc_metrics(y_test, lr_pred),
    "NaiveBayes": calc_metrics(y_test, nb_pred),
    "RandomForest": calc_metrics(y_test, rf_pred),
}

save_pickle(metrics_dict, "Backend/models/metrics.pkl")
print("✅ Metrics saved successfully.")


# --------------------------------
# 8) Single-message sanity check
# --------------------------------
i = 10  # Change index to inspect different examples
sample_text = X_test.iloc[i]
true_label  = y_test.iloc[i]

lr_pred_one = int(lr_model.predict(tfidf.transform([sample_text]))[0])
nb_pred_one = int(nb_model.predict(tfidf.transform([sample_text]))[0])
rf_pred_one = int(rf_model.predict(tfidf.transform([sample_text]).toarray())[0])

def lab2str(v):
    return "Fake (0)" if v == 0 else "True (1)"

print("\n=== SINGLE MESSAGE CHECK ===")
snippet = (sample_text[:160] + "...") if len(sample_text) > 160 else sample_text
print("Text snippet:", snippet)
print("Actual      :", lab2str(true_label))
print("LR Pred     :", lab2str(lr_pred_one))
print("NB Pred     :", lab2str(nb_pred_one))
print("RF Pred     :", lab2str(rf_pred_one))

# save
save_path="Backend/Dataset/Clean_Dataset_fake _true.csv"
df.to_csv(save_path, index=False)
