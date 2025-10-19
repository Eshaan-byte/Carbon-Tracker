"use client";

import { useState } from "react";
import { ActivityInput } from "@/types";
import { calculateCarbonFootprint } from "@/lib/calculations/carbonFootprint";
import {
  QUICK_ACTIONS,
  QuickAction,
  defaultActivities,
} from "@/constants/quickActions";

// Define the props this component expects
interface QuickActionsFABProps {
  // We'll receive the master submit handler from AppLayout
  onSubmit: (
    activities: ActivityInput,
    result: any,
    customToastMessage?: string
  ) => void;
}

export default function QuickActionsFAB({ onSubmit }: QuickActionsFABProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleQuickAdd = (action: QuickAction) => {
    // 1. Create the full ActivityInput object by merging the preset with the default
    const activities: ActivityInput = {
      ...defaultActivities,
      ...action.activities,
    };

    // 2. Use the existing calculation logic
    const result = calculateCarbonFootprint(activities);

    // 3. Call the master submit function from AppLayout
    // We pass the activities, the calculated result, and the specific toast message
    onSubmit(activities, result, action.toastMessage);

    // 4. Close the menu
    setIsExpanded(false);
  };

  return (
    <div className="fixed bottom-20 right-4 z-40 flex flex-col items-end">
      {/* Expanded Menu: Shows when isExpanded is true */}
      <div
        className={`flex flex-col items-end space-y-2 mb-2 transition-all duration-300 ease-in-out ${
          isExpanded
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        {QUICK_ACTIONS.map((action) => (
          <button
            key={action.id}
            onClick={() => handleQuickAdd(action)}
            className="flex items-center bg-white py-2 px-4 rounded-lg shadow-lg hover:bg-gray-100 transition-all transform hover:scale-105"
            aria-label={action.label}
          >
            <span className="text-sm font-medium text-gray-800">
              {action.label}
            </span>
            <span className="ml-3 text-xl" role="img" aria-hidden="true">
              {action.icon}
            </span>
          </button>
        ))}
      </div>

      {/* Main FAB Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-14 h-14 bg-green-600 text-white rounded-full flex items-center justify-center shadow-xl hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-all duration-200 transform hover:scale-105"
        aria-label={isExpanded ? "Close quick actions" : "Open quick actions"}
        aria-expanded={isExpanded}
      >
        {/* Animated Plus/Close Icon */}
        <svg
          className="w-6 h-6 transition-transform duration-300"
          style={{ transform: isExpanded ? "rotate(45deg)" : "rotate(0)" }}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={3}
            d="M12 6v12M6 12h12"
          ></path>
        </svg>
      </button>
    </div>
  );
}