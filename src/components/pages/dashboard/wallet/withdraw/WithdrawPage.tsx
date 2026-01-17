"use client";

import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { ArrowUpRight, History, Info, Lock, Wallet } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

// Mock Data
const PAYMENT_METHODS = [
  { id: "venezuela", name: "Venezuela Pay", color: "bg-red-600", icon: Wallet },
  { id: "crypto", name: "Crypto", color: "bg-yellow-600", icon: Wallet },
  { id: "bitcoin", name: "Bitcoin", color: "bg-orange-500", icon: Wallet },
  { id: "ethereum", name: "Ethereum", color: "bg-purple-600", icon: Wallet },
  { id: "tether", name: "Tether (USDT)", color: "bg-green-500", icon: Wallet },
  { id: "binance", name: "BNB", color: "bg-yellow-500", icon: Wallet },
];

const RECENT_WITHDRAWALS = [
  {
    id: 1,
    date: "Dec 14",
    method: "Ethereum",
    amount: "2,500",
    status: "Pending",
  },
  {
    id: 2,
    date: "Dec 12",
    method: "Bitcoin",
    amount: "350",
    status: "Completed",
  },
  {
    id: 3,
    date: "Dec 10",
    method: "Venezuela Pay",
    amount: "650,000",
    status: "Completed",
  },
  {
    id: 4,
    date: "Dec 8",
    method: "Tether (USDT)",
    amount: "200",
    status: "Rejected",
  },
  { id: 5, date: "Dec 5", method: "BNB", amount: "520", status: "Completed" },
];

const WithdrawPage = () => {
  const [amount, setAmount] = useState("");
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [accountNumber, setAccountNumber] = useState("");
  const [loading, setLoading] = useState(false);

  const handleWithdraw = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMethod || !amount || !accountNumber) {
      toast.error("Please fill in all details");
      return;
    }

    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    toast.success("Withdrawal request submitted successfully!");
    setLoading(false);
    setAmount("");
    setAccountNumber("");
    setSelectedMethod(null);
  };

  const setPercentage = (pct: number) => {
    // Mock balance
    const balance = 12450;
    setAmount(Math.floor(balance * (pct / 100)).toString());
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Withdraw Funds</h1>
          <p className="text-muted-foreground">
            Secure & Fast Payouts to your preferred account.
          </p>
        </div>

        {/* Balance Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="bg-primary/5 border-primary/20 text-foreground relative overflow-hidden">
            <div className="absolute top-0 right-0 p-3">
              <Badge className="bg-emerald-500 hover:bg-emerald-600 text-[9px] font-black uppercase tracking-widest rounded-full">
                Withdrawable
              </Badge>
            </div>
            <CardContent className="p-6">
              <div>
                <p className="text-xs text-primary font-black uppercase tracking-widest flex items-center gap-2 mb-2">
                  <ArrowUpRight className="w-4 h-4" /> WINNING BALANCE
                </p>
                <h2 className="text-3xl font-black">VES 12,450.00</h2>
                <p className="text-[10px] text-muted-foreground mt-2 font-medium">
                  Funds available for immediate payout
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-muted/10 border-border text-foreground opacity-60">
            <CardContent className="p-6">
              <div>
                <p className="text-xs text-muted-foreground font-black uppercase tracking-widest flex items-center gap-2 mb-2">
                  <Lock className="w-4 h-4" /> DEPOSIT BALANCE
                </p>
                <h2 className="text-3xl font-black">VES 500.00</h2>
                <p className="text-[10px] text-muted-foreground mt-2 font-medium italic">
                  Locked for betting activity only
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
                  Select Method
                </h3>
                <button className="text-primary text-sm hover:underline">
                  Manage Accounts
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
                          : "border-border hover:border-primary/50 bg-card"
                      )}
                    >
                      <div
                        className={cn(
                          "w-12 h-12 rounded-full flex items-center justify-center text-white",
                          method.color
                        )}
                      >
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="text-center">
                        <p className="font-bold text-foreground">
                          {method.name}
                        </p>
                        <p className="text-xs text-muted-foreground">Instant</p>
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
                <h3 className="text-xl font-bold">Withdrawal Details</h3>
              </div>

              <Card className="bg-[#1a2c24]/50 border-white/5">
                <CardContent className="p-6 space-y-6">
                  <div className="space-y-2">
                    <Label>Amount to Withdraw</Label>
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
                      <span>Min: VES 1,000</span>
                      <span>Max: VES 5,000,000</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>
                      {selectedMethod
                        ? `${
                            PAYMENT_METHODS.find((m) => m.id === selectedMethod)
                              ?.name
                          } ${
                            selectedMethod === "venezuela"
                              ? "Account"
                              : "Address"
                          }`
                        : "Account/Address"}
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
                    disabled={loading}
                  >
                    {loading ? "Processing..." : "Confirm Withdrawal"}
                  </Button>

                  <p className="text-xs text-center text-muted-foreground flex items-center justify-center gap-1">
                    <Lock className="w-3 h-3" /> Encrypted & Secure Transaction
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
                    <History className="w-4 h-4" /> Recent Withdrawals
                  </h3>
                  <span className="text-xs text-primary cursor-pointer hover:underline">
                    VIEW ALL
                  </span>
                </div>
                <div className="p-2">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-gray-400 text-xs border-b border-white/5">
                        <th className="text-left py-2 px-2 font-medium">
                          DATE
                        </th>
                        <th className="text-left py-2 px-2 font-medium">
                          METHOD
                        </th>
                        <th className="text-right py-2 px-2 font-medium">
                          AMOUNT
                        </th>
                        <th className="text-right py-2 px-2 font-medium">
                          STATUS
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
                          <td className="py-3 px-2 font-medium">{tx.method}</td>
                          <td className="py-3 px-2 text-right font-mono">
                            VES {tx.amount}
                          </td>
                          <td className="py-3 px-2 text-right">
                            <span
                              className={cn(
                                "text-[10px] px-2 py-0.5 rounded-full font-bold",
                                tx.status === "Completed"
                                  ? "bg-green-500/20 text-green-400"
                                  : tx.status === "Pending"
                                  ? "bg-yellow-500/20 text-yellow-400"
                                  : "bg-red-500/20 text-red-400"
                              )}
                            >
                              {tx.status}
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
                  <Info className="w-5 h-5" /> Important Info
                </div>
                <ul className="text-sm text-gray-400 space-y-2 list-disc pl-4 marker:text-primary">
                  <li>
                    Daily Withdrawal Limit:{" "}
                    <span className="text-white font-bold">VES 10,000,000</span>
                  </li>
                  <li>
                    Processing takes{" "}
                    <span className="text-white font-bold">24-48 hours</span>{" "}
                    for all payment methods.
                  </li>
                  <li>
                    Ensure your account details match your registered
                    information.
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default WithdrawPage;
