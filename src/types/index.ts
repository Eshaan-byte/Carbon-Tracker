import { BadgeRequirement } from "@/constants/badges";

export interface Activity {
  id: string;
  type: ActivityType;
  value: number;
  date: Date;
  userId: string;
}

export type ActivityType =
  | "emails"
  | "streaming"
  | "coding"
  | "video_calls"
  | "cloud_storage"
  | "gaming"
  | "social_media"
  | "music_streaming";

export interface ActivityTypeInfo {
  id: ActivityType;
  label: string;
  description: string;
}

export const ACTIVITY_TYPES: Record<ActivityType, ActivityTypeInfo> = {
  emails: {
    id: "emails",
    label: "Email",
    description: "Sending and receiving emails",
  },
  video_calls: {
    id: "video_calls",
    label: "Video Calls",
    description: "Zoom, Teams, Google Meet calls",
  },
  streaming: {
    id: "streaming",
    label: "Streaming",
    description: "Netflix, YouTube, Spotify",
  },
  coding: {
    id: "coding",
    label: "Coding",
    description: "Using IDEs, compiling code",
  },
  cloud_storage: {
    id: "cloud_storage",
    label: "Cloud Storage",
    description: "Google Drive, Dropbox, iCloud",
  },
  gaming: {
    id: "gaming",
    label: "Gaming",
    description: "Online gaming and downloads",
  },
  social_media: {
    id: "social_media",
    label: "Social Media",
    description: "Facebook, Instagram, Twitter",
  },
  music_streaming: {
    id: "music_streaming",
    label: "Music Streaming",
    description: "Hours spent listening to Spotify, Apple Music, or YouTube Music",
  },
};

export interface ActivityInput {
  emails: number;
  streamingHours: number;
  codingHours: number;
  videoCallHours: number;
  cloudStorageGB: number;
  gamingHours: number;
  socialMediaHours: number;
  musicStreamingHours: number;
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
  units: "metric" | "imperial";
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
  requirement: BadgeRequirement;
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