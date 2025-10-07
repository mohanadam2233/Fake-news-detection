# Fake News Detector — Frontend (React + Vite + Tailwind)

This is a modern frontend interface for a Fake News Detection backend. It uses React + Vite + Tailwind CSS and connects to a Flask API that runs your machine learning models (Naive Bayes, Logistic Regression, Random Forest).

## Features
- Sign Up / Sign In screens (simple auth using your backend)
- Paste or type text and call `/predict`
- Displays each model's result with clear icons and UI
- Responsive layout and modern styling
- `.env` for API base URL

## Prerequisites
- Node.js 16+ and npm
- A running Flask backend API (example: `http://127.0.0.1:8000`)

## Setup

1. Clone or copy the project:
```bash
git clone <your-repo> fake-news-frontend
cd fake-news-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` from the example:
```bash
cp .env.example .env
# Edit .env and set VITE_API_URL to your Flask backend URL
```

4. Start the dev server:
```bash
npm run dev
```

Open `http://localhost:5173` (or the address shown in terminal).

## Environment / API mapping

- `VITE_API_URL` — base URL for your Flask API. Example: `http://127.0.0.1:8000`.

The frontend expects these endpoints (adjust `src/services/api.js` if your backend uses different paths):

- `POST /auth/register` — create a user (body: `{ name, email, password }`)
- `POST /auth/login` — login (body: `{ email, password }`) → returns `{ token, user }` (token stored in localStorage)
- `POST /predict` — returns model predictions e.g.
```json
{
  "predictions": {
    "NaiveBayes": "Fake (0.83)",
    "LogisticRegression": "Real (0.43)",
    "RandomForest": "Fake (0.91)"
  },
  "text": "..."
}
```

If your backend returns different property names, update `src/services/api.js` and the `Dashboard.jsx` mapping accordingly.

## Notes & suggestions
- For production, replace localStorage auth with secure HTTP-only cookies or other secure auth pattern.
- Add rate-limiting and input sanitization both on client and backend.
- Improve confidence display by returning standardized scores (0-1) from backend.
- Consider adding charts or voting consensus to show model agreement.

## Deploy
- Build: `npm run build`
- Serve `dist/` using any static file server or serve via your backend if desired.
