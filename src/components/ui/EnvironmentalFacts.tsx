"use client";

import { useMemo, useState } from "react";
import { ENVIRONMENTAL_FACTS } from "@/constants/environmentalFacts";

export default function EnvironmentalFacts() {
  const [index, setIndex] = useState<number>(() => {
    return Math.floor(Math.random() * ENVIRONMENTAL_FACTS.length);
  });

  const fact = useMemo(() => ENVIRONMENTAL_FACTS[index], [index]);

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % ENVIRONMENTAL_FACTS.length);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 relative overflow-hidden">
      <div className="absolute inset-0 eco-gradient-bg opacity-10" />
      <div className="relative">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">💡</span>
            <h3 className="text-xl font-bold text-gray-900">Did You Know?</h3>
          </div>
          <span className="text-2xl" aria-hidden>{fact.icon}</span>
        </div>

        <p className="text-gray-700 leading-relaxed">
          {fact.fact}
        </p>

        <div className="mt-6 flex justify-end">
          <button
            onClick={handleNext}
            className="btn-eco"
            aria-label="Show next environmental fact"
          >
            Next Fact →
          </button>
        </div>
      </div>
    </div>
  );
}


