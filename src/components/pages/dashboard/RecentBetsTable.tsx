"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ROUTES } from "@/lib/constants";
import { formatCurrency } from "@/lib/utils";
import Link from "next/link";

// Mock data for display purposes to match design until real data is fully wired with this format
const mockBets = [
  {
    id: "1",
    date: "Oct 24, 18:30",
    event: "Man City vs Arsenal",
    market: "Match Winner - Man City",
    stake: 500,
    odds: 1.85,
    return: 925,
    status: "Won",
  },
  {
    id: "2",
    date: "Oct 25, 20:45",
    event: "Real Madrid vs Barcelona",
    market: "Both Teams to Score - Yes",
    stake: 1000,
    odds: 1.6,
    return: 1600,
    status: "Pending",
  },
  {
    id: "3",
    date: "Oct 23, 14:00",
    event: "Bangladesh vs India",
    market: "Cricket - Total Runs Over 300",
    stake: 250,
    odds: 2.1,
    return: 525,
    status: "Lost",
  },
  {
    id: "4",
    date: "Oct 22, 19:00",
    event: "Lakers vs Warriors",
    market: "Point Spread - Lakers +5.5",
    stake: 2000,
    odds: 1.9,
    return: 3800,
    status: "Won",
  },
];

export default function RecentBetsTable() {
  // In a real scenario we would map 'data' from the API to this format
  // const { data: bets } = useGetBetStatisticsQuery();

  return (
    <Card className="bg-card border-border mt-10 shadow-none overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between border-b border-border py-6 px-8">
        <div className="flex items-center gap-3">
          <span className="text-primary text-xl">📋</span>
          <CardTitle className="text-foreground text-xl font-black uppercase tracking-tight">
            Recent Activity
          </CardTitle>
        </div>
        <Link href={ROUTES.MY_BETS || "/my-bets"}>
          <Button
            variant="ghost"
            className="text-primary hover:text-primary/80 hover:bg-primary/5 px-4 h-9 text-[10px] font-black uppercase tracking-widest rounded-lg"
          >
            History Console
          </Button>
        </Link>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full">
            <thead>
              <tr className="bg-muted/30 border-b border-border">
                <th className="text-left py-4 px-8 text-[10px] font-black uppercase tracking-widest text-muted-foreground whitespace-nowrap">
                  Timestamp
                </th>
                <th className="text-left py-4 px-6 text-[10px] font-black uppercase tracking-widest text-muted-foreground whitespace-nowrap">
                  Event Ecosystem
                </th>
                <th className="text-right py-4 px-6 text-[10px] font-black uppercase tracking-widest text-muted-foreground whitespace-nowrap">
                  Stake
                </th>
                <th className="text-center py-4 px-6 text-[10px] font-black uppercase tracking-widest text-muted-foreground whitespace-nowrap">
                  Odds
                </th>
                <th className="text-right py-4 px-6 text-[10px] font-black uppercase tracking-widest text-muted-foreground whitespace-nowrap">
                  Potential
                </th>
                <th className="text-right py-4 px-8 text-[10px] font-black uppercase tracking-widest text-muted-foreground whitespace-nowrap">
                  Outcome
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {mockBets.map((bet) => (
                <tr
                  key={bet.id}
                  className="hover:bg-muted/10 transition-colors"
                >
                  <td className="py-5 px-8 text-[11px] text-foreground/50 font-bold whitespace-nowrap">
                    {bet.date}
                  </td>
                  <td className="py-5 px-6">
                    <div className="flex flex-col">
                      <span className="text-foreground font-black text-sm uppercase tracking-tight">
                        {bet.event}
                      </span>
                      <span className="text-[10px] font-bold text-muted-foreground tracking-wide mt-0.5">
                        {bet.market}
                      </span>
                    </div>
                  </td>
                  <td className="py-5 px-6 text-sm text-foreground font-black text-right">
                    {formatCurrency(bet.stake)}
                  </td>
                  <td className="py-5 px-6 text-xs text-muted-foreground font-bold text-center">
                    x{bet.odds.toFixed(2)}
                  </td>
                  <td className="py-5 px-6 text-sm text-primary font-black text-right">
                    {bet.status !== "Lost" ? formatCurrency(bet.return) : "-"}
                  </td>
                  <td className="py-5 px-8 text-right">
                    <Badge
                      className={`
                                      ${
                                        bet.status === "Won"
                                          ? "bg-emerald-500 hover:bg-emerald-600"
                                          : ""
                                      }
                                      ${
                                        bet.status === "Pending"
                                          ? "bg-amber-500 hover:bg-amber-600"
                                          : ""
                                      }
                                      ${
                                        bet.status === "Lost"
                                          ? "bg-rose-500 hover:bg-rose-600"
                                          : ""
                                      }
                                      border-0 px-3 py-1 rounded-full uppercase text-[9px] font-black tracking-widest text-white
                                  `}
                    >
                      {bet.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
