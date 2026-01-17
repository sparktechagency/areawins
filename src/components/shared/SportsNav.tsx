"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SPORTS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export default function SportsNav() {
  const pathname = usePathname();

  return (
    <div className="bg-white border-b border-gray-200 sticky top-16 z-40">
      <div className="container mx-auto px-4">
        <div className="flex items-center overflow-x-auto scrollbar-hide">
          {SPORTS.map((sport) => {
            const isActive = pathname === sport.path;

            return (
              <Link
                key={sport.id}
                href={sport.path}
                className={cn(
                  "flex items-center gap-2 px-6 py-3 whitespace-nowrap transition-all",
                  "hover:bg-gray-50 border-b-2",
                  isActive
                    ? "border-primary text-primary font-semibold"
                    : "border-transparent text-gray-700 hover:text-primary"
                )}
              >
                <span className="text-xl">{sport.icon}</span>
                <span className="text-sm">{sport.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
