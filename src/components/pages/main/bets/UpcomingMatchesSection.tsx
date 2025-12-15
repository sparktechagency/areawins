"use client";

import Image from "next/image";
import React from "react";

interface UpcomingMatch {
  homeTeam: string;
  awayTeam: string;
  homeLogo: string;
  awayLogo: string;
}

const upcomingMatches: UpcomingMatch[] = [
  {
    homeTeam: "Chelsea",
    awayTeam: "Leicester C",
    homeLogo:
      "https://upload.wikimedia.org/wikipedia/en/thumb/c/cc/Chelsea_FC.svg/1200px-Chelsea_FC.svg.png",
    awayLogo:
      "https://upload.wikimedia.org/wikipedia/en/thumb/6/63/Leicester_City_crest.svg/1200px-Leicester_City_crest.svg.png",
  },
  {
    homeTeam: "Chelsea",
    awayTeam: "Leicester C",
    homeLogo:
      "https://upload.wikimedia.org/wikipedia/en/thumb/c/cc/Chelsea_FC.svg/1200px-Chelsea_FC.svg.png",
    awayLogo:
      "https://upload.wikimedia.org/wikipedia/en/thumb/6/63/Leicester_City_crest.svg/1200px-Leicester_City_crest.svg.png",
  },
  // Add more matches as needed
];

const UpcomingMatchesSection: React.FC = () => {
  return (
    <section className="w-fullcontainer mx-auto w-full py-5">
      {/* Registration Prompt */}
      <div className="text-center mb-8">
        <p className="text-muted-foreground text-lg mb-4">
          Create bet so please registration
        </p>
        <button className="border border-border px-8 py-3 rounded-full font-medium   text-foreground cursor-pointer hover:bg-primary hover:text-primary-foreground transition-all duration-300">
          Registration now
        </button>
      </div>

      {/* Upcoming Matches Cards */}
      <div className="flex flex-col gap-8">
        {upcomingMatches.map((match, index) => (
          <div
            key={index}
            className="bg-card rounded-2xl p-8 flex flex-col items-center justify-between border border-border"
          >
            <p className="text-muted-foreground text-sm mb-6">Upcoming match</p>

            <div className="flex items-center justify-center gap-8 mb-6">
              <div className="space-y-2">
                <Image
                  src={match.homeLogo}
                  alt={match.homeTeam}
                  width={50}
                  height={50}
                  className="object-contain"
                />
                <p className="text-foreground">{match.homeTeam}</p>
              </div>

              <span className="text-2xl font-bold text-foreground">VS</span>
              <div className="space-y-2">
                <Image
                  src={match.awayLogo}
                  alt={match.awayTeam}
                  width={50}
                  height={50}
                  className="object-contain"
                />
                <p className="text-foreground">{match.awayTeam}</p>
              </div>
            </div>

            <button className="bg-primary text-primary-foreground px-8 py-3 rounded font-medium w-full hover:bg-primary/90">
              Bet now
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default UpcomingMatchesSection;
