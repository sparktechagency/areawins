/**
 * Wallet state slice
 * Manages wallet balance and transactions
 */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { WalletState, Wallet, Transaction, SavedPaymentMethod } from "@/types";
import { walletApi } from "../api/walletApi";
import { bettingApi } from "../api/bettingApi";

const initialState: WalletState = {
  wallet: null,
  transactions: [],
  savedPaymentMethods: [],
  isLoading: false,
  error: null,
};

const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    setWallet: (state, action: PayloadAction<Wallet | null>) => {
      state.wallet = action.payload;
    },
    setTransactions: (state, action: PayloadAction<Transaction[]>) => {
      state.transactions = action.payload;
    },
    setPaymentMethods: (state, action: PayloadAction<SavedPaymentMethod[]>) => {
      state.savedPaymentMethods = action.payload;
    },
    updateBalance: (state, action: PayloadAction<number>) => {
      if (state.wallet) {
        state.wallet.balance = action.payload;
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearWallet: (state) => {
      state.wallet = null;
      state.transactions = [];
      state.savedPaymentMethods = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Handle balance updates
    builder.addMatcher(walletApi.endpoints.getBalance.matchFulfilled, (state, { payload }) => {
      state.wallet = payload.wallet;
      state.error = null;
    });

    builder.addMatcher(walletApi.endpoints.deposit.matchFulfilled, (state, { payload }) => {
      if (state.wallet) {
        state.wallet.balance = payload.newBalance;
      }
    });

    builder.addMatcher(walletApi.endpoints.withdraw.matchFulfilled, (state, { payload }) => {
      if (state.wallet) {
        state.wallet.balance = payload.newBalance;
      }
    });

    // Update balance after placing bet
    builder.addMatcher(bettingApi.endpoints.placeBet.matchFulfilled, (state, { payload }) => {
      if (state.wallet) {
        state.wallet.balance = payload.newBalance;
      }
    });

    // Update balance after cash out
    builder.addMatcher(bettingApi.endpoints.cashOut.matchFulfilled, (state, { payload }) => {
      if (state.wallet) {
        state.wallet.balance = payload.newBalance;
      }
    });
  },
});

export const {
  setWallet,
  setTransactions,
  setPaymentMethods,
  updateBalance,
  setLoading,
  setError,
  clearWallet,
} = walletSlice.actions;

export default walletSlice.reducer;
