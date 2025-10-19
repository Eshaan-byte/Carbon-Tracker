export interface Activity {
  id: string;
  type: ActivityType;
  value: number;
  date: Date;
  userId: string;
  emoji?: string;
}

export type ActivityType = 
  | 'emails'
  | 'streaming'
  | 'coding'
  | 'video_calls'
  | 'cloud_storage'
  | 'gaming'
  | 'social_media';

export interface ActivityInput {
  emails: number;
  streamingHours: number;
  codingHours: number;
  videoCallHours: number;
  cloudStorageGB: number;
  gamingHours: number;
  socialMediaHours: number;
}

export interface CarbonFootprint {
  totalCO2: number;
  breakdown: Record<ActivityType, number>;
  date: Date;
  userId: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  photoURL?: string;
  createdAt: Date;
  preferences: UserPreferences;
}

export interface UserPreferences {
  units: 'metric' | 'imperial';
  notifications: boolean;
  weeklyGoal?: number;
}

export interface Tip {
  id: string;
  title: string;
  description: string;
  category: ActivityType;
  potentialSaving: number; // in grams of CO2
  icon: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  requirement: string;
  achieved: boolean;
  achievedAt?: Date;
}

export interface WeeklyGoal {
  id: string;
  userId: string;
  targetReduction: number; // percentage
  startDate: Date;
  endDate: Date;
  currentProgress: number;
  achieved: boolean;
}

export interface DashboardData {
  todayFootprint: number;
  weeklyFootprint: number;
  monthlyFootprint: number;
  weeklyBreakdown: Record<ActivityType, number>;
  trend: Array<{ date: string; co2: number }>;
  equivalents: Array<{ description: string; value: number; unit: string }>;
}