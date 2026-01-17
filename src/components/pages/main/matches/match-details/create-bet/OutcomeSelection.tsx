"use client";

import { Badge } from "@/components/ui/badge";
import { MarketCategory, OutcomeStat } from "@/interfaces/betting.interface";
import { cn } from "@/lib/utils";
import { ArrowRight, Info } from "lucide-react";
import React from "react";

interface OutcomeSelectionProps {
  marketOutcomes: MarketCategory[];
  outcome: string | null;
  onSelect: (outcome: string, marketName: string) => void;
}

const OutcomeSelection: React.FC<OutcomeSelectionProps> = ({
  marketOutcomes,
  outcome,
  onSelect,
}) => {
  return (
    <div className="p-5 sm:p-6 space-y-6 sm:space-y-8">
      <div className="space-y-2">
        <Badge
          variant="outline"
          className="text-primary border-primary/20 bg-primary/5 px-3 py-0.5 font-black uppercase tracking-widest text-[10px]"
        >
          Step 1: Choose Outcome
        </Badge>
        <h2 className="text-xl sm:text-2xl font-black text-foreground tracking-tight">
          What&apos;s your prediction?
        </h2>
        <p className="text-xs text-muted-foreground font-medium">
          Select which market and result you are backing.
        </p>
      </div>

      <div className="space-y-6 sm:space-y-8">
        {marketOutcomes.map((market, mIdx) => (
          <div key={mIdx} className="space-y-4">
            <h4 className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] relative">
              <span className="bg-card pr-3 relative z-10">
                {market.marketName}
              </span>
              <div className="absolute top-1/2 left-0 w-full h-px bg-border/50" />
            </h4>
            <div className="grid grid-cols-1 gap-3">
              {market.outcomes.map((o: OutcomeStat) => (
                <button
                  key={o.id}
                  onClick={() => onSelect(o.label, market.marketName)}
                  className={cn(
                    "group relative overflow-hidden bg-muted/20 hover:bg-primary/5 border border-border/50 hover:border-primary/50 px-4 py-2 rounded-lg transition-all flex items-center justify-between cursor-pointer active:scale-[0.98]",
                    outcome === o.label && "border-primary bg-primary/10"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{o.icon}</span>
                    <span className="text-sm sm:text-base font-bold text-foreground group-hover:text-primary transition-colors">
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

      <div className="flex items-start gap-3 p-4 bg-blue-500/5 rounded-xl border border-blue-500/10">
        <Info className="size-5 text-blue-500 shrink-0 mt-0.5" />
        <p className="text-[10px] font-bold text-blue-500/80 uppercase tracking-wider leading-relaxed">
          You are &quot;Backing&quot; this outcome. Someone else will need to
          &quot;Lay&quot; (bet against) it for your bet to be matched.
        </p>
      </div>
    </div>
  );
};

export default OutcomeSelection;
