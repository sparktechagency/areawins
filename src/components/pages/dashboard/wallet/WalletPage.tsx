"use client";

import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ROUTES } from "@/lib/constants";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import { formatCurrency } from "@/lib/utils";
import {
  ArrowDownLeft,
  ArrowUpRight,
  Badge,
  Bitcoin,
  Coins,
  DollarSign,
  Shield,
  TrendingUp,
  Wallet2,
} from "lucide-react";
import Link from "next/link";

const WalletPage = () => {
  const { t } = useTranslation();
  return (
    <DashboardLayout>
      <div className="w-full mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
            {t("wallet.title")} <Wallet2 className="w-8 h-8 text-primary" />
          </h1>
          <p className="text-muted-foreground mt-2">{t("wallet.subtitle")}</p>
        </div>

        {/* Balance Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Deposit Balance Card */}
          <Card className="bg-blue-500/5 border-blue-500/20 relative overflow-hidden group shadow-none">
            <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-5 pointer-events-none group-hover:scale-110 transition-transform duration-500">
              <ArrowDownLeft className="w-32 h-32" />
            </div>
            <CardContent className="p-8 relative z-10">
              <div className="flex items-center gap-2 text-blue-500 mb-2">
                <ArrowDownLeft className="size-4" />
                <p className="text-xs  uppercase tracking-[0.2em]">
                  {t("wallet.depositBalance")}
                </p>
              </div>
              <div className="text-3xl  text-foreground mb-4">
                {formatCurrency(5450)}
              </div>
              <p className="text-xs text-muted-foreground mb-4">
                {t("wallet.availableForBetting")}
              </p>
              <Link
                href={ROUTES.WALLET_DEPOSIT || "/dashboard/wallet/deposit"}
                className="block"
              >
                <Button className="w-full h-10 text-sm  uppercase tracking-widest rounded-lg bg-blue-500 hover:bg-blue-600">
                  {t("wallet.addFunds")}
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Winning Balance Card */}
          <Card className="bg-green-500/5 border-green-500/20 relative overflow-hidden group shadow-none">
            <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-5 pointer-events-none group-hover:scale-110 transition-transform duration-500">
              <ArrowUpRight className="w-32 h-32" />
            </div>
            <div className="absolute top-0 right-0 p-3 z-20">
              <Badge className="bg-green-500 hover:bg-green-600 text-[9px]  uppercase tracking-widest rounded-full">
                {t("wallet.withdrawable")}
              </Badge>
            </div>
            <CardContent className="p-8 relative z-10">
              <div className="flex items-center gap-2 text-green-500 mb-2">
                <TrendingUp className="size-4" />
                <p className="text-xs  uppercase tracking-[0.2em]">
                  {t("wallet.winningBalance")}
                </p>
              </div>
              <div className="text-3xl  text-foreground mb-4">
                {formatCurrency(10000)}
              </div>
              <p className="text-xs text-muted-foreground mb-4">
                {t("wallet.readyToWithdraw")}
              </p>
              <Link
                href={ROUTES.WALLET_WITHDRAW || "/dashboard/wallet/withdraw"}
                className="block"
              >
                <Button className="w-full h-10 text-sm  uppercase tracking-widest rounded-lg bg-green-500 hover:bg-green-600 text-white">
                  {t("wallet.withdrawNow")}
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Total Balance Card */}
          <Card className="bg-purple-500/5 border-purple-500/20 relative overflow-hidden group shadow-none">
            <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-5 pointer-events-none group-hover:scale-110 transition-transform duration-500">
              <Wallet2 className="w-32 h-32" />
            </div>
            <CardContent className="p-8 relative z-10">
              <div className="flex items-center gap-2 text-purple-500 mb-2">
                <Coins className="size-4" />
                <p className="text-xs  uppercase tracking-[0.2em]">
                  {t("wallet.totalBalance")}
                </p>
              </div>
              <div className="text-3xl  text-foreground mb-4">
                {formatCurrency(15450)}
              </div>
              <p className="text-xs text-muted-foreground mb-4">
                {t("wallet.allAccountsCombined")}
              </p>
              <div className="h-10 rounded-lg bg-muted/50 flex items-center justify-center text-xs font-bold text-foreground">
                {t("wallet.overview")}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Payment Methods */}
          <Card className="border border-border shadow-none lg:col-span-2">
            <CardHeader>
              <CardTitle>{t("wallet.paymentMethods")}</CardTitle>
              <CardDescription>
                {t("wallet.paymentMethodsSubtitle")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {/* Venezuela Pay */}
                <div className="flex items-center justify-between p-4 border border-indigo-600/30 rounded-lg bg-linear-to-br from-indigo-600/10 to-purple-600/10  transition-all">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-linear-to-br from-indigo-600 to-purple-600 flex items-center justify-center shadow-lg">
                      <DollarSign className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className=" text-sm">Venezuela Pay</p>
                      <p className="text-xs text-muted-foreground">
                        {t("wallet.localTransfers")}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Bitcoin */}
                <div className="flex items-center justify-between p-4 border border-amber-500/30 rounded-lg bg-linear-to-br from-amber-500/10 to-orange-600/10  transition-all">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-linear-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg">
                      <Bitcoin className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className=" text-sm">Bitcoin (BTC)</p>
                      <p className="text-xs text-muted-foreground">
                        {t("wallet.cryptoFastSettlements")}
                      </p>
                    </div>
                  </div>
                </div>

                {/* USDT Tether */}
                <div className="flex items-center justify-between p-4 border border-cyan-500/30 rounded-lg bg-linear-to-br from-cyan-500/10 to-blue-600/10  transition-all">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-linear-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg">
                      <Coins className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className=" text-sm">Tether (USDT)</p>
                      <p className="text-xs text-muted-foreground">
                        {t("wallet.stablecoinLowFees")}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Ethereum */}
                <div className="flex items-center justify-between p-4 border border-violet-600/30 rounded-lg bg-linear-to-br from-violet-600/10 to-pink-600/10  transition-all">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-linear-to-br from-violet-600 to-pink-600 flex items-center justify-center shadow-lg">
                      <Coins className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className=" text-sm">Ethereum (ETH)</p>
                      <p className="text-xs text-muted-foreground">
                        {t("wallet.smartContracts")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Security Info */}
          <Card className="border border-border shadow-none">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-green-500" />
                {t("wallet.securityRules")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex gap-3">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 shrink-0"></div>
                  <div className="text-sm">
                    <p className="font-medium text-foreground">
                      {t("wallet.ruleDeposit")}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {t("wallet.ruleDepositDesc")}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-500 mt-1.5 shrink-0"></div>
                  <div className="text-sm">
                    <p className="font-medium text-foreground">
                      {t("wallet.ruleWinning")}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {t("wallet.ruleWinningDesc")}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-2 h-2 rounded-full bg-purple-500 mt-1.5 shrink-0"></div>
                  <div className="text-sm">
                    <p className="font-medium text-foreground">
                      {t("wallet.ruleVerified")}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {t("wallet.ruleVerifiedDesc")}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Transactions */}
        <Card className="border border-border shadow-none">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>
                {t("wallet.recentTransactionsDesc")}
              </CardDescription>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="text-primary font-bold"
            >
              {t("wallet.viewAll")}
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {/* Deposit Transaction */}
              <div className="flex items-center justify-between p-4 hover:bg-muted/50 rounded-lg transition-colors border border-border/50">
                <div className="flex items-center gap-4">
                  <div className="p-2.5 rounded-full bg-green-100 text-green-600">
                    <ArrowDownLeft className="h-5 w-5" />
                  </div>
                  <div>
                    <p className=" text-sm text-foreground">
                      {t("wallet.depositVenezuela")}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {t("wallet.todayAt")}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className=" text-green-600 text-sm">+5,000</p>
                  <p className="text-xs text-green-600/70 font-medium">
                    {t("wallet.completed")}
                  </p>
                </div>
              </div>

              {/* Withdrawal Transaction */}
              <div className="flex items-center justify-between p-4 hover:bg-muted/50 rounded-lg transition-colors border border-border/50">
                <div className="flex items-center gap-4">
                  <div className="p-2.5 rounded-full bg-blue-100 text-blue-600">
                    <ArrowUpRight className="h-5 w-5" />
                  </div>
                  <div>
                    <p className=" text-sm text-foreground">
                      {t("wallet.withdrawalBitcoin")}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {t("wallet.yesterdayAt")}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className=" text-blue-600 text-sm">-3,500</p>
                  <p className="text-xs text-blue-600/70 font-medium">
                    {t("wallet.completed")}
                  </p>
                </div>
              </div>

              {/* Winning Transaction */}
              <div className="flex items-center justify-between p-4 hover:bg-muted/50 rounded-lg transition-colors border border-border/50">
                <div className="flex items-center gap-4">
                  <div className="p-2.5 rounded-full bg-yellow-100 text-yellow-600">
                    <TrendingUp className="h-5 w-5" />
                  </div>
                  <div>
                    <p className=" text-sm text-foreground">
                      {t("wallet.winningsAdded")}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {t("wallet.dec14At")}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className=" text-yellow-600 text-sm">+1,250</p>
                  <p className="text-xs text-yellow-600/70 font-medium">
                    {t("wallet.completed")}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default WalletPage;
