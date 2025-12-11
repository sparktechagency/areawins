import hero from "@/assets/hero/herosection.png";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${hero.src})`,
        }}
      ></div>

      {/* Content */}
      <div className="relative z-10">
        {/* Hero Content */}
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] px-4 text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 drop-shadow-2xl">
            Bet Smart! Win Fair!
          </h1>
          <p className="text-base md:text-lg text-white/90 mb-8 max-w-2xl drop-shadow-lg">
            Fast bets, generous outs, and live market odds — All in one place.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button className="px-10 cursor-pointer">Enter</Button>
            <Button
              variant="outline"
              className="px-10 cursor-pointer bg-transparent! border text-primary"
            >
              {" "}
              Sign Up
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
