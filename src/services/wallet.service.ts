import { api } from "./api";

export const getMyWallet = async () => {
  try {
    const response = await api.get("/wallet/me");
    if (!response.success) {
      throw new Error(response.message || "Failed to fetch wallet");
    }
    return response.data;
  } catch (error) {
    console.error("Error fetching wallet:", error);
    throw error;
  }
};
