import { ActivityType, Tip } from '@/types';

export const TIPS_DATABASE: Tip[] = [
  // Email Tips
  {
    id: 'email-1',
    title: 'Batch Your Emails',
    description: 'Send multiple topics in one email instead of separate messages to reduce server processing.',
    category: 'emails',
    potentialSaving: 50,
    icon: '📧',
  },
  {
    id: 'email-2',
    title: 'Avoid Unnecessary CCs',
    description: 'Only include recipients who truly need the information to reduce network traffic.',
    category: 'emails',
    potentialSaving: 30,
    icon: '📧',
  },
  {
    id: 'email-3',
    title: 'Use Text Instead of HTML',
    description: 'Plain text emails use significantly less energy than rich HTML formatting.',
    category: 'emails',
    potentialSaving: 25,
    icon: '📧',
  },
  {
    id: 'email-4',
    title: 'Delete Old Emails',
    description: 'Regularly clean your inbox to reduce server storage requirements.',
    category: 'emails',
    potentialSaving: 40,
    icon: '📧',
  },
  {
    id: 'email-5',
    title: 'Unsubscribe from Unwanted Newsletters',
    description: 'Stop receiving emails you never read by unsubscribing regularly.',
    category: 'emails',
    potentialSaving: 35,
    icon: '📧',
  },
  {
    id: 'email-6',
    title: 'Limit Large Attachments',
    description: 'Use cloud links instead of sending large files as attachments.',
    category: 'emails',
    potentialSaving: 28,
    icon: '📎'
  },
  {
    id: 'email-7',
    title: 'Set Up Email Filters',
    description: 'Automatically archive or delete emails you don’t need to keep your inbox clean.',
    category: 'emails',
    potentialSaving: 18,
    icon: '🧹'
  },
  {
    id: 'email-8',
    title: 'Schedule Email Checks',
    description: 'Check your inbox at set intervals instead of constantly syncing in the background.',
    category: 'emails',
    potentialSaving: 22,
    icon: '⏰'
  },

  // Streaming Tips
  {
    id: 'streaming-1',
    title: 'Lower Video Quality',
    description: 'Streaming in 720p instead of 4K can reduce emissions by up to 90%.',
    category: 'streaming',
    potentialSaving: 200,
    icon: '📺',
  },
  {
    id: 'streaming-2',
    title: 'Download for Offline Viewing',
    description: 'Download content once instead of streaming repeatedly.',
    category: 'streaming',
    potentialSaving: 150,
    icon: '📺',
  },
  {
    id: 'streaming-3',
    title: 'Use Smaller Screens',
    description: 'Watch on your phone or tablet instead of large TV screens when possible.',
    category: 'streaming',
    potentialSaving: 80,
    icon: '📺',
  },
  {
    id: 'streaming-4',
    title: 'Close Background Tabs',
    description: 'Pause or close other streaming services when not actively watching.',
    category: 'streaming',
    potentialSaving: 60,
    icon: '📺',
  },
  {
    id: 'streaming-5',
    title: 'Turn Off Subtitles When Not Needed',
    description: 'Rendering subtitles consumes extra processing power.',
    category: 'streaming',
    potentialSaving: 10,
    icon: '📺'
  },
  {
    id: 'streaming-6',
    title: 'Log Out of Streaming Apps',
    description: 'Logging out prevents background data sync for recommendations and ads.',
    category: 'streaming',
    potentialSaving: 12,
    icon: '🚪'
  },
  {
    id: 'streaming-7',
    title: 'Use Energy-Efficient Devices',
    description: 'Streaming on newer, efficient devices saves more energy than on old hardware.',
    category: 'streaming',
    potentialSaving: 50,
    icon: '⚡'
  },
  {
    id: 'streaming-8',
    title: 'Disable Autoplay on Streaming Platforms',
    description: 'Prevents unnecessary data use and energy by stopping continuous playback.',
    category: 'streaming',
    potentialSaving: 15,
    icon: '⏹️'
  },

  // Coding Tips
  {
    id: 'coding-1',
    title: 'Use Local Development',
    description: 'Develop locally instead of using cloud IDEs when possible.',
    category: 'coding',
    potentialSaving: 100,
    icon: '💻',
  },
  {
    id: 'coding-2',
    title: 'Optimize Build Processes',
    description: 'Use incremental builds and caching to reduce compilation time.',
    category: 'coding',
    potentialSaving: 75,
    icon: '💻',
  },
  {
    id: 'coding-3',
    title: 'Close Unused Applications',
    description: 'Quit IDEs, browsers, and dev tools when not actively coding.',
    category: 'coding',
    potentialSaving: 50,
    icon: '💻',
  },
  {
    id: 'coding-4',
    title: 'Use Efficient Languages',
    description: 'Consider energy-efficient programming languages for appropriate tasks.',
    category: 'coding',
    potentialSaving: 90,
    icon: '💻',
  },
  {
    id: 'coding-5',
    title: 'Turn Off Linting on Save (if not needed)',
    description: 'Reduce CPU cycles by running linters manually instead of on every save.',
    category: 'coding',
    potentialSaving: 20,
    icon: '🛑'
  },
  {
    id: 'coding-6',
    title: 'Close Extra Editor Tabs',
    description: 'Keep open only the files you are actively working on to lower memory use.',
    category: 'coding',
    potentialSaving: 10,
    icon: '📑'
  },
  {
    id: 'coding-7',
    title: 'Disable Unused Extensions',
    description: 'Remove or disable unnecessary IDE extensions to reduce background processing.',
    category: 'coding',
    potentialSaving: 15,
    icon: '🧩'
  },
  {
    id: 'coding-8',
    title: 'Prefer Local Builds Over Remote CI for Drafts',
    description: 'Build locally during development to avoid triggering energy-intensive remote CI pipelines.',
    category: 'coding',
    potentialSaving: 35,
    icon: '💻'
  },

  // Video Calls Tips
  {
    id: 'video-1',
    title: 'Turn Off Video When Not Needed',
    description: 'Audio-only calls use 96% less energy than video calls.',
    category: 'video_calls',
    potentialSaving: 400,
    icon: '📹',
  },
  {
    id: 'video-2',
    title: 'Reduce Participant Count',
    description: 'Keep meetings focused with only necessary participants.',
    category: 'video_calls',
    potentialSaving: 200,
    icon: '📹',
  },
  {
    id: 'video-3',
    title: 'Use Phone Calls for Quick Chats',
    description: 'Traditional phone calls for brief conversations use less energy.',
    category: 'video_calls',
    potentialSaving: 300,
    icon: '📹',
  },
  {
    id: 'video-4',
    title: 'Optimize Your Setup',
    description: 'Close unnecessary apps and use ethernet instead of WiFi for stability.',
    category: 'video_calls',
    potentialSaving: 100,
    icon: '📹',
  },
  {
    id: 'video-5',
    title: 'Reduce Call Frequency',
    description: 'Opt for chat or email when video is unnecessary.',
    category: 'video_calls',
    potentialSaving: 150,
    icon: '📹'
  },
  {
    id: 'video-6',
    title: 'Mute Microphone When Not Speaking',
    description: 'Reduces unnecessary data transmission during calls.',
    category: 'video_calls',
    potentialSaving: 20,
    icon: '🔇'
  },
  {
    id: 'video-7',
    title: 'Encourage Shorter Meetings',
    description: 'Set an agenda to keep video meetings concise and focused.',
    category: 'video_calls',
    potentialSaving: 110,
    icon: '⏳'
  },
  {
    id: 'video-8',
    title: 'Switch Off HD Video',
    description: 'Use standard definition for video calls when high quality isn’t required.',
    category: 'video_calls',
    potentialSaving: 180,
    icon: '📵'
  },

  // Cloud Storage Tips
  {
    id: 'cloud-1',
    title: 'Delete Duplicate Files',
    description: 'Use tools to find and remove duplicate files from your cloud storage.',
    category: 'cloud_storage',
    potentialSaving: 20,
    icon: '☁️',
  },
  {
    id: 'cloud-2',
    title: 'Compress Large Files',
    description: 'Compress images and documents before uploading to cloud storage.',
    category: 'cloud_storage',
    potentialSaving: 30,
    icon: '☁️',
  },
  {
    id: 'cloud-3',
    title: 'Use Local Storage First',
    description: 'Store frequently accessed files locally and sync only when needed.',
    category: 'cloud_storage',
    potentialSaving: 25,
    icon: '☁️',
  },
  {
    id: 'cloud-4',
    title: 'Archive Old Files',
    description: 'Move old files to cheaper, less energy-intensive storage tiers.',
    category: 'cloud_storage',
    potentialSaving: 15,
    icon: '☁️',
  },
  {
    id: 'cloud-5',
    title: 'Remove Orphaned Shared Links',
    description: 'Delete public links to files that are no longer needed to reduce access requests.',
    category: 'cloud_storage',
    potentialSaving: 8,
    icon: '🔗'
  },
  {
    id: 'cloud-6',
    title: 'Sync Only Selected Folders',
    description: 'Limit sync to essential folders instead of syncing everything.',
    category: 'cloud_storage',
    potentialSaving: 25,
    icon: '📂'
  },
  {
    id: 'cloud-7',
    title: 'Review Shared Folders Regularly',
    description: 'Clean up shared folders to avoid unnecessary storage and data transfers.',
    category: 'cloud_storage',
    potentialSaving: 18,
    icon: '☁️'
  },
  {
    id: 'cloud-8',
    title: 'Use Storage with Renewable Energy',
    description: 'Choose cloud providers that run on renewable energy sources.',
    category: 'cloud_storage',
    potentialSaving: 55,
    icon: '🌱'
  },

  // Gaming Tips
  {
    id: 'gaming-1',
    title: 'Lower Graphics Settings',
    description: 'Reduce graphics quality to decrease GPU power consumption.',
    category: 'gaming',
    potentialSaving: 150,
    icon: '🎮',
  },
  {
    id: 'gaming-2',
    title: 'Take Regular Breaks',
    description: 'Gaming breaks reduce continuous energy consumption.',
    category: 'gaming',
    potentialSaving: 100,
    icon: '🎮',
  },
  {
    id: 'gaming-3',
    title: 'Close Background Applications',
    description: 'Quit unnecessary programs while gaming to reduce system load.',
    category: 'gaming',
    potentialSaving: 80,
    icon: '🎮',
  },
  {
    id: 'gaming-4',
    title: 'Use Game Mode',
    description: 'Enable OS game mode to optimize power consumption.',
    category: 'gaming',
    potentialSaving: 60,
    icon: '🎮',
  },
    {
    id: 'gaming-5',
    title: 'Limit Background Downloads',
    description: 'Pause automatic game updates and downloads when not needed.',
    category: 'gaming',
    potentialSaving: 60,
    icon: '🎮'
  },
  {
    id: 'gaming-6',
    title: 'Use Wired Connection for Online Play',
    description: 'Ethernet connections can be more energy-efficient than WiFi for gaming.',
    category: 'gaming',
    potentialSaving: 25,
    icon: '🎮'
  },

  // Social Media Tips
  {
    id: 'social-1',
    title: 'Set Time Limits',
    description: 'Use app timers to limit social media browsing time.',
    category: 'social_media',
    potentialSaving: 80,
    icon: '📱',
  },
  {
    id: 'social-2',
    title: 'Disable Auto-Play Videos',
    description: 'Turn off auto-playing videos in social media settings.',
    category: 'social_media',
    potentialSaving: 120,
    icon: '📱',
  },
  {
    id: 'social-3',
    title: 'Use Dark Mode',
    description: 'Dark themes use less energy on OLED screens.',
    category: 'social_media',
    potentialSaving: 40,
    icon: '📱',
  },
  {
    id: 'social-4',
    title: 'Reduce Notification Frequency',
    description: 'Fewer notifications mean less frequent phone wake-ups.',
    category: 'social_media',
    potentialSaving: 30,
    icon: '📱',
  }
];

export const getCategoryTips = (category: ActivityType): Tip[] => {
  return TIPS_DATABASE.filter(tip => tip.category === category);
};

export const getRandomTips = (count: number = 5): Tip[] => {
  const shuffled = [...TIPS_DATABASE].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export const getTopImpactTips = (count: number = 5): Tip[] => {
  return [...TIPS_DATABASE]
    .sort((a, b) => b.potentialSaving - a.potentialSaving)
    .slice(0, count);
};