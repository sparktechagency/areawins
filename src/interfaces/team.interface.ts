import { ITournament } from "./tournament.interface";
import { ISportCategories } from "./sportCategories.interface";

export interface ITeam {
  _id: string;
  key?: string;
  name: string;
  slug: string;
  shortName: string;
  logo?: string;
  badge?: string;
  gender?: string;
  icon?: string;
  sport: ISportCategories;
  tournament?: ITournament;
  country?: string;
  foundedYear?: number;
  isDeleted: boolean;
}
