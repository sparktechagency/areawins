import DashboardPage from "@/components/pages/dashboard/dashboardHome/DashboardPage";
import { ProfitLossPeriod } from "@/interfaces/dashboard.interface";
import { getProfitLossChartData } from "@/services/dashboard.service";
import { getMyWallet } from "@/services/wallet.service";

const page = async () => {
  const [statsOverviewData, profitLossData] = await Promise.all([
    getMyWallet(),
    getProfitLossChartData({ period: ProfitLossPeriod.WEEKLY }),
  ]);

  return (
    <DashboardPage
      statsOverviewData={statsOverviewData} 
      profitLossData={profitLossData} 
    />
  );
};

export default page;
