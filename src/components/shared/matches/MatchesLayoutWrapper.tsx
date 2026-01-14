"use client";

import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import React from "react";
import RightMarketSidebar from "./RightMarketSidebar";
import SportsMatchesSidebar from "./SportsMatchesSidebar";

interface MatchesLayoutWrapperProps {
  children: React.ReactNode;
  leftSidebar?: React.ReactNode;
  rightSidebar?: React.ReactNode;
  hideLeftSidebar?: boolean;
  hideRightSidebar?: boolean;
}

const MatchesLayoutWrapper = ({
  children,
  leftSidebar,
  rightSidebar,
  hideLeftSidebar = false,
  hideRightSidebar = false,
}: MatchesLayoutWrapperProps) => {
  const pathname = usePathname();

  // Logic from previous version to show/hide dynamic bars
  const isMainMatchesPage = pathname === "/matches" || pathname === "/matches/";
  const isMatchDetailsPage =
    pathname.split("/").filter(Boolean).length === 3 &&
    pathname.startsWith("/matches");

  const showLeft =
    !hideLeftSidebar && !isMainMatchesPage && !isMatchDetailsPage;
  const showRight = !hideRightSidebar;

  return (
    <div className="w-full bg-background min-h-screen pt-20 transition-all duration-300">
      <div className="container mx-auto px-4 py-6">
        <div
          className={cn(
            "grid gap-8",
            // 3 Columns: [280px_1fr_320px]
            // 2 Columns (No Left): [1fr_320px]
            // 2 Columns (No Right): [280px_1fr]
            // 1 Column: [1fr]
            (showLeft || leftSidebar) && showRight
              ? "grid-cols-1 lg:grid-cols-[280px_1fr] xl:grid-cols-[280px_1fr_320px]"
              : (showLeft || leftSidebar) && !showRight
              ? "grid-cols-1 lg:grid-cols-[280px_1fr]"
              : !(showLeft || leftSidebar) && showRight
              ? "grid-cols-1 xl:grid-cols-[1fr_320px]"
              : "grid-cols-1"
          )}
        >
          {/* Left Sidebar */}
          {(showLeft || leftSidebar) && (
            <aside className="hidden lg:block">
              <div className="sticky top-24">
                {leftSidebar || <SportsMatchesSidebar />}
              </div>
            </aside>
          )}

          {/* Main Content */}
          <main className="w-full min-w-0">{children}</main>

          {/* Right Sidebar */}
          {showRight && (
            <aside className="hidden xl:block">
              {rightSidebar || <RightMarketSidebar />}
            </aside>
          )}
        </div>
      </div>
    </div>
  );
};

export default MatchesLayoutWrapper;
