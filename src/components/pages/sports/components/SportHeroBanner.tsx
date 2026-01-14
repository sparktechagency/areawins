"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Flame } from "lucide-react";
import React from "react";

interface BannerConfig {
  bg: string;
  title: string;
  subtitle: string;
  promo?: string;
  matchStatus?: string;
}

interface SportHeroBannerProps {
  config: BannerConfig;
}
const SportHeroBanner: React.FC<SportHeroBannerProps> = ({ config }) => {
  return (
    <div className="relative rounded-[40px] overflow-hidden mb-12 min-h-[360px] flex flex-col justify-end border border-border group">
      <div
        className="absolute inset-0 bg-cover bg-center z-0 transition-transform duration-1000 group-hover:scale-105"
        style={{ backgroundImage: config.bg }}
      >
        <div className="absolute inset-0 bg-linear-to-t from-background via-background/40 to-transparent" />
        <div className="absolute inset-0 bg-linear-to-r from-background/90 via-background/20 to-transparent" />
      </div>

      <div className="relative z-10 p-10 max-w-3xl">
        <div className="flex items-center gap-3 mb-6">
          <Badge className="bg-primary text-white font-black border-none px-4 py-1.5 uppercase tracking-widest text-[10px] rounded-full flex items-center gap-2">
            <Flame className="size-3.5" />
            Active Market
          </Badge>
          <span className="text-white font-black text-[10px] bg-white/10 px-4 py-1.5 rounded-full backdrop-blur-xl border border-white/20 uppercase tracking-[0.2em]">
            {config.subtitle}
          </span>
        </div>

        <h2 className="text-4xl md:text-6xl font-black text-white mb-4 leading-none tracking-tight">
          {config.title}
        </h2>

        {config.matchStatus ? (
          <div className="bg-white/10 backdrop-blur-xl inline-flex items-center gap-3 px-6 py-3 rounded-2xl border border-white/20 mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
            </span>
            <p className="text-white text-lg font-black tracking-tight font-mono">
              {config.matchStatus}
            </p>
          </div>
        ) : (
          <p className="text-white/80 text-lg mb-8 max-w-lg leading-relaxed font-bold uppercase tracking-wide">
            {config.promo}
          </p>
        )}

        <div className="flex items-center gap-4">
          <Button className="h-14 px-10 rounded-2xl bg-white text-black hover:bg-white/90 font-black uppercase tracking-widest transition-all active:scale-95">
            Join Market
          </Button>
          <Button
            variant="ghost"
            className="h-14 px-8 rounded-2xl text-white font-black uppercase tracking-widest hover:bg-white/10"
          >
            View Charts
            <ArrowRight className="size-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SportHeroBanner;
