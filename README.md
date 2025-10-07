# Fake News Detection Using Machine Learning: An End-to-End Web Application

## Abstract

The rapid spread of misinformation on the internet has created a pressing need for automated tools to detect fake news. This study presents a **Fake News Detection system** that combines three machine learning models—**Naive Bayes, Logistic Regression, and Random Forest**—with a modern **web-based frontend** built using **React, Vite, and Tailwind CSS**. The system allows users to input news text, select a model, and receive predictions along with model evaluation metrics such as **accuracy, precision, and F1-score**. Experimental results indicate that **Random Forest achieves the highest performance** with 98.91% accuracy, 98.96% F1-score, and 99.08% precision, outperforming the other models. The proposed system provides a practical solution to efficiently identify fake news while presenting results in a professional, user-friendly interface.

---

## 1. Introduction

The proliferation of online news has brought information to users at an unprecedented speed, but it has also facilitated the spread of misinformation. Fake news can influence public opinion, cause panic, and even affect democratic processes. Manual verification is time-consuming and often impractical. Hence, there is a critical need for automated systems capable of detecting fake news accurately.

This study aims to design and implement a **machine learning-based fake news detection system** with a modern frontend interface. The system supports multiple models, provides transparency through evaluation metrics, and offers a responsive, professional UI for end-users.

---

## 2. Related Work

Prior research in fake news detection has utilized **text classification techniques**, including Naive Bayes, Logistic Regression, Support Vector Machines, and ensemble methods. Deep learning approaches such as LSTM and BERT have also been applied but often require more computational resources. Ensemble methods like **Random Forest** have been shown to provide high accuracy for structured text classification tasks while maintaining interpretability.

---

## 3. Methodology

### 3.1 Data Collection and Preprocessing

* Collected datasets containing labeled news articles from reliable sources.  
* Preprocessing steps included:
  * Lowercasing text
  * Removing punctuation, stopwords, and special characters
  * Tokenization and **TF-IDF vectorization**

### 3.2 Machine Learning Models

Three models were trained and evaluated:

1. **Naive Bayes** – a probabilistic model suitable for text classification.  
2. **Logistic Regression** – a linear model predicting the likelihood of news being fake or real.  
3. **Random Forest** – an ensemble of decision trees that improves accuracy and reduces overfitting.  

### 3.3 Model Evaluation Metrics

The models were evaluated using:

* **Accuracy** – the proportion of correct predictions.  
* **Precision** – the proportion of true positives among predicted positives.  
* **F1-score** – the harmonic mean of precision and recall, balancing false positives and false negatives.  

**Performance Metrics:**

| Model               | Accuracy | F1-score | Precision |
| ------------------- | -------- | -------- | --------- |
| Logistic Regression | 98.27%   | 98.35%   | 98.65%    |
| Naive Bayes         | 93.24%   | 93.56%   | 93.53%    |
| Random Forest       | 98.91%   | 98.96%   | 99.08%    |

---

## 4. System Design

### 4.1 Backend

* **Framework:** Flask (Python)  
* Provides a **REST API** with endpoint `/predict`  
* Loads pre-trained models and **TF-IDF vectorizer** from serialized files  
* Returns JSON with predicted labels, confidence scores, and evaluation metrics  

### 4.2 Frontend

* **Stack:** React JS (Vite) + Tailwind CSS + lucide-react icons  
* **Features:**  
  * Text input for news articles  
  * Model selection (Naive Bayes, Logistic Regression, Random Forest)  
  * Prediction display with confidence scores  
  * Confusion matrix and metrics for transparency  
  * Modern, responsive UI with green-themed palette, gradients, and professional typography  

---

## 5. Results

* **Random Forest** achieved the highest performance among the three models, with 98.91% accuracy, 98.96% F1-score, and 99.08% precision.  
* Logistic Regression performed well with 98.27% accuracy, 98.35% F1-score, and 98.65% precision.  
* Naive Bayes achieved moderate performance at 93.24% accuracy.  

**Observation:** Ensemble methods like Random Forest provide more reliable results for fake news detection due to their ability to reduce overfitting and combine multiple decision trees’ strengths.

---

## 6. Discussion

* The high accuracy of Random Forest demonstrates the effectiveness of ensemble methods for text classification.  
* Naive Bayes, while fast and computationally inexpensive, shows lower accuracy, making it suitable for quick prototyping or resource-constrained environments.  
* Logistic Regression balances speed and accuracy, providing an intermediate solution.  
* The web interface enhances usability, allowing users to select models and visualize performance metrics, making the system practical for real-world applications.

---

## 7. Conclusion

This project presents an end-to-end **Fake News Detection system** integrating **machine learning models and a modern web frontend**. The system successfully identifies fake news with high accuracy, particularly using the Random Forest model. The professional UI and detailed metrics provide transparency and usability, making the tool practical for both casual and professional users.

**Future Work:**

* Integrate deep learning models (e.g., LSTM, BERT) for improved text understanding  
* Add user authentication and history tracking  
* Extend to detect misinformation across different languages and domains  
* Deploy the system to cloud platforms for public access  

---

## References

1. Shu, K., Sliva, A., Wang, S., Tang, J., & Liu, H. (2017). *Fake News Detection on Social Media: A Data Mining Perspective.* ACM SIGKDD Explorations Newsletter, 19(1), 22–36.  
2. Allcott, H., & Gentzkow, M. (2017). *Social Media and Fake News in the 2016 Election.* Journal of Economic Perspectives, 31(2), 211–236.  
3. Zhou, X., & Zafarani, R. (2018). *Fake News: A Survey of Research, Detection Methods, and Opportunities.* arXiv:1812.00315.  
