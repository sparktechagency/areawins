"use client";

import { Button } from "@/components/ui/button";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import React from "react";

interface SuccessConfirmationProps {
  outcome: string | null;
  odds: number;
  onClose: () => void;
}

const SuccessConfirmation: React.FC<SuccessConfirmationProps> = ({
  outcome,
  odds,
  onClose,
}) => {
  return (
    <div className="p-5 sm:p-6 flex flex-col items-center text-center space-y-6 sm:space-y-8">
      <div className="size-20 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-500 animate-in zoom-in duration-500">
        <CheckCircle2 className="size-12 sm:size-16" />
      </div>

      <div className="space-y-3">
        <h2 className="text-xl sm:text-2xl font-black text-foreground tracking-tight uppercase">
          Bet Posted Successfully!
        </h2>
        <p className="text-xs  text-muted-foreground font-medium">
          Your prediction for{" "}
          <strong className="text-foreground">{outcome}</strong> has been placed
          in the open market at{" "}
          <strong className="text-primary">{odds}x</strong>.
        </p>
      </div>

      <div className="grid grid-cols-1 w-full gap-3 sm:gap-4 mt-4">
        <Button onClick={onClose} className="w-full cursor-pointer">
          View in Open Market
        </Button>
        <Button variant="outline" onClick={onClose} className="w-full cursor-pointer border">
          Go to My Bets
        </Button>
      </div>

      <div className="flex flex-col items-center gap-2 pt-4 border-t border-border/50 w-full mt-4">
        <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] flex items-center gap-2">
          <AlertCircle className="size-3.5 text-amber-500" />
          MATCHING PENDING
        </p>
        <p className="text-[9px] font-bold text-muted-foreground/60 uppercase text-center max-w-[250px] leading-relaxed">
          Funds will be held in secure escrow until the match result is
          finalized or bet is cancelled.
        </p>
      </div>
    </div>
  );
};

export default SuccessConfirmation;
