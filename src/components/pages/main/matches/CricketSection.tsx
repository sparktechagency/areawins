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
import Link from "next/link";
import React from "react";

interface CricketMatch {
  id: number;
  date: string;
  time: string;
  venue: string;
  league: string;
  teamA: string;
  teamB: string;
  p2pStats: {
    activeBets: number;
    potAmount: number;
    availableBets: number;
  };
}

const cricketMatches: CricketMatch[] = [
  {
    id: 1,
    date: "Today",
    time: "19:30",
    venue: "Chennai",
    league: "IPL T20",
    teamA: "CSK",
    teamB: "RCB",
    p2pStats: { activeBets: 42, potAmount: 12500, availableBets: 18 },
  },
  {
    id: 2,
    date: "Tomorrow",
    time: "15:00",
    venue: "Melbourne",
    league: "Big Bash",
    teamA: "Stars",
    teamB: "Strikers",
    p2pStats: { activeBets: 15, potAmount: 3800, availableBets: 4 },
  },
];

const CricketSection: React.FC = () => {
  return (
    <section className="w-full container mx-auto mt-12">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-black text-foreground uppercase tracking-tight flex items-center gap-3">
          <span className="size-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-lg">
            🏏
          </span>
          Cricket Markets
        </h2>
        <Button
          variant="ghost"
          className="text-xs font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors"
        >
          Explore T20 Markets
        </Button>
      </div>

      <div className="w-full rounded-[32px] border border-border bg-card overflow-hidden">
        <div className="overflow-x-auto no-scrollbar">
          <Table>
            <TableHeader className="bg-muted/30">
              <TableRow className="hover:bg-transparent border-border/50">
                <TableHead className="py-5 pl-8 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                  Time
                </TableHead>
                <TableHead className="py-5 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                  League
                </TableHead>
                <TableHead className="py-5 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                  Match
                </TableHead>
                <TableHead className="py-5 text-center text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                  🎯 Bets
                </TableHead>
                <TableHead className="py-5 text-center text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                  💰 Pot
                </TableHead>
                <TableHead className="py-5 pr-8 text-right text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                  Browse
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cricketMatches.map((match) => (
                <TableRow
                  key={match.id}
                  className="hover:bg-muted/20 border-border/50"
                >
                  <TableCell className="pl-8 py-6 font-black text-sm">
                    {match.time}
                  </TableCell>
                  <TableCell className="text-[11px] font-black uppercase text-foreground">
                    {match.league}
                  </TableCell>
                  <TableCell className="text-xs font-black text-foreground">
                    {match.teamA} VS {match.teamB}
                  </TableCell>
                  <TableCell className="text-center font-black text-primary">
                    {match.p2pStats.activeBets}
                  </TableCell>
                  <TableCell className="text-center font-black text-foreground">
                    ${match.p2pStats.potAmount.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right pr-8">
                    <Button
                      asChild
                      size="sm"
                      className="h-9 rounded-xl bg-primary hover:bg-primary/90 text-white text-[10px] font-black uppercase tracking-widest"
                    >
                      <Link href={`/matches/cricket/${match.id}`}>
                        Market <ChevronRight className="size-3.5 ml-1" />
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

export default CricketSection;
