"use client";

/**
 * MainLayout Component
 * Main layout with navbar, sports navigation, content area, and betting slip sidebar
 */

import BettingSlip from "@/components/betting/BettingSlip";
import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import SportsNav from "@/components/shared/SportsNav";
import { ReactNode } from "react";

interface MainLayoutProps {
  children: ReactNode;
  showBettingSlip?: boolean;
}

export default function MainLayout({ children, showBettingSlip = true }: MainLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Navbar */}
      <Navbar />

      {/* Sports Navigation */}
      <SportsNav />

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Content Area */}
        <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 py-8">
          {children}
        </main>

        {/* Betting Slip Sidebar - Desktop Only */}
        {showBettingSlip && (
          <aside className="hidden lg:block w-80 sticky top-32 h-fit p-4">
            <BettingSlip />
          </aside>
        )}
      </div>

      {/* Betting Slip - Mobile (Fixed Bottom) */}
      {showBettingSlip && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 p-4 bg-white border-t shadow-lg">
          <BettingSlip />
        </div>
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
}
