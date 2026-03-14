import { ISportCategories } from "@/interfaces/sportCategories.interface";
import { getSportCategories } from "@/services/sportCategories.service";
import Image from "next/image";
import Link from "next/link";

const SportCategories = async () => {
  const sportCategoriesResponse = await getSportCategories({});
  const sportCategoriesData = sportCategoriesResponse?.results;

  const allCategory = {
    name: "All",
    icon: null, 
    href: "/matches",
    slug: "all",
  };

  const sportCategories = [
    allCategory,
    ...sportCategoriesData?.map((sport: ISportCategories) => ({
      name: sport.name,
      icon: sport.icon,
      href: `/matches/${sport.slug}`,
      slug: sport.slug,
    })),
  ];

  return (
    <section className="bg-background border-b border-border w-full overflow-hidden">
      <nav className="container mx-auto flex items-center gap-6 py-3 md:py-4 overflow-x-auto no-scrollbar">
        {sportCategories?.map((sport) => {
          const isActive =
            sport.href === "/matches" ||
            (sport.slug !== "all" &&
              sport.href.startsWith(`/matches/${sport.slug}`));

          return (
            <Link
              key={sport.slug}
              href={sport.href}
              className={`flex items-center gap-1.5 shrink-0 whitespace-nowrap transition-colors text-muted-foreground hover:text-foreground`}
            >
              {sport.icon && (
                <Image
                  src={sport.icon}
                  alt={sport.name}
                  width={18}
                  height={18}
                />
              )}
              <span className="text-sm">{sport.name}</span>
            </Link>
          );
        })}
      </nav>
    </section>
  );
};

export default SportCategories;
