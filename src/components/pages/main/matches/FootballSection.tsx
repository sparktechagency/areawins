"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Team {
  name: string;
  image: string;
}

interface League {
  name: string;
  country: string;
  flag: string;
}

interface FootballMatch {
  id: number;
  date: string;
  time: string;
  venue: string;
  league: League;
  teamA: Team;
  teamB: Team;
  p2pStats: {
    activeBets: number;
    potAmount: number;
    availableBets: number;
  };
}

const footballMatches: FootballMatch[] = [
  {
    id: 1,
    date: "Today",
    time: "20:00",
    venue: "Stamford Bridge",
    league: {
      name: "Premier League",
      country: "England",
      flag: "https://flagcdn.com/w40/gb-eng.png",
    },
    teamA: { name: "Chelsea", image: "https://i.pravatar.cc/100?u=c" },
    teamB: { name: "Leicester", image: "https://i.pravatar.cc/100?u=l" },
    p2pStats: { activeBets: 12, potAmount: 4500, availableBets: 8 },
  },
  {
    id: 2,
    date: "Today",
    time: "22:00",
    venue: "Anfield",
    league: {
      name: "Premier League",
      country: "England",
      flag: "https://flagcdn.com/w40/gb-eng.png",
    },
    teamA: { name: "Liverpool", image: "https://i.pravatar.cc/100?u=lp" },
    teamB: { name: "Everton", image: "https://i.pravatar.cc/100?u=e" },
    p2pStats: { activeBets: 24, potAmount: 8200, availableBets: 15 },
  },
];

const FootballSection: React.FC = () => {
  return (
    <section className="w-full container mx-auto mt-12">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-black text-foreground uppercase tracking-tight flex items-center gap-3">
          <span className="size-8 rounded-lg bg-green-500/10 flex items-center justify-center text-lg">
            ⚽
          </span>
          Football Markets
        </h2>
        <Button
          variant="ghost"
          className="text-xs font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors"
        >
          View All Markets
        </Button>
      </div>

      <div className="w-full rounded-[32px] border border-border bg-card overflow-hidden">
        <div className="overflow-x-auto no-scrollbar">
          <Table>
            <TableHeader className="bg-muted/30">
              <TableRow className="hover:bg-transparent border-border/50">
                <TableHead className="py-5 pl-8 text-[10px] font-black uppercase tracking-widest text-muted-foreground whitespace-nowrap">
                  Schedule
                </TableHead>
                <TableHead className="py-5 text-[10px] font-black uppercase tracking-widest text-muted-foreground whitespace-nowrap">
                  Competitions
                </TableHead>
                <TableHead className="py-5 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                  Match Match-Up
                </TableHead>
                <TableHead className="py-5 text-center text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                  🎯 Active
                </TableHead>
                <TableHead className="py-5 text-center text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                  💰 Pot Size
                </TableHead>
                <TableHead className="py-5 text-center text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                  📊 Open
                </TableHead>
                <TableHead className="py-5 pr-8 text-right text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {footballMatches.map((match) => (
                <TableRow
                  key={match.id}
                  className="hover:bg-muted/20 transition-all border-border/50 group"
                >
                  <TableCell className="pl-8 py-6">
                    <div className="flex flex-col">
                      <span className="text-sm font-black text-foreground">
                        {match.time}
                      </span>
                      <span className="text-[10px] font-bold text-muted-foreground uppercase">
                        {match.date}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 group-hover:translate-x-1 transition-transform">
                      <Image
                        src={match.league.flag}
                        alt=""
                        width={16}
                        height={12}
                        className="rounded-sm"
                      />
                      <span className="text-[11px] font-black text-foreground uppercase tracking-tight">
                        {match.league.name}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-4">
                      <div className="flex flex-col items-end gap-1">
                        <span className="text-xs font-black text-foreground">
                          {match.teamA.name}
                        </span>
                      </div>
                      <span className="text-[10px] font-black text-muted-foreground/30 px-2 italic">
                        VS
                      </span>
                      <div className="flex flex-col items-start gap-1">
                        <span className="text-xs font-black text-foreground">
                          {match.teamB.name}
                        </span>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell className="text-center">
                    <span className="text-xs font-black text-primary bg-primary/5 px-3 py-1 rounded-full border border-primary/10">
                      {match.p2pStats.activeBets}
                    </span>
                  </TableCell>

                  <TableCell className="text-center font-black text-foreground">
                    ${match.p2pStats.potAmount.toLocaleString()}
                  </TableCell>

                  <TableCell className="text-center font-black text-foreground">
                    {match.p2pStats.availableBets}
                  </TableCell>

                  <TableCell className="text-right pr-8">
                    <Button
                      asChild
                      size="sm"
                      className="h-9 rounded-xl bg-primary hover:bg-primary/90 text-white text-[10px] font-black uppercase tracking-widest px-6"
                    >
                      <Link href={`/matches/football/${match.id}`}>
                        Market
                        <ChevronRight className="size-3.5 ml-1" />
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </section>
  );
};

export default FootballSection;
