/**
 * Wallet and payment API endpoints
 */

import type {
  BalanceResponse,
  DepositLimits,
  DepositRequest,
  DepositResponse,
  PaymentMethodsResponse,
  SavedPaymentMethod,
  TransactionFilter,
  TransactionsResponse,
  WithdrawLimits,
  WithdrawRequest,
  WithdrawResponse,
} from "@/types";
import { baseApi } from "./baseApi";

export const walletApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get balance
    getBalance: builder.query<BalanceResponse, void>({
      query: () => "/wallet/balance",
      providesTags: ["Wallet"],
    }),

    // Deposit
    deposit: builder.mutation<DepositResponse, DepositRequest>({
      query: (data) => ({
        url: "/wallet/deposit",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Wallet", "Transactions"],
    }),

    // Withdraw
    withdraw: builder.mutation<WithdrawResponse, WithdrawRequest>({
      query: (data) => ({
        url: "/wallet/withdraw",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Wallet", "Transactions"],
    }),

    // Get transactions
    getTransactions: builder.query<
      TransactionsResponse,
      TransactionFilter | undefined
    >({
      query: (filter) => ({
        url: "/wallet/transactions",
        params: filter,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.transactions.map(({ id }) => ({
                type: "Transactions" as const,
                id,
              })),
              { type: "Transactions", id: "LIST" },
            ]
          : [{ type: "Transactions", id: "LIST" }],
    }),

    // Get payment methods
    getPaymentMethods: builder.query<PaymentMethodsResponse, void>({
      query: () => "/wallet/payment-methods",
      providesTags: ["PaymentMethods"],
    }),

    // Add payment method
    addPaymentMethod: builder.mutation<
      { paymentMethod: SavedPaymentMethod },
      Partial<SavedPaymentMethod>
    >({
      query: (data) => ({
        url: "/wallet/payment-methods",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["PaymentMethods"],
    }),

    // Delete payment method
    deletePaymentMethod: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/wallet/payment-methods/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["PaymentMethods"],
    }),

    // Get deposit limits
    getDepositLimits: builder.query<DepositLimits, void>({
      query: () => "/wallet/deposit-limits",
    }),

    // Get withdraw limits
    getWithdrawLimits: builder.query<WithdrawLimits, void>({
      query: () => "/wallet/withdraw-limits",
    }),

    // Get transaction by ID
    getTransactionById: builder.query<{ transaction: any }, string>({
      query: (id) => `/wallet/transactions/${id}`,
      providesTags: (result, error, id) => [{ type: "Transactions", id }],
    }),
  }),
});

export const {
  useGetBalanceQuery,
  useDepositMutation,
  useWithdrawMutation,
  useGetTransactionsQuery,
  useGetPaymentMethodsQuery,
  useAddPaymentMethodMutation,
  useDeletePaymentMethodMutation,
  useGetDepositLimitsQuery,
  useGetWithdrawLimitsQuery,
  useGetTransactionByIdQuery,
} = walletApi;
