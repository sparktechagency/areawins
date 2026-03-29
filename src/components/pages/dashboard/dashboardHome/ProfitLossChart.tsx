"use client";

import { FormSelect } from "@/components/form/FormSelect";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useMemo, useState } from "react";
import {
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

type PeriodFilter = "week" | "month" | "year";

type ChartPoint = {
  period: string;
  profit: number;
  loss: number;
};

const weeklyChartData: ChartPoint[] = [
  { period: "Mon", profit: 680, loss: 420 },
  { period: "Tue", profit: 840, loss: 390 },
  { period: "Wed", profit: 760, loss: 510 },
  { period: "Thu", profit: 930, loss: 470 },
  { period: "Fri", profit: 1120, loss: 540 },
  { period: "Sat", profit: 980, loss: 610 },
  { period: "Sun", profit: 1250, loss: 520 },
];

const monthlyByYearData: Record<string, ChartPoint[]> = {
  "2024": [
    { period: "Jan", profit: 3000, loss: 1500 },
    { period: "Feb", profit: 3400, loss: 1400 },
    { period: "Mar", profit: 3700, loss: 1650 },
    { period: "Apr", profit: 3900, loss: 1300 },
    { period: "May", profit: 4200, loss: 1450 },
    { period: "Jun", profit: 4100, loss: 1520 },
    { period: "Jul", profit: 4350, loss: 1380 },
    { period: "Aug", profit: 4460, loss: 1480 },
    { period: "Sep", profit: 4520, loss: 1410 },
    { period: "Oct", profit: 4680, loss: 1360 },
    { period: "Nov", profit: 4780, loss: 1490 },
    { period: "Dec", profit: 5020, loss: 1550 },
  ],
  "2025": [
    { period: "Jan", profit: 3200, loss: 1600 },
    { period: "Feb", profit: 3500, loss: 1450 },
    { period: "Mar", profit: 3950, loss: 1720 },
    { period: "Apr", profit: 4100, loss: 1360 },
    { period: "May", profit: 4350, loss: 1490 },
    { period: "Jun", profit: 4280, loss: 1550 },
    { period: "Jul", profit: 4600, loss: 1420 },
    { period: "Aug", profit: 4710, loss: 1510 },
    { period: "Sep", profit: 4850, loss: 1450 },
    { period: "Oct", profit: 4990, loss: 1400 },
    { period: "Nov", profit: 5140, loss: 1540 },
    { period: "Dec", profit: 5400, loss: 1610 },
  ],
  "2026": [
    { period: "Jan", profit: 3600, loss: 1700 },
    { period: "Feb", profit: 3900, loss: 1590 },
    { period: "Mar", profit: 4200, loss: 1810 },
    { period: "Apr", profit: 4380, loss: 1460 },
    { period: "May", profit: 4620, loss: 1570 },
    { period: "Jun", profit: 4550, loss: 1630 },
    { period: "Jul", profit: 4890, loss: 1510 },
    { period: "Aug", profit: 5020, loss: 1600 },
    { period: "Sep", profit: 5170, loss: 1530 },
    { period: "Oct", profit: 5310, loss: 1490 },
    { period: "Nov", profit: 5480, loss: 1630 },
    { period: "Dec", profit: 5750, loss: 1700 },
  ],
};

export default function ProfitLossChart() {
  const currentYear = String(new Date().getFullYear());
  const availableYears = Object.keys(monthlyByYearData).sort();
  const defaultYear = availableYears.includes(currentYear)
    ? currentYear
    : availableYears[availableYears.length - 1];

  const [periodFilter, setPeriodFilter] = useState<PeriodFilter>("week");
  const [selectedYear, setSelectedYear] = useState<string>(defaultYear);

  const yearlySummaryData = useMemo<ChartPoint[]>(
    () =>
      availableYears.map((year) => {
        const data = monthlyByYearData[year];
        const profit = data.reduce((sum, item) => sum + item.profit, 0);
        const loss = data.reduce((sum, item) => sum + item.loss, 0);

        return { period: year, profit, loss };
      }),
    [availableYears],
  );

  const chartData = useMemo<ChartPoint[]>(() => {
    if (periodFilter === "week") {
      return weeklyChartData;
    }

    if (periodFilter === "month") {
      return monthlyByYearData[selectedYear] ?? [];
    }

    if (selectedYear === "all") {
      return yearlySummaryData;
    }

    return monthlyByYearData[selectedYear] ?? [];
  }, [periodFilter, selectedYear, yearlySummaryData]);

  const headerLabel =
    periodFilter === "week"
      ? "Current Week (Mon-Sun)"
      : periodFilter === "month"
        ? `Monthly Breakdown - ${selectedYear}`
        : selectedYear === "all"
          ? "Yearly Overview (All Years)"
          : `Year ${selectedYear} - Monthly Breakdown`;

  return (
    <Card className="bg-card  border-border h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-foreground text-lg font-bold">
            Profit & Loss
          </CardTitle>
          <p className="mt-1 text-xs text-muted-foreground">{headerLabel}</p>
        </div>
        <div className="flex items-center gap-2">
          <FormSelect
            options={[
              { value: "week", label: "Current Week" },
              { value: "month", label: "Monthly" },
              { value: "year", label: "Yearly" },
            ]}
            value={periodFilter}
            onChange={(value) => setPeriodFilter(value as PeriodFilter)}
          />
          {periodFilter !== "week" && (
            <FormSelect
              options={[
                ...(periodFilter === "year"
                  ? [{ value: "all", label: "All Years" }]
                  : []),
                ...availableYears.map((year) => ({ value: year, label: year })),
              ]}
              value={selectedYear}
              onChange={setSelectedYear}
            />
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} barCategoryGap="18%">
              <CartesianGrid strokeDasharray="3 3" stroke="#33415533" />
              <XAxis
                dataKey="period"
                stroke="#64748b"
                fontSize={12}
                interval={0}
                minTickGap={0}
                tickMargin={8}
              />
              <YAxis
                stroke="#64748b"
                fontSize={12}
                tickFormatter={(value) =>
                  `${Math.round(Number(value) / 1000)}k`
                }
                label={{
                  value: "Profit / Loss",
                  angle: -90,
                  position: "insideLeft",
                  fill: "#64748b",
                  fontSize: 12,
                }}
              />
              <Tooltip
                cursor={false}
                contentStyle={{
                  backgroundColor: "#1a242d",
                  border: "1px solid #244732",
                  borderRadius: "8px",
                  color: "#fff",
                }}
              />
              <Legend />
              <Bar
                dataKey="profit"
                fill="#10b981"
                fillOpacity={0.8}
                radius={[6, 6, 0, 0]}
                name="Profit"
                activeBar={false}
              />
              <Bar
                dataKey="loss"
                fill="#ef4444"
                fillOpacity={0.75}
                radius={[6, 6, 0, 0]}
                name="Loss"
                activeBar={false}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
