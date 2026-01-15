import { LiveEvent } from "@/interfaces/live-event.interface";

export const MOCK_LIVE_EVENTS: LiveEvent[] = [
  {
    id: 1,
    time: "45:20",
    sport: "Football",
    league: {
      name: "La Liga",
      country: "Spain",
      flag: "https://flagcdn.com/w40/es.png",
    },
    teamA: {
      name: "Barcelona",
      score: 2,
      image:
        "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=100&auto=format&fit=crop",
    },
    teamB: {
      name: "Real Madrid",
      score: 1,
      image:
        "https://images.unsplash.com/photo-1522778119026-d647f0596c20?q=80&w=100&auto=format&fit=crop",
    },
    p2pStats: {
      activeBets: 12,
      potAmount: 4500,
      openBets: 8,
    },
  },
  {
    id: 2,
    time: "63:10",
    sport: "Football",
    league: {
      name: "Premier League",
      country: "England",
      flag: "https://flagcdn.com/w40/gb-eng.png",
    },
    teamA: {
      name: "Chelsea",
      score: 3,
      image:
        "https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=100&auto=format&fit=crop",
    },
    teamB: {
      name: "Arsenal",
      score: 2,
      image:
        "https://images.unsplash.com/photo-1620506603004-972109673967?q=80&w=100&auto=format&fit=crop",
    },
    p2pStats: {
      activeBets: 24,
      potAmount: 8200,
      openBets: 15,
    },
  },
  {
    id: 3,
    time: "28:55",
    sport: "Football",
    league: {
      name: "Serie A",
      country: "Italy",
      flag: "https://flagcdn.com/w40/it.png",
    },
    teamA: {
      name: "AC Milan",
      score: 1,
      image:
        "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=100&auto=format&fit=crop",
    },
    teamB: {
      name: "Inter Milan",
      score: 1,
      image:
        "https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=100&auto=format&fit=crop",
    },
    p2pStats: {
      activeBets: 9,
      potAmount: 3100,
      openBets: 4,
    },
  },
];
