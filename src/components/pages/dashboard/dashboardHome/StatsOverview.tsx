"use client";
import { Card, CardContent } from "@/components/ui/card";
import { ROUTES } from "@/lib/constants";
import { formatCurrency } from "@/lib/utils";
import { ArrowRight, TrendingDown, TrendingUp, Wallet } from "lucide-react";
import Link from "next/link";

export default function StatsOverview() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {/* Total Winning Balance */}
      <Card className="bg-green-500/5 border-green-500/20 relative overflow-hidden group shadow-none">
        <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-5 pointer-events-none group-hover:scale-110 transition-transform duration-500">
          <TrendingUp className="w-32 h-32" />
        </div>
        <CardContent className="p-8 relative z-10">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-green-500 text-[10px] font-black uppercase tracking-[0.2em] mb-2">
                Total Winning Balance
              </p>
              <div className="text-3xl font-black text-foreground mb-4">
                {formatCurrency(45800)}
              </div>
              <Link
                href={ROUTES.WALLET_WITHDRAW}
                className="inline-flex items-center text-[10px] font-black uppercase tracking-widest text-green-500 hover:gap-2 transition-all"
              >
                Withdraw Now <ArrowRight className="w-3 h-3 ml-1" />
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Total Deposit */}
      <Card className="bg-blue-500/5 border-blue-500/20 relative overflow-hidden group shadow-none">
        <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-5 pointer-events-none group-hover:scale-110 transition-transform duration-500">
          <Wallet className="w-32 h-32" />
        </div>
        <CardContent className="p-8 relative z-10">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-blue-500 text-[10px] font-black uppercase tracking-[0.2em] mb-2">
                Total Deposit
              </p>
              <div className="text-3xl font-black text-foreground mb-4">
                {formatCurrency(92500)}
              </div>
              <Link
                href={ROUTES.WALLET_DEPOSIT}
                className="inline-flex items-center text-[10px] font-black uppercase tracking-widest text-blue-500 hover:gap-2 transition-all"
              >
                Add Funds <ArrowRight className="w-3 h-3 ml-1" />
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Current Balance */}
      <Card className="bg-purple-500/5 border-purple-500/20 relative overflow-hidden group shadow-none">
        <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-5 pointer-events-none group-hover:scale-110 transition-transform duration-500">
          <Wallet className="w-32 h-32" />
        </div>
        <CardContent className="p-8 relative z-10">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-purple-500 text-[10px] font-black uppercase tracking-[0.2em] mb-2">
                Current Balance
              </p>
              <div className="text-3xl font-black text-foreground mb-4">
                {formatCurrency(67300)}
              </div>
              <Link
                href={ROUTES.WALLET}
                className="inline-flex items-center text-[10px] font-black uppercase tracking-widest text-purple-500 hover:gap-2 transition-all"
              >
                View Wallet <ArrowRight className="w-3 h-3 ml-1" />
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Total Loss */}
      <Card className="bg-red-500/5 border-red-500/20 relative overflow-hidden group shadow-none">
        <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-5 pointer-events-none group-hover:scale-110 transition-transform duration-500">
          <TrendingDown className="w-32 h-32" />
        </div>
        <CardContent className="p-8 relative z-10">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-red-500 text-[10px] font-black uppercase tracking-[0.2em] mb-2">
                Total Loss
              </p>
              <div className="text-3xl font-black text-foreground mb-4">
                {formatCurrency(25200)}
              </div>
              <p className="text-[10px] font-black uppercase tracking-widest text-red-500">
                This Month
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
