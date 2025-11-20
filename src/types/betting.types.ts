/**
 * Betting related TypeScript type definitions
 */

export type BetType = "single" | "accumulator" | "system";
export type BetStatus = "pending" | "won" | "lost" | "cancelled" | "cashed_out" | "void";
export type MarketType =
  | "match_winner"
  | "double_chance"
  | "both_teams_to_score"
  | "over_under"
  | "correct_score"
  | "handicap"
  | "first_goalscorer"
  | "total_goals"
  | "half_time_result"
  | "half_time_full_time";

export interface Bet {
  id: string;
  userId: string;
  matchId: string;
  betType: BetType;
  selection: string;
  market: MarketType;
  odds: number;
  stake: number;
  potentialWin: number;
  status: BetStatus;
  placedAt: Date;
  settledAt?: Date;
  result?: {
    homeScore?: number;
    awayScore?: number;
    winner?: string;
  };
  cashOutValue?: number;
  isCashOutAvailable: boolean;
}

export interface AccumulatorBet extends Omit<Bet, "matchId" | "selection" | "market"> {
  selections: BetSelection[];
  totalOdds: number;
}

export interface BetSelection {
  matchId: string;
  match: string;
  teams: string;
  selection: string;
  market: MarketType;
  odds: number;
  status: BetStatus;
  result?: {
    homeScore?: number;
    awayScore?: number;
  };
}

export interface PlaceBetRequest {
  matchId?: string;
  betType: BetType;
  selections: {
    matchId: string;
    selection: string;
    market: MarketType;
    odds: number;
  }[];
  stake: number;
}

export interface PlaceBetResponse {
  bet: Bet | AccumulatorBet;
  newBalance: number;
  message: string;
}

export interface CashOutRequest {
  betId: string;
}

export interface CashOutResponse {
  success: boolean;
  amount: number;
  newBalance: number;
  message: string;
}

export interface BetHistoryFilter {
  status?: BetStatus;
  betType?: BetType;
  sport?: string;
  dateFrom?: string;
  dateTo?: string;
  page?: number;
  limit?: number;
}

export interface BetHistoryResponse {
  bets: (Bet | AccumulatorBet)[];
  totalCount: number;
  page: number;
  totalPages: number;
}

export interface BettingSlipItem {
  matchId: string;
  match: string;
  teams: string;
  selection: string;
  market: MarketType;
  odds: number;
  startTime: Date;
  sport: string;
}

export interface BettingSlipState {
  items: BettingSlipItem[];
  betType: BetType;
  stake: number;
  totalOdds: number;
  potentialWin: number;
  isPlacing: boolean;
  error: string | null;
}

export interface OddsUpdate {
  matchId: string;
  market: MarketType;
  selection: string;
  oldOdds: number;
  newOdds: number;
  timestamp: Date;
}

export interface BettingLimits {
  minStake: number;
  maxStake: number;
  maxWin: number;
  maxSelectionsInAccumulator: number;
}

export interface BettingMarket {
  id: string;
  name: string;
  type: MarketType;
  matchId: string;
  selections: BettingSelection[];
  isActive: boolean;
  isSuspended: boolean;
}

export interface BettingSelection {
  id: string;
  name: string;
  odds: number;
  isActive: boolean;
  probability?: number;
}

export interface LiveBettingStatus {
  matchId: string;
  isAvailable: boolean;
  markets: BettingMarket[];
  lastUpdate: Date;
}

export interface QuickBetSettings {
  enabled: boolean;
  defaultStake: number;
  confirmBeforePlacing: boolean;
}
