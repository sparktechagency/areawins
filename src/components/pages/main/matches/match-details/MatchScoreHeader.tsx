"use client";

import { MatchInfo } from "@/interfaces/match.interface";
import { renderSportScore } from "@/lib/sport-utils";
import { Trophy } from "lucide-react";
import React from "react";

interface MatchScoreHeaderProps {
  match: MatchInfo;
  tournamentName: string;
  homeTeamName: string;
  awayTeamName: string;
  venue: string;
}

const MatchScoreHeader: React.FC<MatchScoreHeaderProps> = ({
  match,
  tournamentName,
  homeTeamName,
  awayTeamName,
  venue,
}) => {
  return (
    <div className="bg-card rounded-xl p-6 sm:p-8 border border-border overflow-hidden relative shadow-sm">
      <div className="absolute top-0 right-0 size-80 bg-primary/5 blur-[120px] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center gap-6 sm:gap-8">
        <div className="flex flex-col items-center gap-1.5">
          <div className="flex items-center gap-2 px-4 py-1.5 bg-primary/10 rounded-full border border-primary/20">
            <Trophy className="size-3.5 text-primary" />
            <span className="text-[10px] sm:text-[11px] font-black text-primary uppercase tracking-[0.2em]">
              {tournamentName}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 sm:gap-4 md:gap-24 w-full max-w-4xl px-0 sm:px-4">
          <div className="flex flex-col items-center gap-3 sm:gap-5">
            <div className="size-16 xs:size-20 sm:size-24 md:size-32 rounded-full p-2 bg-muted flex items-center justify-center text-3xl sm:text-4xl md:text-6xl border-2 sm:border-4 border-card shadow-inner">
              {typeof match.sport === "string" ? "🏅" : match.sport.icon}
            </div>
            <span className="text-sm sm:text-xl md:text-3xl font-black text-foreground text-center line-clamp-2 uppercase tracking-tight">
              {homeTeamName}
            </span>
          </div>

          <div className="flex flex-col items-center gap-1 sm:gap-2 pt-2 sm:pt-4">
            {renderSportScore(match, "detailed")}
            <div className="text-[8px] sm:text-[10px] text-muted-foreground font-black uppercase tracking-widest flex items-center gap-1 sm:gap-2 mt-2 sm:mt-4 whitespace-nowrap opacity-70">
              <span className="hidden xs:inline-block size-1 rounded-full bg-muted-foreground/30" />
              {venue}
              <span className="hidden xs:inline-block size-1 rounded-full bg-muted-foreground/30" />
            </div>
          </div>

          <div className="flex flex-col items-center gap-3 sm:gap-5">
            <div className="size-16 xs:size-20 sm:size-24 md:size-32 rounded-full p-2 bg-muted flex items-center justify-center text-3xl sm:text-4xl md:text-6xl border-2 sm:border-4 border-card shadow-inner">
              {typeof match.sport === "string" ? "🏅" : match.sport.icon}
            </div>
            <span className="text-sm sm:text-xl md:text-3xl font-black text-foreground text-center line-clamp-2 uppercase tracking-tight">
              {awayTeamName}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchScoreHeader;
