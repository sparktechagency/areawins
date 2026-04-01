import { baseApi } from "./baseApi";
import { IWalletData } from "@/interfaces/wallet.interface";

export const walletApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyWallet: builder.query<IWalletData, void>({
      query: () => "/wallet/me",
      providesTags: ["Profile"],
      transformResponse: (response: { success: boolean; data: IWalletData }) => response.data,
    }),
  }),
});

export const { useGetMyWalletQuery } = walletApi;
