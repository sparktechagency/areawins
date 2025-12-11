import AboutUs from "@/components/pages/main/AboutUs";
import BetsSection from "@/components/pages/main/BetsSection";
import ContactUs from "@/components/pages/main/ContactUs";
import HeroSection from "@/components/pages/main/HeroSection";

const HomePage = () => {
  return (
    <main>
      <HeroSection />
      <AboutUs />
      <BetsSection />
      <ContactUs />
    </main>
  );
};

export default HomePage;
