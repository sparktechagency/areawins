import { ROUTES } from "@/lib/constants/routes";
import Link from "next/link";

const BetsCategories = () => {
  return (
    <header className="bg-background border-b border-border">
      <nav className="w-full container mx-auto flex items-center gap-8 py-3 md:py-4 overflow-x-auto no-scrollbar">
        <Link
          href={ROUTES.FOOTBALL}
          className="text-primary font-bold flex items-center gap-2 hover:text-primary/80 transition-colors whitespace-nowrap"
        >
          <span className="text-2xl">⚽</span> Football
        </Link>
        <Link href={ROUTES.CRICKET} className="text-muted-foreground flex items-center gap-2 hover:text-foreground transition-colors whitespace-nowrap">
          <span className="text-2xl">🏏</span> Cricket
        </Link>
        <Link href={ROUTES.BASKETBALL} className="text-muted-foreground flex items-center gap-2 hover:text-foreground transition-colors whitespace-nowrap">
          <span className="text-2xl">🏀</span> Basketball
        </Link>
        <Link href={ROUTES.VOLLEYBALL} className="text-muted-foreground flex items-center gap-2 hover:text-foreground transition-colors whitespace-nowrap">
          <span className="text-2xl">🏐</span> Volleyball
        </Link>
        <Link href={ROUTES.BASEBALL} className="text-muted-foreground flex items-center gap-2 hover:text-foreground transition-colors whitespace-nowrap">
          <span className="text-2xl">⚾</span> Baseball
        </Link>
        <Link href={ROUTES.TENNIS} className="text-muted-foreground flex items-center gap-2 hover:text-foreground transition-colors whitespace-nowrap">
          <span className="text-2xl">🎾</span> Tennis
        </Link>
        <Link href={ROUTES.BOXING} className="text-muted-foreground flex items-center gap-2 hover:text-foreground transition-colors whitespace-nowrap">
          <span className="text-2xl">🥊</span> Boxing
        </Link>
      </nav>
    </header>
  );
};
  );
};

export default BetsCategories;
