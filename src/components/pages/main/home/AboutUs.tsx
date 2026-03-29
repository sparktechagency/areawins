

"use client";

import { useTranslation } from "@/lib/i18n/LanguageContext";
import Image from "next/image";

const AboutUs = () => {
  const { t } = useTranslation();

  return (
    <section className="w-full bg-background py-16 md:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left side - Text */}
          <div className="space-y-6">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary">
              {t("homeAbout.title")}
            </h2>

            <p className="text-base sm:text-lg text-foreground leading-relaxed">
              {t("homeAbout.description")}
            </p>
          </div>

          {/* Right side - Image from Unsplash */}
          <div className="flex justify-center md:justify-end">
            <Image
              src="https://images.unsplash.com/photo-1504016798967-59a258e9386d"
              alt={t("homeAbout.imageAlt")}
              width={800}
              height={600}
              className="rounded-lg object-cover w-full max-w-md"
              priority={false}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
