"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Bar, BarChart, Cell, ResponsiveContainer, Tooltip, XAxis } from "recharts";

const data = [
  { name: "W1", profit: 2500 },
  { name: "W2", profit: 3200 },
  { name: "W3", profit: 1500 },
  { name: "W4", profit: 4800 },
  { name: "W5", profit: 2100 },
];

export default function ProfitLossChart() {
  return (
    <Card className="bg-card dark:bg-[#112218] border-border h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-foreground text-lg font-bold">Profit & Loss</CardTitle>
        <Select defaultValue="month">
          <SelectTrigger className="w-[120px] bg-background border-border text-xs h-8 text-foreground">
            <SelectValue placeholder="Period" />
          </SelectTrigger>
          <SelectContent className="bg-popover border-border text-popover-foreground">
            <SelectItem value="week">This Week</SelectItem>
            <SelectItem value="month">This Month</SelectItem>
            <SelectItem value="year">This Year</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <div className="h-[200px] w-full mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis 
                dataKey="name" 
                stroke="#64748b" 
                fontSize={12} 
                tickLine={false} 
                axisLine={false}
              />
              <Tooltip 
                cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                contentStyle={{ 
                    backgroundColor: '#1a242d', 
                    border: '1px solid #244732', 
                    borderRadius: '8px',
                    color: '#fff'
                }}
              />
              <Bar dataKey="profit" radius={[4, 4, 0, 0]}>
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.profit > 0 ? (index === 3 ? "#00d65c" : "#1a3525") : "#ef4444"} 
                    className="hover:opacity-80 transition-opacity"
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
