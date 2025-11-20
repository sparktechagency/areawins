"use client";

/**
 * LiveEventsPage Component
 * Display all live matches with detailed betting options
 */

import { useGetLiveMatchesQuery } from "@/lib/redux/api/matchApi";
import { useBettingSlip } from "@/hooks/useBettingSlip";
import MainLayout from "@/components/layouts/MainLayout";
import OddsButton from "@/components/betting/OddsButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatOdds } from "@/lib/utils";
import { Clock } from "lucide-react";
import Link from "next/link";

export default function LiveEventsPage() {
  const { data: liveMatches, isLoading } = useGetLiveMatchesQuery();
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

  if (isLoading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-gray-600">Loading live events...</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (!liveMatches || liveMatches.matches.length === 0) {
    return (
      <MainLayout>
        <div className="text-center py-20">
          <Clock className="w-20 h-20 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">No Live Events</h2>
          <p className="text-gray-600">There are no live matches at the moment.</p>
          <p className="text-sm text-gray-500 mt-2">Check back soon for live action!</p>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Page Header */}
        <div className="flex items-center gap-3">
          <Badge className="bg-accent text-white px-3 py-1 text-sm font-semibold live-pulse">
            LIVE
          </Badge>
          <h1 className="text-4xl font-bold text-gray-900">Live Events</h1>
          <span className="text-gray-500">({liveMatches.matches.length} matches)</span>
        </div>

        {/* Live Matches Grid */}
        <div className="space-y-6">
          {liveMatches.matches.map((match) => {
            // Find betting markets
            const matchWinnerMarket = match.markets?.find((m) => m.type === "match_winner");
            const handicapMarket = match.markets?.find((m) => m.type === "handicap");
            const overUnderMarket = match.markets?.find((m) => m.type === "over_under");
            const bothTeamsScoreMarket = match.markets?.find((m) => m.type === "both_teams_to_score");

            // Extract odds
            const homeWinOdds = matchWinnerMarket?.outcomes?.find((o) => o.type === "home")?.odds || 0;
            const drawOdds = matchWinnerMarket?.outcomes?.find((o) => o.type === "draw")?.odds || 0;
            const awayWinOdds = matchWinnerMarket?.outcomes?.find((o) => o.type === "away")?.odds || 0;

            return (
              <Card key={match.id} className="overflow-hidden">
                <CardHeader className="bg-gray-50 border-b">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg font-semibold text-gray-900">
                        {match.tournament.name}
                      </CardTitle>
                      <p className="text-sm text-gray-600 mt-1">{match.sport}</p>
                    </div>
                    <Badge className="bg-accent text-white live-pulse">
                      {match.liveData?.minute ? `${match.liveData.minute}'` : "LIVE"}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="p-6">
                  {/* Match Score */}
                  <div className="flex items-center justify-between mb-6">
                    {/* Home Team */}
                    <div className="flex-1 text-center">
                      <Link href={`/match/${match.id}`}>
                        <div className="cursor-pointer hover:opacity-80 transition-opacity">
                          <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-gray-100 flex items-center justify-center">
                            <span className="text-3xl">{match.homeTeam.logo || "⚽"}</span>
                          </div>
                          <p className="font-bold text-lg text-gray-900">{match.homeTeam.name}</p>
                        </div>
                      </Link>
                      <p className="text-4xl font-bold text-primary mt-2">
                        {match.score?.home || 0}
                      </p>
                    </div>

                    {/* VS Divider */}
                    <div className="px-8">
                      <div className="text-2xl font-bold text-gray-400">VS</div>
                    </div>

                    {/* Away Team */}
                    <div className="flex-1 text-center">
                      <Link href={`/match/${match.id}`}>
                        <div className="cursor-pointer hover:opacity-80 transition-opacity">
                          <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-gray-100 flex items-center justify-center">
                            <span className="text-3xl">{match.awayTeam.logo || "⚽"}</span>
                          </div>
                          <p className="font-bold text-lg text-gray-900">{match.awayTeam.name}</p>
                        </div>
                      </Link>
                      <p className="text-4xl font-bold text-primary mt-2">
                        {match.score?.away || 0}
                      </p>
                    </div>
                  </div>

                  {/* Betting Markets */}
                  <Tabs defaultValue="1x2" className="w-full">
                    <TabsList className="grid w-full grid-cols-4">
                      <TabsTrigger value="1x2">1X2</TabsTrigger>
                      <TabsTrigger value="handicap">Handicap</TabsTrigger>
                      <TabsTrigger value="overunder">Over/Under</TabsTrigger>
                      <TabsTrigger value="btts">BTTS</TabsTrigger>
                    </TabsList>

                    {/* 1X2 Market */}
                    <TabsContent value="1x2" className="mt-4">
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <p className="text-xs text-gray-600 mb-2 text-center">
                            Home Win
                          </p>
                          {homeWinOdds > 0 ? (
                            <OddsButton
                              odds={homeWinOdds}
                              label="1"
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
                            <div className="text-center text-gray-400">N/A</div>
                          )}
                        </div>

                        <div>
                          <p className="text-xs text-gray-600 mb-2 text-center">Draw</p>
                          {drawOdds > 0 ? (
                            <OddsButton
                              odds={drawOdds}
                              label="X"
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
                            <div className="text-center text-gray-400">N/A</div>
                          )}
                        </div>

                        <div>
                          <p className="text-xs text-gray-600 mb-2 text-center">
                            Away Win
                          </p>
                          {awayWinOdds > 0 ? (
                            <OddsButton
                              odds={awayWinOdds}
                              label="2"
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
                            <div className="text-center text-gray-400">N/A</div>
                          )}
                        </div>
                      </div>
                    </TabsContent>

                    {/* Handicap Market */}
                    <TabsContent value="handicap" className="mt-4">
                      {handicapMarket && handicapMarket.outcomes ? (
                        <div className="grid grid-cols-2 gap-4">
                          {handicapMarket.outcomes.map((outcome) => (
                            <OddsButton
                              key={outcome.type}
                              odds={outcome.odds}
                              label={outcome.name || outcome.type}
                              onClick={() =>
                                handleAddBet(
                                  match.id,
                                  `${match.homeTeam.name} vs ${match.awayTeam.name}`,
                                  `${match.homeTeam.shortName} vs ${match.awayTeam.shortName}`,
                                  outcome.name || outcome.type,
                                  "handicap",
                                  outcome.odds,
                                  match.startTime,
                                  match.sport
                                )
                              }
                            />
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-4 text-gray-500">
                          No handicap odds available
                        </div>
                      )}
                    </TabsContent>

                    {/* Over/Under Market */}
                    <TabsContent value="overunder" className="mt-4">
                      {overUnderMarket && overUnderMarket.outcomes ? (
                        <div className="grid grid-cols-2 gap-4">
                          {overUnderMarket.outcomes.map((outcome) => (
                            <OddsButton
                              key={outcome.type}
                              odds={outcome.odds}
                              label={outcome.name || outcome.type}
                              onClick={() =>
                                handleAddBet(
                                  match.id,
                                  `${match.homeTeam.name} vs ${match.awayTeam.name}`,
                                  `${match.homeTeam.shortName} vs ${match.awayTeam.shortName}`,
                                  outcome.name || outcome.type,
                                  "over_under",
                                  outcome.odds,
                                  match.startTime,
                                  match.sport
                                )
                              }
                            />
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-4 text-gray-500">
                          No over/under odds available
                        </div>
                      )}
                    </TabsContent>

                    {/* Both Teams to Score */}
                    <TabsContent value="btts" className="mt-4">
                      {bothTeamsScoreMarket && bothTeamsScoreMarket.outcomes ? (
                        <div className="grid grid-cols-2 gap-4">
                          {bothTeamsScoreMarket.outcomes.map((outcome) => (
                            <OddsButton
                              key={outcome.type}
                              odds={outcome.odds}
                              label={outcome.name || outcome.type}
                              onClick={() =>
                                handleAddBet(
                                  match.id,
                                  `${match.homeTeam.name} vs ${match.awayTeam.name}`,
                                  `${match.homeTeam.shortName} vs ${match.awayTeam.shortName}`,
                                  outcome.name || outcome.type,
                                  "both_teams_to_score",
                                  outcome.odds,
                                  match.startTime,
                                  match.sport
                                )
                              }
                            />
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-4 text-gray-500">
                          No BTTS odds available
                        </div>
                      )}
                    </TabsContent>
                  </Tabs>

                  {/* View Match Details Link */}
                  <div className="mt-6 text-center">
                    <Link
                      href={`/match/${match.id}`}
                      className="text-primary font-semibold hover:underline"
                    >
                      View Full Match Details →
                    </Link>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </MainLayout>
  );
}
