"use client";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowUpRight,
  Banknote,
  BarChart3,
  ChevronLeft,
  History,
  PlusCircle,
  Search,
  Share2,
  Star,
  Target,
  Trophy,
} from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import CreateBetModal from "./CreateBetModal";
import MatchedBetCard from "./MatchedBetCard";

interface MatchDetailsContentProps {
  sport: string;
  id: string;
}

const MatchDetailsContent: React.FC<MatchDetailsContentProps> = ({
  sport,
  id,
}) => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Mock Match Data
  const match = {
    id: id,
    homeTeam: "Chelsea",
    awayTeam: "Arsenal",
    league: "Premier League",
    venue: "Stamford Bridge",
    time: "Live 67'",
    score: { home: 1, away: 0 },
    date: "14 Jan 2026",
  };

  const outcomeStats = [
    {
      label: "Chelsea Win",
      bets: 8,
      pot: 3200,
      open: 5,
      icon: "🔵",
    },
    {
      label: "Draw",
      bets: 2,
      pot: 800,
      open: 1,
      icon: "🤝",
    },
    {
      label: "Arsenal Win",
      bets: 3,
      pot: 1100,
      open: 2,
      icon: "🔴",
    },
  ];

  const matchedBets = [
    {
      user: {
        name: "MadridistaKing",
        avatar: "https://i.pravatar.cc/150?u=1",
        trust: 98,
        timeAgo: "2m ago",
      },
      bet: {
        type: "BACKING" as const,
        selection: "Chelsea Win",
        stake: 50.0,
        potentialWin: 125.0,
      },
    },
    {
      user: {
        name: "BetMaster99",
        avatar: "https://i.pravatar.cc/150?u=3",
        trust: 89,
        timeAgo: "1h ago",
      },
      bet: {
        type: "BACKING" as const,
        selection: "Draw",
        stake: 100.0,
        potentialWin: 185.0,
      },
    },
  ];

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
            Back to Matches
          </span>
        </Link>
        <div className="flex items-center gap-3">
          <button className="size-10 rounded-xl border border-border flex items-center justify-center hover:bg-muted transition-all text-muted-foreground hover:text-foreground cursor-pointer">
            <Star className="size-5" />
          </button>
          <button className="size-10 rounded-xl border border-border flex items-center justify-center hover:bg-muted transition-all text-muted-foreground hover:text-foreground cursor-pointer">
            <Share2 className="size-5" />
          </button>
        </div>
      </div>

      {/* Match Score Display */}
      <div className="bg-card rounded-[48px] p-8 border border-border overflow-hidden relative shadow-2xl">
        {/* Decorative background */}
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
            {/* Home Team */}
            <div className="flex flex-col items-center gap-5">
              <div className="relative size-24 md:size-32 rounded-full p-2 bg-muted shadow-2xl overflow-hidden border-4 border-card group">
                <div className="absolute inset-0 bg-primary/10 flex items-center justify-center text-5xl">
                  ⚽
                </div>
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <h2 className="text-xl md:text-3xl font-black text-foreground text-center tracking-tight">
                {match.homeTeam}
              </h2>
            </div>

            {/* Score & Time */}
            <div className="flex flex-col items-center gap-4">
              <div className="flex items-center gap-6">
                <span className="text-6xl md:text-8xl font-black text-foreground drop-shadow-xl">
                  {match.score.home}
                </span>
                <span className="text-4xl md:text-6xl font-black text-muted-foreground/10">
                  :
                </span>
                <span className="text-6xl md:text-8xl font-black text-foreground drop-shadow-xl">
                  {match.score.away}
                </span>
              </div>
              <div className="flex items-center gap-2.5 px-5 py-2 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-500 text-[11px] font-black uppercase tracking-[0.3em] shadow-lg shadow-rose-500/5">
                <span className="size-2 rounded-full bg-rose-500 animate-pulse" />
                {match.time}
              </div>
            </div>

            {/* Away Team */}
            <div className="flex flex-col items-center gap-5">
              <div className="relative size-24 md:size-32 rounded-full p-2 bg-muted shadow-2xl overflow-hidden border-4 border-card group">
                <div className="absolute inset-0 bg-primary/10 flex items-center justify-center text-5xl">
                  ⚽
                </div>
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <h2 className="text-xl md:text-3xl font-black text-foreground text-center tracking-tight">
                {match.awayTeam}
              </h2>
            </div>
          </div>
        </div>
      </div>

      {/* P2P Outcome Boxes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {outcomeStats.map((stat, idx) => (
          <div
            key={idx}
            className="bg-card rounded-[32px] p-6 border border-border shadow-md flex flex-col items-center gap-6 group hover:border-primary/30 transition-all hover:shadow-xl"
          >
            <div className="flex flex-col items-center gap-2">
              <span className="text-4xl">{stat.icon}</span>
              <h3 className="text-xl font-black text-foreground">
                {stat.label}
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-4 w-full">
              <div className="bg-muted/30 p-4 rounded-3xl flex flex-col items-center gap-1 border border-border/50">
                <Target className="size-4 text-primary" />
                <span className="text-[10px] font-black text-muted-foreground uppercase">
                  {stat.bets} Bets
                </span>
                <span className="text-sm font-black text-foreground">
                  Matched
                </span>
              </div>
              <div className="bg-muted/30 p-4 rounded-3xl flex flex-col items-center gap-1 border border-border/50">
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
                onClick={() => setIsCreateModalOpen(true)}
                className="w-full h-12 rounded-2xl bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest text-[11px] shadow-lg shadow-primary/20"
              >
                <PlusCircle className="size-4 mr-2" />
                Create Bet
              </Button>
              <Button
                variant="outline"
                className="w-full h-12 rounded-2xl border-border hover:bg-muted text-muted-foreground hover:text-foreground font-black uppercase tracking-widest text-[11px]"
              >
                <ArrowUpRight className="size-4 mr-2" />
                View {stat.open} Open
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Detailed Content Tabs */}
      <Tabs defaultValue="matched" className="w-full">
        <TabsList className="bg-transparent border border-border w-full justify-start h-auto p-1.5 rounded-2xl gap-2 overflow-x-auto no-scrollbar">
          <TabsTrigger
            value="market"
            className="rounded-xl border-transparent data-[state=active]:border-primary data-[state=active]:bg-primary data-[state=active]:text-white px-8 py-3 text-xs font-black text-muted-foreground uppercase tracking-widest transition-all cursor-pointer flex gap-2 items-center"
          >
            <BarChart3 className="size-4" />
            Market Insights
          </TabsTrigger>
          <TabsTrigger
            value="matched"
            className="rounded-xl border-transparent data-[state=active]:border-primary data-[state=active]:bg-primary data-[state=active]:text-white px-8 py-3 text-xs font-black text-muted-foreground uppercase tracking-widest transition-all cursor-pointer flex gap-2 items-center"
          >
            <History className="size-4" />
            History
            <span className="size-5 rounded-full bg-primary/10 dark:bg-white/10 flex items-center justify-center text-[10px] font-black">
              {matchedBets.length}
            </span>
          </TabsTrigger>
          <TabsTrigger
            value="open"
            className="rounded-xl border-transparent data-[state=active]:border-primary data-[state=active]:bg-primary data-[state=active]:text-white px-8 py-3 text-xs font-black text-muted-foreground uppercase tracking-widest transition-all cursor-pointer flex gap-2 items-center"
          >
            <Search className="size-4" />
            All Open Bets
          </TabsTrigger>
        </TabsList>

        <div className="mt-8">
          <TabsContent value="market" className="m-0 space-y-4">
            <div className="p-16 text-center bg-muted/20 rounded-[40px] border border-dashed border-border text-muted-foreground">
              <BarChart3 className="size-12 mx-auto mb-4 opacity-10" />
              <p className="font-black uppercase tracking-widest text-xs">
                Market depth and chart visualizations will appear here during
                live play.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="matched" className="m-0 transition-all">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {matchedBets.map((bet, idx) => (
                <MatchedBetCard key={idx} user={bet.user} bet={bet.bet} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="open" className="m-0">
            <div className="p-16 text-center bg-muted/20 rounded-[40px] border border-dashed border-border text-muted-foreground">
              <Search className="size-12 mx-auto mb-4 opacity-10" />
              <p className="font-black uppercase tracking-widest text-xs">
                Browse all pending bets from the community.
              </p>
            </div>
          </TabsContent>
        </div>
      </Tabs>

      <CreateBetModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        match={{
          homeTeam: match.homeTeam,
          awayTeam: match.awayTeam,
        }}
      />
    </div>
  );
};

export default MatchDetailsContent;
