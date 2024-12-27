import React from "react";
import StatsCards from "./dashboard/StatsCards";
import RevenueChart from "./dashboard/RevenueChart";
import RecentInvoices from "./dashboard/RecentInvoices";

interface HomeProps {
  isCollapsed?: boolean;
}

const Home = ({ isCollapsed = false }: HomeProps) => {
  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
      </div>

      <StatsCards />

      <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">
        <div className="lg:col-span-4">
          <RevenueChart />
        </div>
        <div className="lg:col-span-3">
          <RecentInvoices />
        </div>
      </div>
    </div>
  );
};

export default Home;
