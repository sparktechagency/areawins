"use client";

import { Button } from "@/components/ui/button";
import { useTranslation } from "@/i18n/LanguageContext";
import { Link } from "@/i18n/routing";
import Image from "next/image";

const BetsSection = () => {
  const { t } = useTranslation();

  return (
    <section className="w-full py-16 md:py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary text-center mb-8 md:mb-12">
          {t("homeBets.title")}
        </h2>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left Side - 3 Sport Images (2 on top, 1 on bottom) */}
          <div className="grid grid-cols-2 gap-4">
            {/* Top Row - Basketball + Tennis */}
            <div className="space-y-4">
              <Image
                src="https://images.unsplash.com/photo-1546519638-68e109498ffc"
                alt={t("homeBets.basketballAlt")}
                width={600}
                height={800}
                className="rounded-lg object-cover w-full h-64"
              />
            </div>

            <div className="space-y-4">
              <Image
                src="https://images.unsplash.com/flagged/photo-1576972405668-2d020a01cbfa"
                alt={t("homeBets.tennisAlt")}
                width={600}
                height={400}
                className="rounded-lg object-cover w-full h-64"
              />
            </div>

            {/* Bottom Row - Full width Football */}
            <div className="col-span-2">
              <Image
                src="https://images.unsplash.com/photo-1570498839593-e565b39455fc"
                alt={t("homeBets.footballAlt")}
                width={800}
                height={500}
                className="rounded-lg object-cover w-full h-40 sm:h-48 md:h-56"
              />
            </div>
          </div>

          {/* Right Side - Text + Button */}
          <div className="space-y-8">
            <p className="text-base sm:text-lg text-foreground leading-relaxed">
              {t("homeBets.description")}
            </p>

            <Link href="/matches">
              <Button variant="default" className="cursor-pointer">
                {t("homeBets.cta")}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BetsSection;
