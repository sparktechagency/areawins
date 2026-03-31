import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="relative flex min-h-[70vh] items-center justify-center bg-background px-6 py-12 text-foreground">
      <div className="w-full max-w-xl text-center">
        <div className="mb-6 flex justify-center text-primary">
          <div className="relative">
            <span className="text-8xl  italic tracking-tighter opacity-10 sm:text-9xl">
              404
            </span>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-16 w-16 rounded-full border border-primary/20 bg-primary/5 p-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-full w-full"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="m15 9-6 6" />
                  <path d="m9 9 6 6" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <span className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
          Page Offside
        </span>

        <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl text-foreground">
          Out of <span className="text-primary italic">Bounds</span>
        </h1>

        <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-muted-foreground">
          The tactical route you took led to an empty field. This match
          doesn&apos;t exist or has been moved to another stadium.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button
            asChild
            className="h-11 w-full rounded-md bg-primary px-8 text-sm font-bold uppercase tracking-wider text-primary-foreground sm:w-auto"
          >
            <Link href="/">Back to Home</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="h-11 w-full rounded-md border-border bg-transparent px-8 text-sm font-bold uppercase tracking-wider text-foreground sm:w-auto"
          >
            <Link href="/matches">Browse Matches</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
