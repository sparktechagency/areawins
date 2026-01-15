import { RecentBet } from "@/interfaces/betting.interface";

export const getBetOutcomesByMarket = (match: {
  homeTeam: string;
  awayTeam: string;
}) => [
  {
    marketName: "Match Results",
    outcomes: [
      { id: "home", label: match.homeTeam + " Win", icon: "🏠" },
      { id: "draw", label: "Draw", icon: "🤝" },
      { id: "away", label: match.awayTeam + " Win", icon: "✈️" },
    ],
  },
  {
    marketName: "Over/Under",
    outcomes: [
      { id: "over25", label: "Over 2.5 Goals", icon: "⬆️" },
      { id: "under25", label: "Under 2.5 Goals", icon: "⬇️" },
    ],
  },
  {
    marketName: "Handicap",
    outcomes: [
      { id: "hcap_home", label: match.homeTeam + " -1.5", icon: "🎯" },
      { id: "hcap_away", label: match.awayTeam + " +1.5", icon: "🎯" },
    ],
  },
];

export const MOCK_RECENT_BETS: RecentBet[] = [
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
