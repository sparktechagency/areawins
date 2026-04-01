import { baseApi } from "./baseApi";
import { IProfitLossChartData } from "@/interfaces/dashboard.interface";

export const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProfitLossChartData: builder.query<
      IProfitLossChartData,
      { period: string; year?: string }
    >({
      query: (params) => ({
        url: "/dashboard/profit-loss-trend",
        params,
      }),
      transformResponse: (response: {
        success: boolean;
        data: IProfitLossChartData;
      }) => response.data,
    }),
  }),
});

export const { useGetProfitLossChartDataQuery } = dashboardApi;
