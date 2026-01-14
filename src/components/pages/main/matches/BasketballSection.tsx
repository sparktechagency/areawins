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

interface BasketballMatch {
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

const basketballMatches: BasketballMatch[] = [
  {
    id: 1,
    date: "Today",
    time: "19:30",
    venue: "TD Garden, Boston",
    league: {
      name: "NBA Finals",
      country: "USA",
      flag: "https://flagcdn.com/w40/us.png",
    },
    teamA: {
      name: "Celtics",
      image: "https://images.unsplash.com/photo-1570498839593-e565b39455fc",
    },
    teamB: {
      name: "Mavericks",
      image: "https://images.unsplash.com/photo-1570498839593-e565b39455fc",
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
    time: "21:00",
    venue: "Staples Center, LA",
    league: {
      name: "NBA Regular",
      country: "USA",
      flag: "https://flagcdn.com/w40/us.png",
    },
    teamA: {
      name: "Lakers",
      image: "https://images.unsplash.com/photo-1570498839593-e565b39455fc",
    },
    teamB: {
      name: "Warriors",
      image: "https://images.unsplash.com/photo-1570498839593-e565b39455fc",
    },
    odds: {
      home: "+1.56",
      draw: "+1.56",
      away: "+1.56",
    },
  },
];

const BasketballSection: React.FC = () => {
  return (
    <section className="w-full container mx-auto mt-10 overflow-hidden">
      <div className="flex flex-col items-center mb-8">
        <h2 className="text-xl md:text-2xl text-foreground font-semibold">
          Basketball Upcoming
        </h2>
      </div>

      <div className="w-full bg-card rounded-xl border border-border overflow-hidden">
        {/* Table Header */}
        <div className="grid grid-cols-[100px_140px_160px_1fr_60px_60px_60px_1fr_100px] gap-2 bg-primary/90 py-2 px-6 text-[12px] font-bold text-foreground items-center">
          <div className="pl-2">Date</div>
          <div>League</div>
          <div>Venue</div>
          <div className="text-right">Team 1</div>
          <div className="text-center">1</div>
          <div className="text-center">X</div>
          <div className="text-center">2</div>
          <div className="text-left">Team 2</div>
          <div className="text-center pr-2">Set</div>
        </div>

        {/* Table Rows */}
        <div className="divide-y divide-border">
          {basketballMatches.map((match) => (
            <div
              key={match.id}
              className="grid grid-cols-[100px_140px_160px_1fr_60px_60px_60px_1fr_100px] gap-2 py-4 px-6 items-center bg-background hover:bg-muted/30 transition-colors"
            >
              {/* Date */}
              <div className="pl-2 text-[12px] font-medium text-foreground">
                {match.time} <br /> {match.date}
              </div>

              {/* League */}
              <div className="text-sm text-muted-foreground flex items-center gap-1.5 truncate">
                <Image
                  src={match.league.flag}
                  alt=""
                  width={16}
                  height={12}
                  className="rounded-sm shrink-0"
                />
                <span className="truncate">{match.league.name}</span>
              </div>

              {/* Venue */}
              <div className="text-sm text-muted-foreground/80  truncate pr-2">
                {match.venue}
              </div>

              {/* Team A */}
              <div className="flex items-center gap-2 justify-end">
                <span className="text-sm font-semibold text-right leading-tight">
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

              {/* Odds 1 */}
              <div className="flex justify-center">
                <button className="bg-muted px-1 py-2 rounded text-[11px] font-bold border border-border/50 hover:bg-muted/80 transition-colors w-full mx-0.5">
                  {match.odds.home}
                </button>
              </div>

              {/* Odds X */}
              <div className="flex justify-center">
                <button className="bg-muted px-1 py-2 rounded text-[11px] font-bold border border-border/50 hover:bg-muted/80 transition-colors w-full mx-0.5">
                  {match.odds.draw}
                </button>
              </div>

              {/* Odds 2 */}
              <div className="flex justify-center">
                <button className="bg-muted px-1 py-2 rounded text-[11px] font-bold border border-border/50 hover:bg-muted/80 transition-colors w-full mx-0.5">
                  {match.odds.away}
                </button>
              </div>

              {/* Team B */}
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

              {/* Bet Button */}
              <div className="flex justify-end pr-2">
                <button className="bg-[#00d65c] hover:bg-[#00b84d] text-white text-[10px] font-bold py-2 px-6 rounded-md uppercase tracking-wider shadow-sm transition-all">
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

export default BasketballSection;
