"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Clock, LayoutGrid, List, ShieldCheck, TrendingUp, Users } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useGetSportCategoriesQuery } from "@/lib/redux/api/sportCategoryApi";
import { ISportCategories } from "@/interfaces/sportCategories.interface";
import { Skeleton } from "@/components/ui/skeleton";
import { ReusableModal } from "@/components/shared/ReusableModal";
import AcceptBetModalContent from "./AcceptBetModalContent";
import { useTranslation } from "@/lib/i18n/LanguageContext";

interface OpenBet {
  id: string;
  creator: {
    name: string;
    avatar: string;
    trust: number;
    verified?: boolean;
  };
  match: string;
  sport: string;
  timeAgo: string;
  backing: string;
  stake: number;
  odds: number;
}

const openBets: OpenBet[] = [
  {
    id: "1",
    creator: {
      name: "MadridistaKing",
      avatar: "https://i.pravatar.cc/150?u=11",
      trust: 98,
      verified: true,
    },
    match: "Chelsea vs Arsenal",
    sport: "football",
    timeAgo: "2m ago",
    backing: "Chelsea Win",
    stake: 50.0,
    odds: 2.5,
  },
  {
    id: "2",
    creator: {
      name: "CricketFanatic",
      avatar: "https://i.pravatar.cc/150?u=12",
      trust: 92,
      verified: true,
    },
    match: "India vs Australia",
    sport: "cricket",
    timeAgo: "15m ago",
    backing: "India Win",
    stake: 100.0,
    odds: 1.8,
  },
  {
    id: "3",
    creator: {
      name: "HoopsMaster",
      avatar: "https://i.pravatar.cc/150?u=13",
      trust: 85,
    },
    match: "Lakers vs Warriors",
    sport: "basketball",
    timeAgo: "45m ago",
    backing: "Lakers -5.5",
    stake: 25.0,
    odds: 2.0,
  },
];

const MarketPageContent = () => {
  const { t } = useTranslation();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedBet, setSelectedBet] = useState<OpenBet | null>(null);
  const [isAccepted, setIsAccepted] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");

  const handleAccept = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsAccepted(true);
      setIsProcessing(false);
      setTimeout(() => {
        setIsAccepted(false);
        setSelectedBet(null);
      }, 2000);
    }, 1000);
  };

  return (
    <div className="w-full space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight text-center md:text-left">
            Live Open Markets
          </h1>
          <p className="text-xs text-muted-foreground font-medium text-center md:text-left flex items-center justify-center md:justify-start gap-2">
            <Users className="size-3.5 text-primary" />
            Join the peer-to-peer betting arena
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-muted/30 p-1 rounded-lg border border-border flex gap-1 shadow-xs">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setViewMode("grid")}
              className={cn(
                "size-9 rounded-md transition-all cursor-pointer",
                viewMode === "grid"
                  ? "bg-background text-primary shadow-sm"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              <LayoutGrid className="size-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setViewMode("list")}
              className={cn(
                "size-9 rounded-md transition-all cursor-pointer",
                viewMode === "list"
                  ? "bg-background text-primary shadow-sm"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              <List className="size-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Market Grid */}
      <div
        className={cn(
          "grid gap-6",
          viewMode === "grid"
            ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            : "grid-cols-1",
        )}
      >
        {openBets.map((bet) => {
          const potentialWin = bet.stake * bet.odds;
          const opponentStake = potentialWin - bet.stake;

          return (
            <div
              key={bet.id}
              className="bg-card rounded-2xl border border-border overflow-hidden hover:border-primary/30 transition-all group flex flex-col shadow-sm hover:shadow-xl hover:shadow-primary/5"
            >
              {/* Card Header */}
              <div className="bg-muted/10 px-5 py-4 border-b border-border flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="text-sm">🏆</div>
                  <div className="flex flex-col">
                    <span className="text-[11px] font-bold text-primary leading-none mb-1">
                      {t(`sports.${bet.sport}`)}
                    </span>
                    <span className="text-xs font-semibold text-foreground tracking-tight">
                      {bet.match}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-muted/40 rounded-full">
                  <Clock className="size-3 text-muted-foreground" />
                  <span className="text-[10px] font-bold text-muted-foreground">
                    {bet.timeAgo}
                  </span>
                </div>
              </div>

              <div className="p-5 flex flex-col flex-1">
                {/* Creator & Pot Info */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="size-11 rounded-full border-2 border-background ring-2 ring-primary/10 overflow-hidden shrink-0 shadow-inner">
                        <Image
                          src={bet.creator.avatar}
                          alt={bet.creator.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      {bet.creator.verified && (
                        <div className="absolute -bottom-1 -right-1 bg-background rounded-full p-0.5">
                          <ShieldCheck className="size-4 text-primary fill-primary/10" />
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-foreground leading-tight">
                        {bet.creator.name}
                      </span>
                      <div className="flex items-center gap-1">
                        <TrendingUp className="size-3 text-primary" />
                        <span className="text-[11px] font-bold text-primary">
                          {bet.creator.trust}% Trust Score
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-[10px] font-bold text-muted-foreground mb-1">
                      Total Pot
                    </span>
                    <div className="text-lg font-black text-foreground">
                      ${potentialWin.toFixed(0)}
                    </div>
                  </div>
                </div>

                {/* Bet Logic Visualizer */}
                <div className="bg-muted/30 rounded-xl p-4 border border-border/50 space-y-4 mb-6 relative overflow-hidden group-hover:bg-muted/50 transition-colors">
                  <div className="flex justify-between relative z-10">
                    <div className="space-y-1">
                      <span className="text-[11px] font-bold text-muted-foreground flex items-center gap-1.5">
                        <span className="size-1.5 rounded-full bg-primary" />
                        Backing (Maker)
                      </span>
                      <h4 className="text-sm font-bold text-foreground">
                        {bet.backing}
                      </h4>
                    </div>
                    <div className="text-right space-y-1">
                      <span className="text-[11px] font-bold text-muted-foreground flex items-center justify-end gap-1.5">
                        Accept (Taker)
                        <span className="size-1.5 rounded-full bg-rose-500" />
                      </span>
                      <h4 className="text-sm font-bold text-rose-500">
                        Opposite Team
                      </h4>
                    </div>
                  </div>

                  <div className="h-px bg-border/50 w-full" />

                  <div className="flex items-center justify-between text-xs font-bold">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[10px] text-muted-foreground">Stake</span>
                      <span className="text-foreground">${bet.stake}</span>
                    </div>
                    <div className="bg-primary/10 px-3 py-1 rounded text-primary text-[11px]">
                      {bet.odds}x Odds
                    </div>
                    <div className="flex flex-col items-end gap-0.5">
                      <span className="text-[10px] text-muted-foreground">Requirements</span>
                      <span className="text-rose-500">${opponentStake.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={() => setSelectedBet(bet)}
                  className="w-full h-11 cursor-pointer rounded-xl font-bold transition-all active:scale-95 shadow-lg shadow-primary/10"
                >
                  Confirm Acceptance
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Confirmation Modal */}
      <ReusableModal
        isOpen={!!selectedBet}
        onClose={() => !isProcessing && setSelectedBet(null)}
        maxWidth="md"
        padding="none"
      >
        <AcceptBetModalContent
          selectedBet={selectedBet}
          isAccepted={isAccepted}
          isProcessing={isProcessing}
          onAccept={handleAccept}
          onCancel={() => setSelectedBet(null)}
        />
      </ReusableModal>
    </div>
  );
};

export default MarketPageContent;

