import DashboardPage from "@/components/pages/dashboard/dashboardHome/DashboardPage";
import { getMyWallet } from "@/services/wallet.service";

const page = async () => {
  const [statsOverviewData] = await Promise.all([getMyWallet()]);

  return <DashboardPage statsOverviewData={statsOverviewData} />;
};

export default page;
