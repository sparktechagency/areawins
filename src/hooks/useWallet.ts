/**
 * Wallet hook
 * Provides wallet state and operations
 */

"use client";

import { handleApiError } from "@/lib/redux/api/baseApi";
import {
  useDepositMutation,
  useGetBalanceQuery,
  useGetTransactionsQuery,
  useWithdrawMutation,
} from "@/lib/redux/api/walletApi";
import { useAppSelector } from "@/lib/redux/hooks";
import { PaymentDetails, PaymentMethod } from "@/types";
import toast from "react-hot-toast";

export function useWallet() {
  const wallet = useAppSelector((state) => state.wallet.wallet);
  const {
    data: balanceData,
    isLoading: isLoadingBalance,
    refetch: refetchBalance,
  } = useGetBalanceQuery();
  const { data: transactionsData, isLoading: isLoadingTransactions } =
    useGetTransactionsQuery(undefined);
  const [deposit, { isLoading: isDepositing }] = useDepositMutation();
  const [withdraw, { isLoading: isWithdrawing }] = useWithdrawMutation();

  const handleDeposit = async (
    amount: number,
    paymentMethod: PaymentMethod,
    paymentDetails: PaymentDetails
  ) => {
    try {
      const result = await deposit({
        amount,
        paymentMethod,
        paymentDetails,
      }).unwrap();

      toast.success("Deposit successful!");
      return result;
    } catch (error) {
      toast.error(handleApiError(error) || "Deposit failed");
      throw error;
    }
  };

  const handleWithdraw = async (
    amount: number,
    paymentMethod: PaymentMethod,
    paymentDetails: PaymentDetails
  ) => {
    try {
      const result = await withdraw({
        amount,
        paymentMethod,
        paymentDetails,
      }).unwrap();

      toast.success("Withdrawal request submitted!");
      return result;
    } catch (error) {
      toast.error(handleApiError(error) || "Withdrawal failed");
      throw error;
    }
  };

  return {
    wallet: wallet || balanceData?.wallet,
    balance: wallet?.balance || balanceData?.wallet?.balance || 0,
    transactions: transactionsData?.transactions || [],
    isLoading: isLoadingBalance || isLoadingTransactions,
    isDepositing,
    isWithdrawing,
    deposit: handleDeposit,
    withdraw: handleWithdraw,
    refetchBalance,
  };
}
