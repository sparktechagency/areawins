"use client";

import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTranslation } from "@/i18n/LanguageContext";
import { cn } from "@/lib/utils";
import { ArrowUpRight, History, Info, Lock, Wallet } from "lucide-react";
import { useGetMyWalletQuery, useWithdrawMutation } from "@/redux/api/walletApi";
import { useState } from "react";
import { toast } from "sonner";

// Constants
// Constants
const PAYMENT_METHODS = [
  { id: "stripe", name: "Stripe", color: "bg-blue-600", icon: Wallet },
  { id: "paypal", name: "PayPal", color: "bg-blue-800", icon: Wallet },
  { id: "crypto_usdt", name: "Crypto (USDT)", color: "bg-emerald-600", icon: Wallet },
  { id: "bank_transfer", name: "Bank Transfer", color: "bg-red-600", icon: Wallet },
  { id: "visa_mastercard", name: "Visa/Mastercard", color: "bg-orange-500", icon: Wallet },
];

const RECENT_WITHDRAWALS = [
  { id: 1, date: "Dec 14", method: "Stripe", amount: "25.00", status: "Pending" },
  { id: 2, date: "Dec 12", method: "Crypto", amount: "35.00", status: "Completed" },
  { id: 3, date: "Dec 10", method: "Bank Transfer", amount: "65.00", status: "Completed" },
];

