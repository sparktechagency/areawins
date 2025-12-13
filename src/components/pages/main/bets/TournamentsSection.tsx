import Image from "next/image";
import React from "react";

const TournamentsSection: React.FC = () => {
  return (
    <section className="w-full container mx-auto ">
      <h2 className="text-2xl font-bold text-foreground mb-6">Tournaments</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Premier League Banner */}
        <div className="relative rounded-lg overflow-hidden bg-primary col-span-2">
          <Image
            src="https://i2-prod.liverpool.com/incoming/article30076417.ece/ALTERNATES/s1200/0_GettyImages-2176346284.jpg"
            alt="Premier League Player"
            width={500}
            height={500}
            className="w-full h-80 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
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
            <button className="bg-primary text-primary-foreground px-12 py-5 rounded text-xl cursor-pointer font-bold hover:bg-primary/90">
              JOIN 20$
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TournamentsSection;
