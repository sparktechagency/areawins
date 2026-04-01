import DashboardLayout from "@/components/layouts/DashboardLayout";
import DashboardGreeting from "./DashboardGreeting";
import ProfitLossChart from "./ProfitLossChart";
import RecentBetsTable from "./RecentBetsTable";
import StatsOverview from "./StatsOverview";

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <section className="w-full mx-auto">
        {/* Greeting Section */}
        <DashboardGreeting />

        {/* Stats Overview Cards */}
        <StatsOverview />

        {/* Main Charts Section */}
        <ProfitLossChart />

        {/* Recent Bets Table */}
        <RecentBetsTable />
      </section>
    </DashboardLayout>
  );
}
