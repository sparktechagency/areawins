"use client";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import DashboardGreeting from "./DashboardGreeting";
import RecentBetsTable from "./RecentBetsTable";
import StatsOverview from "./StatsOverview";
import ProfitLossChart from "./ProfitLossChart";

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="w-full mx-auto">
        {/* Greeting Section */}
        <DashboardGreeting />

        {/* Stats Overview Cards */}
        <StatsOverview />

        {/* Main Charts Section */}
        <ProfitLossChart />

        {/* Recent Bets Table */}
        <RecentBetsTable />
      </div>
    </DashboardLayout>
  );
}
