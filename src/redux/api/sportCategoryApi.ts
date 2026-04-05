import { baseApi } from "./baseApi";

export const sportCategoryApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    getSportCategories: build.query({
      query: (params: { page?: number; limit?: number } = {}) => {
        const { page = 1, limit = 10 } = params;
        return {
          url: `/sport-categories?page=${page}&limit=${limit}`,
        };
      },
    }),
  }),
});

export const { useGetSportCategoriesQuery } = sportCategoryApi;
