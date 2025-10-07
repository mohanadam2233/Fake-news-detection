// src/components/PredictionCard.jsx
import { CheckCircle, XCircle } from 'lucide-react';

const PredictionCard = ({ modelName, prediction }) => {
  const isReal = prediction.toLowerCase() === "true";
  const colorBg = isReal
    ? 'bg-gradient-to-r from-green-400 to-teal-400/50'
    : 'bg-gradient-to-r from-red-400 to-pink-500/50';
  const textColor = isReal ? 'text-green-400' : 'text-red-400';
  const Icon = isReal ? CheckCircle : XCircle;

  return (
    <div
      className={`p-4 rounded-2xl border-2 border-gray-700 shadow-lg hover:scale-[1.02] transition-all duration-300 ${colorBg}`}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">{modelName}</h3>
        <Icon className={`w-6 h-6 ${textColor} animate-pulse`} />
      </div>
      <p className={`mt-2 text-2xl font-bold ${textColor}`}>
        {prediction}
      </p>
    </div>
  );
};

export default PredictionCard;
