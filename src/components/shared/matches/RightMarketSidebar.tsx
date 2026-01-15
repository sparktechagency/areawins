"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Flame, UserPlus } from "lucide-react";
import Image from "next/image";

const SuggestedFriends = () => {
  const friends = [
    {
      name: "Alex Rivera",
      handle: "@arivera",
      trust: 98,
      avatar: "https://i.pravatar.cc/150?u=a",
    },
    {
      name: "Sarah Chen",
      handle: "@schen",
      trust: 95,
      avatar: "https://i.pravatar.cc/150?u=b",
    },
    {
      name: "Marcus Wright",
      handle: "@mwright",
      trust: 88,
      avatar: "https://i.pravatar.cc/150?u=c",
    },
  ];

  return (
    <div className="bg-card rounded-lg border border-border p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-black text-muted-foreground uppercase tracking-[0.2em] flex items-center gap-2">
          <UserPlus className="size-3.5 text-primary" />
          Suggested Friends
        </h3>
      </div>
      <div className="space-y-4">
        {friends.map((friend, i) => (
          <div key={i} className="flex items-center justify-between group">
            <div className="flex items-center gap-3">
              <div className="relative size-10 rounded-full border border-border overflow-hidden">
                <Image
                  src={friend.avatar}
                  alt={friend.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] font-black text-foreground leading-tight group-hover:text-primary transition-colors cursor-pointer">
                  {friend.name}
                </span>
                <span className="text-[9px] font-bold text-muted-foreground uppercase">
                  {friend.trust}% Trust
                </span>
              </div>
            </div>
            <Button
              size="icon"
              variant="ghost"
              className="size-8 rounded-lg hover:bg-primary/10 hover:text-primary border border-border/50"
            >
              <UserPlus className="size-3.5" />
            </Button>
          </div>
        ))}
      </div>
      <Button
        variant="outline"
        className="w-full text-[10px] font-black uppercase tracking-widest h-10 rounded-lg border-border"
      >
        View All Community
      </Button>
    </div>
  );
};

const UpcomingMiniCards = () => {
  const matches = [
    { home: "Muer", away: "Dorm", sport: "⚽", time: "22:30", league: "Bund" },
    { home: "LAL", away: "GSW", sport: "🏀", time: "06:45", league: "NBA" },
    { home: "IND", away: "AUS", sport: "🏏", time: "14:30", league: "T20" },
  ];

  return (
    <div className="bg-card rounded-lg border border-border p-6 space-y-6">
      <h3 className="text-xs font-black text-muted-foreground uppercase tracking-[0.2em] flex items-center gap-2">
        <Calendar className="size-3.5 text-emerald-500" />
        Hot Upcoming
      </h3>
      <div className="space-y-3">
        {matches.map((m, i) => (
          <div
            key={i}
            className="bg-muted/30 border border-border/50 rounded-2xl p-4 hover:border-primary/30 transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[9px] font-black text-primary uppercase tracking-widest">
                {m.league}
              </span>
              <span className="text-[9px] font-bold text-muted-foreground">
                {m.time}
              </span>
            </div>
            <div className="flex items-center justify-between text-[11px] font-black text-foreground">
              <span className="truncate max-w-[60px]">{m.home}</span>
              <span className="text-muted-foreground/30 italic px-1">VS</span>
              <span className="truncate max-w-[60px] text-right">{m.away}</span>
            </div>
          </div>
        ))}
      </div>
      <Button
        variant="ghost"
        className="w-full text-[10px] font-black uppercase tracking-widest h-8 text-muted-foreground hover:text-foreground"
      >
        Browse Schedule →
      </Button>
    </div>
  );
};

const MarketplacePromo = () => (
  <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 relative overflow-hidden group">
    <div className="absolute -right-4 -top-4 size-20 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/20 transition-all" />
    <div className="relative z-10 space-y-4">
      <Badge className="bg-primary text-white text-[8px] font-black uppercase tracking-widest mb-1">
        Exchange
      </Badge>
      <h4 className="text-sm font-black text-foreground leading-tight">
        Create your own odds in 30 seconds.
      </h4>
      <p className="text-[10px] font-medium text-muted-foreground">
        Start a peer-to-peer battle and set the terms of your own bet.
      </p>
      <Button className="w-full h-10 rounded-lg bg-primary text-white font-black uppercase text-[10px] tracking-widest flex gap-2">
        Create Market
        <Flame className="size-3.5" />
      </Button>
    </div>
  </div>
);

const RightMarketSidebar = () => {
  return (
    <div className="w-full space-y-6 sticky top-24 pb-10">
      <MarketplacePromo />
      <SuggestedFriends />
      <UpcomingMiniCards />
    </div>
  );
};

export default RightMarketSidebar;
