/* eslint-disable @typescript-eslint/no-explicit-any */
import { IProfitLossChartData } from "@/interfaces/dashboard.interface";
import { api } from "./api";

export const getProfitLossChartData = async (
  queryParams: Record<string, any> = {},
): Promise<IProfitLossChartData | null> => {
  try {
    const queryString = new URLSearchParams({
      ...queryParams,
      period: queryParams.period || "week",
    }).toString();

    const res = await api.get(`/dashboard/profit-loss?${queryString}`);

    if (!res.success) {
      return null;
    }

    return res.data as IProfitLossChartData;
  } catch (error: any) {
    return null;
  }
};
