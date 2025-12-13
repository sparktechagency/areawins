import React from "react";
import BetsCategories from "./BetsCategories";
import TournamentsSection from "./TournamentsSection";

const Bets = () => {
  return (
    <section className="w-full px-5 py-16 md:py-20">
      <BetsCategories />
      <TournamentsSection />
    </section>
  );
};

export default Bets;
