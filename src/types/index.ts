/**
 * Central export file for all TypeScript type definitions
 */

export * from "./auth.types";
export * from "./user.types";
export * from "./betting.types";
export * from "./match.types";
export * from "./wallet.types";
export * from "./message.types";

// Common utility types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: ValidationError[];
}

export interface ValidationError {
  field: string;
  message: string;
  code?: string;
}

export interface PaginationParams {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    totalCount: number;
    totalPages: number;
    hasNext: boolean;
    hasPrevious: boolean;
  };
}

export interface ErrorResponse {
  success: false;
  message: string;
  errors?: ValidationError[];
  code?: string;
  statusCode?: number;
}
