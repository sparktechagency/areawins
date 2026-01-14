import LiveEventsSection from "./LiveEventsSection";
import SportCategories from "./SportCategories";
import AllTournamentsBanner from "./AllTournamentsBanner";

const Matches = () => {
  return (
    <section className="w-full pt-16 md:pt-20 pb-5 bg-background ">
      <div className="w-full container mx-auto  gap-5 pb-5 md:pb-10">
        <SportCategories />
        <AllTournamentsBanner />
        <LiveEventsSection />
      </div>
    </section>
  );
};

export default Matches;
