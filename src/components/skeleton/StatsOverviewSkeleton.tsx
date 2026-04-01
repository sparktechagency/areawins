"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function StatsOverviewSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
      {[1, 2, 3, 4].map((i) => (
        <Card key={i} className="bg-card/50 border-border/50 h-[140px] shadow-none overflow-hidden relative">
          <CardContent className="p-5 flex flex-col justify-between h-full">
            <div className="space-y-3">
              {/* Label Skeleton */}
              <Skeleton className="h-3 w-28 bg-primary/5" />
              {/* Value Skeleton */}
              <Skeleton className="h-9 w-40 bg-primary/10" />
            </div>
            {/* Link Skeleton */}
            <Skeleton className="h-3 w-24 bg-muted" />
          </CardContent>
          
          {/* Subtle glow effect for dark mode */}
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary/5 rounded-full blur-3xl" />
        </Card>
      ))}
    </div>
  );
}
