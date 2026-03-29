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