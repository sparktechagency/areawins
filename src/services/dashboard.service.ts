/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import {
  IProfitLossChartData,
  ProfitLossPeriod,
} from "@/interfaces/dashboard.interface";
import { api } from "./api";

export const getProfitLossChartData = async (
  queryParams: Record<string, any> = {},
): Promise<IProfitLossChartData | null> => {
  try {
    const queryString = new URLSearchParams({
      ...queryParams,
      period: queryParams.period || ProfitLossPeriod.WEEKLY,
    }).toString();

    const res = await api.get(`/dashboard/profit-loss-trend?${queryString}`);
    if (!res.success) {
      throw new Error(res.message || "Failed to fetch profit/loss trend");
    }
    return (res.data || null) as IProfitLossChartData | null;
  } catch (error: any) {
    console.error("Error fetching profit/loss chart data:", error);
    throw error;
  }
};
