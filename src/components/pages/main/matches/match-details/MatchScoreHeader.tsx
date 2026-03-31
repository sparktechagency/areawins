"use client";
import { IMatch } from "@/interfaces/match.interface";
import { renderSportScore } from "@/lib/sport-utils";
import { format, isToday } from "date-fns";
import { Calendar, MapPin, Trophy } from "lucide-react";
import Image from "next/image";
import React from "react";

interface MatchScoreHeaderProps {
  match: IMatch;
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
  const homeLogo =
    typeof match.homeTeam !== "string" ? match.homeTeam?.logo : null;
  const awayLogo =
    typeof match.awayTeam !== "string" ? match.awayTeam?.logo : null;

  return (
    <div className="bg-card rounded-md p-4 sm:p-8 border border-border overflow-hidden relative shadow-sm">
      <div className="absolute top-0 right-0 size-80 bg-primary/5 blur-[120px] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center gap-6 sm:gap-8">
        <div className="flex flex-col items-center gap-1.5 w-full">
          <div className="flex items-center gap-2 px-3 py-1 sm:px-4 sm:py-1.5 bg-primary/10 rounded-md border border-primary/20 max-w-full">
            <Trophy className="size-3.5 text-primary shrink-0" />
            <span className="text-[9px] sm:text-[11px] font-bold text-primary tracking-widest truncate">
              {tournamentName}
            </span>
          </div>
        </div>

        {/* Global 3-Column Grid for all devices */}
        <div className="grid grid-cols-3 items-center gap-2 sm:gap-4 md:gap-24 w-full max-w-4xl px-0">
          {/* Home Team */}
          <div className="flex flex-col items-center gap-2 sm:gap-5">
            <div className="size-12 xs:size-16 sm:size-24 md:size-32 rounded-full p-1 sm:p-2 bg-muted flex items-center justify-center border-2 sm:border-4 border-card shadow-inner overflow-hidden shrink-0">
              {homeLogo ? (
                <Image
                  src={homeLogo}
                  alt={homeTeamName}
                  width={128}
                  height={128}
                  className="size-full object-contain"
                />
              ) : (
                <span className="text-xl sm:text-4xl md:text-6xl">
                  {typeof match.sport === "string" ? "🏅" : match.sport.icon}
                </span>
              )}
            </div>
            <span className="text-[10px] sm:text-lg md:text-3xl font-bold text-foreground text-center line-clamp-2  tracking-tight">
              {homeTeamName}
            </span>
          </div>

          {/* Center: Score / Status / Venue */}
          <div className="flex flex-col items-center gap-1 sm:gap-2">
            <div className="scale-[0.8] xs:scale-[0.9] sm:scale-100 origin-center">
              {renderSportScore(match, "detailed")}
            </div>

            {!match.isLive && (
              <div className="flex flex-col items-center gap-1 mt-2 sm:mt-4">
                <div className="text-[7px] sm:text-[10px] text-muted-foreground  tracking-widest flex items-center justify-center gap-1 opacity-70 w-full">
                  <MapPin className="size-2 sm:size-2.5" />
                  <span className="truncate text-center max-w-[80px] xs:max-w-[120px] sm:max-w-none">
                    {venue}
                  </span>
                </div>
                <div className="text-[7px] sm:text-[10px] text-primary  uppercase tracking-widest flex items-center justify-center gap-1 w-full">
                  <Calendar className="size-2 sm:size-2.5" />
                  <span>
                    {match.scheduledStartTime
                      ? isToday(new Date(match.scheduledStartTime))
                        ? "Today"
                        : format(
                            new Date(match.scheduledStartTime),
                            "dd MMM, yyyy",
                          )
                      : "TBD"}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Away Team */}
          <div className="flex flex-col items-center gap-2 sm:gap-5">
            <div className="size-12 xs:size-16 sm:size-24 md:size-32 rounded-full p-1 sm:p-2 bg-muted flex items-center justify-center border-2 sm:border-4 border-card shadow-inner overflow-hidden shrink-0">
              {awayLogo ? (
                <Image
                  src={awayLogo}
                  alt={awayTeamName}
                  width={128}
                  height={128}
                  className="size-full object-contain"
                />
              ) : (
                <span className="text-xl sm:text-4xl md:text-6xl">
                  {typeof match.sport === "string" ? "🏅" : match.sport.icon}
                </span>
              )}
            </div>
            <span className="text-[10px] sm:text-lg md:text-3xl font-bold text-foreground text-center line-clamp-2 tracking-tight">
              {awayTeamName}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchScoreHeader;
