"use client";
import Link from "next/link";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle, Home, RotateCcw } from "lucide-react";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="relative min-h-screen flex items-center justify-center p-6 overflow-hidden bg-background text-foreground transition-colors duration-500">
      {/* Immersive Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none select-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-destructive/10 dark:bg-destructive/20 rounded-full blur-[150px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-red-500/10 dark:bg-red-600/20 rounded-full blur-[150px] animate-pulse delay-1000" />
      </div>
      
      <div className="relative w-full max-w-2xl text-center space-y-12">
        {/* Visual Identity Section */}
        <div className="relative inline-block group">
          <div className="absolute inset-0 bg-destructive/20 dark:bg-destructive/40 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-700 ease-in-out opacity-60" />
          
          <div className="relative flex items-center justify-center">
            <span className="text-[12rem] md:text-[16rem] font-bold tracking-tighter opacity-5 select-none font-mono transition-colors">
              500
            </span>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="size-24 md:size-32 rounded-3xl bg-card/60 dark:bg-card/40 border border-destructive/20 shadow-2xl backdrop-blur-xl flex items-center justify-center rotate-12 group-hover:rotate-0 transition-all duration-500">
                <div className="p-4 rounded-2xl bg-destructive/10 dark:bg-destructive/20 border border-destructive/20">
                  <AlertCircle className="size-10 md:size-12 text-destructive" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Messaging Section */}
        <div className="space-y-4 max-w-lg mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-destructive/10 border border-destructive/20">
            <div className="size-1.5 rounded-full bg-destructive animate-ping" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-destructive">
              Strategic Foul
            </span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-foreground uppercase tracking-tight">
            Unexpected <span className="text-destructive italic">Error</span>
          </h1>
          
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-md mx-auto">
             Something went wrong in our backend stadium. We are investigating the case. 
             The match isn&apos;t over yet, try a quick reset!
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Button
            onClick={reset}
            size="lg"
            className="h-12 px-8 min-w-[200px] rounded-xl bg-destructive hover:bg-destructive/90 text-white font-bold uppercase tracking-widest shadow-lg shadow-destructive/20 active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-2"
          >
              <RotateCcw className="size-4" />
              Reset Field
          </Button>
          
          <button
            onClick={() => window.location.href = "/"}
            className="h-12 px-8 min-w-[200px] rounded-xl border border-border bg-card/50 hover:bg-muted font-bold uppercase tracking-widest text-foreground active:scale-[0.98] transition-all cursor-pointer backdrop-blur-sm flex items-center justify-center gap-2"
          >
              <Home className="size-4" />
              Back to Home
          </button>
        </div>

        {/* Footer Support */}
        <div className="pt-8 border-t border-border/50 max-w-[200px] mx-auto">
          <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-[0.2em]">
            Persistent issues? <Link href="/contact" className="text-destructive hover:underline underline-offset-4 font-bold transition-all">Report Incident</Link>
          </p>
        </div>
      </div>
      
      {/* Decorative Corner Borders */}
      <div className="absolute top-8 left-8 size-16 border-t border-l border-destructive/20 rounded-tl-3xl pointer-events-none" />
      <div className="absolute bottom-8 right-8 size-16 border-b border-r border-destructive/20 rounded-br-3xl pointer-events-none" />
    </main>
  );
}
