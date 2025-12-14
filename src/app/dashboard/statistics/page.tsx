"use client";

import DashboardLayout from "@/components/layouts/DashboardLayout";
import ProfitLossChart from "@/components/pages/dashboard/ProfitLossChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatCurrency } from "@/lib/utils";
import { BarChart2, Calendar, PieChart, TrendingUp } from "lucide-react";

export default function StatisticsPage() {
  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
            Statistics <BarChart2 className="w-8 h-8 text-primary" />
          </h1>
          <p className="text-muted-foreground mt-2">
            Detailed analysis of your betting performance
          </p>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
            <TabsTrigger value="sports">By Sport</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               <Card>
                 <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                   <CardTitle className="text-sm font-medium">Total Turnover</CardTitle>
                   <TrendingUp className="h-4 w-4 text-muted-foreground" />
                 </CardHeader>
                 <CardContent>
                   <div className="text-2xl font-bold">{formatCurrency(154500)}</div>
                   <p className="text-xs text-muted-foreground">
                     +20.1% from last month
                   </p>
                 </CardContent>
               </Card>
               <Card>
                 <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                   <CardTitle className="text-sm font-medium">Bets Placed</CardTitle>
                   <PieChart className="h-4 w-4 text-muted-foreground" />
                 </CardHeader>
                 <CardContent>
                   <div className="text-2xl font-bold">142</div>
                   <p className="text-xs text-muted-foreground">
                     Avg. 4.5 bets per day
                   </p>
                 </CardContent>
               </Card>
               <Card>
                 <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                   <CardTitle className="text-sm font-medium">Active Days</CardTitle>
                   <Calendar className="h-4 w-4 text-muted-foreground" />
                 </CardHeader>
                 <CardContent>
                   <div className="text-2xl font-bold">28</div>
                   <p className="text-xs text-muted-foreground">
                     This month
                   </p>
                 </CardContent>
               </Card>
            </div>

            <div className="h-96">
                <ProfitLossChart />
            </div>
          </TabsContent>

          <TabsContent value="history">
            <Card>
               <CardContent className="p-8 text-center text-muted-foreground">
                  History view coming soon
               </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="sports">
            <Card>
               <CardContent className="p-8 text-center text-muted-foreground">
                  Sports breakdown coming soon
               </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
