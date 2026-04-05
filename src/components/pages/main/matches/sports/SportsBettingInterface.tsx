"use client";
import { Pagination } from "@/components/shared/Pagination";
import { SportMatchCardSkeleton } from "@/components/skeleton/SportMatchCardSkeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslation } from "@/i18n/LanguageContext";
import { IMatch } from "@/interfaces/match.interface";
import { Activity, Calendar, Filter, Search } from "lucide-react";
import { useMemo, useState } from "react";
import SportHeroBanner from "./SportHeroBanner";
import SportMatchCard from "./SportMatchCard";
import { useGetMatchesBySportSlugQuery } from "@/redux/api/matchApi";

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
        promo:
          "Browse premium P2P betting markets for the world's most popular sport.",
      },
      {
        bg: "url('https://images.unsplash.com/photo-1551958219-acbc608c6377?auto=format&fit=crop&q=80')",
        title: "Football Championships",
        subtitle: "Live Action",
        promo:
          "Create unique peer-to-peer bets on matches happening right now.",
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
        promo:
          "Experience the thrill of cricket betting with best-in-class P2P odds.",
      },
      {
        bg: "url('https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&q=80')",
        title: "Premier T20 Leagues",
        subtitle: "Domestic Market",
        promo:
          "Join active cricket markets and bet directly against other fans.",
      },
    ],
  },
  // ... (keeping other config as is)
  basketball: {
    theme: "from-orange-900 to-orange-950",
    accent: "#f97316",
    logo: "🏀",
    banners: [],
  },
  volleyball: {
    theme: "from-blue-900 to-blue-950",
    accent: "#3b82f6",
    logo: "🏐",
    banners: [],
  },
  tennis: {
    theme: "from-purple-900 to-purple-950",
    accent: "#a855f7",
    logo: "🎾",
    banners: [],
  },
  baseball: {
    theme: "from-red-900 to-red-950",
    accent: "#ef4444",
    logo: "⚾",
    banners: [],
  },
  boxing: {
    theme: "from-rose-900 to-rose-950",
    accent: "#f43f5e",
    logo: "🥊",
    banners: [],
  },
  rugby: {
    theme: "from-teal-900 to-teal-950",
    accent: "#14b8a6",
    logo: "🏉",
    banners: [],
  },
  hockey: {
    theme: "from-cyan-900 to-cyan-950",
    accent: "#06b6d4",
    logo: "🏒",
    banners: [],
  },
  badminton: {
    theme: "from-lime-900 to-lime-950",
    accent: "#84cc16",
    logo: "🏸",
    banners: [],
  },
  "table-tennis": {
    theme: "from-yellow-900 to-yellow-950",
    accent: "#eab308",
    logo: "🏓",
    banners: [],
  },
  handball: {
    theme: "from-amber-900 to-amber-950",
    accent: "#f59e0b",
    logo: "🤾",
    banners: [],
  },
  "american-football": {
    theme: "from-indigo-900 to-indigo-950",
    accent: "#6366f1",
    logo: "🏈",
    banners: [],
  },
  golf: {
    theme: "from-green-800 to-green-950",
    accent: "#22c55e",
    logo: "⛳",
    banners: [],
  },
  mma: {
    theme: "from-red-950 to-black",
    accent: "#dc2626",
    logo: "🥋",
    banners: [],
  },
};

export default function SportsBettingInterface({
  sport,
}: SportsBettingInterfaceProps) {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

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

  const statusMap: Record<string, string | undefined> = {
    all: undefined,
    live: "live",
    upcoming: "scheduled",
  };

  const { data: matchesResponse, isLoading } = useGetMatchesBySportSlugQuery({
    slug: sport,
    status: statusMap[activeTab],
    page: currentPage,
    limit: itemsPerPage,
  });

  const matches = useMemo(
    () => matchesResponse?.data?.results || [],
    [matchesResponse],
  );
  const pagination = matchesResponse?.data?.pagination;

  const filteredMatches = matches.filter((m: IMatch) => {
    const homeName = m.homeTeam?.name || "";
    const awayName = m.awayTeam?.name || "";
    const tournamentName = m.tournament?.name || "";

    return (
      homeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      awayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tournamentName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setCurrentPage(1);
  };

  return (
    <div className="w-full min-w-0 space-y-8 pb-12" key={sport}>
      {/* Top Search & Filter Bar */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground flex items-center gap-3">
            <span className="text-4xl">{activeConfig.logo}</span>
            {sportName}
          </h1>
          <p className="text-sm text-muted-foreground font-medium flex items-center gap-2">
            <Activity className="size-4 text-primary" />
            Active betting markets for {sportName}
          </p>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              placeholder="Search teams or leagues..."
              className="pl-9 h-11 bg-card border-border focus-visible:ring-primary/20 rounded-md"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button
            variant="outline"
            size="icon"
            className="shrink-0 size-11 border-border rounded-md"
          >
            <Calendar className="size-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="shrink-0 size-11 border-border rounded-md"
          >
            <Filter className="size-4" />
          </Button>
        </div>
      </div>

      {/* Hero Banner */}
      {activeConfig.banners && activeConfig.banners.length > 0 && (
        <SportHeroBanner config={activeConfig.banners} />
      )}

      {/* Tabs / Filter Navigation */}
      <Tabs
        value={activeTab}
        onValueChange={handleTabChange}
        className="w-full"
      >
        <TabsList className="bg-muted/30 border border-border w-full justify-start h-auto p-1.5 rounded-md gap-2 overflow-x-auto no-scrollbar">
          <TabsTrigger
            value="all"
            className="rounded-md data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm px-8 py-3 text-xs font-bold text-muted-foreground transition-all cursor-pointer shrink-0"
          >
            All Markets
          </TabsTrigger>
          <TabsTrigger
            value="live"
            className="rounded-md data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm px-8 py-3 text-xs font-bold text-muted-foreground transition-all cursor-pointer shrink-0"
          >
            Live Now
          </TabsTrigger>
          <TabsTrigger
            value="upcoming"
            className="rounded-md data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm px-8 py-3 text-xs font-bold text-muted-foreground transition-all cursor-pointer shrink-0"
          >
            Upcoming
          </TabsTrigger>
        </TabsList>

        <div className="mt-8 space-y-10">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Array.from({ length: itemsPerPage }).map((_, i) => (
                <SportMatchCardSkeleton key={i} />
              ))}
            </div>
          ) : filteredMatches.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 space-y-4 border border-dashed border-border rounded-md bg-muted/10 text-center">
              <Activity className="size-12 text-muted-foreground/30" />
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-foreground">
                  No Markets Found
                </h3>
                <p className="text-sm text-muted-foreground">
                  Try adjusting your filters or search query.
                </p>
              </div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredMatches.map((match: IMatch) => (
                  <SportMatchCard key={match._id} match={match} />
                ))}
              </div>

              {pagination && pagination.totalPages > 1 && (
                <div className="flex justify-center pt-8">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={pagination.totalPages}
                    hasNextPage={pagination.hasNextPage}
                    hasPrevPage={pagination.hasPrevPage}
                    onPageChange={setCurrentPage}
                  />
                </div>
              )}
            </>
          )}
        </div>
      </Tabs>
    </div>
  );
}
