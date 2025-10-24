"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuthDev";
import { DashboardData, ActivityType } from "@/types";
import {
  formatCO2Amount,
  calculateEquivalents,
} from "@/lib/calculations/carbonFootprint";
import FootprintChart from "@/components/charts/FootprintChart";
import ComparisonSection from "@/components/dashboard/ComparisonSection";
import ShareButton from "@/components/ui/ShareButton";
import { getUserFootprints } from "@/lib/firebase/firestore";
import { deleteActivitys } from "@/lib/firebase/firestore";
import { exportToCSV, ActivityHistoryEntry } from "@/utils/exportCSV";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import ConfirmDialog from "../ui/ConfirmDialog";
import Spinner from "@/components/ui/Spinner";

type SortOption = "newest" | "oldest" | "highest_impact" | "lowest_impact";

const SORT_OPTIONS: Record<SortOption, string> = {
  newest: "Newest First (Time ⬇️)",
  oldest: "Oldest First (Time ⬆️)",
  highest_impact: "Highest Impact (CO2 ⬇️)",
  lowest_impact: "Lowest Impact (CO2 ⬆️)",
};

interface StatCardProps {
  title: string;
  value: string;
  change?: number;
  icon: string;
  color: string;
}

function StatCard({ title, value, change, icon, color }: StatCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium">{title}</p>
          <p className={`text-2xl font-bold ${color}`}>{value}</p>
          {change !== undefined && (
            <p
              className={`text-sm mt-1 ${
                change > 0
                  ? "text-red-600"
                  : change < 0
                    ? "text-green-600"
                    : "text-gray-600"
              }`}
            >
              {change > 0 ? "↗" : change < 0 ? "↘" : "→"}{" "}
              {Math.abs(change).toFixed(1)}% from last week
            </p>
          )}
        </div>
        <div
          className={`text-3xl p-3 rounded-full ${color
            .replace("text-", "bg-")
            .replace("-600", "-100")}`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}

interface EquivalentCardProps {
  description: string;
  icon: string;
}

function EquivalentCard({ description, icon }: EquivalentCardProps) {
  return (
    <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg">
      <span className="text-2xl">{icon}</span>
      <span className="text-gray-700">{description}</span>
    </div>
  );
}

type PageType = "dashboard" | "activities" | "tips" | "goals" | "badges";

interface DashboardProps {
  dashboardData?: any;
  activityHistory?: any[];
  onNavigate: (page: PageType) => void;
  sortPreference: SortOption;
  onSortChange: (sort: SortOption) => void;
  onDeleteActivity: (id:string, dateString: string, activities: any, totalCO2: number) => void;
}

export default function Dashboard({
  dashboardData: propDashboardData,
  activityHistory = [],
  onNavigate,
  sortPreference,
  onSortChange,
  onDeleteActivity
}: DashboardProps) {
  const { user } = useAuth();
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [toDeleteEntry, setToDeleteEntry] = useState<any | null>(null);
  const [exportStatus, setExportStatus] = useState<{
    show: boolean;
    success: boolean;
    message: string;
  }>({ show: false, success: false, message: "" });

  useEffect(() => {
    // Use prop data if available, otherwise fetch from database
    if (propDashboardData) {
      setDashboardData(propDashboardData);
      setLoading(false);
      return;
    }

    const fetchDashboardData = async () => {
      if (!user) return;

      try {
        setLoading(true);
        const footprints = await getUserFootprints(user.id, 30);

        // Calculate dashboard metrics
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const todayFootprint = footprints
          .filter((f) => {
            const fDate = new Date(f.date);
            fDate.setHours(0, 0, 0, 0);
            return fDate.getTime() === today.getTime();
          })
          .reduce((sum, f) => sum + f.totalCO2, 0);

        const weekStart = new Date(today);
        weekStart.setDate(today.getDate() - 6);

        const weeklyFootprint = footprints
          .filter((f) => f.date >= weekStart)
          .reduce((sum, f) => sum + f.totalCO2, 0);

        const monthStart = new Date(today);
        monthStart.setDate(today.getDate() - 29);

        const monthlyFootprint = footprints
          .filter((f) => f.date >= monthStart)
          .reduce((sum, f) => sum + f.totalCO2, 0);

        // Calculate weekly breakdown
        const weeklyBreakdown: Record<ActivityType, number> = {
          emails: 0,
          streaming: 0,
          coding: 0,
          video_calls: 0,
          cloud_storage: 0,
          gaming: 0,
          social_media: 0,
        };

        footprints
          .filter((f) => f.date >= weekStart)
          .forEach((f) => {
            Object.entries(f.breakdown).forEach(([activity, value]) => {
              weeklyBreakdown[activity as ActivityType] += value;
            });
          });

        // Generate trend data (last 7 days)
        const trend = [];
        for (let i = 6; i >= 0; i--) {
          const date = new Date(today);
          date.setDate(today.getDate() - i);
          const dayFootprint = footprints
            .filter((f) => {
              const fDate = new Date(f.date);
              fDate.setHours(0, 0, 0, 0);
              return fDate.getTime() === date.getTime();
            })
            .reduce((sum, f) => sum + f.totalCO2, 0);

          trend.push({
            date: date.toLocaleDateString("en-US", { weekday: "short" }),
            co2: dayFootprint,
          });
        }

        const equivalents = calculateEquivalents(todayFootprint);

        setDashboardData({
          todayFootprint,
          weeklyFootprint,
          monthlyFootprint,
          weeklyBreakdown,
          trend,
          equivalents,
        });
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [user, propDashboardData]);

  // Update dashboard when prop data changes
  useEffect(() => {
    if (propDashboardData) {
      setDashboardData(propDashboardData);
    }
  }, [propDashboardData]);

  const handleDeleteClick = (entry: any) => {
    setToDeleteEntry(entry);
    setConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!toDeleteEntry) return;
    setConfirmOpen(false);

    try {
      if (onDeleteActivity) {
        await onDeleteActivity(toDeleteEntry.id, toDeleteEntry.timestamp.toString(), toDeleteEntry.activities, toDeleteEntry.result.totalCO2);
      } else {
        // fallback: try direct firestore helper
        await deleteActivitys?.(toDeleteEntry.id);
      }
    } catch (err) {
      console.error("Error deleting activity", err);
    } finally {
      setToDeleteEntry(null);
    }
  };

  const handleCancelDelete = () => {
    setConfirmOpen(false);
    setToDeleteEntry(null);
  }
  // Handle CSV export
  const handleExportCSV = () => {
    const result = exportToCSV(activityHistory as ActivityHistoryEntry[]);
    setExportStatus({
      show: true,
      success: result.success,
      message: result.message,
    });

    // Hide the message after 4 seconds
    setTimeout(() => {
      setExportStatus((prev) => ({ ...prev, show: false }));
    }, 4000);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Spinner
            size="md"
            variant="primary"
            className="mx-auto mb-4"
            aria-label="Loading"
          />
          {/* <p className="text-gray-600">Loading your dashboard...</p> */}
        </div>
      </div>
    );
  }

  if (!dashboardData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <span className="text-6xl mb-4 block">🌱</span>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Welcome to Carbon Tracker!
          </h2>
          <p className="text-gray-600 mb-6">
            Start tracking your digital activities to see your carbon footprint.
          </p>
          <button
            onClick={() => onNavigate?.("activities")}
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Add Your First Activity
          </button>
        </div>
      </div>
    );
  }

  const equivalentIcons = ["🚗", "📱", "☕", "💡"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Your Carbon Dashboard
          </h1>
          <p className="text-gray-600">
            Track your digital footprint and make a positive impact 🌍
          </p>
          {/* Share Button */}
          <div className="mt-4 flex justify-center">
            <ShareButton
              co2Amount={dashboardData.todayFootprint}
              period="today"
            />
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          <StatCard
            title="Today's Footprint"
            value={formatCO2Amount(dashboardData.todayFootprint)}
            icon="📅"
            color="text-blue-600"
          />
          <StatCard
            title="This Week"
            value={formatCO2Amount(dashboardData.weeklyFootprint)}
            icon="📊"
            color="text-green-600"
          />
          <StatCard
            title="This Month"
            value={formatCO2Amount(dashboardData.monthlyFootprint)}
            icon="📈"
            color="text-purple-600"
          />
        </div>

        {/* Comparison Section */}
        <ComparisonSection dashboardData={dashboardData} />

        {/* Charts Section */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Weekly Breakdown Pie Chart */}
          <FootprintChart
            type="pie"
            data={dashboardData.weeklyBreakdown}
            title="Weekly Activity Breakdown"
          />

          {/* Trend Line Chart */}
          <FootprintChart
            type="line"
            data={{
              labels: dashboardData.trend.map((t) => t.date),
              values: dashboardData.trend.map((t) => t.co2),
            }}
            title="7-Day Trend"
          />
        </div>

        {/* Equivalents Section */}
        {dashboardData.equivalents.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Today&apos;s Impact in Context
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {dashboardData.equivalents
                .slice(0, 4)
                .map((equivalent, index) => (
                  <EquivalentCard
                    key={index}
                    description={equivalent.description}
                    icon={equivalentIcons[index] || "🔄"}
                  />
                ))}
            </div>
          </div>
        )}

        {/* Recent Activities / Activity History */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-gray-900">
              Activity History
            </h3>
            {activityHistory.length > 0 && (
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-700">
                  Sort by:
                </span>
                <div className="relative">
                  <select
                    value={sortPreference}
                    onChange={(e) => onSortChange(e.target.value as SortOption)}
                    className="appearance-none bg-white border border-gray-300 text-gray-700 py-2 pl-3 pr-8 rounded-lg leading-tight focus:outline-none focus:ring-2 focus:ring-green-500 transition-shadow"
                  >
                    {Object.entries(SORT_OPTIONS).map(([key, label]) => (
                      <option key={key} value={key}>
                        {label}
                      </option>
                    ))}
                  </select>
                  {/* Custom chevron/sort icon */}
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 4h18M3 8h18m-6 4h6m-6 4h6M3 16h6m-6 4h6"
                      ></path>
                    </svg>
                  </div>
                </div>
              </div>
            )}
          </div>

          {activityHistory.length > 0 ? (
            <div className="space-y-4">
              {activityHistory.map((entry: any) => (
                <div key={entry.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">
                      {entry.timestamp.toLocaleString()}
                    </span>
                    <span className="font-bold text-green-600">
                      +{formatCO2Amount(entry.result.totalCO2)}
                    </span>
                  </div>

                  <div className="flex items-end justify-between">
                    <div className="flex flex-wrap gap-2">
                      {Object.entries(entry.activities).map(
                        ([activity, value]) =>
                          (value as number) > 0 ? (
                            <span
                              key={activity}
                              className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full"
                            >
                              {activity}: {value as number}
                            </span>
                          ) : null
                      )}
                    </div>

                    {/* delete icon */}
                    <button
                      onClick={() => {handleDeleteClick(entry);}}
                      type="button"
                      className="ml-4 text-sm text-red-600 bg-red-50 px-2 py-1 rounded-md select-none cursor-pointer z-50"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))}
              <ConfirmDialog
                isOpen={confirmOpen}
                title="Delete activity"
                message="Delete this activity? This action cannot be undone."
                confirmText="Delete"
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
              />
            </div>
          ) : (
            // EMPTY STATE FOR ACTIVITY HISTORY
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📊</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No activities yet!
              </h3>
              <p className="text-gray-600 mb-6">
                Add your first activity above to start tracking your carbon
                footprint
              </p>
              <button
                onClick={() => onNavigate?.("activities")}
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium shadow-md hover:shadow-lg"
              >
                📝 Add Your First Activity
              </button>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Quick Actions
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <button
              onClick={() => onNavigate?.("activities")}
              className="flex items-center justify-center space-x-2 p-4 border-2 border-green-200 rounded-lg hover:border-green-400 hover:bg-green-50 transition-all duration-200 hover:scale-105 hover:shadow-md"
            >
              <span className="text-2xl">📝</span>
              <span className="font-bold text-gray-800">Log Activities</span>
            </button>
            <button
              onClick={() => onNavigate?.("goals")}
              className="flex items-center justify-center space-x-2 p-4 border-2 border-blue-200 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-all duration-200 hover:scale-105 hover:shadow-md"
            >
              <span className="text-2xl">🎯</span>
              <span className="font-bold text-gray-800">Set Goals</span>
            </button>
            <button
              onClick={() => onNavigate?.("tips")}
              className="flex items-center justify-center space-x-2 p-4 border-2 border-purple-200 rounded-lg hover:border-purple-400 hover:bg-purple-50 transition-all duration-200 hover:scale-105 hover:shadow-md"
            >
              <span className="text-2xl">💡</span>
              <span className="font-bold text-gray-800">Get Tips</span>
            </button>
            <button
              onClick={handleExportCSV}
              className="flex items-center justify-center space-x-2 p-4 border-2 border-orange-200 rounded-lg hover:border-orange-400 hover:bg-orange-50 transition-all duration-200 hover:scale-105 hover:shadow-md"
            >
              <ArrowDownTrayIcon className="w-6 h-6 text-orange-600" />
              <span className="font-bold text-gray-800">Export Data</span>
            </button>
          </div>
        </div>
      </div>

      {/* Export Status Toast */}
      {exportStatus.show && (
        <div className="fixed top-4 right-4 z-50">
          <div
            className={`px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2 ${
              exportStatus.success
                ? "bg-green-500 text-white"
                : "bg-red-500 text-white"
            }`}
          >
            <span className="text-lg">
              {exportStatus.success ? "✅" : "❌"}
            </span>
            <span className="font-medium">{exportStatus.message}</span>
          </div>
        </div>
      )}
    </div>
  );
}