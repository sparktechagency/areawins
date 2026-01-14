"use client";

import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import React from "react";

/* =======================
   Types
 ======================= */

interface Team {
  name: string;
  score: number;
  image: string;
}

interface League {
  name: string;
  country: string;
  flag: string;
}

interface LiveEvent {
  id: number;
  time: string;
  sport: "Football";
  league: League;
  teamA: Team;
  teamB: Team;
}

const liveEvents: LiveEvent[] = [
  {
    id: 1,
    time: "45:20",
    sport: "Football",
    league: {
      name: "La Liga",
      country: "Spain",
      flag: "https://flagcdn.com/w40/es.png",
    },
    teamA: {
      name: "Barcelona",
      score: 2,
      image:
        "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=100&auto=format&fit=crop",
    },
    teamB: {
      name: "Real Madrid",
      score: 1,
      image:
        "https://images.unsplash.com/photo-1522778119026-d647f0596c20?q=80&w=100&auto=format&fit=crop",
    },
  },
  {
    id: 2,
    time: "63:10",
    sport: "Football",
    league: {
      name: "Premier League",
      country: "England",
      flag: "https://flagcdn.com/w40/gb-eng.png",
    },
    teamA: {
      name: "Chelsea",
      score: 3,
      image:
        "https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=100&auto=format&fit=crop",
    },
    teamB: {
      name: "Arsenal",
      score: 2,
      image:
        "https://images.unsplash.com/photo-1620506603004-972109673967?q=80&w=100&auto=format&fit=crop",
    },
  },
  {
    id: 3,
    time: "28:55",
    sport: "Football",
    league: {
      name: "Serie A",
      country: "Italy",
      flag: "https://flagcdn.com/w40/it.png",
    },
    teamA: {
      name: "AC Milan",
      score: 1,
      image:
        "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=100&auto=format&fit=crop",
    },
    teamB: {
      name: "Inter Milan",
      score: 1,
      image:
        "https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=100&auto=format&fit=crop",
    },
  },
  {
    id: 4,
    time: "71:42",
    sport: "Football",
    league: {
      name: "Bundesliga",
      country: "Germany",
      flag: "https://flagcdn.com/w40/de.png",
    },
    teamA: {
      name: "Bayern Munich",
      score: 4,
      image:
        "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?q=80&w=100&auto=format&fit=crop",
    },
    teamB: {
      name: "Dortmund",
      score: 2,
      image:
        "https://images.unsplash.com/photo-1518098268026-4e89f1a2cd8e?q=80&w=100&auto=format&fit=crop",
    },
  },
];

const LiveEventsSection: React.FC = () => {
  return (
    <section className="w-full container mx-auto mt-8 relative">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-foreground flex items-center gap-3">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
          </span>
          Live Events
        </h2>
        <Badge
          variant="outline"
          className="text-primary border-primary/20 bg-primary/5 px-4 py-1"
        >
          {liveEvents.length} Matches Live
        </Badge>
      </div>

      <Carousel opts={{ align: "start", loop: false }} className="w-full group">
        <CarouselContent className="-ml-6">
          {liveEvents.map((event) => (
            <CarouselItem
              key={event.id}
              className="pl-6 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
            >
              <div className="group/card relative h-full overflow-hidden rounded-2xl border border-border bg-card p-5 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5">
                {/* Background Decor */}
                <div className="absolute -right-4 -top-4 size-24 bg-primary/5 rounded-full blur-3xl group-hover/card:bg-primary/10 transition-colors"></div>

                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1.5 bg-rose-500/10 px-2 py-0.5 rounded text-[10px] font-bold text-rose-500 uppercase tracking-wider border border-rose-500/20">
                      <span className="size-1.5 rounded-full bg-rose-500 animate-pulse"></span>
                      Live
                    </div>
                    <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-tight">
                      {event.time}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-primary/5 px-2 py-1 rounded-full border border-border">
                    <Image
                      src={event.league.flag}
                      alt={event.league.country}
                      width={14}
                      height={10}
                      className="rounded-[2px] object-cover"
                    />
                    <span className="text-[10px] font-bold text-foreground/80">
                      {event.league.name}
                    </span>
                  </div>
                </div>

                {/* Match Display */}
                <div className="relative flex flex-col gap-6">
                  {/* Home Team */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="relative size-12 rounded-xl bg-muted/50 p-1 border border-border overflow-hidden">
                        <Image
                          src={event.teamA.image}
                          alt={event.teamA.name}
                          fill
                          className="object-cover transition-transform group-hover/card:scale-110"
                        />
                      </div>
                      <span className="text-sm font-bold text-foreground line-clamp-1">
                        {event.teamA.name}
                      </span>
                    </div>
                    <span className="text-3xl font-black text-primary drop-shadow-sm">
                      {event.teamA.score}
                    </span>
                  </div>

                  {/* Divider with VS */}
                  <div className="relative flex items-center justify-center py-1">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-dashed border-border"></div>
                    </div>
                    <span className="relative bg-card px-3 text-[10px] font-black text-muted-foreground/40 uppercase tracking-widest italic">
                      VS
                    </span>
                  </div>

                  {/* Away Team */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="relative size-12 rounded-xl bg-muted/50 p-1 border border-border overflow-hidden">
                        <Image
                          src={event.teamB.image}
                          alt={event.teamB.name}
                          fill
                          className="object-cover transition-transform group-hover/card:scale-110"
                        />
                      </div>
                      <span className="text-sm font-bold text-foreground line-clamp-1">
                        {event.teamB.name}
                      </span>
                    </div>
                    <span className="text-3xl font-black text-primary drop-shadow-sm">
                      {event.teamB.score}
                    </span>
                  </div>
                </div>

                {/* Watch Live Button */}
                <div className="mt-8">
                  <button className="w-full text-[11px] font-bold py-2.5 rounded-lg uppercase tracking-widest transition-all bg-background text-primary border border-primary cursor-pointer">
                    View Match Details
                  </button>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Custom Navigation */}
        <CarouselPrevious className="hidden sm:flex -left-4 size-10 border-border bg-card shadow-lg hover:bg-primary hover:border-primary hover:text-white transition-all opacity-0 group-hover:opacity-100 cursor-pointer" />
        <CarouselNext className="hidden sm:flex -right-4 size-10 border-border bg-card shadow-lg hover:bg-primary hover:border-primary hover:text-white transition-all opacity-0 group-hover:opacity-100 cursor-pointer" />
      </Carousel>
    </section>
  );
};

export default LiveEventsSection;
