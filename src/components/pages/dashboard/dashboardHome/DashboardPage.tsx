import DashboardLayout from "@/components/layouts/DashboardLayout";
import DashboardGreeting from "./DashboardGreeting";
import RecentBetsTable from "./RecentBetsTable";
import StatsOverview from "./StatsOverview";
import ProfitLossChart from "./ProfitLossChart";
import { IWalletData } from "@/interfaces/wallet.interface";
import { IProfitLossChartData } from "@/interfaces/dashboard.interface";

interface DashboardPageProps {
  statsOverviewData: IWalletData;
  profitLossData: IProfitLossChartData;
}
export default function DashboardPage({
  statsOverviewData,
  profitLossData,
}: DashboardPageProps) {
  return (
    <DashboardLayout>
      <section className="w-full mx-auto">
        {/* Greeting Section */}
        <DashboardGreeting />

        {/* Stats Overview Cards */}
        <StatsOverview stats={statsOverviewData} />

        {/* Main Charts Section */}
        <ProfitLossChart data={profitLossData} />

        {/* Recent Bets Table */}
        <RecentBetsTable />
      </section>
    </DashboardLayout>
  );
}
