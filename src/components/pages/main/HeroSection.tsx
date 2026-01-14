import hero from "@/assets/hero/herosection.png";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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
      <div className="absolute inset-0 bg-linear-to-t from-[#102217]/50 via-[#102217]/20 to-transparent"></div>
      <div className="absolute inset-0 bg-linear-to-r from-[#102217]/50 to-transparent"></div>
      {/* Content */}
      <div className="relative z-10">
        {/* Hero Content */}
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] px-4 text-center">
          <h1 className="text-2xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 drop-shadow-2xl">
            Bet Smart! <span className="text-primary">Win Big</span> , Play Fair!
          </h1>
          <p className="text-sm md:text-base lg:text-lg text-white/90 mb-8 max-w-2xl drop-shadow-lg">
            Fast bets, generous outs, and live market odds — All in one place.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/bets">
              <Button className="px-10 cursor-pointer bg-primary hover:bg-primary/90 text-primary-foreground">
                Get Started Now
              </Button>
            </Link>
            <Link href="/register">
              <Button
                variant="default"
                className="px-10 cursor-pointer bg-white text-gray-900 hover:bg-white/90"
              >
                View Markets
              </Button>
            </Link>
            {/* <Link href="/register">
              <Button
                variant="default"
                className="px-10 cursor-pointer bg-white text-gray-900 hover:bg-white/90"
              >
                Sign Up
              </Button>
            </Link> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
