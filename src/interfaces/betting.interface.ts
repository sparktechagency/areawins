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
