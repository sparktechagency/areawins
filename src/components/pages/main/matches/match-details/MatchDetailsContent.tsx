"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MarketCategory } from "@/interfaces/betting.interface";
import { Activity, BarChart3, ChevronLeft, Search } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import CreateBetModal from "./CreateBetModal";
import { MatchDetailsSkeleton } from "@/components/skeleton/MatchDetailsSkeleton";
import MarketInsightsTab from "./MarketInsightsTab";
import MatchScoreHeader from "./MatchScoreHeader";
import OpenBetsTab from "./OpenBetsTab";
import { useGetMatchByIdQuery } from "@/redux/api/matchApi";

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
    marketId: string;
    outcomeId: string;
  } | null>(null);

  // Mapping availableBetTypes to MarketCategory format
  const marketCategories = useMemo((): MarketCategory[] => {
    if (!match?.availableBetTypes) return [];

    // Helper to replace generic terms with actual team names
    const getDynamicLabel = (label: string) => {
      const homeName = match?.homeTeam?.name || "Home Team";
      const awayName = match?.awayTeam?.name || "Away Team";

      return label
        .replace(/\bHome Team\b/gi, homeName)
        .replace(/\bAway Team\b/gi, awayName)
        .replace(/\bHome\b/gi, homeName)
        .replace(/\bAway\b/gi, awayName)
        .replace(/\bTeam A\b/gi, homeName)
        .replace(/\bTeam B\b/gi, awayName);
    };

    return (
      match.availableBetTypes as Array<{
        _id: string;
        name: string;
        slug: string;
        outcomes: Array<{
          outcomeId: string;
          label: string;
          description: string;
        }>;
      }>
    ).map((bt) => ({
      marketId: bt._id,
      marketName: bt.name,
      slug: bt.slug,
      outcomes: bt.outcomes.map((oc) => ({
        id: oc.outcomeId,
        label: getDynamicLabel(oc.label),
        description: oc.description,
        // Visualization fields
        trend: (Math.random() > 0.5 ? "up" : "down") as "up" | "down",
        probability: Math.floor(Math.random() * 40) + 20,
        volume: Math.floor(Math.random() * 5000) + 1000,
      })),
    }));
  }, [match]);

  const handleCreateBetClick = (
    outcome: string,
    marketName: string,
    marketId: string,
    outcomeId?: string,
  ) => {
    setSelectedMarket({
      outcome,
      market: marketName,
      marketId,
      outcomeId: outcomeId || outcome,
    });
    setIsCreateModalOpen(true);
  };

  if (isLoading) {
    return <MatchDetailsSkeleton />;
  }

  if (isError || !match) {
    return (
      <div className="flex flex-col items-center justify-center py-24 space-y-4 border border-dashed border-border rounded-md bg-muted/10 text-center">
        <Activity className="size-12 text-muted-foreground/30" />
        <div className="space-y-1">
          <h3 className="text-lg font-bold text-foreground">Match Not Found</h3>
          <p className="text-sm text-muted-foreground">
            This match might have ended or is no longer available.
          </p>
          <Link
            href={`/matches/${sport}`}
            className="inline-block mt-4 text-primary font-bold hover:underline"
          >
            Back to {sport}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6 sm:space-y-8 pb-10">
      {/* Navigation Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <Link
          href={`/matches/${sport}`}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group w-fit"
        >
          <div className="size-8 rounded-md border border-border flex items-center justify-center group-hover:bg-muted transition-colors">
            <ChevronLeft className="size-4" />
          </div>
          <span className="text-[10px] sm:text-xs  uppercase tracking-widest">
            Back to {sport}
          </span>
        </Link>

        <div className="flex items-center gap-3">
          {/* Liquidity Indicator */}
          <div className="hidden xs:flex items-center gap-3 px-4 py-2 bg-muted/30 border border-border rounded-md">
            <div className="flex flex-col">
              <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-tight">
                Total Liquidity
              </span>
              <span className="text-sm  text-primary">
                ${(match.totalBetsAmount || 0).toLocaleString()}
              </span>
            </div>
            <div className="w-px h-6 bg-border" />
            <div className="flex flex-col">
              <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-tight">
                Active Markets
              </span>
              <span className="text-sm  text-foreground">
                {match.availableBetTypes?.length || 0}
              </span>
            </div>
          </div>

          {/* Status Badge */}
          <div
            className={`px-4 py-2 rounded-md border flex items-center gap-2 h-11 ${
              match.isLive
                ? "bg-rose-500/5 border-rose-500/20 text-rose-500"
                : "bg-emerald-500/5 border-emerald-500/20 text-emerald-500"
            }`}
          >
            <span className="relative flex h-2 w-2">
              <span
                className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${match.isLive ? "bg-rose-400" : "bg-emerald-400"}`}
              ></span>
              <span
                className={`relative inline-flex rounded-full h-2 w-2 ${match.isLive ? "bg-rose-500" : "bg-emerald-500"}`}
              ></span>
            </span>
            <span className="text-[11px]  uppercase tracking-widest">
              {match.isLive
                ? "Live Now"
                : match.status === "scheduled"
                  ? "Scheduled"
                  : match.status}
            </span>
          </div>
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
          id: match._id,
          homeTeam: match.homeTeam?.name || "",
          awayTeam: match.awayTeam?.name || "",
          sport: match.sport?.name || sport,
        }}
        selectedOutcome={selectedMarket?.outcome}
        marketName={selectedMarket?.market}
        marketId={selectedMarket?.marketId}
        marketOutcomes={marketCategories}
      />
    </div>
  );
};

export default MatchDetailsContent;
