"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";

interface MatchSectionSkeletonProps {
  columns?: number;
}

const MatchSectionSkeleton = ({ columns = 7 }: MatchSectionSkeletonProps) => {
  return (
    <section className="w-full container mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div className="h-8 w-48 bg-muted rounded animate-pulse" />
        <div className="h-4 w-32 bg-muted rounded animate-pulse" />
      </div>

      <div className="w-full rounded-lg border border-border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-muted/30">
              <TableRow className="hover:bg-transparent border-border/50">
                <TableHead className="py-5 pl-8">
                  <div className="h-4 w-20 bg-muted rounded animate-pulse" />
                </TableHead>
                {Array.from({ length: columns - 2 }).map((_, i) => (
                  <TableHead key={i} className="py-5 text-center">
                    <div className="h-4 w-24 bg-muted rounded animate-pulse mx-auto" />
                  </TableHead>
                ))}
                <TableHead className="py-5 pr-8 text-right">
                  <div className="h-4 w-20 bg-muted rounded animate-pulse ml-auto" />
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i} className="border-border/50">
                  <TableCell className="pl-8 py-6">
                    <div className="space-y-2">
                      <div className="h-4 w-12 bg-muted rounded animate-pulse" />
                      <div className="h-3 w-16 bg-muted rounded animate-pulse" />
                    </div>
                  </TableCell>
                  {Array.from({ length: columns - 2 }).map((_, j) => (
                    <TableCell key={j} className="text-center">
                      <div className="h-4 w-24 bg-muted rounded animate-pulse mx-auto" />
                    </TableCell>
                  ))}
                  <TableCell className="text-right pr-8">
                    <div className="h-9 w-24 bg-muted rounded-lg animate-pulse ml-auto" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </section>
  );
};

export default MatchSectionSkeleton;
