"use client";

import { useMemo } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
} from "chart.js";
import { Line, Pie, Bar } from "react-chartjs-2";
import { ActivityType } from "@/types";
import { ACTIVITY_LABELS, ACTIVITY_EMOJIS } from "@/constants/co2Factors";
import { formatCO2Amount } from "@/lib/calculations/carbonFootprint";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement
);

interface FootprintChartProps {
  type: "line" | "pie" | "bar";
  data: Record<string, number> | { labels: string[]; values: number[] };
  title: string;
  className?: string;
}

const chartColors = [
  "#10B981", // emerald-500
  "#3B82F6", // blue-500
  "#8B5CF6", // violet-500
  "#F59E0B", // amber-500
  "#EF4444", // red-500
  "#EC4899", // pink-500
  "#6B7280", // gray-500
];

export default function FootprintChart({
  type,
  data,
  title,
  className = "",
}: FootprintChartProps) {
  const chartOptions = useMemo(() => {
    const baseOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "bottom" as const,
          labels: {
            usePointStyle: true,
            padding: 20,
            font: {
              size: 12,
            },
          },
        },
        title: {
          display: true,
          text: title,
          font: {
            size: 16,
            weight: 'bold' as const,
          },
          padding: 20,
        },
        tooltip: {
          callbacks: {
            label: (context: {
              parsed: number;
              label: string;
              dataset: { data: number[]; label?: string };
            }) => {
              if (type === "pie") {
                const value = context.parsed;
                const total = context.dataset.data.reduce(
                  (a: number, b: number) => a + b,
                  0
                );
                const percentage = ((value / total) * 100).toFixed(1);
                return `${context.label}: ${formatCO2Amount(
                  value
                )} (${percentage}%)`;
              }
              return `${context.dataset.label}: ${formatCO2Amount(
                context.parsed
              )}`;
            },
          },
        },
      },
    };

    if (type === "line") {
      return {
        ...baseOptions,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: (value: string | number) =>
                formatCO2Amount(Number(value)),
            },
          },
          x: {
            ticks: {
              maxTicksLimit: 7,
            },
          },
        },
      };
    }

    if (type === "bar") {
      return {
        ...baseOptions,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: (value: string | number) =>
                formatCO2Amount(Number(value)),
            },
          },
        },
      };
    }

    return baseOptions;
  }, [type, title]);

  const chartData = useMemo(() => {
    if (type === "pie") {
      return {
        labels: Object.keys(data).map(
          (key) => `${ACTIVITY_EMOJIS[key as ActivityType] || '📊'} ${ACTIVITY_LABELS[key as ActivityType] || key}`
        ),
        datasets: [
          {
            data: Object.values(data),
            backgroundColor: chartColors,
            borderColor: chartColors.map((color) => color + "80"),
            borderWidth: 2,
          },
        ],
      };
    }

    if (type === "line") {
      return {
        labels: data.labels,
        datasets: [
          {
            label: "Daily CO₂ Emissions",
            data: data.values,
            borderColor: chartColors[0],
            backgroundColor: chartColors[0] + "20",
            fill: true,
            tension: 0.4,
            pointBackgroundColor: chartColors[0],
            pointBorderColor: "#ffffff",
            pointBorderWidth: 2,
            pointRadius: 4,
          },
        ],
      };
    }

    if (type === "bar") {
      return {
        labels: Object.keys(data).map(
          (key) => `${ACTIVITY_EMOJIS[key as ActivityType] || '📊'} ${ACTIVITY_LABELS[key as ActivityType] || key}`
        ),
        datasets: [
          {
            label: "CO₂ Emissions",
            data: Object.values(data),
            backgroundColor: chartColors[0] + "80",
            borderColor: chartColors[0],
            borderWidth: 2,
            borderRadius: 4,
          },
        ],
      };
    }

    return data;
  }, [data, type]);

  const ChartComponent = type === "pie" ? Pie : type === "line" ? Line : Bar;

  return (
    <div className={`bg-white rounded-xl shadow-lg p-6 ${className}`}>
      <div className="h-80">
        <ChartComponent data={chartData} options={chartOptions} />
      </div>
    </div>
  );
}
