"use client";

import { Card } from "@/components/ui/card";
import { ROUTES } from "@/lib/constants";
import { Banknote, Gamepad2, History, Ticket } from "lucide-react";
import Link from "next/link";

export default function QuickActions() {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold text-foreground flex items-center gap-2 mb-4">
        <span className="text-primary">⚡</span> Quick Actions
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Live Betting */}
        <Link href={ROUTES.LIVE_EVENTS} className="block group">
          <Card className="h-44 relative overflow-hidden border-0 bg-linear-to-br from-gray-900 to-gray-800 group-hover:scale-[1.02] transition-transform duration-300 rounded-lg">
            {/* Abstract BG Pattern */}
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&q=80')] bg-cover bg-center opacity-40 group-hover:opacity-60 transition-opacity" />
            <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent" />

            <div className="absolute bottom-6 left-6 z-10">
              <Gamepad2 className="w-8 h-8 text-primary mb-3" />
              <h3 className="font-black text-white text-xl uppercase tracking-tight">
                Live Markets
              </h3>
              <p className="text-[10px] font-black text-primary uppercase tracking-widest mt-1">
                12 active now
              </p>
            </div>
          </Card>
        </Link>

        {/* Promos */}
        <Link href={ROUTES.PROMOTIONS} className="block group">
          <Card className="h-44 relative overflow-hidden border-0 bg-linear-to-br from-gray-500 to-gray-800 group-hover:scale-[1.02] transition-transform duration-300 rounded-lg">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1605218427360-6961d907175d?w=800&q=80')] bg-cover bg-center opacity-40 group-hover:opacity-60 transition-opacity" />
            <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent" />

            <div className="absolute bottom-6 left-6 z-10">
              <Ticket className="w-8 h-8 text-emerald-400 mb-3" />
              <h3 className="font-black text-white text-xl uppercase tracking-tight">
                VIP Rewards
              </h3>
              <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mt-1">
                2 New Bonuses
              </p>
            </div>
          </Card>
        </Link>

        {/* History */}
        <Link href={ROUTES.TRANSACTIONS} className="block group">
          <Card className="h-44 flex flex-col items-center justify-center bg-card border-border shadow-none group-hover:bg-muted/50 transition-all cursor-pointer text-center p-6 rounded-lg">
            <div className="w-14 h-14 rounded-full bg-muted dark:bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <History className="w-7 h-7 text-primary" />
            </div>
            <h3 className="font-black text-foreground uppercase tracking-tight">
              Transactions
            </h3>
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-2">
              Audit History
            </p>
          </Card>
        </Link>

        {/* Withdraw */}
        <Link href={ROUTES.WALLET_WITHDRAW} className="block group">
          <Card className="h-44 flex flex-col items-center justify-center bg-card border-border shadow-none group-hover:bg-muted/50 transition-all cursor-pointer text-center p-6 rounded-lg">
            <div className="w-14 h-14 rounded-full bg-muted dark:bg-emerald-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Banknote className="w-7 h-7 text-emerald-500" />
            </div>
            <h3 className="font-black text-foreground uppercase tracking-tight">
              Withdraw
            </h3>
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-2">
              Instant Payout
            </p>
          </Card>
        </Link>
      </div>
    </div>
  );
}
