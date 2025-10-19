import { ActivityInput } from '@/types';

export interface ActivityHistoryEntry {
  id: string;
  activities: ActivityInput;
  result: {
    totalCO2: number;
    breakdown: Record<string, number>;
    equivalents: Array<{ description: string; value: number; unit: string }>;
  };
  timestamp: Date;
}

export interface CSVRow {
  date: string;
  time: string;
  activityType: string;
  duration: string;
  co2Emissions: string;
  details: string;
}

/**
 * Converts activity history entries to CSV format
 * @param activityHistory Array of activity history entries
 * @returns Array of CSV rows ready for export
 */
export function convertToCSVRows(activityHistory: ActivityHistoryEntry[]): CSVRow[] {
  const csvRows: CSVRow[] = [];

  activityHistory.forEach((entry) => {
    const date = entry.timestamp.toLocaleDateString('en-US');
    const time = entry.timestamp.toLocaleTimeString('en-US', { 
      hour12: false,
      hour: '2-digit',
      minute: '2-digit'
    });

    // Create a row for each activity type that has a value > 0
    Object.entries(entry.activities).forEach(([activityType, value]) => {
      if (value > 0) {
        const co2Amount = entry.result.breakdown[activityType] || 0;
        const duration = getDurationText(activityType, value);
        const details = getActivityDetails(activityType, value);

        csvRows.push({
          date,
          time,
          activityType: formatActivityType(activityType),
          duration,
          co2Emissions: `${co2Amount.toFixed(2)}g`,
          details
        });
      }
    });
  });

  return csvRows;
}

/**
 * Formats activity type for display
 */
function formatActivityType(activityType: string): string {
  const typeMap: Record<string, string> = {
    emails: 'Email',
    streamingHours: 'Video Streaming',
    codingHours: 'Coding',
    videoCallHours: 'Video Calls',
    cloudStorageGB: 'Cloud Storage',
    gamingHours: 'Gaming',
    socialMediaHours: 'Social Media'
  };
  
  return typeMap[activityType] || activityType;
}

/**
 * Gets duration text based on activity type and value
 */
function getDurationText(activityType: string, value: number): string {
  if (activityType === 'cloudStorageGB') {
    return `${value} GB`;
  }
  return `${value} min`;
}

/**
 * Gets detailed description for the activity
 */
function getActivityDetails(activityType: string, value: number): string {
  const detailsMap: Record<string, (val: number) => string> = {
    emails: (val) => `${val} emails sent`,
    streamingHours: (val) => `${val} minutes of video streaming`,
    codingHours: (val) => `${val} minutes of coding`,
    videoCallHours: (val) => `${val} minutes of video calls`,
    cloudStorageGB: (val) => `${val} GB of cloud storage used`,
    gamingHours: (val) => `${val} minutes of gaming`,
    socialMediaHours: (val) => `${val} minutes on social media`
  };
  
  const formatter = detailsMap[activityType];
  return formatter ? formatter(value) : `${value} units`;
}

/**
 * Escapes CSV values to handle commas, quotes, and newlines
 */
function escapeCSVValue(value: string): string {
  // If value contains comma, quote, or newline, wrap in quotes and escape internal quotes
  if (value.includes(',') || value.includes('"') || value.includes('\n')) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

/**
 * Converts CSV rows to CSV string format
 */
export function generateCSVContent(csvRows: CSVRow[]): string {
  const headers = ['Date', 'Time', 'Activity Type', 'Duration', 'CO2 Emissions (g)', 'Details'];
  
  const headerRow = headers.join(',');
  const dataRows = csvRows.map(row => 
    [
      escapeCSVValue(row.date),
      escapeCSVValue(row.time),
      escapeCSVValue(row.activityType),
      escapeCSVValue(row.duration),
      escapeCSVValue(row.co2Emissions),
      escapeCSVValue(row.details)
    ].join(',')
  );
  
  return [headerRow, ...dataRows].join('\n');
}

/**
 * Downloads CSV file to user's device
 */
export function downloadCSV(csvContent: string, filename: string): void {
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
}

/**
 * Main export function that handles the complete CSV export process
 */
export function exportToCSV(activityHistory: ActivityHistoryEntry[]): {
  success: boolean;
  message: string;
  filename?: string;
} {
  try {
    // Check if there are any activities to export
    if (!activityHistory || activityHistory.length === 0) {
      return {
        success: false,
        message: 'No activities found to export. Start logging activities to see your data here!'
      };
    }

    // Check if any activities have actual data
    const hasData = activityHistory.some(entry => 
      Object.values(entry.activities).some(value => value > 0)
    );

    if (!hasData) {
      return {
        success: false,
        message: 'No activity data found to export. All activities have zero values.'
      };
    }

    // Convert to CSV format
    const csvRows = convertToCSVRows(activityHistory);
    const csvContent = generateCSVContent(csvRows);
    
    // Generate filename with current date
    const currentDate = new Date().toISOString().split('T')[0];
    const filename = `carbon-tracker-export-${currentDate}.csv`;
    
    // Download the file
    downloadCSV(csvContent, filename);
    
    return {
      success: true,
      message: `Successfully exported ${csvRows.length} activity records!`,
      filename
    };
  } catch (error) {
    console.error('Error exporting CSV:', error);
    return {
      success: false,
      message: 'Failed to export data. Please try again or contact support if the issue persists.'
    };
  }
}
