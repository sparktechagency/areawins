/* eslint-disable @typescript-eslint/no-explicit-any */
import { getCookie } from "@/utils/tokenHandlers";
const BACKEND_API_URL =
  process.env.NEXT_PUBLIC_BASE_API_URL || "http://localhost:5000/api/v1";

type FetchOptions = Omit<RequestInit, "headers"> & {
  headers?: Record<string, string>;
};
export interface ApiResponse<T = any> {
  statusCode?: number;
  success: boolean;
  message: string;
  meta?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  data?: T;
  timeStamp?: string;
  [key: string]: any;
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
        statusCode: 204,
        success: true,
        message: "Success",
        timeStamp: new Date().toISOString(),
      };
    }

    const payload = await response.json().catch(() => null);

    // Preserve backend response shape when it already contains success/message.
    if (payload && typeof payload === "object" && "success" in payload) {
      return payload as ApiResponse;
    }

    if (!response.ok) {
      return {
        statusCode: response.status,
        success: false,
        message: response.statusText || `HTTP error! status: ${response.status}`,
        timeStamp: new Date().toISOString(),
      };
    }

    return {
      statusCode: response.status,
      success: true,
      message: "Success",
      data: payload as any,
      timeStamp: new Date().toISOString(),
    };
  } catch (error: any) {
    console.error(`API Request Failed: ${endpoint}`, error);
    return {
      statusCode: 500,
      success: false,
      message: error.message || "Something went wrong",
      timeStamp: new Date().toISOString(),
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
