"use client";
import { FormSelect } from "@/components/form/FormSelect";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProfitLossPeriod } from "@/interfaces/dashboard.interface";
import { useTranslation } from "@/i18n/LanguageContext";
import { useGetProfitLossChartDataQuery } from "@/redux/api/dashboardApi";
import { useState } from "react";
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

import ProfitLossChartSkeleton from "@/components/skeleton/ProfitLossChartSkeleton";

export default function ProfitLossChart() {
  const { t } = useTranslation();
  const [periodFilter, setPeriodFilter] = useState<ProfitLossPeriod>(
    ProfitLossPeriod.WEEKLY,
  );
  const [selectedYear, setSelectedYear] = useState<string>(
    String(new Date().getFullYear()),
  );

  // Generate available years: current year ± 4 years
  const currentYear = new Date().getFullYear();
  const [availableYears] = useState<string[]>(
    Array.from({ length: 9 }, (_, i) => String(currentYear - 4 + i)),
  );

  const {
    data: chartResult,
    isLoading,
    isError,
    error,
  } = useGetProfitLossChartDataQuery({
    period: periodFilter,
    year: selectedYear,
  });

  const chartData = (chartResult?.chartData as ChartPoint[]) || [];
  const errorMessage = isError
    ? (error as { data?: { message?: string } })?.data?.message ||
      (error as { message?: string })?.message ||
      "Failed to fetch data"
    : "";

  const headerLabel =
    periodFilter === ProfitLossPeriod.WEEKLY
      ? t("dashboardHome.weeklyMonSun")
      : periodFilter === ProfitLossPeriod.MONTHLY
        ? `${t("dashboardHome.monthlyBreakdown")} - ${selectedYear}`
        : t("dashboardHome.yearlyOverview");

  return (
    <Card className="bg-card border-border h-full shadow-none">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-foreground text-lg font-bold">
            {t("dashboardHome.profitLoss")}
          </CardTitle>
          <p className="mt-1 text-xs text-muted-foreground">{headerLabel}</p>
        </div>
        <div className="flex items-center gap-2">
          <FormSelect
            options={[
              { value: ProfitLossPeriod.WEEKLY, label: t("dashboardHome.weekly") },
              {
                value: ProfitLossPeriod.MONTHLY,
                label: t("dashboardHome.monthly"),
              },
              { value: ProfitLossPeriod.YEARLY, label: t("dashboardHome.yearly") },
            ]}
            value={periodFilter}
            onChange={(value) => setPeriodFilter(value as ProfitLossPeriod)}
            triggerClassName="w-[140px]"
          />
          {periodFilter !== ProfitLossPeriod.YEARLY && (
            <FormSelect
              options={availableYears.map((year) => ({
                value: year,
                label: year,
              }))}
              value={selectedYear}
              onChange={setSelectedYear}
              triggerClassName="w-[140px]"
            />
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-80 w-full">
          {isLoading ? (
            <ProfitLossChartSkeleton />
          ) : errorMessage ? (
            <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
              <p className="text-sm text-red-500">{errorMessage}</p>
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
                    value: t("dashboardHome.axisProfitLoss"),
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
                  name={t("dashboardHome.legendProfit")}
                  activeBar={false}
                />
                <Bar
                  dataKey="loss"
                  fill="#ef4444"
                  fillOpacity={0.75}
                  radius={[6, 6, 0, 0]}
                  name={t("dashboardHome.legendLoss")}
                  activeBar={false}
                />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-muted-foreground">{t("dashboardHome.noDataAvailable")}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
