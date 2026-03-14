import { SportCategory } from "@/types";
import { IBetType } from "./betTypes.interface";
import { ITeam } from "./team.interface";
import { ITournament } from "./tournament.interface";

export enum MatchStatus {
  SCHEDULED = "scheduled",
  LIVE = "live",
  FINISHED = "finished",
  CANCELLED = "cancelled",
  POSTPONED = "postponed",
}

export interface IMatch {
  _id: string;
  sport: string | SportCategory;
  tournament?: string | ITournament;
  homeTeam: string | ITeam;
  awayTeam: string | ITeam;
  session: string;
  scheduledStartTime: string;
  actualStartTime?: string;
  status: MatchStatus;
  venue?: string;
  city?: string;
  country?: string;
  homeScore: number;
  awayScore: number;
  liveStatus: {
    homeScore: number;
    awayScore: number;
    lastUpdated: string;
  };
  finalResult: {
    isDraw: boolean;
  };
  availableBetTypes: IBetType[];
  totalBetsCount: number;
  totalBetsAmount: number;
  isFeatured: boolean;
  isLive: boolean;
}
