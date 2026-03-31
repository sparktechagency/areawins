"use client";
import { ISportCategories } from "@/interfaces/sportCategories.interface";
import { useGetSportCategoriesQuery } from "@/lib/redux/api/sportCategoryApi";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const SportCategoriesServer = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { data: sportCategoriesResponse, isFetching } =
    useGetSportCategoriesQuery({
      page: currentPage,
      limit: 20,
    });

  const sportCategoriesData = sportCategoriesResponse?.results;

  const allCategory = {
    name: "All",
    icon: null,
    href: "/matches",
    slug: "all",
  };

  const sportCategories = [
    allCategory,
    ...(sportCategoriesData?.map((sport: ISportCategories) => ({
      name: sport.name,
      icon: sport.icon,
      href: `/matches/${sport.slug}`,
      slug: sport.slug,
    })) || []),
  ];

  const hasNextPage = sportCategoriesResponse?.pagination?.hasNextPage || false;
  const hasPrevPage = sportCategoriesResponse?.pagination?.hasPrevPage || false;

  const handleNext = () => {
    if (hasNextPage) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (hasPrevPage) {
      setCurrentPage((prev) => Math.max(prev - 1, 1));
    }
  };

  return (
    <section className="w-full bg-background border-b border-border overflow-hidden">
      <div className="container mx-auto flex items-center px-3 sm:px-4 lg:px-0 py-3 md:py-4">
        {/* Previous Page Button */}
        <button
          onClick={handlePrev}
          disabled={!hasPrevPage || isFetching}
          className={`shrink-0 flex items-center justify-center w-8 h-8 rounded border border-slate-200 transition-all ${
            !hasPrevPage
              ? "opacity-30 cursor-not-allowed"
              : "hover:border-primary hover:text-primary cursor-pointer"
          }`}
          aria-label="Previous page"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Sport Categories */}
        <nav className="flex flex-1 gap-3 sm:gap-5 mx-3 sm:mx-5 overflow-x-auto no-scrollbar">
          {sportCategories?.map((sport) => {
            const isActive =
              sport.href === "/matches" ||
              (sport.slug !== "all" &&
                sport.href.startsWith(`/matches/${sport.slug}`));

            return (
              <Link
                key={sport.slug}
                href={sport.href}
                className={`flex items-center gap-1.5 shrink-0 whitespace-nowrap transition-colors text-muted-foreground hover:text-foreground px-1 py-0.5 ${
                  isActive ? "text-foreground font-semibold" : ""
                }`}
              >
                {sport.icon && (
                  <Image
                    src={sport.icon}
                    alt={sport.name}
                    width={18}
                    height={18}
                  />
                )}
                <span className="text-xs sm:text-sm">{sport.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Next Page Button */}
        <button
          onClick={handleNext}
          disabled={!hasNextPage || isFetching}
          className={`shrink-0 flex items-center justify-center w-8 h-8 rounded border border-slate-200 transition-all ${
            !hasNextPage
              ? "opacity-30 cursor-not-allowed"
              : "hover:border-primary hover:text-primary cursor-pointer"
          }`}
          aria-label="Next page"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
};

export default SportCategoriesServer;
