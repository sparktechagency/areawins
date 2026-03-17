import AllTournamentsBanner from "./AllTournamentsBanner";
import BasketballSection from "./BasketballSection";
import CricketSection from "./CricketSection";
import FootballSection from "./FootballSection";
import LiveEventsSection from "./LiveEventsSection";
import SportCategoriesServer from "./SportCategoriesServer";

const Matches = () => {
  return (
    <section className="w-full space-y-5 md:space-y-8">
      <SportCategoriesServer />
      <AllTournamentsBanner />
      <LiveEventsSection />
      <FootballSection />
      <CricketSection />
      <BasketballSection />
    </section>
  );
};

export default Matches;
