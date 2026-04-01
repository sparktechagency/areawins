"use client";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import React from "react";
import SportsMatchesSidebar from "./SportsMatchesSidebar";

interface MatchesLayoutWrapperProps {
  children: React.ReactNode;
  leftSidebar?: React.ReactNode;
  hideLeftSidebar?: boolean;
}

const MatchesLayoutWrapper = ({
  children,
  leftSidebar,
  hideLeftSidebar = false,
}: MatchesLayoutWrapperProps) => {
  const pathname = usePathname();
  const normalizedPathname = pathname.replace(/^\/(en|es)(?=\/|$)/, "") || "/";

  // Logic from previous version to show/hide dynamic bars
  const isMainMatchesPage =
    normalizedPathname === "/matches" || normalizedPathname === "/matches/";
  const isMatchDetailsPage =
    normalizedPathname.split("/").filter(Boolean).length === 3 &&
    normalizedPathname.startsWith("/matches");

  const showLeft =
    !hideLeftSidebar && !isMainMatchesPage && !isMatchDetailsPage;

  return (
    <div className="w-full min-h-screen pt-20 transition-all duration-300">
      <div className="container mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div
          className={cn(
            "grid gap-8",
            // Only left sidebar
            showLeft || leftSidebar
              ? "grid-cols-1 lg:grid-cols-[280px_1fr]"
              : // No sidebars
                "grid-cols-1",
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
        </div>
      </div>
    </div>
  );
};

export default MatchesLayoutWrapper;
