import AboutUs from "@/components/pages/main/AboutUs";
import BetsSection from "@/components/pages/main/BetsSection";
import ContactUs from "@/components/pages/main/ContactUs";
import FutureOfBetting from "@/components/pages/main/FutureOfBetting";
import HeroSection from "@/components/pages/main/HeroSection";
import HowItWorks from "@/components/pages/main/HowItWorks";

const HomePage = () => {
  return (
    <main>
      <HeroSection />
      <AboutUs />
      <FutureOfBetting />
      <BetsSection />
      <HowItWorks />
      <ContactUs />
    </main>
  );
};

export default HomePage;
