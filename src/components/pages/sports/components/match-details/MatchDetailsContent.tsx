"use client";

import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronLeft, Info, Share2, Star } from "lucide-react";
import Link from "next/link";
import React from "react";
import MatchedBetCard from "./MatchedBetCard";

interface MatchDetailsContentProps {
  sport: string;
  id: string;
}

const MatchDetailsContent: React.FC<MatchDetailsContentProps> = ({
  sport,
  id,
}) => {
  // Mock Match Data
  const match = {
    id: id,
    homeTeam: "Real Madrid",
    awayTeam: "Barcelona",
    league: "La Liga",
    time: "Live 65'",
    score: { home: 2, away: 1 },
    date: "14 Jan 2026",
  };

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
        selection: "Real Madrid Wins",
        stake: 25.0,
        potentialWin: 45.0,
      },
    },
    {
      user: {
        name: "CuleForLife",
        avatar: "https://i.pravatar.cc/150?u=2",
        trust: 95,
        timeAgo: "15m ago",
      },
      bet: {
        type: "LAYING" as const,
        selection: "Draw",
        stake: 50.0,
        potentialWin: 120.0,
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
        selection: "Over 2.5 Goals",
        stake: 100.0,
        potentialWin: 185.0,
      },
    },
  ];

  return (
    <div className="w-full space-y-6">
      {/* Navigation Header */}
      <div className="flex items-center justify-between">
        <Link
          href={`/matches/${sport}`}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group"
        >
          <div className="size-8 rounded-full border border-border flex items-center justify-center group-hover:bg-muted transition-colors">
            <ChevronLeft className="size-4" />
          </div>
          <span className="font-bold text-sm">Back to Matches</span>
        </Link>
        <div className="flex items-center gap-3">
          <button className="size-10 rounded-xl border border-border flex items-center justify-center hover:bg-muted transition-all text-muted-foreground hover:text-foreground">
            <Star className="size-5" />
          </button>
          <button className="size-10 rounded-xl border border-border flex items-center justify-center hover:bg-muted transition-all text-muted-foreground hover:text-foreground">
            <Share2 className="size-5" />
          </button>
        </div>
      </div>

      {/* Match Score Display */}
      <div className="bg-card rounded-4xl p-8 border border-border overflow-hidden relative shadow-lg">
        {/* Decorative background */}
        <div className="absolute top-0 right-0 size-64 bg-primary/5 blur-[100px] pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center gap-8">
          <div className="flex flex-col items-center gap-1">
            <Badge className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 font-black tracking-widest text-[10px] uppercase px-3 py-1">
              {match.league}
            </Badge>
            <span className="text-xs text-muted-foreground font-bold mt-2 uppercase tracking-tighter">
              {match.date}
            </span>
          </div>

          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 md:gap-16 w-full max-w-3xl">
            {/* Home Team */}
            <div className="flex flex-col items-center md:items-end gap-4">
              <div className="size-20 md:size-24 rounded-full bg-muted border-4 border-card shadow-xl overflow-hidden relative">
                {/* Team placeholder placeholder */}
                <div className="absolute inset-0 bg-primary/10 flex items-center justify-center text-4xl">
                  ⚽
                </div>
              </div>
              <h2 className="text-xl md:text-3xl font-black text-foreground text-center md:text-right">
                {match.homeTeam}
              </h2>
            </div>

            {/* Score & Time */}
            <div className="flex flex-col items-center gap-2">
              <div className="flex items-center gap-4">
                <span className="text-5xl md:text-7xl font-black text-primary drop-shadow-sm">
                  {match.score.home}
                </span>
                <span className="text-4xl md:text-6xl font-black text-muted-foreground/30">
                  :
                </span>
                <span className="text-5xl md:text-7xl font-black text-primary drop-shadow-sm">
                  {match.score.away}
                </span>
              </div>
              <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-500 text-xs font-black uppercase tracking-widest">
                <span className="size-2 rounded-full bg-rose-500 animate-pulse" />
                {match.time}
              </div>
            </div>

            {/* Away Team */}
            <div className="flex flex-col items-center md:items-start gap-4">
              <div className="size-20 md:size-24 rounded-full bg-muted border-4 border-card shadow-xl overflow-hidden relative">
                <div className="absolute inset-0 bg-primary/10 flex items-center justify-center text-4xl">
                  ⚽
                </div>
              </div>
              <h2 className="text-xl md:text-3xl font-black text-foreground text-center md:text-left">
                {match.awayTeam}
              </h2>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <Tabs defaultValue="matched" className="w-full">
        <TabsList className="bg-transparent border-b border-border w-full justify-start h-auto p-0 rounded-none gap-8 overflow-x-auto no-scrollbar">
          <TabsTrigger
            value="market"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-0 pb-4 text-sm font-black text-muted-foreground data-[state=active]:text-foreground uppercase tracking-widest transition-all cursor-pointer"
          >
            All Market
          </TabsTrigger>
          <TabsTrigger
            value="matched"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-0 pb-4 text-sm font-black text-muted-foreground data-[state=active]:text-foreground uppercase tracking-widest transition-all cursor-pointer flex gap-3 items-center"
          >
            All Matched Bets
            <span className="size-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[10px] font-black">
              {matchedBets.length}
            </span>
          </TabsTrigger>
        </TabsList>

        <div className="mt-8">
          <TabsContent value="market" className="m-0 space-y-4">
            <div className="p-12 text-center bg-muted/20 rounded-[32px] border border-dashed border-border text-muted-foreground">
              <Info className="size-8 mx-auto mb-4 opacity-30" />
              <p className="font-bold">
                Market details and odds for match #{match.id} will be displayed
                here.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="matched" className="m-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {matchedBets.map((bet, idx) => (
                <MatchedBetCard key={idx} user={bet.user} bet={bet.bet} />
              ))}
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default MatchDetailsContent;
