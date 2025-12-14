"use client";

import { Card, CardContent } from "@/components/ui/card";
import { ROUTES } from "@/lib/constants";
import { formatCurrency } from "@/lib/utils";
import { ArrowRight, Banknote, Star, Wallet } from "lucide-react";
import Link from "next/link";

export default function StatsOverview() {
  // const { wallet } = useWallet();
  const wallet = { balance: 15450.00 }; // Mock wallet

  // Mock data for bonus and withdrawable
  // In a real app these would come from the API
  const bonusFunds = 2000.00;
  const withdrawable = 13450.00;
  const wagerLeft = "3x Wager Left";

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {/* Total Balance */}
      <Card className="bg-card dark:bg-[#1a242d] border-border relative overflow-hidden group">
         <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-5 pointer-events-none">
            <Wallet className="w-32 h-32" />
         </div>
        <CardContent className="p-6 relative z-10">
          <div className="flex justify-between items-start">
             <div>
                <p className="text-muted-foreground text-sm font-medium mb-1">Total Balance</p>
                <div className="text-3xl font-bold text-foreground mb-2">
                    {formatCurrency(wallet?.balance || 0)}
                </div>
                <div className="flex items-center text-primary text-sm font-medium">
                  <ArrowRight className="w-4 h-4 rotate-[-45deg] mr-1" />
                  <span>12% vs last month</span>
                </div>
             </div>
             <div className="p-3 bg-primary/10 rounded-full">
                <Wallet className="w-6 h-6 text-primary" />
             </div>
          </div>
        </CardContent>
      </Card>

      {/* Bonus Funds */}
      <Card className="bg-card dark:bg-[#1a242d] border-border relative overflow-hidden group">
         <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-5 pointer-events-none">
            <Star className="w-32 h-32" />
         </div>
        <CardContent className="p-6 relative z-10">
          <div className="flex justify-between items-start">
             <div>
                <p className="text-muted-foreground text-sm font-medium mb-1">Bonus Funds</p>
                <div className="text-3xl font-bold text-foreground mb-2">
                    {formatCurrency(bonusFunds)}
                </div>
                <div className="inline-block px-3 py-1 bg-muted rounded text-xs text-muted-foreground">
                  {wagerLeft}
                </div>
             </div>
             <div className="p-3 bg-primary/10 rounded-full">
                <Star className="w-6 h-6 text-primary" />
             </div>
          </div>
        </CardContent>
      </Card>

      {/* Withdrawable */}
      <Card className="bg-card dark:bg-[#1a242d] border-border relative overflow-hidden group">
        <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-5 pointer-events-none">
            <Banknote className="w-32 h-32" />
         </div>
        <CardContent className="p-6 relative z-10">
          <div className="flex justify-between items-start">
             <div>
                <p className="text-muted-foreground text-sm font-medium mb-1">Withdrawable</p>
                <div className="text-3xl font-bold text-foreground mb-2">
                    {formatCurrency(withdrawable)}
                </div>
                <Link href={ROUTES.WALLET_WITHDRAW || "/"} className="text-primary text-sm font-medium hover:underline flex items-center">
                   Request Withdraw <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
             </div>
             <div className="p-3 bg-primary/10 rounded-full">
                <Banknote className="w-6 h-6 text-primary" />
             </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
