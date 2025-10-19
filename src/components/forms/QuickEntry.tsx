'use client';

import { useState } from 'react';
import { ActivityType } from '@/types';
import { CO2_FACTORS, ACTIVITY_LABELS, ACTIVITY_EMOJIS } from '@/constants/co2Factors';

interface QuickEntryProps {
  onQuickAdd: (activity: ActivityType, value: number) => void;
}

const quickActions = [
  { type: 'emails' as ActivityType, values: [1, 5, 10, 25], unit: 'emails', icon: ACTIVITY_EMOJIS.emails },
  { type: 'streaming' as ActivityType, values: [0.5, 1, 2, 4], unit: 'hours', icon: ACTIVITY_EMOJIS.streaming },
  { type: 'video_calls' as ActivityType, values: [0.5, 1, 2, 3], unit: 'hours', icon: ACTIVITY_EMOJIS.video_calls },
  { type: 'gaming' as ActivityType, values: [0.5, 1, 2, 4], unit: 'hours', icon: ACTIVITY_EMOJIS.gaming },
];

export default function QuickEntry({ onQuickAdd }: QuickEntryProps) {
  const [recentActions, setRecentActions] = useState<Array<{ type: ActivityType; value: number; timestamp: Date }>>([]);

  const handleQuickAdd = (activity: ActivityType, value: number) => {
    onQuickAdd(activity, value);
    setRecentActions(prev => [
      { type: activity, value, timestamp: new Date() },
      ...prev.slice(0, 4) // Keep only last 5 actions
    ]);
  };

  const calculateCO2 = (activity: ActivityType, value: number) => {
    return (value * CO2_FACTORS[activity]).toFixed(1);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-900">Quick Entry</h3>
        <span className="text-sm text-gray-500">Add common activities instantly</span>
      </div>

      <div className="space-y-6">
        {quickActions.map(({ type, values, unit, icon }) => (
          <div key={type} className="border-b border-gray-100 pb-4 last:border-b-0">
            <div className="flex items-center space-x-2 mb-3">
              <span className="text-xl">{icon}</span>
              <h4 className="font-medium text-gray-800">{ACTIVITY_LABELS[type]}</h4>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {values.map(value => (
                <button
                  key={value}
                  onClick={() => handleQuickAdd(type, value)}
                  className="flex flex-col items-center p-3 border border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-colors group"
                >
                  <span className="font-medium text-gray-900 group-hover:text-green-700">
                    {value} {unit}
                  </span>
                  <span className="text-xs text-gray-500 group-hover:text-green-600">
                    {calculateCO2(type, value)}g CO₂
                  </span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {recentActions.length > 0 && (
        <div className="mt-6 pt-6 border-t border-gray-100">
          <h4 className="text-sm font-medium text-gray-700 mb-3">Recent Additions</h4>
          <div className="space-y-2">
            {recentActions.map((action, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <span className="text-gray-600">
                  {action.value} {ACTIVITY_LABELS[action.type].toLowerCase()}
                </span>
                <span className="font-medium text-green-600">
                  +{calculateCO2(action.type, action.value)}g CO₂
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}