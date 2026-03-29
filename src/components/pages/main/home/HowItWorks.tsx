"use client";

import { useTranslation } from "@/lib/i18n/LanguageContext";

const HowItWorks = () => {
  const { t } = useTranslation();

  const steps = [
    {
      number: 1,
      title: t("homeHow.step1Title"),
      description: t("homeHow.step1Desc"),
    },
    {
      number: 2,
      title: t("homeHow.step2Title"),
      description: t("homeHow.step2Desc"),
    },
    {
      number: 3,
      title: t("homeHow.step3Title"),
      description: t("homeHow.step3Desc"),
    },
    {
      number: 4,
      title: t("homeHow.step4Title"),
      description: t("homeHow.step4Desc"),
    },
  ];

  return (
    <section className="w-full py-16 md:py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-8 md:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-3 md:mb-4">
            {t("homeHow.title")}
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-foreground/70 max-w-3xl mx-auto">
            {t("homeHow.subtitle")}
          </p>
        </div>

        {/* Main content - flex for large screens, stack on mobile */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-6 md:gap-8 lg:gap-10 xl:gap-16">
          {/* Left side - numbered steps */}
          <div className="w-full  space-y-8 md:space-y-10">
            {steps.map((step, index) => (
              <div
                key={step.number}
                className="flex items-start gap-5 md:gap-6 group"
              >
                <div className="shrink-0">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-primary border border-primary/30 flex items-center justify-center text-xl md:text-2xl font-bold text-white group-hover:bg-primary/20 transition-colors">
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
          <div className="relative w-full max-w-md  aspect-square">
            <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-background to-primary/5 rounded-3xl border border-primary/20 shadow-xl shadow-primary/5 flex items-center justify-center p-6 md:p-8">
              <div className="relative w-full h-full max-w-[320px] max-h-80 md:max-w-[380px] md:max-h-[380px]">
                {/* Central P2P circle */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-40 h-40 md:w-56 md:h-56 rounded-full bg-linear-to-br from-primary/80 to-primary/40 flex items-center justify-center shadow-2xl shadow-primary/30">
                    <span className="text-4xl md:text-6xl font-black text-white tracking-wider">
                      P2P
                    </span>
                  </div>
                </div>

                {/* Orbiting icons - positioned around the circle */}
                <div className="absolute inset-0">
                  {/* You can replace these emojis with SVG / lucide-react icons */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl md:text-3xl">
                    ⚽
                  </div>
                  <div className="absolute top-1/4 right-0 translate-x-1/4 text-2xl md:text-3xl">
                    🏀
                  </div>
                  <div className="absolute bottom-1/4 right-0 translate-x-1/4 text-2xl md:text-3xl">
                    🏏
                  </div>
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 text-2xl md:text-3xl">
                    🏈
                  </div>
                  <div className="absolute bottom-1/4 left-0 -translate-x-1/4 text-2xl md:text-3xl">
                    🎾
                  </div>
                  <div className="absolute top-1/4 left-0 -translate-x-1/4 text-2xl md:text-3xl">
                    ⚾
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
