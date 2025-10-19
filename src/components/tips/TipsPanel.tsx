'use client';

import { useState, useEffect } from 'react';
import { ActivityType } from '@/types';
import { TIPS_DATABASE, getCategoryTips, getTopImpactTips, getRandomTips } from '@/constants/tips';
import { formatCO2Amount } from '@/lib/calculations/carbonFootprint';
import { ACTIVITY_LABELS, ACTIVITY_EMOJIS } from '@/constants/co2Factors';

interface TipsPanelProps {
  userFootprint?: Record<ActivityType, number>;
  className?: string;
}

interface TipCardProps {
  tip: any;
  onApply?: (tipId: string) => void;
}

function TipCard({ tip, onApply }: TipCardProps) {
  const [applied, setApplied] = useState(false);

  const handleApply = () => {
    setApplied(true);
    onApply?.(tip.id);
    
    // Reset after 3 seconds
    setTimeout(() => setApplied(false), 3000);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start space-x-4">
        <div className="text-3xl flex-shrink-0">{tip.icon}</div>
        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-semibold text-gray-900 text-lg">{tip.title}</h3>
            <span className="text-sm font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">
              -{formatCO2Amount(tip.potentialSaving)}
            </span>
          </div>
          <p className="text-gray-600 mb-4 leading-relaxed">{tip.description}</p>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full flex items-center gap-1">
              <span>{ACTIVITY_EMOJIS[tip.category as ActivityType]}</span>
              <span>{ACTIVITY_LABELS[tip.category as ActivityType]}</span>
            </span>
            <button
              onClick={handleApply}
              disabled={applied}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                applied
                  ? 'bg-green-100 text-green-700 cursor-not-allowed'
                  : 'bg-green-600 text-white hover:bg-green-700'
              }`}
            >
              {applied ? '✓ Applied!' : 'Apply Tip'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TipsPanel({ userFootprint, className = '' }: TipsPanelProps) {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'personalized' | ActivityType>('personalized');
  const [tips, setTips] = useState<any[]>([]);
  const [appliedTips, setAppliedTips] = useState<string[]>([]);

  useEffect(() => {
    let filteredTips: any[] = [];

    if (selectedCategory === 'all') {
      filteredTips = getRandomTips(12);
    } else if (selectedCategory === 'personalized') {
      if (userFootprint) {
        // Get tips for the user's highest impact categories
        const sortedCategories = Object.entries(userFootprint)
          .sort(([, a], [, b]) => b - a)
          .slice(0, 3)
          .map(([category]) => category as ActivityType);

        filteredTips = sortedCategories.flatMap(category => 
          getCategoryTips(category).slice(0, 2)
        );
        
        // Add some high-impact tips
        filteredTips.push(...getTopImpactTips(3));
        
        // Remove duplicates
        filteredTips = filteredTips.filter((tip, index, arr) => 
          arr.findIndex(t => t.id === tip.id) === index
        );
      } else {
        filteredTips = getTopImpactTips(8);
      }
    } else {
      filteredTips = getCategoryTips(selectedCategory);
    }

    setTips(filteredTips);
  }, [selectedCategory, userFootprint]);

  const handleApplyTip = (tipId: string) => {
    setAppliedTips(prev => [...prev, tipId]);
  };

  const categories: Array<{ value: 'all' | 'personalized' | ActivityType; label: string; icon: string }> = [
    { value: 'personalized', label: 'For You', icon: '🎯' },
    { value: 'all', label: 'All Tips', icon: '💡' },
    { value: 'emails', label: 'Emails', icon: ACTIVITY_EMOJIS.emails },
    { value: 'streaming', label: 'Streaming', icon: ACTIVITY_EMOJIS.streaming },
    { value: 'coding', label: 'Coding', icon: ACTIVITY_EMOJIS.coding },
    { value: 'video_calls', label: 'Video Calls', icon: ACTIVITY_EMOJIS.video_calls },
    { value: 'cloud_storage', label: 'Cloud Storage', icon: ACTIVITY_EMOJIS.cloud_storage },
    { value: 'gaming', label: 'Gaming', icon: ACTIVITY_EMOJIS.gaming },
    { value: 'social_media', label: 'Social Media', icon: ACTIVITY_EMOJIS.social_media },
  ];

  const totalPotentialSaving = tips.reduce((sum, tip) => sum + tip.potentialSaving, 0);

  return (
    <div className={`bg-gradient-to-br from-green-50 to-emerald-100 rounded-xl p-8 ${className}`}>
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          💡 Eco-Friendly Tips
        </h2>
        <p className="text-gray-600 mb-4">
          Reduce your digital carbon footprint with these actionable tips
        </p>
        {totalPotentialSaving > 0 && (
          <p className="text-green-700 font-medium">
            Potential savings: {formatCO2Amount(totalPotentialSaving)} CO₂ per day
          </p>
        )}
      </div>

      {/* Category Filter */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map(category => (
            <button
              key={category.value}
              onClick={() => setSelectedCategory(category.value)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category.value
                  ? 'bg-green-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-green-50 border border-gray-200'
              }`}
            >
              <span>{category.icon}</span>
              <span>{category.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tips Grid */}
      {tips.length > 0 ? (
        <div className="grid md:grid-cols-2 gap-6">
          {tips.map(tip => (
            <TipCard
              key={tip.id}
              tip={tip}
              onApply={handleApplyTip}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <span className="text-6xl mb-4 block">🔍</span>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No tips found</h3>
          <p className="text-gray-600">Try selecting a different category or check back later.</p>
        </div>
      )}

      {/* Applied Tips Summary */}
      {appliedTips.length > 0 && (
        <div className="mt-8 bg-white rounded-xl p-6">
          <h3 className="font-semibold text-gray-900 mb-2">🎉 Great progress!</h3>
          <p className="text-gray-600">
            You've applied {appliedTips.length} tip{appliedTips.length !== 1 ? 's' : ''} today. 
            Keep up the sustainable habits!
          </p>
        </div>
      )}
    </div>
  );
}