const WithdrawPage = () => {
  const { t } = useTranslation();
  const { data: wallet, refetch: refetchWallet } = useGetMyWalletQuery();
  const [createWithdraw, { isLoading: isWithdrawing }] = useWithdrawMutation();
  
  const [amount, setAmount] = useState("");
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [accountNumber, setAccountNumber] = useState("");

  const handleWithdraw = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMethod || !amount || !accountNumber) {
      toast.error(t("walletWithdraw.toastFillAll"));
      return;
    }

    try {
      const response = await createWithdraw({
        paymentMethod: selectedMethod,
        amount: Number(amount),
        meta: { accountNumber }
      }).unwrap();

      if (response.success || response.data) {
        toast.success(t("walletWithdraw.toastSubmitted"));
        setAmount("");
        setAccountNumber("");
        setSelectedMethod(null);
        refetchWallet();
      }
    } catch (error: unknown) {
      const errorMsg = (error as { data?: { message?: string } })?.data?.message || "Failed to submit withdrawal request";
      toast.error(errorMsg);
    }
  };

  const setPercentage = (pct: number) => {
    const balance = wallet?.totalBalance || 0;
    setAmount(Math.floor(balance * (pct / 100)).toString());
  };

  return (
    <DashboardLayout>
      <div className="w-full mx-auto max-w-6xl">
        <div className="space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              {t("walletWithdraw.title")}
            </h1>
            <p className="text-muted-foreground">
              {t("walletWithdraw.subtitle")}
            </p>
          </div>

          {/* Balance Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="bg-primary/5 border-primary/20 text-foreground relative overflow-hidden">
              <div className="absolute top-0 right-0 p-3">
                <Badge className="bg-emerald-500 hover:bg-emerald-600 text-[9px]  uppercase tracking-widest rounded-full">
                  {t("walletWithdraw.withdrawable")}
                </Badge>
              </div>
              <CardContent className="p-6">
                <div>
                  <p className="text-xs text-primary  uppercase tracking-widest flex items-center gap-2 mb-2">
                    <ArrowUpRight className="w-4 h-4" />{" "}
                    {t("walletWithdraw.winningBalance")}
                  </p>
                  <h2 className="text-3xl ">
                    {(wallet?.totalBalance || 0).toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                    })}
                  </h2>
                  <p className="text-[10px] text-muted-foreground mt-2 font-medium">
                    {t("walletWithdraw.availableForPayout")}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-muted/10 border-border text-foreground opacity-60">
              <CardContent className="p-6">
                <div>
                  <p className="text-xs text-muted-foreground  uppercase tracking-widest flex items-center gap-2 mb-2">
                    <Lock className="w-4 h-4" />{" "}
                    {t("walletWithdraw.depositBalance")}
                  </p>
                  <h2 className="text-3xl ">
                    {(wallet?.lockedBalance || 0).toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                    })}
                  </h2>
                  <p className="text-[10px] text-muted-foreground mt-2 font-medium italic">
                    {t("walletWithdraw.lockedForBetting")}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Form Area */}
            <div className="lg:col-span-2 space-y-6">
              {/* Payment Methods */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold flex items-center gap-2">
                    <span className="bg-primary text-primary-foreground w-6 h-6 rounded-full flex items-center justify-center text-sm">
                      1
                    </span>{" "}
                    {t("walletWithdraw.step1")}
                  </h3>
                  <button className="text-primary text-sm hover:underline">
                    {t("walletWithdraw.manageAccounts")}
                  </button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {PAYMENT_METHODS.map((method) => {
                    const Icon = method.icon;
                    const isSelected = selectedMethod === method.id;

                    return (
                      <div
                        key={method.id}
                        onClick={() => setSelectedMethod(method.id)}
                        className={cn(
                          "cursor-pointer rounded-lg border-2 p-4 flex flex-col items-center justify-center gap-3 transition-all h-32 relative",
                          isSelected
                            ? "border-primary bg-primary/10"
                            : "border-border hover:border-primary/50 bg-card",
                        )}
                      >
                        <div
                          className={cn(
                            "w-12 h-12 rounded-full flex items-center justify-center text-white",
                            method.color,
                          )}
                        >
                          <Icon className="w-6 h-6" />
                        </div>
                        <div className="text-center">
                          <p className="font-bold text-foreground">
                            {method.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {t("walletWithdraw.instant")}
                          </p>
                        </div>
                        {isSelected && (
                          <div className="absolute top-2 right-2 w-3 h-3 bg-primary rounded-full" />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Withdrawal Details */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="bg-primary text-primary-foreground w-6 h-6 rounded-full flex items-center justify-center text-sm">
                    2
                  </span>
                  <h3 className="text-xl font-bold">
                    {t("walletWithdraw.step2")}
                  </h3>
                </div>

                <Card className="bg-[#1a2c24]/50 border-white/5">
                  <CardContent className="p-6 space-y-6">
                    <div className="space-y-2">
                      <Label>{t("walletWithdraw.amountToWithdraw")}</Label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                          VES
                        </span>
                        <Input
                          type="number"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          className="pl-8 h-12 bg-background border-input text-lg font-bold"
                          placeholder="0.00"
                        />
                        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 bg-muted/50"
                            onClick={() => setPercentage(25)}
                          >
                            25%
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 bg-muted/50"
                            onClick={() => setPercentage(50)}
                          >
                            50%
                          </Button>
                          <Button
                            size="sm"
                            className="h-8 bg-primary text-primary-foreground hover:bg-primary/90"
                            onClick={() => setPercentage(100)}
                          >
                            MAX
                          </Button>
                        </div>
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground px-1">
                        <span>{t("walletWithdraw.min")} 1,000</span>
                        <span>{t("walletWithdraw.max")} 5,000,000</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>
                        {selectedMethod
                          ? `${
                              PAYMENT_METHODS.find(
                                (m) => m.id === selectedMethod,
                              )?.name
                            } ${
                              selectedMethod === "venezuela"
                                ? t("walletWithdraw.account")
                                : t("walletWithdraw.address")
                            }`
                          : t("walletWithdraw.accountAddress")}
                      </Label>
                      <div className="relative">
                        <Input
                          value={accountNumber}
                          onChange={(e) => setAccountNumber(e.target.value)}
                          className="h-12 bg-background border-input"
                          placeholder={
                            selectedMethod === "venezuela"
                              ? "VZ-XXXX-XXXX"
                              : "1A2b3C4d5E6f7G..."
                          }
                        />
                      </div>
                    </div>

                    <Button
                      onClick={handleWithdraw}
                      className="w-full h-12 text-lg font-bold shadow-lg shadow-primary/20"
                      disabled={isWithdrawing}
                    >
                      {isWithdrawing
                        ? t("walletWithdraw.processing")
                        : t("walletWithdraw.confirmWithdrawal")}
                    </Button>

                    <p className="text-xs text-center text-muted-foreground flex items-center justify-center gap-1">
                      <Lock className="w-3 h-3" />{" "}
                      {t("walletWithdraw.encrypted")}
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="space-y-6">
              {/* Recent Withdrawals */}
              <Card className="bg-[#1a2c24] border-white/5 text-white">
                <CardContent className="p-0">
                  <div className="p-4 border-b border-white/10 flex justify-between items-center">
                    <h3 className="font-bold flex items-center gap-2">
                      <History className="w-4 h-4" />{" "}
                      {t("walletWithdraw.recentWithdrawals")}
                    </h3>
                    <span className="text-xs text-primary cursor-pointer hover:underline">
                      {t("wallet.viewAll")}
                    </span>
                  </div>
                  <div className="p-2">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="text-gray-400 text-xs border-b border-white/5">
                          <th className="text-left py-2 px-2 font-medium">
                            {t("walletWithdraw.date")}
                          </th>
                          <th className="text-left py-2 px-2 font-medium">
                            {t("walletWithdraw.method")}
                          </th>
                          <th className="text-right py-2 px-2 font-medium">
                            {t("walletWithdraw.amount")}
                          </th>
                          <th className="text-right py-2 px-2 font-medium">
                            {t("walletWithdraw.status")}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {RECENT_WITHDRAWALS.map((tx) => (
                          <tr
                            key={tx.id}
                            className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors"
                          >
                            <td className="py-3 px-2 text-gray-300 text-xs">
                              {tx.date}
                            </td>
                            <td className="py-3 px-2 font-medium">
                              {tx.method}
                            </td>
                            <td className="py-3 px-2 text-right font-mono">
                              {tx.amount}
                            </td>
                            <td className="py-3 px-2 text-right">
                              <span
                                className={cn(
                                  "text-[10px] px-2 py-0.5 rounded-full font-bold",
                                  tx.status === "Completed"
                                    ? "bg-green-500/20 text-green-400"
                                    : tx.status === "Pending"
                                      ? "bg-yellow-500/20 text-yellow-400"
                                      : "bg-red-500/20 text-red-400",
                                )}
                              >
                                {tx.status === "Completed"
                                  ? t("wallet.completed")
                                  : tx.status === "Pending"
                                    ? t("walletWithdraw.pending")
                                    : t("walletWithdraw.rejected")}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              {/* Important Info */}
              <Card className="bg-[#1a2c24]/50 border-dashed border-primary/30">
                <CardContent className="p-5 space-y-4">
                  <div className="flex items-center gap-2 text-primary font-bold">
                    <Info className="w-5 h-5" />{" "}
                    {t("walletWithdraw.importantInfo")}
                  </div>
                  <ul className="text-sm text-gray-400 space-y-2 list-disc pl-4 marker:text-primary">
                    <li>
                      {t("walletWithdraw.dailyLimit")}{" "}
                      <span className="text-white font-bold">10,000,000</span>
                    </li>
                    <li>
                      {t("walletWithdraw.processingTime")}{" "}
                      <span className="text-white font-bold">24-48 hours</span>{" "}
                      {t("walletWithdraw.processingTimeTail")}
                    </li>
                    <li>{t("walletWithdraw.ensureDetails")}</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default WithdrawPage;
