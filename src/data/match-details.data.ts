import { MarketCategory } from "@/interfaces/betting.interface";

export const getOutcomeStats = (
  sport: string,
  match: { homeTeam: string; awayTeam: string }
): MarketCategory[] => {
  const sportKey = sport.toLowerCase();
  const markets: MarketCategory[] = [];

  // 1. Match Winner / Match Result Market (Base Market)
  const drawSports = [
    "football",
    "soccer",
    "ice hockey",
    "hockey",
    "rugby",
    "handball",
  ];
  const isDrawSport = drawSports.includes(sportKey);

  markets.push({
    marketName: isDrawSport ? "Match Result" : "Match Winner",
    outcomes: isDrawSport
      ? [
          {
            id: "home",
            label: match.homeTeam + " Win",
            icon: "🏠",
            bets: 12,
            pot: 3200,
            open: 5,
          },
          { id: "draw", label: "Draw", icon: "🤝", bets: 5, pot: 800, open: 2 },
          {
            id: "away",
            label: match.awayTeam + " Win",
            icon: "✈️",
            bets: 8,
            pot: 1100,
            open: 3,
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

  // 2. Sport-Specific Markets
  switch (sportKey) {
    case "football":
    case "soccer":
      markets.push(
        {
          marketName: "Both Teams to Score",
          outcomes: [
            {
              id: "btts_yes",
              label: "Yes",
              icon: "✅",
              bets: 20,
              pot: 2500,
              open: 8,
            },
            {
              id: "btts_no",
              label: "No",
              icon: "❌",
              bets: 15,
              pot: 1800,
              open: 6,
            },
          ],
        },
        {
          marketName: "Over/Under Goals",
          outcomes: [
            {
              id: "over25",
              label: "Over 2.5",
              icon: "⬆️",
              bets: 18,
              pot: 3000,
              open: 7,
            },
            {
              id: "under25",
              label: "Under 2.5",
              icon: "⬇️",
              bets: 14,
              pot: 2200,
              open: 5,
            },
          ],
        },
        {
          marketName: "Correct Score",
          outcomes: [
            {
              id: "cs_10",
              label: "1-0",
              icon: "1️⃣",
              bets: 5,
              pot: 800,
              open: 2,
            },
            {
              id: "cs_20",
              label: "2-0",
              icon: "2️⃣",
              bets: 4,
              pot: 700,
              open: 1,
            },
            {
              id: "cs_21",
              label: "2-1",
              icon: "🔢",
              bets: 6,
              pot: 950,
              open: 3,
            },
            {
              id: "cs_11",
              label: "1-1",
              icon: "🤝",
              bets: 8,
              pot: 1200,
              open: 4,
            },
            {
              id: "cs_01",
              label: "0-1",
              icon: "0️⃣",
              bets: 5,
              pot: 750,
              open: 2,
            },
          ],
        },
        {
          marketName: "Half Time / Full Time",
          outcomes: [
            {
              id: "htft_hh",
              label: "Home/Home",
              icon: "🏠",
              bets: 7,
              pot: 1500,
              open: 3,
            },
            {
              id: "htft_dh",
              label: "Draw/Home",
              icon: "🔄",
              bets: 4,
              pot: 900,
              open: 2,
            },
            {
              id: "htft_aa",
              label: "Away/Away",
              icon: "✈️",
              bets: 6,
              pot: 1300,
              open: 3,
            },
          ],
        },
        {
          marketName: "First Goal Scorer",
          outcomes: [
            {
              id: "fgs_p1",
              label: "Haaland",
              icon: "⚽",
              bets: 12,
              pot: 2000,
              open: 5,
            },
            {
              id: "fgs_p2",
              label: "Salah",
              icon: "⚽",
              bets: 10,
              pot: 1800,
              open: 4,
            },
          ],
        },
        {
          marketName: "Clean Sheet",
          outcomes: [
            {
              id: "cs_home_yes",
              label: match.homeTeam + " Yes",
              icon: "🛡️",
              bets: 8,
              pot: 1100,
              open: 3,
            },
            {
              id: "cs_home_no",
              label: match.homeTeam + " No",
              icon: "🥅",
              bets: 9,
              pot: 1250,
              open: 4,
            },
          ],
        },
        {
          marketName: "Corners Over/Under",
          outcomes: [
            {
              id: "corn_o95",
              label: "Over 9.5",
              icon: "🚩",
              bets: 15,
              pot: 1900,
              open: 6,
            },
            {
              id: "corn_u95",
              label: "Under 9.5",
              icon: "🚩",
              bets: 12,
              pot: 1600,
              open: 5,
            },
          ],
        },
        {
          marketName: "Cards Over/Under",
          outcomes: [
            {
              id: "card_o35",
              label: "Over 3.5 Cards",
              icon: "🟨",
              bets: 10,
              pot: 1400,
              open: 4,
            },
            {
              id: "card_u35",
              label: "Under 3.5 Cards",
              icon: "🟨",
              bets: 8,
              pot: 1100,
              open: 3,
            },
          ],
        }
      );
      break;

    case "cricket":
      markets.push(
        {
          marketName: "Top Batsman",
          outcomes: [
            {
              id: "tb_p1",
              label: "Kohli",
              icon: "🏏",
              bets: 25,
              pot: 5000,
              open: 8,
            },
            {
              id: "tb_p2",
              label: "Rohit",
              icon: "🏏",
              bets: 22,
              pot: 4500,
              open: 7,
            },
          ],
        },
        {
          marketName: "Top Bowler",
          outcomes: [
            {
              id: "tbo_p1",
              label: "Bumrah",
              icon: "🎯",
              bets: 18,
              pot: 3800,
              open: 6,
            },
            {
              id: "tbo_p2",
              label: "Starc",
              icon: "🎯",
              bets: 16,
              pot: 3500,
              open: 5,
            },
          ],
        },
        {
          marketName: "Total Runs",
          outcomes: [
            {
              id: "tr_o300",
              label: "Over 300.5",
              icon: "⬆️",
              bets: 30,
              pot: 6000,
              open: 12,
            },
            {
              id: "tr_u300",
              label: "Under 300.5",
              icon: "⬇️",
              bets: 25,
              pot: 5000,
              open: 10,
            },
          ],
        },
        {
          marketName: "Highest Opening Partnership",
          outcomes: [
            {
              id: "hop_home",
              label: match.homeTeam,
              icon: "🤝",
              bets: 14,
              pot: 2800,
              open: 5,
            },
            {
              id: "hop_away",
              label: match.awayTeam,
              icon: "🤝",
              bets: 12,
              pot: 2500,
              open: 4,
            },
          ],
        },
        {
          marketName: "Method of Dismissal (Next Wicket)",
          outcomes: [
            {
              id: "mod_caught",
              label: "Caught",
              icon: "🧤",
              bets: 15,
              pot: 2000,
              open: 6,
            },
            {
              id: "mod_bowled",
              label: "Bowled",
              icon: "🎯",
              bets: 8,
              pot: 1200,
              open: 3,
            },
            {
              id: "mod_lbw",
              label: "LBW",
              icon: "🦵",
              bets: 5,
              pot: 800,
              open: 2,
            },
          ],
        }
      );
      break;

    case "basketball":
      markets.push(
        {
          marketName: "Point Spread",
          outcomes: [
            {
              id: "ps_home",
              label: match.homeTeam + " -5.5",
              icon: "📊",
              bets: 20,
              pot: 4000,
              open: 8,
            },
            {
              id: "ps_away",
              label: match.awayTeam + " +5.5",
              icon: "📊",
              bets: 18,
              pot: 3800,
              open: 7,
            },
          ],
        },
        {
          marketName: "Total Points (Over/Under)",
          outcomes: [
            {
              id: "tp_o215",
              label: "Over 215.5",
              icon: "⬆️",
              bets: 25,
              pot: 4500,
              open: 9,
            },
            {
              id: "tp_u215",
              label: "Under 215.5",
              icon: "⬇️",
              bets: 22,
              pot: 4100,
              open: 8,
            },
          ],
        },
        {
          marketName: "Quarter Winner (Q1)",
          outcomes: [
            {
              id: "qw_home",
              label: match.homeTeam,
              icon: "1️⃣",
              bets: 12,
              pot: 2000,
              open: 4,
            },
            {
              id: "qw_away",
              label: match.awayTeam,
              icon: "1️⃣",
              bets: 10,
              pot: 1800,
              open: 4,
            },
          ],
        },
        {
          marketName: "Player Points",
          outcomes: [
            {
              id: "pp_lbj_o",
              label: "LeBron Over 25.5",
              icon: "🏀",
              bets: 15,
              pot: 3000,
              open: 6,
            },
            {
              id: "pp_lbj_u",
              label: "LeBron Under 25.5",
              icon: "🏀",
              bets: 8,
              pot: 1500,
              open: 3,
            },
          ],
        }
      );
      break;

    case "tennis":
      markets.push(
        {
          marketName: "Set Winner (Set 1)",
          outcomes: [
            {
              id: "sw_p1",
              label: match.homeTeam,
              icon: "🎾",
              bets: 10,
              pot: 1800,
              open: 5,
            },
            {
              id: "sw_p2",
              label: match.awayTeam,
              icon: "🎾",
              bets: 8,
              pot: 1400,
              open: 4,
            },
          ],
        },
        {
          marketName: "Total Games",
          outcomes: [
            {
              id: "tg_o22",
              label: "Over 22.5",
              icon: "⬆️",
              bets: 14,
              pot: 2200,
              open: 6,
            },
            {
              id: "tg_u22",
              label: "Under 22.5",
              icon: "⬇️",
              bets: 11,
              pot: 1900,
              open: 5,
            },
          ],
        },
        {
          marketName: "Correct Score (Set 1)",
          outcomes: [
            {
              id: "cs_64",
              label: "6-4",
              icon: "🔢",
              bets: 5,
              pot: 800,
              open: 2,
            },
            {
              id: "cs_63",
              label: "6-3",
              icon: "🔢",
              bets: 4,
              pot: 700,
              open: 2,
            },
            {
              id: "cs_76",
              label: "7-6",
              icon: "🔢",
              bets: 6,
              pot: 1000,
              open: 3,
            },
          ],
        }
      );
      break;

    case "baseball":
      markets.push(
        {
          marketName: "Run Line",
          outcomes: [
            {
              id: "rl_home",
              label: match.homeTeam + " -1.5",
              icon: "📊",
              bets: 12,
              pot: 2000,
              open: 5,
            },
            {
              id: "rl_away",
              label: match.awayTeam + " +1.5",
              icon: "📊",
              bets: 10,
              pot: 1800,
              open: 4,
            },
          ],
        },
        {
          marketName: "Total Runs",
          outcomes: [
            {
              id: "tr_o85",
              label: "Over 8.5",
              icon: "⬆️",
              bets: 16,
              pot: 2500,
              open: 7,
            },
            {
              id: "tr_u85",
              label: "Under 8.5",
              icon: "⬇️",
              bets: 14,
              pot: 2200,
              open: 6,
            },
          ],
        },
        {
          marketName: "First Team to Score",
          outcomes: [
            {
              id: "fts_home",
              label: match.homeTeam,
              icon: "1️⃣",
              bets: 8,
              pot: 1200,
              open: 3,
            },
            {
              id: "fts_away",
              label: match.awayTeam,
              icon: "1️⃣",
              bets: 7,
              pot: 1100,
              open: 3,
            },
          ],
        },
        {
          marketName: "Winning Margin",
          outcomes: [
            {
              id: "wm_1",
              label: "1 Run",
              icon: "📏",
              bets: 6,
              pot: 900,
              open: 2,
            },
            {
              id: "wm_2",
              label: "2 Runs",
              icon: "📏",
              bets: 5,
              pot: 800,
              open: 2,
            },
            {
              id: "wm_3p",
              label: "3+ Runs",
              icon: "📏",
              bets: 8,
              pot: 1400,
              open: 4,
            },
          ],
        }
      );
      break;

    case "hockey":
    case "ice hockey":
      markets.push(
        {
          marketName: "Puck Line",
          outcomes: [
            {
              id: "pl_home",
              label: match.homeTeam + " -1.5",
              icon: "🏒",
              bets: 10,
              pot: 1800,
              open: 5,
            },
            {
              id: "pl_away",
              label: match.awayTeam + " +1.5",
              icon: "🏒",
              bets: 9,
              pot: 1600,
              open: 4,
            },
          ],
        },
        {
          marketName: "Total Goals (Over/Under)",
          outcomes: [
            {
              id: "tg_o55",
              label: "Over 5.5",
              icon: "⬆️",
              bets: 15,
              pot: 2500,
              open: 6,
            },
            {
              id: "tg_u55",
              label: "Under 5.5",
              icon: "⬇️",
              bets: 12,
              pot: 2000,
              open: 5,
            },
          ],
        },
        {
          marketName: "Period Winner (1st Period)",
          outcomes: [
            {
              id: "pw_home",
              label: match.homeTeam,
              icon: "1️⃣",
              bets: 8,
              pot: 1200,
              open: 3,
            },
            {
              id: "pw_draw",
              label: "Draw",
              icon: "🤝",
              bets: 5,
              pot: 800,
              open: 2,
            },
            {
              id: "pw_away",
              label: match.awayTeam,
              icon: "1️⃣",
              bets: 7,
              pot: 1100,
              open: 3,
            },
          ],
        }
      );
      break;

    case "esports":
    case "e-sports":
      markets.push(
        {
          marketName: "Map Winner (Map 1)",
          outcomes: [
            {
              id: "mw_t1",
              label: match.homeTeam,
              icon: "🎮",
              bets: 12,
              pot: 2000,
              open: 5,
            },
            {
              id: "mw_t2",
              label: match.awayTeam,
              icon: "🎮",
              bets: 10,
              pot: 1800,
              open: 4,
            },
          ],
        },
        {
          marketName: "Total Maps",
          outcomes: [
            {
              id: "tm_o25",
              label: "Over 2.5",
              icon: "⬆️",
              bets: 15,
              pot: 2500,
              open: 6,
            },
            {
              id: "tm_u25",
              label: "Under 2.5",
              icon: "⬇️",
              bets: 8,
              pot: 1200,
              open: 3,
            },
          ],
        },
        {
          marketName: "First Blood",
          outcomes: [
            {
              id: "fb_t1",
              label: match.homeTeam,
              icon: "🩸",
              bets: 14,
              pot: 2200,
              open: 5,
            },
            {
              id: "fb_t2",
              label: match.awayTeam,
              icon: "🩸",
              bets: 12,
              pot: 2000,
              open: 5,
            },
          ],
        },
        {
          marketName: "Total Kills (Map 1)",
          outcomes: [
            {
              id: "tk_o50",
              label: "Over 50.5",
              icon: "💀",
              bets: 18,
              pot: 3000,
              open: 7,
            },
            {
              id: "tk_u50",
              label: "Under 50.5",
              icon: "💀",
              bets: 14,
              pot: 2400,
              open: 6,
            },
          ],
        }
      );
      break;

    case "horse racing":
      markets.push(
        {
          marketName: "Win",
          outcomes: [
            {
              id: "hr_1",
              label: "Thunder Bolt",
              icon: "🐎",
              bets: 20,
              pot: 5000,
              open: 8,
            },
            {
              id: "hr_2",
              label: "Light Speed",
              icon: "🐎",
              bets: 15,
              pot: 3500,
              open: 6,
            },
            {
              id: "hr_3",
              label: "Golden Glory",
              icon: "🐎",
              bets: 10,
              pot: 2500,
              open: 4,
            },
          ],
        },
        {
          marketName: "Place (Top 3)",
          outcomes: [
            {
              id: "pl_1",
              label: "Thunder Bolt",
              icon: "🥉",
              bets: 25,
              pot: 4000,
              open: 10,
            },
            {
              id: "pl_2",
              label: "Light Speed",
              icon: "🥉",
              bets: 22,
              pot: 3800,
              open: 9,
            },
          ],
        }
      );
      break;

    case "boxing":
    case "mma":
      markets.push(
        {
          marketName: "Method of Victory",
          outcomes: [
            {
              id: "mov_ko",
              label: "KO/TKO",
              icon: "🥊",
              bets: 18,
              pot: 3500,
              open: 7,
            },
            {
              id: "mov_dec",
              label: "Decision",
              icon: "📝",
              bets: 12,
              pot: 2000,
              open: 5,
            },
            {
              id: "mov_sub",
              label: "Submission",
              icon: "🥋",
              bets: 8,
              pot: 1500,
              open: 3,
            },
          ],
        },
        {
          marketName: "Round Betting",
          outcomes: [
            {
              id: "rb_r1",
              label: "Round 1",
              icon: "🔔",
              bets: 5,
              pot: 1000,
              open: 2,
            },
            {
              id: "rb_r2",
              label: "Round 2",
              icon: "🔔",
              bets: 4,
              pot: 800,
              open: 2,
            },
            {
              id: "rb_dist",
              label: "Distance",
              icon: "⏱️",
              bets: 10,
              pot: 2000,
              open: 4,
            },
          ],
        },
        {
          marketName: "Fight to Go the Distance",
          outcomes: [
            {
              id: "fd_yes",
              label: "Yes",
              icon: "✅",
              bets: 15,
              pot: 2500,
              open: 6,
            },
            {
              id: "fd_no",
              label: "No",
              icon: "❌",
              bets: 12,
              pot: 2200,
              open: 5,
            },
          ],
        }
      );
      break;

    default:
      // Generic
      markets.push({
        marketName: "Over/Under Points",
        outcomes: [
          {
            id: "generic_over",
            label: "Over",
            icon: "⬆️",
            bets: 10,
            pot: 1000,
            open: 5,
          },
          {
            id: "generic_under",
            label: "Under",
            icon: "⬇️",
            bets: 10,
            pot: 1000,
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
