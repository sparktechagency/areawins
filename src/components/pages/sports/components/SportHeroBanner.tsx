"use client";
import { Badge } from "@/components/ui/badge";
import React from "react";

interface BannerConfig {
  bg: string;
  title: string;
  subtitle: string;
  promo?: string;
  matchStatus?: string;
  oldOdds?: string;
  newOdds?: string;
}

interface SportHeroBannerProps {
  config: BannerConfig;
}
const SportHeroBanner: React.FC<SportHeroBannerProps> = ({ config }) => {
  return (
    <div className="relative rounded-2xl overflow-hidden mb-8 min-h-[300px] flex flex-col justify-end shadow-md">
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: config.bg }}
      >
        <div className="absolute inset-0 bg-linear-to-t from-background via-background/60 to-transparent" />
        <div className="absolute inset-0 bg-linear-to-r from-background/80 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 p-8 max-w-2xl">
        <div className="flex items-center gap-3 mb-4">
          <Badge className="bg-primary text-primary-foreground hover:bg-primary/90 font-black border-none px-3 py-1 uppercase tracking-widest text-[10px]">
            {config.promo?.includes("Bonus") ? "PROMOTION" : "SUPER BOOST"}
          </Badge>
          <span className="text-foreground/90 font-bold text-sm bg-muted/30 px-3 py-1 rounded backdrop-blur-md border border-white/10 uppercase tracking-tighter">
            {config.subtitle}
          </span>
        </div>

        <h2 className="text-4xl md:text-5xl font-black text-foreground mb-3 leading-[1.1] tracking-tight">
          {config.title}
        </h2>

        {config.matchStatus ? (
          <p className="text-primary text-xl mb-6 font-black tracking-wide font-mono bg-primary/10 inline-block px-4 py-1 rounded border border-primary/20">
            {config.matchStatus}
          </p>
        ) : (
          <p className="text-muted-foreground text-lg mb-6 max-w-lg leading-relaxed font-medium">
            {config.promo}
          </p>
        )}

        {config.oldOdds && (
          <div className="flex items-center gap-4 mb-6">
            <span className="text-muted-foreground line-through text-xl font-bold italic">
              {config.oldOdds}
            </span>
            <span className="text-white bg-primary px-4 py-1 rounded-lg text-4xl font-black shadow-lg shadow-primary/20">
              {config.newOdds}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default SportHeroBanner;
