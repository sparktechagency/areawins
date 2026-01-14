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
import Image from "next/image";
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
  odds: {
    home: string;
    draw: string;
    away: string;
  };
}

const footballMatches: FootballMatch[] = [
  {
    id: 1,
    date: "Today",
    time: "12:00",
    venue: "Stamford Bridge",
    league: {
      name: "Premier League",
      country: "England",
      flag: "https://flagcdn.com/w40/gb-eng.png",
    },
    teamA: {
      name: "Chelsea",
      image: "https://images.unsplash.com/photo-1546519638-68e109498ffc",
    },
    teamB: {
      name: "Leicester C",
      image: "https://images.unsplash.com/photo-1546519638-68e109498ffc",
    },
    odds: {
      home: "+1.56",
      draw: "+1.56",
      away: "+1.56",
    },
  },
  {
    id: 2,
    date: "Today",
    time: "12:00",
    venue: "Anfield",
    league: {
      name: "Premier League",
      country: "England",
      flag: "https://flagcdn.com/w40/gb-eng.png",
    },
    teamA: {
      name: "Liverpool",
      image: "https://images.unsplash.com/photo-1546519638-68e109498ffc",
    },
    teamB: {
      name: "Everton",
      image: "https://images.unsplash.com/photo-1546519638-68e109498ffc",
    },
    odds: {
      home: "+1.56",
      draw: "+1.56",
      away: "+1.56",
    },
  },
];

const FootballSection: React.FC = () => {
  return (
    <section className="w-full container mx-auto mt-10">
      <div className="flex flex-col items-center mb-6">
        <h2 className="text-xl md:text-2xl text-foreground font-semibold">
          Football Upcoming
        </h2>
      </div>

      <div className="w-full rounded-xl border border-border bg-card overflow-hidden">
        <div className="overflow-x-auto no-scrollbar">
          <Table>
            <TableHeader className="bg-primary hover:bg-primary/95">
              <TableRow className="hover:bg-transparent border-none">
                <TableHead className="w-[100px] text-foreground font-bold py-3 pl-6">
                  Date
                </TableHead>
                <TableHead className="w-[140px] text-foreground font-bold py-3">
                  League
                </TableHead>
                <TableHead className="w-[160px] text-foreground font-bold py-3">
                  Venue
                </TableHead>
                <TableHead className="text-right text-foreground font-bold py-3">
                  Team 1
                </TableHead>
                <TableHead className="w-[70px] text-center text-foreground font-bold py-3">
                  1
                </TableHead>
                <TableHead className="w-[70px] text-center text-foreground font-bold py-3">
                  X
                </TableHead>
                <TableHead className="w-[70px] text-center text-foreground font-bold py-3">
                  2
                </TableHead>
                <TableHead className="text-left text-foreground font-bold py-3">
                  Team 2
                </TableHead>
                <TableHead className="w-[100px] text-center text-foreground font-bold py-3 pr-6">
                  Set
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {footballMatches.map((match) => (
                <TableRow
                  key={match.id}
                  className="hover:bg-muted/30 transition-colors border-border"
                >
                  <TableCell className="pl-6 py-4">
                    <div className="text-[12px] font-medium leading-tight">
                      {match.time} <br /> {match.date}
                    </div>
                  </TableCell>
                  <TableCell className="py-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground whitespace-nowrap">
                      <Image
                        src={match.league.flag}
                        alt=""
                        width={16}
                        height={12}
                        className="rounded-sm shrink-0"
                      />
                      <span className="truncate max-w-[120px]">
                        {match.league.name}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="py-4">
                    <div className="text-sm text-muted-foreground truncate max-w-[150px]">
                      {match.venue}
                    </div>
                  </TableCell>
                  <TableCell className="text-right py-4">
                    <div className="flex items-center gap-2 justify-end">
                      <span className="text-sm font-semibold leading-tight">
                        {match.teamA.name}
                      </span>
                      <Image
                        src={match.teamA.image}
                        alt={match.teamA.name}
                        width={28}
                        height={28}
                        className="h-7 w-7 rounded-full object-cover border border-border shrink-0"
                      />
                    </div>
                  </TableCell>

                  {/* Odds */}
                  <TableCell className="px-1 py-4">
                    <button className="w-full bg-muted hover:bg-muted/80 py-2 rounded text-[11px] font-bold border border-border/50 transition-colors cursor-pointer">
                      {match.odds.home}
                    </button>
                  </TableCell>
                  <TableCell className="px-1 py-4">
                    <button className="w-full bg-muted hover:bg-muted/80 py-2 rounded text-[11px] font-bold border border-border/50 transition-colors cursor-pointer">
                      {match.odds.draw}
                    </button>
                  </TableCell>
                  <TableCell className="px-1 py-4">
                    <button className="w-full bg-muted hover:bg-muted/80 py-2 rounded text-[11px] font-bold border border-border/50 transition-colors cursor-pointer">
                      {match.odds.away}
                    </button>
                  </TableCell>

                  <TableCell className="text-left py-4">
                    <div className="flex items-center gap-2 justify-start">
                      <Image
                        src={match.teamB.image}
                        alt={match.teamB.name}
                        width={28}
                        height={28}
                        className="h-7 w-7 rounded-full object-cover border border-border shrink-0"
                      />
                      <span className="text-sm font-semibold leading-tight">
                        {match.teamB.name}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center pr-6 py-4">
                    <Button
                      size="sm"
                      className="bg-[#00d65c] hover:bg-[#00b84d] text-white text-[10px] font-bold uppercase py-1 px-4 h-8 cursor-pointer"
                    >
                      Bet
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
