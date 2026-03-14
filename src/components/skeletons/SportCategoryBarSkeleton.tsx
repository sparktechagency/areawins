"use client";

const SportCategoryBarSkeleton = () => {
  return (
    <div className="relative group mb-8">
      <div className="flex items-center gap-2">
        {/* Left Arrow Skeleton */}
        <div className="shrink-0 w-8 h-8 rounded border border-slate-200 animate-pulse"></div>

        {/* Scrollable Container Skeleton */}
        <div className="flex-1 flex overflow-x-auto py-1 gap-2">
          {[...Array(8)].map((_, index) => (
            <div
              key={index}
              className="shrink-0 flex gap-2 items-center px-4 py-2 rounded border border-slate-200 animate-pulse w-20"
            >
              <div className="w-4 h-4 bg-slate-300 rounded"></div>
              <div className="w-12 h-3 bg-slate-300 rounded"></div>
            </div>
          ))}
        </div>

        {/* Right Arrow Skeleton */}
        <div className="shrink-0 w-8 h-8 rounded border border-slate-200 animate-pulse"></div>
      </div>
    </div>
  );
};

export default SportCategoryBarSkeleton;
