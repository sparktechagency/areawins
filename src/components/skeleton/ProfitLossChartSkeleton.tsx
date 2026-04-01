"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function ProfitLossChartSkeleton() {
  return (
    <div className="w-full h-full flex flex-col gap-6">
      {/* Chart Bars Simulation */}
      <div className="flex-1 flex items-end justify-between gap-4 px-2">
        {[40, 70, 45, 90, 65, 80, 55, 85, 50, 75, 60, 95].map((height, i) => (
          <div key={i} className="flex-1 flex flex-col gap-2 items-center">
            <Skeleton 
              className="w-full rounded-t-sm bg-primary/10" 
              style={{ height: `${height}%` }} 
            />
            <Skeleton className="h-2 w-full max-w-[20px] bg-muted/30" />
          </div>
        ))}
      </div>
      
      {/* Legend Simulation */}
      <div className="flex justify-center gap-8 mt-4">
        <div className="flex items-center gap-2">
          <Skeleton className="size-3 rounded-sm bg-green-500/20" />
          <Skeleton className="h-3 w-16 bg-muted/40" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="size-3 rounded-sm bg-red-500/20" />
          <Skeleton className="h-3 w-16 bg-muted/40" />
        </div>
      </div>
    </div>
  );
}
