/* eslint-disable @typescript-eslint/no-explicit-any */
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
    if (!response.success) {
      throw new Error(response.message || "Failed to fetch matches by sport");
    }
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
    if (!response.success) {
      throw new Error(response.message || "Failed to fetch live matches");
    }
    return response.data;
  } catch (error) {
    console.error("Error fetching live matches:", error);
    throw error;
  }
};

export const getMatchById = async (matchId: string) => {
  try {
    const response = await api.get(`/matches/${matchId}`);
    if (!response.success) {
      throw new Error(response.message || "Failed to fetch match by id");
    }
    return response.data;
  } catch (error) {
    console.error("Error fetching match by id:", error);
    throw error;
  }
};
