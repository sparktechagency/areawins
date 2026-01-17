"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Filter, Search } from "lucide-react";
import { useState } from "react";
import SportHeroBanner from "./SportHeroBanner";
import SportMatchCard from "./SportMatchCard";

import { MOCK_MATCHES } from "@/data/match.data";

interface SportsBettingInterfaceProps {
  sport: string;
}

const config = {
  football: {
    theme: "from-green-900 to-green-950",
    accent: "#00d65c",
    logo: "⚽",
    banners: [
      {
        bg: "url('https://images.unsplash.com/photo-1570498839593-e565b39455fc')",
        title: "Man City vs Arsenal",
        subtitle: "Premier League",
        promo: "Create a P2P bet on the match winner to earn up to 5x returns",
      },
      {
        bg: "url('https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80')",
        title: "Champions League Finals",
        subtitle: "Europe",
        promo: "High volume in Correct Score markets. Join the P2P pool now!",
      },
    ],
  },
  cricket: {
    theme: "from-emerald-900 to-emerald-950",
    accent: "#10b981",
    logo: "🏏",
    banners: [
      {
        bg: "url('https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&q=80')",
        title: "India vs Australia",
        subtitle: "T20 World Cup",
        promo: "Live betting on Top Batsman & Total Sixes - Join now!",
      },
      {
        bg: "url('https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&q=80')",
        title: "IPL 2024",
        subtitle: "Indian Premier League",
        promo: "CSK vs RCB - Predict the winner and earn big rewards!",
      },
    ],
  },
  basketball: {
    theme: "from-orange-900 to-orange-950",
    accent: "#f97316",
    logo: "🏀",
    banners: [
      {
        bg: "url('https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&q=80')",
        title: "Lakers vs Warriors",
        subtitle: "NBA Finals",
        promo: "Point Spread & Total Points markets live - Create your bet!",
      },
      {
        bg: "url('https://images.unsplash.com/photo-1608245449230-4ac19066d2d0?auto=format&fit=crop&q=80')",
        title: "EuroLeague Playoffs",
        subtitle: "European Basketball",
        promo: "High-stakes P2P betting on Quarter Winners available now",
      },
    ],
  },
  volleyball: {
    theme: "from-blue-900 to-blue-950",
    accent: "#3b82f6",
    logo: "🏐",
    banners: [
      {
        bg: "url('https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?auto=format&fit=crop&q=80')",
        title: "Volleyball Nations League",
        subtitle: "International",
        promo: "Bet on Total Sets & First Set Winner - Join the action!",
      },
    ],
  },
  tennis: {
    theme: "from-purple-900 to-purple-950",
    accent: "#a855f7",
    logo: "🎾",
    banners: [
      {
        bg: "url('https://images.unsplash.com/photo-1554068865-24cecd4e34b8?auto=format&fit=crop&q=80')",
        title: "Wimbledon Finals",
        subtitle: "Grand Slam",
        promo: "Set Winner & Total Games markets - Create P2P bets now!",
      },
      {
        bg: "url('https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?auto=format&fit=crop&q=80')",
        title: "US Open",
        subtitle: "Hard Court Championship",
        promo: "Live betting on every set - Join the P2P exchange!",
      },
    ],
  },
  baseball: {
    theme: "from-red-900 to-red-950",
    accent: "#ef4444",
    logo: "⚾",
    banners: [
      {
        bg: "url('https://images.unsplash.com/photo-1566577739112-5180d4bf9390?auto=format&fit=crop&q=80')",
        title: "World Series 2024",
        subtitle: "MLB Championship",
        promo: "Total Runs & Run Line markets - Create your winning bet!",
      },
    ],
  },
  boxing: {
    theme: "from-rose-900 to-rose-950",
    accent: "#f43f5e",
    logo: "🥊",
    banners: [
      {
        bg: "url('https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?auto=format&fit=crop&q=80')",
        title: "Heavyweight Championship",
        subtitle: "Title Fight",
        promo: "Bet on Method of Victory & Total Rounds - P2P odds live!",
      },
    ],
  },
  rugby: {
    theme: "from-teal-900 to-teal-950",
    accent: "#14b8a6",
    logo: "🏉",
    banners: [
      {
        bg: "url('https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80')",
        title: "Six Nations Championship",
        subtitle: "International Rugby",
        promo: "First Try Scorer & Total Points - Join P2P betting now!",
      },
    ],
  },
  hockey: {
    theme: "from-cyan-900 to-cyan-950",
    accent: "#06b6d4",
    logo: "🏒",
    banners: [
      {
        bg: "url('https://images.unsplash.com/photo-1515703407324-5f753afd8be8?auto=format&fit=crop&q=80')",
        title: "NHL Stanley Cup",
        subtitle: "Ice Hockey Finals",
        promo: "Puck Line & Total Goals markets - Create your bet!",
      },
    ],
  },
  badminton: {
    theme: "from-lime-900 to-lime-950",
    accent: "#84cc16",
    logo: "🏸",
    banners: [
      {
        bg: "url('https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&q=80')",
        title: "All England Open",
        subtitle: "Badminton Championship",
        promo: "Total Games & Set Winner bets - P2P exchange active!",
      },
    ],
  },
  "table-tennis": {
    theme: "from-yellow-900 to-yellow-950",
    accent: "#eab308",
    logo: "🏓",
    banners: [
      {
        bg: "url('https://images.unsplash.com/photo-1534158914592-062992fbe900?auto=format&fit=crop&q=80')",
        title: "World Championships",
        subtitle: "Table Tennis",
        promo: "First Game Winner & Total Sets - Join P2P betting!",
      },
    ],
  },
  handball: {
    theme: "from-amber-900 to-amber-950",
    accent: "#f59e0b",
    logo: "🤾",
    banners: [
      {
        bg: "url('https://images.unsplash.com/photo-1551958219-acbc608c6377?auto=format&fit=crop&q=80')",
        title: "European Handball Championship",
        subtitle: "International Tournament",
        promo: "Total Goals & Handicap markets - Create P2P bets now!",
      },
    ],
  },
  "american-football": {
    theme: "from-indigo-900 to-indigo-950",
    accent: "#6366f1",
    logo: "🏈",
    banners: [
      {
        bg: "url('https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&q=80')",
        title: "Super Bowl LVIII",
        subtitle: "NFL Championship",
        promo: "Point Spread & Total Points - Massive P2P pool available!",
      },
      {
        bg: "url('https://images.unsplash.com/photo-1566577739112-5180d4bf9390?auto=format&fit=crop&q=80')",
        title: "College Football Playoffs",
        subtitle: "NCAA",
        promo: "Quarter-by-quarter betting - Join the P2P action!",
      },
    ],
  },
  golf: {
    theme: "from-green-800 to-green-950",
    accent: "#22c55e",
    logo: "⛳",
    banners: [
      {
        bg: "url('https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&q=80')",
        title: "The Masters",
        subtitle: "Augusta National",
        promo: "Tournament Winner & Top 5 Finish - P2P odds live!",
      },
    ],
  },
  mma: {
    theme: "from-red-950 to-black",
    accent: "#dc2626",
    logo: "🥋",
    banners: [
      {
        bg: "url('https://images.unsplash.com/photo-1555597673-b21d5c935865?auto=format&fit=crop&q=80')",
        title: "UFC Championship Fight",
        subtitle: "Mixed Martial Arts",
        promo: "Method of Victory & Round Betting - Create your P2P bet!",
      },
    ],
  },
};

