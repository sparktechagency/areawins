"use client";

import { Button } from "@/components/ui/button";
import {
  Banknote,
  ChevronRight,
  PlusCircle,
  Search,
  Target,
} from "lucide-react";
import Link from "next/link";
import React from "react";

interface Match {
  id: string;
  homeTeam: string;
  awayTeam: string;
  date: string;
  time: string;
  league: string;
  isLive: boolean;
  score?: { home: number | string; away: number | string; time?: string };
  sport: "football" | "cricket" | "basketball" | "volleyball";
  p2pStats?: {
    activeBets: number;
    potAmount: number;
    openBets: number;
    popularOutcome?: string;
  };
}

interface SportMatchCardProps {
  match: Match;
}

export const SportMatchCard: React.FC<SportMatchCardProps> = ({ match }) => {
  // Mock P2P stats if not provided
  const stats = match.p2pStats || {
    activeBets: Math.floor(Math.random() * 20) + 5,
    potAmount: Math.floor(Math.random() * 5000) + 500,
    openBets: Math.floor(Math.random() * 10) + 2,
    popularOutcome: match.homeTeam + " Win",
  };

  return (
    <div className="bg-card rounded-2xl border border-border transition-all hover:bg-muted/5 group overflow-hidden">
      {/* Header Row (League Info) */}
      <div className="bg-muted/20 px-4 py-2 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-3">
          {match.isLive ? (
            <span className="flex items-center gap-1.5 text-[10px] font-black text-rose-500 uppercase bg-rose-500/10 px-2 py-0.5 rounded-full">
              <span className="size-1.5 rounded-full bg-rose-500 animate-pulse"></span>
              Live
            </span>
          ) : (
            <span className="text-[10px] font-black text-muted-foreground uppercase bg-muted/50 px-2 py-0.5 rounded-full">
              {match.time}
            </span>
          )}
          <span className="text-[10px] font-bold text-muted-foreground/80 uppercase tracking-widest">
            {match.league}
          </span>
        </div>
        <div className="hidden md:flex items-center gap-4">
          <span className="text-[10px] font-black text-primary uppercase flex items-center gap-1.5">
            <Target className="size-3" />
            {stats.activeBets} Active Bets
          </span>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center p-4 gap-6">
        {/* Teams & Score Section */}
        <Link
          href={`/matches/${match.sport}/${match.id}`}
          className="flex-1 w-full min-w-0 group/teams"
        >
          <div className="flex items-center gap-4 md:gap-8 justify-between md:justify-start">
            {/* Home Team */}
            <div className="flex flex-col items-center md:items-end gap-1 flex-1">
              <div className="size-10 rounded-full bg-muted border border-border flex items-center justify-center text-lg">
                ⚽
              </div>
              <span className="font-black text-foreground text-sm group-hover/teams:text-primary transition-colors truncate max-w-[120px]">
                {match.homeTeam}
              </span>
            </div>

            {/* Score / VS Area */}
            <div className="flex flex-col items-center gap-1 px-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-black text-primary">
                  {match.score?.home ?? "0"}
                </span>
                <span className="text-lg font-black text-muted-foreground/30 mx-1">
                  :
                </span>
                <span className="text-2xl font-black text-primary">
                  {match.score?.away ?? "0"}
                </span>
              </div>
              {match.score?.time && (
                <span className="text-[10px] font-bold text-rose-500/80 uppercase tracking-tighter">
                  {match.score.time}
                </span>
              )}
            </div>

            {/* Away Team */}
            <div className="flex flex-col items-center md:items-start gap-1 flex-1">
              <div className="size-10 rounded-full bg-muted border border-border flex items-center justify-center text-lg">
                ⚽
              </div>
              <span className="font-black text-foreground text-sm group-hover/teams:text-primary transition-colors truncate max-w-[120px]">
                {match.awayTeam}
              </span>
            </div>
          </div>
        </Link>

        {/* P2P Activity Section */}
        <div className="flex flex-wrap items-center gap-3 md:gap-6 border-t md:border-t-0 md:border-l border-border pt-4 md:pt-0 md:pl-6 w-full md:w-auto">
          <div className="flex flex-col gap-0.5">
            <span className="text-[9px] font-black text-muted-foreground uppercase tracking-widest flex items-center gap-1">
              <Banknote className="size-3 text-emerald-500" />
              Market Value
            </span>
            <span className="text-lg font-black text-foreground tracking-tight">
              ${stats.potAmount.toLocaleString()}
            </span>
          </div>

          <div className="flex flex-col gap-0.5">
            <span className="text-[9px] font-black text-muted-foreground uppercase tracking-widest flex items-center gap-1">
              <Search className="size-3 text-blue-500" />
              Open Bets
            </span>
            <span className="text-lg font-black text-foreground tracking-tight">
              {stats.openBets} Available
            </span>
          </div>

          <div className="flex items-center gap-2 ml-auto">
            <Button
              variant="outline"
              size="sm"
              className="h-10 rounded-xl font-black text-[10px] uppercase tracking-widest border-primary/20 hover:bg-primary/5 text-primary gap-2"
              asChild
            >
              <Link href={`/matches/${match.sport}/${match.id}?action=create`}>
                <PlusCircle className="size-3.5" />
                Create
              </Link>
            </Button>
            <Button
              size="sm"
              className="h-10 px-5 rounded-xl bg-primary hover:bg-primary/90 text-white font-black text-[10px] uppercase tracking-widest gap-2"
              asChild
            >
              <Link href={`/matches/${match.sport}/${match.id}`}>
                Browse
                <ChevronRight className="size-3.5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SportMatchCard;
