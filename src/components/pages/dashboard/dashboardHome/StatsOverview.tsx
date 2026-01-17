"use client";

import { Card, CardContent } from "@/components/ui/card";
import { ROUTES } from "@/lib/constants";
import { formatCurrency } from "@/lib/utils";
import { ArrowRight, Banknote, Star, Wallet } from "lucide-react";
import Link from "next/link";

export default function StatsOverview() {
  const wallet = { balance: 15450.0 };

  const bonusFunds = 2000.0;
  const withdrawable = 13450.0;
  const wagerLeft = "3x Wager Left";

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {/* Winning Balance */}
      <Card className="bg-primary/5 border-primary/20 relative overflow-hidden group shadow-none">
        <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-5 pointer-events-none group-hover:scale-110 transition-transform duration-500">
          <Banknote className="w-32 h-32" />
        </div>
        <CardContent className="p-8 relative z-10">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-primary text-[10px] font-black uppercase tracking-[0.2em] mb-2">
                Winning Balance
              </p>
              <div className="text-3xl font-black text-foreground mb-4">
                {formatCurrency(10000.0)}
              </div>
              <Link
                href={ROUTES.WALLET_WITHDRAW}
                className="inline-flex items-center text-[10px] font-black uppercase tracking-widest text-primary hover:gap-2 transition-all"
              >
                Withdraw Now <ArrowRight className="w-3 h-3 ml-1" />
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Deposit Balance */}
      <Card className="bg-card border-border relative overflow-hidden group shadow-none">
        <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-5 pointer-events-none group-hover:scale-110 transition-transform duration-500">
          <Wallet className="w-32 h-32" />
        </div>
        <CardContent className="p-8 relative z-10">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-muted-foreground text-[10px] font-black uppercase tracking-[0.2em] mb-2">
                Deposit Balance
              </p>
              <div className="text-3xl font-black text-foreground mb-4">
                {formatCurrency(5450.0)}
              </div>
              <Link
                href={ROUTES.WALLET_DEPOSIT}
                className="inline-flex items-center text-[10px] font-black uppercase tracking-widest text-foreground/70 hover:text-primary transition-all"
              >
                Top Up Wallet <ArrowRight className="w-3 h-3 ml-1" />
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Referrals */}
      <Card className="bg-card border-border relative overflow-hidden group shadow-none">
        <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-5 pointer-events-none group-hover:scale-110 transition-transform duration-500">
          <Star className="w-32 h-32" />
        </div>
        <CardContent className="p-8 relative z-10">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-muted-foreground text-[10px] font-black uppercase tracking-[0.2em] mb-2">
                Referral Earnings
              </p>
              <div className="text-3xl font-black text-foreground mb-4">
                {formatCurrency(655.0)}
              </div>
              <Link
                href={ROUTES.FRIENDS}
                className="inline-flex items-center text-[10px] font-black uppercase tracking-widest text-foreground/70 hover:text-primary transition-all"
              >
                Invite Friends <ArrowRight className="w-3 h-3 ml-1" />
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
