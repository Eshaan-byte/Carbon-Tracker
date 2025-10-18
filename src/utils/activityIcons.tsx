// src/utils/activityIcons.tsx
import { 
  Mail, 
  Tv, 
  Code, 
  Video, 
  Cloud, 
  Gamepad2, 
  Share2,
  LucideIcon 
} from 'lucide-react';
import { ActivityType } from '@/types';

// Impact levels based on CO2 emissions per unit
export type ImpactLevel = 'low' | 'medium' | 'high';

interface ActivityIconConfig {
  icon: LucideIcon;
  impactLevel: ImpactLevel;
  color: string;
  bgColor: string;
  borderColor: string;
}

// CO2 impact classification (grams per typical unit)
// Low: < 10g, Medium: 10-50g, High: > 50g
export const ACTIVITY_ICONS: Record<ActivityType, ActivityIconConfig> = {
  emails: {
    icon: Mail,
    impactLevel: 'low',
    color: 'text-green-600',
    bgColor: 'bg-green-100',
    borderColor: 'border-green-200',
  },
  streaming: {
    icon: Tv,
    impactLevel: 'high',
    color: 'text-red-600',
    bgColor: 'bg-red-100',
    borderColor: 'border-red-200',
  },
  coding: {
    icon: Code,
    impactLevel: 'medium',
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-100',
    borderColor: 'border-yellow-200',
  },
  video_calls: {
    icon: Video,
    impactLevel: 'high',
    color: 'text-red-600',
    bgColor: 'bg-red-100',
    borderColor: 'border-red-200',
  },
  cloud_storage: {
    icon: Cloud,
    impactLevel: 'low',
    color: 'text-green-600',
    bgColor: 'bg-green-100',
    borderColor: 'border-green-200',
  },
  gaming: {
    icon: Gamepad2,
    impactLevel: 'high',
    color: 'text-red-600',
    bgColor: 'bg-red-100',
    borderColor: 'border-red-200',
  },
  social_media: {
    icon: Share2,
    impactLevel: 'medium',
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-100',
    borderColor: 'border-yellow-200',
  },
};

interface ActivityIconProps {
  activity: ActivityType;
  size?: number;
  showBackground?: boolean;
  className?: string;
}

/**
 * Renders an activity icon with consistent styling and color coding
 */
export function ActivityIcon({ 
  activity, 
  size = 24, 
  showBackground = false,
  className = '' 
}: ActivityIconProps) {
  const config = ACTIVITY_ICONS[activity];
  const Icon = config.icon;

  if (showBackground) {
    return (
      <div 
        className={`
          inline-flex items-center justify-center 
          rounded-lg p-2
          ${config.bgColor} 
          ${config.borderColor} 
          border-2
          ${className}
        `}
      >
        <Icon 
          size={size} 
          className={config.color}
          strokeWidth={2}
        />
      </div>
    );
  }

  return (
    <Icon 
      size={size} 
      className={`${config.color} ${className}`}
      strokeWidth={2}
    />
  );
}

/**
 * Returns the icon configuration for an activity
 */
export function getActivityIconConfig(activity: ActivityType): ActivityIconConfig {
  return ACTIVITY_ICONS[activity];
}

/**
 * Returns all activities sorted by impact level
 */
export function getActivitiesByImpact(): Record<ImpactLevel, ActivityType[]> {
  const grouped: Record<ImpactLevel, ActivityType[]> = {
    low: [],
    medium: [],
    high: [],
  };

  Object.entries(ACTIVITY_ICONS).forEach(([activity, config]) => {
    grouped[config.impactLevel].push(activity as ActivityType);
  });

  return grouped;
}

/**
 * Returns the impact level color classes
 */
export function getImpactColors(level: ImpactLevel) {
  const colors = {
    low: {
      text: 'text-green-600',
      bg: 'bg-green-100',
      border: 'border-green-200',
      ring: 'ring-green-500',
    },
    medium: {
      text: 'text-yellow-600',
      bg: 'bg-yellow-100',
      border: 'border-yellow-200',
      ring: 'ring-yellow-500',
    },
    high: {
      text: 'text-red-600',
      bg: 'bg-red-100',
      border: 'border-red-200',
      ring: 'ring-red-500',
    },
  };

  return colors[level];
}