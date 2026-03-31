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
    <main className="relative flex min-h-[70vh] items-center justify-center bg-background px-6 py-12 text-foreground">
      <div className="w-full max-w-xl text-center">
        <div className="mb-6 flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full border border-destructive/20 bg-destructive/5 text-destructive">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 16h.01"/><path d="M12 8v4"/><path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a2 2 0 0 0-1.08 1.8V15a2 2 0 0 0 1.08 1.8l8.57 3.9a2 2 0 0 0 1.66 0l8.57-3.9A2 2 0 0 0 22.48 15V7.88a2 2 0 0 0-1.08-1.8Z"/>
            </svg>
          </div>
        </div>

        <span className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
          System Error
        </span>
        
        <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl text-foreground">
          Unexpected <span className="text-primary">Foul</span>
        </h1>
        
        <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-muted-foreground">
          Something went wrong in our backend stadium. We are investigating the case. 
          The match isn&apos;t over yet, try a quick reset!
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button 
            onClick={reset} 
            className="h-11 w-full rounded-md bg-primary px-8 text-sm font-bold uppercase tracking-wider text-primary-foreground sm:w-auto"
          >
            Reset Field
          </Button>
          <Button 
            asChild 
            variant="outline" 
            className="h-11 w-full rounded-md border-border bg-transparent px-8 text-sm font-bold uppercase tracking-wider text-foreground sm:w-auto"
          >
            <Link href="/">Back to Lobby</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}


