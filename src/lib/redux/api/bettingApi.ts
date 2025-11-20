/**
 * Betting API endpoints
 * Handles placing bets, getting odds, bet history, cash out, etc.
 */

import { baseApi } from "./baseApi";
import type {
  PlaceBetRequest,
  PlaceBetResponse,
  CashOutRequest,
  CashOutResponse,
  BetHistoryFilter,
  BetHistoryResponse,
  Bet,
  AccumulatorBet,
  BettingLimits,
  BettingMarket,
} from "@/types";

export const bettingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get odds for a match
    getOdds: builder.query<{ markets: BettingMarket[] }, string>({
      query: (matchId) => `/betting/odds/${matchId}`,
      providesTags: (result, error, matchId) => [{ type: "Matches", id: matchId }],
    }),

    // Place a bet
    placeBet: builder.mutation<PlaceBetResponse, PlaceBetRequest>({
      query: (betData) => ({
        url: "/betting/place",
        method: "POST",
        body: betData,
      }),
      invalidatesTags: ["Bets", "Wallet"],
    }),

    // Get live bets
    getLiveBets: builder.query<{ bets: (Bet | AccumulatorBet)[] }, void>({
      query: () => "/betting/live",
      providesTags: ["Bets"],
    }),

    // Get bet history
    getBetHistory: builder.query<BetHistoryResponse, BetHistoryFilter | void>({
      query: (filter) => ({
        url: "/betting/history",
        params: filter,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.bets.map(({ id }) => ({ type: "Bets" as const, id })),
              { type: "Bets", id: "LIST" },
            ]
          : [{ type: "Bets", id: "LIST" }],
    }),

    // Get bet by ID
    getBetById: builder.query<{ bet: Bet | AccumulatorBet }, string>({
      query: (betId) => `/betting/${betId}`,
      providesTags: (result, error, betId) => [{ type: "Bets", id: betId }],
    }),

    // Cancel bet
    cancelBet: builder.mutation<{ message: string }, string>({
      query: (betId) => ({
        url: `/betting/${betId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, betId) => [
        { type: "Bets", id: betId },
        { type: "Bets", id: "LIST" },
        "Wallet",
      ],
    }),

    // Cash out bet
    cashOut: builder.mutation<CashOutResponse, CashOutRequest>({
      query: (data) => ({
        url: "/betting/cash-out",
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result, error, { betId }) => [
        { type: "Bets", id: betId },
        { type: "Bets", id: "LIST" },
        "Wallet",
      ],
    }),

    // Get betting markets
    getBettingMarkets: builder.query<{ markets: BettingMarket[] }, string>({
      query: (matchId) => `/betting/markets/${matchId}`,
      providesTags: (result, error, matchId) => [{ type: "Matches", id: matchId }],
    }),

    // Get betting limits
    getBettingLimits: builder.query<BettingLimits, void>({
      query: () => "/betting/limits",
    }),

    // Get active bets
    getActiveBets: builder.query<{ bets: (Bet | AccumulatorBet)[] }, void>({
      query: () => "/betting/active",
      providesTags: ["Bets"],
    }),

    // Get bet statistics
    getBetStatistics: builder.query<{
      totalBets: number;
      activeBets: number;
      wonBets: number;
      lostBets: number;
      totalStaked: number;
      totalWinnings: number;
      netProfit: number;
      winRate: number;
    }, void>({
      query: () => "/betting/statistics",
      providesTags: ["Bets"],
    }),
  }),
});

export const {
  useGetOddsQuery,
  usePlaceBetMutation,
  useGetLiveBetsQuery,
  useGetBetHistoryQuery,
  useGetBetByIdQuery,
  useCancelBetMutation,
  useCashOutMutation,
  useGetBettingMarketsQuery,
  useGetBettingLimitsQuery,
  useGetActiveBetsQuery,
  useGetBetStatisticsQuery,
} = bettingApi;
