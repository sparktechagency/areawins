"use client";

import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import React from "react";
import BetSlip from "./BetSlip";
import SportsMatchesSidebar from "./SportsMatchesSidebar";

interface MatchesLayoutWrapperProps {
  children: React.ReactNode;
}
const MatchesLayoutWrapper = ({ children }: MatchesLayoutWrapperProps) => {
  const pathname = usePathname();
  const isMainMatchesPage = pathname === "/matches" || pathname === "/matches/";
  // Match details pages like /matches/football/1 (3 segments after matches)
  const isMatchDetailsPage =
    pathname.split("/").filter(Boolean).length === 3 &&
    pathname.startsWith("/matches");
  const showLeftSidebar = !isMainMatchesPage && !isMatchDetailsPage;

  return (
    <div className="w-full bg-background min-h-screen pt-20">
      <div className="container mx-auto px-4 py-6">
        <div
          className={cn(
            "grid gap-6",
            showLeftSidebar
              ? "grid-cols-1 lg:grid-cols-[280px_1fr] xl:grid-cols-[280px_1fr_320px]"
              : "grid-cols-1 xl:grid-cols-[1fr_320px]"
          )}
        >
          {/* Left Sidebar - Only on Sport Category Pages, NOT on Main or Match Details */}
          {showLeftSidebar && (
            <aside className="hidden lg:block">
              <SportsMatchesSidebar />
            </aside>
          )}

          {/* Main Content */}
          <main className="w-full min-w-0">{children}</main>

          {/* Right Sidebar - Bet Slip (Always visible on desktop) */}
          <aside className="hidden xl:block">
            <BetSlip />
          </aside>
        </div>
      </div>
    </div>
  );
};

export default MatchesLayoutWrapper;
