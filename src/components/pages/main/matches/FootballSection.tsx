"use client";

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
    id: 3,
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
    id: 4,
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
];

const FootballSection: React.FC = () => {
  return (
    <section className="w-full container mx-auto mt-10 overflow-hidden">
      <div className="flex flex-col items-center mb-8">
        <h2 className="text-xl md:text-2xl text-foreground font-semibold">
          Football Upcoming
        </h2>
      </div>

      <div className="w-full bg-card rounded-xl border border-border overflow-hidden ">
        {/* Table Header */}
        <div className="grid grid-cols-[250px_1fr_250px_1fr_100px] gap-4 bg-primary/90 py-2 px-6 text-sm font-medium text-foreground/80 items-center">
          <div className="pl-4">Date/League/Venue</div>
          <div className="text-right">Team 1</div>
          <div className="grid grid-cols-3 text-center">
            <span>1</span>
            <span>X</span>
            <span>2</span>
          </div>
          <div className="text-left">Team 2</div>
          <div className="text-center pr-4">Set</div>
        </div>

        {/* Table Rows */}
        <div className="divide-y divide-border">
          {footballMatches.map((match) => (
            <div
              key={match.id}
              className="grid grid-cols-[250px_1fr_250px_1fr_100px] gap-4 py-4 px-6 items-center bg-background hover:bg-muted/30 transition-colors"
            >
              {/* Match Info */}
              <div className="pl-4 flex flex-col gap-0.5">
                <span className="text-[12px] font-bold text-foreground">
                  {match.date}, {match.time}
                </span>
                <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                  <Image
                    src={match.league.flag}
                    alt=""
                    width={14}
                    height={10}
                    className="rounded-sm"
                  />
                  {match.league.name}
                </span>
                <span className="text-[10px] text-muted-foreground/80 italic">
                  {match.venue}
                </span>
              </div>

              {/* Team A */}
              <div className="flex items-center gap-3 justify-end">
                <span className="text-sm font-medium text-right">
                  {match.teamA.name}
                </span>
                <Image
                  src={match.teamA.image}
                  alt={match.teamA.name}
                  width={32}
                  height={32}
                  className="h-8 w-8 rounded-full object-cover border border-border"
                />
              </div>

              {/* Odds */}
              <div className="grid grid-cols-3 gap-2 px-2">
                <button className="bg-muted/50 hover:bg-muted py-2 px-1 rounded text-xs font-bold border border-border/50">
                  {match.odds.home}
                </button>
                <button className="bg-muted/50 hover:bg-muted py-2 px-1 rounded text-xs font-bold border border-border/50">
                  {match.odds.draw}
                </button>
                <button className="bg-muted/50 hover:bg-muted py-2 px-1 rounded text-xs font-bold border border-border/50">
                  {match.odds.away}
                </button>
              </div>

              {/* Team B */}
              <div className="flex items-center gap-3 justify-start">
                <Image
                  src={match.teamB.image}
                  alt={match.teamB.name}
                  width={32}
                  height={32}
                  className="h-8 w-8 rounded-full object-cover border border-border"
                />
                <span className="text-sm font-medium">{match.teamB.name}</span>
              </div>

              {/* Bet Button */}
              <div className="flex justify-end pr-4">
                <button className="bg-[#00d65c] hover:bg-[#00b84d] text-white text-[10px] font-bold py-2 px-6 rounded-md uppercase tracking-wider shadow-sm transition-all focus:ring-2 focus:ring-primary/20">
                  Bet
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FootballSection;
