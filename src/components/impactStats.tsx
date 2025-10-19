"use client";

import React from 'react';
import { IMPACT_STATS, INSPIRATIONAL_TAGLINE, ImpactStat } from '../constants/impactStats';
import useCountUp from '../hooks/useCountUp'; 

const StatCard: React.FC<{ stat: ImpactStat }> = ({ stat }) => {
  const duration = stat.value > 1000 ? 2500 : 2000;
  
  const animatedValue = useCountUp(stat.value, duration, 0); 

  let displayContent: string;
  let unit: string = '';
  let isFinal: boolean = animatedValue >= stat.value * 0.99;

  if (stat.id === 2) {
    displayContent = animatedValue.toFixed(1);
    unit = ' tons';
  } else {
    const roundedValue = Math.round(animatedValue);
    displayContent = roundedValue.toLocaleString();

    if (stat.display.includes('+') && isFinal) {
        displayContent += '+';
    }
  }

  const finalDisplay = `${displayContent}${unit}`;

  return (
    <div 
      className="stat-card bg-green-50 shadow-lg rounded-2xl p-6 w-full max-w-xs text-center transform hover:scale-[1.05] transition duration-300 border-t-4 border-green-500"
    >
      <p 
        className="stat-value text-6xl font-extrabold text-green-700 mb-2"
      >
        {finalDisplay}
      </p>
      <p 
        className="stat-label text-base font-medium text-gray-700"
      >
        {stat.suffix}
      </p>
    </div>
  );
};

const ImpactStats: React.FC = () => {
  return (
    <section 
      className="py-16 px-4 bg-white rounded-xl shadow-md my-8"
    >
      <h2 
        className="text-center text-3xl md:text-4xl font-bold mb-12 text-gray-800" 
      >
        <span className="text-green-600">🌱 </span> 
        {INSPIRATIONAL_TAGLINE}
      </h2>

      <div 
        className="flex justify-center flex-wrap gap-8"
      >
        {IMPACT_STATS.map(stat => (
          <StatCard key={stat.id} stat={stat} />
        ))}
      </div>
    </section>
  );
};

export default ImpactStats;