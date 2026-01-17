"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, ChevronLeft, Search, Share2, Star } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import CreateBetModal from "./CreateBetModal";

import { getOutcomeStats, MOCK_MATCHED_BETS } from "@/data/match-details.data";
import { MOCK_MATCHES } from "@/data/match.data";

import { MarketCategory } from "@/interfaces/betting.interface";
import {
  MatchDetailsContentProps,
  MatchInfo,
  TeamInfo,
  TournamentInfo,
} from "@/interfaces/match.interface";

import MarketInsightsTab from "./MarketInsightsTab";
import MatchScoreHeader from "./MatchScoreHeader";
import OpenBetsTab from "./OpenBetsTab";

const MatchDetailsContent: React.FC<MatchDetailsContentProps> = ({
  sport,
  id,
}) => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const searchParams = useSearchParams();

  // Helper to extract names safely from populated fields
  const getTeamName = (team: string | TeamInfo) =>
    typeof team === "string" ? "Team" : team.name;
  const getTournamentName = (t: string | TournamentInfo | undefined) =>
    typeof t === "string" ? "League" : t?.name ?? "League";
  const getVenue = (m: MatchInfo) => m.venue || "Stadium";

  // Find Match Data dynamically from our main match data source
  const match: MatchInfo = useMemo(() => {
    const found = MOCK_MATCHES.find((m) => m._id === id);
    if (found) return found;

    // Fallback if not found
    return MOCK_MATCHES[0];
  }, [id]);

  const homeTeamName = getTeamName(match.homeTeam);
  const awayTeamName = getTeamName(match.awayTeam);
  const tournamentName = getTournamentName(match.tournament);
  const venue = getVenue(match);

  // Get the actual sport name from the match object
  const actualSportName =
    typeof match.sport === "string"
      ? match.sport
      : match.sport?.name || "Football";

  useEffect(() => {
    if (searchParams.get("action") === "create") {
      const timer = setTimeout(() => setIsCreateModalOpen(true), 0);
      return () => clearTimeout(timer);
    }
  }, [searchParams]);

  // Dynamic Market Categories based on the ACTUAL sport from match data
  const marketCategories: MarketCategory[] = useMemo(() => {
    return getOutcomeStats(actualSportName, {
      homeTeam: homeTeamName,
      awayTeam: awayTeamName,
    });
  }, [actualSportName, homeTeamName, awayTeamName]);

  const [selectedMarket, setSelectedMarket] = useState<{
    outcome: string;
    market: string;
  } | null>(null);

  const matchedBets = MOCK_MATCHED_BETS;

  const handleCreateBetClick = (outcome: string, marketName: string) => {
    setSelectedMarket({ outcome, market: marketName });
    setIsCreateModalOpen(true);
  };

  return (
    <div className="w-full space-y-6 sm:space-y-8 pb-10">
      {/* Navigation Header */}
      <div className="flex items-center justify-between">
        <Link
          href={`/matches/${sport}`}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group"
        >
          <div className="size-8 rounded-full border border-border flex items-center justify-center group-hover:bg-muted transition-colors">
            <ChevronLeft className="size-4" />
          </div>
          <span className="font-black text-[10px] sm:text-xs uppercase tracking-widest">
            Back to {sport}
          </span>
        </Link>
        <div className="flex items-center gap-3">
          <button className="size-10 rounded-lg border border-border flex items-center justify-center hover:bg-muted transition-all text-muted-foreground hover:text-foreground cursor-pointer shadow-sm active:scale-95">
            <Star className="size-5" />
          </button>
          <button className="size-10 rounded-lg border border-border flex items-center justify-center hover:bg-muted transition-all text-muted-foreground hover:text-foreground cursor-pointer shadow-sm active:scale-95">
            <Share2 className="size-5" />
          </button>
        </div>
      </div>

      {/* Match Score Display */}
      <MatchScoreHeader
        match={match}
        tournamentName={tournamentName}
        homeTeamName={homeTeamName}
        awayTeamName={awayTeamName}
        venue={venue}
      />

      {/* Detailed Content Tabs */}
      <Tabs defaultValue="market" className="w-full">
        <TabsList className="bg-transparent border border-border w-full justify-start h-auto p-1.5 rounded-xl gap-2 overflow-x-auto no-scrollbar shadow-inner">
          <TabsTrigger
            value="market"
            className="rounded-lg border-transparent data-[state=active]:border-primary data-[state=active]:bg-primary data-[state=active]:text-white px-5 sm:px-8 py-3 text-[10px] sm:text-xs font-black text-muted-foreground uppercase tracking-widest transition-all cursor-pointer flex gap-2 items-center shrink-0 whitespace-nowrap"
          >
            <BarChart3 className="size-4" />
            Market Insights
          </TabsTrigger>
          <TabsTrigger
            value="open"
            className="rounded-lg border-transparent data-[state=active]:border-primary data-[state=active]:bg-primary data-[state=active]:text-white px-5 sm:px-8 py-3 text-[10px] sm:text-xs font-black text-muted-foreground uppercase tracking-widest transition-all cursor-pointer flex gap-2 items-center shrink-0 whitespace-nowrap"
          >
            <Search className="size-4" />
            Open p2p
            <span className="size-5 rounded-full bg-primary/10 dark:bg-white/10 flex items-center justify-center text-[9px] font-black ml-1">
              {matchedBets.length + 3}
            </span>
          </TabsTrigger>
        </TabsList>

        <div className="mt-6 sm:mt-8">
          <TabsContent value="market" className="m-0">
            <MarketInsightsTab
              marketCategories={marketCategories}
              onBetClick={handleCreateBetClick}
            />
          </TabsContent>

          <TabsContent value="open" className="m-0">
            <OpenBetsTab
              matchedBets={matchedBets}
              onCreateBetClick={() => setIsCreateModalOpen(true)}
            />
          </TabsContent>
        </div>
      </Tabs>

      <CreateBetModal
        isOpen={isCreateModalOpen}
        onClose={() => {
          setIsCreateModalOpen(false);
          setSelectedMarket(null);
        }}
        match={{
          homeTeam: homeTeamName,
          awayTeam: awayTeamName,
          sport: actualSportName,
        }}
        selectedOutcome={selectedMarket?.outcome}
        marketName={selectedMarket?.market}
      />
    </div>
  );
};

export default MatchDetailsContent;
