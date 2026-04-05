/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { ROUTES } from "@/constants";
import { useTranslation } from "@/i18n/LanguageContext";
import { cn, formatCurrency } from "@/lib/utils";
import {
  ArrowDownLeft,
  ArrowUpRight,
  Badge,
  Coins,
  DollarSign,
  Shield,
  TrendingUp,
  Wallet2,
  RefreshCw,
  Clock,
} from "lucide-react";
import Link from "next/link";
import { useGetMyWalletQuery } from "@/redux/api/walletApi";
import { useGetMyTransactionsQuery } from "@/redux/api/transactionApi";
import { format } from "date-fns";
import { useGetPaymentSettingsQuery } from "@/redux/api/paymentApi";
import Image from "next/image";
import { IPaymentSetting } from "@/interfaces/paymentSetting.interface";

const WalletPage = () => {
  const { t } = useTranslation();
  const {
    data: wallet,
    isLoading: isWalletLoading,
    refetch: refetchWallet,
  } = useGetMyWalletQuery();
  const { data: transactions, isLoading: isTxLoading } =
    useGetMyTransactionsQuery({});
  const { data: paymentSettingsResponse, isLoading: isPaymentSettingsLoading } =
    useGetPaymentSettingsQuery(null);
  const paymentSettings = paymentSettingsResponse?.data;

  const balance = wallet?.totalBalance ?? 0;
  const depositedBalance = wallet?.depositedBalance ?? 0;
  const winningsBalance = wallet?.winningsBalance ?? 0;

  return (
    <DashboardLayout>
      <div className="w-full mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8 flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
              {t("wallet.title")} <Wallet2 className="w-8 h-8 text-primary" />
            </h1>
            <p className="text-muted-foreground mt-2">{t("wallet.subtitle")}</p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => refetchWallet()}
            className="gap-2"
            disabled={isWalletLoading}
          >
            <RefreshCw
              className={isWalletLoading ? "animate-spin size-4" : "size-4"}
            />
            Refresh
          </Button>
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
              <div className="text-3xl font-bold text-foreground mb-4">
                {formatCurrency(depositedBalance)}
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
              <div className="text-3xl font-bold text-foreground mb-4">
                {formatCurrency(winningsBalance)}
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
              <div className="text-3xl font-bold text-foreground mb-4">
                {formatCurrency(balance)}
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
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {paymentSettings?.map((pm: IPaymentSetting) => (
                  <div
                    key={pm.method}
                    className="flex flex-col items-center justify-between p-4 border border-border/50 rounded-lg bg-card hover:bg-muted/30 transition-all"
                  >
                    <Image
                      src={pm.imageUrl}
                      alt={pm.method}
                      width={90}
                      height={90}
                      className="mx-auto"
                    />
                  </div>
                ))}
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
                {[
                  {
                    title: t("wallet.ruleDeposit"),
                    desc: t("wallet.ruleDepositDesc"),
                    color: "bg-blue-500",
                  },
                  {
                    title: t("wallet.ruleWinning"),
                    desc: t("wallet.ruleWinningDesc"),
                    color: "bg-green-500",
                  },
                  {
                    title: t("wallet.ruleVerified"),
                    desc: t("wallet.ruleVerifiedDesc"),
                    color: "bg-purple-500",
                  },
                ].map((rule) => (
                  <div key={rule.title} className="flex gap-3">
                    <div
                      className={cn(
                        "w-2 h-2 rounded-full mt-1.5 shrink-0",
                        rule.color,
                      )}
                    ></div>
                    <div className="text-sm">
                      <p className="font-medium text-foreground">
                        {rule.title}
                      </p>
                      <p className="text-[11px] text-muted-foreground leading-relaxed">
                        {rule.desc}
                      </p>
                    </div>
                  </div>
                ))}
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
            {isTxLoading ? (
              <div className="flex flex-col items-center justify-center py-12 gap-3 text-muted-foreground">
                <RefreshCw className="animate-spin w-8 h-8 opacity-20" />
                <p className="text-sm">Loading transactions...</p>
              </div>
            ) : transactions && transactions.length > 0 ? (
              <div className="space-y-2">
                {transactions.slice(0, 5).map((tx: any) => (
                  <div
                    key={tx._id}
                    className="flex items-center justify-between p-4 hover:bg-muted/50 rounded-lg transition-colors border border-border/50"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={cn(
                          "p-2.5 rounded-full",
                          tx.type === "deposit"
                            ? "bg-green-100 text-green-600"
                            : "bg-blue-100 text-blue-600",
                        )}
                      >
                        {tx.type === "deposit" ? (
                          <ArrowDownLeft className="h-5 w-5" />
                        ) : (
                          <ArrowUpRight className="h-5 w-5" />
                        )}
                      </div>
                      <div>
                        <p className="font-bold text-sm text-foreground capitalize">
                          {tx.type} via {tx.paymentMethod?.replace("_", " ")}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {format(
                            new Date(tx.createdAt),
                            "MMM dd, yyyy 'at' hh:mm a",
                          )}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p
                        className={cn(
                          "font-bold text-sm",
                          tx.type === "deposit"
                            ? "text-green-600"
                            : "text-blue-600",
                        )}
                      >
                        {tx.type === "deposit" ? "+" : "-"}
                        {formatCurrency(tx.amount)}
                      </p>
                      <p
                        className={cn(
                          "text-[10px] font-bold px-2 py-0.5 rounded-full inline-block mt-1",
                          tx.status === "completed"
                            ? "bg-green-500/10 text-green-600"
                            : "bg-yellow-500/10 text-yellow-600",
                        )}
                      >
                        {tx.status}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 border-2 border-dashed border-border/50 rounded-lg">
                <Clock className="w-12 h-12 text-muted-foreground/20 mx-auto mb-4" />
                <p className="text-muted-foreground text-sm font-medium">
                  No transactions found
                </p>
                <p className="text-[10px] text-muted-foreground/60 mt-1">
                  Your recent financial activity will appear here.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default WalletPage;
