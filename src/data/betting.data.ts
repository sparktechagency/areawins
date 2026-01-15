import { MarketCategory } from "@/interfaces/betting.interface";

export const getBetOutcomesByMarket = (
  sport: string,
  match: {
    homeTeam: string;
    awayTeam: string;
  }
): MarketCategory[] => {
  const sportKey = sport.toLowerCase();

  const markets: MarketCategory[] = [];

  // Match Results Market
  markets.push({
    marketName: "Match Results",
    outcomes:
      sportKey === "football" || sportKey === "volleyball"
        ? [
            {
              id: "home",
              label: match.homeTeam + " Win",
              icon: "🏠",
              bets: 5,
              pot: 1200,
              open: 2,
            },
            {
              id: "draw",
              label: "Draw",
              icon: "🤝",
              bets: 2,
              pot: 500,
              open: 1,
            },
            {
              id: "away",
              label: match.awayTeam + " Win",
              icon: "✈️",
              bets: 3,
              pot: 800,
              open: 1,
            },
          ]
        : [
            {
              id: "home",
              label: match.homeTeam + " Win",
              icon: "🏆",
              bets: 8,
              pot: 2500,
              open: 3,
            },
            {
              id: "away",
              label: match.awayTeam + " Win",
              icon: "🏆",
              bets: 6,
              pot: 1800,
              open: 2,
            },
          ],
  });

  // Sport Specific Markets
  if (sportKey === "football") {
    markets.push({
      marketName: "Total Goals",
      outcomes: [
        {
          id: "over25",
          label: "Over 2.5",
          icon: "⬆️",
          bets: 10,
          pot: 2000,
          open: 4,
        },
        {
          id: "under25",
          label: "Under 2.5",
          icon: "⬇️",
          bets: 4,
          pot: 900,
          open: 2,
        },
      ],
    });
    markets.push({
      marketName: "Both Teams to Score",
      outcomes: [
        {
          id: "btts_yes",
          label: "Yes",
          icon: "🥅",
          bets: 7,
          pot: 1500,
          open: 3,
        },
        { id: "btts_no", label: "No", icon: "🚫", bets: 3, pot: 600, open: 1 },
      ],
    });
  } else if (sportKey === "cricket") {
    markets.push({
      marketName: "Top Batsman",
      outcomes: [
        {
          id: "batsman1",
          label: "Virat Kohli",
          icon: "🏏",
          bets: 12,
          pot: 3500,
          open: 5,
        },
        {
          id: "batsman2",
          label: "Steve Smith",
          icon: "🏏",
          bets: 10,
          pot: 2800,
          open: 4,
        },
      ],
    });
    markets.push({
      marketName: "Total Sixes",
      outcomes: [
        {
          id: "sixes_over",
          label: "Over 12.5",
          icon: "💥",
          bets: 15,
          pot: 4000,
          open: 6,
        },
        {
          id: "sixes_under",
          label: "Under 12.5",
          icon: "📉",
          bets: 8,
          pot: 2200,
          open: 3,
        },
      ],
    });
  } else if (sportKey === "basketball") {
    markets.push({
      marketName: "Total Points",
      outcomes: [
        {
          id: "points_over",
          label: "Over 210.5",
          icon: "🏀",
          bets: 20,
          pot: 5000,
          open: 8,
        },
        {
          id: "points_under",
          label: "Under 210.5",
          icon: "🏀",
          bets: 15,
          pot: 3800,
          open: 5,
        },
      ],
    });
  }

  return markets;
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
