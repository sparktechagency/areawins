"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import {
  AlertTriangle,
  ArrowRightLeft,
  CheckCircle2,
  Clock,
  Info,
  LayoutGrid,
  List,
} from "lucide-react";
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
          <h1 className="text-4xl font-black text-foreground tracking-tight mb-2 text-center md:text-left">
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
            className="border-border px-5 py-2 rounded-full font-black text-[10px] uppercase tracking-widest shrink-0 cursor-pointer hover:bg-muted transition-colors"
          >
            {f}
          </Badge>
        ))}
      </div>

      {/* Market Grid */}
      <div
        className={cn(
          "grid gap-8",
          viewMode === "grid" ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"
        )}
      >
        {openBets.map((bet) => {
          const potentialWin = bet.stake * bet.odds;
          const opponentStake = potentialWin - bet.stake;

          return (
            <div
              key={bet.id}
              className="bg-card rounded-[40px] border border-border overflow-hidden hover:border-primary/20 transition-all group"
            >
              {/* Card Header */}
              <div className="bg-muted/20 px-8 py-4 border-b border-border flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">
                    {bet.sport}
                  </span>
                  <span className="size-1 rounded-full bg-muted-foreground/30" />
                  <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest px-1">
                    {bet.match}
                  </span>
                </div>
                <span className="flex items-center gap-1 text-[9px] font-bold text-muted-foreground uppercase whitespace-nowrap">
                  <Clock className="size-3" />
                  {bet.timeAgo}
                </span>
              </div>

              <div className="p-8 space-y-8">
                {/* Creator Info */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative size-12 rounded-full border-2 border-primary/20 overflow-hidden shrink-0">
                      <Image
                        src={bet.creator.avatar}
                        alt={bet.creator.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-black text-foreground text-sm">
                        {bet.creator.name}
                      </span>
                      <span className="text-[10px] font-bold text-primary uppercase">
                        {bet.creator.trust}% Trust
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end shrink-0">
                    <span className="text-[9px] font-black text-muted-foreground uppercase tracking-widest mb-1">
                      Total Pot
                    </span>
                    <span className="text-xl font-black text-foreground">
                      ${potentialWin.toFixed(0)}
                    </span>
                  </div>
                </div>

                {/* Bet Details */}
                <div className="bg-muted/30 rounded-[32px] p-6 border border-border/50 space-y-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-5">
                    <ArrowRightLeft className="size-20" />
                  </div>

                  <div className="grid grid-cols-2 gap-8 relative z-10">
                    <div className="space-y-1">
                      <span className="text-[9px] font-black text-primary uppercase tracking-widest">
                        Creator Position
                      </span>
                      <h4 className="text-lg font-black text-foreground leading-tight">
                        {bet.backing}
                      </h4>
                      <div className="flex flex-col gap-0.5 text-[10px] font-bold text-muted-foreground mt-2">
                        <span>Stake: ${bet.stake}</span>
                        <span>Odds: {bet.odds}x</span>
                      </div>
                    </div>
                    <div className="space-y-1 text-right">
                      <span className="text-[9px] font-black text-rose-500 uppercase tracking-widest italic">
                        Accept (Laying)
                      </span>
                      <h4 className="text-lg font-black text-foreground leading-tight">
                        Opposite
                      </h4>
                      <div className="flex flex-col gap-0.5 text-[10px] font-bold text-rose-500 mt-2">
                        <span>Stake: ${opponentStake.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Acceptance Summary */}
                <div className="p-4 bg-primary/5 rounded-2xl flex items-center gap-4 border border-primary/10">
                  <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <Info className="size-5" />
                  </div>
                  <p className="text-[11px] font-bold text-foreground leading-relaxed">
                    Stake{" "}
                    <span className="text-primary">
                      ${opponentStake.toFixed(2)}
                    </span>{" "}
                    to win
                    <span className="text-primary font-black ml-1">
                      ${bet.stake.toFixed(2)}
                    </span>{" "}
                    if result is NOT {bet.backing}.
                  </p>
                </div>

                <Button
                  onClick={() => setSelectedBet(bet)}
                  className="w-full h-14 md:h-16 rounded-[24px] bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-[0.2em] transition-all active:scale-95"
                >
                  Accept Bet Now
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Confirmation Modal */}
      <Dialog
        open={!!selectedBet}
        onOpenChange={() => !isProcessing && setSelectedBet(null)}
      >
        <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden bg-card border-none rounded-[40px]">
          {selectedBet && !isAccepted ? (
            <div className="p-8 space-y-8">
              <div className="space-y-2 text-center">
                <DialogTitle className="text-3xl font-black text-foreground tracking-tight uppercase">
                  Confirm Acceptance
                </DialogTitle>
                <DialogDescription className="text-muted-foreground font-medium uppercase text-[10px] tracking-widest italic">
                  Peer-to-Peer Agreement
                </DialogDescription>
              </div>

              <div className="space-y-6">
                {/* Details Table */}
                <div className="bg-muted/30 rounded-3xl overflow-hidden border border-border">
                  <div className="p-4 bg-primary/5 border-b border-primary/10 flex justify-between items-center px-6">
                    <span className="text-[10px] font-black text-primary uppercase">
                      {selectedBet.match}
                    </span>
                    <Badge className="bg-primary text-white text-[8px] font-black uppercase">
                      P2P Secured
                    </Badge>
                  </div>

                  <div className="p-6 space-y-6">
                    <div className="flex justify-between items-start pb-6 border-b border-border/50">
                      <div className="space-y-1">
                        <span className="text-[9px] font-black text-muted-foreground uppercase opacity-50">
                          Creator: {selectedBet.creator.name}
                        </span>
                        <div className="text-sm font-black text-foreground">
                          Backing: {selectedBet.backing}
                        </div>
                        <div className="text-[10px] font-bold text-muted-foreground">
                          Stake: ${selectedBet.stake} @ {selectedBet.odds}x
                        </div>
                      </div>
                      <div className="text-right space-y-1">
                        <span className="text-[9px] font-black text-primary uppercase">
                          Your Lay Position
                        </span>
                        <div className="text-sm font-black text-primary underline underline-offset-4 decoration-primary/30">
                          Against {selectedBet.backing}
                        </div>
                        <div className="text-xl font-black text-foreground">
                          $
                          {(
                            selectedBet.stake * selectedBet.odds -
                            selectedBet.stake
                          ).toFixed(2)}{" "}
                          Stake
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center gap-3 text-amber-500 bg-amber-500/5 p-4 rounded-xl border border-amber-500/10">
                        <AlertTriangle className="size-5 shrink-0" />
                        <p className="text-[10px] font-bold leading-relaxed uppercase tracking-widest">
                          $
                          {(
                            selectedBet.stake * selectedBet.odds -
                            selectedBet.stake
                          ).toFixed(2)}{" "}
                          will be held in escrow immediately.
                        </p>
                      </div>

                      <div className="bg-slate-950 p-6 rounded-2xl border border-white/5 space-y-3 shadow-2xl">
                        <span className="text-[9px] font-black text-white/50 uppercase tracking-widest">
                          Settlement Rules
                        </span>
                        <div className="flex justify-between items-center text-xs font-black">
                          <span className="text-white/60">
                            {selectedBet.backing} happens
                          </span>
                          <span className="text-rose-400">Lose Stake</span>
                        </div>
                        <div className="flex justify-between items-center text-xs font-black">
                          <span className="text-white/60">Anything else</span>
                          <span className="text-emerald-400">
                            Win $
                            {(
                              selectedBet.stake +
                              (selectedBet.stake * selectedBet.odds -
                                selectedBet.stake)
                            ).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <Button
                  variant="ghost"
                  onClick={() => setSelectedBet(null)}
                  className="flex-1 h-16 rounded-2xl font-black uppercase tracking-widest text-muted-foreground"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleAccept}
                  disabled={isProcessing}
                  className="flex-2 h-16 rounded-2xl bg-[#00d65c] hover:bg-[#00b84d] text-white font-black uppercase tracking-widest"
                >
                  {isProcessing ? "Matching..." : "Confirm Accept"}
                </Button>
              </div>
            </div>
          ) : (
            <div className="p-16 flex flex-col items-center text-center space-y-6">
              <div className="size-20 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                <CheckCircle2 className="size-12 animate-in zoom-in duration-300" />
              </div>
              <h3 className="text-2xl font-black text-foreground uppercase tracking-tight">
                Bet Matched!
              </h3>
              <p className="text-muted-foreground font-medium uppercase text-[10px] tracking-[0.2em]">
                You matched with {selectedBet?.creator.name}
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MarketPageContent;
