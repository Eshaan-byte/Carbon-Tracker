import { ActivityInput } from "@/types";

// This interface defines the shape of our preset objects
export interface QuickAction {
  id: string;
  icon: string;
  label: string;
  toastMessage: string;
  activities: Partial<ActivityInput>; // We use Partial<ActivityInput> because we are only setting one or two values
}

// This is the default, empty state for an activity submission
export const defaultActivities: ActivityInput = {
  emails: 0,
  streamingHours: 0,
  codingHours: 0,
  videoCallHours: 0,
  cloudStorageGB: 0,
  gamingHours: 0,
  socialMediaHours: 0,
};

// Define all your presets here, matching the GitHub issue
export const QUICK_ACTIONS: QuickAction[] = [
  {
    id: "stream_1h",
    icon: "🎬",
    label: "1 Hr Streaming",
    toastMessage: "✅ Added 1 hour streaming (36g CO2)",
    activities: { streamingHours: 1 },
  },
  {
    id: "email_10",
    icon: "📧",
    label: "10 Emails",
    toastMessage: "✅ Added 10 emails (4g CO2)",
    activities: { emails: 10 },
  },
  {
    id: "call_30m",
    icon: "📹",
    label: "30m Video Call",
    toastMessage: "✅ Added 30 min video call (75g CO2)",
    activities: { videoCallHours: 0.5 },
  },
  {
    id: "code_2h",
    icon: "💻",
    label: "2 Hrs Coding",
    toastMessage: "✅ Added 2 hours coding (60g CO2)",
    activities: { codingHours: 2 },
  },
  {
    id: "browse_1h",
    icon: "🌐",
    label: "1 Hr Browsing",
    toastMessage: "✅ Added 1 hour browsing (30g CO2)",
    // Note: Mapping 'Browsing' to 'socialMediaHours' as it's the closest available field
    activities: { socialMediaHours: 1 },
  },
];