"use client";

import Link from "next/link";
import { useEffect } from "react";

import { Button } from "@/components/ui/button";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="relative isolate flex min-h-[78vh] items-center justify-center overflow-hidden bg-background px-6 py-16 text-foreground">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-accent/15 blur-3xl" />
        <div className="absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />
      </div>

      <div className="relative w-full max-w-2xl rounded-3xl border border-border/70 bg-card/90 p-8 text-center shadow-xl backdrop-blur-sm sm:p-12">
        <span className="inline-flex rounded-full border border-accent/30 bg-accent/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
          System Error
        </span>
        <h1 className="font-display mt-5 text-4xl font-semibold uppercase tracking-wide sm:text-5xl">
          We Could Not Load This Page
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground sm:text-lg">
          Something unexpected happened. Please try again, or go back home and
          continue browsing matches.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Button onClick={reset} className="min-w-40">
            Try Again
          </Button>
          <Button asChild variant="outline" className="min-w-40">
            <Link href="/">Go Home</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
