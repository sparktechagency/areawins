"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Calendar, ChevronRight, Globe } from "lucide-react";

const SportsMatchesSidebar = () => {
  return (
    <div className="w-full space-y-6 sticky top-24 max-h-[calc(100vh-120px)] overflow-y-auto  pr-2">
      {/* Sport Categories */}
      <div className="space-y-1">
        <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider px-3 mb-2">
          Sports
        </h3>
        <SidebarLink icon="⚽" label="Football" count={124} />
        <SidebarLink icon="🏏" label="Cricket" count={42} />
        <SidebarLink icon="🏀" label="Basketball" count={86} />
        <SidebarLink icon="🏐" label="Volleyball" count={28} />
        <SidebarLink icon="🎾" label="Tennis" count={15} />
      </div>
      {/* Tournaments */}
      <div className="space-y-1 pt-4 border-t border-border">
        <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider px-3 mb-2">
          Tournaments
        </h3>
        <SidebarLink icon="🏆" label="Premier League" />
        <SidebarLink icon="🏆" label="Champions League" />
        <SidebarLink icon="🏆" label="IPL T20" />
        <SidebarLink icon="🏆" label="NBA Finals" />
      </div>

      {/* Select Date */}
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

      {/* All Countries matches screenshot 0 */}
      <div className="space-y-1 pt-4 border-t border-border">
        <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider px-3 mb-2">
          All Countries
        </h3>
        <SidebarLink icon={<Globe className="size-4" />} label="England" />
        <SidebarLink icon={<Globe className="size-4" />} label="Spain" />
        <SidebarLink icon={<Globe className="size-4" />} label="Germany" />
        <SidebarLink icon={<Globe className="size-4" />} label="Italy" />
        <SidebarLink icon={<Globe className="size-4" />} label="France" />
        <SidebarLink icon={<Globe className="size-4" />} label="Bangladesh" />
      </div>
    </div>
  );
};

export const SidebarLink = ({
  icon,
  label,
  count,
  active,
}: {
  icon: React.ReactNode;
  label: string;
  count?: number;
  active?: boolean;
}) => (
  <button
    className={cn(
      "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all group cursor-pointer",
      active
        ? "bg-primary/10 text-primary border border-primary/20"
        : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
    )}
  >
    <div
      className={cn(
        "shrink-0 transition-transform group-hover:scale-110",
        typeof icon === "string" ? "text-lg" : ""
      )}
    >
      {icon}
    </div>
    <span className="flex-1 text-left">{label}</span>
    {count !== undefined && (
      <span className="text-[10px] font-bold bg-muted px-1.5 py-0.5 rounded text-muted-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
        {count}
      </span>
    )}
    <ChevronRight
      className={cn(
        "size-3.5 opacity-0 -translate-x-2 transition-all",
        active
          ? "opacity-100 translate-x-0"
          : "group-hover:opacity-40 group-hover:translate-x-0"
      )}
    />
  </button>
);

export default SportsMatchesSidebar;
