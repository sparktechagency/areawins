"use client";
import { FormSelect } from "@/components/form/FormSelect";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IProfitLossChartData, ProfitLossPeriod } from "@/interfaces/dashboard.interface";
import { getProfitLossChartData } from "@/services/dashboard.service";
import { useEffect, useState } from "react";
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

type ChartPoint = {
  period: string;
  profit: number;
  loss: number;
};

export default function ProfitLossChart({
  data: initialData,
}: {
  data: IProfitLossChartData | null;
}) {
  const [periodFilter, setPeriodFilter] = useState<ProfitLossPeriod>(
    (initialData?.period as ProfitLossPeriod) || ProfitLossPeriod.WEEKLY
  );
  const [selectedYear, setSelectedYear] = useState<string>(
    initialData?.year || String(new Date().getFullYear())
  );
  const [chartData, setChartData] = useState<ChartPoint[]>(
    initialData?.chartData || []
  );
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [retryToken, setRetryToken] = useState(0);
  const [availableYears] = useState<string[]>(["2024", "2025", "2026"]);

  // Refetch data when period or year changes
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setErrorMessage("");
      try {
        const result = await getProfitLossChartData({
          period: periodFilter,
          year: selectedYear,
        });

        if (result && result.chartData) {
          setChartData(result.chartData as ChartPoint[]);
          return;
        }

        setChartData([]);
        setErrorMessage("Failed to load profit/loss data. Please try again.");
      } catch (error) {
        console.error("Error fetching profit loss data:", error);
        setChartData([]);
        setErrorMessage("Something went wrong while loading chart data.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [periodFilter, selectedYear, retryToken]);

  const headerLabel =
    periodFilter === ProfitLossPeriod.WEEKLY
      ? "Current Week (Mon-Sun)"
      : periodFilter === ProfitLossPeriod.MONTHLY
        ? `Monthly Breakdown - ${selectedYear}`
        : `Yearly Overview`;

  return (
    <Card className="bg-card border-border h-full">
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
              { value: ProfitLossPeriod.WEEKLY, label: "Current Week" },
              { value: ProfitLossPeriod.MONTHLY, label: "Monthly" },
              { value: ProfitLossPeriod.YEARLY, label: "Yearly" },
            ]}
            value={periodFilter}
            onChange={(value) => setPeriodFilter(value as ProfitLossPeriod)}
          />
          {periodFilter !== ProfitLossPeriod.WEEKLY && (
            <FormSelect
              options={availableYears.map((year) => ({
                value: year,
                label: year,
              }))}
              value={selectedYear}
              onChange={setSelectedYear}
            />
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-80 w-full">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <div className="animate-spin w-6 h-6 border-2 border-primary border-t-transparent rounded-full" />
            </div>
          ) : errorMessage ? (
            <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
              <p className="text-sm text-red-500">{errorMessage}</p>
              <button
                type="button"
                className="rounded-md border border-border px-3 py-1 text-xs font-medium text-foreground transition-colors hover:bg-muted"
                onClick={() => setRetryToken((prev) => prev + 1)}
              >
                Retry
              </button>
            </div>
          ) : chartData && chartData.length > 0 ? (
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
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-muted-foreground">No data available</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
