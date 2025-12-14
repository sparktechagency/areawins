"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { Circle, Filter, Search, Trophy } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

// Extended Match Interface to support multi-sport
interface Match {
   id: string;
   homeTeam: string;
   awayTeam: string;
   date: string;
   time: string;
   league: string;
   isLive: boolean;
   score?: { home: number | string; away: number | string; time?: string }; // Modified for cricket (runs/wickets)
   odds: {
      home: number;
      draw?: number; // Draw optional for some sports
      away: number;
   };
   markets: number;
   sport: "football" | "cricket" | "basketball" | "volleyball";
}

interface SportsBettingInterfaceProps {
   sport: string;
}

export default function SportsBettingInterface({ sport }: SportsBettingInterfaceProps) {
   const [searchQuery, setSearchQuery] = useState("");
   const sportKey = sport.toLowerCase();
   const sportName = sport.charAt(0).toUpperCase() + sport.slice(1);

   // Configuration based on images
   const config = {
      football: {
         theme: "from-green-900 to-green-950",
         accent: "#00d65c", // Green
         logo: "⚽",
         banner: {
            bg: "url('https://images.unsplash.com/photo-1522778119026-d647f0565c6a?auto=format&fit=crop&q=80')",
            title: "Man City vs Arsenal",
            subtitle: "Premier League",
            promo: "Get enhanced odds on Haaland to score anytime",
            oldOdds: "2.50",
            newOdds: "4.00"
         }
      },
      cricket: {
         theme: "from-emerald-900 to-emerald-950",
         accent: "#10b981", // Emerald
         logo: "🏏",
         banner: {
            bg: "url('https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&q=80')",
            title: "CSK vs RCB",
            subtitle: "Indian Premier League",
            promo: "Get up to ৳10,000 on your first World Cup deposit",
            matchStatus: "CSK: 145/3 (16.2) • RCB Need 42 off 22 balls"
         }
      },
      volleyball: {
         theme: "from-blue-900 to-blue-950",
         accent: "#3b82f6", // Blue
         logo: "🏐",
         banner: {
            bg: "url('https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?auto=format&fit=crop&q=80')",
            title: "Volleyball Betting",
            subtitle: "Serve into ease", // Placeholder
            promo: "Bet on top leagues including SuperLega, PlusLiga & Nations League"
         }
      },
      basketball: { // Fallback/Extra
         theme: "from-orange-900 to-orange-950",
         accent: "#f97316",
         logo: "🏀",
         banner: {
            bg: "url('https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&q=80')",
            title: "NBA Finals",
            subtitle: "Playoffs",
            promo: "Live betting available for every quarter"
         }
      }
   };

   const activeConfig = config[sportKey as keyof typeof config] || config.football;

   // Mock Matches matching screenshots
   const matches: Match[] = [
      // FOOTBALL
      {
         id: "f1", sport: "football", homeTeam: "Liverpool", awayTeam: "Chelsea",
         date: "Today", time: "20:00", league: "Premier League", isLive: true,
         score: { home: 2, away: 1, time: "65' 2nd Half" },
         odds: { home: 1.45, draw: 4.20, away: 7.50 },
         markets: 54
      },
      {
         id: "f2", sport: "football", homeTeam: "Real Madrid", awayTeam: "Barcelona",
         date: "Today", time: "22:00", league: "La Liga", isLive: true,
         score: { home: 0, away: 0, time: "22' 1st Half" },
         odds: { home: 2.10, draw: 3.40, away: 2.90 },
         markets: 122
      },
      // CRICKET
      {
         id: "c1", sport: "cricket", homeTeam: "Mumbai Indians", awayTeam: "Chennai Super Kings",
         date: "Today", time: "19:30", league: "IPL T20", isLive: true,
         score: { home: "168/4 (18.2 ov)", away: "Yet to Bat", time: "18:42 Live" },
         odds: { home: 2.45, draw: 0, away: 1.52 }, // Draw often unused in T20 betting display
         markets: 12
      },
      {
         id: "c2", sport: "cricket", homeTeam: "Stars", awayTeam: "Thunder",
         date: "Today", time: "04:15", league: "Big Bash League", isLive: true,
         score: { home: "142/8 (20 ov)", away: "45/1 (4.2 ov)", time: "04:12 Live" },
         odds: { home: 5.80, draw: 0, away: 1.12 },
         markets: 8
      },
      // VOLLEYBALL
      {
         id: "v1", sport: "volleyball", homeTeam: "Sada Cruzeiro", awayTeam: "Minas",
         date: "Today", time: "Live", league: "Brazil - Superliga", isLive: true,
         score: { home: 2, away: 1, time: "Set 4" },
         odds: { home: 1.45, away: 2.75 }, // No draw
         markets: 42
      },
      {
         id: "v2", sport: "volleyball", homeTeam: "Trentino Volley", awayTeam: "Perugia",
         date: "Today", time: "18:00", league: "Italy - SuperLega", isLive: false,
         odds: { home: 1.85, away: 1.95 },
         markets: 36
      }
   ];

   const filteredMatches = matches.filter(m => m.sport === sportKey);

   return (
      <div className="flex flex-col xl:flex-row gap-6 h-[calc(100vh-100px)] bg-[#112218] text-white p-4 overflow-hidden">
         {/* Sidebar - mimicking screenshot left nav (Optional if layout already has one, but creating integrated view) */}
         <div className="w-64 hidden 2xl:block flex-shrink-0 space-y-6 pr-4 border-r border-white/10 overflow-y-auto custom-scrollbar">
            {/* Top Menu from Image 0 */}
            <div className="space-y-1">
               <NavItem icon={<Trophy className="w-4 h-4" />} label="Top Leagues" active />
               <NavItem icon={<Circle className="w-4 h-4 text-green-500" />} label="Premier League" count={12} />
               <NavItem icon={<Circle className="w-4 h-4" />} label="Champions League" count={4} />
               <NavItem icon={<Circle className="w-4 h-4" />} label="La Liga" count={8} />
               <NavItem icon={<Circle className="w-4 h-4" />} label="Bangladesh PL" count={2} />
            </div>

            <div className="space-y-1 pt-4 border-t border-white/10">
               <h3 className="text-xs font-bold text-white/50 uppercase tracking-wider mb-2 px-3">All Countries</h3>
               <NavItem icon={<GlobeIcon />} label="England" />
               <NavItem icon={<GlobeIcon />} label="Spain" />
               <NavItem icon={<GlobeIcon />} label="Germany" />
               <NavItem icon={<GlobeIcon />} label="Italy" />
               <NavItem icon={<GlobeIcon />} label="France" />
            </div>
         </div>

         {/* Main Content Area */}
         <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
            {/* Header / Search */}
            <div className="flex items-center justify-between mb-6">
               <h1 className="text-2xl font-bold flex items-center gap-2">
                  <span className="text-primary">{activeConfig.logo}</span> {sportName} Bets
               </h1>
               <div className="relative w-80 hidden md:block">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                     placeholder="Search events, teams or leagues"
                     className="pl-10 bg-[#1a2c24] border-gray-700 text-white placeholder:text-gray-500 focus-visible:ring-primary"
                     value={searchQuery}
                     onChange={(e) => setSearchQuery(e.target.value)}
                  />
               </div>
               <div className="flex gap-2">
                  <Button className="bg-[#1a2c24] hover:bg-[#233a30] text-primary border border-primary/20">
                     $ 520.50
                  </Button>
                  <Button className="bg-primary hover:bg-primary/90 text-black font-bold">
                     Deposit
                  </Button>
                  <div className="w-10 h-10 rounded-full bg-gray-700 overflow-hidden border-2 border-primary/20">
                     <Image
                        src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80"
                        alt="User" width={40} height={40}
                     />
                  </div>
               </div>
            </div>

            {/* Hero Banner - Dynamic based on sport */}
            <div
               className="relative rounded-2xl overflow-hidden mb-8 min-h-[240px] flex flex-col justify-end"
            >
               {/* Background Image with Overlay */}
               <div
                  className="absolute inset-0 bg-cover bg-center z-0"
                  style={{ backgroundImage: activeConfig.banner.bg }}
               >
                  <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />
               </div>

               <div className="relative z-10 p-8 max-w-2xl">
                  <div className="flex items-center gap-3 mb-2">
                     <Badge className="bg-primary text-black hover:bg-primary font-bold border-none">
                        {activeConfig.banner.promo?.includes("Bonus") ? "PROMOTION" : "SUPER BOOST"}
                     </Badge>
                     <span className="text-white/80 font-medium text-sm bg-black/30 px-2 py-0.5 rounded backdrop-blur-sm">
                        {activeConfig.banner.subtitle}
                     </span>
                  </div>

                  <h2 className="text-3xl md:text-4xl font-black text-white mb-2 leading-tight">
                     {activeConfig.banner.title}
                  </h2>

                  {activeConfig.banner.matchStatus ? (
                     <p className="text-white/90 text-lg mb-4 font-mono">{activeConfig.banner.matchStatus}</p>
                  ) : (
                     <p className="text-white/80 text-lg mb-4">{activeConfig.banner.promo}</p>
                  )}

                  {activeConfig.banner.oldOdds && (
                     <div className="flex items-center gap-3 mb-4">
                        <span className="text-gray-400 line-through text-lg">{activeConfig.banner.oldOdds}</span>
                        <span className="text-primary text-3xl font-black">{activeConfig.banner.newOdds}</span>
                     </div>
                  )}

                  <Button size="lg" className="bg-white text-black hover:bg-gray-100 font-bold border-none px-8">
                     {activeConfig.banner.matchStatus ? "Be Now" : "Claim Now"}
                  </Button>
               </div>
            </div>

            {/* Tabs - Live/Upcoming */}
            <div className="mb-6">
               <Tabs defaultValue="live" className="w-full">
                  <TabsList className="bg-transparent border-b border-white/10 w-full justify-start h-auto p-0 rounded-none gap-6">
                     <TabsTrigger
                        value="live"
                        className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-0 pb-3 text-base font-bold text-gray-400 data-[state=active]:text-white transition-all"
                     >
                        Live Now
                     </TabsTrigger>
                     <TabsTrigger
                        value="upcoming"
                        className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-0 pb-3 text-base font-bold text-gray-400 data-[state=active]:text-white transition-all"
                     >
                        Upcoming
                     </TabsTrigger>
                     <TabsTrigger
                        value="outrights"
                        className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-0 pb-3 text-base font-bold text-gray-400 data-[state=active]:text-white transition-all"
                     >
                        Outrights
                     </TabsTrigger>
                  </TabsList>

                  <div className="mt-6 flex items-center gap-2 mb-4">
                     <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                     <h3 className="font-bold text-xl text-white">Live Matches</h3>
                     <div className="ml-auto">
                        <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-white/5">
                           <Filter className="w-5 h-5" />
                        </Button>
                     </div>
                  </div>

                  <TabsContent value="live" className="space-y-4">
                     {filteredMatches.filter(m => m.isLive).map(match => (
                        <SportMatchCard key={match.id} match={match} sport={sportKey} />
                     ))}
                     {filteredMatches.filter(m => m.isLive).length === 0 && (
                        <div className="text-center py-20 text-gray-500 bg-[#1a2c24]/30 rounded-xl">
                           No live matches right now. Check upcoming!
                        </div>
                     )}
                  </TabsContent>

                  <TabsContent value="upcoming" className="space-y-4">
                     <div className="text-white">Upcoming matches list...</div>
                     {/* Reuse Match Cards for upcoming if needed */}
                  </TabsContent>
               </Tabs>
            </div>
         </div>

         {/* Right Column: Bet Slip (Desktop) */}
         <div className="w-80 hidden xl:block flex-shrink-0">
            <div className="bg-[#1a2c24] rounded-xl border border-white/5 overflow-hidden sticky top-6">
               <div className="bg-[#14221c] p-4 flex items-center justify-between border-b border-white/5">
                  <div className="flex items-center gap-2">
                     <div className="w-6 h-6 rounded-full bg-primary text-black flex items-center justify-center font-bold text-xs">1</div>
                     <h3 className="font-bold text-white">Bet Slip</h3>
                  </div>
                  <Button variant="ghost" size="sm" className="text-xs text-primary hover:text-primary/80 h-auto p-0">Remove All</Button>
               </div>

               {/* Simulated Active Bet */}
               <div className="p-4 space-y-4">
                  {sportKey === 'football' && (
                     <div className="bg-[#112218] p-3 rounded-lg border border-white/5 relative group">
                        <button className="absolute right-2 top-2 text-gray-500 hover:text-white"><span className="sr-only">Remove</span>×</button>
                        <div className="text-xs text-primary mb-1 flex items-center gap-2">
                           <span className="bg-red-500/20 text-red-500 px-1 rounded text-[10px]">LIVE</span>
                           Match Result
                        </div>
                        <div className="font-bold text-white text-sm mb-1">Liverpool vs Chelsea</div>
                        <div className="text-xs text-gray-400 mb-2">Liverpool to Win</div>
                        <div className="flex items-center justify-between mt-2">
                           <Badge className="bg-primary/20 text-primary hover:bg-primary/30 border-none">1.45</Badge>
                           <div className="flex items-center gap-1">
                              <span className="text-xs text-gray-500">Stake</span>
                              <div className="w-16 h-7 bg-[#0b1610] rounded border border-white/10 flex items-center justify-center text-sm font-bold">
                                 $500
                              </div>
                           </div>
                        </div>
                     </div>
                  )}

                  {sportKey === 'cricket' && (
                     <div className="bg-[#112218] p-3 rounded-lg border border-white/5 relative group">
                        <button className="absolute right-2 top-2 text-gray-500 hover:text-white"><span className="sr-only">Remove</span>×</button>
                        <div className="text-xs text-primary mb-1 flex items-center gap-2">
                           <span className="bg-red-500/20 text-red-500 px-1 rounded text-[10px]">LIVE</span>
                           To Win Match
                        </div>
                        <div className="font-bold text-white text-sm mb-1">CSK vs MI</div>
                        <div className="text-xs text-gray-400 mb-2">CSK</div>
                        <div className="flex items-center justify-between mt-2">
                           <Badge className="bg-primary/20 text-primary hover:bg-primary/30 border-none">1.52</Badge>
                           <div className="flex items-center gap-1">
                              <span className="text-xs text-gray-500">Stake</span>
                              <div className="w-16 h-7 bg-[#0b1610] rounded border border-white/10 flex items-center justify-center text-sm font-bold">
                                 ৳500
                              </div>
                           </div>
                        </div>
                     </div>
                  )}

                  <div className="pt-4 border-t border-white/5 space-y-2">
                     <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Total Odds</span>
                        <span className="font-bold text-primary">1.45</span>
                     </div>
                     <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Stake Amount</span>
                        <span className="font-bold text-white">$500.00</span>
                     </div>
                     <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Potential Return</span>
                        <span className="font-bold text-primary">$725.00</span>
                     </div>
                  </div>

                  <Button className="w-full bg-primary hover:bg-primary/90 text-black font-bold h-12 text-lg mt-2">
                     Place Bet
                  </Button>
               </div>
            </div>
         </div>
      </div>
   );
}

