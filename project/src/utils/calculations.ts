export interface CoffeeInputs {
  coffeeQuantity: string;
  coffeePrice: string;
  capsuleQuantity: string;
  capsulePrice: string;
}

export const calculateDetailedCosts = (inputs: CoffeeInputs): { coffeeCost: number; capsuleCost: number } | null => {
  const { coffeeQuantity, coffeePrice, capsuleQuantity, capsulePrice } = inputs;
  
  // Convert inputs to numbers
  const coffeeQty = parseFloat(coffeeQuantity);
  const coffeePrc = parseFloat(coffeePrice);
  const capsuleQty = parseFloat(capsuleQuantity);
  const capsulePrc = parseFloat(capsulePrice);
  
  // Validate inputs - only quantities must be positive, prices can be 0
  if (
    isNaN(coffeeQty) || coffeeQty <= 0 ||
    isNaN(coffeePrc) || coffeePrc < 0 ||
    isNaN(capsuleQty) || capsuleQty <= 0 ||
    isNaN(capsulePrc) || capsulePrc < 0
  ) {
    return null;
  }
  
  // Fixed ratio: 200g of coffee = 42 capsules
  const coffeePerCapsule = 200 / 42;
  
  // Calculate costs per capsule
  const coffeeUnitCost = (coffeePrc / coffeeQty) * coffeePerCapsule;
  const capsuleUnitCost = capsulePrc / capsuleQty;
  
  return {
    coffeeCost: coffeeUnitCost,
    capsuleCost: capsuleUnitCost
  };
};

export const calculateCoffeeCost = (inputs: CoffeeInputs): number | null => {
  const costs = calculateDetailedCosts(inputs);
  if (!costs) return null;
  return costs.coffeeCost + costs.capsuleCost;
};