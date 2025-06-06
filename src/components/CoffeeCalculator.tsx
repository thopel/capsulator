import React, { useEffect, useState } from "react";
import InputField from "./InputField";
import ResultDisplay from "./ResultDisplay";
import useLocalStorage from "../hooks/useLocalStorage";
import { CoffeeInputs, calculateCoffeeCost, calculateDetailedCosts } from "../utils/calculations";
import { CupSoda } from "lucide-react";

const CoffeeCalculator: React.FC = () => {
  const [inputs, setInputs] = useLocalStorage<CoffeeInputs>("coffee-calculator-inputs", {
    coffeeQuantity: "",
    coffeePrice: "",
    capsuleQuantity: "",
    capsulePrice: "",
  });

  const [coffeeCost, setCoffeeCost] = useState<number | null>(null);
  const [detailedCosts, setDetailedCosts] = useState<{ coffeeCost: number; capsuleCost: number } | null>(null);
  const [capsuleType, setCapsuleType] = useLocalStorage<0 | 1>("coffee-capsule-type", 0);

  const handleInputChange = (field: keyof CoffeeInputs, value: string) => {
    setInputs({
      ...inputs,
      [field]: value,
    });
  };

  // Calculate coffee cost whenever inputs change
  useEffect(() => {
    const details = calculateDetailedCosts(inputs, capsuleType);
    const cost = details ? details.coffeeCost + details.capsuleCost : null;

    setCoffeeCost(cost);
    setDetailedCosts(details);
  }, [inputs, capsuleType]);

  const getCoffeeUnitCost = (): number | null => {
    const qty = parseFloat(inputs.coffeeQuantity);
    const price = parseFloat(inputs.coffeePrice);
    if (isNaN(qty) || qty <= 0 || isNaN(price) || price < 0) return null;

    const coffeePerCapsule = capsuleType === 0 ? 200 / 30 : 200 / 40;
    return (price / qty) * coffeePerCapsule;
  };

  const getCapsuleUnitCost = (): number | null => {
    const qty = parseFloat(inputs.capsuleQuantity);
    const price = parseFloat(inputs.capsulePrice);
    if (isNaN(qty) || qty <= 0 || isNaN(price) || price < 0) return null;

    return price / qty;
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 max-w-md w-full transition-colors duration-300">
      <div className="w-full mb-6">
        <div
          className="relative w-full h-12 bg-gray-200 dark:bg-gray-800 rounded-full flex items-center cursor-pointer overflow-hidden"
          onClick={() => setCapsuleType(capsuleType === 0 ? 1 : 0)}
        >
          <div
            className={`absolute top-1 bottom-1 left-1 w-[calc(50%-0.25rem)] bg-white dark:bg-gray-700 rounded-full shadow-md transform transition-transform duration-300 ${
              capsuleType === 1 ? "translate-x-full" : ""
            }`}
          />

          <div className="relative z-10 flex w-full">
            <div className="w-1/2 flex justify-center items-center text-sm font-medium">
              <span className={`transition-colors ${capsuleType === 0 ? "text-black dark:text-white font-bold" : "text-gray-600 dark:text-gray-400"}`}>
                Dolce Gusto
              </span>
            </div>
            <div className="w-1/2 flex justify-center items-center text-sm font-medium">
              <span className={`transition-colors ${capsuleType === 1 ? "text-black dark:text-white font-bold" : "text-gray-600 dark:text-gray-400"}`}>
                Nespresso
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-5">
        <div>
          <h2 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-3">Café moulu</h2>
          <InputField
            label="Quantité de café achetée en grammes"
            value={inputs.coffeeQuantity}
            onChange={(value) => handleInputChange("coffeeQuantity", value)}
            suffix="g"
            placeholder="ex: 500"
          />
          <div className="space-y-1">
            <InputField
              label="Prix payé pour le café"
              value={inputs.coffeePrice}
              onChange={(value) => handleInputChange("coffeePrice", value)}
              suffix="€"
              placeholder="ex: 12.99"
            />
            {getCoffeeUnitCost() !== null && (
              <p className="text-sm text-gray-600 dark:text-gray-400 pl-1">soit {getCoffeeUnitCost()!.toFixed(2)} € de café par capsule</p>
            )}
          </div>
        </div>

        <div>
          <h2 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-3">Opercules</h2>
          <InputField
            label="Nombre d'opercules"
            value={inputs.capsuleQuantity}
            onChange={(value) => handleInputChange("capsuleQuantity", value)}
            placeholder="ex: 100"
          />
          <div className="space-y-1">
            <InputField
              label="Prix payé pour les opercules"
              value={inputs.capsulePrice}
              onChange={(value) => handleInputChange("capsulePrice", value)}
              suffix="€"
              placeholder="ex: 9.99"
            />
            {getCapsuleUnitCost() !== null && (
              <p className="text-sm text-gray-600 dark:text-gray-400 pl-1">soit {getCapsuleUnitCost()!.toFixed(2)} € l'opercule</p>
            )}
          </div>
        </div>

        <div className="pt-2">
          <ResultDisplay coffeeCost={coffeeCost} detailedCosts={detailedCosts} />
        </div>
      </div>

      <div className="mt-6 text-center text-xs text-gray-500 dark:text-gray-400">
        <p>Ratio utilisé : 200g de café = {capsuleType === 0 ? "30" : "40"} capsules</p>
      </div>
    </div>
  );
};

export default CoffeeCalculator;
