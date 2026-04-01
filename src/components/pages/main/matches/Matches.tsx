import AllTournamentsBanner from "./AllTournamentsBanner";
import BasketballSection from "./BasketballSection";
import CricketSection from "./CricketSection";
import SoccerSection from "./SoccerSection";
import LiveEventsSection from "./LiveEventsSection";
import SportCategories from "./SportCategories";

const Matches = () => {
  return (
    <section className="w-full space-y-5 md:space-y-8">
      <SportCategories />
      <AllTournamentsBanner />
      <LiveEventsSection />
      <SoccerSection />
      <CricketSection />
      <BasketballSection />
    </section>
  );
};

export default Matches;