export default function SportsBettingInterface({
  sport,
}: SportsBettingInterfaceProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [matches, setMatches] = useState(MOCK_MATCHES);

  const sportKey = sport.toLowerCase() as keyof typeof config;
  const activeConfig = config[sportKey] || config.football;
  const sportName = sport.charAt(0).toUpperCase() + sport.slice(1);

  const handleDelete = (id: string) => {
    setMatches((prev) => prev.filter((m) => m._id !== id));
  };

  const filteredMatches = matches.filter((m) => {
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
      <SportHeroBanner config={activeConfig.banners} />

      {/* Tabs / Filter Navigation */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="bg-transparent border border-border w-full justify-start h-auto p-1.5 rounded-lg gap-8 overflow-x-auto no-scrollbar">
          <TabsTrigger
            value="all"
            className="border-none rounded-lg data-[state=active]:bg-primary data-[state=active]:text-white px-8 py-3 text-xs font-black text-muted-foreground uppercase tracking-widest transition-all cursor-pointer"
          >
            All Matches
          </TabsTrigger>
          <TabsTrigger
            value="live"
            className="border-none rounded-lg data-[state=active]:bg-primary data-[state=active]:text-white px-8 py-3 text-xs font-black text-muted-foreground uppercase tracking-widest transition-all cursor-pointer"
          >
            Live Matches
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredMatches.map((match) => (
                <SportMatchCard
                  key={match._id}
                  match={match}
                  onDelete={handleDelete}
                />
              ))}
            </div>
            {filteredMatches.length === 0 && (
              <div className="text-center py-24 bg-muted/20 rounded-lg border border-dashed border-border text-muted-foreground font-black uppercase text-xs tracking-widest">
                No active markets found for this category.
              </div>
            )}
          </TabsContent>

          <TabsContent value="live" className="space-y-6 m-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredMatches
                .filter((m) => m.status === "live")
                .map((match) => (
                  <SportMatchCard
                    key={match._id}
                    match={match}
                    onDelete={handleDelete}
                  />
                ))}
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
