// src/components/ResultPanel.jsx
import { useEffect, useState } from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

const ResultPanel = ({ predictions, metrics, selectedModel }) => {
  const [animatedMetrics, setAnimatedMetrics] = useState({});

  useEffect(() => {
    if (metrics) {
      const newAnimated = {};
      Object.entries(metrics).forEach(([model, metricValues]) => {
        newAnimated[model] = {};
        Object.entries(metricValues).forEach(([metric, value]) => {
          newAnimated[model][metric] = 0;
          setTimeout(() => {
            setAnimatedMetrics((prev) => ({
              ...prev,
              [model]: { ...prev[model], [metric]: value }
            }));
          }, 100);
        });
      });
    }
  }, [metrics]);

  if (!predictions) {
    return (
      <div className="p-8 bg-gray-800 rounded-2xl shadow-lg h-full flex flex-col justify-center items-center">
        <p className="text-gray-400">Enter a news article and click 'Analyze' to see predictions.</p>
      </div>
    );
  }

  const modelKeys = selectedModel === "All" ? Object.keys(predictions) : [selectedModel];
  const showOverall = selectedModel === "All";

  const fakeCount = Object.values(predictions)
    .map((v) => v.split(" ")[0])
    .filter((v) => v === "Fake").length;
  const overallText = fakeCount >= 2 ? 'Potentially Fake' : 'Likely Real';
  const overallColor = fakeCount >= 2 ? 'text-red-400' : 'text-green-400';

  return (
    <div className="w-full">
      {showOverall && (
        <div className="p-8 rounded-2xl shadow-lg flex flex-col items-center justify-center bg-gray-800 mb-6 w-full">
          <h2 className="text-3xl font-extrabold mt-6">Predict</h2>
          <p className={`text-5xl font-extrabold mt-2 ${overallColor}`}>{overallText}</p>
          <p className="mt-4 text-gray-400 text-center">Based on consensus of all models</p>
        </div>
      )}

      <div className="bg-gray-800 p-6 rounded-2xl shadow-lg w-full">
        <h3 className="text-xl font-bold mb-4 border-b border-gray-700 pb-2">Individual Model Predictions</h3>
        <div className="space-y-4 mb-6">
          {modelKeys.map((model) => {
            const predText = predictions[model].split(" ")[0];
            const isTrue = predText === "True";
            const colorClass = isTrue
              ? 'bg-green-600/20 text-green-400 border-green-400'
              : 'bg-red-600/20 text-red-400 border-red-400';
            const Icon = isTrue ? CheckCircle : XCircle;

            return (
              <div key={model} className={`p-4 rounded-xl border-2 flex items-center justify-between ${colorClass}`}>
                <div>
                  <h4 className="text-lg font-semibold">{model}</h4>
                  <p className="text-2xl font-bold">{predText}</p>
                </div>
                <Icon className="w-8 h-8" />
              </div>
            );
          })}
        </div>

        <h3 className="text-xl font-bold mb-4 border-b border-gray-700 pb-2">Model Metrics</h3>
        <div className="space-y-4">
          {metrics && Object.entries(metrics).map(([model, metricValues]) => {
            if (selectedModel !== "All" && selectedModel !== model) return null;

            return (
              <div key={model} className="p-4 bg-gray-700 rounded-lg">
                <h4 className="text-lg font-semibold mb-2">{model}</h4>
                {Object.entries(metricValues).map(([metric, value]) => {
                  const color = metric === 'accuracy' ? 'bg-green-400'
                              : metric === 'precision' ? 'bg-yellow-400'
                              : 'bg-blue-400';
                  return (
                    <div key={metric} className="mb-2">
                      <div className="flex justify-between text-sm mb-1">
                        <span>{metric.charAt(0).toUpperCase() + metric.slice(1)}</span>
                        <span>{animatedMetrics[model]?.[metric] || 0}%</span>
                      </div>
                      <div className="w-full bg-gray-600 rounded-full h-2 overflow-hidden">
                        <div
                          className={`h-2 rounded-full ${color} transition-all duration-1000`}
                          style={{ width: `${animatedMetrics[model]?.[metric] || 0}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ResultPanel;
