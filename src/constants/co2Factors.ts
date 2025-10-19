import { ActivityType } from '@/types';

// CO2 emissions in grams per unit
export const CO2_FACTORS: Record<ActivityType, number> = {
  emails: 4, // grams per email
  streaming: 36, // grams per hour
  coding: 15, // grams per hour (local development)
  video_calls: 150, // grams per hour
  cloud_storage: 0.5, // grams per GB per day
  gaming: 60, // grams per hour
  social_media: 12, // grams per hour
};

// Real-world equivalents for context
export const EQUIVALENTS = [
  {
    unit: 'km_driving',
    factor: 120, // grams CO2 per km
    description: 'driving {value} km in a car',
  },
  {
    unit: 'phone_charges',
    factor: 8.22, // grams CO2 per charge
    description: 'charging your phone {value} times',
  },
  {
    unit: 'tea_cups',
    factor: 21, // grams CO2 per cup
    description: 'boiling {value} cups of tea',
  },
  {
    unit: 'light_bulb_hours',
    factor: 50, // grams CO2 per hour (60W bulb)
    description: 'running a light bulb for {value} hours',
  },
];

// Activity labels for UI
export const ACTIVITY_LABELS: Record<ActivityType, string> = {
  emails: 'Emails Sent',
  streaming: 'Video Streaming',
  coding: 'Coding/Development',
  video_calls: 'Video Calls',
  cloud_storage: 'Cloud Storage',
  gaming: 'Gaming',
  social_media: 'Social Media',
};

// Activity descriptions
export const ACTIVITY_DESCRIPTIONS: Record<ActivityType, string> = {
  emails: 'Number of emails sent today',
  streaming: 'Hours spent watching videos (Netflix, YouTube, etc.)',
  coding: 'Hours spent coding or using development tools',
  video_calls: 'Hours in video meetings (Zoom, Meet, Teams)',
  cloud_storage: 'Gigabytes of cloud storage used',
  gaming: 'Hours spent gaming online',
  social_media: 'Hours browsing social media platforms',
};

// Activity emojis for UI
export const ACTIVITY_EMOJIS: Record<ActivityType, string> = {
  emails: '📧',
  streaming: '🎬',
  coding: '💻',
  video_calls: '📹',
  cloud_storage: '☁️',
  gaming: '🎮',
  social_media: '🌐',
};