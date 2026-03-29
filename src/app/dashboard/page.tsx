import DashboardPage from "@/components/pages/dashboard/dashboardHome/DashboardPage";
import { getMyWallet } from "@/services/wallet.service";

const page = async () => {
  const [statsOverviewData] = await Promise.all([await getMyWallet()]);
  console.log("statsOverviewData", statsOverviewData);
  return <DashboardPage />;
};

export default page;
