"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowRightLeft, CheckCircle2, Info, Lock } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

interface MatchedBetCardProps {
  user: {
    name: string;
    avatar: string;
    trust: number;
    timeAgo: string;
  };
  bet: {
    type: "BACKING" | "LAYING";
    selection: string;
    stake: number;
    potentialWin: number;
  };
}

const MatchedBetCard: React.FC<MatchedBetCardProps> = ({ user, bet }) => {
  const [isAccepted, setIsAccepted] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);

  const handleAccept = () => {
    if (!isConfirming) {
      setIsConfirming(true);
      return;
    }
    setIsAccepted(true);
    setIsConfirming(false);
  };

  const handleCancelConfirm = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsConfirming(false);
  };

  // P2P Logic: If user is backing Chelsea, opponent lays Chelsea
  const opponentStake = bet.potentialWin - bet.stake;

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-lg p-4 transition-all duration-300 border border-border bg-card group",
        isAccepted && "border-primary/20",
        isConfirming && "border-amber-500/50 bg-amber-500/5"
      )}
    >
      {/* User Info Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="relative size-10 rounded-full overflow-hidden border-2 border-primary/20">
            <Image
              src={user.avatar}
              alt={user.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-black text-foreground text-base tracking-tight">
              {user.name}
            </span>
            <span className="text-[10px] text-muted-foreground font-black uppercase tracking-widest">
              {user.timeAgo} •{" "}
              <span className="text-primary">{user.trust}% Trust Score</span>
            </span>
          </div>
        </div>
        <Badge
          variant="secondary"
          className="bg-primary/10 text-primary rounded-full px-3 py-1 text-[10px] font-black tracking-[0.2em] border-none uppercase"
        >
          P2P Verified
        </Badge>
      </div>

      {/* Bet Content */}
      <div className="bg-muted/30 rounded-lg p-4 border border-border/50 mb-4 relative overflow-hidden">
        <ArrowRightLeft className="absolute right-4 top-4 size-8 text-foreground/5" />
        <div className="flex flex-col gap-1">
          <span className="text-[9px] font-black text-primary uppercase tracking-widest">
            {user.name} Is {bet.type}
          </span>
          <h3 className="text-lg font-black text-foreground leading-tight">
            {bet.selection}
          </h3>
          <div className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground mt-1">
            <span>Stake: ${bet.stake.toFixed(2)}</span>
            <span>•</span>
            <span>Pot: ${bet.potentialWin.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Acceptance Logic Explanation */}
      <div className="flex items-center gap-3 text-xs font-bold text-foreground bg-primary/5 p-3 rounded-lg border border-primary/10 mb-4 transition-all group-hover:bg-primary/10">
        <Info className="size-4 text-primary shrink-0" />
        <p className="text-[10px] leading-tight text-muted-foreground">
          Bet{" "}
          <span className="text-primary font-black">
            ${opponentStake.toFixed(2)}
          </span>{" "}
          to win{" "}
          <span className="text-primary font-black">
            ${bet.stake.toFixed(2)}
          </span>{" "}
          if {bet.selection} loses.
        </p>
      </div>

      {/* Footer / Action Area */}
      <div className="flex items-center justify-between pt-2 border-t border-border/50">
        <div className="flex flex-col">
          <span className="text-[9px] font-black text-muted-foreground uppercase tracking-widest">
            Opponent Stake
          </span>
          <span className="text-xl font-black text-foreground">
            ${opponentStake.toFixed(2)}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {isConfirming && (
            <Button
              variant="ghost"
              onClick={handleCancelConfirm}
              className="h-10 rounded-lg px-3 font-black uppercase tracking-widest text-[10px] text-muted-foreground hover:text-foreground cursor-pointer"
            >
              Cancel
            </Button>
          )}
          <Button
            onClick={handleAccept}
            disabled={isAccepted}
            className={cn(
              "h-10 rounded-lg px-6 font-black uppercase tracking-widest text-[10px] transition-all flex gap-2 items-center cursor-pointer",
              isAccepted
                ? "bg-muted text-muted-foreground border border-border"
                : isConfirming
                ? "bg-amber-500 hover:bg-amber-600 text-white animate-pulse"
                : "bg-primary hover:bg-primary/90 text-white active:scale-95"
            )}
          >
            {isAccepted ? (
              <>
                Locked <Lock className="size-3.5" />
              </>
            ) : isConfirming ? (
              <>
                Confirm? <CheckCircle2 className="size-3.5" />
              </>
            ) : (
              <>
                Accept <CheckCircle2 className="size-3.5" />
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Locked Overlay Effect */}
      {isAccepted && (
        <div className="absolute inset-0 bg-background/40 backdrop-blur-[2px] pointer-events-none flex items-center justify-center animate-in fade-in duration-500">
          <div className="bg-card p-4 rounded-full border border-border scale-in duration-300">
            <Lock className="size-8 text-primary" />
          </div>
        </div>
      )}
    </div>
  );
};

export default MatchedBetCard;
