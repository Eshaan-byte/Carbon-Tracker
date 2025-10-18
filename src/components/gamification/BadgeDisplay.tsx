'use client';

import { useState } from 'react';
import { Badge } from '@/types';
import { BADGE_TEMPLATES, RARITY_COLORS, RARITY_LABELS, getBadgeTemplate } from '@/constants/badges';
import ShareButton from '@/components/ui/ShareButton';

interface BadgeDisplayProps {
  userBadges: Badge[];
  showAll?: boolean;
  className?: string;
}

interface BadgeCardProps {
  badge: Badge;
  isEarned: boolean;
  onClick?: () => void;
}

function BadgeCard({ badge, isEarned, onClick }: BadgeCardProps) {
  const template = getBadgeTemplate(badge.id);
  const rarity = template?.rarity || 'common';
  const points = template?.points || 0;

  return (
    <div
      onClick={onClick}
      className={`relative p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer hover:scale-105 ${isEarned
        ? `${RARITY_COLORS[rarity]} border-current shadow-lg`
        : 'bg-gray-50 border-gray-200 opacity-50'
        }`}
    >
      {/* Badge Icon */}
      <div className="text-center mb-3">
        <div className={`text-4xl mb-2 ${isEarned ? '' : 'grayscale'}`}>
          {badge.icon}
        </div>
        <div className={`text-xs font-medium px-2 py-1 rounded-full ${isEarned ? RARITY_COLORS[rarity] : 'bg-gray-200 text-gray-500'
          }`}>
          {RARITY_LABELS[rarity]}
        </div>
      </div>

      {/* Badge Info */}
      <div className="text-center">
        <h3 className={`font-bold text-sm mb-1 ${isEarned ? 'text-gray-900' : 'text-gray-400'
          }`}>
          {badge.name}
        </h3>
        <p className={`text-xs leading-tight mb-2 ${isEarned ? 'text-gray-600' : 'text-gray-400'
          }`}>
          {badge.description}
        </p>

        {isEarned && (
          <div className="flex items-center justify-center space-x-2 text-xs">
            <span className="text-yellow-600">⭐ {points} pts</span>
            {badge.achievedAt && (
              <span className="text-gray-500">
                {badge.achievedAt.toLocaleDateString()}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Lock icon for unearned badges */}
      {!isEarned && (
        <div className="absolute top-2 right-2 text-gray-400">
          🔒
        </div>
      )}

      {/* New badge indicator */}
      {isEarned && badge.achievedAt &&
        new Date().getTime() - badge.achievedAt.getTime() < 7 * 24 * 60 * 60 * 1000 && (
          <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
            NEW!
          </div>
        )}
    </div>
  );
}

export default function BadgeDisplay({ userBadges, showAll = false, className = '' }: BadgeDisplayProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null);

  // Create a map of earned badges
  const earnedBadgesMap = new Map(userBadges.map(badge => [badge.id, badge]));

  // Get all badges to display
  const allBadges = BADGE_TEMPLATES.map(template => {
    const earnedBadge = earnedBadgesMap.get(template.id);
    return earnedBadge || {
      id: template.id,
      name: template.name,
      description: template.description,
      icon: template.icon,
      requirement: template.requirement.type,
      achieved: false,
    };
  });

  // Filter badges by category
  const filteredBadges = selectedCategory === 'all'
    ? allBadges
    : allBadges.filter(badge => {
      const template = getBadgeTemplate(badge.id);
      return template?.category === selectedCategory;
    });

  // Show only earned badges if not showing all
  const displayBadges = showAll
    ? filteredBadges
    : filteredBadges.filter(badge => badge.achieved);

  const categories = [
    { value: 'all', label: 'All', icon: '🏆' },
    { value: 'environmental', label: 'Environmental', icon: '🌿' },
    { value: 'consistency', label: 'Consistency', icon: '📅' },
    { value: 'social', label: 'Social', icon: '👥' },
    { value: 'milestone', label: 'Milestones', icon: '🎯' },
  ];

  const earnedCount = userBadges.length;
  const totalPoints = userBadges.reduce((sum, badge) => {
    const template = getBadgeTemplate(badge.id);
    return sum + (template?.points || 0);
  }, 0);

  return (
    <div className={`bg-white rounded-xl shadow-lg p-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">🏆 Achievements</h2>
          <p className="text-gray-600">
            {earnedCount} badges earned • {totalPoints} points
          </p>
        </div>

        <div className="text-right">
          <div className="text-2xl font-bold text-green-600">{earnedCount}</div>
          <div className="text-sm text-gray-500">badges</div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map(category => (
          <button
            key={category.value}
            onClick={() => setSelectedCategory(category.value)}
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${selectedCategory === category.value
              ? 'bg-green-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-green-50'
              }`}
          >
            <span>{category.icon}</span>
            <span>{category.label}</span>
          </button>
        ))}
      </div>

      {/* Toggle to show all badges */}
      {!showAll && (
        <div className="mb-4">
          <label className="flex items-center space-x-2 text-sm text-gray-600">
            <input
              type="checkbox"
              checked={showAll}
              onChange={() => { }} // This would be controlled by parent
              className="rounded"
            />
            <span>Show locked badges</span>
          </label>
        </div>
      )}

      {/* Badges Grid */}
      {displayBadges.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {displayBadges.map(badge => (
            <BadgeCard
              key={badge.id}
              badge={badge}
              isEarned={badge.achieved}
              onClick={() => setSelectedBadge(badge)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🎯</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {selectedCategory === 'all' ? 'No badges yet' : 'No badges in this category'}
          </h3>
          <p className="text-gray-600">
            Keep tracking your activities to earn your first badge!
          </p>
        </div>
      )}

      {/* Badge Detail Modal */}
      {selectedBadge && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <div className="text-center mb-4">
              <div className="text-6xl mb-2">{selectedBadge.icon}</div>
              <h3 className="text-xl font-bold text-gray-900">{selectedBadge.name}</h3>
              <p className="text-gray-600 mt-2">{selectedBadge.description}</p>
            </div>

            {selectedBadge.achieved ? (
              <div className="space-y-4">
                <div className="text-center">
                  <div className="inline-flex items-center space-x-2 bg-green-100 text-green-700 px-4 py-2 rounded-full">
                    <span>✅</span>
                    <span>Achieved on {selectedBadge.achievedAt?.toLocaleDateString()}</span>
                  </div>
                </div>

                {/* Share Button for achieved badges */}
                <div className="flex justify-center">
                  <ShareButton
                    co2Amount={0}
                    customMessage={`I just earned the "${selectedBadge.name}" badge on Carbon Tracker! 🏆 #CarbonFootprint`}
                  />
                </div>
              </div>
            ) : (
              <div className="text-center">
                <div className="inline-flex items-center space-x-2 bg-gray-100 text-gray-600 px-4 py-2 rounded-full">
                  <span>🔒</span>
                  <span>Not yet achieved</span>
                </div>
              </div>
            )}

            <button
              onClick={() => setSelectedBadge(null)}
              className="w-full mt-6 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}