"use client";
import Image from "next/image";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

const AllTournamentsBanner: React.FC = () => {
  const banners = useMemo(
    () => [
      {
        src: "https://images.unsplash.com/photo-1579952363873-27f3bade8f55?auto=format&fit=crop&q=80",
        alt: "Premier League Football",
        title: "FOOTBALL: PREMIER LEAGUE",
        linkText: "View Fixtures",
      },
      {
        src: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&q=80",
        alt: "Cricket Batting",
        title: "CRICKET: T20 WORLD CUP",
        linkText: "Live Matches",
      },
      {
        src: "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&q=80",
        alt: "Basketball Action",
        title: "BASKETBALL: NBA FINALS",
        linkText: "Bet Now",
      },
      {
        src: "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?auto=format&fit=crop&q=80",
        alt: "Tennis Court",
        title: "TENNIS: GRAND SLAM",
        linkText: "Check Odds",
      },
      {
        src: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&q=80",
        alt: "American Football",
        title: "NFL: SUPER BOWL",
        linkText: "Upcoming Events",
      },
    ],
    []
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

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
    timeoutRef.current = setTimeout(nextSlide, 5000); // Auto-slide every 5 seconds

    return () => resetTimeout();
  }, [currentIndex, nextSlide]);

  // Pause autoplay on hover
  const handleMouseEnter = () => resetTimeout();
  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(nextSlide, 5000);
  };

  return (
    <section className="w-full container mx-auto pb-5">
      <h2 className="text-2xl font-bold text-foreground mb-6">Tournaments</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Carousel - Takes 2 columns on medium+ screens */}
        <div
          className="relative overflow-hidden rounded-lg col-span-1 md:col-span-2"
          ref={carouselRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {banners.map((banner, index) => (
              <div
                key={index}
                className="relative shrink-0 w-full h-72 md:h-80"
              >
                <Image
                  src={banner.src}
                  alt={banner.alt}
                  fill
                  className="object-cover"
                  priority={index === 0}
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-3xl font-bold mb-2">{banner.title}</h3>
                  {banner.linkText && (
                    <p className="text-lg flex items-center gap-2">
                      <span>›</span> {banner.linkText}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Custom Glowing Dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3">
            {banners.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentIndex(index);
                  resetTimeout();
                  timeoutRef.current = setTimeout(nextSlide, 5000);
                }}
                className={`relative w-3 h-3 cursor-pointer rounded-full transition-all duration-500 ${
                  index === currentIndex
                    ? "bg-white scale-150"
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
        </div>

        {/* Static Special Bet Banner - Right side */}
        <div className="relative rounded-lg overflow-hidden h-72 md:h-80">
          <Image
            src="https://wallpapercave.com/wp/wp4069976.jpg"
            alt="Stadium"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-white">
            <h3 className="text-4xl font-bold mb-6">SPECIAL BET</h3>
            <button className="bg-primary text-primary-foreground px-12 py-4 rounded  font-bold hover:bg-primary/90 transition">
              JOIN 20$
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AllTournamentsBanner;
