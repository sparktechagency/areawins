"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Trash2 } from "lucide-react";

const BetSlip = () => {
  return (
    <div className="w-full bg-card rounded-xl border border-border  overflow-hidden sticky top-24">
      <h1 className="text-2xl font-bold px-2 py-3.5 text-center">Bet Slip</h1>
      <div className="p-0 mt-0">
        <div className="p-4 border-b border-border bg-muted/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold">
              1
            </span>
            <span className="text-sm font-bold uppercase tracking-wider">
              Your Selections
            </span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 text-muted-foreground hover:text-destructive"
          >
            <Trash2 className="size-4" />
          </Button>
        </div>

        <div className="p-4 space-y-4 max-h-[400px] overflow-y-auto no-scrollbar">
          {/* Example Selection */}
          <div className="bg-background rounded-lg border border-border p-3 relative group">
            <div className="flex items-center justify-between mb-1">
              <Badge
                variant="secondary"
                className="bg-rose-500/10 text-rose-500 hover:bg-rose-500/20 text-[10px] border-none px-1.5 py-0 h-4"
              >
                LIVE
              </Badge>
              <button className="text-muted-foreground hover:text-foreground">
                <span className="text-xl leading-none">×</span>
              </button>
            </div>

            <div className="text-xs font-bold text-foreground mb-1">
              Match Result
            </div>
            <div className="text-sm font-bold text-foreground mb-1 leading-tight">
              Chelsea vs Arsenal
            </div>
            <div className="text-xs text-muted-foreground mb-3 font-medium">
              Chelsea to Win
            </div>

            <div className="flex items-center justify-between">
              <span className="text-lg font-black text-primary">1.85</span>
              <div className="flex items-center gap-2 bg-muted/50 rounded-lg px-2 py-1.5 border border-border">
                <span className="text-[10px] font-bold text-muted-foreground uppercase">
                  Stake
                </span>
                <input
                  type="text"
                  defaultValue="500"
                  className="w-16 bg-transparent text-right text-sm font-bold text-foreground focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Empty State could go here */}
        </div>

        <div className="p-4 bg-muted/20 border-t border-border space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground font-medium">
              Total Odds
            </span>
            <span className="font-bold">1.85</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground font-medium">Stake</span>
            <span className="font-bold">৳500.00</span>
          </div>
          <div className="flex items-center justify-between text-lg">
            <span className="text-foreground font-black">Potential Return</span>
            <span className="font-black text-primary">৳925.00</span>
          </div>

          <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-black py-6 rounded-xl uppercase tracking-widest mt-2 shadow-lg shadow-primary/20">
            Place Bet Now
          </Button>

          <div className="flex items-center justify-center gap-2 text-[10px] text-muted-foreground font-medium pt-2">
            <ShieldCheck className="size-3" />
            Secure Transaction Guaranteed
          </div>
        </div>
      </div>
    </div>
  );
};

export default BetSlip;
