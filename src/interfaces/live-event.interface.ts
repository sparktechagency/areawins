export interface Team {
  name: string;
  score: number;
  image: string;
}

export interface League {
  name: string;
  country: string;
  flag: string;
}

export interface LiveEvent {
  id: number;
  time: string;
  sport: "Football";
  league: League;
  teamA: Team;
  teamB: Team;
  p2pStats: {
    activeBets: number;
    potAmount: number;
    openBets: number;
  };
}
