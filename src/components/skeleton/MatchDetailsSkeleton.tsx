"use client";

import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export const MatchDetailsSkeleton = () => {
  return (
    <div className="w-full space-y-6 sm:space-y-8 pb-10 animate-pulse">
      {/* Navigation Header Skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2 w-fit">
          <Skeleton className="size-8 rounded-md" />
          <Skeleton className="h-3 w-24" />
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden xs:flex items-center gap-3 px-4 py-2 bg-muted/20 border border-border rounded-md">
            <div className="flex flex-col gap-1.5">
              <Skeleton className="h-2 w-16" />
              <Skeleton className="h-4 w-20" />
            </div>
            <div className="w-px h-6 bg-border" />
            <div className="flex flex-col gap-1.5">
              <Skeleton className="h-2 w-16" />
              <Skeleton className="h-4 w-10" />
            </div>
          </div>
          <Skeleton className="h-11 w-32 rounded-md" />
        </div>
      </div>

      {/* Match Score Header Skeleton */}
      <div className="bg-card rounded-md p-4 sm:p-8 border border-border flex flex-col items-center gap-8">
        <Skeleton className="h-6 w-40 rounded-md" />
        <div className="grid grid-cols-3 items-center gap-4 md:gap-24 w-full max-w-4xl">
          <div className="flex flex-col items-center gap-4">
            <Skeleton className="size-12 xs:size-16 sm:size-24 md:size-32 rounded-full" />
            <Skeleton className="h-4 w-24 sm:h-6" />
          </div>
          <div className="flex flex-col items-center gap-4">
            <Skeleton className="h-10 w-20 sm:h-16 sm:w-32" />
            <div className="flex flex-col items-center gap-2">
              <Skeleton className="h-2 w-20" />
              <Skeleton className="h-2 w-24" />
            </div>
          </div>
          <div className="flex flex-col items-center gap-4">
            <Skeleton className="size-12 xs:size-16 sm:size-24 md:size-32 rounded-full" />
            <Skeleton className="h-4 w-24 sm:h-6" />
          </div>
        </div>
      </div>

      {/* Tabs Skeleton */}
      <div className="space-y-6">
        <div className="bg-muted/20 border border-border w-full flex p-1.5 rounded-md gap-2 overflow-hidden">
          <Skeleton className="h-10 w-40 rounded-md" />
          <Skeleton className="h-10 w-32 rounded-md" />
        </div>

        {/* Market Grid Skeleton */}
        <div className="space-y-6">
          {[1, 2].map((i) => (
            <div key={i} className="bg-card border border-border rounded-md overflow-hidden">
              <div className="px-5 py-4 border-b border-border">
                <Skeleton className="h-4 w-32" />
              </div>
              <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {[1, 2, 3].map((j) => (
                  <Skeleton key={j} className="h-16 w-full rounded-md" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
