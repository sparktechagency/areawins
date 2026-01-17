"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn, formatTime, getTimeUntilMatch } from "@/lib/utils";
import { Match } from "@/types";
import Link from "next/link";

interface LiveEventCardProps {
  match: Match;
  className?: string;
}

export default function LiveEventCard({
  match,
  className,
}: LiveEventCardProps) {
  const isLive = match.status === "live";
  const timeUntil = getTimeUntilMatch(match.startTime);

  return (
    <Link href={`/bets/match/${match.id}`}>
      <Card
        className={cn(
          "match-card hover:shadow-lg transition-all cursor-pointer",
          className
        )}
      >
        <CardContent className="p-4">
          {/* Live Badge */}
          {isLive && (
            <Badge className="bg-accent text-white mb-3 live-pulse">LIVE</Badge>
          )}

          {/* Teams */}
          <div className="flex items-center justify-between gap-4 mb-3">
            {/* Home Team */}
            <div className="flex flex-col items-center flex-1">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mb-2">
                <span className="text-2xl">{match.homeTeam.logo || "⚽"}</span>
              </div>
              <p className="text-sm font-semibold text-center">
                {match.homeTeam.shortName || match.homeTeam.name}
              </p>
              {match.score && (
                <p className="text-2xl font-bold text-primary">
                  {match.score.home}
                </p>
              )}
            </div>

            {/* VS */}
            <div className="text-gray-400 font-bold">VS</div>

            {/* Away Team */}
            <div className="flex flex-col items-center flex-1">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mb-2">
                <span className="text-2xl">{match.awayTeam.logo || "⚽"}</span>
              </div>
              <p className="text-sm font-semibold text-center">
                {match.awayTeam.shortName || match.awayTeam.name}
              </p>
              {match.score && (
                <p className="text-2xl font-bold text-primary">
                  {match.score.away}
                </p>
              )}
            </div>
          </div>

          {/* Match Info */}
          <div className="space-y-1 text-sm text-gray-600 text-center">
            <p className="font-medium">{match.tournament.name}</p>
            {match.liveData?.period && (
              <p className="text-xs">{match.liveData.period}</p>
            )}
            {!isLive && (
              <p className="text-xs">{formatTime(match.startTime)}</p>
            )}
          </div>

          {/* Countdown or Status */}
          <div className="mt-3 pt-3 border-t text-center">
            {isLive ? (
              <Badge variant="outline" className="text-accent border-accent">
                {match.liveData?.minute ? `${match.liveData.minute}'` : "LIVE"}
              </Badge>
            ) : (
              <p className="text-xs font-mono text-gray-500">{timeUntil}</p>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
