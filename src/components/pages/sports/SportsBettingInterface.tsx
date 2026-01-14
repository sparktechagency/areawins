"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Filter, Search } from "lucide-react";
import { useState } from "react";
import SportHeroBanner from "./components/SportHeroBanner";
import SportMatchCard from "./components/SportMatchCard";

// Types
interface Match {
  id: string;
  homeTeam: string;
  awayTeam: string;
  date: string;
  time: string;
  league: string;
  isLive: boolean;
  score?: { home: number | string; away: number | string; time?: string };
  odds: {
    home: number;
    draw?: number;
    away: number;
  };
  markets: number;
  sport: "football" | "cricket" | "basketball" | "volleyball";
}

interface SportsBettingInterfaceProps {
  sport: string;
}

const config = {
  football: {
    theme: "from-green-900 to-green-950",
    accent: "#00d65c",
    logo: "⚽",
    banner: {
      bg: "url('https://images.unsplash.com/photo-1522778119026-d647f0565c6a?auto=format&fit=crop&q=80')",
      title: "Man City vs Arsenal",
      subtitle: "Premier League",
      promo: "Get enhanced odds on Haaland to score anytime",
      oldOdds: "2.50",
      newOdds: "4.00",
    },
  },
  cricket: {
    theme: "from-emerald-900 to-emerald-950",
    accent: "#10b981",
    logo: "🏏",
    banner: {
      bg: "url('https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&q=80')",
      title: "CSK vs RCB",
      subtitle: "Indian Premier League",
      promo: "Get up to ৳10,000 on your first World Cup deposit",
      matchStatus: "CSK: 145/3 (16.2) • RCB Need 42 off 22 balls",
    },
  },
  volleyball: {
    theme: "from-blue-900 to-blue-950",
    accent: "#3b82f6",
    logo: "🏐",
    banner: {
      bg: "url('https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?auto=format&fit=crop&q=80')",
      title: "Volleyball Nations League",
      subtitle: "Group Stage",
      promo:
        "Bet on top leagues including SuperLega, PlusLiga & Nations League",
    },
  },
  basketball: {
    theme: "from-orange-900 to-orange-950",
    accent: "#f97316",
    logo: "🏀",
    banner: {
      bg: "url('https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&q=80')",
      title: "NBA Finals 2024",
      subtitle: "Playoffs",
      promo: "Live betting available for every quarter of the finals",
    },
  },
};

const matches: Match[] = [
  // Mock Data (Consistent with earlier view)
  {
    id: "f1",
    sport: "football",
    homeTeam: "Man City",
    awayTeam: "Arsenal",
    date: "Today",
    time: "20:00",
    league: "Premier League",
    isLive: true,
    score: { home: 1, away: 0, time: "34'" },
    odds: { home: 1.85, draw: 3.6, away: 4.2 },
    markets: 154,
  },
  {
    id: "f2",
    sport: "football",
    homeTeam: "Liverpool",
    awayTeam: "Chelsea",
    date: "Today",
    time: "22:00",
    league: "Premier League",
    isLive: false,
    odds: { home: 2.1, draw: 3.4, away: 3.2 },
    markets: 112,
  },
  {
    id: "c1",
    sport: "cricket",
    homeTeam: "CSK",
    awayTeam: "RCB",
    date: "Today",
    time: "19:30",
    league: "IPL T20",
    isLive: true,
    score: { home: "145/3", away: "Yet to Bat", time: "16.2 Ov" },
    odds: { home: 1.52, away: 2.45 },
    markets: 42,
  },
  {
    id: "b1",
    sport: "basketball",
    homeTeam: "Celtics",
    awayTeam: "Mavericks",
    date: "Today",
    time: "06:00",
    league: "NBA",
    isLive: false,
    odds: { home: 1.45, away: 2.75 },
    markets: 86,
  },
];

export default function SportsBettingInterface({
  sport,
}: SportsBettingInterfaceProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const sportKey = sport.toLowerCase() as keyof typeof config;
  const activeConfig = config[sportKey] || config.football;
  const sportName = sport.charAt(0).toUpperCase() + sport.slice(1);

  const filteredMatches = matches.filter(
    (m) =>
      m.sport === sportKey &&
      (m.homeTeam.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.awayTeam.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.league.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="w-full min-w-0">
      {/* Top Search & Filter Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
        <h1 className="text-2xl font-black text-foreground flex items-center gap-3">
          <span className="text-3xl">{activeConfig.logo}</span>
          {sportName}
        </h1>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              placeholder="Search team or league"
              className="pl-9 bg-card border-border focus-visible:ring-primary/20"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button
            variant="outline"
            size="icon"
            className="shrink-0 border-border"
          >
            <Calendar className="size-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="shrink-0 border-border"
          >
            <Filter className="size-4" />
          </Button>
        </div>
      </div>

      {/* Hero Banner */}
      <SportHeroBanner config={activeConfig.banner} />

      {/* Tabs / Filter Navigation */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="bg-transparent border border-border w-full justify-start h-auto p-1 rounded gap-8 overflow-x-auto no-scrollbar">
          <TabsTrigger
            value="all"
            className="border-none data-[state=active]:border-primary data-[state=active]:bg-primary/10 px-0 pb-3 text-sm font-bold text-muted-foreground data-[state=active]:text-foreground uppercase tracking-widest transition-all cursor-pointer"
          >
            All Matches
          </TabsTrigger>
          <TabsTrigger
            value="live"
            className="border-none data-[state=active]:border-primary data-[state=active]:bg-primary/10 px-0 pb-3 text-sm font-bold text-muted-foreground data-[state=active]:text-foreground uppercase tracking-widest transition-all cursor-pointer"
          >
            Live Now
          </TabsTrigger>
          <TabsTrigger
            value="upcoming"
            className="border-none  data-[state=active]:border-primary data-[state=active]:bg-primary/10 px-0 pb-3 text-sm font-bold text-muted-foreground data-[state=active]:text-foreground uppercase tracking-widest transition-all cursor-pointer"
          >
            Upcoming
          </TabsTrigger>
          <TabsTrigger
            value="outrights"
            className="border-none  data-[state=active]:border-primary data-[state=active]:bg-primary/10 px-0 pb-3 text-sm font-bold text-muted-foreground data-[state=active]:text-foreground uppercase tracking-widest transition-all cursor-pointer"
          >
            Outrights
          </TabsTrigger>
        </TabsList>

        <div className="mt-8 space-y-4">
          <TabsContent value="all" className="space-y-4 m-0">
            {filteredMatches.map((match) => (
              <SportMatchCard key={match.id} match={match} />
            ))}
            {filteredMatches.length === 0 && (
              <div className="text-center py-20 bg-muted/20 rounded-2xl border border-dashed border-border text-muted-foreground font-medium">
                No matches found matching your criteria.
              </div>
            )}
          </TabsContent>

          <TabsContent value="live" className="space-y-4 m-0">
            {filteredMatches
              .filter((m) => m.isLive)
              .map((match) => (
                <SportMatchCard key={match.id} match={match} />
              ))}
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
