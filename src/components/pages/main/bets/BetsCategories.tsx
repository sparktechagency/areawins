import Link from "next/link";

const BetsCategories = () => {
  return (
    <header className="bg-background border-b border-border">
      <nav className="w-full container mx-auto flex items-center gap-8 py-3 md:py-4">
        <Link
          href="#"
          className="text-primary font-bold flex items-center gap-2"
        >
          <span className="text-2xl">⚽</span> Football
        </Link>
        <Link href="#" className="text-muted-foreground flex items-center gap-2">
          <span className="text-2xl">🏏</span> Cricket
        </Link>
        <Link href="#" className="text-muted-foreground flex items-center gap-2">
          <span className="text-2xl">🏀</span> Basketball
        </Link>
        <Link href="#" className="text-muted-foreground flex items-center gap-2">
          <span className="text-2xl">🏐</span> Volleyball
        </Link>
        <Link href="#" className="text-muted-foreground flex items-center gap-2">
          <span className="text-2xl">⚾</span> Baseball
        </Link>
        <Link href="#" className="text-muted-foreground flex items-center gap-2">
          <span className="text-2xl">🎾</span> Tennis
        </Link>
        <Link href="#" className="text-muted-foreground flex items-center gap-2">
          <span className="text-2xl">🥊</span> Boxing
        </Link>
      </nav>
    </header>
  );
};

export default BetsCategories;
