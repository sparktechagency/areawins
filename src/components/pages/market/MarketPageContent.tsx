"use client";

import MatchedBetCard from "@/components/pages/sports/components/match-details/MatchedBetCard";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Filter, Info, LayoutGrid, List } from "lucide-react";
import { useState } from "react";

const MarketPageContent = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const openMarkets = [
    {
      user: {
        name: "MadridistaKing",
        avatar: "https://i.pravatar.cc/150?u=1",
        trust: 98,
        timeAgo: "2m ago",
      },
      bet: {
        type: "BACKING" as const,
        selection: "Real Madrid Wins",
        stake: 25.0,
        potentialWin: 45.0,
      },
      matchInfo: "Real Madrid vs Barcelona",
      sport: "football",
    },
    {
      user: {
        name: "CricketGuru",
        avatar: "https://i.pravatar.cc/150?u=4",
        trust: 92,
        timeAgo: "10m ago",
      },
      bet: {
        type: "LAYING" as const,
        selection: "India Wins",
        stake: 120.0,
        potentialWin: 240.0,
      },
      matchInfo: "India vs Australia",
      sport: "cricket",
    },
    {
      user: {
        name: "HoopsFan",
        avatar: "https://i.pravatar.cc/150?u=5",
        trust: 85,
        timeAgo: "1h ago",
      },
      bet: {
        type: "BACKING" as const,
        selection: "Lakers -5.5",
        stake: 50.0,
        potentialWin: 95.0,
      },
      matchInfo: "Lakers vs Warriors",
      sport: "basketball",
    },
    {
      user: {
        name: "TennisPro",
        avatar: "https://i.pravatar.cc/150?u=6",
        trust: 99,
        timeAgo: "30m ago",
      },
      bet: {
        type: "BACKING" as const,
        selection: "Djokovic 2-0",
        stake: 200.0,
        potentialWin: 380.0,
      },
      matchInfo: "Djokovic vs Alcaraz",
      sport: "tennis",
    },
    {
      user: {
        name: "VolleyMaster",
        avatar: "https://i.pravatar.cc/150?u=7",
        trust: 94,
        timeAgo: "45m ago",
      },
      bet: {
        type: "LAYING" as const,
        selection: "Brazil Wins Set 1",
        stake: 40.0,
        potentialWin: 85.0,
      },
      matchInfo: "Poland vs Brazil",
      sport: "volleyball",
    },
  ];

  return (
    <div className="w-full space-y-8">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-foreground mb-1">
            Bet Market
          </h1>
          <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider">
            Discover & Accept P2P Bets from other users
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex border border-border rounded-lg bg-card p-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setViewMode("grid")}
              className={cn(
                "size-8",
                viewMode === "grid"
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground"
              )}
            >
              <LayoutGrid className="size-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setViewMode("list")}
              className={cn(
                "size-8",
                viewMode === "list"
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground"
              )}
            >
              <List className="size-4" />
            </Button>
          </div>
          <Button variant="outline" className="border-border font-bold gap-2">
            <Filter className="size-4" />
            Advanced
          </Button>
        </div>
      </div>

      {/* Hero Tip */}
      <div className="bg-primary/5 border border-primary/20 rounded-3xl p-6 flex flex-col md:flex-row items-center gap-6 shadow-sm">
        <div className="size-16 rounded-2xl bg-primary/20 flex items-center justify-center shrink-0">
          <Info className="size-8 text-primary" />
        </div>
        <div className="flex-1 text-center md:text-left">
          <h3 className="text-lg font-black text-foreground mb-1">
            Peer-to-Peer Betting Guide
          </h3>
          <p className="text-sm text-muted-foreground font-medium">
            Markets here are created by other users. When you accept a bet, your
            funds are locked in escrow until the match results are verified.
            Always check the user&apos;s trust score before accepting.
          </p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-white font-black px-8 rounded-xl shrink-0">
          Learn More
        </Button>
      </div>

      {/* Market Feed */}
      <div
        className={cn(
          "grid gap-6",
          viewMode === "grid" ? "grid-cols-1 lg:grid-cols-2" : "grid-cols-1"
        )}
      >
        {openMarkets.map((market, idx) => (
          <div key={idx} className="space-y-3">
            <div className="flex items-center justify-between px-2">
              <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-primary" />
                {market.matchInfo}
              </span>
              <span className="text-[10px] font-black text-primary bg-primary/5 px-2 py-0.5 rounded border border-primary/10">
                {market.sport.toUpperCase()}
              </span>
            </div>
            <MatchedBetCard user={market.user} bet={market.bet} />
          </div>
        ))}
      </div>

      {/* Empty State / Load More */}
      <div className="pt-10 flex flex-col items-center">
        <p className="text-sm text-muted-foreground font-bold mb-4">
          You&apos;ve reached the end of the market feed.
        </p>
        <Button
          variant="outline"
          className="border-border px-10 h-12 rounded-xl font-black uppercase tracking-widest"
        >
          Refresh Feed
        </Button>
      </div>
    </div>
  );
};

export default MarketPageContent;
