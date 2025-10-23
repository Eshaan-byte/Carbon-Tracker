import { ActivityType, ACTIVITY_TYPES } from '@/types';

// CO2 emissions in grams per unit
export const CO2_FACTORS: Record<ActivityType, number> = {
  emails: 4, // grams per email
  streaming: 36, // grams per hour
  coding: 15, // grams per hour (local development)
  video_calls: 150, // grams per hour
  cloud_storage: 0.5, // grams per GB per day
  gaming: 60, // grams per hour
  social_media: 12, // grams per hour
  music_streaming: 8,
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

// Activity labels for UI - derived from ACTIVITY_TYPES
export const ACTIVITY_LABELS: Record<ActivityType, string> = {
  emails: ACTIVITY_TYPES.emails.label,
  streaming: ACTIVITY_TYPES.streaming.label,
  coding: ACTIVITY_TYPES.coding.label,
  video_calls: ACTIVITY_TYPES.video_calls.label,
  cloud_storage: ACTIVITY_TYPES.cloud_storage.label,
  gaming: ACTIVITY_TYPES.gaming.label,
  social_media: ACTIVITY_TYPES.social_media.label,
  music_streaming: ACTIVITY_TYPES.music_streaming.label,
};

// Activity descriptions
export const ACTIVITY_DESCRIPTIONS: Record<ActivityType, string> = {
  emails: ACTIVITY_TYPES.emails.description,
  streaming: ACTIVITY_TYPES.streaming.description,
  coding: ACTIVITY_TYPES.coding.description,
  video_calls: ACTIVITY_TYPES.video_calls.description,
  cloud_storage: ACTIVITY_TYPES.cloud_storage.description,
  gaming: ACTIVITY_TYPES.gaming.description,
  social_media: ACTIVITY_TYPES.social_media.description,
  music_streaming: ACTIVITY_TYPES.music_streaming.description,
};