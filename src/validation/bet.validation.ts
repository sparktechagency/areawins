import { z } from "zod";

export const createBetSchema = z.object({
  match: z.string().min(1, "Match is required"),
  betType: z.string().min(1, "Bet type is required"),
  selectedOutcome: z.string().min(1, "Selected outcome is required"),
  stakeAmount: z.number().min(10, "Minimum stake is 10"),
  creatorOdds: z.number().min(0, "Odds must be non-negative").optional(),
});

export const matchBetSchema = z.object({
  betId: z.string().min(1, "Bet ID is required"),
  opponentStakeAmount: z.number().min(10, "Minimum stake is 10"),
  opponentSelectedOutcome: z
    .string()
    .min(1, "Opponent selected outcome is required"),
});
