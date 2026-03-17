"use client";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import DashboardGreeting from "./DashboardGreeting";
import RecentBetsTable from "./RecentBetsTable";
import StatsOverview from "./StatsOverview";

const areaChartData = [
  { name: "Jan", profit: 2400, loss: 1200 },
  { name: "Feb", profit: 3200, loss: 1100 },
  { name: "Mar", profit: 2800, loss: 1400 },
  { name: "Apr", profit: 3900, loss: 900 },
  { name: "May", profit: 4200, loss: 1100 },
  { name: "Jun", profit: 3800, loss: 1200 },
  { name: "Jul", profit: 4500, loss: 800 },
];

const barChartData = [
  { name: "Football", bets: 45, wins: 28 },
  { name: "Basketball", bets: 32, wins: 19 },
  { name: "Tennis", bets: 28, wins: 16 },
  { name: "Cricket", bets: 38, wins: 22 },
  { name: "Others", bets: 27, wins: 15 },
];

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="w-full mx-auto">
        {/* Greeting Section */}
        <DashboardGreeting />

        {/* Stats Overview Cards */}
        <StatsOverview />

        {/* Main Charts Section */}
        <div className="grid gap-6 mb-6">
          {/* Area Chart - Profit/Loss Trend */}
          <Card className="border border-border">
            <CardHeader>
              <CardTitle className="text-lg font-bold">
                Profit & Loss Trend
              </CardTitle>
              <p className="text-xs text-muted-foreground mt-2">
                Your betting performance over the last 7 months
              </p>
            </CardHeader>
            <CardContent>
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={areaChartData}>
                    <defs>
                      <linearGradient
                        id="colorProfit"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#10b981"
                          stopOpacity={0.3}
                        />
                        <stop
                          offset="95%"
                          stopColor="#10b981"
                          stopOpacity={0}
                        />
                      </linearGradient>
                      <linearGradient
                        id="colorLoss"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#ef4444"
                          stopOpacity={0.3}
                        />
                        <stop
                          offset="95%"
                          stopColor="#ef4444"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <XAxis stroke="#64748b" fontSize={12} />
                    <YAxis stroke="#64748b" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1a242d",
                        border: "1px solid #244732",
                        borderRadius: "8px",
                        color: "#fff",
                      }}
                    />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="profit"
                      stroke="#10b981"
                      fillOpacity={1}
                      fill="url(#colorProfit)"
                      name="Profit"
                    />
                    <Area
                      type="monotone"
                      dataKey="loss"
                      stroke="#ef4444"
                      fillOpacity={1}
                      fill="url(#colorLoss)"
                      name="Loss"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Bar Chart - Bets by Sport */}
          <Card className="border border-border">
            <CardHeader>
              <CardTitle className="text-lg font-bold">Bets by Sport</CardTitle>
              <p className="text-xs text-muted-foreground mt-2">
                Total bets placed and wins by sport category
              </p>
            </CardHeader>
            <CardContent>
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={barChartData}>
                    <XAxis stroke="#64748b" fontSize={12} />
                    <YAxis stroke="#64748b" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1a242d",
                        border: "1px solid #244732",
                        borderRadius: "8px",
                        color: "#fff",
                      }}
                    />
                    <Legend />
                    <Bar dataKey="bets" fill="#3b82f6" name="Total Bets" />
                    <Bar dataKey="wins" fill="#10b981" name="Wins" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Bets Table */}
        <RecentBetsTable />
      </div>
    </DashboardLayout>
  );
}
