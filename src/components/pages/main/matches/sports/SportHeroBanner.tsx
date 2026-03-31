"use client";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import { Flame } from "lucide-react";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

interface BannerConfig {
  bg: string;
  title: string;
  subtitle: string;
  promo?: string;
  matchStatus?: string;
}

interface SportHeroBannerProps {
  config: BannerConfig[];
}

const SportHeroBanner: React.FC<SportHeroBannerProps> = ({ config }) => {
  const { t } = useTranslation();
  const banners = useMemo(() => config, [config]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % banners.length);
  }, [banners]);

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(nextSlide, 6000);

    return () => resetTimeout();
  }, [currentIndex, nextSlide]);

  // Pause autoplay on hover
  const handleMouseEnter = () => resetTimeout();
  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(nextSlide, 6000);
  };

  const currentBanner = banners[currentIndex];

  return (
    <div
      className="relative rounded-md overflow-hidden mb-8 sm:mb-12 min-h-[300px] sm:min-h-[360px] flex flex-col justify-end border border-border group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background Images with Transition */}
      <div className="absolute inset-0 z-0">
        {banners.map((banner, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
            style={{ backgroundImage: banner.bg }}
          >
            <div className="absolute inset-0 bg-linear-to-t from-background via-background/40 to-transparent" />
            <div className="absolute inset-0 bg-linear-to-r from-background/90 via-background/20 to-transparent" />
          </div>
        ))}
      </div>

      <div className="relative z-10 p-5 sm:p-8 lg:p-10 max-w-3xl">
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
          <Badge className="bg-primary text-white  border-none px-4 py-1.5 uppercase tracking-widest text-[10px] rounded-full flex items-center gap-2">
            <Flame className="size-3.5" />
            {t("banner.activeMarket")}
          </Badge>
          <span className="text-white  text-[10px] bg-white/10 px-4 py-1.5 rounded-full backdrop-blur-xl border border-white/20 uppercase tracking-[0.2em]">
            {currentBanner.subtitle}
          </span>
        </div>

        <h2 className="text-2xl sm:text-4xl md:text-6xl  text-white mb-3 sm:mb-4 leading-tight sm:leading-none tracking-tight">
          {currentBanner.title}
        </h2>

        {currentBanner.matchStatus ? (
          <div className="bg-white/10 backdrop-blur-xl inline-flex items-center gap-3 px-4 sm:px-6 py-2.5 sm:py-3 rounded-md border border-white/20 mb-6 sm:mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
            </span>
            <p className="text-white text-sm sm:text-lg  tracking-tight font-mono">
              {currentBanner.matchStatus}
            </p>
          </div>
        ) : (
          <p className="text-white/80 text-sm sm:text-lg mb-6 sm:mb-8 max-w-lg leading-relaxed tracking-wide">
            {currentBanner.promo}
          </p>
        )}

      </div>

      {/* Carousel Dots */}

      {banners.length > 1 && (
        <div className="absolute bottom-4 right-4 z-20 flex gap-2">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentIndex(index);
                resetTimeout();
                timeoutRef.current = setTimeout(nextSlide, 6000);
              }}
              className={`relative w-2.5 h-2.5 cursor-pointer rounded-full transition-all duration-500 ${
                index === currentIndex
                  ? "bg-white scale-125"
                  : "bg-white/40 hover:bg-white/70"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            >
              {index === currentIndex && (
                <span className="absolute inset-0 rounded-full bg-white animate-ping opacity-75" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SportHeroBanner;
