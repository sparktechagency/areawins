import { MarketCategory } from "@/interfaces/betting.interface";

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

  if (sportKey === "cricket") {
    commonMarkets.push({
      marketName: "Team Top Batsman",
      outcomes: [
        { label: "Virat Kohli", bets: 25, pot: 10000, open: 10, icon: "🏏" },
        { label: "Rohit Sharma", bets: 18, pot: 7000, open: 5, icon: "🏏" },
      ],
    });
  }

  return commonMarkets;
};

export const MOCK_MATCH = {
  homeTeam: "Chelsea",
  awayTeam: "Arsenal",
  league: "Premier League",
  venue: "Stamford Bridge",
  time: "Live 67'",
  score: { home: 1, away: 0 },
  date: "14 Jan 2026",
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
      selection: "Chelsea Win",
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
