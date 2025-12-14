"use client";

/**
 * DashboardLayout Component
 * Main layout for dashboard pages using DashboardSidebar and DashboardHeader
 */

import { ReactNode } from "react";
import DashboardHeader from "./DashboardHeader";
import DashboardSidebar from "./DashboardSidebar";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col lg:flex-row font-sans">
      {/* Sidebar Navigation */}
      <DashboardSidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen transition-all duration-300 ease-in-out w-full lg:w-[calc(100%-16rem)]">
        <DashboardHeader />
        
        <main className="flex-1 p-4 lg:p-8 overflow-y-auto">
           {children}
        </main>
      </div>
    </div>
  );
}
