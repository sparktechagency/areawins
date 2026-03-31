"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, ChevronLeft, Search, Share2, Star, Activity } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import CreateBetModal from "./CreateBetModal";
import { useGetMatchByIdQuery } from "@/lib/redux/api/matchApi";
import { Skeleton } from "@/components/ui/skeleton";

import MarketInsightsTab from "./MarketInsightsTab";
import MatchScoreHeader from "./MatchScoreHeader";
import OpenBetsTab from "./OpenBetsTab";

interface MatchDetailsContentProps {
  sport: string;
  id: string;
}

const MatchDetailsContent: React.FC<MatchDetailsContentProps> = ({
  sport,
  id,
}) => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const searchParams = useSearchParams();

  const { data: matchResponse, isLoading, isError } = useGetMatchByIdQuery(id);
  const match = matchResponse?.data;

  useEffect(() => {
    if (searchParams.get("action") === "create") {
      const timer = setTimeout(() => setIsCreateModalOpen(true), 0);
      return () => clearTimeout(timer);
    }
  }, [searchParams]);

  const [selectedMarket, setSelectedMarket] = useState<{
    outcome: string;
    market: string;
    outcomeId: string;
  } | null>(null);

  // Mapping availableBetTypes to MarketCategory format
  const marketCategories = useMemo(() => {
    if (!match?.availableBetTypes) return [];

    return (match.availableBetTypes as Array<{
      name: string;
      slug: string;
      outcomes: Array<{
        outcomeId: string;
        label: string;
        description: string;
      }>;
    }>).map((bt) => ({
      marketName: bt.name,
      slug: bt.slug,
      outcomes: bt.outcomes.map((oc) => ({
        id: oc.outcomeId,
        label: oc.label,
        description: oc.description,
        // Adding required fields from OutcomeStat interface
        icon: "🎯", 
        bets: Math.floor(Math.random() * 20) + 5,
        pot: Math.floor(Math.random() * 2000) + 500,
        open: 1,
        // Visualization fields
        trend: (Math.random() > 0.5 ? "up" : "down") as "up" | "down",
        probability: Math.floor(Math.random() * 40) + 20,
        volume: Math.floor(Math.random() * 5000) + 1000,
      })),
    }));
  }, [match]);

  const handleCreateBetClick = (outcome: string, marketName: string, outcomeId?: string) => {
    setSelectedMarket({ outcome, market: marketName, outcomeId: outcomeId || outcome });
    setIsCreateModalOpen(true);
  };

  if (isLoading) {
    return (
      <div className="w-full space-y-8 pb-10">
        <Skeleton className="h-10 w-40 rounded-md" />
        <Skeleton className="h-64 w-full rounded-md" />
        <div className="space-y-4">
          <Skeleton className="h-12 w-full rounded-md" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Skeleton className="h-40 w-full rounded-md" />
            <Skeleton className="h-40 w-full rounded-md" />
          </div>
        </div>
      </div>
    );
  }

  if (isError || !match) {
    return (
      <div className="flex flex-col items-center justify-center py-24 space-y-4 border border-dashed border-border rounded-md bg-muted/10 text-center">
        <Activity className="size-12 text-muted-foreground/30" />
        <div className="space-y-1">
          <h3 className="text-lg font-bold text-foreground">Match Not Found</h3>
          <p className="text-sm text-muted-foreground">This match might have ended or is no longer available.</p>
          <Link href={`/matches/${sport}`} className="inline-block mt-4 text-primary font-bold hover:underline">
            Back to {sport}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6 sm:space-y-8 pb-10">
      {/* Navigation Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link
          href={`/matches/${sport}`}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group"
        >
          <div className="size-8 rounded-md border border-border flex items-center justify-center group-hover:bg-muted transition-colors">
            <ChevronLeft className="size-4" />
          </div>
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wide">
            Back to {sport}
          </span>
        </Link>
        <div className="flex items-center gap-3">
          <button className="size-10 rounded-md border border-border flex items-center justify-center hover:bg-muted transition-all text-muted-foreground hover:text-foreground cursor-pointer shadow-sm active:scale-95">
            <Star className="size-5" />
          </button>
          <button className="size-10 rounded-md border border-border flex items-center justify-center hover:bg-muted transition-all text-muted-foreground hover:text-foreground cursor-pointer shadow-sm active:scale-95">
            <Share2 className="size-5" />
          </button>
        </div>
      </div>

      {/* Match Score Display */}
      <MatchScoreHeader
        match={match}
        tournamentName={match.tournament?.name || "Tournament"}
        homeTeamName={match.homeTeam?.name || "Home Team"}
        awayTeamName={match.awayTeam?.name || "Away Team"}
        venue={match.venue || "Stadium"}
      />

      {/* Detailed Content Tabs */}
      <Tabs defaultValue="market" className="w-full">
        <TabsList className="bg-muted/30 border border-border w-full justify-start h-auto p-1.5 rounded-md gap-2 overflow-x-auto no-scrollbar shadow-inner">
          <TabsTrigger
            value="market"
            className="rounded-md border-transparent data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm px-6 py-3 text-xs font-bold text-muted-foreground transition-all cursor-pointer flex gap-2 items-center shrink-0"
          >
            <BarChart3 className="size-4" />
            Market Insights
          </TabsTrigger>
          <TabsTrigger
            value="open"
            className="rounded-md border-transparent data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm px-6 py-3 text-xs font-bold text-muted-foreground transition-all cursor-pointer flex gap-2 items-center shrink-0"
          >
            <Search className="size-4" />
            Open p2p
            <span className="size-5 rounded-full bg-primary/10 flex items-center justify-center text-[10px] ml-1">
              0
            </span>
          </TabsTrigger>
        </TabsList>

        <div className="mt-8">
          <TabsContent value="market" className="m-0">
            <MarketInsightsTab
              marketCategories={marketCategories}
              onBetClick={handleCreateBetClick}
            />
          </TabsContent>

          <TabsContent value="open" className="m-0">
            <OpenBetsTab
              matchedBets={[]}
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
          homeTeam: match.homeTeam?.name || "",
          awayTeam: match.awayTeam?.name || "",
          sport: match.sport?.name || sport,
        }}
        selectedOutcome={selectedMarket?.outcome}
        marketName={selectedMarket?.market}
      />
    </div>
  );
};

export default MatchDetailsContent;

