"use client";

import { SidebarLink } from "@/components/shared/matches/SportsMatchesSidebar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, DollarSign, Search, SlidersHorizontal } from "lucide-react";
import { useState } from "react";

const MarketSidebar = () => {
  const [budget, setBudget] = useState([50]);

  return (
    <div className="w-full space-y-6 sticky top-24 max-h-[calc(100vh-120px)] overflow-y-auto pr-2 pb-10">
      {/* Search Sidebar */}
      <div className="relative group">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
        <Input
          placeholder="Search markets..."
          className="pl-9 h-11 bg-muted/30 border-border focus-visible:ring-primary/30"
        />
      </div>

      {/* Budget Filter */}
      <div className="space-y-4 pt-2">
        <div className="flex items-center justify-between px-3">
          <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
            <DollarSign className="size-3" />
            Budget (Stake)
          </h3>
          <span className="text-[10px] font-black text-primary bg-primary/10 px-2 py-0.5 rounded">
            UP TO ${budget[0]}
          </span>
        </div>
        <div className="px-3">
          <input
            type="range"
            min="0"
            max="500"
            step="5"
            value={budget[0]}
            onChange={(e) => setBudget([parseInt(e.target.value)])}
            className="w-full accent-primary bg-muted/50 h-1.5 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between mt-2 text-[10px] text-muted-foreground font-bold">
            <span>$0</span>
            <span>$500+</span>
          </div>
        </div>
      </div>

      {/* Sport Categories */}
      <div className="space-y-1 pt-4 border-t border-border">
        <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider px-3 mb-2">
          Filter by Sport
        </h3>
        <SidebarLink icon="⚽" label="Football" count={42} active />
        <SidebarLink icon="🏏" label="Cricket" count={18} />
        <SidebarLink icon="🏀" label="Basketball" count={12} />
        <SidebarLink icon="🏐" label="Volleyball" count={8} />
      </div>

      {/* Tournaments */}
      <div className="space-y-1 pt-4 border-t border-border">
        <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider px-3 mb-2">
          Tournaments
        </h3>
        <SidebarLink icon="🏆" label="Champions League" />
        <SidebarLink icon="🏆" label="Premier League" />
        <SidebarLink icon="🏆" label="La Liga" />
        <SidebarLink icon="🏆" label="IPL T20" />
      </div>

      {/* Quick Filters */}
      <div className="space-y-3 pt-4 border-t border-border">
        <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider px-3 flex items-center gap-2">
          <SlidersHorizontal className="size-3" />
          Market Type
        </h3>
        <div className="flex flex-wrap gap-2 px-3 text-[10px]">
          <Badge className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 cursor-pointer">
            P2P Only
          </Badge>
          <Badge
            variant="outline"
            className="border-border text-muted-foreground cursor-pointer"
          >
            High Trust
          </Badge>
          <Badge
            variant="outline"
            className="border-border text-muted-foreground cursor-pointer"
          >
            Recently Added
          </Badge>
        </div>
      </div>

      {/* Date */}
      <div className="space-y-3 pt-4 border-t border-border">
        <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider px-3 flex items-center gap-2">
          <Calendar className="size-3" />
          Select Date
        </h3>
        <div className="grid grid-cols-2 gap-2 px-3">
          <Button
            variant="outline"
            size="sm"
            className="text-[10px] h-8 font-bold border-border hover:bg-primary/10 hover:text-primary transition-all"
          >
            TODAY
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="text-[10px] h-8 font-bold border-border"
          >
            TOMORROW
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MarketSidebar;
