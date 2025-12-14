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
        status: "Won"
    },
    {
        id: "2",
        date: "Oct 25, 20:45",
        event: "Real Madrid vs Barcelona",
        market: "Both Teams to Score - Yes",
        stake: 1000,
        odds: 1.60,
        return: 1600,
        status: "Pending"
    },
    {
        id: "3",
        date: "Oct 23, 14:00",
        event: "Bangladesh vs India",
        market: "Cricket - Total Runs Over 300",
        stake: 250,
        odds: 2.10,
        return: 525,
        status: "Lost"
    },
    {
        id: "4",
        date: "Oct 22, 19:00",
        event: "Lakers vs Warriors",
        market: "Point Spread - Lakers +5.5",
        stake: 2000,
        odds: 1.90,
        return: 3800,
        status: "Won"
    }
];

export default function RecentBetsTable() {
    // In a real scenario we would map 'data' from the API to this format
    // const { data: bets } = useGetBetStatisticsQuery(); 
    
  return (
    <Card className="bg-card dark:bg-[#112218] border-border mt-6">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
           <span className="text-primary">📋</span>
           <CardTitle className="text-foreground text-lg">Recent Bets</CardTitle>
        </div>
        <Link href={ROUTES.MY_BETS || "/my-bets"}>
           <Button variant="ghost" className="text-primary hover:text-primary/80 hover:bg-transparent p-0 text-sm font-normal">
              View All History
           </Button>
        </Link>
      </CardHeader>
      <CardContent className="p-0">
          <div className="overflow-x-auto">
              <table className="w-full">
                  <thead>
                      <tr className="border-b border-border text-xs uppercase text-muted-foreground">
                          <th className="text-left py-4 px-6 font-medium">Date</th>
                          <th className="text-left py-4 px-6 font-medium">Event / Market</th>
                          <th className="text-left py-4 px-6 font-medium">Stake</th>
                          <th className="text-left py-4 px-6 font-medium">Odds</th>
                          <th className="text-left py-4 px-6 font-medium">Return</th>
                          <th className="text-right py-4 px-6 font-medium">Status</th>
                      </tr>
                  </thead>
                  <tbody>
                      {mockBets.map((bet) => (
                          <tr key={bet.id} className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors">
                              <td className="py-4 px-6 text-sm text-foreground/70 font-medium">{bet.date}</td>
                              <td className="py-4 px-6">
                                  <div className="flex flex-col">
                                      <span className="text-foreground font-bold text-sm">{bet.event}</span>
                                      <span className="text-xs text-muted-foreground">{bet.market}</span>
                                  </div>
                              </td>
                              <td className="py-4 px-6 text-sm text-foreground font-medium">{formatCurrency(bet.stake)}</td>
                              <td className="py-4 px-6 text-sm text-muted-foreground">{bet.odds.toFixed(2)}</td>
                              <td className="py-4 px-6 text-sm text-primary font-bold">{bet.status !== 'Lost' ? formatCurrency(bet.return) : '-'}</td>
                              <td className="py-4 px-6 text-right">
                                  <Badge className={`
                                      ${bet.status === 'Won' ? 'bg-green-500/10 text-green-500 hover:bg-green-500/20' : ''}
                                      ${bet.status === 'Pending' ? 'bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20' : ''}
                                      ${bet.status === 'Lost' ? 'bg-red-500/10 text-red-500 hover:bg-red-500/20' : ''}
                                      border-0 px-3 py-1 rounded-full uppercase text-[10px] font-bold tracking-wider
                                  `}>
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
