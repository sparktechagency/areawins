import React from "react";
import BetsCategories from "./BetsCategories";
import TournamentsSection from "./TournamentsSection";
import LiveEventsSection from "./LiveEventsSection";
import UpcomingMatchesSection from "./UpcomingMatchesSection";
import FootballUpcomingSection from "./FootballUpcomingSection";

const Bets = () => {
  return (
    <section className="w-full px-5 py-16 md:py-20 bg-background">
      <section className="w-full container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5 border-b border-border pb-5 md:pb-10">
        <div className="w-full col-span-4 space-y-4">
          <BetsCategories />
          <TournamentsSection />
          <LiveEventsSection />
        </div>
        <div className="w-full col-span-1 space-y-4">
          <UpcomingMatchesSection />
        </div>
      </section>
      <FootballUpcomingSection />
    </section>
  );
};

export default Bets;
