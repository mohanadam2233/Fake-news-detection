// src/App.jsx
import React, { useState } from 'react';
import { Loader, Send, AlertTriangle } from 'lucide-react';
import ResultPanel from './components/ResultPanel';
import Header from './components/Header';
import Footer from './components/Footer';
import About from './components/About';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function App() {
  const [newsText, setNewsText] = useState('');
  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedModel, setSelectedModel] = useState('All');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newsText.trim()) {
      setError("Please enter a news article to analyze.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setResults(null);

    try {
      const response = await fetch(`${API_BASE_URL}/predict`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: newsText }),
      });

      if (!response.ok) throw new Error(`API Error: ${response.statusText}`);

      const data = await response.json();
      setResults(data); // contains predictions + metrics
    } catch (err) {
      console.error(err);
      setError("Failed to connect to the API. Check console for details.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto px-4 md:px-10 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT: Input */}
        <div className="lg:col-span-1 bg-gray-800 p-6 rounded-2xl shadow-xl border border-gray-700 h-fit sticky top-10">
          <h2 className="text-2xl font-bold mb-4 border-b border-gray-700 pb-2">Article Analyzer</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <textarea
              rows="10"
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-green-400 focus:border-green-400"
              placeholder="Paste the news article text here..."
              value={newsText}
              onChange={(e) => setNewsText(e.target.value)}
            />

            <select
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg"
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
            >
              <option>All</option>
              <option>LogisticRegression</option>
              <option>NaiveBayes</option>
              <option>RandomForest</option>
            </select>

            {error && (
              <div className="flex items-center p-3 text-sm text-red-500 bg-red-500/10 rounded-lg">
                <AlertTriangle className="w-5 h-5 mr-2" /> {error}
              </div>
            )}

            <button
              type="submit"
              className={`w-full flex justify-center items-center py-3 px-4 rounded-lg font-bold text-white shadow-lg transition-all duration-300 
                ${isLoading ? 'bg-gray-500 cursor-not-allowed' : 'bg-gradient-to-r from-green-400 to-teal-400 hover:scale-[1.02]'}`}
              disabled={isLoading}
            >
              {isLoading ? <Loader className="w-5 h-5 mr-2 animate-spin" /> : <Send className="w-4 h-4 mr-2" />}
              {isLoading ? "Analyzing..." : "Analyze Article"}
            </button>
          </form>
        </div>

        {/* RIGHT: Results */}
        <div className="lg:col-span-2">
          <ResultPanel predictions={results?.predictions} metrics={results?.metrics} selectedModel={selectedModel} />
        </div>
      </main>

      <About />
      <Footer />
    </div>
  );
}

export default App;
