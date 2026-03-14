import { api } from "./api";

export const getSportCategories = async (queryParams: Record<string, any> = {}) => {
  try {
    const queryString = new URLSearchParams({
      ...queryParams,
      page: queryParams.page?.toString() || "1",
      limit: queryParams.limit?.toString() || "10"
    }).toString();
    
    const res = await api.get(
      `/sport-categories${queryString ? `?${queryString}` : ""}`,
      {
        next: {
          tags: ["sport-categories"],
          revalidate: 180,
        },
      },
    );

    if (!res.success) {
      return null;
    }

    return res.data;
  } catch (error: any) {
    return null;
  }
};
