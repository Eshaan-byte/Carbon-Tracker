import { ActivityInput, ActivityType, CarbonFootprint } from '@/types';
import { CO2_FACTORS, EQUIVALENTS } from '@/constants/co2Factors';

export interface CalculationResult {
  totalCO2: number;
  breakdown: Record<ActivityType, number>;
  equivalents: Array<{ description: string; value: number; unit: string }>;
}

export const calculateCarbonFootprint = (activities: ActivityInput): CalculationResult => {
  const breakdown: Record<ActivityType, number> = {
    emails: activities.emails * CO2_FACTORS.emails,
    streaming: activities.streamingHours * CO2_FACTORS.streaming,
    coding: activities.codingHours * CO2_FACTORS.coding,
    video_calls: activities.videoCallHours * CO2_FACTORS.video_calls,
    cloud_storage: activities.cloudStorageGB * CO2_FACTORS.cloud_storage,
    gaming: activities.gamingHours * CO2_FACTORS.gaming,
    social_media: activities.socialMediaHours * CO2_FACTORS.social_media,
    music_streaming: activities.musicStreamingHours * CO2_FACTORS.music_streaming,
  };

  const totalCO2 = Object.values(breakdown).reduce((sum, value) => sum + value, 0);

  const equivalents = calculateEquivalents(totalCO2);

  return {
    totalCO2,
    breakdown,
    equivalents,
  };
};

export const calculateEquivalents = (co2Grams: number) => {
  return EQUIVALENTS.map(equivalent => {
    const value = Math.round((co2Grams / equivalent.factor) * 10) / 10;
    return {
      description: equivalent.description.replace('{value}', value.toString()),
      value,
      unit: equivalent.unit,
    };
  }).filter(eq => eq.value > 0);
};

export const formatCO2Amount = (grams: number): string => {
  if (grams < 1000) {
    return `${Math.round(grams)}g`;
  } else {
    const kg = grams / 1000;
    return `${Math.round(kg * 100) / 100}kg`;
  }
};

export const calculateWeeklyAverage = (dailyFootprints: number[]): number => {
  if (dailyFootprints.length === 0) return 0;
  return dailyFootprints.reduce((sum, value) => sum + value, 0) / dailyFootprints.length;
};

export const calculateTrend = (footprints: Array<{ date: Date; co2: number }>): 'increasing' | 'decreasing' | 'stable' => {
  if (footprints.length < 2) return 'stable';
  
  const recent = footprints.slice(-7); // Last 7 days
  const older = footprints.slice(-14, -7); // Previous 7 days
  
  if (recent.length === 0 || older.length === 0) return 'stable';
  
  const recentAvg = recent.reduce((sum, f) => sum + f.co2, 0) / recent.length;
  const olderAvg = older.reduce((sum, f) => sum + f.co2, 0) / older.length;
  
  const change = (recentAvg - olderAvg) / olderAvg;
  
  if (change > 0.05) return 'increasing';
  if (change < -0.05) return 'decreasing';
  return 'stable';
};

export const calculateGoalProgress = (currentCO2: number, baselineCO2: number, targetReduction: number): number => {
  if (baselineCO2 === 0) return 0;
  
  const actualReduction = (baselineCO2 - currentCO2) / baselineCO2;
  const targetReductionDecimal = targetReduction / 100;
  
  return Math.min(100, Math.max(0, (actualReduction / targetReductionDecimal) * 100));
};

export const suggestReductions = (breakdown: Record<ActivityType, number>): Array<{ activity: ActivityType; suggestion: string; potentialSaving: number }> => {
  const suggestions = [];
  
  // Find the highest emitting activities
  const sortedActivities = Object.entries(breakdown)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3);
  
  for (const [activity, emissions] of sortedActivities) {
    if (emissions < 10) continue; // Skip low-impact activities
    
    let suggestion = '';
    let potentialSaving = 0;
    
    switch (activity as ActivityType) {
      case 'streaming':
        suggestion = 'Reduce streaming quality or download content for offline viewing';
        potentialSaving = emissions * 0.3;
        break;
      case 'video_calls':
        suggestion = 'Turn off video when not necessary or use audio-only calls';
        potentialSaving = emissions * 0.4;
        break;
      case 'emails':
        suggestion = 'Batch emails and avoid unnecessary CCs/BCCs';
        potentialSaving = emissions * 0.2;
        break;
      case 'gaming':
        suggestion = 'Take breaks between gaming sessions to reduce energy consumption';
        potentialSaving = emissions * 0.15;
        break;
      case 'cloud_storage':
        suggestion = 'Clean up unused files and optimize storage usage';
        potentialSaving = emissions * 0.25;
        break;
      case 'coding':
        suggestion = 'Use local development tools when possible';
        potentialSaving = emissions * 0.2;
        break;
      case 'social_media':
        suggestion = 'Set time limits for social media browsing';
        potentialSaving = emissions * 0.3;
        break;
      case 'music_streaming':
        suggestion = 'Download music for offline listening or reduce streaming quality';
        potentialSaving = emissions * 0.25;
        break;
    }
    
    suggestions.push({
      activity: activity as ActivityType,
      suggestion,
      potentialSaving,
    });
  }
  
  return suggestions;
};