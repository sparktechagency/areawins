"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import React from "react";
import MatchSectionSkeleton from "@/components/skeleton/MatchSectionSkeleton";
import { useGetUpcomingMatchesBySportQuery } from "@/lib/redux/api/matchApi";
import { IMatch } from "@/interfaces/match.interface";
import { format } from "date-fns";
import Image from "next/image";

const BasketballSection: React.FC = () => {
  const { data: response, isLoading } = useGetUpcomingMatchesBySportQuery({
    slug: "basketball",
  });

  const matches: IMatch[] = response?.data?.results || [];

  if (isLoading) {
    return <MatchSectionSkeleton columns={6} />;
  }

  if (matches.length === 0) {
    return (
      <section className="w-full container mx-auto mb-20">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl  text-foreground tracking-tight flex items-center gap-3">
            <span className="size-8 rounded-lg bg-orange-500/10 flex items-center justify-center text-lg">
              🏀
            </span>
            Basketball Markets
          </h2>
        </div>

        <div className="w-full rounded-lg border border-dashed border-border bg-muted/5 py-12 flex flex-col items-center justify-center text-center">
          <div className="size-16 rounded-full bg-muted/10 flex items-center justify-center">
            <span className="text-3xl opacity-50">🏀</span>
          </div>
          <h3 className="text-lg font-semibold text-foreground tracking-tight">
            No Basketball Markets Available
          </h3>
          <p className="text-sm text-muted-foreground max-w-[280px] mt-2 leading-relaxed">
            There are currently no upcoming basketball matches. Please check
            back later for new opportunities.
          </p>
          <Button
            variant="outline"
            size="sm"
            asChild
            className="mt-6 rounded-full px-6 border-border hover:bg-muted/10 hover:text-foreground text-xs"
          >
            <Link href="/matches/all">Explore Other Sports</Link>
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full container mx-auto mb-20">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl  text-foreground tracking-tight flex items-center gap-3">
          <span className="size-8 rounded-lg bg-orange-500/10 flex items-center justify-center text-lg">
            🏀
          </span>
          Basketball Markets
        </h2>
        <Button
          variant="ghost"
          asChild
          className="text-sm tracking-widest text-primary hover:underline transition-colors"
        >
          <Link href="/matches/basketball">View All</Link>
        </Button>
      </div>

      <div className="w-full rounded-lg border border-border bg-card overflow-hidden shadow-sm">
        <div className="overflow-x-auto no-scrollbar">
          <Table>
            <TableHeader className="bg-muted/30">
              <TableRow className="hover:bg-transparent border-border/50">
                <TableHead className="py-5 pl-8 text-[10px]  uppercase tracking-widest text-muted-foreground whitespace-nowrap">
                  Tip-Off
                </TableHead>
                <TableHead className="py-5 text-[10px]  uppercase tracking-widest text-muted-foreground whitespace-nowrap">
                  League
                </TableHead>
                <TableHead className="py-5 text-[10px]  uppercase tracking-widest text-muted-foreground">
                  Match
                </TableHead>
                <TableHead className="py-5 text-center text-[10px]  uppercase tracking-widest text-muted-foreground">
                  📊 Bets
                </TableHead>
                <TableHead className="py-5 text-center text-[10px]  uppercase tracking-widest text-muted-foreground">
                  💰 Liquidity
                </TableHead>
                <TableHead className="py-5 pr-8 text-right text-[10px]  uppercase tracking-widest text-muted-foreground">
                  Dive In
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {matches.map((match) => (
                <TableRow
                  key={match._id}
                  className="hover:bg-muted/20 border-border/50 transition-all group"
                >
                  <TableCell className="pl-8 py-6">
                    <div className="flex flex-col">
                      <span className="text-sm  text-foreground">
                        {format(new Date(match.scheduledStartTime), "HH:mm")}
                      </span>
                      <span className="text-[10px] font-bold text-muted-foreground uppercase">
                        {format(
                          new Date(match.scheduledStartTime),
                          "EEE, MMM d",
                        )}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 group-hover:translate-x-1 transition-transform">
                      {match.tournament?.logo && (
                        <Image
                          src={match.tournament.logo}
                          alt=""
                          width={18}
                          height={18}
                          className="object-contain"
                        />
                      )}
                      <span className="text-[11px]  uppercase text-foreground truncate max-w-[150px]">
                        {match.tournament?.name}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2 min-w-[110px] justify-end">
                        <span className="text-xs  text-foreground truncate">
                          {match.homeTeam.name}
                        </span>
                        {match.homeTeam.logo && (
                          <Image
                            src={match.homeTeam.logo}
                            alt=""
                            width={16}
                            height={16}
                            className="object-contain"
                          />
                        )}
                      </div>
                      <span className="text-[10px] text-muted-foreground/30 italic">
                        vs
                      </span>
                      <div className="flex items-center gap-2 min-w-[110px]">
                        {match.awayTeam.logo && (
                          <Image
                            src={match.awayTeam.logo}
                            alt=""
                            width={16}
                            height={16}
                            className="object-contain"
                          />
                        )}
                        <span className="text-xs  text-foreground truncate">
                          {match.awayTeam.name}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <span className="text-xs  text-primary bg-primary/5 px-3 py-1 rounded-full border border-primary/10">
                      {match.totalBetsCount}
                    </span>
                  </TableCell>
                  <TableCell className="text-center font-medium text-foreground">
                    ${match.totalBetsAmount.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right pr-8">
                    <Button
                      asChild
                      size="sm"
                      className="h-9 rounded-lg bg-primary hover:bg-primary/90 text-white text-[10px]  uppercase tracking-widest px-5 shadow-sm shadow-primary/20"
                    >
                      <Link href={`/matches/${match._id}`}>
                        Browse Market <ChevronRight className="size-3.5 ml-1" />
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </section>
  );
};

export default BasketballSection;
