import { IBetType } from "./betTypes.interface";
import { ISportCategories } from "./sportCategories.interface";
import { ITeam } from "./team.interface";
import { ITournament } from "./tournament.interface";

export enum MatchStatus {
  SCHEDULED = "scheduled",
  LIVE = "live",
  FINISHED = "finished",
  FINISHED_AET = "finished_aet",
  FINISHED_AP = "finished_ap",
  POSTPONED = "postponed",
  CANCELLED = "cancelled",
  ABANDONED = "abandoned",
  RESULT_PENDING = "result_pending",
}

export enum MatchSource {
  MANUAL = "manual",
  API = "api",
}

export interface IMatch {
  _id: string;
  apiMatchId?: string;
  apiProvider?: MatchSource;
  sport: ISportCategories;
  tournament?: ITournament;
  season?: string;
  homeTeam: ITeam;
  awayTeam: ITeam;
  scheduledStartTime: Date;
  venue?: string;
  round?: string;
  status: MatchStatus;
  apiStatus?: string;
  apiStatusLabel?: string;
  isLive: boolean;
  homeScore?: number | null;
  awayScore?: number | null;
  matchClock?: string | null;
  winner?: "home" | "away" | "draw" | null;
  availableBetTypes: IBetType[];
  isBettingOpen: boolean;
  bettingClosedAt?: Date | null;
  isResultVerified: boolean;
  resultSettledBy?: string;
  resultSettledAt?: Date;
  totalBetsCount: number;
  totalBetsAmount: number;
  isFeatured: boolean;
  createdBy?: string;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  matchName: string;
  isUpcoming: boolean;
  isFinished: boolean;
}