// Sub-components

function NavItem({ icon, label, count, active }: { icon: any, label: string, count?: number, active?: boolean }) {
   return (
      <button className={cn(
         "flex items-center w-full px-3 py-2 rounded-lg transition-colors group",
         active ? "bg-[#1a2c24] text-white" : "text-gray-400 hover:bg-[#1a2c24] hover:text-white"
      )}>
         <span className="mr-3 opacity-70 group-hover:opacity-100">{icon}</span>
         <span className="flex-1 text-left text-sm font-medium">{label}</span>
         {count && <span className="text-xs text-gray-600 font-bold">{count}</span>}
      </button>
   )
}

function GlobeIcon() {
   return (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
   )
}

import Link from "next/link"; // Add import

function SportMatchCard({ match, sport }: { match: Match, sport: string }) {
   return (
      <div className="bg-[#1a2c24] rounded-xl p-4 md:p-5 flex flex-col md:flex-row gap-6 border border-white/5 hover:border-primary/30 transition-all group">

         {/* Team / Score Info - Clickable */}
         <Link href={`/bets/match/${match.id}`} className="flex-1 hover:opacity-80 transition-opacity">
            <div className="flex items-center gap-3 text-xs font-bold text-primary mb-4">
               {match.isLive && match.score && (
                  <>
                     <span className="text-primary">{typeof match.score.time === 'string' ? match.score.time : ''}</span>
                  </>
               )}
            </div>

            <div className="grid grid-cols-[120px_1fr] md:grid-cols-[160px_1fr] gap-4 mb-2">
               {/* Home Team */}
               <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-700 flex-shrink-0" /> {/* Placeholder Logo */}
                  <span className="font-bold text-white truncate text-lg">{match.homeTeam}</span>
               </div>
               <div className="flex items-center">
                  <span className="font-bold text-primary text-lg ml-auto md:ml-0 md:pl-8">
                     {typeof match.score?.home === 'string' ? match.score.home : match.score?.home}
                  </span>
               </div>

               {/* Away Team */}
               <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-700 flex-shrink-0" /> {/* Placeholder Logo */}
                  <span className="font-bold text-white truncate text-lg">{match.awayTeam}</span>
               </div>
               <div className="flex items-center">
                  <span className="font-bold text-primary text-lg ml-auto md:ml-0 md:pl-8">
                     {typeof match.score?.away === 'string' ? match.score.away : match.score?.away}
                  </span>
               </div>
            </div>

            {sport === 'cricket' && match.score && (
               <div className="text-xs text-gray-400 mt-2 ml-10">
                  {match.homeTeam}: {match.score.home}, {match.awayTeam}: {match.score.away}
               </div>
            )}
         </Link>

         {/* Markets / Odds */}
         <div className="flex flex-col justify-center min-w-[300px]">
            <div className="flex items-center justify-between text-[10px] text-gray-500 font-bold uppercase mb-2 px-1">
               <span>Match Result</span>
               {sport === 'football' && <span>Goals O/U 3.5</span>}
               {sport === 'cricket' && <span>Draw No Bet</span>}
            </div>

            <div className="flex gap-3">
               {/* 1X2 or Main Odds */}
               <div className="flex bg-[#0b1610] rounded-lg p-1 gap-1 flex-1">
                  <OddBox label="1" value={match.odds.home} highlight />
                  {match.odds.draw !== undefined && match.odds.draw !== 0 && (
                     <OddBox label="X" value={match.odds.draw} />
                  )}
                  <OddBox label="2" value={match.odds.away} />
               </div>

               {/* Secondary Market (Goals or Draw) */}
               {sport === 'football' && (
                  <div className="flex bg-[#0b1610] rounded-lg p-1 gap-1 flex-1">
                     <OddBox label="Over" value={1.85} />
                     <OddBox label="Under" value={1.95} />
                  </div>
               )}

               <div className="flex items-center justify-center w-10 h-10 bg-[#0b1610] rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 cursor-pointer transition-colors">
                  <span className="text-xs font-bold">+{match.markets}</span>
               </div>
            </div>
         </div>
      </div>
   )
}

function OddBox({ label, value, highlight }: { label: string, value: number, highlight?: boolean }) {
   return (
      <div className={cn(
         "flex flex-col items-center justify-center flex-1 py-1 px-2 rounded cursor-pointer transition-all hover:bg-gray-700",
         highlight ? "bg-primary/10 text-primary" : "text-white"
      )}>
         <span className="text-[10px] text-gray-500 mb-0.5">{label}</span>
         <span className={cn("font-bold text-sm", highlight ? "text-primary" : "text-white")}>{value.toFixed(2)}</span>
      </div>
   )
}
