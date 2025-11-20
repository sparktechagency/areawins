"use client";

/**
 * MatchDetailPage Component
 * Detailed match view with comprehensive betting options
 */

import { useGetMatchByIdQuery } from "@/lib/redux/api/matchApi";
import { useBettingSlip } from "@/hooks/useBettingSlip";
import MainLayout from "@/components/layouts/MainLayout";
import OddsButton from "@/components/betting/OddsButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatDate } from "@/lib/utils";
import { Trophy, Calendar, MapPin, Users } from "lucide-react";
import { useParams } from "next/navigation";

export default function MatchDetailPage() {
  const params = useParams();
  const matchId = params?.id as string;

  const { data: match, isLoading, error } = useGetMatchByIdQuery(matchId, {
    skip: !matchId,
  });

  const { addItem } = useBettingSlip();

  const handleAddBet = (
    selection: string,
    market: string,
    odds: number
  ) => {
    if (!match) return;

    addItem({
      matchId: match.id,
      match: `${match.homeTeam.name} vs ${match.awayTeam.name}`,
      teams: `${match.homeTeam.shortName} vs ${match.awayTeam.shortName}`,
      selection,
      market,
      odds,
      startTime: match.startTime,
      sport: match.sport,
    });
  };

  if (isLoading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-gray-600">Loading match details...</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (error || !match) {
    return (
      <MainLayout>
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Match Not Found</h2>
          <p className="text-gray-600">The match you're looking for doesn't exist.</p>
        </div>
      </MainLayout>
    );
  }

  const isLive = match.status === "live";

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Match Header */}
        <Card className="overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-primary" />
                <span className="font-semibold text-gray-900">{match.tournament.name}</span>
              </div>
              {isLive && (
                <Badge className="bg-accent text-white live-pulse">
                  {match.liveData?.minute ? `${match.liveData.minute}'` : "LIVE"}
                </Badge>
              )}
            </div>

            {/* Teams and Score */}
            <div className="flex items-center justify-between">
              {/* Home Team */}
              <div className="flex-1 text-center">
                <div className="w-24 h-24 mx-auto mb-3 rounded-full bg-white shadow-md flex items-center justify-center">
                  <span className="text-5xl">{match.homeTeam.logo || "⚽"}</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">{match.homeTeam.name}</h2>
                {isLive && match.score && (
                  <p className="text-5xl font-bold text-primary mt-3">{match.score.home}</p>
                )}
              </div>

              {/* VS / Time */}
              <div className="px-8 text-center">
                {isLive ? (
                  <div className="text-3xl font-bold text-gray-400">VS</div>
                ) : (
                  <div>
                    <div className="text-2xl font-bold text-gray-400 mb-2">VS</div>
                    <div className="text-sm text-gray-600">
                      <p className="font-medium">{formatDate(match.startTime, "MMM dd, yyyy")}</p>
                      <p className="text-lg font-bold text-primary">
                        {formatDate(match.startTime, "HH:mm")}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Away Team */}
              <div className="flex-1 text-center">
                <div className="w-24 h-24 mx-auto mb-3 rounded-full bg-white shadow-md flex items-center justify-center">
                  <span className="text-5xl">{match.awayTeam.logo || "⚽"}</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">{match.awayTeam.name}</h2>
                {isLive && match.score && (
                  <p className="text-5xl font-bold text-primary mt-3">{match.score.away}</p>
                )}
              </div>
            </div>

            {/* Match Info */}
            <div className="flex items-center justify-center gap-6 mt-6 pt-6 border-t">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(match.startTime, "EEEE, MMMM dd")}</span>
              </div>
              {match.venue && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>{match.venue}</span>
                </div>
              )}
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Users className="w-4 h-4" />
                <span className="capitalize">{match.sport}</span>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Betting Markets */}
        <Card>
          <CardHeader>
            <CardTitle>Betting Markets</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="main" className="w-full">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="main">Main</TabsTrigger>
                <TabsTrigger value="handicap">Handicap</TabsTrigger>
                <TabsTrigger value="totals">Totals</TabsTrigger>
                <TabsTrigger value="goals">Goals</TabsTrigger>
                <TabsTrigger value="special">Special</TabsTrigger>
              </TabsList>

              {/* Main Markets (1X2) */}
              <TabsContent value="main" className="space-y-6 mt-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Match Winner</h3>
                  <div className="grid grid-cols-3 gap-4">
                    {match.markets
                      ?.find((m) => m.type === "match_winner")
                      ?.outcomes?.map((outcome) => (
                        <div key={outcome.type}>
                          <p className="text-sm text-gray-600 mb-2 text-center">
                            {outcome.name || outcome.type}
                          </p>
                          <OddsButton
                            odds={outcome.odds}
                            onClick={() => handleAddBet(outcome.name || outcome.type, "match_winner", outcome.odds)}
                          />
                        </div>
                      ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Double Chance</h3>
                  <div className="grid grid-cols-3 gap-4">
                    {match.markets
                      ?.find((m) => m.type === "double_chance")
                      ?.outcomes?.map((outcome) => (
                        <div key={outcome.type}>
                          <p className="text-sm text-gray-600 mb-2 text-center">
                            {outcome.name || outcome.type}
                          </p>
                          <OddsButton
                            odds={outcome.odds}
                            onClick={() => handleAddBet(outcome.name || outcome.type, "double_chance", outcome.odds)}
                          />
                        </div>
                      ))}
                  </div>
                </div>
              </TabsContent>

              {/* Handicap Markets */}
              <TabsContent value="handicap" className="space-y-6 mt-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Asian Handicap</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {match.markets
                      ?.find((m) => m.type === "handicap")
                      ?.outcomes?.map((outcome) => (
                        <div key={outcome.type}>
                          <p className="text-sm text-gray-600 mb-2 text-center">
                            {outcome.name || outcome.type}
                          </p>
                          <OddsButton
                            odds={outcome.odds}
                            onClick={() => handleAddBet(outcome.name || outcome.type, "handicap", outcome.odds)}
                          />
                        </div>
                      ))}
                  </div>
                </div>
              </TabsContent>

              {/* Totals Markets */}
              <TabsContent value="totals" className="space-y-6 mt-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Over/Under Goals</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {match.markets
                      ?.find((m) => m.type === "over_under")
                      ?.outcomes?.map((outcome) => (
                        <div key={outcome.type}>
                          <p className="text-sm text-gray-600 mb-2 text-center">
                            {outcome.name || outcome.type}
                          </p>
                          <OddsButton
                            odds={outcome.odds}
                            onClick={() => handleAddBet(outcome.name || outcome.type, "over_under", outcome.odds)}
                          />
                        </div>
                      ))}
                  </div>
                </div>
              </TabsContent>

              {/* Goals Markets */}
              <TabsContent value="goals" className="space-y-6 mt-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Both Teams to Score</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {match.markets
                      ?.find((m) => m.type === "both_teams_to_score")
                      ?.outcomes?.map((outcome) => (
                        <div key={outcome.type}>
                          <p className="text-sm text-gray-600 mb-2 text-center">
                            {outcome.name || outcome.type}
                          </p>
                          <OddsButton
                            odds={outcome.odds}
                            onClick={() => handleAddBet(outcome.name || outcome.type, "both_teams_to_score", outcome.odds)}
                          />
                        </div>
                      ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Total Goals</h3>
                  <div className="grid grid-cols-3 gap-4">
                    {match.markets
                      ?.find((m) => m.type === "total_goals")
                      ?.outcomes?.map((outcome) => (
                        <div key={outcome.type}>
                          <p className="text-sm text-gray-600 mb-2 text-center">
                            {outcome.name || outcome.type}
                          </p>
                          <OddsButton
                            odds={outcome.odds}
                            onClick={() => handleAddBet(outcome.name || outcome.type, "total_goals", outcome.odds)}
                          />
                        </div>
                      ))}
                  </div>
                </div>
              </TabsContent>

              {/* Special Markets */}
              <TabsContent value="special" className="space-y-6 mt-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">First Half Winner</h3>
                  <div className="grid grid-cols-3 gap-4">
                    {match.markets
                      ?.find((m) => m.type === "first_half_winner")
                      ?.outcomes?.map((outcome) => (
                        <div key={outcome.type}>
                          <p className="text-sm text-gray-600 mb-2 text-center">
                            {outcome.name || outcome.type}
                          </p>
                          <OddsButton
                            odds={outcome.odds}
                            onClick={() => handleAddBet(outcome.name || outcome.type, "first_half_winner", outcome.odds)}
                          />
                        </div>
                      ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Correct Score</h3>
                  <div className="grid grid-cols-4 gap-3">
                    {match.markets
                      ?.find((m) => m.type === "correct_score")
                      ?.outcomes?.slice(0, 12)
                      .map((outcome) => (
                        <div key={outcome.type}>
                          <p className="text-xs text-gray-600 mb-1 text-center">
                            {outcome.name || outcome.type}
                          </p>
                          <OddsButton
                            odds={outcome.odds}
                            onClick={() => handleAddBet(outcome.name || outcome.type, "correct_score", outcome.odds)}
                          />
                        </div>
                      ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Match Statistics (if live) */}
        {isLive && match.liveData && (
          <Card>
            <CardHeader>
              <CardTitle>Live Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {match.liveData.stats && Object.entries(match.liveData.stats).map(([key, value]) => (
                  <div key={key}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600 capitalize">
                        {key.replace(/_/g, " ")}
                      </span>
                      <span className="text-sm font-semibold text-gray-900">{value}</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary"
                        style={{ width: `${Math.min(100, (value as number) * 10)}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </MainLayout>
  );
}
