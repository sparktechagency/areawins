import { Skeleton } from "@/components/ui/skeleton";


const LiveEventCardSkeleton = () => {
  return (
    <div className="relative h-full overflow-hidden rounded-xl border border-border bg-card">
      {/* Header Skeleton */}
      <div className="flex items-center justify-between p-4 border-b border-border/50">
        <div className="flex gap-1.5 items-center">
          <Skeleton className="h-5 w-12 rounded-full" />
          <div className="flex items-center gap-1.5">
            <Skeleton className="h-3 w-3 rounded-sm" />
            <Skeleton className="h-3 w-24 rounded" />
          </div>
        </div>
        <Skeleton className="h-8 w-8 rounded-lg" />
      </div>

      {/* Match Display Skeleton */}
      <div className="relative flex items-center justify-between p-6">
        <div className="flex flex-col items-center gap-3 flex-1">
          <Skeleton className="h-16 w-16 rounded-full" />
          <Skeleton className="h-3 w-20 rounded" />
        </div>

        <div className="flex flex-col items-center gap-2 px-4">
          <div className="flex items-center gap-3">
            <Skeleton className="h-8 w-6 rounded" />
            <Skeleton className="h-6 w-2 rounded" />
            <Skeleton className="h-8 w-6 rounded" />
          </div>
          <Skeleton className="h-2 w-12 rounded mt-1" />
        </div>

        <div className="flex flex-col items-center gap-3 flex-1">
          <Skeleton className="h-16 w-16 rounded-full" />
          <Skeleton className="h-3 w-20 rounded" />
        </div>
      </div>

      {/* Match Info Skeleton */}
      <div className="px-4 pb-2">
        <div className="flex items-center gap-1">
          <Skeleton className="h-3 w-3 rounded" />
          <Skeleton className="h-3 w-32 rounded" />
        </div>
      </div>

      {/* Stats Grid Skeleton */}
      <div className="grid grid-cols-2 gap-3 p-4 bg-muted/20 border-t border-border/50">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-1">
            <Skeleton className="h-3 w-3 rounded" />
            <Skeleton className="h-2 w-16 rounded" />
          </div>
          <Skeleton className="h-6 w-20 rounded" />
        </div>
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-1">
            <Skeleton className="h-3 w-3 rounded" />
            <Skeleton className="h-2 w-16 rounded" />
          </div>
          <Skeleton className="h-6 w-10 rounded" />
        </div>
      </div>

      {/* CTAs Skeleton */}
      <div className="flex items-center gap-2 p-4 pt-0">
        <Skeleton className="h-11 flex-1 rounded-lg" />
        <Skeleton className="h-11 w-11 rounded-lg" />
      </div>
    </div>
  );
};

export default LiveEventCardSkeleton;
