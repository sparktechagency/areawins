"use client";

import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ROUTES } from "@/lib/constants";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Clock, Filter, Ticket, TrendingDown, TrendingUp } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const FALLBACK_ROUTES = { LIVE_EVENTS: "/live-events" };
const formatOdds = (odds: number) => odds.toFixed(2);

const MyBetsPage = () => {
  const [filter, setFilter] = useState<"all" | "won" | "lost" | "pending">(
    "all"
  );

  const betHistory = {
    bets: [
      {
        id: "bet_1234567890",
        betType: "single",
        status: "won",
        stake: 500,
        totalOdds: 1.85,
        potentialWin: 925,
        payout: 925,
        placedAt: "2025-10-24T18:30:00Z",
        selections: [
          {
            selection: "Man City to win",
            odds: 1.85,
            matchDetails: { homeTeam: "Man City", awayTeam: "Arsenal" },
          },
        ],
      },
      {
        id: "bet_7890123456",
        betType: "single",
        status: "pending",
        stake: 1000,
        totalOdds: 1.6,
        potentialWin: 1600,
        placedAt: "2025-10-25T20:45:00Z",
        selections: [
          {
            selection: "Both Teams to Score",
            odds: 1.6,
            matchDetails: { homeTeam: "Real Madrid", awayTeam: "Barcelona" },
          },
        ],
      },
      {
        id: "bet_3456789012",
        betType: "single",
        status: "won",
        stake: 2000,
        totalOdds: 1.9,
        potentialWin: 3800,
        payout: 3800,
        placedAt: "2025-10-22T19:00:00Z",
        selections: [
          {
            selection: "Lakers +5.5",
            odds: 1.9,
            matchDetails: { homeTeam: "Lakers", awayTeam: "Warriors" },
          },
        ],
      },
      {
        id: "bet_9012345678",
        betType: "single",
        status: "lost",
        stake: 500,
        totalOdds: 1.4,
        potentialWin: 700,
        placedAt: "2025-10-20T14:00:00Z",
        selections: [
          {
            selection: "India to win",
            odds: 1.4,
            matchDetails: { homeTeam: "Bangladesh", awayTeam: "India" },
          },
        ],
      },
    ],
  };

  const activeBets = {
    bets: betHistory.bets.filter((b) => b.status === "pending"),
  };
  const allBets = betHistory.bets;

  const filteredBets = allBets.filter(
    (bet) => filter === "all" || bet.status === filter
  );

  const getStatusBadge = (status: string) => {
    const config: Record<string, { className: string; label: string }> = {
      won: { className: "bg-green-500 text-white", label: "Won" },
      lost: { className: "bg-red-500 text-white", label: "Lost" },
      pending: { className: "bg-yellow-500 text-white", label: "Pending" },
    };
    const cfg = config[status] || config.pending;
    return <Badge className={cfg.className}>{cfg.label}</Badge>;
  };

  const totalBets = allBets.length;
  const activeCount = allBets.filter((b) => b.status === "pending").length;
  const wonCount = allBets.filter((b) => b.status === "won").length;
  const settledCount = allBets.filter((b) => b.status !== "pending").length;
  const winRate =
    settledCount > 0 ? Math.round((wonCount / settledCount) * 100) : 0;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
              My Bets <Ticket className="w-8 h-8 text-primary" />
            </h1>
            <p className="text-muted-foreground mt-1">
              Track all your bets and betting history
            </p>
          </div>
          <Link href={ROUTES?.LIVE_EVENTS || FALLBACK_ROUTES.LIVE_EVENTS}>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Ticket className="w-4 h-4 mr-2" />
              Place New Bet
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="w-full border-border shadow-none">
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground mb-1">Total Bets</p>
              <p className="text-2xl font-bold text-foreground">{totalBets}</p>
            </CardContent>
          </Card>
          <Card className="w-full border-border shadow-none">
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground mb-1">Active Bets</p>
              <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                {activeCount}
              </p>
            </CardContent>
          </Card>
          <Card className="w-full border-border shadow-none">
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground mb-1">Won Bets</p>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                {wonCount}
              </p>
            </CardContent>
          </Card>
          <Card className="w-full border-border shadow-none">
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground mb-1">Win Rate</p>
              <p className="text-2xl font-bold text-primary">{winRate}%</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <div className="flex items-center justify-between mb-4">
            <TabsList>
              <TabsTrigger value="all">All Bets</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
            </TabsList>

            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <Button
                variant={filter === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter("all")}
              >
                All
              </Button>
              <Button
                variant={filter === "pending" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter("pending")}
              >
                Pending
              </Button>
              <Button
                variant={filter === "won" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter("won")}
              >
                Won
              </Button>
              <Button
                variant={filter === "lost" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter("lost")}
              >
                Lost
              </Button>
            </div>
          </div>

          <TabsContent value="all">
            {filteredBets.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredBets.map((bet) => (
                  <Card
                    key={bet.id}
                    className="border-border shadow-none bg-card"
                  >
                    <CardHeader className="border-b border-border pt-3 rounded-t-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Ticket className="w-4 h-4 text-primary" />
                          <span className="text-sm font-semibold text-foreground">
                            #{bet.id.slice(0, 8)}
                          </span>
                        </div>
                        {getStatusBadge(bet.status)}
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 space-y-3">
                      <div>
                        <Badge
                          variant="outline"
                          className="capitalize text-foreground border-foreground/30"
                        >
                          {bet.betType.replace("_", " ")}
                        </Badge>
                      </div>

                      <div className="space-y-2">
                        {bet.selections.map((selection, index) => (
                          <div key={index} className="p-2 rounded text-sm">
                            <p className="font-medium text-foreground">
                              {selection.matchDetails?.homeTeam} vs{" "}
                              {selection.matchDetails?.awayTeam}
                            </p>
                            <div className="flex justify-between mt-1">
                              <span className="text-muted-foreground">
                                {selection.selection}
                              </span>
                              <span className="font-bold text-primary">
                                {formatOdds(selection.odds)}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="space-y-2 pt-3 border-t border-border">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Stake:</span>
                          <span className="font-semibold text-foreground">
                            {formatCurrency(bet.stake)}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Odds:</span>
                          <span className="font-semibold text-foreground">
                            {formatOdds(bet.totalOdds)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">
                            Potential:
                          </span>
                          <span className="font-bold text-primary">
                            {formatCurrency(bet.potentialWin)}
                          </span>
                        </div>
                      </div>

                      {bet.status === "won" && (
                        <div className="flex items-center gap-2 p-2 bg-green-500/10 rounded">
                          <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-400" />
                          <div>
                            <p className="text-xs text-green-600 dark:text-green-400">
                              Won
                            </p>
                            <p className="font-bold text-green-700 dark:text-green-300">
                              + {formatCurrency(bet.payout || bet.potentialWin)}
                            </p>
                          </div>
                        </div>
                      )}

                      {bet.status === "lost" && (
                        <div className="flex items-center gap-2 p-2 bg-red-500/10 rounded">
                          <TrendingDown className="w-5 h-5 text-red-600 dark:text-red-400" />
                          <div>
                            <p className="text-xs text-red-600 dark:text-red-400">
                              Lost
                            </p>
                            <p className="font-bold text-red-700 dark:text-red-300">
                              - {formatCurrency(bet.stake)}
                            </p>
                          </div>
                        </div>
                      )}

                      {bet.status === "pending" && (
                        <div className="flex items-center gap-2 p-2 bg-yellow-500/10 rounded">
                          <Clock className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                          <p className="text-sm text-yellow-700 dark:text-yellow-300 font-semibold">
                            In Progress
                          </p>
                        </div>
                      )}

                      <div className="text-xs text-muted-foreground text-center pt-2 border-t border-border">
                        {formatDate(bet.placedAt)}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <Ticket className="w-20 h-20 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-bold text-foreground mb-2">
                  No Bets Found
                </h3>
                <p className="text-muted-foreground mb-6">
                  {filter !== "all"
                    ? `You don't have any ${filter} bets.`
                    : "You haven't placed any bets yet."}
                </p>
                <Link href={ROUTES?.LIVE_EVENTS || FALLBACK_ROUTES.LIVE_EVENTS}>
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                    Place Your First Bet
                  </Button>
                </Link>
              </div>
            )}
          </TabsContent>

          <TabsContent value="active">
            {activeBets.bets.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {activeBets.bets.map((bet) => (
                  <Card
                    key={bet.id}
                    className="border-border shadow-none bg-card"
                  >
                    <CardHeader className="border-b border-border">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
                          <span className="text-sm font-semibold text-foreground">
                            #{bet.id.slice(0, 8)}
                          </span>
                        </div>
                        <Badge className="bg-yellow-500 text-white">
                          Active
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4">
                      <p className="text-center text-muted-foreground">
                        See details in &quot;All Bets&quot; tab
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <Clock className="w-20 h-20 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-bold text-foreground mb-2">
                  No Active Bets
                </h3>
                <p className="text-muted-foreground">
                  You don&apos;t have any active bets at the moment.
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="history">
            {allBets.filter((b) => b.status !== "pending").length > 0 ? (
              <div className="space-y-3">
                {allBets
                  .filter((b) => b.status !== "pending")
                  .map((bet) => (
                    <Card
                      key={bet.id}
                      className="border-border shadow-none bg-card"
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <span className="text-sm font-semibold text-foreground">
                                #{bet.id.slice(0, 8)}
                              </span>
                              {getStatusBadge(bet.status)}
                              <span className="text-xs text-muted-foreground">
                                {formatDate(bet.placedAt)}
                              </span>
                            </div>
                            <p className="text-sm text-foreground">
                              {bet.selections.length === 1
                                ? `${bet.selections[0].matchDetails?.homeTeam} vs ${bet.selections[0].matchDetails?.awayTeam}`
                                : `${bet.selections.length} selections`}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-muted-foreground">
                              Stake: {formatCurrency(bet.stake)}
                            </p>
                            <p className="font-bold text-lg">
                              {bet.status === "won" ? (
                                <span className="text-green-600 dark:text-green-400">
                                  +{" "}
                                  {formatCurrency(
                                    bet.payout || bet.potentialWin
                                  )}
                                </span>
                              ) : (
                                <span className="text-red-600 dark:text-red-400">
                                  - {formatCurrency(bet.stake)}
                                </span>
                              )}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <h3 className="text-xl font-bold text-foreground mb-2">
                  No Bet History
                </h3>
                <p className="text-muted-foreground">
                  Your completed bets will appear here.
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};
export default MyBetsPage;
