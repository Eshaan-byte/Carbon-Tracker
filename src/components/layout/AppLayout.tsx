"use client";


import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuthDev";
import Navigation from "./Navigation";
import Dashboard from "@/components/dashboard/Dashboard";
import ActivityForm from "@/components/forms/ActivityForm";
import TipsPanel from "@/components/tips/TipsPanel";
import GoalsPanel from "@/components/gamification/GoalsPanel";
import BadgeDisplay from "@/components/gamification/BadgeDisplay";
import { ActivityInput } from "@/types";
import { calculateCarbonFootprint } from "@/lib/calculations/carbonFootprint";
import { saveCarbonFootprint, saveActivity, deleteActivitys } from "@/lib/firebase/firestore";
import { ShortcutsModal } from "../ui/ShortcutsModal";
import { useKeyboardShortcuts } from "@/hooks/useKeyboardShortcuts";
import QuickActionsFAB from "@/components/ui/QuickActionsFAB";
import Footer from "@/components/layout/Footer";


type PageType = "dashboard" | "activities" | "tips" | "goals" | "badges";
type SortOption = "newest" | "oldest" | "highest_impact" | "lowest_impact"; 

const LOCAL_STORAGE_KEY = "activitySortPreference";

export default function AppLayout() {
  const { user } = useAuth();
  const [currentPage, setCurrentPage] = useState<PageType>("dashboard");
  const [todayFootprint, setTodayFootprint] = useState(0);
  const [successToast, setSuccessToast] = useState<string | null>(null);
  const [failToast, setFailToast] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [activityHistory, setActivityHistory] = useState<any[]>([]);
  const [showShortcutsModal, setShowShortcutsModal] = useState<boolean>(false);
  const [sortPreference, setSortPreference] = useState<SortOption>("newest");

  //keyboard hook
useKeyboardShortcuts({setCurrentPage});

// Dynamic page title based on current page
useEffect(() => {
  const pageTitles: Record<PageType, string> = {
    dashboard: "Dashboard | Carbon Tracker",
    activities: "Log Activities | Carbon Tracker",
    tips: "Eco Tips | Carbon Tracker",
    goals: "Goals | Carbon Tracker",
    badges: "Achievements | Carbon Tracker",
  };

  document.title = pageTitles[currentPage];
}, [currentPage]);

useEffect(() => {
  const savedSort = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (savedSort && ['newest', 'oldest', 'highest_impact', 'lowest_impact'].includes(savedSort)) {
    setSortPreference(savedSort as SortOption);
  }
  // Load today's footprint when component mounts
  loadTodayFootprint();
}, [user]);

  const handleSortChange = (newSort: SortOption) => {
    setSortPreference(newSort);
    localStorage.setItem(LOCAL_STORAGE_KEY, newSort);
  };

  const handleDeleteActivity = async (
    id:string, 
    dateString: string, 
    activities: any,
    totalCO2: number,
    customToastMessage?: string
     ) => {

      const newTodayFootprint = todayFootprint - totalCO2;
      setTodayFootprint(newTodayFootprint);

    // In development mode, simulate saving with shorter delay
    if (process.env.NODE_ENV === "development") {
      setActivityHistory((prev) => prev.filter((activity) => activity.id !== id));
      setSuccessToast(customToastMessage || "Activities saved successfully!");
      setTimeout(() => setSuccessToast(null), 3000);
      return;
    }

    try{
      // Loop through activities and delete each from Firestore
      if (activities) {
        const deletionPromises = Object.entries(activities)
          .filter(([_, value]) => value as number > 0)
          .map(([activityType, _]) => 
            deleteActivitys({
              rawDateString: dateString,
              userId: user!.id,
              activityType: activityType
            })
          );

        // Wait for all deletions to finish
        await Promise.all(deletionPromises);

        // Now update state and show toast
        setActivityHistory((prev) => prev.filter((activity) => activity.id !== id));
        setSuccessToast(customToastMessage || "Activity deleted successfully!");
        setTimeout(() => setSuccessToast(null), 3000);
      }
    }catch(error){
      setTodayFootprint((prev) => prev + totalCO2);
      setFailToast(customToastMessage || "An error occurred while deleting activity.");
      setTimeout(() => setFailToast(null), 3000);
    }
  }
  const getSortedActivityHistory = () => {
    // We create a shallow copy to ensure we don't mutate the original state
    const sortedList = [...activityHistory];

    switch (sortPreference) {
      case "newest":
        // Sort descending by timestamp
        return sortedList.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
      case "oldest":
        // Sort ascending by timestamp
        return sortedList.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
      case "highest_impact":
        // Impact is based on totalCO2, so sort descending
        return sortedList.sort((a, b) => b.result.totalCO2 - a.result.totalCO2);
      case "lowest_impact":
        // Impact is based on totalCO2, so sort ascending
        return sortedList.sort((a, b) => a.result.totalCO2 - b.result.totalCO2);
      default:
        return sortedList.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime()); // Default to newest
    }
  };

  const loadTodayFootprint = async () => {
    // This would fetch today's footprint from the database
    // For now, we'll use a placeholder
    const baseFootprint = 850; // Base daily footprint
    setTodayFootprint(baseFootprint);

    // Initialize dashboard with sample data
    const initialDashboard = {
      todayFootprint: baseFootprint,
      weeklyFootprint: baseFootprint * 7,
      monthlyFootprint: baseFootprint * 30,
      weeklyBreakdown: {
        emails: 200,
        streaming: 300,
        coding: 150,
        video_calls: 400,
        cloud_storage: 50,
        gaming: 180,
        social_media: 120,
      },
      trend: [
        { date: "Mon", co2: 800 },
        { date: "Tue", co2: 920 },
        { date: "Wed", co2: 750 },
        { date: "Thu", co2: 880 },
        { date: "Fri", co2: 1100 },
        { date: "Sat", co2: 650 },
        { date: "Today", co2: baseFootprint },
      ],
      equivalents: [
        {
          description: "driving 2.1 km in a car",
          value: 2.1,
          unit: "km_driving",
        },
        {
          description: "charging your phone 103 times",
          value: 103,
          unit: "phone_charges",
        },
        { description: "boiling 40 cups of tea", value: 40, unit: "tea_cups" },
      ],
    };
    setDashboardData(initialDashboard);
  };

  const handleActivitySubmit = async (
    activities: ActivityInput,
    result: {
      totalCO2: number;
      breakdown: Record<string, number>;
      equivalents: Array<{ description: string; value: number; unit: string }>;
    },
    customToastMessage?: string
  ) => {
    if (!user) return;

    setIsLoading(true);

    try {
      // Optimized: Update UI immediately for better UX
      const newTodayFootprint = todayFootprint + result.totalCO2;
      setTodayFootprint(newTodayFootprint);

      // Update dashboard data in real-time
      setDashboardData((prev: any) => {
        if (!prev) return prev;

        // Update today's footprint in trend
        const updatedTrend = prev.trend.map((day: any) =>
          day.date === "Today" ? { ...day, co2: newTodayFootprint } : day
        );

        // Update weekly breakdown by adding new activities
        const updatedBreakdown = { ...prev.weeklyBreakdown };
        Object.entries(result.breakdown).forEach(([activity, co2]) => {
          updatedBreakdown[activity] = (updatedBreakdown[activity] || 0) + co2;
        });

        return {
          ...prev,
          todayFootprint: newTodayFootprint,
          weeklyFootprint: prev.weeklyFootprint + result.totalCO2,
          monthlyFootprint: prev.monthlyFootprint + result.totalCO2,
          weeklyBreakdown: updatedBreakdown,
          trend: updatedTrend,
          equivalents: result.equivalents,
        };
      });

      // Add to activity history
      setActivityHistory((prev) => [
        ...prev,
        {
          activities,
          result,
          timestamp: new Date(),
          id: Date.now().toString(),
        },
      ]);

      setCurrentPage("dashboard");

      // In development mode, simulate saving with shorter delay
      if (process.env.NODE_ENV === "development") {
        await new Promise((resolve) => setTimeout(resolve, 800)); // Faster development save
        console.log("Demo: Activities saved successfully", {
          activities,
          result,
        });
        setSuccessToast(customToastMessage || "Activities saved successfully!");
        setTimeout(() => setSuccessToast(null), 3000);
        return;
      }

      // Production: Batch all database operations
      const savePromises = [];

      // Save activities in parallel
      Object.entries(activities).forEach(([activityType, value]) => {
        if (value > 0) {
          savePromises.push(
            saveActivity({
              type: activityType as any,
              value,
              date: new Date(),
              userId: user.id,
            })
          );
        }
      });

      // Save carbon footprint
      savePromises.push(
        saveCarbonFootprint({
          totalCO2: result.totalCO2,
          breakdown: result.breakdown,
          date: new Date(),
          userId: user.id,
        })
      );

      // Execute all saves in parallel
      await Promise.all(savePromises);
      setSuccessToast(customToastMessage || "Activities saved successfully!");
      setTimeout(() => setSuccessToast(null), 3000);
    } catch (error) {
      console.error("Error saving activities:", error);
      // Rollback UI changes on error
      setTodayFootprint((prev) => prev - result.totalCO2);
      alert("Failed to save activities. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSetGoal = async (targetReduction: number) => {
    if (!user) return;

    try {
      // This would save the goal to the database
      console.log("Setting goal:", targetReduction);

      // For now, just show success
      setSuccessToast(`Goal set! Target: ${targetReduction}% reduction`);
      setTimeout(() => setSuccessToast(null), 3000);
    } catch (error) {
      console.error("Error setting goal:", error);
      throw error;
    }
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case "dashboard":
        return (
          <Dashboard
            dashboardData={dashboardData}
            activityHistory={getSortedActivityHistory()}
            sortPreference={sortPreference}
            onSortChange={handleSortChange}
            onNavigate={setCurrentPage}
            onDeleteActivity={handleDeleteActivity}
          />
        );

      case "activities":
        return (
          <div className="bg-gradient-to-br from-green-50 to-emerald-100 py-8">
            <div className="max-w-4xl mx-auto px-4">
              <ActivityForm
                onSubmit={handleActivitySubmit}
                initialValues={{}}
              />
            </div>
          </div>
        );

      case "tips":
        return (
          <div className=" bg-gradient-to-br from-green-50 to-emerald-100 py-8">
            <div className="max-w-6xl mx-auto px-4">
              <TipsPanel
                userFootprint={{
                  emails: 200,
                  streaming: 150,
                  coding: 100,
                  video_calls: 300,
                  cloud_storage: 25,
                  gaming: 180,
                  social_media: 80,
                }}
              />
            </div>
          </div>
        );

      case "goals":
        return (
          <div className=" min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
            <div className="max-w-4xl mx-auto px-4">
              <GoalsPanel
                currentWeekCO2={2500}
                lastWeekCO2={3200}
                onSetGoal={handleSetGoal}
              />
            </div>
          </div>
        );

      case "badges":
        return (
          <div className="  bg-gradient-to-br from-purple-50 to-pink-100 py-8">
            <div className="max-w-6xl mx-auto px-4">
              <BadgeDisplay
                userBadges={[
                  {
                    id: "first-steps",
                    name: "First Steps",
                    description: "Completed your first day of tracking",
                    icon: "👶",
                    requirement: {
                      type: "milestone",
                      threshold: 1,
                    },
                    achieved: true,
                    achievedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
                  },
                  {
                    id: "eco-warrior",
                    name: "Eco Warrior",
                    description: "Reduced weekly footprint by 25%",
                    icon: "🌿",
                    requirement: {
                      type: "total_reduction",
                      threshold: 25,
                      period: "weekly",
                    },
                    achieved: true,
                    achievedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
                  },
                ]}
                showAll={true}
              />
            </div>
          </div>
        );

      default:
        return (<Dashboard
          dashboardData={dashboardData}
          activityHistory={activityHistory}
          onNavigate={setCurrentPage}
        />);
    }
  };

  if (!user) {
    return null; // This should be handled by the parent component
  }

  return (
    

    <div className="min-h-screen bg-gray-50">
      <Navigation
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        todayFootprint={todayFootprint}
      />

      <main className="lg:ml-64">{renderCurrentPage()}</main>

      {/* Optimized Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 text-center shadow-2xl">
            <div className="spinner-eco w-10 h-10 mx-auto mb-3"></div>
            <p className="text-gray-700 font-medium">Saving activities...</p>
            <div className="mt-2 w-32 h-1 bg-gray-200 rounded-full mx-auto">
              <div
                className="h-1 bg-green-500 rounded-full animate-pulse"
                style={{ width: "70%" }}
              ></div>
            </div>
          </div>
        </div>
      )}

      {/* Success Toast */}
      {successToast && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-pulse">
          <div className="flex items-center space-x-2">
            <span className="text-lg">✅</span>
            <span className="font-medium">{successToast}</span>
          </div>
        </div>
      )}

      {/* Failed Toast */}
      {failToast && (
        <div className="fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-pulse">
          <div className="flex items-center space-x-2">
            <span className="text-lg">❌</span>
            <span className="font-medium">{failToast}</span>
          </div>
        </div>
      )}
      {/* Mobile spacing for bottom navigation */}
      <div className="h-16 lg:hidden"></div>

      <QuickActionsFAB onSubmit={handleActivitySubmit} />

      <ShortcutsModal
        isOpen={showShortcutsModal}
        onClose={() => setShowShortcutsModal(false)}
      />
      <footer className="fixed bottom-0 left-0 w-full bg-gray-100 p-2 text-center text-xs text-gray-500">
        Press ? for shortcuts
      </footer>
      <button
        onClick={() => setShowShortcutsModal(true)}
        className="fixed bottom-4 right-4 bg-[#489d63] text-white p-3 rounded-full shadow-lg hover:bg-[#e3fdee] transition cursor-pointer z-30"
        aria-label="Keyboard shortcuts"
      >
        ⌨️
      </button>

      
      <Footer />
    </div>
  );
}
