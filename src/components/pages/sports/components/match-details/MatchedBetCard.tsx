"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CheckCircle2, Lock, TrendingUp } from "lucide-react";
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

  const handleAccept = () => {
    setIsAccepted(true);
  };

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[30px] p-6 transition-all duration-300 border border-border",
      )}
    >
      {/* User Info Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="relative size-12 rounded-full overflow-hidden border-2 border-primary/20">
            <Image
              src={user.avatar}
              alt={user.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-black text-white text-lg tracking-tight">
              {user.name}
            </span>
            <span className="text-xs text-slate-400 font-bold">
              {user.timeAgo} •{" "}
              <span className="text-primary">{user.trust}% Trust</span>
            </span>
          </div>
        </div>
        <Badge
          variant="secondary"
          className="bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 rounded-full px-3 py-0.5 text-[10px] font-black tracking-widest border-none"
        >
          P2P
        </Badge>
      </div>

      {/* Bet Content */}
      <div className="space-y-1 mb-8">
        <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">
          {bet.type}
        </span>
        <h3 className="text-2xl font-black text-white leading-tight">
          {bet.selection}
        </h3>
      </div>

      <div className="h-px w-full bg-white/5 mb-6" />

      {/* Footer / Action Area */}
      <div className="flex items-end justify-between">
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
            Stake Amount
          </span>
          <span className="text-3xl font-black text-white">
            ${bet.stake.toFixed(2)}
          </span>
          <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-sm mt-1">
            <TrendingUp className="size-3.5" />
            <span>Win ${bet.potentialWin.toFixed(2)}</span>
          </div>
        </div>

        <Button
          onClick={handleAccept}
          disabled={isAccepted}
          className={cn(
            "rounded-lg px-10 font-black  transition-all flex gap-2 items-center cursor-pointer",
            isAccepted
              ? "bg-slate-800 text-slate-500 border border-white/5"
              : "bg-[#00d65c] hover:bg-[#00b84d] text-white shadow-lg shadow-emerald-500/20"
          )}
        >
          {isAccepted ? (
            <>
              Locked <Lock className="size-5" />
            </>
          ) : (
            <>
              Accept <CheckCircle2 className="size-5" />
            </>
          )}
        </Button>
      </div>

      {/* Locked Overlay Effect */}
      {isAccepted && (
        <div className="absolute inset-0 bg-slate-950/20 backdrop-blur-[1px] pointer-events-none flex items-center justify-center">
          <div className="bg-slate-900/80 p-2 rounded-full border border-white/10 shadow-2xl">
            <Lock className="size-6 text-primary" />
          </div>
        </div>
      )}
    </div>
  );
};

export default MatchedBetCard;
