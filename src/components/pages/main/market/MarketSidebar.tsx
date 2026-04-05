"use client";
import { SidebarLink } from "@/components/shared/SidebarLink";
import SidebarSkeleton from "@/components/skeleton/SidebarSkeleton";
import { Input } from "@/components/ui/input";
import { useTranslation } from "@/i18n/LanguageContext";
import { DollarSign, Search } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { ISportCategories } from "@/interfaces/sportCategories.interface";
import { useGetSportCategoriesQuery } from "@/redux/api/sportCategoryApi";

const MarketSidebar = () => {
  const { t } = useTranslation();
  const [budget, setBudget] = useState([50]);
  const { data: sportCategoriesResponse, isLoading } =
    useGetSportCategoriesQuery({
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
    <div className="w-full space-y-6 sticky top-24 max-h-[calc(100vh-120px)] overflow-y-auto pr-2 pb-10 border border-border rounded-lg p-2">
      {/* Search Sidebar */}
      <div className="relative group">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
        <Input
          placeholder="Search markets..."
          className="pl-9 h-11 bg-muted/30 border-border focus-visible:ring-primary/30"
        />
      </div>

      {/* Budget Filter */}
      <div className="space-y-4 pt-2">
        <div className="flex items-center justify-between px-3">
          <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
            <DollarSign className="size-3" />
            Budget (Stake)
          </h3>
          <span className="text-[10px]  text-primary bg-primary/10 px-2 py-0.5 rounded">
            UP TO ${budget[0]}
          </span>
        </div>
        <div className="px-3">
          <input
            type="range"
            min="0"
            max="500"
            step="5"
            value={budget[0]}
            onChange={(e) => setBudget([parseInt(e.target.value)])}
            className="w-full accent-primary bg-muted/50 h-1.5 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between mt-2 text-[10px] text-muted-foreground font-bold">
            <span>$0</span>
            <span>$500+</span>
          </div>
        </div>
      </div>

      {/* Sport Categories */}
      <div className="space-y-1 pt-4 border-t border-border">
        <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider px-3 mb-2">
          Filter by Sport
        </h3>
        {activeSports?.map((sport: ISportCategories) => (
          <SidebarLink
            key={sport._id}
            icon={
              sport.icon ? (
                <Image
                  src={sport.icon}
                  alt={sport.name}
                  width={20}
                  height={20}
                  className="object-contain"
                />
              ) : (
                "🏆"
              )
            }
            label={t(
              `sports.${
                sport.slug === "table-tennis"
                  ? "tableTennis"
                  : sport.slug === "american-football"
                    ? "americanFootball"
                    : sport.slug
              }`,
            )}
            href={`/market?sport=${sport.slug}`}
          />
        ))}
      </div>
    </div>
  );
};

export default MarketSidebar;
