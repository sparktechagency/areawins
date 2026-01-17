"use client";

import { Button } from "@/components/ui/button";
import { PlusCircle, Search } from "lucide-react";
import React from "react";
import MatchedBetCard from "./MatchedBetCard";

import { MatchedBetCardProps } from "@/interfaces/betting.interface";

interface OpenBetsTabProps {
  matchedBets: MatchedBetCardProps[];
  onCreateBetClick: () => void;
}

const OpenBetsTab: React.FC<OpenBetsTabProps> = ({
  matchedBets,
  onCreateBetClick,
}) => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
        <h3 className="text-xl font-black text-foreground uppercase tracking-wider text-center sm:text-left">
          Available Community Bets
        </h3>
        <Button
          onClick={onCreateBetClick}
          size="sm"
          className="w-full sm:w-auto rounded-lg font-black text-[10px] uppercase tracking-widest h-10 px-6 shadow-md transition-all active:scale-95"
        >
          <PlusCircle className="size-4 mr-2" />
          Place New Bet
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {matchedBets.map((bet, idx) => (
          <MatchedBetCard key={idx} user={bet.user} bet={bet.bet} />
        ))}
      </div>

      {matchedBets.length === 0 && (
        <div className="p-10 sm:p-16 text-center bg-muted/20 rounded-xl border border-dashed border-border text-muted-foreground flex flex-col items-center justify-center">
          <Search className="size-12 mb-4 opacity-10" />
          <p className="font-black uppercase tracking-widest text-[10px] sm:text-xs">
            No active bets available for this match yet. Be the first to create
            one!
          </p>
        </div>
      )}
    </div>
  );
};

export default OpenBetsTab;
