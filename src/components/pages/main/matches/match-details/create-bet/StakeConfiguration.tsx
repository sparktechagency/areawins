"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Calculator,
  CheckCircle2,
  ShieldCheck,
  TrendingUp,
  Wallet,
} from "lucide-react";
import React from "react";

interface StakeConfigurationProps {
  outcome: string | null;
  selectedMarketName: string | null;
  stake: number;
  setStake: (stake: number) => void;
  odds: number;
  setOdds: (odds: number) => void;
  potentialWin: number;
  opponentStake: number;
  isProcessing: boolean;
  onBack: () => void;
  onConfirm: () => void;
  showBackButton: boolean;
}

const StakeConfiguration: React.FC<StakeConfigurationProps> = ({
  outcome,
  selectedMarketName,
  stake,
  setStake,
  odds,
  setOdds,
  potentialWin,
  opponentStake,
  isProcessing,
  onBack,
  onConfirm,
  showBackButton,
}) => {
  return (
    <div className="p-5 sm:p-8 space-y-6 sm:space-y-8">
      <div className="space-y-2">
        {showBackButton && (
          <button
            onClick={onBack}
            className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-2 hover:text-primary transition-colors flex items-center gap-1 cursor-pointer"
          >
            ← Back to Outcome
          </button>
        )}
        <Badge
          variant="outline"
          className="text-primary border-primary/20 bg-primary/5 px-3 py-0.5 font-black uppercase tracking-widest text-[10px]"
        >
          Step 2: Set Stake & Odds
        </Badge>
        <h2 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight">
          Configure your bet
        </h2>
        <div className="flex items-center gap-2 text-primary font-black uppercase tracking-tight text-xs sm:text-sm">
          <CheckCircle2 className="size-4 sm:size-5 shrink-0" />
          <span className="truncate">
            {selectedMarketName ? `${selectedMarketName}: ` : ""} {outcome}
          </span>
        </div>
      </div>

      <div className="space-y-5 sm:space-y-6">
        {/* Stake Input */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">
              Stake Amount ($)
            </label>
            <span className="text-[10px] font-bold text-emerald-500 flex items-center gap-1">
              <Wallet className="size-3" /> Min $10
            </span>
          </div>
          <Input
            type="number"
            value={stake}
            onChange={(e) => setStake(Number(e.target.value))}
            className="h-14 sm:h-16 rounded-xl bg-muted/30 border-border text-xl sm:text-2xl font-black px-5 sm:px-6 focus-visible:ring-primary focus-visible:border-primary transition-all"
          />
        </div>

        {/* Odds Input / Slider */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">
              Odds Preference (x)
            </label>
            <span className="text-[10px] font-bold text-primary px-2 py-0.5 bg-primary/10 rounded">
              Market Avg: 2.1x
            </span>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <Input
              type="number"
              step="0.1"
              value={odds}
              onChange={(e) => setOdds(Number(e.target.value))}
              className="h-14 sm:h-16 rounded-xl bg-muted/30 border-border text-xl sm:text-2xl font-black px-5 sm:px-6 focus-visible:ring-primary w-full sm:w-32 transition-all"
            />
            <div className="flex-1 w-full sm:w-auto">
              <input
                type="range"
                min="1.1"
                max="10"
                step="0.1"
                value={odds}
                onChange={(e) => setOdds(Number(e.target.value))}
                className="w-full accent-primary bg-muted h-1.5 rounded-full appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-muted-foreground font-bold mt-2 uppercase tracking-tighter">
                <span>1.1x Min</span>
                <span>10.0x Max</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Calculator Area */}
      <div className="bg-slate-900 dark:bg-slate-950 rounded-xl p-5 sm:p-6 border border-white/5 space-y-4 shadow-xl">
        <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-slate-500">
          <span>P2P Live Calculator</span>
          <Calculator className="size-4 opacity-50" />
        </div>

        <div className="grid grid-cols-2 gap-4 sm:gap-8">
          <div className="space-y-1">
            <span className="text-[9px] font-black text-white/40 uppercase tracking-tighter">
              If You Win
            </span>
            <div className="text-xl sm:text-2xl font-black text-emerald-400">
              ${potentialWin.toFixed(2)}
            </div>
          </div>
          <div className="text-right space-y-1">
            <span className="text-[9px] font-black text-white/40 uppercase tracking-tighter">
              Opponent Stake Needed
            </span>
            <div className="text-xl sm:text-2xl font-black text-blue-400">
              ${opponentStake.toFixed(2)}
            </div>
          </div>
        </div>

        <div className="h-px w-full bg-white/5" />

        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[9px] font-black text-white/40 uppercase tracking-tighter">
              Your Balance
            </span>
            <span className="text-xs font-bold text-white">$1,250.00</span>
          </div>
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-white/60 uppercase tracking-wide">
            <ShieldCheck className="size-3.5 text-primary" />
            Escrow Protected
          </div>
        </div>
      </div>

      <Button
        onClick={onConfirm}
        disabled={isProcessing || stake < 10}
        className="w-full h-14 sm:h-16 rounded-xl bg-[#00d65c] hover:bg-[#00b84d] text-white font-black uppercase tracking-widest transition-all group overflow-hidden"
      >
        {isProcessing ? (
          <span className="flex items-center gap-2 animate-pulse">
            Processing Transaction...
          </span>
        ) : (
          <span className="flex items-center justify-center gap-3">
            Post to Open Market
            <TrendingUp className="size-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </span>
        )}
      </Button>
    </div>
  );
};

export default StakeConfiguration;
