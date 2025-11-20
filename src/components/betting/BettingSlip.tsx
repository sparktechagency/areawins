"use client";

/**
 * BettingSlip Component
 * Fixed sidebar showing selected bets with stake input and place bet button
 */

import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useBettingSlip } from "@/hooks/useBettingSlip";
import { formatCurrency, formatOdds } from "@/lib/utils";
import { useState } from "react";

export default function BettingSlip() {
  const {
    items,
    betType,
    stake,
    totalOdds,
    potentialWin,
    isPlacingBet,
    removeItem,
    clear,
    updateStake,
    submitBet,
  } = useBettingSlip();

  const [localStake, setLocalStake] = useState(stake.toString());

  const handleStakeChange = (value: string) => {
    setLocalStake(value);
    const numValue = parseFloat(value) || 0;
    updateStake(numValue);
  };

  const handlePlaceBet = async () => {
    try {
      await submitBet();
      setLocalStake("0");
    } catch (error) {
      // Error handled by hook
    }
  };

  return (
    <Card className="betting-slip w-full lg:w-80 border-gray-200">
      <CardHeader className="pb-3 border-b">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">
            Betting Slip
            {items.length > 0 && (
              <Badge variant="secondary" className="ml-2">
                {items.length}
              </Badge>
            )}
          </CardTitle>
          {items.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clear}
              className="text-red-600 hover:text-red-700"
            >
              Clear All
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className="p-4">
        {items.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>No bets selected</p>
            <p className="text-sm mt-2">
              Click on odds to add them to your betting slip
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Selected Bets */}
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {items.map((item) => (
                <div
                  key={`${item.matchId}-${item.market}`}
                  className="p-3 bg-gray-50 rounded-lg relative"
                >
                  {/* Remove button */}
                  <button
                    onClick={() => removeItem(item.matchId, item.market)}
                    className="absolute top-2 right-2 text-gray-400 hover:text-red-600"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  {/* Match info */}
                  <p className="text-sm font-semibold pr-6 mb-1">
                    {item.teams}
                  </p>
                  <div className="flex justify-between items-center text-sm text-gray-600">
                    <span>{item.selection}</span>
                    <span className="font-bold text-primary">
                      {formatOdds(item.odds)}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {item.sport.charAt(0).toUpperCase() + item.sport.slice(1)}
                  </p>
                </div>
              ))}
            </div>

            {/* Bet Type */}
            <div className="flex gap-2 text-sm">
              <Badge variant={betType === "single" ? "default" : "outline"}>
                Single
              </Badge>
              <Badge variant={betType === "accumulator" ? "default" : "outline"}>
                Accumulator
              </Badge>
            </div>

            {/* Stake Input */}
            <div>
              <label className="text-sm font-medium mb-2 block">
                Stake Amount
              </label>
              <Input
                type="number"
                value={localStake}
                onChange={(e) => handleStakeChange(e.target.value)}
                placeholder="Enter stake"
                min="0"
                step="0.01"
              />
            </div>

            {/* Summary */}
            <div className="space-y-2 pt-3 border-t">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Total Odds:</span>
                <span className="font-semibold">{formatOdds(totalOdds)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Stake:</span>
                <span className="font-semibold">
                  {formatCurrency(parseFloat(localStake) || 0)}
                </span>
              </div>
              <div className="flex justify-between font-bold text-lg text-primary pt-2 border-t">
                <span>Potential Win:</span>
                <span>{formatCurrency(potentialWin)}</span>
              </div>
            </div>

            {/* Place Bet Button */}
            <Button
              onClick={handlePlaceBet}
              disabled={isPlacingBet || parseFloat(localStake) <= 0}
              className="w-full bg-primary hover:bg-primary/90 h-11"
            >
              {isPlacingBet ? "Placing Bet..." : "Place Bet"}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
