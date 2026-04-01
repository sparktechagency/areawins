import { baseApi } from "./baseApi";

const betApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    createBet: build.mutation({
      query: (data) => ({
        url: "/bets",
        method: "POST",
        body: data,
      }),
    }),
    acceptBet: build.mutation({
      query: (data) => ({
        url: `/bets/${data.betId}/accept`,
        method: "POST",
        body: data,
      }),
    }),
    cancelBet: build.mutation({
      query: (data) => ({
        url: `/bets/${data.betId}/cancel`,
        method: "POST",
        body: data,
      }),
    }),
    getAllOpenBets: build.query({
      query: (filters: { key: string; value: string }[]) => {
        const params = new URLSearchParams();
        filters.forEach((item) => {
          params.append(item.key, item.value);
        });
        return {
          url: `/bets/open`,
          method: "GET",
          params,
        };
      },
    }),
    getBetById: build.query({
      query: (data) => ({
        url: `/bets/${data.betId}`,
        method: "GET",
      }),
    }),
    getBetsByUser: build.query({
      query: (filters: { key: string; value: string }[]) => {
        const params = new URLSearchParams();
        filters.forEach((item) => {
          params.append(item.key, item.value);
        });
        return {
          url: `/bets/user`,
          method: "GET",
          params,
        };
      },
    }),
    getOpenBetsByMatchId: build.query({
      query: ({
        matchId,
        page,
        limit,
      }: {
        matchId: string;
        page: number;
        limit: number;
      }) => {
        const params = new URLSearchParams();
        params.append("page", page.toString());
        params.append("limit", limit.toString());
        return {
          url: `/bets/match/${matchId}/open`,
          method: "GET",
          params,
        };
      },
    }),
  }),
});

export const {
  useCreateBetMutation,
  useAcceptBetMutation,
  useCancelBetMutation,
  useGetBetByIdQuery,
  useGetBetsByUserQuery,
  useGetOpenBetsByMatchIdQuery,
} = betApi;
