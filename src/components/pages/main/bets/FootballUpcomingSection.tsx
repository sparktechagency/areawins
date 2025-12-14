"use client";

import Image from "next/image";
import React from "react";

interface Match {
  date: string;
  homeTeam: string;
  awayTeam: string;
  homeLogo: string;
  awayLogo: string;
  odds1: string;
  oddsX: string;
  odds2: string;
  total: string;
}

const matches: Match[] = [
  {
    date: "12:00 Today",
    homeTeam: "Chelsea",
    awayTeam: "Leicester C",
    homeLogo:
      "https://upload.wikimedia.org/wikipedia/en/thumb/c/cc/Chelsea_FC.svg/1200px-Chelsea_FC.svg.png",
    awayLogo:
      "https://upload.wikimedia.org/wikipedia/en/thumb/6/63/Leicester_City_crest.svg/1200px-Leicester_City_crest.svg.png",
    odds1: "1.65",
    oddsX: "3.15",
    odds2: "5.86",
    total: "1.89",
  },
  {
    date: "12:00 Today",
    homeTeam: "Chelsea",
    awayTeam: "Leicester C",
    homeLogo:
      "https://upload.wikimedia.org/wikipedia/en/thumb/c/cc/Chelsea_FC.svg/1200px-Chelsea_FC.svg.png",
    awayLogo:
      "https://upload.wikimedia.org/wikipedia/en/thumb/6/63/Leicester_City_crest.svg/1200px-Leicester_City_crest.svg.png",
    odds1: "1.36",
    oddsX: "3.15",
    odds2: "11.36",
    total: "1.56",
  },
  {
    date: "12:00 Today",
    homeTeam: "Chelsea",
    awayTeam: "Leicester C",
    homeLogo:
      "https://upload.wikimedia.org/wikipedia/en/thumb/c/cc/Chelsea_FC.svg/1200px-Chelsea_FC.svg.png",
    awayLogo:
      "https://upload.wikimedia.org/wikipedia/en/thumb/6/63/Leicester_City_crest.svg/1200px-Leicester_City_crest.svg.png",
    odds1: "1.36",
    oddsX: "3.15",
    odds2: "11.36",
    total: "1.56",
  },
  {
    date: "12:00 Today",
    homeTeam: "Chelsea",
    awayTeam: "Leicester C",
    homeLogo:
      "https://upload.wikimedia.org/wikipedia/en/thumb/c/cc/Chelsea_FC.svg/1200px-Chelsea_FC.svg.png",
    awayLogo:
      "https://upload.wikimedia.org/wikipedia/en/thumb/6/63/Leicester_City_crest.svg/1200px-Leicester_City_crest.svg.png",
    odds1: "1.36",
    oddsX: "3.15",
    odds2: "11.36",
    total: "1.26",
  },
  // Add more as needed
];

const FootballUpcomingSection: React.FC = () => {
  return (
    <section className="w-full px-5 container mx-auto bg-background rounded-lg overflow-hidden py-5 md:py-10 border border-border col-span-full">
      {/* Header */}
      <div className="py-4">
        <h2 className="text-center text-xl font-semibold text-foreground">
          Football Upcoming
        </h2>
      </div>

      {/* Table Header */}
      <div className="bg-primary text-primary-foreground grid grid-cols-12 gap-4 py-3 px-6 text-sm font-medium">
        <div className="col-span-2">Date</div>
        <div className="col-span-5 text-center">1 Draw 1</div>
        <div className="col-span-3 text-center">Total</div>
        <div className="col-span-2 text-center">Bet</div>
      </div>

      {/* Match Rows */}
      {matches.map((match, index) => (
        <div
          key={index}
          className="grid grid-cols-12 gap-4 py-4 px-6 items-center text-sm border-b border-border last:border-b-0 /50 transition-colors"
        >
          {/* Date */}
          <div className="col-span-2 text-muted-foreground">{match.date}</div>

          {/* Teams & Odds */}
          <div className="col-span-5 flex items-center justify-center gap-3">
            <div className="flex items-center gap-2">
              <Image
                src={match.homeLogo}
                alt={match.homeTeam}
                width={32}
                height={32}
                className="w-8 h-8 object-contain"
              />
              <span className="font-medium text-foreground">{match.homeTeam}</span>
            </div>

            <div className="flex gap-2">
              <span className="bg-accent text-foreground px-3 py-1 rounded text-center min-w-[50px]">
                +{match.odds1}
              </span>
              <span className="bg-accent text-foreground px-3 py-1 rounded text-center min-w-[50px]">
                +{match.oddsX}
              </span>
              <span className="bg-accent text-foreground px-3 py-1 rounded text-center min-w-[50px]">
                +{match.odds2}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Image
                src={match.awayLogo}
                alt={match.awayTeam}
                width={32}
                height={32}
                className="w-8 h-8 object-contain"
              />
              <span className="font-medium text-foreground">{match.awayTeam}</span>
            </div>
          </div>

          {/* Total */}
          <div className="col-span-3 text-center text-foreground">
            +{match.total}
          </div>

          {/* Bet Button */}
          <div className="col-span-2 text-center">
            <button className="bg-primary text-primary-foreground px-6 py-2 rounded font-medium hover:bg-primary/90">
              Bet
            </button>
          </div>
        </div>
      ))}

      {/* See more */}
      <div className="text-center py-4 text-primary cursor-pointer font-medium hover:underline">
        See more...
      </div>
    </section>
  );
};

export default FootballUpcomingSection;
