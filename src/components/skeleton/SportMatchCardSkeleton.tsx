"use client";

import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export const SportMatchCardSkeleton = () => {
  return (
    <div className="bg-card rounded-md border border-border overflow-hidden flex flex-col shadow-sm">
      {/* Header Skeleton */}
      <div className="bg-muted/10 px-5 py-4 border-b border-border flex items-center justify-between animate-pulse">
        <div className="flex items-center gap-3">
          <Skeleton className="size-6 rounded-full" />
          <Skeleton className="h-3 w-28" />
        </div>
        <Skeleton className="h-5 w-16 rounded-full" />
      </div>

      <div className="p-5 flex flex-col space-y-6">
        {/* Teams Skeleton */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex flex-col items-center gap-2 flex-1">
            <Skeleton className="size-12 rounded-full" />
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-5 w-6" />
          </div>
          <div className="flex flex-col items-center gap-1 opacity-20">
            <Skeleton className="h-3 w-4" />
            <div className="h-8 w-px bg-border" />
          </div>
          <div className="flex flex-col items-center gap-2 flex-1">
            <Skeleton className="size-12 rounded-full" />
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-5 w-6" />
          </div>
        </div>

        {/* Stats Skeleton */}
        <div className="grid grid-cols-2 gap-3 pb-2">
          <div className="bg-muted/10 rounded-md p-3 border border-border/50 flex flex-col items-center gap-2">
            <Skeleton className="h-2 w-16" />
            <Skeleton className="h-4 w-10" />
          </div>
          <div className="bg-muted/10 rounded-md p-3 border border-border/50 flex flex-col items-center gap-2">
            <Skeleton className="h-2 w-16" />
            <Skeleton className="h-4 w-12" />
          </div>
        </div>

        {/* Footer Skeleton */}
        <div className="mt-auto pt-4 border-t border-border flex items-center justify-between">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-1.5">
              <Skeleton className="size-3 rounded-full" />
              <Skeleton className="h-2 w-12" />
            </div>
            <div className="flex items-center gap-1.5">
              <Skeleton className="size-3 rounded-full" />
              <Skeleton className="h-2 w-16" />
            </div>
          </div>
          <Skeleton className="h-10 w-28 rounded-md" />
        </div>
      </div>
    </div>
  );
};
