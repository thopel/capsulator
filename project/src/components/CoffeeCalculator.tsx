import React, { useEffect, useState } from 'react';
import InputField from './InputField';
import ResultDisplay from './ResultDisplay';
import useLocalStorage from '../hooks/useLocalStorage';
import { CoffeeInputs, calculateCoffeeCost, calculateDetailedCosts } from '../utils/calculations';
import { CupSoda } from 'lucide-react';

const CoffeeCalculator: React.FC = () => {
  const [inputs, setInputs] = useLocalStorage<CoffeeInputs>('coffee-calculator-inputs', {
    coffeeQuantity: '',
    coffeePrice: '',
    capsuleQuantity: '',
    capsulePrice: '',
  });

  const [coffeeCost, setCoffeeCost] = useState<number | null>(null);
  const [detailedCosts, setDetailedCosts] = useState<{ coffeeCost: number; capsuleCost: number } | null>(null);

  const handleInputChange = (field: keyof CoffeeInputs, value: string) => {
    setInputs({
      ...inputs,
      [field]: value,
    });
  };

  // Calculate coffee cost whenever inputs change
  useEffect(() => {
    const cost = calculateCoffeeCost(inputs);
    const details = calculateDetailedCosts(inputs);
    setCoffeeCost(cost);
    setDetailedCosts(details);
  }, [inputs]);

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 max-w-md w-full transition-colors duration-300">

      <div className="space-y-5">
        <div>
          <h2 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-3">Café moulu</h2>
          <InputField
            label="Quantité de café achetée en grammes"
            value={inputs.coffeeQuantity}
            onChange={(value) => handleInputChange('coffeeQuantity', value)}
            suffix="g"
            placeholder="ex: 500"
          />
          <div className="space-y-1">
            <InputField
              label="Prix payé pour le café"
              value={inputs.coffeePrice}
              onChange={(value) => handleInputChange('coffeePrice', value)}
              suffix="€"
              placeholder="ex: 12.99"
            />
            {detailedCosts && (
              <p className="text-sm text-gray-600 dark:text-gray-400 pl-1">
                soit {detailedCosts.coffeeCost.toFixed(2)} € de café par capsule
              </p>
            )}
          </div>
        </div>

        <div>
          <h2 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-3">Opercules</h2>
          <InputField
            label="Nombre d'opercules"
            value={inputs.capsuleQuantity}
            onChange={(value) => handleInputChange('capsuleQuantity', value)}
            placeholder="ex: 100"
          />
          <div className="space-y-1">
            <InputField
              label="Prix payé pour les opercules"
              value={inputs.capsulePrice}
              onChange={(value) => handleInputChange('capsulePrice', value)}
              suffix="€"
              placeholder="ex: 9.99"
            />
            {detailedCosts && (
              <p className="text-sm text-gray-600 dark:text-gray-400 pl-1">
                soit {detailedCosts.capsuleCost.toFixed(2)} € l'opercule
              </p>
            )}
          </div>
        </div>

        <div className="pt-2">
          <ResultDisplay coffeeCost={coffeeCost} detailedCosts={detailedCosts} />
        </div>
      </div>

      <div className="mt-6 text-center text-xs text-gray-500 dark:text-gray-400">
        <p>Ratio utilisé : 200g de café = 42 opercules</p>
      </div>
    </div>
  );
};

export default CoffeeCalculator;