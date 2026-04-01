"use client";
import Link from "next/link";
import { Search, Home, Trophy } from "lucide-react";

export default function NotFound() {
  return (
    <main className="relative min-h-screen flex items-center justify-center p-6 overflow-hidden bg-background text-foreground transition-colors duration-500">
      {/* ... background elements ... */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none select-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/10 dark:bg-primary/20 rounded-full blur-[150px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-500/10 dark:bg-blue-600/20 rounded-full blur-[150px] animate-pulse delay-1000" />
      </div>

      <div className="relative w-full max-w-2xl text-center space-y-12">
        {/* ... code icon ... */}
        <div className="relative inline-block group">
          <div className="absolute inset-0 bg-primary/20 dark:bg-primary/40 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-700 ease-in-out opacity-60" />
          <div className="relative flex items-center justify-center">
            <span className="text-[12rem] md:text-[16rem]  tracking-tighter opacity-5 select-none font-mono">
              404
            </span>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="size-24 md:size-32 rounded-3xl bg-card/60 dark:bg-card/40 border border-border shadow-2xl backdrop-blur-xl flex items-center justify-center rotate-12 group-hover:rotate-0 transition-transform duration-500">
                <Search className="size-10 md:size-12 text-primary" />
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="space-y-4 max-w-lg mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
            <div className="size-1.5 rounded-full bg-primary animate-ping" />
            <span className="text-[10px]   tracking-[0.2em] text-primary">
              System Offside
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl  text-foreground  tracking-tight">
            Out of <span className="text-primary ">Bounds</span>
          </h1>

          {/* ... p content ... */}
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-md mx-auto">
            The tactical route you took led to an empty field. This match
            doesn&apos;t exist or has been moved to another stadium.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button
            onClick={() => (window.location.href = "/")}
            className="h-12 px-8 min-w-[200px] rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground   tracking-widest shadow-lg shadow-primary/20 active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <Home className="size-4" />
            Back to Home
          </button>

          <button
            onClick={() => (window.location.href = "/en/matches/football")}
            className="h-12 px-8 min-w-[200px] rounded-xl border border-border bg-card/50 hover:bg-muted   tracking-widest text-foreground active:scale-[0.98] transition-all cursor-pointer backdrop-blur-sm flex items-center justify-center gap-2"
          >
            <Trophy className="size-4" />
            Browse Matches
          </button>
        </div>

        {/* Support Link */}
        <p className="text-[10px] text-muted-foreground font-medium  tracking-[0.2em]">
          Need help?{" "}
          <Link
            href="/contact"
            className="text-primary hover:underline underline-offset-4"
          >
            Contact Support
          </Link>
        </p>
      </div>

      {/* ... corners ... */}
      <div className="absolute top-8 left-8 size-16 border-t border-l border-primary/20 rounded-tl-3xl pointer-events-none" />
      <div className="absolute bottom-8 right-8 size-16 border-b border-r border-primary/20 rounded-br-3xl pointer-events-none" />
    </main>
  );
}
