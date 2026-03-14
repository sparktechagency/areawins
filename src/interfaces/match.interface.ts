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
  betType: string; // ObjectId as string in frontend
  winningOutcome: string;
  odds?: number;
}

export interface IFinalResult {
  homeScore: number;
  awayScore: number;
  winner?: string; // ObjectId as string in frontend
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
    winner?: string; // ObjectId as string in frontend
  };
}

export interface IMatch {
  _id: string;
  matchId: string;
  apiMatchId?: string;
  apiProvider?: string;
  sport: ISportCategories;
  tournament?: ITournament;
  season?: string;
  homeTeam: ITeam;
  awayTeam: ITeam;
  scheduledStartTime: string | Date;
  status: MatchStatus;
  strTimestamp?: string;
  dateEventLocal?: string;
  strTimeLocal?: string;
  strPostponed?: string;
  source: MatchSource;
  apiStatus?: string;
  apiStatusLabel?: string;
  venue?: string;
  city?: string;
  country?: string;
  round?: string;
  weather?: {
    temperature?: number;
    condition?: string;
    humidity?: number;
  };
  liveStatus?: ILiveStatus;
  finalResult?: IFinalResult;
  homeScore?: number;
  awayScore?: number;
  isResultVerified: boolean;
  resultSettledBy?: string; // ObjectId as string in frontend
  resultSettledAt?: string | Date;
  availableBetTypes: (IBetType | string)[]; // Can be populated or ObjectId
  totalBetsCount: number;
  totalBetsAmount?: number;
  isFeatured: boolean;
  isLive: boolean;
  priority?: number;
  externalUpdatedAt?: string | Date | null;
  isBettingOpen: boolean;
  bettingClosedAt?: string | Date | null;
  syncError?: string | null;
  syncAttempts: number;
  isDeleted: boolean;
  createdBy?: string; // ObjectId as string in frontend
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

// Simplified interface for frontend display when data is populated
export interface IMatchPopulated {
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
