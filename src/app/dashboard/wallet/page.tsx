"use client";

import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ROUTES } from "@/lib/constants";
import { formatCurrency } from "@/lib/utils";
import {
  ArrowDownLeft,
  ArrowUpRight,
  CreditCard,
  Info,
  Wallet,
} from "lucide-react";
import Link from "next/link";

export default function WalletPage() {
  return (
    <DashboardLayout>
      <div className="w-full mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
            Wallet <Wallet className="w-8 h-8 text-primary" />
          </h1>
          <p className="text-muted-foreground mt-2">
            Manage your funds and transactions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Deposit Balance Card */}
          <Card className="bg-card border-border shadow-none">
            <CardContent className="p-8">
              <div className="flex items-center gap-2 text-muted-foreground mb-2">
                <ArrowDownLeft className="size-4 text-emerald-500" />
                <p className="text-sm font-medium">Deposit Balance</p>
              </div>
              <div className="text-3xl font-black text-foreground mb-6">
                {formatCurrency(5450)}
              </div>
              <Link
                href={ROUTES.WALLET_DEPOSIT || "/dashboard/wallet/deposit"}
                className="block"
              >
                <Button className="w-full h-11 text-base font-black uppercase tracking-widest rounded-lg">
                  Deposit Funds
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Winning Balance Card */}
          <Card className="bg-primary/5 border-primary/20 shadow-none relative overflow-hidden">
            <div className="absolute top-0 right-0 p-3">
              <Badge className="bg-emerald-500 hover:bg-emerald-600 text-[9px] font-black uppercase tracking-widest rounded-full">
                Withdrawable
              </Badge>
            </div>
            <CardContent className="p-8">
              <div className="flex items-center gap-2 text-primary mb-2">
                <ArrowUpRight className="size-4" />
                <p className="text-sm font-medium">Winning Balance</p>
              </div>
              <div className="text-3xl font-black text-primary mb-6">
                {formatCurrency(10000)}
              </div>
              <Link
                href={ROUTES.WALLET_WITHDRAW || "/dashboard/wallet/withdraw"}
                className="block"
              >
                <Button
                  variant="outline"
                  className="w-full h-11 text-base font-black uppercase tracking-widest rounded-lg border-primary/20 text-primary hover:bg-primary/5"
                >
                  Withdraw Now
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Wallet Info Card */}
          <Card className="bg-muted/10 border-dashed border-border shadow-none flex items-center p-8">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-foreground font-black uppercase tracking-widest text-xs">
                <Info className="size-4 text-primary" />
                Withdrawal Rules
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Only your{" "}
                <span className="text-primary font-bold">Winning Balance</span>{" "}
                is eligible for withdrawal. Deposits must be used for betting
                activity to ensure security and prevent platform misuse.
              </p>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Payment Methods */}
          <Card className="border border-border shadow-none">
            <CardHeader>
              <CardTitle>Payment Methods</CardTitle>
              <CardDescription>Secure payment options</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div className="flex items-center gap-3">
                    <CreditCard className="w-6 h-6 text-muted-foreground" />
                    <div className="font-medium">Bkash</div>
                  </div>
                  <Button variant="ghost" size="sm">
                    Manage
                  </Button>
                </div>
                <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div className="flex items-center gap-3">
                    <CreditCard className="w-6 h-6 text-muted-foreground" />
                    <div className="font-medium">Nagad</div>
                  </div>
                  <Button variant="ghost" size="sm">
                    Manage
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Transactions */}
        <Card className="border border-border shadow-none">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Transactions</CardTitle>
            <Button variant="ghost" size="sm" className="text-primary">
              View All
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-4 hover:bg-muted/50 rounded-lg transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`p-2 rounded-full ${
                        i === 1
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {i === 1 ? (
                        <ArrowDownLeft className="h-5 w-5" />
                      ) : (
                        <ArrowUpRight className="h-5 w-5" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-foreground">
                        {i === 1 ? "Deposit via Bkash" : "Withdrawal"}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Today, 2:30 PM
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p
                      className={`font-bold ${
                        i === 1 ? "text-green-600" : "text-foreground"
                      }`}
                    >
                      {i === 1 ? "+" : "-"}
                      {formatCurrency(5000)}
                    </p>
                    <p className="text-xs text-muted-foreground">Completed</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
