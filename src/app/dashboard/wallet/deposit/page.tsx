"use client";

import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { History, Info, Lock, Wallet } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

// Mock Data (Reusing struct but for Deposit)
const PAYMENT_METHODS = [
  { id: "venezuela", name: "Venezuela Pay", color: "bg-red-600", icon: Wallet },
  { id: "crypto", name: "Crypto", color: "bg-yellow-600", icon: Wallet },
  { id: "bitcoin", name: "Bitcoin", color: "bg-orange-500", icon: Wallet },
  { id: "ethereum", name: "Ethereum", color: "bg-purple-600", icon: Wallet },
  { id: "tether", name: "Tether (USDT)", color: "bg-green-500", icon: Wallet },
  { id: "binance", name: "BNB", color: "bg-yellow-500", icon: Wallet },
];

const RECENT_DEPOSITS = [
  {
    id: 1,
    date: "Dec 15",
    method: "Bitcoin",
    amount: "1,500",
    status: "Completed",
  },
  {
    id: 2,
    date: "Dec 10",
    method: "Venezuela Pay",
    amount: "800,000",
    status: "Completed",
  },
  {
    id: 3,
    date: "Dec 5",
    method: "Tether (USDT)",
    amount: "250",
    status: "Completed",
  },
];

export default function DepositPage() {
  const [amount, setAmount] = useState("");
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [senderNumber, setSenderNumber] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [loading, setLoading] = useState(false);

  const handleDeposit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMethod || !amount || !senderNumber || !transactionId) {
      toast.error("Please fill in all details including Transaction ID");
      return;
    }

    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    toast.success("Deposit request submitted! Verification pending.");
    setLoading(false);
    setAmount("");
    setSenderNumber("");
    setTransactionId("");
    setSelectedMethod(null);
  };

  const setPresetAmount = (amt: number) => {
    setAmount(amt.toString());
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Deposit Funds</h1>
          <p className="text-muted-foreground">
            Add money to your wallet instantly and secure.
          </p>
        </div>

        {/* Balance Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="bg-[#112218] border-primary/20 text-white">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm text-green-400 font-medium flex items-center gap-2">
                  <span className="text-lg">VES</span> AVAILABLE BALANCE
                </p>
                <h2 className="text-3xl font-bold mt-2">VES 12,450.00</h2>
              </div>
              <Button className="bg-white text-primary hover:bg-gray-100 font-bold rounded-full">
                Refresh
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-[#1a2c24] border-white/10 text-white">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400 font-medium flex items-center gap-2">
                  <Lock className="w-4 h-4" /> LOCKED BONUS
                </p>
                <h2 className="text-3xl font-bold mt-2 opacity-80">
                  USD 500.00
                </h2>
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
                  Select Payment Method
                </h3>
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
                        "cursor-pointer rounded-xl border-2 p-4 flex flex-col items-center justify-center gap-3 transition-all h-32 relative",
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
                        {isSelected && (
                          <p className="text-xs text-green-500 font-bold">
                            Selected
                          </p>
                        )}
                      </div>
                      {isSelected && (
                        <div className="absolute top-2 right-2 w-3 h-3 bg-primary rounded-full" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Deposit Details */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="bg-primary text-primary-foreground w-6 h-6 rounded-full flex items-center justify-center text-sm">
                  2
                </span>
                <h3 className="text-xl font-bold">Deposit Details</h3>
              </div>

              <Card className="bg-[#1a2c24]/50 border-white/5">
                <CardContent className="p-6 space-y-6">
                  {/* Official Number Display if method selected */}
                  {selectedMethod && (
                    <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 text-center">
                      {selectedMethod === "venezuela" ? (
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">
                            Send to this Official Venezuela Pay Account:
                          </p>
                          <h2 className="text-2xl font-mono font-bold text-primary tracking-wider">
                            VZ-8765-4321
                          </h2>
                          <p className="text-xs text-muted-foreground mt-2">
                            Use the official Venezuela Pay app to send.
                          </p>
                        </div>
                      ) : (
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">
                            Send to this{" "}
                            {
                              PAYMENT_METHODS.find(
                                (m) => m.id === selectedMethod
                              )?.name
                            }{" "}
                            Address:
                          </p>
                          <h2 className="text-2xl font-mono font-bold text-primary tracking-wider">
                            1A2b3C4d5E6f7G...
                          </h2>
                          <p className="text-xs text-muted-foreground mt-2">
                            Ensure you include the memo/ID for proper crediting.
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label>Amount to Deposit</Label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                        VES
                      </span>
                      <Input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="pl-8 h-12 bg-background border-input text-lg font-bold"
                        placeholder="1000"
                      />
                      <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 bg-muted/50"
                          onClick={() => setPresetAmount(1000)}
                        >
                          1,000
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 bg-muted/50"
                          onClick={() => setPresetAmount(5000)}
                        >
                          5,000
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 bg-muted/50"
                          onClick={() => setPresetAmount(10000)}
                        >
                          10,000
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Sender Account/Address</Label>
                      <Input
                        value={senderNumber}
                        onChange={(e) => setSenderNumber(e.target.value)}
                        className="h-12 bg-background border-input"
                        placeholder="Your account/address"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Transaction ID (TrxID)</Label>
                      <Input
                        value={transactionId}
                        onChange={(e) => setTransactionId(e.target.value)}
                        className="h-12 bg-background border-input"
                        placeholder="e.g. 8X3N2M..."
                      />
                    </div>
                  </div>

                  <Button
                    onClick={handleDeposit}
                    className="w-full h-12 text-lg font-bold shadow-lg shadow-primary/20"
                    disabled={loading}
                  >
                    {loading ? "Verifying..." : "Verify & Deposit"}
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
            {/* Recent Deposits */}
            <Card className="bg-[#1a2c24] border-white/5 text-white">
              <CardContent className="p-0">
                <div className="p-4 border-b border-white/10 flex justify-between items-center">
                  <h3 className="font-bold flex items-center gap-2">
                    <History className="w-4 h-4" /> Recent Deposits
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
                      {RECENT_DEPOSITS.map((tx) => (
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
                                  : "bg-yellow-500/20 text-yellow-400"
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
                    Min Deposit:{" "}
                    <span className="text-white font-bold">VES 2,500</span>
                  </li>
                  <li>
                    For crypto deposits, include the memo/ID to ensure proper
                    crediting.
                  </li>
                  <li>
                    Deposits are usually instant but may take up to 10 mins for
                    crypto.
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
