/* eslint-disable @typescript-eslint/no-explicit-any */
import { getCookie } from "@/utils/tokenHandlers";
const BACKEND_API_URL =
  process.env.NEXT_PUBLIC_BASE_API_URL || "http://localhost:5000/api/v1";

type FetchOptions = Omit<RequestInit, "headers"> & {
  headers?: Record<string, string>;
};
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  meta?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  data: T;
}

const serverFetchHelper = async (
  endpoint: string,
  options: FetchOptions,
): Promise<ApiResponse> => {
  const { headers, ...restOptions } = options;
  const { headers: headersList } = await import("next/headers");
  const headersInstance = await headersList();
  const authHeader = headersInstance.get("Authorization");

  let accessToken = "";
  if (authHeader && authHeader.startsWith("Bearer ")) {
    accessToken = authHeader.split(" ")[1];
  } else {
    accessToken = (await getCookie("accessToken")) || "";
  }

  const requestHeaders: Record<string, string> = {
    "Content-Type": "application/json",
    ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    ...headers,
  };

  if (restOptions.body instanceof FormData) {
    delete requestHeaders["Content-Type"];
  }

  const config: RequestInit = {
    headers: requestHeaders,
    ...restOptions,
    next: restOptions.next,
  };

  if (!config.cache) {
    if (!restOptions.next?.revalidate) {
      config.cache = "no-store";
    }
  }

  try {
    const response = await fetch(`${BACKEND_API_URL}${endpoint}`, config);

    // For 204 No Content
    if (response.status === 204) {
      return {
        success: true,
        message: "Success",
        data: {} as any,
      };
    }

    const data = await response.json().catch(() => ({}));

    return {
      success: data.success ?? response.ok,
      message:
        data?.message ||
        (response.ok ? "Success" : `HTTP error! status: ${response.status}`),
      data: data?.data ?? data,
      meta: data?.meta,
    };
  } catch (error: any) {
    console.error(`API Request Failed: ${endpoint}`, error);
    return {
      success: false,
      message: error.message || "Something went wrong",
      data: null as any,
    };
  }
};

export const api = {
  get: async <T = any>(
    endpoint: string,
    options: FetchOptions = {},
  ): Promise<ApiResponse<T>> =>
    serverFetchHelper(endpoint, { ...options, method: "GET" }),

  post: async <T = any>(
    endpoint: string,
    body: any,
    options: FetchOptions = {},
  ): Promise<ApiResponse<T>> => {
    const isFormData = body instanceof FormData;
    return serverFetchHelper(endpoint, {
      ...options,
      method: "POST",
      body: isFormData ? body : JSON.stringify(body),
    });
  },

  put: async <T = any>(
    endpoint: string,
    body: any,
    options: FetchOptions = {},
  ): Promise<ApiResponse<T>> => {
    const isFormData = body instanceof FormData;
    return serverFetchHelper(endpoint, {
      ...options,
      method: "PUT",
      body: isFormData ? body : JSON.stringify(body),
    });
  },

  patch: async <T = any>(
    endpoint: string,
    body: any,
    options: FetchOptions = {},
  ): Promise<ApiResponse<T>> => {
    const isFormData = body instanceof FormData;
    return serverFetchHelper(endpoint, {
      ...options,
      method: "PATCH",
      body: isFormData ? body : JSON.stringify(body),
    });
  },

  delete: async <T = any>(
    endpoint: string,
    options: FetchOptions = {},
  ): Promise<ApiResponse<T>> =>
    serverFetchHelper(endpoint, { ...options, method: "DELETE" }),
};
