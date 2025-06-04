import React from "react";
import { Coffee } from "lucide-react";

interface ResultDisplayProps {
  coffeeCost: number | null;
  detailedCosts: {
    coffeeCost: number;
    capsuleCost: number;
  } | null;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ coffeeCost }) => {
  return (
    <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800 transition-all duration-300">
      <div className="flex items-center mb-2">
        <Coffee className="w-5 h-5 mr-2 text-amber-600 dark:text-amber-400" />
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Résultat</h2>
      </div>
      <div className="text-center py-3">
        <p className="text-gray-700 dark:text-gray-300 mb-2">Votre café vous coûte :</p>
        <p className="text-3xl font-bold text-amber-600 dark:text-amber-400 transition-all duration-300 mb-4">
          {coffeeCost !== null ? `${coffeeCost.toFixed(2)} €` : "-- €"}
        </p>
      </div>
    </div>
  );
};

export default ResultDisplay;
