/**
 * Zod validation schemas for betting forms
 */

import { z } from "zod";
import { BETTING_LIMITS } from "@/lib/constants";

// Place bet schema
export const placeBetSchema = z.object({
  matchId: z.string().optional(),
  betType: z.enum(["single", "accumulator", "system"]),
  selections: z
    .array(
      z.object({
        matchId: z.string().min(1, "Match ID is required"),
        selection: z.string().min(1, "Selection is required"),
        market: z.string().min(1, "Market is required"),
        odds: z
          .number()
          .min(BETTING_LIMITS.MIN_ACCUMULATOR_ODDS, `Minimum odds is ${BETTING_LIMITS.MIN_ACCUMULATOR_ODDS}`)
          .max(BETTING_LIMITS.MAX_ACCUMULATOR_ODDS, `Maximum odds is ${BETTING_LIMITS.MAX_ACCUMULATOR_ODDS}`),
      })
    )
    .min(1, "At least one selection is required")
    .max(BETTING_LIMITS.MAX_ACCUMULATOR_SELECTIONS, `Maximum ${BETTING_LIMITS.MAX_ACCUMULATOR_SELECTIONS} selections allowed`),
  stake: z
    .number()
    .min(BETTING_LIMITS.MIN_STAKE, `Minimum stake is ${BETTING_LIMITS.MIN_STAKE}`)
    .max(BETTING_LIMITS.MAX_STAKE, `Maximum stake is ${BETTING_LIMITS.MAX_STAKE}`),
});

export type PlaceBetFormData = z.infer<typeof placeBetSchema>;

// Cash out schema
export const cashOutSchema = z.object({
  betId: z.string().min(1, "Bet ID is required"),
  amount: z.number().min(0, "Amount must be positive").optional(),
  confirmCashOut: z.boolean().refine((val) => val === true, "Please confirm cash out"),
});

export type CashOutFormData = z.infer<typeof cashOutSchema>;

// Bet filter schema
export const betFilterSchema = z.object({
  status: z.enum(["pending", "won", "lost", "cancelled", "cashed_out", "void"]).optional(),
  betType: z.enum(["single", "accumulator", "system"]).optional(),
  sport: z.string().optional(),
  dateFrom: z.string().optional(),
  dateTo: z.string().optional(),
  minStake: z.number().optional(),
  maxStake: z.number().optional(),
  page: z.number().optional(),
  limit: z.number().optional(),
});

export type BetFilterFormData = z.infer<typeof betFilterSchema>;

// Quick bet schema
export const quickBetSchema = z.object({
  matchId: z.string().min(1, "Match ID is required"),
  selection: z.string().min(1, "Selection is required"),
  market: z.string().min(1, "Market is required"),
  odds: z.number().min(1.01, "Invalid odds"),
  stake: z
    .number()
    .min(BETTING_LIMITS.MIN_STAKE, `Minimum stake is ${BETTING_LIMITS.MIN_STAKE}`)
    .max(BETTING_LIMITS.MAX_STAKE, `Maximum stake is ${BETTING_LIMITS.MAX_STAKE}`),
  confirmBet: z.boolean().optional(),
});

export type QuickBetFormData = z.infer<typeof quickBetSchema>;

// Betting preferences schema
export const bettingPreferencesSchema = z.object({
  oddsFormat: z.enum(["decimal", "fractional", "american"]),
  defaultStake: z.number().min(0, "Default stake must be positive"),
  quickBetEnabled: z.boolean(),
  autoAcceptOddsChanges: z.boolean(),
  confirmBeforePlacing: z.boolean(),
  betNotifications: z.boolean(),
  liveOddsUpdates: z.boolean(),
});

export type BettingPreferencesFormData = z.infer<typeof bettingPreferencesSchema>;
