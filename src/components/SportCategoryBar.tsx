"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SportCategoryBarSkeleton from "@/components/skeletons/SportCategoryBarSkeleton";
import { ISportCategories } from "@/interfaces/sportCategories.interface";

interface SportCategoryBarProps {
  sports: ISportCategories[];
  selectedSportId: string | null;
  onSelectSport: (id: string) => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
  hasNextPage?: boolean;
  hasPrevPage?: boolean;
}

const SportCategoryBar: React.FC<SportCategoryBarProps> = ({
  sports,
  selectedSportId,
  onSelectSport,
  currentPage,
  totalPages,
  onPageChange,
  isLoading,
  hasNextPage,
  hasPrevPage,
}) => {
  if (isLoading) {
    return <SportCategoryBarSkeleton />;
  }

  return (
    <div className="relative group mb-8">
      <div className="flex items-center gap-2">
        {/* Left Arrow */}
        {hasPrevPage && (
          <button
            onClick={() => onPageChange(currentPage - 1)}
            className="shrink-0 flex items-center justify-center w-8 h-8 rounded border border-slate-200 transition-all hover:border-primary hover:text-primary cursor-pointer"
            aria-label="Previous page"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        )}

        {/* Scrollable Container */}
        <div className="flex-1 flex overflow-x-auto py-1 gap-2 no-scrollbar scroll-smooth">
          {sports?.map((sport: any) => (
            <button
              key={sport._id}
              onClick={() => onSelectSport(sport._id)}
              className={`shrink-0 flex gap-2 items-center px-4 py-2 cursor-pointer rounded border transition-all ${
                selectedSportId === sport._id
                  ? "border-primary bg-primary/5 text-primary"
                  : "border-slate-100 hover:border-slate-200 text-slate-500"
              }`}
            >
              <img
                src={sport.icon}
                alt={sport.name}
                className={`w-4 h-4 object-contain ${
                  selectedSportId === sport._id ? "" : "opacity-70"
                }`}
              />
              <span className="text-xs font-bold uppercase tracking-tight whitespace-nowrap">
                {sport.name}
              </span>
            </button>
          ))}
        </div>

        {/* Right Arrow */}
        {hasNextPage && (
          <button
            onClick={() => onPageChange(currentPage + 1)}
            className="shrink-0 flex items-center justify-center w-8 h-8 rounded border border-slate-200 transition-all hover:border-primary hover:text-primary cursor-pointer"
            aria-label="Next page"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export default SportCategoryBar;
