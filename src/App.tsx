import React, { useEffect, useState } from "react";
import CoffeeCalculator from "./components/CoffeeCalculator";
import { Coffee } from "lucide-react";

function App() {
  const [mounted, setMounted] = useState(false);

  // Ensure hydration before rendering to avoid theme flicker
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-amber-50 dark:bg-gray-950 flex flex-col items-center transition-colors duration-300">
      <main className="flex-1 w-full max-w-7xl px-4 py-8 flex flex-col items-center justify-center">
        <div className="w-full max-w-md mb-8 text-center">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Calculez le coût de votre café</h2>
          <p className="text-gray-600 dark:text-gray-400">Découvrez combien vous coûte chaque tasse de café préparée avec votre équipement Caps Me</p>
        </div>

        <CoffeeCalculator />
      </main>

      <footer className="w-full py-4 text-center text-gray-600 dark:text-gray-400 text-sm">
        <p>
          Capsulator •{" Créé par "}
          <a
            href="https://thomaspelfrene.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
          >
            Thomas Pelfrene
          </a>
          {" • Adapté pour "}
          <a href="https://capsme.fr" target="_blank" rel="noopener noreferrer" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
            Caps Me
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;
