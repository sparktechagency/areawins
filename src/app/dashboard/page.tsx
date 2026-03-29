import DashboardPage from "@/components/pages/dashboard/dashboardHome/DashboardPage";
import { getMyProfile } from "@/services/user.service";
import { getMyWallet } from "@/services/wallet.service";

const page = async () => {
  const [user, statsOverviewData] = await Promise.all([
    getMyProfile(),
    getMyWallet(),
  ]);

  return <DashboardPage user={user} statsOverviewData={statsOverviewData} />;
};

export default page;
