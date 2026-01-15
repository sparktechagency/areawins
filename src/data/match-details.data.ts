import { MarketCategory } from "@/interfaces/betting.interface";
import {
  MatchInfo,
  SportInfo,
  TeamInfo,
  TournamentInfo,
} from "@/interfaces/match.interface";

export const getOutcomeStats = (
  sport: string,
  match: { homeTeam: string; awayTeam: string }
): MarketCategory[] => {
  const sportKey = sport.toLowerCase();

  const commonMarkets: MarketCategory[] = [
    {
      marketName: "Match Results",
      outcomes:
        sportKey === "football"
          ? [
              {
                label: match.homeTeam + " Win",
                bets: 8,
                pot: 3200,
                open: 5,
                icon: "⚽",
              },
              { label: "Draw", bets: 2, pot: 800, open: 1, icon: "🤝" },
              {
                label: match.awayTeam + " Win",
                bets: 3,
                pot: 1100,
                open: 2,
                icon: "⚽",
              },
            ]
          : [
              {
                label: match.homeTeam + " Win",
                bets: 15,
                pot: 5400,
                open: 8,
                icon: "🏆",
              },
              {
                label: match.awayTeam + " Win",
                bets: 12,
                pot: 4200,
                open: 6,
                icon: "🏆",
              },
            ],
    },
    {
      marketName: "Total Goals / Points (Over/Under)",
      outcomes: [
        { label: "Over 2.5", bets: 12, pot: 4500, open: 4, icon: "⬆️" },
        { label: "Under 2.5", bets: 7, pot: 2100, open: 3, icon: "⬇️" },
      ],
    },
    {
      marketName: "Handicap",
      outcomes: [
        {
          label: match.homeTeam + " -1.5",
          bets: 4,
          pot: 1200,
          open: 2,
          icon: "🎯",
        },
        {
          label: match.awayTeam + " +1.5",
          bets: 6,
          pot: 1800,
          open: 3,
          icon: "🎯",
        },
      ],
    },
  ];

  if (sportKey === "football") {
    commonMarkets.push({
      marketName: "Both Teams to Score",
      outcomes: [
        { label: "Yes", bets: 15, pot: 3000, open: 8, icon: "🥅" },
        { label: "No", bets: 5, pot: 1000, open: 2, icon: "🚫" },
      ],
    });
  }

  return commonMarkets;
};

const MOCK_SPORT: SportInfo = {
  _id: "s1",
  sportId: "SPORT-001",
  name: "Football",
  slug: "football",
  icon: "⚽",
  displayOrder: 1,
  isActive: true,
};

const MOCK_HOME_TEAM: TeamInfo = {
  _id: "t1",
  teamId: "TEAM-001",
  name: "Barcelona",
  shortName: "BAR",
  slug: "barcelona",
  sport: "s1",
  country: "ES",
  isActive: true,
};

const MOCK_AWAY_TEAM: TeamInfo = {
  _id: "t2",
  teamId: "TEAM-002",
  name: "Real Madrid",
  shortName: "RMA",
  slug: "real-madrid",
  sport: "s1",
  country: "ES",
  isActive: true,
};

const MOCK_TOURNAMENT: TournamentInfo = {
  _id: "tr1",
  tournamentId: "TRN-001",
  name: "La Liga",
  slug: "la-liga",
  sport: "s1",
  type: "league",
  isFeatured: true,
  displayOrder: 1,
  isActive: true,
};

export const MOCK_MATCH: MatchInfo = {
  _id: "m1",
  matchId: "MATCH-101",
  sport: MOCK_SPORT,
  tournament: MOCK_TOURNAMENT,
  homeTeam: MOCK_HOME_TEAM,
  awayTeam: MOCK_AWAY_TEAM,
  scheduledStartTime: "2024-03-24T20:00:00Z",
  status: "live",
  source: "manual",
  availableBetTypes: ["bt1"],
  liveStatus: {
    homeScore: 2,
    awayScore: 1,
    minute: 65,
    period: "Second Half",
    lastUpdated: new Date().toISOString(),
  },
  isResultVerified: false,
  totalBetsCount: 15,
  isFeatured: true,
  createdBy: "admin",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  venue: "Camp Nou",
  city: "Barcelona",
  country: "ES",
};

export const MOCK_MATCHED_BETS = [
  {
    user: {
      name: "MadridistaKing",
      avatar: "https://i.pravatar.cc/150?u=1",
      trust: 98,
      timeAgo: "2m ago",
    },
    bet: {
      type: "BACKING" as const,
      selection: "Barcelona Win",
      stake: 50.0,
      potentialWin: 125.0,
    },
  },
  {
    user: {
      name: "BetMaster99",
      avatar: "https://i.pravatar.cc/150?u=3",
      trust: 89,
      timeAgo: "1h ago",
    },
    bet: {
      type: "BACKING" as const,
      selection: "Draw",
      stake: 100.0,
      potentialWin: 185.0,
    },
  },
];
