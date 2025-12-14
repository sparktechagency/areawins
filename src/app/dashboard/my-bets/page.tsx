"use client";

import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatCurrency } from "@/lib/utils";
import { Clock, Trophy } from "lucide-react";

export default function MyBetsPage() {
  const bets = [
    {
      id: "bet_123456",
      event: "Man City vs Arsenal",
      selection: "Man City to win",
      type: "Single",
      stake: 500,
      odds: 1.85,
      potentialWin: 925,
      status: "Won",
      date: "24 Oct, 18:30"
    },
    {
      id: "bet_789012",
      event: "Real Madrid vs Barcelona",
      selection: "Both Teams to Score",
      type: "Single",
      stake: 1000,
      odds: 1.60,
      potentialWin: 1600,
      status: "Pending",
      date: "25 Oct, 20:45"
    },
    {
      id: "bet_345678",
      event: "Lakers vs Warriors",
      selection: "Lakers +5.5",
      type: "Single",
      stake: 2000,
      odds: 1.90,
      potentialWin: 3800,
      status: "Won",
      date: "22 Oct, 19:00"
    },
     {
      id: "bet_901234",
      event: "Bangladesh vs India",
      selection: "India to win",
      type: "Single",
      stake: 500,
      odds: 1.40,
      potentialWin: 700,
      status: "Lost",
      date: "20 Oct, 14:00"
    }
  ];

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
            My Bets <Trophy className="w-8 h-8 text-primary" />
          </h1>
          <p className="text-muted-foreground mt-2">
            Track your open and settled bets
          </p>
        </div>

        <Tabs defaultValue="all" className="space-y-6">
          <TabsList>
            <TabsTrigger value="all">All Bets</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="won">Won</TabsTrigger>
            <TabsTrigger value="lost">Lost</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
             {bets.map((bet) => (
                <BetCard key={bet.id} bet={bet} />
             ))}
          </TabsContent>
          <TabsContent value="active" className="space-y-4">
             {bets.filter(b => b.status === "Pending").map((bet) => (
                <BetCard key={bet.id} bet={bet} />
             ))}
          </TabsContent>
          <TabsContent value="won" className="space-y-4">
             {bets.filter(b => b.status === "Won").map((bet) => (
                <BetCard key={bet.id} bet={bet} />
             ))}
          </TabsContent>
          <TabsContent value="lost" className="space-y-4">
             {bets.filter(b => b.status === "Lost").map((bet) => (
                <BetCard key={bet.id} bet={bet} />
             ))}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}

function BetCard({ bet }: { bet: any }) {
   return (
      <Card className="bg-card border-border">
         <CardContent className="p-6">
            <div className="flex flex-col md:flex-row justify-between gap-4">
               <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                     <Badge variant="outline" className="text-xs">{bet.type}</Badge>
                     <span className="text-sm text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {bet.date}
                     </span>
                  </div>
                  <h3 className="font-bold text-lg text-foreground mb-1">{bet.selection}</h3>
                  <p className="text-muted-foreground">{bet.event}</p>
               </div>
               
               <div className="flex items-center justify-between md:justify-end gap-8">
                  <div className="text-right">
                     <p className="text-xs text-muted-foreground uppercase font-bold">Stake</p>
                     <p className="font-semibold text-foreground">{formatCurrency(bet.stake)}</p>
                  </div>
                  <div className="text-right">
                     <p className="text-xs text-muted-foreground uppercase font-bold">Odds</p>
                     <p className="font-semibold text-foreground">{bet.odds.toFixed(2)}</p>
                  </div>
                  <div className="text-right min-w-[80px]">
                     <p className="text-xs text-muted-foreground uppercase font-bold">Return</p>
                     <p className={`font-bold ${bet.status === 'Won' ? 'text-primary' : 'text-foreground'}`}>
                        {bet.status === 'Lost' ? '0.00' : formatCurrency(bet.potentialWin)}
                     </p>
                  </div>
                  <div>
                      <Badge className={`
                          ${bet.status === 'Won' ? 'bg-green-500/10 text-green-500 hover:bg-green-500/20' : ''}
                          ${bet.status === 'Pending' ? 'bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20' : ''}
                          ${bet.status === 'Lost' ? 'bg-red-500/10 text-red-500 hover:bg-red-500/20' : ''}
                          border-0 px-3 py-1
                      `}>
                          {bet.status}
                      </Badge>
                  </div>
               </div>
            </div>
         </CardContent>
      </Card>
   )
}
