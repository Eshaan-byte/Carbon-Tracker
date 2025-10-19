'use client';

import { useState, useEffect } from 'react';
import { WeeklyGoal } from '@/types';
import { formatCO2Amount } from '@/lib/calculations/carbonFootprint';

interface GoalsPanelProps {
  currentGoal?: WeeklyGoal;
  currentWeekCO2: number;
  lastWeekCO2: number;
  onSetGoal: (targetReduction: number) => Promise<void>;
  className?: string;
}

interface GoalCardProps {
  title: string;
  description: string;
  targetReduction: number;
  difficulty: 'easy' | 'medium' | 'hard';
  icon: string;
  isSelected: boolean;
  onClick: () => void;
}

function GoalCard({ title, description, targetReduction, difficulty, icon, isSelected, onClick }: GoalCardProps) {
  const difficultyColors = {
    easy: 'border-green-300 bg-green-50',
    medium: 'border-yellow-300 bg-yellow-50',
    hard: 'border-red-300 bg-red-50',
  };

  const selectedStyle = 'border-blue-500 bg-blue-50 ring-2 ring-blue-200';

  return (
    <div
      onClick={onClick}
      className={`p-4 rounded-lg border-2 cursor-pointer transition-all hover:shadow-md ${
        isSelected ? selectedStyle : difficultyColors[difficulty]
      }`}
    >
      <div className="flex items-center space-x-3 mb-2">
        <span className="text-2xl">{icon}</span>
        <div>
          <h3 className="font-semibold text-gray-900">{title}</h3>
          <span className={`text-xs px-2 py-1 rounded-full ${
            difficulty === 'easy' ? 'bg-green-200 text-green-800' :
            difficulty === 'medium' ? 'bg-yellow-200 text-yellow-800' :
            'bg-red-200 text-red-800'
          }`}>
            {difficulty.toUpperCase()}
          </span>
        </div>
      </div>
      <p className="text-sm text-gray-600 mb-2">{description}</p>
      <div className="text-lg font-bold text-gray-900">
        {targetReduction}% reduction
      </div>
    </div>
  );
}

