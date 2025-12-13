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
    <section className="container mx-auto w-full">
      {/* Registration Prompt */}
      <div className="text-center mb-8">
        <p className="text-gray-600 text-lg mb-4">
          Create bet so please registration
        </p>
        <button className="border-2 border-green-500 text-green-500 px-8 py-3 rounded-full font-medium hover:bg-green-500 hover:text-white transition">
          Registration now
        </button>
      </div>

      {/* Upcoming Matches Cards */}
      <div className="flex flex-col gap-8">
        {upcomingMatches.map((match, index) => (
          <div
            key={index}
            className="bg-gray-100 rounded-2xl p-8 flex flex-col items-center justify-between"
          >
            <p className="text-gray-500 text-sm mb-6">Upcoming match</p>

            <div className="flex items-center justify-center gap-8 mb-6">
              <div className="space-y-2">
                <Image
                  src={match.homeLogo}
                  alt={match.homeTeam}
                  width={50}
                  height={50}
                  className="object-contain"
                />
                <p className="text-gray-600">{match.homeTeam}</p>
              </div>

              <span className="text-2xl font-bold text-gray-800">VS</span>
              <div className="space-y-2">
                <Image
                  src={match.awayLogo}
                  alt={match.awayTeam}
                  width={50}
                  height={50}
                  className="object-contain"
                />
                <p className="text-gray-600">{match.awayTeam}</p>
              </div>
            </div>

            <button className="bg-green-500 text-white px-8 py-3 rounded font-medium w-full">
              Bet now
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default UpcomingMatchesSection;
