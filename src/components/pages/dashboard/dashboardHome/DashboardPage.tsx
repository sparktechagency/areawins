import DashboardLayout from "@/components/layouts/DashboardLayout";
import { IWalletData } from "@/interfaces/wallet.interface";
import DashboardGreeting from "./DashboardGreeting";
import ProfitLossChart from "./ProfitLossChart";
import RecentBetsTable from "./RecentBetsTable";
import StatsOverview from "./StatsOverview";
import { IUser } from "@/interfaces/user.interface";

interface DashboardPageProps {
  user: IUser;
  statsOverviewData: IWalletData;
}
export default function DashboardPage({
  user,
  statsOverviewData,
}: DashboardPageProps) {
  return (
    <DashboardLayout>
      <section className="w-full mx-auto">
        {/* Greeting Section */}
        <DashboardGreeting user={user} />

        {/* Stats Overview Cards */}
        <StatsOverview stats={statsOverviewData} />

        {/* Main Charts Section */}
        <ProfitLossChart />

        {/* Recent Bets Table */}
        <RecentBetsTable />
      </section>
    </DashboardLayout>
  );
}