export default function GoalsPanel({ currentGoal, currentWeekCO2, lastWeekCO2, onSetGoal, className = '' }: GoalsPanelProps) {
  const [selectedGoal, setSelectedGoal] = useState<number | null>(null);
  const [customGoal, setCustomGoal] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const predefinedGoals = [
    {
      title: 'Eco Starter',
      description: 'Perfect for beginners looking to make their first impact',
      targetReduction: 10,
      difficulty: 'easy' as const,
      icon: '🌱',
    },
    {
      title: 'Green Guardian',
      description: 'Take a meaningful step towards sustainability',
      targetReduction: 25,
      difficulty: 'medium' as const,
      icon: '🌿',
    },
    {
      title: 'Climate Champion',
      description: 'Ambitious goal for serious environmental advocates',
      targetReduction: 50,
      difficulty: 'hard' as const,
      icon: '🏆',
    },
  ];

  // Calculate current progress
  const currentProgress = currentGoal && lastWeekCO2 > 0 
    ? Math.max(0, ((lastWeekCO2 - currentWeekCO2) / lastWeekCO2) * 100)
    : 0;

  const isGoalAchieved = currentGoal && currentProgress >= currentGoal.targetReduction;

  const handleSetGoal = async () => {
    const targetReduction = selectedGoal || parseInt(customGoal);
    if (!targetReduction || targetReduction <= 0 || targetReduction > 100) return;

    setIsLoading(true);
    try {
      await onSetGoal(targetReduction);
      setSelectedGoal(null);
      setCustomGoal('');
    } catch (error) {
      console.error('Failed to set goal:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getMotivationalMessage = () => {
    if (!currentGoal) return "Set your first weekly goal to start your journey!";
    
    if (isGoalAchieved) {
      return "🎉 Congratulations! You've achieved your weekly goal!";
    } else if (currentProgress >= currentGoal.targetReduction * 0.75) {
      return "🔥 You're so close! Keep pushing towards your goal!";
    } else if (currentProgress >= currentGoal.targetReduction * 0.5) {
      return "💪 Great progress! You're halfway to your goal!";
    } else if (currentProgress > 0) {
      return "🌱 Good start! Every step counts towards your goal!";
    } else {
      return "⚡ It's time to take action! You can do this!";
    }
  };

  return (
    <div className={`bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl p-6 ${className}`}>
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">🎯 Weekly Goals</h2>
        <p className="text-gray-600">{getMotivationalMessage()}</p>
      </div>

      {/* Current Goal Progress */}
      {currentGoal && (
        <div className="bg-white rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-900">Current Goal Progress</h3>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              isGoalAchieved ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
            }`}>
              {currentGoal.targetReduction}% target
            </span>
          </div>
          
          {/* Progress Bar */}
          <div className="mb-3">
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>Progress</span>
              <span>{currentProgress.toFixed(1)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className={`h-3 rounded-full transition-all duration-500 ${
                  isGoalAchieved ? 'bg-green-500' : 'bg-blue-500'
                }`}
                style={{ width: `${Math.min(100, (currentProgress / currentGoal.targetReduction) * 100)}%` }}
              ></div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-lg font-bold text-gray-900">
                {formatCO2Amount(lastWeekCO2)}
              </div>
              <div className="text-sm text-gray-600">Last Week</div>
            </div>
            <div>
              <div className="text-lg font-bold text-gray-900">
                {formatCO2Amount(currentWeekCO2)}
              </div>
              <div className="text-sm text-gray-600">This Week</div>
            </div>
          </div>

          {isGoalAchieved && (
            <div className="mt-4 text-center">
              <div className="inline-flex items-center space-x-2 bg-green-100 text-green-700 px-4 py-2 rounded-full">
                <span>🏆</span>
                <span className="font-medium">Goal Achieved!</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Goal Selection */}
      <div className="space-y-4">
        <h3 className="font-semibold text-gray-900">
          {currentGoal ? 'Set New Weekly Goal' : 'Choose Your Weekly Goal'}
        </h3>
        
        {/* Predefined Goals */}
        <div className="grid md:grid-cols-3 gap-3">
          {predefinedGoals.map(goal => (
            <GoalCard
              key={goal.targetReduction}
              {...goal}
              isSelected={selectedGoal === goal.targetReduction}
              onClick={() => {
                setSelectedGoal(goal.targetReduction);
                setCustomGoal('');
              }}
            />
          ))}
        </div>

        {/* Custom Goal */}
        <div className="bg-white rounded-lg p-4">
          <div className="flex items-center space-x-3 mb-2">
            <span className="text-2xl">⚙️</span>
            <h4 className="font-semibold text-gray-900">Custom Goal</h4>
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="number"
              min="1"
              max="100"
              value={customGoal}
              onChange={(e) => {
                setCustomGoal(e.target.value);
                setSelectedGoal(null);
              }}
              placeholder="Enter percentage"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
            />
            <span className="text-gray-600">% reduction</span>
          </div>
        </div>

        {/* Set Goal Button */}
        <button
          onClick={handleSetGoal}
          disabled={(!selectedGoal && !customGoal) || isLoading}
          className="w-full py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Setting Goal...</span>
            </div>
          ) : (
            currentGoal ? 'Update Goal' : 'Set Goal'
          )}
        </button>
      </div>

      {/* Tips for achieving goals */}
      <div className="mt-6 bg-white rounded-lg p-4">
        <h4 className="font-semibold text-gray-900 mb-2">💡 Tips for Success</h4>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• Start with small, achievable goals and gradually increase</li>
          <li>• Focus on one activity type at a time for better results</li>
          <li>• Use the tips section to find specific reduction strategies</li>
          <li>• Track your progress daily to stay motivated</li>
        </ul>
      </div>
    </div>
  );
}