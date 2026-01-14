"use client";

import MarketPageContent from "@/components/pages/market/MarketPageContent";
import MarketSidebar from "@/components/pages/market/MarketSidebar";
import MatchesLayoutWrapper from "@/components/shared/matches/MatchesLayoutWrapper";

export default function MarketPage() {
  return (
    <MatchesLayoutWrapper leftSidebar={<MarketSidebar />} hideRightSidebar>
      <MarketPageContent />
    </MatchesLayoutWrapper>
  );
}
