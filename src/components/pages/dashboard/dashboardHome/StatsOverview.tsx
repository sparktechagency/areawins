"use client";
import { Card, CardContent } from "@/components/ui/card";
import { ROUTES } from "@/lib/constants";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import { formatCurrency } from "@/lib/utils";
import { ArrowRight, TrendingDown, TrendingUp, Wallet } from "lucide-react";
import Link from "next/link";
import { useGetMyWalletQuery } from "@/lib/redux/api/walletApi";

import { Skeleton } from "@/components/ui/skeleton";

export default function StatsOverview() {
  const { t } = useTranslation();
  const { data: stats, isLoading } = useGetMyWalletQuery();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="bg-muted/10 border-border h-[140px] shadow-none">
            <CardContent className="p-5 flex flex-col justify-between h-full">
              <div className="space-y-2">
                <Skeleton className="h-3 w-24" />
                <Skeleton className="h-8 w-32" />
              </div>
              <Skeleton className="h-3 w-20" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
      {/* Total Winning Balance */}
      <Card className="bg-green-500/5 border-green-500/20 relative overflow-hidden group shadow-none">
        <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-5 pointer-events-none group-hover:scale-110 transition-transform duration-500">
          <TrendingUp className="w-24 h-24 md:w-28 md:h-28" />
        </div>
        <CardContent className="p-5 relative z-10">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-green-500 text-[10px]  uppercase tracking-[0.2em] mb-2 font-medium">
                {t("dashboardStats.totalWinningBalance")}
              </p>
              <div className="text-2xl font-bold text-foreground mb-4">
                {formatCurrency(stats?.totalWinningBalance || 0)}
              </div>
              <Link
                href={ROUTES.WALLET_WITHDRAW}
                className="inline-flex items-center text-[10px]  uppercase tracking-widest text-green-500 hover:gap-2 transition-all font-semibold"
              >
                {t("dashboardStats.withdrawNow")}{" "}
                <ArrowRight className="w-3 h-3 ml-1" />
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Total Deposit */}
      <Card className="bg-blue-500/5 border-blue-500/20 relative overflow-hidden group shadow-none">
        <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-5 pointer-events-none group-hover:scale-110 transition-transform duration-500">
          <Wallet className="w-24 h-24 md:w-28 md:h-28" />
        </div>
        <CardContent className="p-5 relative z-10">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-blue-500 text-[10px]  uppercase tracking-[0.2em] mb-2 font-medium">
                {t("dashboardStats.totalDeposit")}
              </p>
              <div className="text-2xl font-bold text-foreground mb-4">
                {formatCurrency(stats?.totalDeposit || 0)}
              </div>
              <Link
                href={ROUTES.WALLET_DEPOSIT}
                className="inline-flex items-center text-[10px]  uppercase tracking-widest text-blue-500 hover:gap-2 transition-all font-semibold"
              >
                {t("dashboardStats.addFunds")}{" "}
                <ArrowRight className="w-3 h-3 ml-1" />
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Current Balance */}
      <Card className="bg-purple-500/5 border-purple-500/20 relative overflow-hidden group shadow-none">
        <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-5 pointer-events-none group-hover:scale-110 transition-transform duration-500">
          <Wallet className="w-24 h-24 md:w-28 md:h-28" />
        </div>
        <CardContent className="p-5 relative z-10">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-purple-500 text-[10px]  uppercase tracking-[0.2em] mb-2 font-medium">
                {t("dashboardStats.totalBalance")}
              </p>
              <div className="text-2xl font-bold text-foreground mb-4">
                {formatCurrency(stats?.totalBalance || 0)}
              </div>
              <Link
                href={ROUTES.WALLET}
                className="inline-flex items-center text-[10px]  uppercase tracking-widest text-purple-500 hover:gap-2 transition-all font-semibold"
              >
                {t("dashboardStats.viewWallet")}{" "}
                <ArrowRight className="w-3 h-3 ml-1" />
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Total Loss */}
      <Card className="bg-red-500/5 border-red-500/20 relative overflow-hidden group shadow-none">
        <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-5 pointer-events-none group-hover:scale-110 transition-transform duration-500">
          <TrendingDown className="w-24 h-24 md:w-28 md:h-28" />
        </div>
        <CardContent className="p-5 relative z-10">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-red-500 text-[10px]  uppercase tracking-[0.2em] mb-2 font-medium">
                {t("dashboardStats.totalLoss")}
              </p>
              <div className="text-2xl font-bold text-foreground mb-4">
                {formatCurrency(stats?.totalLoss || 0)}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
