export interface SportInfo {
  _id: string; // ObjectId
  sportId: string; // Unique, e.g., "SPORT-001"
  name: string; // Unique, e.g., "Football", "Cricket"
  slug: string; // Unique, lowercase
  icon: string; // URL or emoji
  displayOrder: number;
  isActive: boolean;
  createdAt?: string;
}

export interface TeamInfo {
  _id: string;
  teamId: string;
  name: string;
  shortName: string;
  slug: string;
  sport: string; // ObjectId Reference
  country: string;
  logo?: string;
  isActive: boolean;
  createdAt?: string;
}

export interface TournamentInfo {
  _id: string;
  tournamentId: string;
  name: string;
  slug: string;
  sport: string; // ObjectId Reference
  type: "league" | "tournament" | "cup" | "international" | "grand_slam";
  year?: string;
  country?: string;
  logo?: string;
  isFeatured: boolean;
  displayOrder: number;
  isActive: boolean;
  createdAt?: string;
}

export interface MatchLiveStatus {
  homeScore: number;
  awayScore: number;
  homeWickets?: number; // For Cricket
  awayWickets?: number; // For Cricket
  homeOvers?: string; // For Cricket, e.g. "18.4"
  awayOvers?: string; // For Cricket
  minute?: number; // For Football/Basketball
  period: string; // "Second Half", "1st Innings", "Q3", etc.
  lastUpdated: string;
}

export interface MatchFinalResult {
  homeScore: number;
  awayScore: number;
  winner: string | null; // ObjectId Reference to TeamInfo
  isDraw: boolean;
  resultByBetType: Array<{
    betType: string; // ObjectId Reference
    winningOutcome: string;
  }>;
}

export interface MatchInfo {
  _id: string;
  matchId: string;
  sport: string | SportInfo; // ObjectId Reference or populated
  tournament?: string | TournamentInfo; // ObjectId Reference or populated
  homeTeam: string | TeamInfo; // ObjectId Reference or populated
  awayTeam: string | TeamInfo; // ObjectId Reference or populated
  scheduledStartTime: string;
  status: "scheduled" | "live" | "finished" | "cancelled" | "postponed";
  source: "manual" | "api";
  apiMatchId?: string;
  apiProvider?: string;
  availableBetTypes: string[]; // Array of ObjectIds
  venue?: string;
  city?: string;
  country?: string;
  liveStatus?: MatchLiveStatus;
  finalResult?: MatchFinalResult;
  isResultVerified: boolean;
  resultSettledBy?: string; // ObjectId User
  resultSettledAt?: string;
  totalBetsCount: number;
  isFeatured: boolean;
  createdBy: string; // ObjectId User
  createdAt: string;
  updatedAt: string;
}

// For frontend display components
export interface MatchDetailsContentProps {
  sport: string;
  id: string;
}

export interface SportMatchCardProps {
  match: MatchInfo;
  onDelete?: (id: string) => void;
}
