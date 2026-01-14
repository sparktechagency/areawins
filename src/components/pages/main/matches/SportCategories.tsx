import { ROUTES } from "@/lib/constants";
import Link from "next/link";

const sports = [
  { name: "All", icon: "🏆", href: "/matches", primary: true },
  { name: "Football", icon: "⚽", href: ROUTES.FOOTBALL },
  { name: "Cricket", icon: "🏏", href: ROUTES.CRICKET },
  { name: "Basketball", icon: "🏀", href: ROUTES.BASKETBALL },
  { name: "Volleyball", icon: "🏐", href: ROUTES.VOLLEYBALL },
  { name: "Baseball", icon: "⚾", href: ROUTES.BASEBALL },
  { name: "Tennis", icon: "🎾", href: ROUTES.TENNIS },
  { name: "Boxing", icon: "🥊", href: ROUTES.BOXING },
  { name: "Rugby", icon: "🏉", href: ROUTES.RUGBY },
  { name: "Hockey", icon: "🏒", href: ROUTES.HOCKEY },
  { name: "Badminton", icon: "🏸", href: ROUTES.BADMINTON },
  { name: "Table Tennis", icon: "🏓", href: ROUTES.TABLE_TENNIS },
  { name: "Handball", icon: "🤾", href: ROUTES.HANDBALL },
];

const SportCategories = () => {
  return (
    <section className="bg-background border-b border-border w-full overflow-hidden">
      <nav className="container mx-auto flex items-center gap-8 py-3 md:py-4 overflow-x-auto no-scrollbar">
        {sports.map((sport) => (
          <Link
            key={sport.name}
            href={sport.href}
            className={`flex items-center gap-2 shrink-0 whitespace-nowrap transition-colors
              ${
                sport.primary
                  ? "text-primary hover:text-primary/80"
                  : "text-muted-foreground hover:text-foreground"
              }`}
          >
            <span className="text-2xl">{sport.icon}</span>
            <span className="font-medium">{sport.name}</span>
          </Link>
        ))}
      </nav>
    </section>
  );
};

export default SportCategories;
