// components/HowItWorks.tsx
import Image from "next/image";
const steps = [
  {
    number: 1,
    title: "Create Account",
    description:
      "Sign up in seconds using email or wallet connect. Verify in under 2 mins.",
  },
  {
    number: 2,
    title: "Fund Your Wallet",
    description:
      "Deposit crypto (USDT, SOL, ETH etc.) or use fiat on-ramp methods fast and easy.",
  },
  {
    number: 3,
    title: "Find/Create a Bet",
    description:
      "Browse markets or create your own custom bet against other users.",
  },
  {
    number: 4,
    title: "Place Bet & Win",
    description:
      "Match with opponents → bet settles automatically → winners get paid instantly.",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            How It Works
          </h2>
          <p className="text-lg md:text-xl text-foreground/70 max-w-3xl mx-auto">
            Get started in minutes. Simple, fast, and completely peer-to-peer.
          </p>
        </div>

        {/* Main content - flex for large screens, stack on mobile */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-16">
          {/* Left side - numbered steps */}
          <div className="w-full lg:w-5/12 space-y-8 md:space-y-10">
            {steps.map((step, index) => (
              <div
                key={step.number}
                className="flex items-start gap-5 md:gap-6 group"
              >
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center text-xl md:text-2xl font-bold text-primary group-hover:bg-primary/20 transition-colors">
                    {step.number}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="text-foreground/70 text-base md:text-lg leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Right side - Central P2P circle graphic */}
          <div className="relative w-full max-w-md lg:w-7/12 aspect-square">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-primary/5 rounded-3xl border border-primary/20 shadow-xl shadow-primary/5 flex items-center justify-center p-6 md:p-8">
              <div className="relative w-full h-full max-w-[320px] max-h-[320px] md:max-w-[380px] md:max-h-[380px]">
                {/* Central P2P circle */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-40 h-40 md:w-56 md:h-56 rounded-full bg-gradient-to-br from-primary/80 to-primary/40 flex items-center justify-center shadow-2xl shadow-primary/30">
                    <span className="text-4xl md:text-6xl font-black text-white tracking-wider">
                      P2P
                    </span>
                  </div>
                </div>

                {/* Orbiting icons - positioned around the circle */}
                <div className="absolute inset-0">
                  {/* You can replace these emojis with SVG / lucide-react icons */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 text-5xl md:text-7xl">
                    👤
                  </div>
                  <div className="absolute top-1/4 right-0 translate-x-1/4 text-5xl md:text-7xl">
                    💰
                  </div>
                  <div className="absolute bottom-1/4 right-0 translate-x-1/4 text-5xl md:text-7xl">
                    ⚽
                  </div>
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 text-5xl md:text-7xl">
                    🏀
                  </div>
                  <div className="absolute bottom-1/4 left-0 -translate-x-1/4 text-5xl md:text-7xl">
                    🎾
                  </div>
                  <div className="absolute top-1/4 left-0 -translate-x-1/4 text-5xl md:text-7xl">
                    🏈
                  </div>
                </div>

                {/* Optional connecting lines or dots can be added with SVG */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
