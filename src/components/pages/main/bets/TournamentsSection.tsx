// components/TournamentsSection.tsx
import Image from "next/image";
import React from "react";

const TournamentsSection: React.FC = () => {
  return (
    <section className="w-full">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Tournaments</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Premier League Banner */}
        <div className="relative rounded-lg overflow-hidden bg-green-500">
          <Image
            src="https://i2-prod.liverpool.com/incoming/article30076417.ece/ALTERNATES/s1200/0_GettyImages-2176346284.jpg"
            alt="Premier League Player"
            width={500}
            height={500}
            className="w-full h-80 object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent" />
          <div className="absolute bottom-6 left-6 text-white">
            <h3 className="text-3xl font-bold">PREMIER LEAGUE</h3>
            <p className="text-lg flex items-center gap-2">
              <span>›</span> All matches
            </p>
          </div>
        </div>

        {/* Special Bet Banner */}
        <div className="relative rounded-lg overflow-hidden">
          <Image
            src="https://wallpapercave.com/wp/wp4069976.jpg"
            alt="Stadium"
            width={500}
            height={500}
            className="w-full h-80 object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white">
            <h3 className="text-4xl font-bold mb-4">SPECIAL BET</h3>
            <button className="bg-green-500 text-white px-12 py-6 rounded text-3xl font-bold">
              JOIN 20$
            </button>
          </div>
        </div>

        {/* Upcoming Match Card 1 */}
        <div className="bg-white rounded-lg p-6 flex flex-col justify-between">
          <div>
            <p className="text-gray-500 text-sm mb-4">Upcoming match</p>
            <div className="flex items-center justify-center gap-8">
              <Image
                src="https://upload.wikimedia.org/wikipedia/en/thumb/c/cc/Chelsea_FC.svg/1200px-Chelsea_FC.svg.png"
                alt="Chelsea"
                width={100}
                height={100}
                className="w-20 h-20 object-contain"
              />
              <span className="text-2xl font-bold">VS</span>
              <Image
                src="https://upload.wikimedia.org/wikipedia/en/thumb/6/63/Leicester_City_crest.svg/1200px-Leicester_City_crest.svg.png"
                alt="Leicester C"
                width={100}
                height={100}
                className="w-20 h-20 object-contain"
              />
            </div>
            <div className="text-center mt-6">
              <p className="font-bold text-lg">Chelsea</p>
              <p className="text-gray-600">Leicester C</p>
            </div>
          </div>
          <button className="bg-green-500 text-white py-3 rounded mt-8 font-medium">
            Bet now
          </button>
        </div>

        {/* Upcoming Match Card 2 (repeated) */}
        <div className="bg-white rounded-lg p-6 flex flex-col justify-between">
          <div>
            <p className="text-gray-500 text-sm mb-4">Upcoming match</p>
            <div className="flex items-center justify-center gap-8">
              <Image
                src="https://upload.wikimedia.org/wikipedia/en/thumb/c/cc/Chelsea_FC.svg/1200px-Chelsea_FC.svg.png"
                alt="Chelsea"
                width={100}
                height={100}
                className="w-20 h-20 object-contain"
              />
              <span className="text-2xl font-bold">VS</span>
              <Image
                src="https://upload.wikimedia.org/wikipedia/en/thumb/6/63/Leicester_City_crest.svg/1200px-Leicester_City_crest.svg.png"
                alt="Leicester C"
                width={100}
                height={100}
                className="w-20 h-20 object-contain"
              />
            </div>
            <div className="text-center mt-6">
              <p className="font-bold text-lg">Chelsea</p>
              <p className="text-gray-600">Leicester C</p>
            </div>
          </div>
          <button className="bg-green-500 text-white py-3 rounded mt-8 font-medium">
            Bet now
          </button>
        </div>
      </div>
    </section>
  );
};

export default TournamentsSection;
