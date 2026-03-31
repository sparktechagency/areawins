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
      providesTags: ["Profile"],
    }),
    getMatchesBySportSlug: build.query({
      query: (params: {
        slug: string;
        page?: number;
        limit?: number;
        status?: string;
      }) => {
        const { slug, page = 1, limit = 50, status } = params;
        let url = `/matches/sport/slug/${slug}?page=${page}&limit=${limit}`;
        if (status) {
          url += `&status=${status}`;
        }
        return { url };
      },
      providesTags: ["Profile"],
    }),
    getMatchById: build.query({
      query: (id: string) => ({
        url: `/matches/${id}`,
      }),
      providesTags: ["Profile"],
    }),
  }),
});

export const {
  useGetLiveMatchesQuery,
  useGetMatchesBySportSlugQuery,
  useGetMatchByIdQuery,
} = matchApi;
