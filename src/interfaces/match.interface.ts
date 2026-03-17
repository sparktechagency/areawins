import { IBetType } from "./betTypes.interface";
import { ISportCategories } from "./sportCategories.interface";
import { ITeam } from "./team.interface";
import { ITournament } from "./tournament.interface";

export enum MatchStatus {
  SCHEDULED = "scheduled",
  LIVE = "live",
  FINISHED = "finished",
  CANCELLED = "cancelled",
  POSTPONED = "postponed",
}

export enum MatchSource {
  MANUAL = "manual",
  API = "api",
}

export interface ILiveStatus {
  homeScore: number;
  awayScore: number;
  minute?: number;
  period?: string;
  lastUpdated: string | Date;
  additionalInfo?: {
    [key: string]: any;
  };
}

export interface IResultByBetType {
  betType: IBetType;
  winningOutcome: string;
}

export interface IFinalResult {
  homeScore: number;
  awayScore: number;
  winner?: ITeam;
  isDraw: boolean;
  resultByBetType: IResultByBetType[];
  matchDuration?: number;
  extraTime?: {
    homeScore: number;
    awayScore: number;
  };
  penalties?: {
    homeScore: number;
    awayScore: number;
    winner?: ITeam;
  };
}

export interface IMatch {
  _id: string;
  matchId: string;
  sport: ISportCategories;
  tournament?: ITournament;
  homeTeam: ITeam;
  awayTeam: ITeam;
  scheduledStartTime: string;
  status: MatchStatus;
  venue?: string;
  city?: string;
  country?: string;
  liveStatus?: ILiveStatus;
  finalResult?: IFinalResult;
  homeScore: number;
  awayScore: number;
  availableBetTypes: IBetType[];
  totalBetsCount: number;
  totalBetsAmount: number;
  isFeatured: boolean;
  isLive: boolean;
  isBettingOpen: boolean;
}

// Type aliases for backward compatibility
export type MatchInfo = IMatch;
export type TeamInfo = ITeam;
export type TournamentInfo = ITournament;

export interface MatchDetailsContentProps {
  sport: string;
  id: string;
}
