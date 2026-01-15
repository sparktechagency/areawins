"use client";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Banknote,
  BarChart3,
  ChevronLeft,
  PlusCircle,
  Search,
  Share2,
  Star,
  Target,
  Trophy,
} from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import CreateBetModal from "./CreateBetModal";
import MatchedBetCard from "./MatchedBetCard";

import {
  getOutcomeStats,
  MOCK_MATCH,
  MOCK_MATCHED_BETS,
} from "@/data/match-details.data";
import { MarketCategory } from "@/interfaces/betting.interface";
import {
  MatchDetailsContentProps,
  MatchInfo,
} from "@/interfaces/match.interface";

const MatchDetailsContent: React.FC<MatchDetailsContentProps> = ({
  sport,
  id,
}) => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const searchParams = useSearchParams();

  // Use Mock Match Data from external file
  const match: MatchInfo = useMemo(
    () => ({
      ...MOCK_MATCH,
      id: id,
    }),
    [id]
  );

  useEffect(() => {
    if (searchParams.get("action") === "create") {
      const timer = setTimeout(() => setIsCreateModalOpen(true), 0);
      return () => clearTimeout(timer);
    }
  }, [searchParams]);

  // Dynamic Market Categories based on Sport
  const marketCategories: MarketCategory[] = useMemo(() => {
    return getOutcomeStats(sport, match);
  }, [sport, match]);

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
    <div className="w-full space-y-8">
      {/* Navigation Header */}
      <div className="flex items-center justify-between">
        <Link
          href={`/matches/${sport}`}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group"
        >
          <div className="size-8 rounded-full border border-border flex items-center justify-center group-hover:bg-muted transition-colors">
            <ChevronLeft className="size-4" />
          </div>
          <span className="font-black text-xs uppercase tracking-widest">
            Back to {sport}
          </span>
        </Link>
        <div className="flex items-center gap-3">
          <button className="size-10 rounded-lg border border-border flex items-center justify-center hover:bg-muted transition-all text-muted-foreground hover:text-foreground cursor-pointer">
            <Star className="size-5" />
          </button>
          <button className="size-10 rounded-lg border border-border flex items-center justify-center hover:bg-muted transition-all text-muted-foreground hover:text-foreground cursor-pointer">
            <Share2 className="size-5" />
          </button>
        </div>
      </div>

      {/* Match Score Display */}
      <div className="bg-card rounded-lg p-8 border border-border overflow-hidden relative">
        <div className="absolute top-0 right-0 size-80 bg-primary/5 blur-[120px] pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center gap-8">
          <div className="flex flex-col items-center gap-1.5">
            <div className="flex items-center gap-2 px-4 py-1.5 bg-primary/10 rounded-full border border-primary/20">
              <Trophy className="size-3.5 text-primary" />
              <span className="text-[11px] font-black text-primary uppercase tracking-[0.2em]">
                {match.league}
              </span>
            </div>
            <span className="text-[10px] text-muted-foreground font-black mt-2 uppercase tracking-widest flex items-center gap-2">
              <span className="size-1 rounded-full bg-muted-foreground/30" />
              {match.venue}
              <span className="size-1 rounded-full bg-muted-foreground/30" />
            </span>
          </div>

          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 md:gap-24 w-full max-w-4xl px-4">
            <div className="flex flex-col items-center gap-5">
              <div className="relative size-24 md:size-32 rounded-full p-2 bg-muted overflow-hidden border-4 border-card group">
                <div className="absolute inset-0 bg-primary/10 flex items-center justify-center text-5xl">
                  ⚽
                </div>
              </div>
              <h2 className="text-xl md:text-3xl font-black text-foreground text-center tracking-tight">
                {match.homeTeam}
              </h2>
            </div>

            <div className="flex flex-col items-center gap-4">
              <div className="flex items-center gap-6">
                <span className="text-6xl md:text-8xl font-black text-foreground">
                  {match.score.home}
                </span>
                <span className="text-4xl md:text-6xl font-black text-muted-foreground/10">
                  :
                </span>
                <span className="text-6xl md:text-8xl font-black text-foreground">
                  {match.score.away}
                </span>
              </div>
              <div className="flex items-center gap-2.5 px-5 py-2 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-500 text-[11px] font-black uppercase tracking-[0.3em]">
                <span className="size-2 rounded-full bg-rose-500 animate-pulse" />
                {match.time}
              </div>
            </div>

            <div className="flex flex-col items-center gap-5">
              <div className="relative size-24 md:size-32 rounded-full p-2 bg-muted overflow-hidden border-4 border-card group">
                <div className="absolute inset-0 bg-primary/10 flex items-center justify-center text-5xl">
                  ⚽
                </div>
              </div>
              <h2 className="text-xl md:text-3xl font-black text-foreground text-center tracking-tight">
                {match.awayTeam}
              </h2>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Content Tabs */}
      <Tabs defaultValue="market" className="w-full">
        <TabsList className="bg-transparent border border-border w-full justify-start h-auto p-1.5 rounded-lg gap-2 overflow-x-auto no-scrollbar">
          <TabsTrigger
            value="market"
            className="rounded-lg border-transparent data-[state=active]:border-primary data-[state=active]:bg-primary data-[state=active]:text-white px-8 py-3 text-xs font-black text-muted-foreground uppercase tracking-widest transition-all cursor-pointer flex gap-2 items-center"
          >
            <BarChart3 className="size-4" />
            Market Insights
          </TabsTrigger>
          <TabsTrigger
            value="open"
            className="rounded-lg border-transparent data-[state=active]:border-primary data-[state=active]:bg-primary data-[state=active]:text-white px-8 py-3 text-xs font-black text-muted-foreground uppercase tracking-widest transition-all cursor-pointer flex gap-2 items-center"
          >
            <Search className="size-4" />
            Open p2p Bets
            <span className="size-5 rounded-full bg-primary/10 dark:bg-white/10 flex items-center justify-center text-[10px] font-black ml-2">
              {matchedBets.length + 3}
            </span>
          </TabsTrigger>
        </TabsList>

        <div className="mt-8">
          <TabsContent value="market" className="m-0 space-y-12">
            {marketCategories
              .filter((c) => c.marketName === "Match Results")
              .map((category, catIdx) => (
                <div key={catIdx} className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="h-px flex-1 bg-border" />
                    <h3 className="text-[11px] font-black text-primary uppercase tracking-[0.4em] bg-background px-4">
                      {category.marketName}
                    </h3>
                    <div className="h-px flex-1 bg-border" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
                    {category.outcomes.map((stat, idx) => (
                      <div
                        key={idx}
                        className="bg-card rounded-lg p-6 border border-border flex flex-col items-center gap-6 group hover:border-primary/30 transition-all hover:shadow-lg hover:shadow-primary/5"
                      >
                        <div className="flex flex-col items-center gap-2">
                          <span className="text-4xl group-hover:scale-110 transition-transform duration-300">
                            {stat.icon}
                          </span>
                          <h3 className="text-xl font-black text-foreground text-center">
                            {stat.label}
                          </h3>
                        </div>

                        <div className="grid grid-cols-2 gap-4 w-full">
                          <div className="bg-muted/30 p-4 rounded-lg flex flex-col items-center gap-1 border border-border/50">
                            <Target className="size-4 text-primary" />
                            <span className="text-[10px] font-black text-muted-foreground uppercase">
                              {stat.bets} Bets
                            </span>
                            <span className="text-sm font-black text-foreground">
                              Matched
                            </span>
                          </div>
                          <div className="bg-muted/30 p-4 rounded-lg flex flex-col items-center gap-1 border border-border/50">
                            <Banknote className="size-4 text-emerald-500" />
                            <span className="text-[10px] font-black text-muted-foreground uppercase">
                              {stat.open} Open
                            </span>
                            <span className="text-sm font-black text-foreground">
                              ${stat.pot} Pot
                            </span>
                          </div>
                        </div>

                        <div className="flex flex-col w-full gap-3 mt-auto">
                          <Button
                            onClick={() =>
                              handleCreateBetClick(
                                stat.label,
                                category.marketName
                              )
                            }
                            className="w-full h-12 rounded-lg bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest text-[11px]"
                          >
                            <PlusCircle className="size-4 mr-2" />
                            Create Bet
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

            <div className="p-16 text-center bg-muted/20 rounded-lg border border-dashed border-border text-muted-foreground">
              <BarChart3 className="size-12 mx-auto mb-4 opacity-10" />
              <p className="font-black uppercase tracking-widest text-xs">
                Detailed market trends and volume analysis will appear here.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="open" className="m-0 space-y-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-black text-foreground uppercase tracking-wider">
                Available Community Bets
              </h3>
              <Button
                onClick={() => setIsCreateModalOpen(true)}
                size="sm"
                className="rounded-lg font-black text-[10px] uppercase tracking-widest"
              >
                <PlusCircle className="size-3.5 mr-2" />
                Place New Bet
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-6">
              {matchedBets.map((bet, idx) => (
                <MatchedBetCard key={idx} user={bet.user} bet={bet.bet} />
              ))}
            </div>

            {matchedBets.length === 0 && (
              <div className="p-16 text-center bg-muted/20 rounded-lg border border-dashed border-border text-muted-foreground">
                <Search className="size-12 mx-auto mb-4 opacity-10" />
                <p className="font-black uppercase tracking-widest text-xs">
                  No active bets available for this match yet. Be the first to
                  create one!
                </p>
              </div>
            )}
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
          homeTeam: match.homeTeam,
          awayTeam: match.awayTeam,
        }}
        selectedOutcome={selectedMarket?.outcome}
        marketName={selectedMarket?.market}
      />
    </div>
  );
};

export default MatchDetailsContent;
