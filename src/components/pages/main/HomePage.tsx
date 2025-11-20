"use client";

/**
 * HomePage Component
 * Landing page with tournaments, live events, and upcoming matches
 */

import { useGetLiveMatchesQuery, useGetUpcomingMatchesQuery } from "@/lib/redux/api/matchApi";
import { useBettingSlip } from "@/hooks/useBettingSlip";
import MainLayout from "@/components/layouts/MainLayout";
import LiveEventCard from "@/components/betting/LiveEventCard";
import OddsButton from "@/components/betting/OddsButton";
import BetButton from "@/components/betting/BetButton";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatOdds, formatDate } from "@/lib/utils";
import { Trophy, Star } from "lucide-react";
import Link from "next/link";
import { ROUTES } from "@/lib/constants";

export default function HomePage() {
  const { data: liveMatches, isLoading: loadingLive } = useGetLiveMatchesQuery();
  const { data: upcomingMatches, isLoading: loadingUpcoming } = useGetUpcomingMatchesQuery({
    sport: "football",
    limit: 10,
  });
  const { addItem } = useBettingSlip();

  const handleAddBet = (matchId: string, match: string, teams: string, selection: string, market: string, odds: number, startTime: Date, sport: string) => {
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
      <div className="space-y-12">
        {/* Tournaments Section */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Tournaments</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Premium League Card */}
            <Link href={ROUTES.LIVE_EVENTS}>
              <Card className="relative overflow-hidden cursor-pointer hover:shadow-lg transition-shadow h-48">
                <div className="absolute inset-0 bg-gradient-to-br from-[#00D65C] to-[#00b84d]"></div>
                <CardContent className="relative z-10 h-full flex flex-col justify-center items-center text-white p-6">
                  <Trophy className="w-16 h-16 mb-4" />
                  <h3 className="text-2xl font-bold mb-2">Premium League</h3>
                  <p className="text-white/90 text-center">Top matches with exclusive odds</p>
                </CardContent>
              </Card>
            </Link>

            {/* Special Bet Card */}
            <Link href={ROUTES.BETTING_MARKET}>
              <Card className="relative overflow-hidden cursor-pointer hover:shadow-lg transition-shadow h-48">
                <div className="absolute inset-0 bg-gray-900">
                  <div className="absolute inset-0 bg-[url('/stadium-bg.jpg')] bg-cover bg-center opacity-30"></div>
                </div>
                <CardContent className="relative z-10 h-full flex flex-col justify-center items-center text-white p-6">
                  <Star className="w-16 h-16 mb-4 text-yellow-400" />
                  <h3 className="text-2xl font-bold mb-2">Special Bet</h3>
                  <p className="text-white/90 text-center">Unique betting opportunities</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </section>

        {/* Live Events Section */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-gray-900">Live Events</h2>
            <Link href={ROUTES.LIVE_EVENTS}>
              <span className="text-primary font-semibold hover:underline">View All</span>
            </Link>
          </div>

          {loadingLive ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : liveMatches && liveMatches.matches.length > 0 ? (
            <div className="relative">
              <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory">
                {liveMatches.matches.slice(0, 8).map((match) => (
                  <div key={match.id} className="flex-shrink-0 w-80 snap-start">
                    <LiveEventCard match={match} />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <p className="text-lg">No live events at the moment</p>
              <p className="text-sm mt-2">Check back soon for live matches!</p>
            </div>
          )}
        </section>

        {/* Football Upcoming Section */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-gray-900">Football Upcoming</h2>
            <Link href={ROUTES.UPCOMING}>
              <span className="text-primary font-semibold hover:underline">View All</span>
            </Link>
          </div>

          {loadingUpcoming ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : upcomingMatches && upcomingMatches.matches.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-[#d4f4dd]">
                    <th className="text-left p-4 font-semibold text-gray-900">Match</th>
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

                    return (
                      <tr
                        key={match.id}
                        className={`border-b ${index % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-gray-100 transition-colors`}
                      >
                        {/* Match Column */}
                        <td className="p-4">
                          <Link href={`/match/${match.id}`}>
                            <div className="flex items-center gap-3 cursor-pointer hover:text-primary">
                              <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                                  <span className="text-lg">{match.homeTeam.logo || "⚽"}</span>
                                </div>
                                <span className="font-medium">{match.homeTeam.shortName}</span>
                              </div>
                              <span className="text-gray-400">vs</span>
                              <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                                  <span className="text-lg">{match.awayTeam.logo || "⚽"}</span>
                                </div>
                                <span className="font-medium">{match.awayTeam.shortName}</span>
                              </div>
                            </div>
                          </Link>
                        </td>

                        {/* Date & Time Column */}
                        <td className="p-4 text-center text-sm text-gray-600">
                          {formatDate(match.startTime, "MMM dd, HH:mm")}
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
          ) : (
            <div className="text-center py-12 text-gray-500">
              <p className="text-lg">No upcoming matches</p>
              <p className="text-sm mt-2">Check back soon!</p>
            </div>
          )}
        </section>
      </div>
    </MainLayout>
  );
}
