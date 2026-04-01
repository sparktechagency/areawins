import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import {
  getClientCookie,
  removeClientCookie,
  setClientCookie,
} from "@/utils/cookieUtils";

const baseQuery = fetchBaseQuery({
  baseUrl:
    process.env.NEXT_PUBLIC_BASE_API_URL || "http://localhost:5000/api/v1",
  credentials: "include",
  prepareHeaders: (headers) => {
    const token = getClientCookie("accessToken");
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
    const refreshToken = getClientCookie("refreshToken");

    if (refreshToken) {
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
        const data = refreshResult.data as {
          success: boolean;
          data?: { accessToken: string; refreshToken?: string };
          accessToken?: string;
          refreshToken?: string;
        };

        const accessToken = data.data?.accessToken || data.accessToken;
        const newRefreshToken = data.data?.refreshToken || data.refreshToken;

        // Store new tokens
        if (accessToken) {
          setClientCookie("accessToken", accessToken);
        }
        if (newRefreshToken) {
          setClientCookie("refreshToken", newRefreshToken);
        }

        // Retry the original query
        result = await baseQuery(args, api, extraOptions);
      } else {
        removeClientCookie("accessToken");
        removeClientCookie("refreshToken");
        removeClientCookie("userRole");
      }
    } else {
      removeClientCookie("accessToken");
      removeClientCookie("refreshToken");
      removeClientCookie("userRole");
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Auth", "User", "Profile"],
  endpoints: () => ({}),
});
