import { ISportCategories } from "./sportCategories.interface";

export enum TournamentType {
  LEAGUE = "league",
  TOURNAMENT = "tournament",
  CUP = "cup",
  INTERNATIONAL = "international",
  GRAND_SLAM = "grand-slam",
  OTHER = "other",
}

export interface ITournament {
  _id: string;
  name: string;
  slug: string;
  sport: ISportCategories;
  type?: TournamentType;
  description?: string;
  startDate?: Date;
  endDate?: Date;
  year?: string;
  country?: string;
  logo?: string;
  gender?: string;
  isFeatured: boolean;
}
