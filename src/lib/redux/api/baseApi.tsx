import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import Cookies from "js-cookie";

const COOKIE_NAMES = {
  accessToken: "__a_A_T",
  refreshToken: "__a_R_T",
};

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_BASE_API_URL || "http://localhost:5000/api/v1",
  credentials: "include",
  prepareHeaders: (headers) => {
    const token = Cookies.get(COOKIE_NAMES.accessToken);
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
    const refreshResult = await baseQuery(
      {
        url: "/auth/refresh-token",
        method: "POST",
        body: {},
      },
      api,
      extraOptions,
    );

    if (refreshResult.data) {
      const { accessToken } = refreshResult.data as {
        accessToken: string;
      };

      // Store new accessToken (assuming it's returned)
      if (accessToken) {
        Cookies.set(COOKIE_NAMES.accessToken, accessToken, { expires: 7 });
      }

      // Retry the original query
      result = await baseQuery(args, api, extraOptions);
    } else {
      Cookies.remove(COOKIE_NAMES.accessToken);
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
