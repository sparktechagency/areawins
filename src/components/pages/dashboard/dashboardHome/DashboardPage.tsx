import DashboardLayout from "@/components/layouts/DashboardLayout";
import { IProfitLossChartData } from "@/interfaces/dashboard.interface";
import { IWalletData } from "@/interfaces/wallet.interface";
import DashboardGreeting from "./DashboardGreeting";
import ProfitLossChart from "./ProfitLossChart";
import RecentBetsTable from "./RecentBetsTable";
import StatsOverview from "./StatsOverview";

interface DashboardPageProps {
  statsOverviewData: IWalletData;
  profitLossData: IProfitLossChartData | null;
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
