import { ISportCategories } from "@/interfaces/sportCategories.interface";
import { getSportCategories } from "@/services/sportCategories.service";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface SportCategoriesServerProps {
  searchParams?: Record<string, string>;
}

const SportCategoriesServer = async ({
  searchParams,
}: SportCategoriesServerProps) => {
  const currentPage = parseInt(searchParams?.page || "1");
  const sportCategoriesResponse = await getSportCategories({
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
    ...sportCategoriesData?.map((sport: ISportCategories) => ({
      name: sport.name,
      icon: sport.icon,
      href: `/matches/${sport.slug}`,
      slug: sport.slug,
    })),
  ];

  const totalPages = sportCategoriesResponse?.pagination?.totalPages || 1;
  const hasNextPage = sportCategoriesResponse?.pagination?.hasNextPage || false;
  const hasPrevPage = sportCategoriesResponse?.pagination?.hasPrevPage || false;

  const createPageUrl = (page: number) => {
    const params = new URLSearchParams(searchParams?.toString() || "");
    params.set("page", page.toString());
    return `?${params.toString()}`;
  };

  return (
    <section className="w-full bg-background border-b border-border overflow-hidden">
      <nav className="container mx-auto flex  gap-6 py-3 md:py-4 overflow-x-auto no-scrollbar">
        {/* Previous Page Button */}
        {hasPrevPage && (
          <Link
            href={createPageUrl(currentPage - 1)}
            className="shrink-0 flex items-center justify-center w-8 h-8 rounded border border-slate-200 transition-all hover:border-primary hover:text-primary"
            aria-label="Previous page"
          >
            <ChevronLeft className="w-4 h-4" />
          </Link>
        )}

        {/* Sport Categories */}
        {sportCategories?.map((sport) => {
          const isActive =
            sport.href === "/matches" ||
            (sport.slug !== "all" &&
              sport.href.startsWith(`/matches/${sport.slug}`));

          return (
            <Link
              key={sport.slug}
              href={sport.href}
              className={`flex items-center gap-1.5 shrink-0 whitespace-nowrap transition-colors text-muted-foreground hover:text-foreground ${
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
              <span className="text-sm">{sport.name}</span>
            </Link>
          );
        })}

        {/* Next Page Button */}
        {hasNextPage && (
          <Link
            href={createPageUrl(currentPage + 1)}
            className="shrink-0 flex items-center justify-center w-8 h-8 rounded border border-slate-200 transition-all hover:border-primary hover:text-primary"
            aria-label="Next page"
          >
            <ChevronRight className="w-4 h-4" />
          </Link>
        )}
      </nav>
    </section>
  );
};

export default SportCategoriesServer;
