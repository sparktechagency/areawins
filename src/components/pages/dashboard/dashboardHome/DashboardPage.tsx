"use client";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import DashboardGreeting from "./DashboardGreeting";
import ProfitLossChart from "./ProfitLossChart";
import QuickActions from "./QuickActions";
import RecentBetsTable from "./RecentBetsTable";
import StatsOverview from "./StatsOverview";

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="w-full mx-auto md:pr-4">
        {/* Greeting Section */}
        <DashboardGreeting />

        {/* Stats Overview Grid */}
        <StatsOverview />

        <div className="flex flex-col lg:flex-row gap-6">
           {/* Left Column: Quick Actions and potentially more widgets */}
           <div className="flex-1">
              <QuickActions />
           </div>
           
           {/* Right Column: Profit & Loss Chart */}
           <div className="lg:w-96">
              <ProfitLossChart />
           </div>
        </div>

        {/* Recent Bets Table */}
        <RecentBetsTable />
      </div>
    </DashboardLayout>
  );
}
