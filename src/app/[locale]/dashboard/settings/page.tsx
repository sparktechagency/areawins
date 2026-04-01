import SettingsPage from "@/components/pages/dashboard/settings/SettingsPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Settings - AreaWins",
  description: "Manage your account preferences and security settings.",
};

export default function Page() {
  return <SettingsPage />;
}
