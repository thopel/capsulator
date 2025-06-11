export interface CoffeeInputs {
  coffeeQuantity: string;
  coffeePrice: string;
  capsuleQuantity: string;
  capsulePrice: string;
}

/**
 * Calcule les coûts détaillés par capsule :
 * - café utilisé (en €)
 * - opercule (en €)
 * en fonction du type de capsule (0 = Dolce Gusto, 1 = Nespresso)
 */
export const calculateDetailedCosts = (inputs: CoffeeInputs, capsuleType: 0 | 1): { coffeeCost: number; capsuleCost: number } | null => {
  const { coffeeQuantity, coffeePrice, capsuleQuantity, capsulePrice } = inputs;

  // Conversion en nombres
  const coffeeQty = parseFloat(coffeeQuantity);
  const coffeePrc = parseFloat(coffeePrice);
  const capsuleQty = parseFloat(capsuleQuantity);
  const capsulePrc = parseFloat(capsulePrice);

  // Validation : quantités > 0, prix >= 0
  if (isNaN(coffeeQty) || coffeeQty <= 0 || isNaN(coffeePrc) || coffeePrc < 0 || isNaN(capsuleQty) || capsuleQty <= 0 || isNaN(capsulePrc) || capsulePrc < 0) {
    return null;
  }

  // Ratio en fonction du type de capsule
  // 0 = Dolce Gusto → 20 capsules avec 200g
  // 1 = Nespresso → 40 capsules avec 200g
  const coffeePerCapsule = capsuleType === 0 ? 200 / 20 : 200 / 40;

  // Coût du café par capsule
  const coffeeUnitCost = (coffeePrc / coffeeQty) * coffeePerCapsule;

  // Coût de l'opercule
  const capsuleUnitCost = capsulePrc / capsuleQty;

  return {
    coffeeCost: coffeeUnitCost,
    capsuleCost: capsuleUnitCost,
  };
};

/**
 * Calcule le coût total d'une capsule (café + opercule)
 */
export const calculateCoffeeCost = (inputs: CoffeeInputs, capsuleType: 0 | 1): number | null => {
  const costs = calculateDetailedCosts(inputs, capsuleType);
  if (!costs) return null;
  return costs.coffeeCost + costs.capsuleCost;
};
