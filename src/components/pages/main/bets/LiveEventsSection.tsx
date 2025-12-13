"use client";

import Image from "next/image";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

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
      image: "https://images.unsplash.com/photo-1508609349937-5ec4ae374ebf",
    },
    teamB: {
      name: "Real Madrid",
      score: 1,
      image: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d",
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
      image: "https://images.unsplash.com/photo-1521412644187-c49fa049e84d",
    },
    teamB: {
      name: "Arsenal",
      score: 2,
      image: "https://images.unsplash.com/photo-1502877338535-766e1452684a",
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
      image: "https://images.unsplash.com/photo-1517649763962-0c623066013b",
    },
    teamB: {
      name: "Inter Milan",
      score: 1,
      image: "https://images.unsplash.com/photo-1495567720989-cebdbdd97913",
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
      image: "https://images.unsplash.com/photo-1605296867304-46d5465a13f1",
    },
    teamB: {
      name: "Dortmund",
      score: 2,
      image: "https://images.unsplash.com/photo-1518098268026-4e89f1a2cd8e",
    },
  },
  {
    id: 5,
    time: "39:30",
    sport: "Football",
    league: {
      name: "Ligue 1",
      country: "France",
      flag: "https://flagcdn.com/w40/fr.png",
    },
    teamA: {
      name: "PSG",
      score: 2,
      image: "https://images.unsplash.com/photo-1517649763962-0c623066013b",
    },
    teamB: {
      name: "Lyon",
      score: 0,
      image: "https://images.unsplash.com/photo-1508609349937-5ec4ae374ebf",
    },
  },
  {
    id: 6,
    time: "54:11",
    sport: "Football",
    league: {
      name: "Eredivisie",
      country: "Netherlands",
      flag: "https://flagcdn.com/w40/nl.png",
    },
    teamA: {
      name: "Ajax",
      score: 1,
      image: "https://images.unsplash.com/photo-1502877338535-766e1452684a",
    },
    teamB: {
      name: "PSV",
      score: 1,
      image: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d",
    },
  },
  {
    id: 7,
    time: "19:08",
    sport: "Football",
    league: {
      name: "Primeira Liga",
      country: "Portugal",
      flag: "https://flagcdn.com/w40/pt.png",
    },
    teamA: {
      name: "Benfica",
      score: 0,
      image: "https://images.unsplash.com/photo-1521412644187-c49fa049e84d",
    },
    teamB: {
      name: "Porto",
      score: 1,
      image: "https://images.unsplash.com/photo-1495567720989-cebdbdd97913",
    },
  },
  {
    id: 8,
    time: "88:59",
    sport: "Football",
    league: {
      name: "MLS",
      country: "USA",
      flag: "https://flagcdn.com/w40/us.png",
    },
    teamA: {
      name: "LA Galaxy",
      score: 2,
      image: "https://images.unsplash.com/photo-1605296867304-46d5465a13f1",
    },
    teamB: {
      name: "Inter Miami",
      score: 2,
      image: "https://images.unsplash.com/photo-1518098268026-4e89f1a2cd8e",
    },
  },
  {
    id: 9,
    time: "12:40",
    sport: "Football",
    league: {
      name: "Saudi Pro League",
      country: "Saudi Arabia",
      flag: "https://flagcdn.com/w40/sa.png",
    },
    teamA: {
      name: "Al Nassr",
      score: 1,
      image: "https://images.unsplash.com/photo-1508609349937-5ec4ae374ebf",
    },
    teamB: {
      name: "Al Hilal",
      score: 0,
      image: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d",
    },
  },
  {
    id: 10,
    time: "66:00",
    sport: "Football",
    league: {
      name: "J1 League",
      country: "Japan",
      flag: "https://flagcdn.com/w40/jp.png",
    },
    teamA: {
      name: "Kashima Antlers",
      score: 2,
      image: "https://images.unsplash.com/photo-1517649763962-0c623066013b",
    },
    teamB: {
      name: "Urawa Reds",
      score: 3,
      image: "https://images.unsplash.com/photo-1495567720989-cebdbdd97913",
    },
  },
];

const LiveEventsSection: React.FC = () => {
  return (
    <section className="container mx-auto w-full">
      <h2 className="mb-6 text-2xl font-bold text-gray-800">Live Events</h2>

      <Carousel opts={{ align: "start", loop: true }} className="w-full">
        <CarouselContent className="-ml-6">
          {liveEvents.map((event) => (
            <CarouselItem key={event.id} className="pl-6 basis-[320px]">
              <div className="h-full rounded-lg border border-gray-200 bg-white p-6">
                {/* Header */}
                <div className="mb-4 flex items-center justify-between">
                  <span className="rounded bg-red-500 px-3 py-1 text-xs font-medium text-white">
                    Live
                  </span>
                  <span className="text-sm text-gray-500">{event.time}</span>
                </div>

                {/* Teams */}
                <div className="flex items-center justify-center gap-6">
                  <Image
                    src={event.teamA.image}
                    alt={event.teamA.name}
                    width={64}
                    height={64}
                    className="h-16 w-16 rounded-full object-cover"
                  />
                  <span className="text-2xl font-bold">VS</span>
                  <Image
                    src={event.teamB.image}
                    alt={event.teamB.name}
                    width={64}
                    height={64}
                    className="h-16 w-16 rounded-full object-cover"
                  />
                </div>

                {/* League */}
                <div className="mt-3 flex items-center justify-center gap-2">
                  <Image
                    src={event.league.flag}
                    alt={event.league.country}
                    width={20}
                    height={14}
                    className="rounded-sm"
                  />
                  <p className="text-sm text-gray-600">{event.league.name}</p>
                </div>

                {/* Score */}
                <div className="mt-6 text-center">
                  <p className="text-lg">
                    <span className="font-bold">{event.teamA.name}</span>{" "}
                    <span className="text-4xl font-bold">
                      {event.teamA.score}
                    </span>{" "}
                    -{" "}
                    <span className="text-4xl font-bold">
                      {event.teamB.score}
                    </span>{" "}
                    <span className="font-bold">{event.teamB.name}</span>
                  </p>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="cursor-pointer left-1" />
        <CarouselNext className="cursor-pointer right-1" />
      </Carousel>
    </section>
  );
};

export default LiveEventsSection;
