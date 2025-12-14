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
        <Link href={ROUTES.LIVE_EVENTS || "/live"} className="block group">
          <Card className="h-40 relative overflow-hidden border-0 bg-gradient-to-br from-gray-900 to-gray-800 group-hover:scale-[1.02] transition-transform duration-300">
             {/* Abstract BG Pattern */}
             <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&q=80')] bg-cover bg-center opacity-40 group-hover:opacity-50 transition-opacity" />
             <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
             
             <div className="absolute bottom-4 left-4 z-10">
                <Gamepad2 className="w-8 h-8 text-primary mb-2" />
                <h3 className="font-bold text-white text-lg">Live Betting</h3>
                <p className="text-xs text-gray-300">3 matches active</p>
             </div>
          </Card>
        </Link>
        
        {/* Promos */}
        <Link href={ROUTES.PROMOTIONS || "/promotions"} className="block group">
           <Card className="h-40 relative overflow-hidden border-0 bg-gradient-to-br from-gray-900 to-gray-800 group-hover:scale-[1.02] transition-transform duration-300">
             <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1605218427360-6961d907175d?w=800&q=80')] bg-cover bg-center opacity-40 group-hover:opacity-50 transition-opacity" />
             <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
             
             <div className="absolute bottom-4 left-4 z-10">
                <Ticket className="w-8 h-8 text-primary mb-2" />
                <h3 className="font-bold text-white text-lg">Promos</h3>
                <p className="text-xs text-gray-300">2 new offers</p>
             </div>
          </Card>
        </Link>

        {/* History */}
        <Link href={ROUTES.MY_BETS || "/my-bets"} className="block group">
           <Card className="h-40 flex flex-col items-center justify-center bg-card dark:bg-[#112218] border-border hover:bg-accent transition-colors cursor-pointer text-center p-4">
              <div className="w-12 h-12 rounded-full bg-muted dark:bg-[#1a3525] flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                <History className="w-6 h-6 text-foreground dark:text-white" />
              </div>
              <h3 className="font-bold text-foreground">History</h3>
              <p className="text-xs text-muted-foreground">View past transactions</p>
           </Card>
        </Link>
        
        {/* Withdraw */}
        <Link href={ROUTES.WALLET_WITHDRAW || "/wallet/withdraw"} className="block group">
           <Card className="h-40 flex flex-col items-center justify-center bg-card dark:bg-[#112218] border-border hover:bg-accent transition-colors cursor-pointer text-center p-4">
              <div className="w-12 h-12 rounded-full bg-muted dark:bg-[#1a3525] flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                 <Banknote className="w-6 h-6 text-foreground dark:text-white" />
              </div>
              <h3 className="font-bold text-foreground">Withdraw</h3>
              <p className="text-xs text-muted-foreground">Cash out winnings</p>
           </Card>
        </Link>
      </div>
    </div>
  );
}
