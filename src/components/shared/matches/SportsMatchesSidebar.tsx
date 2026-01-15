"use client";

import { Button } from "@/components/ui/button";
import { MOCK_SPORTS, MOCK_TOURNAMENTS } from "@/data/match.data";
import { cn } from "@/lib/utils";
import { Calendar, ChevronRight, Globe } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const SportsMatchesSidebar = () => {
  const pathname = usePathname();
  const [expandedSport, setExpandedSport] = useState<string | null>(null);

  // Get active sports sorted by displayOrder
  const activeSports = MOCK_SPORTS.filter((s) => s.isActive).sort(
    (a, b) => a.displayOrder - b.displayOrder
  );

  // Get tournaments for a specific sport
  const getTournamentsForSport = (sportId: string) => {
    return MOCK_TOURNAMENTS.filter(
      (t) => t.sport === sportId && t.isActive
    ).sort((a, b) => a.displayOrder - b.displayOrder);
  };

  return (
    <div className="w-full space-y-6 sticky top-24 max-h-[calc(100vh-120px)] overflow-y-auto pr-2">
      {/* Sport Categories with Expandable Tournaments */}
      <div className="space-y-1">
        <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider px-3 mb-2">
          Sports
        </h3>
        {activeSports?.map((sport) => {
          const isActive = pathname.includes(`/matches/${sport.slug}`);
          const isExpanded = expandedSport === sport._id;
          const tournaments = getTournamentsForSport(sport._id);
          // Mock count based on sport order (deterministic)
          const matchCount = 50 + sport.displayOrder * 10;

          return (
            <div key={sport._id} className="space-y-2">
              {/* Sport Link */}
              <div className="flex items-center gap-1">
                <Link
                  href={`/matches/${sport.slug}`}
                  className={cn(
                    "flex-1 flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all group cursor-pointer border",
                    isActive
                      ? "bg-primary/10 text-primary  border-primary/20"
                      : "text-muted-foreground hover:bg-muted/50 hover:text-foreground border-transparent"
                  )}
                >
                  <div className="shrink-0 text-lg transition-transform group-hover:scale-110">
                    {sport.icon}
                  </div>
                  <span className="flex-1 text-left">{sport.name}</span>
                  <span className="text-[10px] font-bold bg-muted px-1.5 py-0.5 rounded text-muted-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    {matchCount}
                  </span>
                  <ChevronRight
                    className={cn(
                      "size-3.5 opacity-0 -translate-x-2 transition-all",
                      isActive
                        ? "opacity-100 translate-x-0"
                        : "group-hover:opacity-40 group-hover:translate-x-0"
                    )}
                  />
                </Link>
              </div>

              {/* Tournaments Dropdown */}
              {isExpanded && tournaments.length > 0 && (
                <div className="ml-6 space-y-1 border-l-2 border-border pl-3">
                  {tournaments.map((tournament) => (
                    <Link
                      key={tournament._id}
                      href={`/matches/${sport.slug}?tournament=${tournament.slug}`}
                      className="block px-3 py-2 rounded-lg text-xs font-medium text-muted-foreground hover:bg-muted/50 hover:text-foreground transition-all"
                    >
                      🏆 {tournament.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}
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

      {/* Popular Countries */}
      <div className="space-y-1 pt-4 border-t border-border">
        <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider px-3 mb-2">
          Popular Countries
        </h3>
        <SidebarLink icon={<Globe className="size-4" />} label="England" />
        <SidebarLink icon={<Globe className="size-4" />} label="Spain" />
        <SidebarLink icon={<Globe className="size-4" />} label="Germany" />
        <SidebarLink icon={<Globe className="size-4" />} label="Italy" />
        <SidebarLink icon={<Globe className="size-4" />} label="France" />
        <SidebarLink icon={<Globe className="size-4" />} label="India" />
      </div>
    </div>
  );
};

export const SidebarLink = ({
  icon,
  label,
  count,
  active,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  count?: number;
  active?: boolean;
  href?: string;
}) => {
  const content = (
    <>
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
    </>
  );

  const className = cn(
    "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all group cursor-pointer",
    active
      ? "bg-primary/10 text-primary border border-primary/20"
      : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
  );

  if (href) {
    return (
      <Link href={href} className={className}>
        {content}
      </Link>
    );
  }

  return <button className={className}>{content}</button>;
};

export default SportsMatchesSidebar;
