"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Banknote, PlusCircle, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import { MOCK_LIVE_EVENTS } from "@/data/live-events.data";

const LiveEventsSection: React.FC = () => {
  const liveEvents = MOCK_LIVE_EVENTS;

  return (
    <section className="w-full container mx-auto mt-8 relative">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-black text-foreground flex items-center gap-3 decoration-primary decoration-2">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
          </span>
          Live Market Activity
        </h2>
        <Badge
          variant="outline"
          className="text-primary border-primary/20 bg-primary/5 px-4 py-1 font-black uppercase tracking-widest text-[10px]"
        >
          {liveEvents.length} Matches in Play
        </Badge>
      </div>

      <Carousel opts={{ align: "start", loop: false }} className="w-full group">
        <CarouselContent className="-ml-6">
          {liveEvents.map((event) => (
            <CarouselItem
              key={event.id}
              className="pl-6 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
            >
              <div className="group/card relative h-full overflow-hidden rounded-lg border border-border bg-card p-6 transition-all hover:border-primary/50">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-1.5 bg-rose-500/10 px-2 py-0.5 rounded-full text-[9px] font-black text-rose-500 uppercase tracking-widest border border-rose-500/10 w-fit">
                      <span className="size-1 rounded-full bg-rose-500 animate-pulse"></span>
                      Live {event.time}
                    </div>
                    <div className="flex items-center gap-1.5 opacity-60">
                      <Image
                        src={event.league.flag}
                        alt={event.league.country}
                        width={14}
                        height={10}
                        className="rounded-[2px] object-cover"
                      />
                      <span className="text-[10px] font-black text-foreground uppercase tracking-tighter">
                        {event.league.name}
                      </span>
                    </div>
                  </div>
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="size-6 rounded-full border-2 border-card bg-muted overflow-hidden"
                      >
                        <Image
                          src={`https://i.pravatar.cc/100?u=${event.id + i}`}
                          alt="user"
                          width={20}
                          height={20}
                          className="object-cover"
                        />
                      </div>
                    ))}
                    <div className="size-6 rounded-full border-2 border-card bg-primary/10 text-primary flex items-center justify-center text-[8px] font-black">
                      +{event.p2pStats.activeBets}
                    </div>
                  </div>
                </div>

                {/* Match Display */}
                <div className="relative flex items-center justify-between mb-8 px-2">
                  <div className="flex flex-col items-center gap-2">
                    <div className="relative size-14 rounded-full bg-muted p-1 overflow-hidden border border-border">
                      <Image
                        src={event.teamA.image}
                        alt={event.teamA.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <span className="text-[10px] font-black text-center max-w-[70px] leading-tight uppercase truncate">
                      {event.teamA.name}
                    </span>
                  </div>

                  <div className="flex flex-col items-center">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl font-black text-foreground">
                        {event.teamA.score}
                      </span>
                      <span className="text-lg font-black text-muted-foreground/20">
                        :
                      </span>
                      <span className="text-3xl font-black text-foreground">
                        {event.teamB.score}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col items-center gap-2">
                    <div className="relative size-14 rounded-full bg-muted p-1 overflow-hidden border border-border">
                      <Image
                        src={event.teamB.image}
                        alt={event.teamB.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <span className="text-[10px] font-black text-center max-w-[70px] leading-tight uppercase truncate">
                      {event.teamB.name}
                    </span>
                  </div>
                </div>

                {/* P2P Stats Grid */}
                <div className="grid grid-cols-2 gap-4 p-4 bg-muted/30 rounded-lg border border-border/50 mb-6">
                  <div className="flex flex-col">
                    <span className="text-[9px] font-black text-muted-foreground uppercase flex items-center gap-1 mb-1">
                      <Banknote className="size-3 text-emerald-500" />
                      Total Pot
                    </span>
                    <span className="text-base font-black text-foreground">
                      ${event.p2pStats.potAmount.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[9px] font-black text-muted-foreground uppercase flex items-center gap-1 mb-1">
                      <Search className="size-3 text-blue-500" />
                      Open Bets
                    </span>
                    <span className="text-base font-black text-foreground">
                      {event.p2pStats.openBets} Waiting
                    </span>
                  </div>
                </div>

                {/* CTAs */}
                <div className="flex items-center gap-2 mt-auto">
                  <Button
                    className="flex-1 bg-primary hover:bg-primary/90 text-white font-black text-[10px] uppercase tracking-widest h-11 rounded-lg"
                    asChild
                  >
                    <Link href={`/matches/football/${event.id}`}>
                      Browse Market
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="size-11 rounded-lg border-border hover:bg-muted text-foreground transition-all shrink-0"
                    asChild
                  >
                    <Link href={`/matches/football/${event.id}?action=create`}>
                      <PlusCircle className="size-5" />
                    </Link>
                  </Button>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Custom Navigation */}
        <CarouselPrevious className="hidden sm:flex -left-4 size-10 border-border bg-card hover:bg-primary hover:border-primary hover:text-white transition-all opacity-0 group-hover:opacity-100 cursor-pointer" />
        <CarouselNext className="hidden sm:flex -right-4 size-10 border-border bg-card hover:bg-primary hover:border-primary hover:text-white transition-all opacity-0 group-hover:opacity-100 cursor-pointer" />
      </Carousel>
    </section>
  );
};

export default LiveEventsSection;
