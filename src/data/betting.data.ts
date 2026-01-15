import { MarketCategory } from "@/interfaces/betting.interface";

import { getOutcomeStats } from "./match-details.data";

export const getBetOutcomesByMarket = (
  sport: string,
  match: {
    homeTeam: string;
    awayTeam: string;
  }
): MarketCategory[] => {
  return getOutcomeStats(sport, match);
};

export const MOCK_RECENT_BETS = [
  {
    id: "1",
    date: "Oct 24, 18:30",
    event: "Man City vs Arsenal",
    market: "Match Winner - Man City",
    stake: 500,
    odds: 1.85,
    return: 925,
    status: "Won",
  },
  {
    id: "2",
    date: "Oct 25, 20:45",
    event: "Real Madrid vs Barcelona",
    market: "Both Teams to Score - Yes",
    stake: 1000,
    odds: 1.6,
    return: 1600,
    status: "Pending",
  },
];
