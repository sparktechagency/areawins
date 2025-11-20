/**
 * Match, team, tournament, and sports related TypeScript type definitions
 */

import { BettingMarket, MarketType } from "./betting.types";

export type MatchStatus = "upcoming" | "live" | "finished" | "postponed" | "cancelled";
export type SportType = "football" | "cricket" | "basketball" | "volleyball" | "baseball" | "tennis" | "boxing";

export interface Team {
  id: string;
  name: string;
  shortName: string;
  logo: string;
  country: string;
  founded?: number;
  stadium?: string;
  rating?: number;
}

export interface Match {
  id: string;
  homeTeam: Team;
  awayTeam: Team;
  sport: SportType;
  tournament: Tournament;
  startTime: Date;
  status: MatchStatus;
  venue?: string;
  round?: string;
  score?: MatchScore;
  odds: MatchOdds;
  markets: BettingMarket[];
  stats?: MatchStatistics;
  isLive: boolean;
  isFeatured: boolean;
  isSpecialBet: boolean;
  liveData?: LiveMatchData;
}

export interface MatchScore {
  home: number;
  away: number;
  halfTime?: {
    home: number;
    away: number;
  };
  penalties?: {
    home: number;
    away: number;
  };
}

export interface MatchOdds {
  "1": number; // Home win
  "X": number; // Draw
  "2": number; // Away win
  "1X"?: number; // Double chance: home or draw
  "12"?: number; // Double chance: home or away
  "X2"?: number; // Double chance: draw or away
  overUnder?: {
    over: number;
    under: number;
    line: number;
  };
  bothTeamsToScore?: {
    yes: number;
    no: number;
  };
  handicap?: {
    home: number;
    away: number;
    line: number;
  };
}

export interface LiveMatchData {
  minute: number;
  period: string; // "1st Half", "2nd Half", "Half Time", etc.
  possession?: {
    home: number;
    away: number;
  };
  corners?: {
    home: number;
    away: number;
  };
  yellowCards?: {
    home: number;
    away: number;
  };
  redCards?: {
    home: number;
    away: number;
  };
  shots?: {
    home: number;
    away: number;
  };
  shotsOnTarget?: {
    home: number;
    away: number;
  };
}

export interface MatchStatistics {
  homeWins: number;
  draws: number;
  awayWins: number;
  totalMatches: number;
  averageGoalsHome: number;
  averageGoalsAway: number;
  lastMatches: {
    homeForm: string[]; // ["W", "L", "D", "W", "W"]
    awayForm: string[];
  };
  headToHead: HeadToHead[];
}

export interface HeadToHead {
  date: Date;
  homeTeam: string;
  awayTeam: string;
  score: {
    home: number;
    away: number;
  };
  competition: string;
}

export interface Tournament {
  id: string;
  name: string;
  shortName: string;
  country: string;
  logo: string;
  sport: SportType;
  season: string;
  isPremium: boolean;
  ranking?: number;
}

export interface MatchFilter {
  sport?: SportType;
  status?: MatchStatus;
  tournamentId?: string;
  teamId?: string;
  dateFrom?: string;
  dateTo?: string;
  isLive?: boolean;
  isFeatured?: boolean;
  page?: number;
  limit?: number;
}

export interface MatchesResponse {
  matches: Match[];
  totalCount: number;
  page: number;
  totalPages: number;
}

export interface TournamentStandings {
  tournamentId: string;
  season: string;
  standings: StandingEntry[];
  lastUpdated: Date;
}

export interface StandingEntry {
  position: number;
  team: Team;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
  form: string[]; // ["W", "L", "D", "W", "W"]
}

export interface MatchEvent {
  id: string;
  matchId: string;
  type: "goal" | "yellow_card" | "red_card" | "substitution" | "penalty" | "var";
  team: "home" | "away";
  player: string;
  minute: number;
  description: string;
}

export interface LiveMatchUpdate {
  matchId: string;
  score?: MatchScore;
  minute?: number;
  period?: string;
  events?: MatchEvent[];
  odds?: MatchOdds;
  stats?: LiveMatchData;
  timestamp: Date;
}

export interface SportCategory {
  id: SportType;
  name: string;
  icon: string;
  activeMatches: number;
  upcomingMatches: number;
}

export interface FavoriteMatch {
  id: string;
  matchId: string;
  userId: string;
  addedAt: Date;
  match: Match;
}

export interface FavoriteTeam {
  id: string;
  teamId: string;
  userId: string;
  addedAt: Date;
  team: Team;
}
