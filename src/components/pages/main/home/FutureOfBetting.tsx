"use client";

import { Button } from "@/components/ui/button";
import { useTranslation } from "@/i18n/LanguageContext";
import { Link } from "@/i18n/routing";
import {
  MessageSquare,
  RectangleHorizontal,
  Users,
  Verified,
} from "lucide-react";

const FutureOfBetting = () => {
  const { t } = useTranslation();

  return (
    <section className="w-full py-16 md:py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading & Subtitle */}
        <div className="text-center mb-8 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-3 md:mb-6">
            {t("homeFuture.title")}
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-foreground/80 max-w-3xl mx-auto leading-relaxed">
            {t("homeFuture.subtitle")}
          </p>
        </div>

        {/* 4 Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 lg:gap-8">
          {/* Card 1: P2P Betting */}
          <div className="bg-card border border-border rounded-lg p-6 md:p-8 text-center ">
            <div className="size-14 mx-auto mb-4 rounded-full bg-primary/90 border border-primary/30 flex items-center justify-center  p-2 ">
              <Users className="size-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-primary mb-3">
              {t("homeFuture.card1Title")}
            </h3>
            <p className="text-foreground/80 text-base leading-relaxed">
              {t("homeFuture.card1Desc")}
            </p>
          </div>

          {/* Card 2: Fair & Transparent */}
          <div className="bg-card border border-border rounded-lg p-6 md:p-8 text-center ">
            <div className="size-14 mx-auto mb-4 rounded-full bg-primary/90 border border-primary/30 flex items-center justify-center  p-2 ">
              <Verified className="size-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-primary mb-3">
              {t("homeFuture.card2Title")}
            </h3>
            <p className="text-foreground/80 text-base leading-relaxed">
              {t("homeFuture.card2Desc")}
            </p>
          </div>

          {/* Card 3: Instant Payouts */}
          <div className="bg-card border border-border rounded-lg p-6 md:p-8 text-center ">
            <div className="size-14 mx-auto mb-4 rounded-full bg-primary/90 border border-primary/30 flex items-center justify-center  p-2 ">
              <RectangleHorizontal className="size-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-primary mb-3">
              {t("homeFuture.card3Title")}
            </h3>
            <p className="text-foreground/80 text-base leading-relaxed">
              {t("homeFuture.card3Desc")}
            </p>
          </div>

          {/* Card 4: Social Betting */}
          <div className="bg-card border border-border rounded-lg p-6 md:p-8 text-center ">
            <div className="size-14 mx-auto mb-4 rounded-full bg-primary/90 border border-primary/30 flex items-center justify-center  p-2 ">
              <MessageSquare className="size-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-primary mb-3">
              {t("homeFuture.card4Title")}
            </h3>
            <p className="text-foreground/80 text-base leading-relaxed">
              {t("homeFuture.card4Desc")}
            </p>
          </div>
        </div>

        {/* Optional CTA Button - centered below cards */}
        <div className="text-center mt-12 ">
          <Link href="/matches">
            <Button variant="default" className="cursor-pointer">
              {t("homeFuture.cta")}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FutureOfBetting;
