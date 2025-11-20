/**
 * Betting slip state slice
 * Manages betting slip items and calculations
 */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { BettingSlipState, BettingSlipItem, BetType } from "@/types";
import { STORAGE_KEYS } from "@/lib/constants";
import { calculatePotentialWin } from "@/lib/utils";

// Load initial state from localStorage
const loadBettingSlipFromStorage = (): BettingSlipItem[] => {
  if (typeof window === "undefined") return [];

  try {
    const stored = localStorage.getItem(STORAGE_KEYS.BETTING_SLIP);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const initialState: BettingSlipState = {
  items: loadBettingSlipFromStorage(),
  betType: "single",
  stake: 0,
  totalOdds: 1,
  potentialWin: 0,
  isPlacing: false,
  error: null,
};

const bettingSlice = createSlice({
  name: "betting",
  initialState,
  reducers: {
    addToBettingSlip: (state, action: PayloadAction<BettingSlipItem>) => {
      const exists = state.items.find(
        (item) => item.matchId === action.payload.matchId && item.market === action.payload.market
      );

      if (!exists) {
        state.items.push(action.payload);

        // Save to localStorage
        if (typeof window !== "undefined") {
          localStorage.setItem(STORAGE_KEYS.BETTING_SLIP, JSON.stringify(state.items));
        }

        // Recalculate odds
        bettingSlice.caseReducers.recalculateOdds(state);
      }
    },

    removeFromBettingSlip: (state, action: PayloadAction<{ matchId: string; market: string }>) => {
      state.items = state.items.filter(
        (item) => !(item.matchId === action.payload.matchId && item.market === action.payload.market)
      );

      // Save to localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem(STORAGE_KEYS.BETTING_SLIP, JSON.stringify(state.items));
      }

      // Recalculate odds
      bettingSlice.caseReducers.recalculateOdds(state);
    },

    clearBettingSlip: (state) => {
      state.items = [];
      state.stake = 0;
      state.totalOdds = 1;
      state.potentialWin = 0;

      // Clear localStorage
      if (typeof window !== "undefined") {
        localStorage.removeItem(STORAGE_KEYS.BETTING_SLIP);
      }
    },

    setBetType: (state, action: PayloadAction<BetType>) => {
      state.betType = action.payload;
      bettingSlice.caseReducers.recalculateOdds(state);
    },

    setStake: (state, action: PayloadAction<number>) => {
      state.stake = action.payload;
      state.potentialWin = calculatePotentialWin(action.payload, state.totalOdds);
    },

    updateOdds: (state, action: PayloadAction<{ matchId: string; market: string; odds: number }>) => {
      const item = state.items.find(
        (item) => item.matchId === action.payload.matchId && item.market === action.payload.market
      );

      if (item) {
        item.odds = action.payload.odds;
        bettingSlice.caseReducers.recalculateOdds(state);
      }
    },

    recalculateOdds: (state) => {
      if (state.items.length === 0) {
        state.totalOdds = 1;
        state.potentialWin = 0;
        return;
      }

      if (state.betType === "accumulator") {
        // Multiply all odds for accumulator
        state.totalOdds = state.items.reduce((acc, item) => acc * item.odds, 1);
      } else {
        // For single bets, just use the first item's odds
        state.totalOdds = state.items[0]?.odds || 1;
      }

      state.potentialWin = calculatePotentialWin(state.stake, state.totalOdds);
    },

    setPlacing: (state, action: PayloadAction<boolean>) => {
      state.isPlacing = action.payload;
    },

    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },

    resetAfterBet: (state) => {
      state.items = [];
      state.stake = 0;
      state.totalOdds = 1;
      state.potentialWin = 0;
      state.isPlacing = false;
      state.error = null;

      // Clear localStorage
      if (typeof window !== "undefined") {
        localStorage.removeItem(STORAGE_KEYS.BETTING_SLIP);
      }
    },
  },
});

export const {
  addToBettingSlip,
  removeFromBettingSlip,
  clearBettingSlip,
  setBetType,
  setStake,
  updateOdds,
  recalculateOdds,
  setPlacing,
  setError,
  resetAfterBet,
} = bettingSlice.actions;

export default bettingSlice.reducer;
