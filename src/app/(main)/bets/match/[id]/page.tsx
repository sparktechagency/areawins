"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Clock, Share2, Star, Trophy } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

export default function MatchDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  // Mock Match Data
  const match = {
    id: id,
    homeTeam: "Man City",
    awayTeam: "Arsenal",
    league: "Premier League",
    date: "Today, 20:00",
    isLive: true,
    score: { home: 1, away: 0, time: "34'" },
    stats: {
      possession: { home: 65, away: 35 },
      shots: { home: 8, away: 2 },
      corners: { home: 4, away: 1 },
    },
  };

  const markets = [
    {
      name: "Match Result",
      options: [
        { label: "Man City", odds: 1.85 },
        { label: "Draw", odds: 3.6 },
        { label: "Arsenal", odds: 4.2 },
      ],
    },
    {
      name: "Over/Under 2.5 Goals",
      options: [
        { label: "Over", odds: 1.75 },
        { label: "Under", odds: 2.05 },
      ],
    },
    {
      name: "Both Teams to Score",
      options: [
        { label: "Yes", odds: 1.9 },
        { label: "No", odds: 1.8 },
      ],
    },
    {
      name: "Double Chance",
      options: [
        { label: "Man City or Draw", odds: 1.25 },
        { label: "Arsenal or Draw", odds: 1.95 },
        { label: "Man City or Arsenal", odds: 1.28 },
      ],
    },
  ];

  return (
    <div className="w-full container mx-auto px-4 py-10 md:py-11 ">
      {/* Breadcrumb / Back */}
      <Button
        variant="ghost"
        size="sm"
        className="mb-4 pl-0 hover:bg-transparent hover:text-primary"
        onClick={() => router.back()}
      >
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Betting
      </Button>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Main Content */}
        <div className="flex-1">
          {/* Match Header */}
          <div className="relative rounded-xl overflow-hidden bg-card border border-border mb-6">
            {/* Background pattern/image could go here */}
            <div className="absolute inset-0 bg-linear-to-br from-primary/10 to-background z-0" />

            <div className="relative z-10 p-6 md:p-8">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  <Trophy className="w-4 h-4" />
                  <span>{match.league}</span>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-yellow-400"
                  >
                    <Star className="w-5 h-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-primary"
                  >
                    <Share2 className="w-5 h-5" />
                  </Button>
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                {/* Home Team */}
                <div className="text-center flex-1">
                  <div className="w-20 h-20 mx-auto bg-muted rounded-full flex items-center justify-center mb-3  border-4 border-background">
                    <span className="text-2xl font-bold">M</span>
                  </div>
                  <h2 className="text-2xl font-bold text-foreground">
                    {match.homeTeam}
                  </h2>
                </div>

                {/* Score / Time */}
                <div className="flex flex-col items-center">
                  {match.isLive ? (
                    <>
                      <div className="text-5xl font-black text-foreground tracking-tighter mb-2">
                        {match.score.home} : {match.score.away}
                      </div>
                      <Badge
                        variant="destructive"
                        className="animate-pulse px-3 py-1"
                      >
                        LIVE • {match.score.time}
                      </Badge>
                    </>
                  ) : (
                    <>
                      <div className="text-4xl font-bold text-muted-foreground mb-2">
                        VS
                      </div>
                      <div className="flex items-center gap-2 text-primary font-medium bg-primary/10 px-3 py-1 rounded-full">
                        <Clock className="w-4 h-4" /> {match.date}
                      </div>
                    </>
                  )}
                </div>

                {/* Away Team */}
                <div className="text-center flex-1">
                  <div className="w-20 h-20 mx-auto bg-muted rounded-full flex items-center justify-center mb-3  border-4 border-background">
                    <span className="text-2xl font-bold">A</span>
                  </div>
                  <h2 className="text-2xl font-bold text-foreground">
                    {match.awayTeam}
                  </h2>
                </div>
              </div>
            </div>

            {/* Live Stats Bar (Mock) */}
            {match.isLive && (
              <div className="border-t border-border bg-muted/30 p-4 grid grid-cols-3 gap-4 text-center text-xs text-muted-foreground">
                <div>
                  <div className="font-bold text-foreground mb-1">
                    Possession
                  </div>
                  <div className="flex items-center gap-2 justify-center">
                    <span>{match.stats.possession.home}%</span>
                    <div className="w-20 h-1.5 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary"
                        style={{ width: `${match.stats.possession.home}%` }}
                      />
                    </div>
                    <span>{match.stats.possession.away}%</span>
                  </div>
                </div>
                <div>
                  <div className="font-bold text-foreground mb-1">
                    Shots on Target
                  </div>
                  <div className="flex items-center gap-2 justify-center">
                    <span>{match.stats.shots.home}</span>
                    <div className="w-20 h-1.5 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-500"
                        style={{
                          width: `${
                            (match.stats.shots.home /
                              (match.stats.shots.home +
                                match.stats.shots.away)) *
                            100
                          }%`,
                        }}
                      />
                    </div>
                    <span>{match.stats.shots.away}</span>
                  </div>
                </div>
                <div>
                  <div className="font-bold text-foreground mb-1">Corners</div>
                  <div className="flex items-center gap-2 justify-center">
                    <span>{match.stats.corners.home}</span>
                    <div className="w-20 h-1.5 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-orange-500"
                        style={{
                          width: `${
                            (match.stats.corners.home /
                              (match.stats.corners.home +
                                match.stats.corners.away)) *
                            100
                          }%`,
                        }}
                      />
                    </div>
                    <span>{match.stats.corners.away}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Markets */}
          <Tabs defaultValue="all" className="space-y-6">
            <TabsList className="w-full justify-start bg-transparent border-b border-border rounded-none h-auto p-0 gap-6 shadow-none">
              <TabsTrigger
                value="all"
                className="rounded-none   cursor-pointer data-[state=active]:border-primary data-[state=active]:bg-transparent px-0 pb-2"
              >
                All Markets
              </TabsTrigger>
              <TabsTrigger
                value="main"
                className="rounded-none  cursor-pointer data-[state=active]:border-primary data-[state=active]:bg-transparent px-0 pb-2"
              >
                Main
              </TabsTrigger>
              <TabsTrigger
                value="goals"
                className="rounded-none  cursor-pointer data-[state=active]:border-primary data-[state=active]:bg-transparent px-0 pb-2"
              >
                Goals
              </TabsTrigger>
              <TabsTrigger
                value="half"
                className="rounded-none  cursor-pointer data-[state=active]:border-primary data-[state=active]:bg-transparent px-0 pb-2"
              >
                Half Time
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              {markets.map((market, idx) => (
                <MarketCard key={idx} market={market} />
              ))}
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar / Bet Slip */}
        <div className="w-full lg:w-80 space-y-4">
          <Card className="bg-card border-border sticky top-24">
            <CardHeader className="bg-muted/50 border-b border-border py-3">
              <h3 className="font-bold">Bet Slip</h3>
            </CardHeader>
            <CardContent className="p-8 text-center min-h-[200px] flex flex-col items-center justify-center text-muted-foreground">
              <p>Your bet slip is empty</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function MarketCard({ market }: { market: any }) {
  return (
    <Card className="border-border shadow-none">
      <CardHeader className="py-3 px-4 bg-muted/30 border-b border-border">
        <h3 className="text-sm font-bold text-foreground">{market.name}</h3>
      </CardHeader>
      <CardContent className="p-4">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {market.options.map((option: any, idx: number) => (
            <button
              key={idx}
              className="flex justify-between items-center p-3 rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-all group"
            >
              <span className="text-sm text-foreground">{option.label}</span>
              <span className="font-bold text-primary">
                {option.odds.toFixed(2)}
              </span>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
