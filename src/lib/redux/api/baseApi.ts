/**
 * RTK Query base API configuration
 * Handles all API calls with authentication, retry logic, and error handling
 */

import { API_CONFIG, COOKIES } from "@/lib/constants";
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

/**
 * Base query with authentication headers
 */
const baseQuery = fetchBaseQuery({
  baseUrl: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  prepareHeaders: (headers) => {
    // Get access token from cookies
    const token = Cookies.get(COOKIES.ACCESS_TOKEN);

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    // Set content type
    if (!headers.has("Content-Type")) {
      headers.set("Content-Type", "application/json");
    }

    return headers;
  },
  credentials: "include", // Include cookies in requests
});

/**
 * Base query with token refresh logic
 */
const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  // If we get a 401 error, try to refresh the token
  if (result.error && result.error.status === 401) {
    const refreshToken = Cookies.get(COOKIES.REFRESH_TOKEN);

    if (refreshToken) {
      // Try to get a new access token
      const refreshResult = await baseQuery(
        {
          url: "/auth/refresh",
          method: "POST",
          body: { refreshToken },
        },
        api,
        extraOptions
      );

      if (refreshResult.data) {
        // Store the new token
        const data = refreshResult.data as {
          accessToken: string;
          refreshToken: string;
        };
        Cookies.set(COOKIES.ACCESS_TOKEN, data.accessToken, { expires: 7 });
        Cookies.set(COOKIES.REFRESH_TOKEN, data.refreshToken, { expires: 30 });

        // Retry the original query
        result = await baseQuery(args, api, extraOptions);
      } else {
        // Refresh failed - redirect to login
        Cookies.remove(COOKIES.ACCESS_TOKEN);
        Cookies.remove(COOKIES.REFRESH_TOKEN);
        Cookies.remove(COOKIES.USER_ID);

        // Only redirect if we're not already on an auth page
        if (
          typeof window !== "undefined" &&
          !window.location.pathname.startsWith("/login")
        ) {
          window.location.href = "/login";
        }
      }
    } else {
      // No refresh token - redirect to login
      Cookies.remove(COOKIES.ACCESS_TOKEN);

      if (
        typeof window !== "undefined" &&
        !window.location.pathname.startsWith("/login")
      ) {
        window.location.href = "/login";
      }
    }
  }

  return result;
};

/**
 * Base query with retry logic for failed requests
 */
const baseQueryWithRetry = retry(baseQueryWithReauth, {
  maxRetries: API_CONFIG.RETRY_ATTEMPTS,
});

/**
 * Main API instance
 * All API endpoints should extend this base API
 */
export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithRetry,
  tagTypes: [
    "User",
    "Bets",
    "Matches",
    "LiveMatches",
    "Tournaments",
    "Teams",
    "Wallet",
    "Transactions",
    "Favorites",
    "Messages",
    "Conversations",
    "Notifications",
    "PaymentMethods",
  ],
  endpoints: () => ({}),
});

/**
 * Custom error handler for API errors
 */
export const handleApiError = (error: any): string => {
  if ("status" in error) {
    // RTK Query error
    const fetchError = error as FetchBaseQueryError;

    if (fetchError.status === "FETCH_ERROR") {
      return "Network error. Please check your connection.";
    }

    if (fetchError.status === "TIMEOUT_ERROR") {
      return "Request timed out. Please try again.";
    }

    if (fetchError.status === "PARSING_ERROR") {
      return "Server response error. Please try again.";
    }

    if (typeof fetchError.status === "number") {
      switch (fetchError.status) {
        case 400:
          return (
            (fetchError.data as any)?.message ||
            "Bad request. Please check your input."
          );
        case 401:
          return "Unauthorized. Please log in.";
        case 403:
          return "You don't have permission to access this resource.";
        case 404:
          return "Resource not found.";
        case 409:
          return (
            (fetchError.data as any)?.message ||
            "Conflict. The resource already exists."
          );
        case 422:
          return (
            (fetchError.data as any)?.message ||
            "Validation error. Please check your input."
          );
        case 429:
          return "Too many requests. Please try again later.";
        case 500:
          return "Server error. Please try again later.";
        case 503:
          return "Service unavailable. Please try again later.";
        default:
          return (
            (fetchError.data as any)?.message ||
            "An error occurred. Please try again."
          );
      }
    }
  }

  if (error?.message) {
    return error.message;
  }

  return "An unexpected error occurred. Please try again.";
};
