
import React, { useState, useEffect } from 'react';
import { getTodaysTip, getNextTip } from '@/utils/tipRotation';
import { Tip } from '@/types';

const TipOfTheDay: React.FC = () => {
  const [currentTip, setCurrentTip] = useState<Tip | null>(null);

  useEffect(() => {
    setCurrentTip(getTodaysTip());
  }, []);

  const handleNextTip = () => {
    if (currentTip) {
      const nextTip = getNextTip(currentTip.id);
      setCurrentTip(nextTip);
    }
  };

  if (!currentTip) {
    return null;
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-bold mb-4 flex items-center">
        <span className="text-2xl mr-2">💡</span> Tip of the Day
      </h3>
      <div className="mb-4">
        <h4 className="font-bold text-lg">{currentTip.title}</h4>
        <p className="text-gray-600 dark:text-gray-300">{currentTip.description}</p>
      </div>
      <div className="flex justify-between items-center">
        <button
          onClick={handleNextTip}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Show next tip
        </button>
        <a href="/tips" className="text-blue-500 hover:underline">
          All Tips
        </a>
      </div>
    </div>
  );
};

export default TipOfTheDay;
