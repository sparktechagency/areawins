"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { IMatch } from "@/interfaces/match.interface";
import { format, isToday } from "date-fns";
import { Calendar, ChevronRight, Clock, Trophy } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface SportMatchCardProps {
  match: IMatch;
  onDelete?: (id: string) => void;
}

const SportMatchCard: React.FC<SportMatchCardProps> = ({ match }) => {
  const isLive = match.isLive || match.status === "live";

  return (
    <div className="bg-card rounded-md border border-border overflow-hidden hover:border-primary/30 transition-all group flex flex-col shadow-sm hover:shadow-xl hover:shadow-primary/5 active:scale-[0.99]">
      {/* Card Header (Tournament) */}
      <div className="bg-muted/10 px-5 py-4 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative size-6 shrink-0 bg-background rounded-full p-1 border border-border">
            {match.tournament?.logo ? (
              <Image
                src={match.tournament.logo}
                alt={match.tournament.name}
                fill
                className="object-contain p-0.5"
              />
            ) : (
              <Trophy className="size-3 text-primary" />
            )}
          </div>
          <span className="text-[11px] font-bold text-muted-foreground tracking-wide truncate max-w-[150px]">
            {match.tournament?.name}
          </span>
        </div>
        {isLive ? (
          <Badge className="bg-red-500/10 text-red-500 border-red-500/20 px-2.5 py-0.5 text-[10px] font-bold flex gap-1.5 items-center">
            <span className="size-1.5 rounded-full bg-red-500 animate-pulse" />
            Live
          </Badge>
        ) : (
          <Badge
            variant="outline"
            className="border-border text-muted-foreground text-[10px] font-bold"
          >
            Upcoming
          </Badge>
        )}
      </div>

      <div className="p-5 flex flex-col flex-1 space-y-6">
        {/* Match Info (Teams & Scores) */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex flex-col items-center gap-2 flex-1 text-center">
            <div className="relative size-12 rounded-full border border-border bg-muted/20 flex items-center justify-center p-2 shadow-inner">
              {match.homeTeam?.logo ? (
                <Image
                  src={match.homeTeam.logo}
                  alt={match.homeTeam.name}
                  fill
                  className="object-contain p-2"
                />
              ) : (
                <div className=" text-primary text-sm">
                  {match.homeTeam?.shortName || "H"}
                </div>
              )}
            </div>
            <span className="text-xs font-bold text-foreground line-clamp-1">
              {match.homeTeam?.name}
            </span>
            <span className="text-xl  text-foreground">
              {isLive ? match.homeScore : "-"}
            </span>
          </div>

          <div className="flex flex-col items-center gap-1">
            <span className="text-[10px]  text-muted-foreground/40">VS</span>
            <div className="h-8 w-px bg-border/50" />
          </div>

          <div className="flex flex-col items-center gap-2 flex-1 text-center">
            <div className="relative size-12 rounded-full border border-border bg-muted/20 flex items-center justify-center p-2 shadow-inner">
              {match.awayTeam?.logo ? (
                <Image
                  src={match.awayTeam.logo}
                  alt={match.awayTeam.name}
                  fill
                  className="object-contain p-2"
                />
              ) : (
                <div className=" text-primary text-sm">
                  {match.awayTeam?.shortName || "A"}
                </div>
              )}
            </div>
            <span className="text-xs font-bold text-foreground line-clamp-1">
              {match.awayTeam?.name}
            </span>
            <span className="text-xl  text-foreground">
              {isLive ? match.awayScore : "-"}
            </span>
          </div>
        </div>

        {/* Betting Stats */}
        <div className="grid grid-cols-2 gap-3 pb-2">
          <div className="bg-muted/40 rounded-md p-3 border border-border/50 text-center space-y-1 hover:bg-muted/60 transition-colors">
            <span className="text-[10px] font-bold text-muted-foreground block">
              Active Markets
            </span>
            <span className="text-sm  text-foreground">
              {match.totalBetsCount || 0}
            </span>
          </div>
          <div className="bg-muted/40 rounded-md p-3 border border-border/50 text-center space-y-1 hover:bg-muted/60 transition-colors">
            <span className="text-[10px] font-bold text-muted-foreground block">
              Liquidity
            </span>
            <span className="text-sm  text-primary">
              ${(match.totalBetsAmount || 0).toLocaleString()}
            </span>
          </div>
        </div>

        {/* Footer Area */}
        <div className="mt-auto pt-4 border-t border-border flex items-center justify-between">
          <div className="flex flex-col gap-0.5">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Clock className="size-3" />
              <span className="text-[10px] font-bold">
                {match.scheduledStartTime
                  ? format(new Date(match.scheduledStartTime), "hh:mm a")
                  : "--:--"}
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Calendar
                className={`size-3 ${
                  match.scheduledStartTime &&
                  isToday(new Date(match.scheduledStartTime))
                    ? "text-primary"
                    : ""
                }`}
              />
              <span
                className={`text-[10px] font-bold ${
                  match.scheduledStartTime &&
                  isToday(new Date(match.scheduledStartTime))
                    ? "text-primary uppercase"
                    : ""
                }`}
              >
                {match.scheduledStartTime
                  ? isToday(new Date(match.scheduledStartTime))
                    ? "Today"
                    : format(new Date(match.scheduledStartTime), "dd MMM, yy")
                  : "TBD"}
              </span>
            </div>
          </div>
          <Link
            href={`/matches/${match.sport.slug}/${match._id}`}
            className="block"
          >
            <Button className="rounded-md px-5 h-10 text-[11px]  shadow-lg shadow-primary/10 transition-all active:scale-95 group-hover:bg-primary">
              Trade Market
              <ChevronRight className="size-3.5 ml-1 transition-transform group-hover:translate-x-0.5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SportMatchCard;
