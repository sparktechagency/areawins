"use client";

import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ROUTES } from "@/lib/constants";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import { formatCurrency, formatDate } from "@/lib/utils";
import {
  Clock,
  Filter,
  Search,
  Target,
  Ticket,
  TrendingDown,
  TrendingUp,
  X,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

const FALLBACK_ROUTES = { LIVE_EVENTS: "/live-events" };
const formatOdds = (odds: number) => odds.toFixed(2);

const MyBetsPage = () => {
  const { t } = useTranslation();
  const [filter, setFilter] = useState<"all" | "won" | "lost" | "pending">(
    "all",
  );
  const [searchQuery, setSearchQuery] = useState("");

  const filterLabelMap: Record<"won" | "lost" | "pending", string> = {
    won: t("myBets.won"),
    lost: t("myBets.lost"),
    pending: t("myBets.active"),
  };

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
            selection: t("myBets.bothTeamsToScore"),
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

  const allBets = betHistory.bets;

  const filteredAndSearchedBets = useMemo(() => {
    return allBets.filter((bet) => {
      // Apply status filter
      const statusMatch = filter === "all" || bet.status === filter;

      // Apply search filter
      let searchMatch = true;
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        searchMatch =
          bet.id.toLowerCase().includes(query) ||
          bet.selections.some(
            (sel) =>
              sel.selection.toLowerCase().includes(query) ||
              sel.matchDetails?.homeTeam.toLowerCase().includes(query) ||
              sel.matchDetails?.awayTeam.toLowerCase().includes(query),
          );
      }

      return statusMatch && searchMatch;
    });
  }, [allBets, filter, searchQuery]);

  const getStatusBadge = (status: string) => {
    const config: Record<string, { className: string; label: string }> = {
      won: { className: "bg-green-500 text-white", label: t("myBets.won") },
      lost: { className: "bg-red-500 text-white", label: t("myBets.lost") },
      pending: {
        className: "bg-yellow-500 text-white",
        label: t("myBets.active"),
      },
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
              {t("myBets.title")} <Ticket className="w-8 h-8 text-primary" />
            </h1>
            <p className="text-muted-foreground mt-1">{t("myBets.subtitle")}</p>
          </div>
          <Link href={ROUTES?.LIVE_EVENTS || FALLBACK_ROUTES.LIVE_EVENTS}>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Ticket className="w-4 h-4 mr-2" />
              {t("myBets.placeNewBet")}
            </Button>
          </Link>
        </div>

        {/* Enhanced Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Total Bets Card */}
          <Card className="bg-blue-500/5 border-blue-500/20 relative overflow-hidden group shadow-none">
            <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-5 pointer-events-none group-hover:scale-110 transition-transform duration-500">
              <Ticket className="w-32 h-32" />
            </div>
            <CardContent className="p-8 relative z-10">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-blue-500 text-[10px]  uppercase tracking-[0.2em] mb-2">
                    {t("myBets.totalBets")}
                  </p>
                  <div className="text-3xl  text-foreground mb-4">
                    {totalBets}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {t("myBets.totalBetsHint")}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Active Bets Card */}
          <Card className="bg-yellow-500/5 border-yellow-500/20 relative overflow-hidden group shadow-none">
            <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-5 pointer-events-none group-hover:scale-110 transition-transform duration-500">
              <Zap className="w-32 h-32" />
            </div>
            <CardContent className="p-8 relative z-10">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-yellow-500 text-[10px]  uppercase tracking-[0.2em] mb-2">
                    {t("myBets.activeBets")}
                  </p>
                  <div className="text-3xl  text-foreground mb-4">
                    {activeCount}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {t("myBets.activeBetsHint")}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Won Bets Card */}
          <Card className="bg-green-500/5 border-green-500/20 relative overflow-hidden group shadow-none">
            <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-5 pointer-events-none group-hover:scale-110 transition-transform duration-500">
              <TrendingUp className="w-32 h-32" />
            </div>
            <CardContent className="p-8 relative z-10">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-green-500 text-[10px]  uppercase tracking-[0.2em] mb-2">
                    {t("myBets.wonBets")}
                  </p>
                  <div className="text-3xl  text-foreground mb-4">
                    {wonCount}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {t("myBets.wonBetsHint")}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Win Rate Card */}
          <Card className="bg-purple-500/5 border-purple-500/20 relative overflow-hidden group shadow-none">
            <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-5 pointer-events-none group-hover:scale-110 transition-transform duration-500">
              <Target className="w-32 h-32" />
            </div>
            <CardContent className="p-8 relative z-10">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-purple-500 text-[10px]  uppercase tracking-[0.2em] mb-2">
                    {t("myBets.winRate")}
                  </p>
                  <div className="text-3xl  text-foreground mb-4">
                    {winRate}%
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {t("myBets.winRateHint")}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter Section */}
        <div className="space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder={t("myBets.searchPlaceholder")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-10 py-2 rounded-lg border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Filter Buttons */}
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium text-muted-foreground">
                {t("myBets.filter")}
              </span>
            </div>
            <Button
              variant={filter === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("all")}
              className="cursor-pointer"
            >
              {t("myBets.allBets")}
            </Button>
            <Button
              variant={filter === "pending" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("pending")}
              className="cursor-pointer"
            >
              {t("myBets.active")}
            </Button>
            <Button
              variant={filter === "won" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("won")}
              className="cursor-pointer"
            >
              {t("myBets.won")}
            </Button>
            <Button
              variant={filter === "lost" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("lost")}
              className="cursor-pointer"
            >
              {t("myBets.lost")}
            </Button>
          </div>
        </div>

        {/* Bets Grid */}
        {filteredAndSearchedBets.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredAndSearchedBets.map((bet) => (
              <Card
                key={bet.id}
                className="border-border shadow-none bg-card hover:shadow-lg transition-all duration-300 hover:border-primary/50"
              >
                <CardHeader className="border-b border-border pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Ticket className="w-4 h-4 text-primary" />
                      </div>
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

                  <div className="space-y-2 bg-primary/5 p-3 rounded-lg">
                    {bet.selections.map((selection, index) => (
                      <div key={index} className="text-sm">
                        <p className="font-semibold text-foreground mb-1">
                          {selection.matchDetails?.homeTeam} vs{" "}
                          {selection.matchDetails?.awayTeam}
                        </p>
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground text-xs">
                            {selection.selection}
                          </span>
                          <span className="font-bold text-primary bg-primary/10 px-2 py-1 rounded text-xs">
                            @{formatOdds(selection.odds)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2 pt-2 border-t border-border">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <p className="text-muted-foreground text-xs mb-1">
                          {t("myBets.stake")}
                        </p>
                        <p className="font-bold text-foreground">
                          {formatCurrency(bet.stake)}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground text-xs mb-1">
                          {t("myBets.totalOdds")}
                        </p>
                        <p className="font-bold text-foreground">
                          {formatOdds(bet.totalOdds)}
                        </p>
                      </div>
                    </div>
                    <div className="pt-1 border-t border-border">
                      <p className="text-muted-foreground text-xs mb-1">
                        {t("myBets.potentialReturn")}
                      </p>
                      <p className=" text-lg text-primary">
                        {formatCurrency(bet.potentialWin)}
                      </p>
                    </div>
                  </div>

                  {bet.status === "won" && (
                    <div className="flex items-center gap-2 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                      <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-400 shrink-0" />
                      <div className="flex-1">
                        <p className="text-xs text-green-600 dark:text-green-400">
                          {t("myBets.wonPaid")}
                        </p>
                        <p className=" text-green-700 dark:text-green-300">
                          +{formatCurrency(bet.payout || bet.potentialWin)}
                        </p>
                      </div>
                    </div>
                  )}

                  {bet.status === "lost" && (
                    <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                      <TrendingDown className="w-5 h-5 text-red-600 dark:text-red-400 shrink-0" />
                      <div className="flex-1">
                        <p className="text-xs text-red-600 dark:text-red-400">
                          {t("myBets.lost")}
                        </p>
                        <p className=" text-red-700 dark:text-red-300">
                          -{formatCurrency(bet.stake)}
                        </p>
                      </div>
                    </div>
                  )}

                  {bet.status === "pending" && (
                    <div className="flex items-center gap-2 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                      <Clock className="w-5 h-5 text-yellow-600 dark:text-yellow-400 shrink-0" />
                      <div className="flex-1">
                        <p className="text-xs text-yellow-600 dark:text-yellow-400">
                          {t("myBets.inProgress")}
                        </p>
                        <p className="font-semibold text-yellow-700 dark:text-yellow-300">
                          {t("myBets.awaitingResults")}
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="text-xs text-muted-foreground text-center pt-2 border-t border-border">
                    {t("myBets.placedOn")} {formatDate(bet.placedAt)}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-20 h-20 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
              <Ticket className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">
              {t("myBets.noBetsFound")}
            </h3>
            <p className="text-muted-foreground mb-6">
              {searchQuery
                ? t("myBets.noSearchResults")
                : filter !== "all"
                  ? `${t("myBets.noFilterResultsPrefix")} ${filterLabelMap[filter]} ${t("myBets.noFilterResultsSuffix")}`
                  : t("myBets.noBetsYet")}
            </p>
            <Link href={ROUTES?.LIVE_EVENTS || FALLBACK_ROUTES.LIVE_EVENTS}>
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                {t("myBets.placeFirstBet")}
              </Button>
            </Link>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};
export default MyBetsPage;
