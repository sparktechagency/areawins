"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, CheckCircle2 } from "lucide-react";
import React from "react";

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

interface AcceptBetModalContentProps {
  selectedBet: OpenBet | null;
  isAccepted: boolean;
  isProcessing: boolean;
  onAccept: () => void;
  onCancel: () => void;
}

const AcceptBetModalContent: React.FC<AcceptBetModalContentProps> = ({
  selectedBet,
  isAccepted,
  isProcessing,
  onAccept,
  onCancel,
}) => {
  if (!selectedBet) return null;

  if (isAccepted) {
    return (
      <div className="p-10 sm:p-16 flex flex-col items-center text-center space-y-6">
        <div className="size-16 sm:size-20 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500">
          <CheckCircle2 className="size-10 sm:size-12 animate-in zoom-in duration-300" />
        </div>
        <h3 className="text-xl sm:text-2xl font-black text-foreground uppercase tracking-tight">
          Bet Matched!
        </h3>
        <p className="text-muted-foreground font-medium uppercase text-xs tracking-[0.2em]">
          You matched with {selectedBet.creator.name}
        </p>
      </div>
    );
  }

  const layStake = selectedBet.stake * selectedBet.odds - selectedBet.stake;

  return (
    <div className="p-5 sm:p-6 space-y-6 sm:space-y-8">
      <div className="space-y-2 text-center">
        <h2 className="text-xl sm:text-2xl font-black text-foreground tracking-tight uppercase">
          Confirm Acceptance
        </h2>
        <p className="text-muted-foreground font-semibold uppercase text-xs tracking-widest italic opacity-70">
          Peer-to-Peer Agreement
        </p>
      </div>

      <div className="space-y-6">
        <div className="bg-muted/30 rounded-lg overflow-hidden border border-border">
          <div className="p-4 bg-primary/5 border-b border-primary/10 flex justify-between items-center px-4 sm:px-6">
            <span className="text-xs font-black text-primary uppercase truncate max-w-[200px]">
              {selectedBet.match}
            </span>
            <Badge className="bg-primary text-white text-[8px] font-black uppercase shrink-0">
              P2P Secured
            </Badge>
          </div>

          <div className="p-4 sm:p-6 space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4 pb-6 border-b border-border/50">
              <div className="space-y-2">
                <span className="text-xs font-black text-muted-foreground uppercase opacity-50">
                  Creator: {selectedBet.creator.name}
                </span>
                <div className="text-xs font-black text-foreground">
                  Backing: {selectedBet.backing}
                </div>
                <div className="text-xs font-bold text-muted-foreground">
                  Stake: ${selectedBet.stake} @ {selectedBet.odds}x
                </div>
              </div>
              <div className="sm:text-right space-y-2">
                <span className="text-xs font-black text-primary ">
                  Your Lay Position
                </span>
                <div className="text-sm font-black text-primary underline underline-offset-4 decoration-primary/30">
                  Against {selectedBet.backing}
                </div>
                <div className="text-xl font-black text-foreground">
                  ${layStake.toFixed(2)} Stake
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3 text-amber-500 bg-amber-500/5 p-4 rounded-lg border border-amber-500/10">
                <AlertTriangle className="size-5 shrink-0 " />
                <p className="text-xs font-bold leading-relaxed uppercase tracking-widest">
                  ${layStake.toFixed(2)} will be held in escrow immediately.
                </p>
              </div>

              <div className="p-5 sm:p-6 rounded-lg border border-border ">
                <span className="text-xs font-black text-foreground  tracking-widest mb-2">
                  Settlement Rules
                </span>
                <div className="flex justify-between items-center text-xs font-black space-y-2">
                  <span className="text-foreground/80">
                    {selectedBet.backing} happens
                  </span>
                  <span className="text-rose-400">Lose Stake</span>
                </div>
                <div className="flex justify-between items-center text-xs font-black space-y-2">
                  <span className="text-foreground/60">Anything else</span>
                  <span className="text-emerald-400">
                    Win ${(selectedBet.stake + layStake).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-end sm:gap-4">
        <Button variant="outline" onClick={onCancel} className="cursor-pointer">
          Cancel
        </Button>
        <Button
          onClick={onAccept}
          disabled={isProcessing}
          className="cursor-pointer"
        >
          {isProcessing ? "Matching..." : "Confirm Accept"}
        </Button>
      </div>
    </div>
  );
};

export default AcceptBetModalContent;
