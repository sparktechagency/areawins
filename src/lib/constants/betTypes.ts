import { MarketType } from "@/types/betting.types";

export const BET_TYPES = {
  SINGLE: "single",
  ACCUMULATOR: "accumulator",
  SYSTEM: "system",
} as const;

export const BET_STATUS = {
  PENDING: "pending",
  WON: "won",
  LOST: "lost",
  CANCELLED: "cancelled",
  CASHED_OUT: "cashed_out",
  VOID: "void",
} as const;

export const MARKET_TYPES: { value: MarketType; label: string; description: string }[] = [
  {
    value: "match_winner",
    label: "Match Winner (1X2)",
    description: "Bet on the outcome of the match",
  },
  {
    value: "double_chance",
    label: "Double Chance",
    description: "Cover two of the three possible outcomes",
  },
  {
    value: "both_teams_to_score",
    label: "Both Teams to Score",
    description: "Will both teams score in the match?",
  },
  {
    value: "over_under",
    label: "Over/Under Goals",
    description: "Will the total goals be over or under a certain number?",
  },
  {
    value: "correct_score",
    label: "Correct Score",
    description: "Predict the exact final score",
  },
  {
    value: "handicap",
    label: "Asian Handicap",
    description: "Bet with a handicap advantage/disadvantage",
  },
  {
    value: "first_goalscorer",
    label: "First Goalscorer",
    description: "Who will score the first goal?",
  },
  {
    value: "total_goals",
    label: "Total Goals",
    description: "How many goals will be scored?",
  },
  {
    value: "half_time_result",
    label: "Half Time Result",
    description: "What will the result be at half time?",
  },
  {
    value: "half_time_full_time",
    label: "Half Time / Full Time",
    description: "Predict both half time and full time results",
  },
];

export const BETTING_LIMITS = {
  MIN_STAKE: 1,
  MAX_STAKE: 10000,
  MAX_WIN: 100000,
  MAX_ACCUMULATOR_SELECTIONS: 20,
  MIN_ACCUMULATOR_ODDS: 1.01,
  MAX_ACCUMULATOR_ODDS: 1000,
} as const;

export const BET_STATUS_LABELS: Record<string, string> = {
  pending: "Pending",
  won: "Won",
  lost: "Lost",
  cancelled: "Cancelled",
  cashed_out: "Cashed Out",
  void: "Void",
};

export const BET_STATUS_COLORS: Record<string, string> = {
  pending: "text-yellow-600 bg-yellow-50",
  won: "text-green-600 bg-green-50",
  lost: "text-gray-600 bg-gray-50",
  cancelled: "text-red-600 bg-red-50",
  cashed_out: "text-blue-600 bg-blue-50",
  void: "text-gray-400 bg-gray-100",
};

export const ODDS_FORMAT = {
  DECIMAL: "decimal",
  FRACTIONAL: "fractional",
  AMERICAN: "american",
} as const;

export const QUICK_BET_STAKES = [5, 10, 20, 50, 100, 200, 500];
