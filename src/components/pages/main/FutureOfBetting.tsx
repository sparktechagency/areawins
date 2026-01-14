import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";

const FutureOfBetting = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading & Subtitle */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-primary mb-6">
            The Future of Betting
          </h2>
          <p className="text-lg sm:text-xl text-foreground/80 max-w-3xl mx-auto leading-relaxed">
            Experience a platform built for players, not the house. Total
            transparency and peer-to-peer fairness.
          </p>
        </div>

        {/* 4 Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {/* Card 1: P2P Betting */}
          <div className="bg-card border border-border rounded-xl p-6 md:p-8 text-center ">
            <div className="sibg-primary/30 p-2 ">
              <Users className="size-6" />
            </div>
            <h3 className="text-2xl font-bold text-primary mb-3">
              P2P Betting
            </h3>
            <p className="text-foreground/80 text-base leading-relaxed">
              No house edge. Bet directly against other users for better odds
              and bigger returns.
            </p>
          </div>

          {/* Card 2: Fair & Transparent */}
          <div className="bg-card border border-border rounded-xl p-6 md:p-8 text-center ">
            <div className="text-5xl mb-4">✅</div>
            <h3 className="text-2xl font-bold text-primary mb-3">
              Fair & Transparent
            </h3>
            <p className="text-foreground/80 text-base leading-relaxed">
              Blockchain-verified results ensure every bet is settled fairly
              with immutable records.
            </p>
          </div>

          {/* Card 3: Instant Payouts */}
          <div className="bg-card border border-border rounded-xl p-6 md:p-8 text-center ">
            <div className="text-5xl mb-4">⚡</div>
            <h3 className="text-2xl font-bold text-primary mb-3">
              Instant Payouts
            </h3>
            <p className="text-foreground/80 text-base leading-relaxed">
              Get your winnings instantly. Our automated system processes
              payouts within seconds.
            </p>
          </div>

          {/* Card 4: Social Betting */}
          <div className="bg-card border border-border rounded-xl p-6 md:p-8 text-center ">
            <div className="text-5xl mb-4">💬</div>
            <h3 className="text-2xl font-bold text-primary mb-3">
              Social Betting
            </h3>
            <p className="text-foreground/80 text-base leading-relaxed">
              Follow top tipsters, copy winning bets, and grow your bankroll
              together with our community.
            </p>
          </div>
        </div>

        {/* Optional CTA Button - centered below cards */}
        <div className="text-center mt-12">
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-10 py-6 h-14 text-lg rounded-md">
            Get Started Now
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FutureOfBetting;
