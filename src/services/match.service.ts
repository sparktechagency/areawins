import { api } from "./api";

export const getAllMatchesBySport = async (
  sportId: string,
  queryParams: Record<string, any> = {},
) => {
  const queryString = new URLSearchParams({
    ...queryParams,
    page: queryParams.page?.toString() || "1",
    limit: queryParams.limit?.toString() || "10",
  }).toString();
  try {
    const response = await api.get(
      `/matches/grouped-sport/${sportId}?${queryString}`,
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching matches by sport:", error);
    throw error;
  }
};

export const getAllLiveMatches = async (
  queryParams: Record<string, any> = {},
) => {
  const queryString = new URLSearchParams({
    ...queryParams,
    page: queryParams.page?.toString() || "1",
    limit: queryParams.limit?.toString() || "10",
  }).toString();
  try {
    const response = await api.get(`/matches/live?${queryString}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching live matches:", error);
    throw error;
  }
};

export const getMatchById = async (matchId: string) => {
  try {
    const response = await api.get(`/matches/${matchId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching match by id:", error);
    throw error;
  }
};
