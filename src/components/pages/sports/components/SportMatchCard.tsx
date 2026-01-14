"use client";

import { cn } from "@/lib/utils";
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
  odds: {
    home: number;
    draw?: number;
    away: number;
  };
  markets: number;
  sport: "football" | "cricket" | "basketball" | "volleyball";
}

interface SportMatchCardProps {
  match: Match;
}

const OddBox = ({
  label,
  value,
  highlight,
}: {
  label: string;
  value: number;
  highlight?: boolean;
}) => (
  <div
    className={cn(
      "flex flex-col items-center justify-center flex-1 py-1 px-2 rounded cursor-pointer transition-all border border-transparent hover:border-primary/30",
      highlight
        ? "bg-primary/10 text-primary border-primary/20"
        : "bg-muted/30 text-foreground"
    )}
  >
    <span className="text-[10px] text-muted-foreground mb-0.5 uppercase">
      {label}
    </span>
    <span className="font-bold text-sm">{value.toFixed(2)}</span>
  </div>
);

export const SportMatchCard: React.FC<SportMatchCardProps> = ({ match }) => {
  return (
    <div className="bg-card rounded-lg border border-border transition-all hover:bg-muted/10 group overflow-hidden">
      {/* Header Row (League Info) */}
      <div className="bg-muted/30 px-4 py-1.5 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          {match.isLive ? (
            <span className="flex items-center gap-1.5 text-[10px] font-black text-rose-500 uppercase">
              <span className="size-1.5 rounded-full bg-rose-500 animate-pulse"></span>
              Live
            </span>
          ) : (
            <span className="text-[10px] font-bold text-muted-foreground uppercase">
              {match.time}
            </span>
          )}
          <span className="text-[10px] font-medium text-muted-foreground/80">
            {match.league}
          </span>
        </div>
        <div className="flex gap-8 text-[10px] font-black text-muted-foreground/50 uppercase pr-48">
          <div className="w-20 text-center">1</div>
          <div className="w-20 text-center">X</div>
          <div className="w-20 text-center">2</div>
        </div>
      </div>

      <div className="flex items-center p-3 gap-6">
        {/* Teams & Score Section */}
        <Link
          href={`/matches/${match.sport}/${match.id}`}
          className="flex-1 min-w-0 group/teams"
        >
          <div className="flex flex-col gap-2">
            {/* Home Team */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="size-6 rounded-full bg-muted border border-border shrink-0" />
                <span className="font-bold text-foreground text-sm group-hover/teams:text-primary transition-colors truncate">
                  {match.homeTeam}
                </span>
              </div>
              <span className="font-mono text-xs font-bold text-primary">
                {match.score?.home ?? "0"}
              </span>
            </div>

            {/* Away Team */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="size-6 rounded-full bg-muted border border-border shrink-0" />
                <span className="font-bold text-foreground text-sm group-hover/teams:text-primary transition-colors truncate">
                  {match.awayTeam}
                </span>
              </div>
              <span className="font-mono text-xs font-bold text-primary">
                {match.score?.away ?? "0"}
              </span>
            </div>
          </div>

          {match.score?.time && (
            <div className="mt-2 pl-9 text-[10px] font-bold text-primary/80">
              {match.score.time}
            </div>
          )}
        </Link>

        {/* Odds Section */}
        <div className="flex items-center gap-4 py-1">
          {/* Main 1X2 Section */}
          <div className="flex gap-1">
            <OddBox label="" value={match.odds.home} highlight />
            {match.odds.draw !== undefined && match.odds.draw !== 0 ? (
              <OddBox label="" value={match.odds.draw} />
            ) : (
              <div className="w-16 h-10 bg-muted/20 border border-border/50 rounded flex items-center justify-center">
                <span className="text-muted-foreground/30 text-xs">-</span>
              </div>
            )}
            <OddBox label="" value={match.odds.away} />
          </div>

          {/* Secondary Markets Placeholder */}
          <div className="flex gap-1 opacity-40">
            <div className="w-16 h-10 bg-muted/20 border border-border/50 rounded" />
            <div className="w-16 h-10 bg-muted/20 border border-border/50 rounded" />
            <div className="w-16 h-10 bg-muted/20 border border-border/50 rounded" />
          </div>

          {/* More Markets */}
          <Link
            href={`/matches/${match.sport}/${match.id}`}
            className="flex items-center justify-center w-12 h-10 text-primary hover:bg-primary/5 rounded transition-colors border border-primary/10"
          >
            <span className="text-[10px] font-black underline underline-offset-2">
              +{match.markets}
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SportMatchCard;
