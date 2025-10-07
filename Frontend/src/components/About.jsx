import React from 'react';
import { Shield, Zap, Target } from 'lucide-react';

const About = () => (
  <section id="about" className="bg-gray-900 text-white py-16">
    <div className="max-w-7xl mx-auto px-4 md:px-10">
      <h2 className="text-3xl font-extrabold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-teal-400">
        About Fake News Sentinel
      </h2>
      <p className="text-center text-gray-300 max-w-3xl mx-auto mb-12">
        Fake News Sentinel is a professional multi-model platform to detect fake news quickly and accurately.
        Using a combination of Logistic Regression, Naive Bayes, and Random Forest models, we analyze news content
        and provide both individual model predictions and overall verdicts.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-6 bg-gray-800 rounded-2xl shadow-lg text-center">
          <Shield className="w-10 h-10 mx-auto text-green-400 mb-4" />
          <h3 className="font-bold text-xl mb-2">Reliable Accuracy</h3>
          <p className="text-gray-300">Models trained on large datasets to provide trustworthy predictions.</p>
        </div>
        <div className="p-6 bg-gray-800 rounded-2xl shadow-lg text-center">
          <Target className="w-10 h-10 mx-auto text-yellow-400 mb-4" />
          <h3 className="font-bold text-xl mb-2">High Precision</h3>
          <p className="text-gray-300">Minimizing false positives to ensure news classification is as precise as possible.</p>
        </div>
        <div className="p-6 bg-gray-800 rounded-2xl shadow-lg text-center">
          <Zap className="w-10 h-10 mx-auto text-blue-400 mb-4" />
          <h3 className="font-bold text-xl mb-2">Fast Analysis</h3>
          <p className="text-gray-300">Get instant predictions for any news article, directly in your browser.</p>
        </div>
      </div>
    </div>
  </section>
);

export default About;
