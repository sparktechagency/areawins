import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="relative isolate flex min-h-[78vh] items-center justify-center overflow-hidden bg-background px-6 py-16 text-foreground">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-20 -top-16 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />
        <div className="absolute -bottom-20 -right-16 h-72 w-72 rounded-full bg-accent/15 blur-3xl" />
      </div>

      <div className="relative w-full max-w-2xl  p-8 text-center sm:p-12">
        <p className="font-display mt-6 text-7xl leading-none font-bold tracking-wide text-primary sm:text-8xl">
          404
        </p>
        <h1 className="font-display mt-4 text-4xl font-semibold  tracking-wide sm:text-5xl">
          Page Not Found
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground sm:text-lg">
          This page is no longer on the board. It may have moved, expired, or
          never existed.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Button asChild className="min-w-40">
            <Link href="/">Back to Home</Link>
          </Button>
          <Button asChild variant="outline" className="min-w-40">
            <Link href="/matches">Browse Matches</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
