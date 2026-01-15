"use client";

import { ReusableModal } from "@/components/shared/ReusableModal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { getBetOutcomesByMarket } from "@/data/betting.data";
import { CreateBetModalProps } from "@/interfaces/betting.interface";
import { cn } from "@/lib/utils";
import {
  AlertCircle,
  ArrowRight,
  Calculator,
  CheckCircle2,
  Info,
  ShieldCheck,
  TrendingUp,
  Wallet,
} from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";

type Step = "SELECT_OUTCOME" | "SET_STAKE" | "CONFIRMATION";

const CreateBetModal: React.FC<CreateBetModalProps> = ({
  isOpen,
  onClose,
  match,
  selectedOutcome,
  marketName,
}) => {
  const [step, setStep] = useState<Step>("SELECT_OUTCOME");
  const [outcome, setOutcome] = useState<string | null>(null);
  const [selectedMarketName, setSelectedMarketName] = useState<string | null>(
    null
  );
  const [stake, setStake] = useState<number>(50);
  const [odds, setOdds] = useState<number>(2.0);
  const [isProcessing, setIsProcessing] = useState(false);

  // Sync with props when modal opens
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        if (selectedOutcome) {
          setOutcome(selectedOutcome);
          setSelectedMarketName(marketName || "Match Results");
          setStep("SET_STAKE");
        } else {
          setOutcome(null);
          setSelectedMarketName(null);
          setStep("SELECT_OUTCOME");
        }
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [isOpen, selectedOutcome, marketName]);

  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => {
        setStep("SELECT_OUTCOME");
        setOutcome(null);
        setSelectedMarketName(null);
        setStake(50);
        setOdds(2.0);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const potentialWin = stake * odds;
  const opponentStake = potentialWin - stake;

  const handleCreate = () => {
    setIsProcessing(true);
    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      setStep("CONFIRMATION");
    }, 1500);
  };

  const marketOutcomes = useMemo(() => getBetOutcomesByMarket(match), [match]);

  return (
    <ReusableModal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="md"
      className="p-0"
    >
      <div className="relative">
        {/* Progress Bar */}
        <div className="absolute top-0 left-0 w-full h-1 bg-muted">
          <div
            className="h-full bg-primary transition-all duration-500 ease-out"
            style={{
              width:
                step === "SELECT_OUTCOME"
                  ? "33%"
                  : step === "SET_STAKE"
                  ? "66%"
                  : "100%",
            }}
          />
        </div>

        {step === "SELECT_OUTCOME" && (
          <div className="p-8 space-y-8 max-h-[85vh] overflow-y-auto no-scrollbar">
            <div className="space-y-2">
              <Badge
                variant="outline"
                className="text-primary border-primary/20 bg-primary/5 px-3 py-0.5 font-black uppercase tracking-widest text-[10px]"
              >
                Step 1: Choose Outcome
              </Badge>
              <h2 className="text-3xl font-black text-foreground tracking-tight">
                What&apos;s your prediction?
              </h2>
              <p className="text-muted-foreground font-medium">
                Select which market and result you are backing.
              </p>
            </div>

            <div className="space-y-8">
              {marketOutcomes.map((market, mIdx) => (
                <div key={mIdx} className="space-y-4">
                  <h4 className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] relative">
                    <span className="bg-card pr-3 relative z-10">
                      {market.marketName}
                    </span>
                    <div className="absolute top-1/2 left-0 w-full h-px bg-border/50" />
                  </h4>
                  <div className="grid grid-cols-1 gap-3">
                    {market.outcomes.map((o) => (
                      <button
                        key={o.id}
                        onClick={() => {
                          setOutcome(o.label);
                          setSelectedMarketName(market.marketName); // Set the selected market name
                          setStep("SET_STAKE");
                        }}
                        className={cn(
                          "group relative overflow-hidden bg-muted/20 hover:bg-primary/5 border border-border/50 hover:border-primary/50 p-4 rounded-lg transition-all flex items-center justify-between cursor-pointer",
                          outcome === o.label && "border-primary bg-primary/10"
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{o.icon}</span>
                          <span className="text-base font-bold text-foreground group-hover:text-primary transition-colors">
                            {o.label}
                          </span>
                        </div>
                        <ArrowRight className="size-4 text-muted-foreground group-hover:text-primary transition-all group-hover:translate-x-1" />
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2 p-4 bg-blue-500/5 rounded-lg border border-blue-500/10">
              <Info className="size-5 text-blue-500 shrink-0" />
              <p className="text-[11px] font-bold text-blue-500/80 uppercase tracking-wider leading-relaxed">
                You are &quot;Backing&quot; this outcome. Someone else will need
                to &quot;Lay&quot; (bet against) it for your bet to be matched.
              </p>
            </div>
          </div>
        )}

        {step === "SET_STAKE" && (
          <div className="p-8 space-y-8">
            <div className="space-y-2">
              {!selectedOutcome && (
                <button
                  onClick={() => setStep("SELECT_OUTCOME")}
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
              <h2 className="text-3xl font-black text-foreground tracking-tight">
                Configure your bet
              </h2>
              <div className="flex items-center gap-2 text-primary font-black uppercase tracking-tight text-sm">
                <CheckCircle2 className="size-5" />
                <span>
                  {selectedMarketName ? `${selectedMarketName}: ` : ""}{" "}
                  {outcome}
                </span>
              </div>
            </div>

            <div className="space-y-6">
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
                  className="h-16 rounded-lg bg-muted/30 border-border text-2xl font-black px-6 focus-visible:ring-primary focus-visible:border-primary"
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
                <div className="flex gap-4 items-center">
                  <Input
                    type="number"
                    step="0.1"
                    value={odds}
                    onChange={(e) => setOdds(Number(e.target.value))}
                    className="h-16 rounded-lg bg-muted/30 border-border text-2xl font-black px-6 focus-visible:ring-primary w-32"
                  />
                  <div className="flex-1">
                    <input
                      type="range"
                      min="1.1"
                      max="10"
                      step="0.1"
                      value={odds}
                      onChange={(e) => setOdds(Number(e.target.value))}
                      className="w-full accent-primary bg-muted h-1.5 rounded-full appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-muted-foreground font-bold mt-2">
                      <span>1.1x</span>
                      <span>10x</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Calculator Area */}
            <div className="bg-slate-950 rounded-lg p-6 border border-white/5 space-y-4">
              <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-slate-500">
                <span>P2P Live Calculator</span>
                <Calculator className="size-4 opacity-50" />
              </div>

              <div className="grid grid-cols-2 gap-8">
                <div>
                  <span className="text-[9px] font-black text-white/40 uppercase tracking-tighter">
                    If You Win
                  </span>
                  <div className="text-2xl font-black text-emerald-400">
                    ${potentialWin.toFixed(2)}
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[9px] font-black text-white/40 uppercase tracking-tighter">
                    Opponent Stake Needed
                  </span>
                  <div className="text-2xl font-black text-blue-400">
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
                  <span className="text-xs font-bold text-white">
                    $1,250.00
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-white/60">
                  <ShieldCheck className="size-3.5 text-primary" />
                  Escrow Protected
                </div>
              </div>
            </div>

            <Button
              onClick={handleCreate}
              disabled={isProcessing || stake < 10}
              className="w-full h-16 rounded-lg bg-[#00d65c] hover:bg-[#00b84d] text-white text-lg font-black uppercase tracking-widest transition-all active:scale-95 group overflow-hidden"
            >
              {isProcessing ? (
                <span className="flex items-center gap-2 animate-pulse">
                  Processing...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-3">
                  Post to Open Market
                  <TrendingUp className="size-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </span>
              )}
            </Button>
          </div>
        )}

        {step === "CONFIRMATION" && (
          <div className="p-12 flex flex-col items-center text-center space-y-8">
            <div className="size-24 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-500 animate-in zoom-in duration-500">
              <CheckCircle2 className="size-16" />
            </div>

            <div className="space-y-2">
              <h2 className="text-3xl font-black text-foreground tracking-tight">
                Bet Posted Successfully!
              </h2>
              <p className="text-muted-foreground font-medium">
                Your prediction for <strong>{outcome}</strong> has been placed
                in the open market at <strong>{odds}x</strong>.
              </p>
            </div>

            <div className="grid grid-cols-1 w-full gap-3">
              <Button
                onClick={onClose}
                className="h-14 rounded-lg bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest"
              >
                View in Open Market
              </Button>
              <Button
                variant="ghost"
                onClick={onClose}
                className="h-14 rounded-lg font-black text-muted-foreground uppercase tracking-widest hover:text-foreground"
              >
                Go to My Bets
              </Button>
            </div>

            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
              <AlertCircle className="size-3" />
              MATCHING PENDING
            </p>
          </div>
        )}
      </div>
    </ReusableModal>
  );
};

export default CreateBetModal;
