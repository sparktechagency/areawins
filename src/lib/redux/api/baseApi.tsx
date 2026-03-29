import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import Cookies from "js-cookie";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_BASE_API_URL || "http://localhost:5000/api",
  credentials: "include",
  prepareHeaders: (headers) => {
    // Get access token from cookies
    const token = Cookies.get("accessToken");
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    const refreshToken = Cookies.get("refreshToken");
    if (refreshToken) {
      // Try to refresh the token
      const refreshResult = await baseQuery(
        {
          url: "/auth/refresh-token",
          method: "POST",
          body: { refreshToken },
        },
        api,
        extraOptions,
      );

      if (refreshResult.data) {
        const { accessToken, refreshToken: newRefreshToken } =
          refreshResult.data as {
            accessToken: string;
            refreshToken: string;
          };

        // Store new tokens
        Cookies.set("accessToken", accessToken, { expires: 7 });
        Cookies.set("refreshToken", newRefreshToken, { expires: 30 });

        // Retry the original query
        result = await baseQuery(args, api, extraOptions);
      } else {
        Cookies.remove("accessToken");
        Cookies.remove("refreshToken");
      }
    } else {
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
    }
  }

  return result;
};

/**
 * Base API configuration
 */
export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Auth", "User", "Profile"],
  endpoints: () => ({}),
});
export const {} = baseApi;
