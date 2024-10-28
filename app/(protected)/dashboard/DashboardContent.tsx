"use client";

import LineChart from "./LineChart";
import StaticsCard from "./StaticsCard";
import { useEffect, useState } from "react";

const DashboardContent = () => {
  const [data, setData] = useState<IDashboard>();
  const getDashboardData = async () => {
    const dashboardData = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/dashboard`
    );

    if (!dashboardData.ok) {
      throw new Error("Failed to fetch dashboard data");
    }

    const d: IDashboard = await dashboardData.json();

    setData(d);
  };

  useEffect(() => {
    getDashboardData();
  }, []);

  return (
    data && (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <StaticsCard label="Total Revenue" value={data.allTimeRevenue} />
          <StaticsCard
            label="Previous Month Revenue"
            value={data.previousMonthRevenue}
          />
          <StaticsCard
            label="last 90 Days Revenue"
            value={data.last90DaysRevenue}
          />
          <StaticsCard label="Total Invoices" value={data.totalInvoices} />
          <StaticsCard label="Total Clients" value={data.totalClients} />
          <StaticsCard label="Total Companies" value={data.totalCompanies} />
        </div>
        <LineChart
          datasets={[
            {
              label: data.monthlyData[0].year.toFixed(0),
              data: data.monthlyData.slice(0, 12).map((item) => item.revenue),
              borderColor: "#5358e4",
              borderDash: [5, 5],
            },
            {
              label: data.monthlyData[1].year.toFixed(0),
              data: data.monthlyData.slice(12, 24).map((item) => item.revenue),
              borderColor: "#5358e4",
            },
          ]}
        />
      </div>
    )
  );
};

export default DashboardContent;
