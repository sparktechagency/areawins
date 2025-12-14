"use client";

import DashboardLayout from "@/components/layouts/DashboardLayout";
import SportsBettingInterface from "@/components/pages/sports/SportsBettingInterface";
import { useParams } from "next/navigation";

export default function SportPage() {
  const params = useParams();
  const sport = (params?.sport as string) || "football";

  return (
    <DashboardLayout>
       <div className="max-w-[1600px] mx-auto">
          <SportsBettingInterface sport={sport} />
       </div>
    </DashboardLayout>
  );
}
