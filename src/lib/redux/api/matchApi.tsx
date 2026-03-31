import { baseApi } from "./baseApi";

export const matchApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    getLiveMatches: build.query({
      query: (params: { page?: number; limit?: number } = {}) => {
        const { page = 1, limit = 10 } = params;
        return {
          url: `/matches/live?page=${page}&limit=${limit}`,
        };
      },
      providesTags: ["Profile"], // Using Profile tag for consistency or keeping it generic if No Match tag exists yet
    }),
  }),
});

export const { useGetLiveMatchesQuery } = matchApi;
