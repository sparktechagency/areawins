"use client";

/**
 * BettingMarketPage Component
 * Display user's betting history in a grid layout
 */

import { useGetBetHistoryQuery } from "@/lib/redux/api/bettingApi";
import MainLayout from "@/components/layouts/MainLayout";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatCurrency, formatDate, formatOdds } from "@/lib/utils";
import { Ticket, TrendingUp, TrendingDown, Clock } from "lucide-react";
import Link from "next/link";
import { ROUTES } from "@/lib/constants";

export default function BettingMarketPage() {
  const { data: betHistory, isLoading } = useGetBetHistoryQuery({ limit: 50 });

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      won: { className: "bg-green-500 text-white", label: "Won" },
      lost: { className: "bg-red-500 text-white", label: "Lost" },
      pending: { className: "bg-yellow-500 text-white", label: "Pending" },
      cashed_out: { className: "bg-blue-500 text-white", label: "Cashed Out" },
      cancelled: { className: "bg-gray-500 text-white", label: "Cancelled" },
      void: { className: "bg-gray-400 text-white", label: "Void" },
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    return <Badge className={config.className}>{config.label}</Badge>;
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Ticket className="w-10 h-10 text-primary" />
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Betting Market</h1>
              <p className="text-gray-600 mt-1">Your betting history and active bets</p>
            </div>
          </div>
          <Link href={ROUTES.LIVE_EVENTS}>
            <Button className="bg-primary hover:bg-primary/90">
              Place New Bet
            </Button>
          </Link>
        </div>

        {/* Bets Grid */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-gray-600">Loading your bets...</p>
            </div>
          </div>
        ) : betHistory && betHistory.bets.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {betHistory.bets.map((bet) => (
              <Card key={bet.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardHeader className="bg-gray-50 border-b pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Ticket className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-600">Bet ID</p>
                        <p className="text-sm font-semibold text-gray-900">
                          #{bet.id.slice(0, 8)}
                        </p>
                      </div>
                    </div>
                    {getStatusBadge(bet.status)}
                  </div>
                </CardHeader>

                <CardContent className="p-4 space-y-3">
                  {/* Bet Type */}
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Type</p>
                    <Badge variant="outline" className="capitalize">
                      {bet.betType.replace("_", " ")}
                    </Badge>
                  </div>

                  {/* Selections */}
                  <div>
                    <p className="text-xs text-gray-600 mb-2">Selections</p>
                    <div className="space-y-2">
                      {bet.selections.map((selection, index) => (
                        <div
                          key={index}
                          className="p-2 bg-gray-50 rounded text-sm"
                        >
                          <p className="font-medium text-gray-900">
                            {selection.matchDetails?.homeTeam} vs {selection.matchDetails?.awayTeam}
                          </p>
                          <div className="flex items-center justify-between mt-1">
                            <span className="text-gray-600">{selection.selection}</span>
                            <span className="font-bold text-primary">
                              {formatOdds(selection.odds)}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Stake and Potential Win */}
                  <div className="space-y-2 pt-3 border-t">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Stake:</span>
                      <span className="font-semibold text-gray-900">
                        {formatCurrency(bet.stake)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Total Odds:</span>
                      <span className="font-semibold text-gray-900">
                        {formatOdds(bet.totalOdds)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Potential Win:</span>
                      <span className="font-bold text-lg text-primary">
                        {formatCurrency(bet.potentialWin)}
                      </span>
                    </div>
                  </div>

                  {/* Result */}
                  {bet.status === "won" && (
                    <div className="flex items-center gap-2 p-2 bg-green-50 rounded">
                      <TrendingUp className="w-5 h-5 text-green-600" />
                      <div className="flex-1">
                        <p className="text-xs text-green-600">Won</p>
                        <p className="font-bold text-green-700">
                          + {formatCurrency(bet.payout || bet.potentialWin)}
                        </p>
                      </div>
                    </div>
                  )}

                  {bet.status === "lost" && (
                    <div className="flex items-center gap-2 p-2 bg-red-50 rounded">
                      <TrendingDown className="w-5 h-5 text-red-600" />
                      <div className="flex-1">
                        <p className="text-xs text-red-600">Lost</p>
                        <p className="font-bold text-red-700">
                          - {formatCurrency(bet.stake)}
                        </p>
                      </div>
                    </div>
                  )}

                  {bet.status === "pending" && (
                    <div className="flex items-center gap-2 p-2 bg-yellow-50 rounded">
                      <Clock className="w-5 h-5 text-yellow-600" />
                      <div className="flex-1">
                        <p className="text-xs text-yellow-600">In Progress</p>
                        <p className="font-semibold text-yellow-700">
                          Awaiting result
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Placed At */}
                  <div className="text-xs text-gray-500 text-center pt-2 border-t">
                    Placed {formatDate(bet.placedAt, "MMM dd, yyyy HH:mm")}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <Ticket className="w-20 h-20 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No Bets Yet</h2>
            <p className="text-gray-600 mb-6">
              You haven't placed any bets yet. Start betting now!
            </p>
            <Link href={ROUTES.LIVE_EVENTS}>
              <Button className="bg-primary hover:bg-primary/90">
                Browse Live Events
              </Button>
            </Link>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
