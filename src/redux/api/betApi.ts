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
      invalidatesTags: ["Profile"],
    }),
    matchBet: build.mutation({
      query: (data) => ({
        url: `/bets/match`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Profile"],
    }),
    cancelBet: build.mutation({
      query: (id: string) => ({
        url: `/bets/${id}/cancel`,
        method: "PATCH",
      }),
      invalidatesTags: ["Profile"],
    }),
    getBetById: build.query({
      query: (id: string) => ({
        url: `/bets/${id}`,
        method: "GET",
      }),
    }),
    getOpenBetsByMatchId: build.query({
      query: ({
        matchId,
        page = 1,
        limit = 10,
      }: {
        matchId: string;
        page?: number;
        limit?: number;
      }) => ({
        url: `/bets/match/${matchId}/open`,
        method: "GET",
        params: { page, limit },
      }),
    }),
  }),
});

export const {
  useCreateBetMutation,
  useMatchBetMutation,
  useCancelBetMutation,
  useGetBetByIdQuery,
  useGetOpenBetsByMatchIdQuery,
} = betApi;
