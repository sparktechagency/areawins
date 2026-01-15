"use client";

import hero from "@/assets/hero/herosection.png";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import Link from "next/link";

const HeroSection = () => {
  const { t } = useTranslation();

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
            {t("hero.titlePart1")}{" "}
            <span className="text-primary">{t("hero.titlePart2")}</span>{" "}
            {t("hero.titlePart3")}
          </h1>
          <p className="text-sm md:text-base lg:text-lg text-white/90 mb-8 max-w-2xl drop-shadow-lg">
            {t("hero.subtitle")}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/matches">
              <Button className="px-10 cursor-pointer bg-primary hover:bg-primary/90 text-primary-foreground">
                {t("hero.getStarted")}
              </Button>
            </Link>
            <Link href="/market">
              <Button
                variant="default"
                className="px-10 cursor-pointer bg-white text-gray-900 hover:bg-white/90"
              >
                {t("hero.viewMarkets")}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
