import AllTournamentsBanner from "./AllTournamentsBanner";
import BasketballSection from "./BasketballSection";
import CricketSection from "./CricketSection";
import FootballSection from "./FootballSection";
import LiveEventsSection from "./LiveEventsSection";
import SportCategories from "./SportCategories";

const Matches = () => {
  return (
    <div className="w-full space-y-8">
      <SportCategories />
      <AllTournamentsBanner />
      <LiveEventsSection />
      <FootballSection />
      <CricketSection />
      <BasketballSection />
    </div>
  );
};

export default Matches;
