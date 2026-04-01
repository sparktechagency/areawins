import { baseApi } from "./baseApi";
import { IWalletData } from "@/interfaces/wallet.interface";

export const walletApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getMyWallet: builder.query<IWalletData, void>({
      query: () => "/wallet/me",
      providesTags: ["Profile"],
      transformResponse: (response: { success: boolean; data: IWalletData }) => response.data,
    }),
    deposit: builder.mutation({
      query: (data) => ({
        url: "/wallet/deposit",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Profile"],
    }),
    withdraw: builder.mutation({
      query: (data) => ({
        url: "/wallet/withdraw",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Profile"],
    }),
  }),
});

export const {
  useGetMyWalletQuery,
  useDepositMutation,
  useWithdrawMutation,
} = walletApi;
