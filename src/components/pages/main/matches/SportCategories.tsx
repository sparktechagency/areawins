"use client";

import { MOCK_SPORTS } from "@/data/match.data";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SportCategories = () => {
  const pathname = usePathname();

  // Create "All" category + dynamic sports from data
  const allCategory = {
    name: "All",
    icon: "🏆",
    href: "/matches",
    slug: "all",
  };

  const sportCategories = [
    allCategory,
    ...MOCK_SPORTS.filter((sport) => sport.isActive).map((sport) => ({
      name: sport.name,
      icon: sport.icon,
      href: `/matches/${sport.slug}`,
      slug: sport.slug,
    })),
  ];

  return (
    <section className="bg-background border-b border-border w-full overflow-hidden">
      <nav className="container mx-auto flex items-center gap-6 py-3 md:py-4 overflow-x-auto no-scrollbar">
        {sportCategories.map((sport) => {
          const isActive =
            pathname === sport.href ||
            (sport.slug !== "all" &&
              pathname.startsWith(`/matches/${sport.slug}`));

          return (
            <Link
              key={sport.slug}
              href={sport.href}
              className={`flex items-center gap-1 shrink-0 whitespace-nowrap transition-colors ${
                isActive
                  ? "text-primary hover:text-primary/80"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <span className="text-xl">{sport.icon}</span>
              <span className="text-sm">{sport.name}</span>
            </Link>
          );
        })}
      </nav>
    </section>
  );
};

export default SportCategories;
