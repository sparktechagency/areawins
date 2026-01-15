import { MarketCategory } from "@/interfaces/betting.interface";

export const getOutcomeStats = (
  sport: string,
  match: { homeTeam: string; awayTeam: string }
): MarketCategory[] => {
  const sportKey = sport.toLowerCase();
  const markets: MarketCategory[] = [];

  // Match Results Market (Common for most sports)
  const hasDrawOption = [
    "football",
    "volleyball",
    "hockey",
    "handball",
    "rugby",
  ].includes(sportKey);

  markets.push({
    marketName: "Match Results",
    outcomes: hasDrawOption
      ? [
          {
            id: "home",
            label: match.homeTeam + " Win",
            icon: "🏠",
            bets: 8,
            pot: 3200,
            open: 5,
          },
          { id: "draw", label: "Draw", icon: "🤝", bets: 2, pot: 800, open: 1 },
          {
            id: "away",
            label: match.awayTeam + " Win",
            icon: "✈️",
            bets: 3,
            pot: 1100,
            open: 2,
          },
        ]
      : [
          {
            id: "home",
            label: match.homeTeam + " Win",
            icon: "🏆",
            bets: 15,
            pot: 5400,
            open: 8,
          },
          {
            id: "away",
            label: match.awayTeam + " Win",
            icon: "🏆",
            bets: 12,
            pot: 4200,
            open: 6,
          },
        ],
  });

  // Sport-Specific Markets
  switch (sportKey) {
    case "football":
      markets.push({
        marketName: "Total Goals",
        outcomes: [
          {
            id: "over25",
            label: "Over 2.5",
            icon: "⬆️",
            bets: 12,
            pot: 4500,
            open: 4,
          },
          {
            id: "under25",
            label: "Under 2.5",
            icon: "⬇️",
            bets: 7,
            pot: 2100,
            open: 3,
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
            bets: 15,
            pot: 3000,
            open: 8,
          },
          {
            id: "btts_no",
            label: "No",
            icon: "🚫",
            bets: 5,
            pot: 1000,
            open: 2,
          },
        ],
      });
      markets.push({
        marketName: "Half Time / Full Time",
        outcomes: [
          {
            id: "ht_home_ft_home",
            label: "Home/Home",
            icon: "🏠",
            bets: 6,
            pot: 1800,
            open: 3,
          },
          {
            id: "ht_draw_ft_home",
            label: "Draw/Home",
            icon: "🔄",
            bets: 4,
            pot: 1200,
            open: 2,
          },
          {
            id: "ht_away_ft_away",
            label: "Away/Away",
            icon: "✈️",
            bets: 5,
            pot: 1500,
            open: 2,
          },
        ],
      });
      break;

    case "cricket":
      markets.push({
        marketName: "Top Batsman",
        outcomes: [
          {
            id: "batsman1",
            label: "Virat Kohli",
            icon: "🏏",
            bets: 25,
            pot: 8000,
            open: 12,
          },
          {
            id: "batsman2",
            label: "Steve Smith",
            icon: "🏏",
            bets: 20,
            pot: 6500,
            open: 10,
          },
          {
            id: "batsman3",
            label: "Joe Root",
            icon: "🏏",
            bets: 15,
            pot: 4500,
            open: 7,
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
            bets: 18,
            pot: 4200,
            open: 7,
          },
          {
            id: "sixes_under",
            label: "Under 12.5",
            icon: "📉",
            bets: 9,
            pot: 1800,
            open: 4,
          },
        ],
      });
      markets.push({
        marketName: "Top Bowler",
        outcomes: [
          {
            id: "bowler1",
            label: "Jasprit Bumrah",
            icon: "🎯",
            bets: 20,
            pot: 5500,
            open: 9,
          },
          {
            id: "bowler2",
            label: "Pat Cummins",
            icon: "🎯",
            bets: 18,
            pot: 4800,
            open: 8,
          },
        ],
      });
      break;

    case "basketball":
      markets.push({
        marketName: "Total Points",
        outcomes: [
          {
            id: "points_over",
            label: "Over 210.5",
            icon: "🏀",
            bets: 30,
            pot: 12000,
            open: 15,
          },
          {
            id: "points_under",
            label: "Under 210.5",
            icon: "🏀",
            bets: 25,
            pot: 9500,
            open: 10,
          },
        ],
      });
      markets.push({
        marketName: "Point Spread",
        outcomes: [
          {
            id: "spread_home",
            label: match.homeTeam + " -5.5",
            icon: "📊",
            bets: 18,
            pot: 6000,
            open: 8,
          },
          {
            id: "spread_away",
            label: match.awayTeam + " +5.5",
            icon: "📊",
            bets: 16,
            pot: 5200,
            open: 7,
          },
        ],
      });
      markets.push({
        marketName: "First Quarter Winner",
        outcomes: [
          {
            id: "q1_home",
            label: match.homeTeam,
            icon: "1️⃣",
            bets: 12,
            pot: 3500,
            open: 5,
          },
          {
            id: "q1_away",
            label: match.awayTeam,
            icon: "1️⃣",
            bets: 10,
            pot: 2800,
            open: 4,
          },
        ],
      });
      break;

    case "tennis":
      markets.push({
        marketName: "Set Winner",
        outcomes: [
          {
            id: "set1_home",
            label: match.homeTeam + " Set 1",
            icon: "🎾",
            bets: 15,
            pot: 4500,
            open: 6,
          },
          {
            id: "set1_away",
            label: match.awayTeam + " Set 1",
            icon: "🎾",
            bets: 12,
            pot: 3600,
            open: 5,
          },
        ],
      });
      markets.push({
        marketName: "Total Games",
        outcomes: [
          {
            id: "games_over",
            label: "Over 22.5",
            icon: "⬆️",
            bets: 20,
            pot: 6000,
            open: 8,
          },
          {
            id: "games_under",
            label: "Under 22.5",
            icon: "⬇️",
            bets: 15,
            pot: 4500,
            open: 6,
          },
        ],
      });
      break;

    case "volleyball":
      markets.push({
        marketName: "Total Sets",
        outcomes: [
          {
            id: "sets_over",
            label: "Over 3.5",
            icon: "🏐",
            bets: 14,
            pot: 3800,
            open: 6,
          },
          {
            id: "sets_under",
            label: "Under 3.5",
            icon: "🏐",
            bets: 10,
            pot: 2600,
            open: 4,
          },
        ],
      });
      markets.push({
        marketName: "First Set Winner",
        outcomes: [
          {
            id: "set1_home",
            label: match.homeTeam,
            icon: "1️⃣",
            bets: 12,
            pot: 3200,
            open: 5,
          },
          {
            id: "set1_away",
            label: match.awayTeam,
            icon: "1️⃣",
            bets: 9,
            pot: 2400,
            open: 4,
          },
        ],
      });
      break;

    case "baseball":
      markets.push({
        marketName: "Total Runs",
        outcomes: [
          {
            id: "runs_over",
            label: "Over 8.5",
            icon: "⚾",
            bets: 22,
            pot: 7000,
            open: 10,
          },
          {
            id: "runs_under",
            label: "Under 8.5",
            icon: "⚾",
            bets: 18,
            pot: 5500,
            open: 8,
          },
        ],
      });
      markets.push({
        marketName: "Run Line",
        outcomes: [
          {
            id: "runline_home",
            label: match.homeTeam + " -1.5",
            icon: "📊",
            bets: 15,
            pot: 4200,
            open: 6,
          },
          {
            id: "runline_away",
            label: match.awayTeam + " +1.5",
            icon: "📊",
            bets: 13,
            pot: 3600,
            open: 5,
          },
        ],
      });
      break;

    case "hockey":
      markets.push({
        marketName: "Total Goals",
        outcomes: [
          {
            id: "goals_over",
            label: "Over 5.5",
            icon: "🏒",
            bets: 16,
            pot: 4800,
            open: 7,
          },
          {
            id: "goals_under",
            label: "Under 5.5",
            icon: "🏒",
            bets: 12,
            pot: 3400,
            open: 5,
          },
        ],
      });
      markets.push({
        marketName: "Puck Line",
        outcomes: [
          {
            id: "puck_home",
            label: match.homeTeam + " -1.5",
            icon: "🥅",
            bets: 14,
            pot: 3800,
            open: 6,
          },
          {
            id: "puck_away",
            label: match.awayTeam + " +1.5",
            icon: "🥅",
            bets: 11,
            pot: 3000,
            open: 5,
          },
        ],
      });
      break;

    case "boxing":
    case "mma":
      markets.push({
        marketName: "Method of Victory",
        outcomes: [
          {
            id: "ko",
            label: "KO/TKO",
            icon: "🥊",
            bets: 20,
            pot: 6500,
            open: 9,
          },
          {
            id: "decision",
            label: "Decision",
            icon: "⚖️",
            bets: 15,
            pot: 4500,
            open: 6,
          },
          {
            id: "submission",
            label: "Submission",
            icon: "🔒",
            bets: 10,
            pot: 3000,
            open: 4,
          },
        ],
      });
      markets.push({
        marketName: "Total Rounds",
        outcomes: [
          {
            id: "rounds_over",
            label: "Over 2.5",
            icon: "⏱️",
            bets: 18,
            pot: 5200,
            open: 7,
          },
          {
            id: "rounds_under",
            label: "Under 2.5",
            icon: "⏱️",
            bets: 14,
            pot: 3800,
            open: 5,
          },
        ],
      });
      break;

    case "rugby":
      markets.push({
        marketName: "Total Points",
        outcomes: [
          {
            id: "points_over",
            label: "Over 45.5",
            icon: "🏉",
            bets: 16,
            pot: 4600,
            open: 7,
          },
          {
            id: "points_under",
            label: "Under 45.5",
            icon: "🏉",
            bets: 13,
            pot: 3700,
            open: 5,
          },
        ],
      });
      markets.push({
        marketName: "First Try Scorer",
        outcomes: [
          {
            id: "try_player1",
            label: "Player A",
            icon: "🎯",
            bets: 12,
            pot: 3400,
            open: 5,
          },
          {
            id: "try_player2",
            label: "Player B",
            icon: "🎯",
            bets: 10,
            pot: 2800,
            open: 4,
          },
        ],
      });
      break;

    case "american-football":
      markets.push({
        marketName: "Total Points",
        outcomes: [
          {
            id: "points_over",
            label: "Over 47.5",
            icon: "🏈",
            bets: 28,
            pot: 9500,
            open: 12,
          },
          {
            id: "points_under",
            label: "Under 47.5",
            icon: "🏈",
            bets: 22,
            pot: 7200,
            open: 9,
          },
        ],
      });
      markets.push({
        marketName: "Point Spread",
        outcomes: [
          {
            id: "spread_home",
            label: match.homeTeam + " -7.5",
            icon: "📊",
            bets: 20,
            pot: 6800,
            open: 8,
          },
          {
            id: "spread_away",
            label: match.awayTeam + " +7.5",
            icon: "📊",
            bets: 18,
            pot: 5900,
            open: 7,
          },
        ],
      });
      break;

    case "badminton":
    case "table-tennis":
      markets.push({
        marketName: "Total Games",
        outcomes: [
          {
            id: "games_over",
            label: "Over 2.5",
            icon: "🏸",
            bets: 14,
            pot: 3900,
            open: 6,
          },
          {
            id: "games_under",
            label: "Under 2.5",
            icon: "🏸",
            bets: 11,
            pot: 3100,
            open: 5,
          },
        ],
      });
      markets.push({
        marketName: "First Game Winner",
        outcomes: [
          {
            id: "game1_home",
            label: match.homeTeam,
            icon: "1️⃣",
            bets: 12,
            pot: 3300,
            open: 5,
          },
          {
            id: "game1_away",
            label: match.awayTeam,
            icon: "1️⃣",
            bets: 10,
            pot: 2700,
            open: 4,
          },
        ],
      });
      break;

    case "handball":
      markets.push({
        marketName: "Total Goals",
        outcomes: [
          {
            id: "goals_over",
            label: "Over 52.5",
            icon: "🤾",
            bets: 15,
            pot: 4200,
            open: 6,
          },
          {
            id: "goals_under",
            label: "Under 52.5",
            icon: "🤾",
            bets: 12,
            pot: 3400,
            open: 5,
          },
        ],
      });
      markets.push({
        marketName: "Handicap",
        outcomes: [
          {
            id: "hcp_home",
            label: match.homeTeam + " -3.5",
            icon: "🎯",
            bets: 13,
            pot: 3600,
            open: 5,
          },
          {
            id: "hcp_away",
            label: match.awayTeam + " +3.5",
            icon: "🎯",
            bets: 11,
            pot: 3000,
            open: 4,
          },
        ],
      });
      break;

    case "golf":
      markets.push({
        marketName: "Tournament Winner",
        outcomes: [
          {
            id: "player1",
            label: "Player A",
            icon: "⛳",
            bets: 18,
            pot: 5400,
            open: 8,
          },
          {
            id: "player2",
            label: "Player B",
            icon: "⛳",
            bets: 15,
            pot: 4500,
            open: 6,
          },
          {
            id: "player3",
            label: "Player C",
            icon: "⛳",
            bets: 12,
            pot: 3600,
            open: 5,
          },
        ],
      });
      markets.push({
        marketName: "Top 5 Finish",
        outcomes: [
          {
            id: "top5_yes",
            label: "Yes",
            icon: "🏆",
            bets: 20,
            pot: 6000,
            open: 9,
          },
          {
            id: "top5_no",
            label: "No",
            icon: "❌",
            bets: 10,
            pot: 3000,
            open: 4,
          },
        ],
      });
      break;

    default:
      // Generic markets for any other sport
      markets.push({
        marketName: "Over/Under",
        outcomes: [
          {
            id: "over",
            label: "Over",
            icon: "⬆️",
            bets: 15,
            pot: 4500,
            open: 6,
          },
          {
            id: "under",
            label: "Under",
            icon: "⬇️",
            bets: 12,
            pot: 3600,
            open: 5,
          },
        ],
      });
      break;
  }

  return markets;
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
