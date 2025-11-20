/**
 * Sports and betting related constants
 */

import { SportType } from "@/types/match.types";

export const SPORTS: { id: SportType; name: string; icon: string; path: string }[] = [
  {
    id: "football",
    name: "Football",
    icon: "⚽",
    path: "/football",
  },
  {
    id: "cricket",
    name: "Cricket",
    icon: "🏏",
    path: "/cricket",
  },
  {
    id: "basketball",
    name: "Basketball",
    icon: "🏀",
    path: "/basketball",
  },
  {
    id: "volleyball",
    name: "Volleyball",
    icon: "🏐",
    path: "/volleyball",
  },
  {
    id: "baseball",
    name: "Baseball",
    icon: "⚾",
    path: "/baseball",
  },
  {
    id: "tennis",
    name: "Tennis",
    icon: "🎾",
    path: "/tennis",
  },
  {
    id: "boxing",
    name: "Boxing",
    icon: "🥊",
    path: "/boxing",
  },
];

export const SPORT_ICONS: Record<SportType, string> = {
  football: "⚽",
  cricket: "🏏",
  basketball: "🏀",
  volleyball: "🏐",
  baseball: "⚾",
  tennis: "🎾",
  boxing: "🥊",
};

export const SPORT_COLORS: Record<SportType, string> = {
  football: "#00D65C",
  cricket: "#F59E0B",
  basketball: "#EF4444",
  volleyball: "#8B5CF6",
  baseball: "#3B82F6",
  tennis: "#10B981",
  boxing: "#F97316",
};
