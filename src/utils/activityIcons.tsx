// src/utils/activityIcons.tsx
import { 
  EnvelopeIcon,
  TvIcon,
  CodeBracketIcon,
  VideoCameraIcon,
  CloudIcon,
  PuzzlePieceIcon,
  ShareIcon,
} from '@heroicons/react/24/outline';
import { ActivityType } from '@/types';

// Impact levels based on CO2 emissions per unit
export type ImpactLevel = 'low' | 'medium' | 'high';

interface ActivityIconConfig {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  impactLevel: ImpactLevel;
  color: string;
  bgColor: string;
  borderColor: string;
}

// CO2 impact classification (grams per typical unit)
// Low: < 10g, Medium: 10-50g, High: > 50g
export const ACTIVITY_ICONS: Record<ActivityType, ActivityIconConfig> = {
  emails: {
    icon: EnvelopeIcon,
    impactLevel: 'low',
    color: 'text-green-600',
    bgColor: 'bg-green-100',
    borderColor: 'border-green-200',
  },
  streaming: {
    icon: TvIcon,
    impactLevel: 'high',
    color: 'text-red-600',
    bgColor: 'bg-red-100',
    borderColor: 'border-red-200',
  },
  coding: {
    icon: CodeBracketIcon,
    impactLevel: 'medium',
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-100',
    borderColor: 'border-yellow-200',
  },
  video_calls: {
    icon: VideoCameraIcon,
    impactLevel: 'high',
    color: 'text-red-600',
    bgColor: 'bg-red-100',
    borderColor: 'border-red-200',
  },
  cloud_storage: {
    icon: CloudIcon,
    impactLevel: 'low',
    color: 'text-green-600',
    bgColor: 'bg-green-100',
    borderColor: 'border-green-200',
  },
  gaming: {
    icon: PuzzlePieceIcon,
    impactLevel: 'high',
    color: 'text-red-600',
    bgColor: 'bg-red-100',
    borderColor: 'border-red-200',
  },
  social_media: {
    icon: ShareIcon,
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
          className={`${config.color}`}
          style={{ width: size, height: size }}
          strokeWidth={2}
        />
      </div>
    );
  }

  return (
    <Icon 
      className={`${config.color} ${className}`}
      style={{ width: size, height: size }}
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