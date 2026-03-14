import { ISportCategories } from "./sportCategories.interface";

export interface IOutcome {
  outcomeId?: string;
  label: string
}

export interface IBetType {
  _id: string;
  sport: ISportCategories;
  name: string;
  slug: string;
  description?: string;
  outcomes: IOutcome[];
}
