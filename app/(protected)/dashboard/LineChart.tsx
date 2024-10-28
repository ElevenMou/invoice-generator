"use client";

import { Line } from "react-chartjs-2";

import { CategoryScale, ChartDataset } from "chart.js";
import Chart from "chart.js/auto";
import Card from "@/components/UI/Card";
import { useTheme } from "@/contexts/ThemeContext";

Chart.register(CategoryScale);
const LineChart = ({
  datasets,
}: {
  datasets: ChartDataset<"line", number[]>[];
}) => {
  const { theme } = useTheme();
  return (
    <Card>
      <Line
        datasetIdKey="id"
        data={{
          labels: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ],
          datasets: datasets,
        }}
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: "bottom" as const,
              labels: {
                color: theme === "dark" ? "white" : "black",
              },
            },
            title: {
              display: true,
              text: "Current Year vs Previous Year Revenue",
              color: theme === "dark" ? "white" : "black",
            },
          },
          scales: {
            x: {
              ticks: {
                color: theme === "dark" ? "white" : "black",
              },
              grid: {
                color: "#666",
              },
            },
            y: {
              ticks: {
                color: theme === "dark" ? "white" : "black",
              },
              grid: {
                color: "#666",
              },
              min: 0,
            },
          },
          maintainAspectRatio: false,
        }}
      />
    </Card>
  );
};

export default LineChart;
