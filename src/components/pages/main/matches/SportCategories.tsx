"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { ISportCategories } from "@/interfaces/sportCategories.interface";
import { useGetSportCategoriesQuery } from "@/redux/api/sportCategoryApi";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const SportCategories = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { data: sportCategoriesResponse, isFetching } =
    useGetSportCategoriesQuery({
      page: currentPage,
      limit: 20,
    });

  const sportCategoriesData = sportCategoriesResponse?.data?.results;

  const allCategory = {
    name: "All",
    icon: <span className="text-[18px] leading-none">🏆</span>,
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

  const hasNextPage =
    sportCategoriesResponse?.data?.pagination?.hasNextPage || false;
  const hasPrevPage =
    sportCategoriesResponse?.data?.pagination?.hasPrevPage || false;

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
        {/* Previous Page Button - Only show if hasPrevPage is true */}
        {hasPrevPage && (
          <button
            onClick={handlePrev}
            disabled={isFetching}
            className="shrink-0 flex items-center justify-center w-8 h-8 rounded border border-border text-foreground transition-all cursor-pointer mr-3 sm:mr-5"
            aria-label="Previous page"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        )}

        {/* Sport Categories */}
        <nav className="flex flex-1 gap-3 sm:gap-5 overflow-x-auto no-scrollbar">
          {isFetching && !sportCategoriesData
            ? // Skeleton Loader
              Array.from({ length: 12 }).map((_, i) => (
                <div
                  key={i}
                  className="flex items-center gap-1.5 shrink-0 px-1 py-0.5 animate-pulse"
                >
                  <Skeleton className="w-5 h-5 rounded-full" />
                  <Skeleton className="w-16 h-4 rounded" />
                </div>
              ))
            : sportCategories?.map((sport) => {
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
                      <>
                        {typeof sport.icon === "string" ? (
                          <Image
                            src={sport.icon as string}
                            alt={sport.name}
                            width={18}
                            height={18}
                          />
                        ) : (
                          sport.icon
                        )}
                      </>
                    )}
                    <span className="text-xs sm:text-sm">{sport.name}</span>
                  </Link>
                );
              })}
        </nav>

        {/* Next Page Button - Only show if hasNextPage is true */}
        {hasNextPage && (
          <button
            onClick={handleNext}
            disabled={isFetching}
            className="shrink-0 flex items-center justify-center w-8 h-8 rounded border border-border text-foreground transition-all cursor-pointer ml-3 sm:ml-5"
            aria-label="Next page"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </section>
  );
};

export default SportCategories;
