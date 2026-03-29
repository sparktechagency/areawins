export enum ProfitLossPeriod {
  WEEKLY = "weekly",
  MONTHLY = "monthly",
  YEARLY = "yearly",
}

export interface IProfitLossChartData {
  period: string;
  year: string;
  chartData: [
    {
      period: string;
      profit: number;
      loss: number;
    },
  ];
}