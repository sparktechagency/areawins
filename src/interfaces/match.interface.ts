export interface MatchDetailsContentProps {
  sport: string;
  id: string;
}

export interface MatchInfo {
  id: string;
  homeTeam: string;
  awayTeam: string;
  league: string;
  venue: string;
  time: string;
  score: {
    home: number;
    away: number;
  };
  date: string;
}

export interface SportMatch {
  id: string;
  homeTeam: string;
  awayTeam: string;
  date: string;
  time: string;
  league: string;
  isLive: boolean;
  score?: { home: number | string; away: number | string; time?: string };
  sport: "football" | "cricket" | "basketball" | "volleyball";
  p2pStats?: {
    activeBets: number;
    potAmount: number;
    openBets: number;
    popularOutcome?: string;
  };
}

export interface SportMatchCardProps {
  match: SportMatch;
}
