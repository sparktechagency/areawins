"use client";
import SidebarSkeleton from "@/components/skeleton/SidebarSkeleton";
import { ISportCategories } from "@/interfaces/sportCategories.interface";
import { useGetSportCategoriesQuery } from "@/lib/redux/api/sportCategoryApi";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import { Link, usePathname } from "@/lib/i18n/routing";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import Image from "next/image";

const SportsMatchesSidebar = () => {
  const pathname = usePathname();
  const { t } = useTranslation();
  const { data: sportCategoriesResponse, isLoading } = useGetSportCategoriesQuery({
    page: 1,
    limit: 100,
  });
  const activeSports = sportCategoriesResponse?.data?.results || [];
  if (isLoading) {
    return (
      <div className="w-full space-y-6 sticky top-24 max-h-[calc(100vh-120px)] overflow-y-auto pr-2">
        <SidebarSkeleton />
      </div>
    );
  }
  return (
    <div className="w-full space-y-6 sticky top-24 max-h-[calc(100vh-120px)] overflow-y-auto pr-2 border border-border rounded-lg p-2">
      {/* Sport Categories */}
      <div className="space-y-1">
        <h3 className="text-sm font-bold text-muted-foreground  tracking-wider px-3 mb-2">
          {t("sidebar.sports")}
        </h3>
        {activeSports?.map((sport: ISportCategories) => {
          const isActive = pathname.includes(`/matches/${sport.slug}`);

          return (
            <div key={sport._id} className="space-y-2">
              <div className="flex items-center gap-1">
                <Link
                  href={`/matches/${sport.slug}`}
                  className={cn(
                    "flex-1 flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all group cursor-pointer border",
                    isActive
                      ? "bg-primary/10 text-primary  border-primary/20"
                      : "text-muted-foreground hover:bg-muted/50 hover:text-foreground border-transparent",
                  )}
                >
                  <div className="shrink-0 text-lg transition-transform group-hover:scale-110">
                    {sport.icon ? (
                      <Image
                        src={sport.icon}
                        alt={sport.name}
                        width={20}
                        height={20}
                        className="object-contain"
                      />
                    ) : (
                      "🏆"
                    )}
                  </div>
                  <span className="flex-1 text-left">
                    {t(
                      `sports.${
                        sport.slug === "table-tennis"
                          ? "tableTennis"
                          : sport.slug === "american-football"
                            ? "americanFootball"
                            : sport.slug
                      }`,
                    )}
                  </span>
                  <ChevronRight
                    className={cn(
                      "size-3.5 opacity-0 -translate-x-2 transition-all",
                      isActive
                        ? "opacity-100 translate-x-0"
                        : "group-hover:opacity-40 group-hover:translate-x-0",
                    )}
                  />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default SportsMatchesSidebar;

