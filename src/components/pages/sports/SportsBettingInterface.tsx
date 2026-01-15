"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Filter, Search } from "lucide-react";
import { useState } from "react";
import SportHeroBanner from "./components/SportHeroBanner";
import SportMatchCard from "./components/SportMatchCard";

import { MOCK_MATCHES } from "@/data/match.data";

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
      promo: "Create a P2P bet on the match winner to earn up to 5x returns",
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
      promo:
        "Open Market: CSK needs 145 to win - Browse available matched bets",
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
      promo: "High Volume detected in Sets Over/Under market - Join the action",
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
      promo: "P2P Market: Lakers favored at 1.8x - Accept or Create a bet",
    },
  },
};

export default function SportsBettingInterface({
  sport,
}: SportsBettingInterfaceProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const sportKey = sport.toLowerCase() as keyof typeof config;
  const activeConfig = config[sportKey] || config.football;
  const sportName = sport.charAt(0).toUpperCase() + sport.slice(1);

  const filteredMatches = MOCK_MATCHES.filter((m) => {
    const mSport = typeof m.sport === "string" ? m.sport : m.sport.slug;
    const homeName = typeof m.homeTeam === "string" ? "" : m.homeTeam.name;
    const awayName = typeof m.awayTeam === "string" ? "" : m.awayTeam.name;
    const tournamentName =
      typeof m.tournament === "string" ? "" : m.tournament?.name ?? "";

    return (
      mSport === sportKey &&
      (homeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        awayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tournamentName.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  });

  return (
    <div className="w-full min-w-0">
      {/* Top Search & Filter Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
        <h1 className="text-3xl font-black text-foreground flex items-center gap-3">
          <span className="text-4xl">{activeConfig.logo}</span>
          {sportName}
        </h1>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              placeholder="Search team or league"
              className="pl-9 h-11 bg-card border-border focus-visible:ring-primary/20 rounded-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button
            variant="outline"
            size="icon"
            className="shrink-0 size-11 border-border rounded-lg"
          >
            <Calendar className="size-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="shrink-0 size-11 border-border rounded-lg"
          >
            <Filter className="size-4" />
          </Button>
        </div>
      </div>

      {/* Hero Banner */}
      <SportHeroBanner config={activeConfig.banner} />

      {/* Tabs / Filter Navigation */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="bg-transparent border border-border w-full justify-start h-auto p-1.5 rounded-lg gap-8 overflow-x-auto no-scrollbar">
          <TabsTrigger
            value="all"
            className="border-none rounded-lg data-[state=active]:bg-primary data-[state=active]:text-white px-8 py-3 text-xs font-black text-muted-foreground uppercase tracking-widest transition-all cursor-pointer"
          >
            All Market Activity
          </TabsTrigger>
          <TabsTrigger
            value="live"
            className="border-none rounded-lg data-[state=active]:bg-primary data-[state=active]:text-white px-8 py-3 text-xs font-black text-muted-foreground uppercase tracking-widest transition-all cursor-pointer"
          >
            Live Market
          </TabsTrigger>
          <TabsTrigger
            value="upcoming"
            className="border-none rounded-lg data-[state=active]:bg-primary data-[state=active]:text-white px-8 py-3 text-xs font-black text-muted-foreground uppercase tracking-widest transition-all cursor-pointer"
          >
            Upcoming
          </TabsTrigger>
          <TabsTrigger
            value="trending"
            className="border-none rounded-lg data-[state=active]:bg-primary data-[state=active]:text-white px-8 py-3 text-xs font-black text-muted-foreground uppercase tracking-widest transition-all cursor-pointer"
          >
            Trending
          </TabsTrigger>
        </TabsList>

        <div className="mt-8 space-y-6">
          <TabsContent value="all" className="space-y-6 m-0">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredMatches.map((match) => (
                <SportMatchCard key={match._id} match={match} />
              ))}
            </div>
            {filteredMatches.length === 0 && (
              <div className="text-center py-24 bg-muted/20 rounded-lg border border-dashed border-border text-muted-foreground font-black uppercase text-xs tracking-widest">
                No active markets found for this category.
              </div>
            )}
          </TabsContent>

          <TabsContent value="live" className="space-y-6 m-0">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredMatches
                .filter((m) => m.status === "live")
                .map((match) => (
                  <SportMatchCard key={match._id} match={match} />
                ))}
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
