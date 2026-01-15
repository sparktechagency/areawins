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
import React, { useMemo } from "react";

import { getMockStats } from "@/data/match.data";
import {
  SportInfo,
  SportMatchCardProps,
  TeamInfo,
  TournamentInfo,
} from "@/interfaces/match.interface";

export const SportMatchCard: React.FC<SportMatchCardProps> = ({ match }) => {
  // Helper to extract names safely
  const getTeamName = (team: string | TeamInfo) =>
    typeof team === "string" ? "Team" : team.name;
  const getSportSlug = (sport: string | SportInfo) =>
    typeof sport === "string" ? "football" : sport.slug;
  const getSportIcon = (sport: string | SportInfo) =>
    typeof sport === "string" ? "⚽" : sport.icon;
  const getTournamentName = (t: string | TournamentInfo | undefined) =>
    typeof t === "string" ? "League" : t?.name ?? "League";

  const homeTeamName = getTeamName(match.homeTeam);
  const awayTeamName = getTeamName(match.awayTeam);
  const sportSlug = getSportSlug(match.sport);
  const sportIcon = getSportIcon(match.sport);
  const tournamentName = getTournamentName(match.tournament);

  const stats = useMemo(() => {
    return getMockStats(match._id, homeTeamName);
  }, [match._id, homeTeamName]);

  const isLive = match.status === "live";

  return (
    <div className="bg-card rounded-lg border border-border transition-all hover:bg-muted/5 group overflow-hidden flex flex-col h-full">
      {/* Header Row (League Info) */}
      <div className="bg-muted/20 px-3 py-1.5 border-b border-border flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2 overflow-hidden">
          {isLive ? (
            <span className="flex items-center gap-1 text-[9px] font-black text-rose-500 uppercase bg-rose-500/10 px-1.5 py-0.5 rounded-full shrink-0">
              <span className="size-1 rounded-full bg-rose-500 animate-pulse"></span>
              Live
            </span>
          ) : (
            <span className="text-[9px] font-black text-muted-foreground uppercase bg-muted/50 px-1.5 py-0.5 rounded-full shrink-0">
              {new Date(match.scheduledStartTime).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          )}
          <span className="text-[10px] font-bold text-muted-foreground/80 uppercase tracking-widest truncate">
            {tournamentName}
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-2 shrink-0">
          <span className="text-[9px] font-black text-primary uppercase flex items-center gap-1">
            <Target className="size-2.5" />
            {stats.activeBets} Active
          </span>
        </div>
      </div>

      <div className="flex flex-col flex-1 p-3 sm:p-4">
        {/* Teams & Score Section */}
        <Link
          href={`/matches/${sportSlug}/${match._id}`}
          className="flex-1 w-full mb-4 group/teams"
        >
          <div className="flex items-center justify-between gap-2 sm:gap-4 h-full">
            {/* Home Team */}
            <div className="flex flex-col items-center gap-1.5 flex-2 min-w-0">
              <div className="size-10 sm:size-12 rounded-full bg-muted border border-border flex items-center justify-center text-xl sm:text-2xl shrink-0">
                {sportIcon}
              </div>
              <span className="font-black text-foreground text-[11px] sm:text-xs text-center group-hover/teams:text-primary transition-colors line-clamp-2 w-full">
                {homeTeamName}
              </span>
            </div>

            {/* Score / VS Area */}
            <div className="flex flex-col items-center gap-1 flex-1 min-w-fit">
              <div className="flex items-center gap-1 px-1 sm:px-2 bg-muted/30 rounded-lg py-1">
                <span className="text-xl sm:text-2xl font-black text-foreground tabular-nums">
                  {match.liveStatus?.homeScore ?? 0}
                </span>
                <span className="text-sm font-black text-muted-foreground/30 mx-0.5">
                  :
                </span>
                <span className="text-xl sm:text-2xl font-black text-foreground tabular-nums">
                  {match.liveStatus?.awayScore ?? 0}
                </span>
              </div>
              {isLive && match.liveStatus?.minute && (
                <span className="text-[9px] font-black text-rose-500/80 uppercase tracking-tighter animate-pulse">
                  {match.liveStatus.minute}&apos;
                </span>
              )}
            </div>

            {/* Away Team */}
            <div className="flex flex-col items-center gap-1.5 flex-2 min-w-0">
              <div className="size-10 sm:size-12 rounded-full bg-muted border border-border flex items-center justify-center text-xl sm:text-2xl shrink-0">
                {sportIcon}
              </div>
              <span className="font-black text-foreground text-[11px] sm:text-xs text-center group-hover/teams:text-primary transition-colors line-clamp-2 w-full">
                {awayTeamName}
              </span>
            </div>
          </div>
        </Link>

        {/* P2P Activity Section - Compact for cards */}
        <div className="mt-auto space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-muted/20 rounded-lg p-2 border border-border/50">
              <span className="text-[8px] font-black text-muted-foreground uppercase flex items-center gap-1 mb-0.5">
                <Banknote className="size-2.5 text-emerald-500" />
                Pot
              </span>
              <span className="text-xs sm:text-sm font-black text-foreground block">
                ${stats.potAmount.toLocaleString()}
              </span>
            </div>
            <div className="bg-muted/20 rounded-lg p-2 border border-border/50">
              <span className="text-[8px] font-black text-muted-foreground uppercase flex items-center gap-1 mb-0.5">
                <Search className="size-2.5 text-blue-500" />
                Open
              </span>
              <span className="text-xs sm:text-sm font-black text-foreground block">
                {stats.openBets} Bets
              </span>
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="flex-1 h-9 rounded-lg font-black text-[9px] uppercase tracking-widest border-primary/20 hover:bg-primary/5 text-primary p-0"
              asChild
            >
              <Link href={`/matches/${sportSlug}/${match._id}?action=create`}>
                <PlusCircle className="size-3" />
                Create
              </Link>
            </Button>
            <Button
              size="sm"
              className="flex-1 h-9 rounded-lg bg-primary hover:bg-primary/90 text-white font-black text-[9px] uppercase tracking-widest p-0"
              asChild
            >
              <Link href={`/matches/${sportSlug}/${match._id}`}>
                Browse
                <ChevronRight className="size-3" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SportMatchCard;
