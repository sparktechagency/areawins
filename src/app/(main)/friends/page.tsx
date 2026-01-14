"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  Filter,
  MessageSquare,
  Search,
  ShieldCheck,
  TrendingUp,
  Trophy,
  UserCheck,
  UserPlus,
  Users,
} from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";

interface UserProfile {
  id: string;
  name: string;
  avatar: string;
  winRate: number;
  totalBets: number;
  profit: number;
  isOnline: boolean;
  trustScore: number;
  level: number;
  isFriend?: boolean;
  hasPendingRequest?: boolean;
}

const mockUsers: UserProfile[] = [
  {
    id: "1",
    name: "MadridistaKing",
    avatar: "https://i.pravatar.cc/150?u=1",
    winRate: 78,
    totalBets: 154,
    profit: 5200,
    isOnline: true,
    trustScore: 98,
    level: 42,
  },
  {
    id: "2",
    name: "BetMaster99",
    avatar: "https://i.pravatar.cc/150?u=2",
    winRate: 65,
    totalBets: 320,
    profit: 12400,
    isOnline: false,
    trustScore: 89,
    level: 56,
  },
  {
    id: "3",
    name: "AlexPunter",
    avatar: "https://i.pravatar.cc/150?u=3",
    winRate: 45,
    totalBets: 89,
    profit: -120,
    isOnline: true,
    trustScore: 92,
    level: 15,
  },
  {
    id: "4",
    name: "CryptoPro",
    avatar: "https://i.pravatar.cc/150?u=4",
    winRate: 82,
    totalBets: 45,
    profit: 1500,
    isOnline: true,
    trustScore: 95,
    level: 28,
  },
  {
    id: "5",
    name: "WizBet",
    avatar: "https://i.pravatar.cc/150?u=5",
    winRate: 58,
    totalBets: 210,
    profit: 3200,
    isOnline: false,
    trustScore: 75,
    level: 34,
  },
  {
    id: "6",
    name: "GoalHunter",
    avatar: "https://i.pravatar.cc/150?u=6",
    winRate: 71,
    totalBets: 124,
    profit: 4100,
    isOnline: true,
    trustScore: 99,
    level: 48,
  },
];

const FriendsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [friends, setFriends] = useState<string[]>([]);
  const [pendingRequests, setPendingRequests] = useState<string[]>([]);

  const filteredUsers = useMemo(() => {
    return mockUsers.filter((user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const handleAddFriend = (id: string) => {
    setPendingRequests((prev) => [...prev, id]);
  };

  return (
    <div className="container mx-auto pt-32 pb-20 px-4">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div className="space-y-2">
          <Badge
            variant="outline"
            className="text-primary border-primary/20 bg-primary/5 px-4 py-1 font-black uppercase tracking-widest text-[10px]"
          >
            Community
          </Badge>
          <h1 className="text-4xl md:text-5xl font-black text-foreground tracking-tight flex items-center gap-4">
            Find Players
            <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Users className="size-6 text-primary" />
            </div>
          </h1>
          <p className="text-muted-foreground font-medium max-w-xl">
            Connect with top punters, follow their bets, and challenge them in
            P2P markets.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="bg-card border border-border px-6 py-4 rounded-lg flex items-center gap-4 shadow-sm">
            <div className="size-10 rounded-full bg-emerald-500/10 flex items-center justify-center">
              <UserCheck className="size-5 text-emerald-500" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black text-foreground">
                {friends.length}
              </span>
              <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                Your Friends
              </span>
            </div>
          </div>
          <div className="bg-card border border-border px-6 py-4 rounded-lg flex items-center gap-4 shadow-sm">
            <div className="size-10 rounded-full bg-blue-500/10 flex items-center justify-center">
              <Users className="size-5 text-blue-500" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black text-foreground">1.2K</span>
              <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                Active Players
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-card border border-border p-6 rounded-lg mb-12 shadow-sm relative overflow-hidden">
        {/* Decorative mask */}
        <div className="absolute top-0 right-0 size-64 bg-primary/5 blur-[100px] pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
            <Input
              placeholder="Search by username or betting style..."
              className="w-full h-16 pl-14 pr-6 bg-muted/30 border-none rounded-lg text-lg font-bold placeholder:text-muted-foreground/50 focus-visible:ring-primary"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button
            variant="outline"
            className="h-16 px-8 rounded-lg border-border hover:bg-muted font-black uppercase tracking-widest text-xs flex gap-2"
          >
            <Filter className="size-4" />
            Filters
          </Button>
        </div>
      </div>

      {/* Users Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredUsers.map((user) => {
          const isFriend = friends.includes(user.id);
          const isPending = pendingRequests.includes(user.id);

          return (
            <div
              key={user.id}
              className="group relative bg-card border border-border rounded-lg p-6 transition-all hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/5 overflow-hidden"
            >
              {/* Online Indicator */}
              {user.isOnline && (
                <div className="absolute top-8 right-8 flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 rounded-full border border-emerald-500/20">
                  <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">
                    Online Now
                  </span>
                </div>
              )}

              {/* User Identity */}
              <div className="flex flex-col items-center mb-8">
                <div className="relative mb-4">
                  <div className="size-28 rounded-full p-1.5 border-4 border-muted/50 group-hover:border-primary/30 transition-all overflow-hidden bg-muted">
                    <Image
                      src={user.avatar}
                      alt={user.name}
                      width={120}
                      height={120}
                      className="rounded-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="absolute -bottom-1 -right-1 size-10 rounded-full bg-slate-900 border-4 border-card flex items-center justify-center text-[10px] font-black text-white">
                    Lv.{user.level}
                  </div>
                </div>
                <h3 className="text-2xl font-black text-foreground mb-1 group-hover:text-primary transition-colors">
                  {user.name}
                </h3>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="size-3.5 text-primary" />
                  <span className="text-[10px] font-black text-primary uppercase tracking-widest">
                    Trusted Member • {user.trustScore}% Trust
                  </span>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="flex flex-col items-center gap-1 p-3 rounded-lg bg-muted/30 border border-border/50 group-hover:bg-primary/5 transition-colors">
                  <Trophy className="size-4 text-amber-500" />
                  <span className="text-base font-black text-foreground">
                    {user.winRate}%
                  </span>
                  <span className="text-[8px] font-black text-muted-foreground uppercase tracking-widest">
                    Win Rate
                  </span>
                </div>
                <div className="flex flex-col items-center gap-1 p-3 rounded-lg bg-muted/30 border border-border/50 group-hover:bg-primary/5 transition-colors">
                  <TrendingUp className="size-4 text-primary" />
                  <span className="text-base font-black text-foreground">
                    {user.totalBets}
                  </span>
                  <span className="text-[8px] font-black text-muted-foreground uppercase tracking-widest">
                    Total Bets
                  </span>
                </div>
                <div className="flex flex-col items-center gap-1 p-3 rounded-lg bg-muted/30 border border-border/50 group-hover:bg-primary/5 transition-colors">
                  <TrendingUp className="size-4 text-emerald-500" />
                  <span className="text-base font-black text-foreground">
                    +{Math.floor(user.profit / 1000)}k
                  </span>
                  <span className="text-[8px] font-black text-muted-foreground uppercase tracking-widest">
                    Profit
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button
                  onClick={() =>
                    !isFriend && !isPending && handleAddFriend(user.id)
                  }
                  disabled={isFriend || isPending}
                  className={cn(
                    "flex-1 h-12 rounded-lg font-black uppercase tracking-widest text-[10px] gap-2 transition-all",
                    isFriend
                      ? "bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/10"
                      : isPending
                      ? "bg-muted text-muted-foreground border border-border"
                      : "bg-primary hover:bg-primary/90 text-white"
                  )}
                >
                  {isFriend ? (
                    <>
                      <UserCheck className="size-4" />
                      Following
                    </>
                  ) : isPending ? (
                    <>
                      <UserPlus className="size-4 animate-pulse" />
                      Pending
                    </>
                  ) : (
                    <>
                      <UserPlus className="size-4" />
                      Add Friend
                    </>
                  )}
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="size-12 rounded-lg border-border hover:bg-muted text-foreground transition-all shrink-0"
                >
                  <MessageSquare className="size-4" />
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredUsers.length === 0 && (
        <div className="p-20 text-center bg-muted/10 rounded-lg border border-dashed border-border mt-12">
          <Search className="size-16 mx-auto mb-6 opacity-20 text-primary" />
          <h3 className="text-2xl font-black text-foreground mb-2">
            No players found
          </h3>
          <p className="text-muted-foreground font-medium">
            Try searching for a different username or remove filters.
          </p>
        </div>
      )}
    </div>
  );
};

export default FriendsPage;
