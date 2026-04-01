import { baseApi } from "./baseApi";

export const transactionApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getMyTransactions: builder.query<any, any>({
      query: (params) => ({
        url: "/transactions/my",
        params,
      }),
      providesTags: ["Profile"],
      transformResponse: (response: { success: boolean; data: any[] }) => response.data,
    }),
  }),
});

export const { useGetMyTransactionsQuery } = transactionApi;
