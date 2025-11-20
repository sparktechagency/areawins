"use client";

/**
 * UpcomingPage Component
 * Display all upcoming matches across all sports
 */

import { useState } from "react";
import { useGetUpcomingMatchesQuery } from "@/lib/redux/api/matchApi";
import { useBettingSlip } from "@/hooks/useBettingSlip";
import MainLayout from "@/components/layouts/MainLayout";
import OddsButton from "@/components/betting/OddsButton";
import BetButton from "@/components/betting/BetButton";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import { Calendar } from "lucide-react";
import Link from "next/link";
import { SPORTS } from "@/lib/constants";

export default function UpcomingPage() {
  const [selectedSport, setSelectedSport] = useState<string>("all");

  const { data: upcomingMatches, isLoading } = useGetUpcomingMatchesQuery({
    sport: selectedSport === "all" ? undefined : selectedSport,
    limit: 50,
  });

  const { addItem } = useBettingSlip();

  const handleAddBet = (
    matchId: string,
    match: string,
    teams: string,
    selection: string,
    market: string,
    odds: number,
    startTime: Date,
    sport: string
  ) => {
    addItem({
      matchId,
      match,
      teams,
      selection,
      market,
      odds,
      startTime,
      sport,
    });
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Calendar className="w-10 h-10 text-primary" />
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Upcoming Matches</h1>
              <p className="text-gray-600 mt-1">Browse all scheduled matches</p>
            </div>
          </div>
        </div>

        {/* Sport Filter */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          <Button
            variant={selectedSport === "all" ? "default" : "outline"}
            onClick={() => setSelectedSport("all")}
            className={selectedSport === "all" ? "bg-primary hover:bg-primary/90" : ""}
          >
            All Sports
          </Button>
          {SPORTS.map((sport) => (
            <Button
              key={sport.id}
              variant={selectedSport === sport.id ? "default" : "outline"}
              onClick={() => setSelectedSport(sport.id)}
              className={selectedSport === sport.id ? "bg-primary hover:bg-primary/90" : ""}
            >
              <span className="mr-2">{sport.icon}</span>
              {sport.name}
            </Button>
          ))}
        </div>

        {/* Matches Table */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-gray-600">Loading matches...</p>
            </div>
          </div>
        ) : upcomingMatches && upcomingMatches.matches.length > 0 ? (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-[#d4f4dd]">
                    <th className="text-left p-4 font-semibold text-gray-900">Sport</th>
                    <th className="text-left p-4 font-semibold text-gray-900">Match</th>
                    <th className="text-left p-4 font-semibold text-gray-900">Tournament</th>
                    <th className="text-center p-4 font-semibold text-gray-900">Date & Time</th>
                    <th className="text-center p-4 font-semibold text-gray-900">1</th>
                    <th className="text-center p-4 font-semibold text-gray-900">X</th>
                    <th className="text-center p-4 font-semibold text-gray-900">2</th>
                    <th className="text-center p-4 font-semibold text-gray-900">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {upcomingMatches.matches.map((match, index) => {
                    const homeWinMarket = match.markets?.find((m) => m.type === "match_winner");
                    const homeWinOdds = homeWinMarket?.outcomes?.find((o) => o.type === "home")?.odds || 0;
                    const drawOdds = homeWinMarket?.outcomes?.find((o) => o.type === "draw")?.odds || 0;
                    const awayWinOdds = homeWinMarket?.outcomes?.find((o) => o.type === "away")?.odds || 0;

                    const sportInfo = SPORTS.find((s) => s.id === match.sport);

                    return (
                      <tr
                        key={match.id}
                        className={`border-b ${
                          index % 2 === 0 ? "bg-white" : "bg-gray-50"
                        } hover:bg-gray-100 transition-colors`}
                      >
                        {/* Sport Column */}
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <span className="text-xl">{sportInfo?.icon || "⚽"}</span>
                            <span className="text-sm font-medium text-gray-700">
                              {sportInfo?.name || match.sport}
                            </span>
                          </div>
                        </td>

                        {/* Match Column */}
                        <td className="p-4">
                          <Link href={`/match/${match.id}`}>
                            <div className="cursor-pointer hover:text-primary">
                              <div className="flex items-center gap-3">
                                <div className="flex items-center gap-2">
                                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                                    <span className="text-lg">{match.homeTeam.logo || "⚽"}</span>
                                  </div>
                                  <span className="font-medium">{match.homeTeam.shortName}</span>
                                </div>
                                <span className="text-gray-400 text-sm">vs</span>
                                <div className="flex items-center gap-2">
                                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                                    <span className="text-lg">{match.awayTeam.logo || "⚽"}</span>
                                  </div>
                                  <span className="font-medium">{match.awayTeam.shortName}</span>
                                </div>
                              </div>
                            </div>
                          </Link>
                        </td>

                        {/* Tournament Column */}
                        <td className="p-4">
                          <p className="text-sm text-gray-600">{match.tournament.name}</p>
                        </td>

                        {/* Date & Time Column */}
                        <td className="p-4 text-center">
                          <div className="text-sm">
                            <p className="font-medium text-gray-900">
                              {formatDate(match.startTime, "MMM dd, yyyy")}
                            </p>
                            <p className="text-gray-600">{formatDate(match.startTime, "HH:mm")}</p>
                          </div>
                        </td>

                        {/* Odds Columns */}
                        <td className="p-4 text-center">
                          {homeWinOdds > 0 ? (
                            <OddsButton
                              odds={homeWinOdds}
                              onClick={() =>
                                handleAddBet(
                                  match.id,
                                  `${match.homeTeam.name} vs ${match.awayTeam.name}`,
                                  `${match.homeTeam.shortName} vs ${match.awayTeam.shortName}`,
                                  match.homeTeam.shortName,
                                  "match_winner",
                                  homeWinOdds,
                                  match.startTime,
                                  match.sport
                                )
                              }
                            />
                          ) : (
                            <span className="text-gray-400">-</span>
                          )}
                        </td>

                        <td className="p-4 text-center">
                          {drawOdds > 0 ? (
                            <OddsButton
                              odds={drawOdds}
                              onClick={() =>
                                handleAddBet(
                                  match.id,
                                  `${match.homeTeam.name} vs ${match.awayTeam.name}`,
                                  `${match.homeTeam.shortName} vs ${match.awayTeam.shortName}`,
                                  "Draw",
                                  "match_winner",
                                  drawOdds,
                                  match.startTime,
                                  match.sport
                                )
                              }
                            />
                          ) : (
                            <span className="text-gray-400">-</span>
                          )}
                        </td>

                        <td className="p-4 text-center">
                          {awayWinOdds > 0 ? (
                            <OddsButton
                              odds={awayWinOdds}
                              onClick={() =>
                                handleAddBet(
                                  match.id,
                                  `${match.homeTeam.name} vs ${match.awayTeam.name}`,
                                  `${match.homeTeam.shortName} vs ${match.awayTeam.shortName}`,
                                  match.awayTeam.shortName,
                                  "match_winner",
                                  awayWinOdds,
                                  match.startTime,
                                  match.sport
                                )
                              }
                            />
                          ) : (
                            <span className="text-gray-400">-</span>
                          )}
                        </td>

                        {/* Action Column */}
                        <td className="p-4 text-center">
                          <Link href={`/match/${match.id}`}>
                            <BetButton>Bet</BetButton>
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="text-center py-20">
            <Calendar className="w-20 h-20 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No Upcoming Matches</h2>
            <p className="text-gray-600">
              {selectedSport === "all"
                ? "There are no upcoming matches at the moment."
                : `No upcoming ${selectedSport} matches.`}
            </p>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
