export interface OutcomeInfo {
  outcomeId: string;
  label: string;
  displayOrder: number;
}

export interface BetTypeInfo {
  _id: string;
  betTypeId: string;
  sport: string; // ObjectId Reference
  name: string;
  slug: string;
  outcomes: OutcomeInfo[];
  isDefault: boolean;
  displayOrder: number;
  isActive: boolean;
  createdAt: string;
}

export interface BetInfo {
  _id: string;
  betId: string;
  match: string; // ObjectId Reference
  betType: string; // ObjectId Reference
  creator: string; // ObjectId User
  selectedOutcome: string;
  stakeAmount: number;
  creatorOdds?: number;
  status: "open" | "matched" | "cancelled" | "settled" | "refunded";
  matchedWith?: string; // ObjectId Reference to another Bet
  opponent?: string; // ObjectId User
  matchedAt?: string;
  oppositeOutcome?: string;
  oppositeStakeAmount?: number;
  totalPot?: number;
  winnerUser?: string; // ObjectId User
  winnerPayout?: number;
  loserUser?: string; // ObjectId User
  platformCommission?: number;
  commissionRate: number;
  settledAt?: string;
  isReferralBet: boolean;
  referralUser?: string; // ObjectId User
  createdAt: string;
  expiresAt?: string;
  updatedAt: string;
}

// For frontend UI components
export interface UserTrust {
  name: string;
  avatar: string;
  trust: number;
  timeAgo: string;
}

export interface P2PBet {
  type: "BACKING" | "LAYING";
  selection: string;
  stake: number;
  potentialWin: number;
}

export interface OutcomeStat {
  id: string;
  label: string;

  icon: string;
  bets: number;
  pot: number;
  open: number;
}

export interface MarketCategory {
  marketName: string;
  outcomes: OutcomeStat[];
}

export interface CreateBetModalProps {
  isOpen: boolean;
  onClose: () => void;
  match: {
    homeTeam: string;
    awayTeam: string;
    sport: string;
  };

  selectedOutcome?: string | null;
  marketName?: string | null;
}

export interface MatchedBetCardProps {
  user: UserTrust;
  bet: P2PBet;
}

export interface RecentBet {
  id: string;
  date: string;
  event: string;
  market: string;
  stake: number;
  odds: number;
  return: number;
  status: string;
}
