/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ActionState<T = any> {
  success: boolean;
  message: string;
  meta?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  errors?: Record<string, string[]>;
  inputs?: T;
  data?: any;
  timestamp?: number;
}
