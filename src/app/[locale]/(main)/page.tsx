import AboutUs from "@/components/pages/main/home/AboutUs";
import BetsSection from "@/components/pages/main/home/BetsSection";
import ContactUs from "@/components/pages/main/home/ContactUs";
import FutureOfBetting from "@/components/pages/main/home/FutureOfBetting";
import HeroSection from "@/components/pages/main/home/HeroSection";
import HowItWorks from "@/components/pages/main/home/HowItWorks";

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
