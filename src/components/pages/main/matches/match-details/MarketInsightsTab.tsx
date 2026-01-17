"use client";

import { Button } from "@/components/ui/button";
import { MarketCategory } from "@/interfaces/betting.interface";
import { Banknote, BarChart3, PlusCircle, Target } from "lucide-react";
import React from "react";

interface MarketInsightsTabProps {
  marketCategories: MarketCategory[];
  onBetClick: (outcome: string, marketName: string) => void;
}

const MarketInsightsTab: React.FC<MarketInsightsTabProps> = ({
  marketCategories,
  onBetClick,
}) => {
  return (
    <div className="space-y-12">
      {marketCategories.map((category, catIdx) => (
        <div key={catIdx} className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="h-px flex-1 bg-border" />
            <h3 className="text-[10px] sm:text-[11px] font-black text-primary uppercase tracking-[0.4em] bg-background px-4">
              {category.marketName}
            </h3>
            <div className="h-px flex-1 bg-border" />
          </div>

          <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {category?.outcomes.map((stat, idx) => (
              <div
                key={idx}
                className="bg-card rounded-xl p-4 border border-border flex flex-col items-center gap-4 group hover:border-primary/30 transition-all hover:shadow-lg hover:shadow-primary/5 active:scale-[0.98]"
              >
                <div className="flex flex-col items-center gap-2">
                  <span className="text-2xl group-hover:scale-110 transition-transform duration-300">
                    {stat.icon}
                  </span>
                  <h3 className="text-sm font-black text-foreground text-center leading-tight">
                    {stat.label}
                  </h3>
                </div>

                <div className="grid grid-cols-2 gap-2 w-full">
                  <div className="bg-muted/30 p-2 rounded-lg flex flex-col items-center gap-1 border border-border/50">
                    <div className="flex items-center gap-1 text-[9px] font-black text-muted-foreground uppercase">
                      <Target className="size-3 text-primary" />
                      {stat.bets}
                    </div>
                    <span className="text-[10px] font-bold text-foreground">
                      Matched
                    </span>
                  </div>
                  <div className="bg-muted/30 p-2 rounded-lg flex flex-col items-center gap-1 border border-border/50">
                    <div className="flex items-center gap-1 text-[9px] font-black text-muted-foreground uppercase">
                      <Banknote className="size-3 text-emerald-500" />$
                      {stat.pot}
                    </div>
                    <span className="text-[10px] font-bold text-foreground">
                      Pot
                    </span>
                  </div>
                </div>

                <div className="flex flex-col w-full mt-auto pt-2">
                  <Button
                    onClick={() => onBetClick(stat.label, category.marketName)}
                    size="sm"
                    className="w-full h-9 rounded-lg bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest text-[9px] shadow-sm active:scale-95 transition-all"
                  >
                    <PlusCircle className="size-3.5 mr-1.5" />
                    Bet
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="p-10 sm:p-16 text-center bg-muted/20 rounded-xl border border-dashed border-border text-muted-foreground flex flex-col items-center justify-center">
        <BarChart3 className="size-12 mb-4 opacity-10" />
        <p className="font-black uppercase tracking-widest text-[10px] sm:text-xs">
          Detailed market trends and volume analysis will appear here.
        </p>
      </div>
    </div>
  );
};

export default MarketInsightsTab;
