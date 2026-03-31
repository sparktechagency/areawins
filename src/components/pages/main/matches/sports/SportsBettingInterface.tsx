"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MOCK_MATCHES } from "@/data/match.data";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import { Calendar, Filter, Search } from "lucide-react";
import { useState } from "react";
import SportHeroBanner from "./SportHeroBanner";
import SportMatchCard from "./SportMatchCard";
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
        bg: "url('https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80')",
        title: "Elite Football Markets",
        subtitle: "Global Leagues",
        promo: "Browse premium P2P betting markets for the world's most popular sport.",
      },
      {
        bg: "url('https://images.unsplash.com/photo-1551958219-acbc608c6377?auto=format&fit=crop&q=80')",
        title: "Football Championships",
        subtitle: "Live Action",
        promo: "Create unique peer-to-peer bets on matches happening right now.",
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
        title: "Grand Cricket Stadiums",
        subtitle: "International Series",
        promo: "Experience the thrill of cricket betting with best-in-class P2P odds.",
      },
      {
        bg: "url('https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&q=80')",
        title: "Premier T20 Leagues",
        subtitle: "Domestic Market",
        promo: "Join active cricket markets and bet directly against other fans.",
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
        title: "Professional Basketball",
        subtitle: "Major Leagues",
        promo: "High-speed basketball betting action with peer-to-peer flexibility.",
      },
      {
        bg: "url('https://images.unsplash.com/photo-1608245449230-4ac19066d2d0?auto=format&fit=crop&q=80')",
        title: "Courtside Markets",
        subtitle: "Global Play",
        promo: "Place bets on quarter wins, point spreads, and total scores.",
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
        title: "Pro Volleyball League",
        subtitle: "Global Markets",
        promo: "Bet on your favorite volleyball teams with competitive P2P odds.",
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
        title: "Championship Tennis",
        subtitle: "Grand Slams",
        promo: "Premium tennis markets with real-time P2P betting exchanges.",
      },
      {
        bg: "url('https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?auto=format&fit=crop&q=80')",
        title: "World Tennis Tour",
        subtitle: "Live Courts",
        promo: "Bet on set winners and total games with fans worldwide.",
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
        title: "Professional Baseball",
        subtitle: "Major Series",
        promo: "Create P2P bets on innings, runs, and more in baseball markets.",
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
        title: "Elite Boxing Events",
        subtitle: "Fight Night",
        promo: "Join the P2P exchange for high-stakes professional boxing matches.",
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
        title: "Rugby Championships",
        subtitle: "International Play",
        promo: "Browse premium rugby betting markets with superior P2P odds.",
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
        title: "Ice Hockey Leagues",
        subtitle: "Professional Play",
        promo: "Dynamic P2P betting on hockey with real-time exchange action.",
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
        title: "Badminton Masters",
        subtitle: "Global Circuit",
        promo: "Create unique P2P bets on every badminton series worldwide.",
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
        title: "Pro Table Tennis",
        subtitle: "International Tour",
        promo: "High-intensity table tennis markets with direct P2P betting.",
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
        title: "Handball Leagues",
        subtitle: "Major Tournaments",
        promo: "Experience handball betting like never before with P2P flexibility.",
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
        title: "American Football",
        subtitle: "Professional Leagues",
        promo: "Deep markets for point spreads and total points with P2P leverage.",
      },
      {
        bg: "url('https://images.unsplash.com/photo-1566577739112-5180d4bf9390?auto=format&fit=crop&q=80')",
        title: "College Football",
        subtitle: "Future Stars",
        promo: "Join the most active community for football betting exchanges.",
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
        title: "Championship Golf",
        subtitle: "Elite Tours",
        promo: "Predict tournament finishes with peer-to-peer betting markets.",
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
        title: "MMA Champions",
        subtitle: "The Octagon",
        promo: "Premium MMA markets for method of victory and round results.",
      },
    ],
  },
};

export default function SportsBettingInterface({
  sport,
}: SportsBettingInterfaceProps) {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const [matches, setMatches] = useState(MOCK_MATCHES);

  const sportKey = sport.toLowerCase() as keyof typeof config;
  const activeConfig = config[sportKey] || config.football;
  const sportName = t(
    `sports.${
      sportKey === "table-tennis"
        ? "tableTennis"
        : sportKey === "american-football"
          ? "americanFootball"
          : sportKey
    }`,
  );

  const handleDelete = (id: string) => {
    setMatches((prev) => prev.filter((m) => m._id !== id));
  };

  const filteredMatches = matches.filter((m) => {
    const mSport = typeof m.sport === "string" ? m.sport : m.sport.slug;
    const homeName = typeof m.homeTeam === "string" ? "" : m.homeTeam.name;
    const awayName = typeof m.awayTeam === "string" ? "" : m.awayTeam.name;
    const tournamentName =
      typeof m.tournament === "string" ? "" : (m.tournament?.name ?? "");

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
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl  text-foreground flex items-center gap-2 sm:gap-3">
          <span className="text-3xl sm:text-4xl">{activeConfig.logo}</span>
          {sportName}
        </h1>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              placeholder={t("sportsPage.searchPlaceholder")}
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
        <TabsList className="bg-transparent border border-border w-full justify-start h-auto p-1 rounded-lg gap-2 sm:gap-4 overflow-x-auto no-scrollbar">
          <TabsTrigger
            value="all"
            className="border-none rounded-lg data-[state=active]:bg-primary data-[state=active]:text-white px-4 sm:px-8 py-2.5 sm:py-3 text-[10px] sm:text-xs  text-muted-foreground uppercase tracking-wider sm:tracking-widest transition-all cursor-pointer shrink-0"
          >
            {t("sportsPage.allMatches")}
          </TabsTrigger>
          <TabsTrigger
            value="live"
            className="border-none rounded-lg data-[state=active]:bg-primary data-[state=active]:text-white px-4 sm:px-8 py-2.5 sm:py-3 text-[10px] sm:text-xs  text-muted-foreground uppercase tracking-wider sm:tracking-widest transition-all cursor-pointer shrink-0"
          >
            {t("sportsPage.liveMatches")}
          </TabsTrigger>
          <TabsTrigger
            value="upcoming"
            className="border-none rounded-lg data-[state=active]:bg-primary data-[state=active]:text-white px-4 sm:px-8 py-2.5 sm:py-3 text-[10px] sm:text-xs  text-muted-foreground uppercase tracking-wider sm:tracking-widest transition-all cursor-pointer shrink-0"
          >
            {t("sportsPage.upcoming")}
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
              <div className="text-center py-24 bg-muted/20 rounded-lg border border-dashed border-border text-muted-foreground  uppercase text-xs tracking-widest">
                {t("sportsPage.noActiveMarkets")}
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
