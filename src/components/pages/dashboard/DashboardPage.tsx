"use client";

/**
 * DashboardPage Component
 * Main dashboard overview with stats and recent activity
 */

import { useGetBetStatisticsQuery, useGetActiveBetsQuery } from "@/lib/redux/api/bettingApi";
import { useGetUserStatsQuery } from "@/lib/redux/api/userApi";
import { useWallet } from "@/hooks/useWallet";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatCurrency, formatOdds } from "@/lib/utils";
import { format } from "date-fns";
import {
  TrendingUp,
  TrendingDown,
  Ticket,
  Target,
  Award,
  Clock,
  ArrowUpRight,
} from "lucide-react";
import Link from "next/link";
import { ROUTES } from "@/lib/constants";

export default function DashboardPage() {
  const { data: betStats, isLoading: loadingStats } = useGetBetStatisticsQuery();
  const { data: activeBets, isLoading: loadingActive } = useGetActiveBetsQuery();
  const { data: userStats } = useGetUserStatsQuery();
  const { balance } = useWallet();

  const isLoading = loadingStats || loadingActive;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Welcome back! Here's your betting overview</p>
        </div>

        {/* Quick Stats Grid */}
        {!isLoading && betStats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Total Bets */}
            <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <Ticket className="w-10 h-10 text-primary" />
                  <ArrowUpRight className="w-5 h-5 text-primary" />
                </div>
                <p className="text-sm text-muted-foreground mb-1">Total Bets</p>
                <p className="text-3xl font-bold text-foreground">{betStats.totalBets || 0}</p>
                <p className="text-xs text-muted-foreground mt-1">All time</p>
              </CardContent>
            </Card>

            {/* Win Rate */}
            <Card className="bg-gradient-to-br from-green-50 to-green-100/50 border-green-200 dark:from-[#1a242d] dark:to-[#1a242d] dark:border-[#244732]">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <Target className="w-10 h-10 text-green-600 dark:text-green-400" />
                  <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <p className="text-sm text-muted-foreground mb-1">Win Rate</p>
                <p className="text-3xl font-bold text-green-700 dark:text-green-400">
                  {betStats.winRate ? `${betStats.winRate.toFixed(1)}%` : "0%"}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {betStats.wonBets || 0} wins / {(betStats.wonBets || 0) + (betStats.lostBets || 0)} settled
                </p>
              </CardContent>
            </Card>

            {/* Total Profit/Loss */}
            <Card
              className={`bg-gradient-to-br ${
                (betStats.netProfit || 0) >= 0
                  ? "from-green-50 to-green-100/50 border-green-200 dark:from-[#1a242d] dark:to-[#1a242d] dark:border-[#244732]"
                  : "from-red-50 to-red-100/50 border-red-200 dark:from-[#1a242d] dark:to-[#1a242d] dark:border-[#244732]"
              }`}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <Award className="w-10 h-10 text-foreground" />
                  {(betStats.netProfit || 0) >= 0 ? (
                    <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-400" />
                  ) : (
                    <TrendingDown className="w-5 h-5 text-red-600 dark:text-red-400" />
                  )}
                </div>
                <p className="text-sm text-muted-foreground mb-1">Total Profit/Loss</p>
                <p
                  className={`text-3xl font-bold ${
                    (betStats.netProfit || 0) >= 0 ? "text-green-700 dark:text-green-400" : "text-red-700 dark:text-red-400"
                  }`}
                >
                  {formatCurrency(betStats.netProfit || 0)}
                </p>
                <p className="text-xs text-muted-foreground mt-1">All time</p>
              </CardContent>
            </Card>

            {/* Active Bets */}
            <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100/50 border-yellow-200 dark:from-[#1a242d] dark:to-[#1a242d] dark:border-[#244732]">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <Clock className="w-10 h-10 text-yellow-600 dark:text-yellow-400" />
                  <Badge className="bg-yellow-500 text-white dark:bg-yellow-600 dark:text-white">Live</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-1">Active Bets</p>
                <p className="text-3xl font-bold text-yellow-700 dark:text-yellow-400">
                  {activeBets?.bets.length || 0}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Potential: {formatCurrency(
                    activeBets?.bets.reduce((sum, bet) => sum + bet.potentialWin, 0) || 0
                  )}
                </p>
              </CardContent>
            </Card>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Active Bets Section */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Active Bets</CardTitle>
                <Link href={ROUTES.MY_BETS}>
                  <Button variant="ghost" size="sm">
                    View All
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              {loadingActive ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              ) : activeBets && activeBets.bets.length > 0 ? (
                <div className="space-y-3">
                  {activeBets.bets.slice(0, 5).map((bet) => (
                    <div
                      key={bet.id}
                      className="p-4 bg-card rounded-lg hover:bg-accent transition-colors"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm font-semibold text-foreground">#{bet.id.slice(0, 8)}</span>
                            <Badge variant="outline" className="capitalize text-xs text-foreground">
                              {bet.betType.replace("_", " ")}
                            </Badge>
                          </div>
                          {"selections" in bet ? (
                            bet.selections.map((selection, index) => (
                              <p key={index} className="text-sm text-foreground">
                                {selection.teams} - <span className="font-medium">{selection.selection}</span>
                              </p>
                            ))
                          ) : (
                            <p className="text-sm text-foreground">
                              <span className="font-medium">{bet.selection}</span>
                            </p>
                          )}
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">
                            {formatOdds("totalOdds" in bet ? bet.totalOdds : bet.odds)}
                          </p>
                          <p className="text-sm font-bold text-primary">
                            {formatCurrency(bet.potentialWin)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        <span>Placed {format(new Date(bet.placedAt), "MMM dd, HH:mm")}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Ticket className="w-16 h-16 text-muted-foreground mx-auto mb-3" />
                  <p className="text-foreground mb-4">No active bets</p>
                  <Link href={ROUTES.LIVE_EVENTS}>
                    <Button className="bg-primary hover:bg-primary/90">
                      Browse Live Events
                    </Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Actions & User Stats */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href={ROUTES.LIVE_EVENTS}>
                  <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                    <Ticket className="w-4 h-4 mr-2" />
                    Place New Bet
                  </Button>
                </Link>
                <Link href={ROUTES.WALLET}>
                  <Button variant="outline" className="w-full text-foreground border-foreground/30">
                    Deposit Funds
                  </Button>
                </Link>
                <Link href={ROUTES.MY_BETS}>
                  <Button variant="outline" className="w-full text-foreground border-foreground/30">
                    View My Bets
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* User Stats */}
            {userStats && (
              <Card>
                <CardHeader>
                  <CardTitle>Your Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Total Bets</span>
                    <span className="text-sm font-semibold text-foreground">
                      {userStats.totalBets || 0}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Total Staked</span>
                    <span className="text-sm font-semibold text-foreground">
                      {formatCurrency(userStats.totalStaked || 0)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Biggest Win</span>
                    <span className="text-sm font-semibold text-green-600 dark:text-green-400">
                      {formatCurrency(userStats.biggestWin || 0)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Average Odds</span>
                    <span className="text-sm font-semibold text-primary">
                      {formatOdds(userStats.averageOdds || 0)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Win Streak</span>
                    <span className="text-sm font-semibold text-yellow-600 dark:text-yellow-400">
                      {userStats.currentStreak || 0} / {userStats.longestWinStreak || 0}
                    </span>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Recent Performance Chart Placeholder */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-card rounded-lg">
              <p className="text-muted-foreground">Performance chart will be displayed here</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
