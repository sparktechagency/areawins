"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Clock, LayoutGrid, List } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface OpenBet {
  id: string;
  creator: {
    name: string;
    avatar: string;
    trust: number;
  };
  match: string;
  sport: string;
  timeAgo: string;
  backing: string;
  stake: number;
  odds: number;
}

const openBets: OpenBet[] = [
  {
    id: "1",
    creator: {
      name: "MadridistaKing",
      avatar: "https://i.pravatar.cc/150?u=11",
      trust: 98,
    },
    match: "Chelsea vs Arsenal",
    sport: "football",
    timeAgo: "2m ago",
    backing: "Chelsea Win",
    stake: 50.0,
    odds: 2.5,
  },
  {
    id: "2",
    creator: {
      name: "CricketFanatic",
      avatar: "https://i.pravatar.cc/150?u=12",
      trust: 92,
    },
    match: "India vs Australia",
    sport: "cricket",
    timeAgo: "15m ago",
    backing: "India Win",
    stake: 100.0,
    odds: 1.8,
  },
  {
    id: "3",
    creator: {
      name: "HoopsMaster",
      avatar: "https://i.pravatar.cc/150?u=13",
      trust: 85,
    },
    match: "Lakers vs Warriors",
    sport: "basketball",
    timeAgo: "45m ago",
    backing: "Lakers -5.5",
    stake: 25.0,
    odds: 2.0,
  },
];

import { ReusableModal } from "@/components/shared/ReusableModal";
import AcceptBetModalContent from "./AcceptBetModalContent";

const MarketPageContent = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedBet, setSelectedBet] = useState<OpenBet | null>(null);
  const [isAccepted, setIsAccepted] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleAccept = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsAccepted(true);
      setIsProcessing(false);
      setTimeout(() => {
        setIsAccepted(false);
        setSelectedBet(null);
      }, 2000);
    }, 1000);
  };

  return (
    <div className="w-full space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black text-foreground tracking-tight mb-2 text-center md:text-left">
            Open Market
          </h1>
          <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em] text-center md:text-left">
            Peer-to-Peer Betting Arena
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-muted/30 p-1 rounded-xl border border-border flex gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setViewMode("grid")}
              className={cn(
                "size-9 rounded-lg transition-all",
                viewMode === "grid"
                  ? "bg-primary text-white"
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
                "size-9 rounded-lg transition-all",
                viewMode === "list"
                  ? "bg-primary text-white"
                  : "text-muted-foreground"
              )}
            >
              <List className="size-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Filter Tape */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
        <Badge className="bg-primary text-white px-5 py-2 rounded-full font-black text-[10px] uppercase tracking-widest shrink-0 cursor-pointer">
          All Sports
        </Badge>
        {[
          "Football",
          "Cricket",
          "Basketball",
          "Tennis",
          "High Trust",
          "Recent",
        ].map((f) => (
          <Badge
            key={f}
            variant="outline"
            className="border-border px-5 py-2 rounded-full font-black text-[10px] uppercase tracking-widest shrink-0 cursor-pointer hover:bg-muted transition-colors whitespace-nowrap"
          >
            {f}
          </Badge>
        ))}
      </div>

      {/* Market Grid */}
      <div
        className={cn(
          "grid gap-4 sm:gap-6",
          viewMode === "grid"
            ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            : "grid-cols-1"
        )}
      >
        {openBets.map((bet) => {
          const potentialWin = bet.stake * bet.odds;
          const opponentStake = potentialWin - bet.stake;

          return (
            <div
              key={bet.id}
              className="bg-card rounded-xl border border-border overflow-hidden hover:border-primary/20 transition-all group shadow-sm hover:shadow-md"
            >
              {/* Card Header */}
              <div className="bg-muted/20 px-4 py-3 border-b border-border flex items-center justify-between">
                <div className="flex items-center gap-2 overflow-hidden">
                  <span className="text-[9px] font-black text-primary uppercase tracking-[0.2em]">
                    {bet.sport}
                  </span>
                  <span className="size-0.5 rounded-full bg-muted-foreground/30" />
                  <span className="text-[9px] font-black text-muted-foreground uppercase tracking-widest truncate">
                    {bet.match}
                  </span>
                </div>
                <span className="flex items-center gap-1 text-[8px] font-bold text-muted-foreground uppercase whitespace-nowrap">
                  <Clock className="size-3" />
                  {bet.timeAgo}
                </span>
              </div>

              <div className="p-4 space-y-4">
                {/* Creator Info */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="relative size-8 rounded-full border border-primary/20 overflow-hidden shrink-0">
                      <Image
                        src={bet.creator.avatar}
                        alt={bet.creator.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-black text-foreground text-xs truncate max-w-[100px]">
                        {bet.creator.name}
                      </span>
                      <span className="text-[8px] font-bold text-primary uppercase">
                        {bet.creator.trust}% Trust
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-[8px] font-black text-muted-foreground uppercase">
                      Total Pot
                    </span>
                    <span className="text-sm font-black text-foreground">
                      ${potentialWin.toFixed(0)}
                    </span>
                  </div>
                </div>

                {/* Bet Details */}
                <div className="bg-muted/30 rounded-lg p-3 border border-border/50 space-y-3 relative overflow-hidden">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-0.5">
                      <span className="text-[7px] font-black text-primary uppercase">
                        Backing
                      </span>
                      <h4 className="text-[11px] font-black text-foreground truncate">
                        {bet.backing}
                      </h4>
                    </div>
                    <div className="space-y-0.5 text-right">
                      <span className="text-[7px] font-black text-rose-500 uppercase">
                        Accept (Lay)
                      </span>
                      <h4 className="text-[11px] font-black text-foreground">
                        Against
                      </h4>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-[9px] font-bold">
                    <span className="text-muted-foreground">
                      Stake: ${bet.stake}
                    </span>
                    <span className="text-rose-500">
                      Need: ${opponentStake.toFixed(2)}
                    </span>
                  </div>
                </div>

                <Button
                  onClick={() => setSelectedBet(bet)}
                  className="w-full h-10 rounded-lg bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest text-[9px] transition-all active:scale-95"
                >
                  Accept Bet
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Confirmation Modal */}
      <ReusableModal
        isOpen={!!selectedBet}
        onClose={() => !isProcessing && setSelectedBet(null)}
        maxWidth="md"
        padding="none"
      >
        <AcceptBetModalContent
          selectedBet={selectedBet}
          isAccepted={isAccepted}
          isProcessing={isProcessing}
          onAccept={handleAccept}
          onCancel={() => setSelectedBet(null)}
        />
      </ReusableModal>
    </div>
  );
};

export default MarketPageContent;
