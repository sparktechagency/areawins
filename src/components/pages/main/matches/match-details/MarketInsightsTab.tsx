"use client";

import { MarketCategory } from "@/interfaces/betting.interface";
import { BarChart3, TrendingUp } from "lucide-react";
import React from "react";

interface MarketInsightsTabProps {
  marketCategories: MarketCategory[];
  onBetClick: (outcome: string, marketName: string, marketId: string) => void;
}

const MarketInsightsTab: React.FC<MarketInsightsTabProps> = ({
  marketCategories,
  onBetClick,
}) => {
  if (!marketCategories || marketCategories.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-6 border border-dashed border-border rounded-md bg-muted/5 text-center space-y-4">
        <BarChart3 className="size-16 text-muted-foreground/20" />
        <div className="max-w-xs space-y-2">
          <h3 className="text-lg  text-foreground uppercase tracking-tight">
            Market Not Available
          </h3>
          <p className="text-xs text-muted-foreground font-bold">
            Detailed market insights and betting options are currently
            unavailable for this match. Please check back later.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 sm:space-y-10">
      {marketCategories.map((category, catIdx) => (
        <div key={catIdx} className="bg-card rounded-md border border-border overflow-hidden shadow-sm">
          {/* Market Header */}
          <div className="px-5 py-3.5 border-b border-border bg-muted/20 flex items-center justify-between">
            <h3 className="text-[11px] sm:text-xs font-bold text-foreground uppercase tracking-widest flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-primary" />
              {category.marketName}
            </h3>
            <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-tight">Active</span>
          </div>

          {/* Outcome Buttons Grid */}
          <div className="p-1 sm:p-1.5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1 sm:gap-1.5">
            {category?.outcomes.map((stat, idx) => (
              <button
                key={idx}
                onClick={() => onBetClick(stat.label, category.marketName, category.marketId)}
                className="group flex items-center justify-between px-5 py-4 bg-muted/5 hover:bg-primary/10 border border-border/50 hover:border-primary/40 rounded-md transition-all duration-200 text-left active:scale-[0.98]"
              >
                <div className="flex flex-col gap-0.5">
                  <span className="text-xs sm:text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                    {stat.label}
                  </span>
                  <span className="text-[9px] text-muted-foreground/60 uppercase font-bold tracking-widest">
                    {category.marketName}
                  </span>
                </div>
                
                <div className="flex items-center gap-2">
                  <span className="hidden group-hover:inline-block text-[9px] font-bold text-primary uppercase tracking-widest animate-in fade-in slide-in-from-right-2 duration-300">
                    Place Bet
                  </span>
                  <div className="size-7 rounded-full bg-border/40 group-hover:bg-primary/20 flex items-center justify-center transition-colors">
                    <TrendingUp className="size-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MarketInsightsTab;
