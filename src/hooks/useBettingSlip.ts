/**
 * Betting slip hook
 * Manages betting slip state and operations
 */

"use client";

import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import {
  addToBettingSlip,
  removeFromBettingSlip,
  clearBettingSlip,
  setStake,
  setBetType,
} from "@/lib/redux/features/bettingSlice";
import { usePlaceBetMutation } from "@/lib/redux/api/bettingApi";
import type { BettingSlipItem, BetType } from "@/types";
import toast from "react-hot-toast";

export function useBettingSlip() {
  const dispatch = useAppDispatch();
  const bettingSlip = useAppSelector((state) => state.betting);
  const [placeBet, { isLoading: isPlacingBet }] = usePlaceBetMutation();

  const addItem = (item: BettingSlipItem) => {
    dispatch(addToBettingSlip(item));
    toast.success("Added to betting slip");
  };

  const removeItem = (matchId: string, market: string) => {
    dispatch(removeFromBettingSlip({ matchId, market }));
    toast.success("Removed from betting slip");
  };

  const clear = () => {
    dispatch(clearBettingSlip());
    toast.success("Betting slip cleared");
  };

  const updateStake = (stake: number) => {
    dispatch(setStake(stake));
  };

  const changeBetType = (betType: BetType) => {
    dispatch(setBetType(betType));
  };

  const submitBet = async () => {
    try {
      const result = await placeBet({
        betType: bettingSlip.betType,
        selections: bettingSlip.items.map((item) => ({
          matchId: item.matchId,
          selection: item.selection,
          market: item.market,
          odds: item.odds,
        })),
        stake: bettingSlip.stake,
      }).unwrap();

      toast.success("Bet placed successfully!");
      clear();
      return result;
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to place bet");
      throw error;
    }
  };

  return {
    items: bettingSlip.items,
    betType: bettingSlip.betType,
    stake: bettingSlip.stake,
    totalOdds: bettingSlip.totalOdds,
    potentialWin: bettingSlip.potentialWin,
    isPlacingBet,
    addItem,
    removeItem,
    clear,
    updateStake,
    changeBetType,
    submitBet,
  };
}
