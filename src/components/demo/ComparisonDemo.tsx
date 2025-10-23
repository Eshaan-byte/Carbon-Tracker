"use client";

import { useState } from "react";
import ComparisonSection from "@/components/dashboard/ComparisonSection";
import { DashboardData } from "@/types";

// Mock dashboard data for demonstration
const mockDashboardData: DashboardData = {
  todayFootprint: 280, // Below target (good performance)
  weeklyFootprint: 2100, // Below average (decent performance)
  monthlyFootprint: 11000, // Above average (needs improvement)
  weeklyBreakdown: {
    emails: 50,
    streaming: 150,
    coding: 100,
    video_calls: 80,
    cloud_storage: 20,
    gaming: 30,
    social_media: 10,
    music_streaming: 30,
  },
  trend: [
    { date: "Mon", co2: 320 },
    { date: "Tue", co2: 280 },
    { date: "Wed", co2: 250 },
    { date: "Thu", co2: 300 },
    { date: "Fri", co2: 280 },
    { date: "Sat", co2: 200 },
    { date: "Sun", co2: 180 },
  ],
  equivalents: [
    { description: "Equivalent to driving 2.1 km", value: 2.1, unit: "km" },
    { description: "Same as charging 35 smartphones", value: 35, unit: "phones" },
  ],
};

// Alternative mock data showing different performance levels
const mockDataSets = {
  excellent: {
    ...mockDashboardData,
    todayFootprint: 200, // Well below target
    weeklyFootprint: 1400, // Well below average
    monthlyFootprint: 6000, // Well below average
  },
  good: {
    ...mockDashboardData,
    todayFootprint: 280, // Below target
    weeklyFootprint: 2100, // Below average
    monthlyFootprint: 9000, // Slightly below average
  },
  needsImprovement: {
    ...mockDashboardData,
    todayFootprint: 450, // Above average
    weeklyFootprint: 3200, // Above average
    monthlyFootprint: 14000, // Well above average
  },
};

export default function ComparisonDemo() {
  const [selectedDataSet, setSelectedDataSet] = useState<keyof typeof mockDataSets>("good");

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Demo Controls */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4 text-center">
            🌍 Carbon Footprint Comparison Demo
          </h1>
          <p className="text-gray-600 text-center mb-6">
            Try different performance scenarios to see how the comparison feature works
          </p>
          
          <div className="flex justify-center space-x-4">
            {Object.entries(mockDataSets).map(([key, data]) => (
              <button
                key={key}
                onClick={() => setSelectedDataSet(key as keyof typeof mockDataSets)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  selectedDataSet === key
                    ? "bg-green-600 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {key === "excellent" && "🌟 Excellent"}
                {key === "good" && "👍 Good"}
                {key === "needsImprovement" && "⚠️ Needs Work"}
              </button>
            ))}
          </div>
        </div>

        {/* Comparison Section */}
        <ComparisonSection dashboardData={mockDataSets[selectedDataSet]} />

        {/* Feature Explanation */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">
            ✨ Feature Highlights
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl mb-3">📊</div>
              <h3 className="font-semibold text-gray-900 mb-2">Visual Comparison</h3>
              <p className="text-sm text-gray-600">
                Clear bar chart showing your footprint vs global average vs target goal
              </p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-3">🔄</div>
              <h3 className="font-semibold text-gray-900 mb-2">Multiple Periods</h3>
              <p className="text-sm text-gray-600">
                Switch between daily, weekly, and monthly comparisons
              </p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-3">💡</div>
              <h3 className="font-semibold text-gray-900 mb-2">Smart Tips</h3>
              <p className="text-sm text-gray-600">
                Personalized recommendations based on your performance
              </p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-3">🎯</div>
              <h3 className="font-semibold text-gray-900 mb-2">Target Goals</h3>
              <p className="text-sm text-gray-600">
                Science-based targets (20% reduction from global average)
              </p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-3">📈</div>
              <h3 className="font-semibold text-gray-900 mb-2">Performance Tracking</h3>
              <p className="text-sm text-gray-600">
                See percentage differences and potential savings
              </p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-3">🌱</div>
              <h3 className="font-semibold text-gray-900 mb-2">Educational Context</h3>
              <p className="text-sm text-gray-600">
                Learn why comparisons matter for climate action
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}