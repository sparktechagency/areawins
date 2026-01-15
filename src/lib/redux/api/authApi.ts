/**
 * Authentication API endpoints
 * Handles login, register, password reset, etc.
 */

import { baseApi } from "./baseApi";
import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  VerifyEmailRequest,
  VerifyEmailResponse,
  ResetPasswordRequest,
  ResetPasswordResponse,
  RefreshTokenRequest,
  RefreshTokenResponse,
  LogoutResponse,
} from "@/types";
import { COOKIES } from "@/lib/constants";
import Cookies from "js-cookie";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Login
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          // Store tokens in cookies
          const expiresInDays = arg.rememberMe ? 30 : 7;
          Cookies.set(COOKIES.ACCESS_TOKEN, data.accessToken, {
            expires: expiresInDays,
          });
          Cookies.set(COOKIES.REFRESH_TOKEN, data.refreshToken, {
            expires: 30,
          });
          Cookies.set(COOKIES.USER_ID, data.user.id, {
            expires: expiresInDays,
          });
        } catch (error) {
          // Handle error
          console.error("Login failed:", error);
        }
      },
      invalidatesTags: ["User"],
    }),

    // Register
    register: builder.mutation<RegisterResponse, RegisterRequest>({
      query: (userData) => ({
        url: "/auth/register",
        method: "POST",
        body: userData,
      }),
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          // Store tokens in cookies
          Cookies.set(COOKIES.ACCESS_TOKEN, data.accessToken, { expires: 7 });
          Cookies.set(COOKIES.REFRESH_TOKEN, data.refreshToken, {
            expires: 30,
          });
          Cookies.set(COOKIES.USER_ID, data.user.id, { expires: 7 });
        } catch (error) {
          console.error("Registration failed:", error);
        }
      },
      invalidatesTags: ["User"],
    }),

    // Forgot password
    forgotPassword: builder.mutation<
      ForgotPasswordResponse,
      ForgotPasswordRequest
    >({
      query: (data) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body: data,
      }),
    }),

    // Verify email with OTP
    verifyEmail: builder.mutation<VerifyEmailResponse, VerifyEmailRequest>({
      query: (data) => ({
        url: "/auth/verify-email",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),

    // Reset password
    resetPassword: builder.mutation<
      ResetPasswordResponse,
      ResetPasswordRequest
    >({
      query: (data) => ({
        url: "/auth/reset-password",
        method: "POST",
        body: data,
      }),
    }),

    // Refresh token
    refreshToken: builder.mutation<RefreshTokenResponse, RefreshTokenRequest>({
      query: (data) => ({
        url: "/auth/refresh",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          // Update tokens in cookies
          Cookies.set(COOKIES.ACCESS_TOKEN, data.accessToken, { expires: 7 });
          Cookies.set(COOKIES.REFRESH_TOKEN, data.refreshToken, {
            expires: 30,
          });
        } catch (error) {
          console.error("Token refresh failed:", error);
        }
      },
    }),

    // Logout
    logout: builder.mutation<LogoutResponse, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          await queryFulfilled;

          // Clear all cookies
          Cookies.remove(COOKIES.ACCESS_TOKEN);
          Cookies.remove(COOKIES.REFRESH_TOKEN);
          Cookies.remove(COOKIES.USER_ID);
          Cookies.remove(COOKIES.BETTING_SLIP);

          // Clear localStorage
          if (typeof window !== "undefined") {
            Object.values(
              import("@/lib/constants").then((m) => m.STORAGE_KEYS)
            ).forEach((key) => {
              localStorage.removeItem(key as string);
            });
          }

          // Redirect to home
          if (typeof window !== "undefined") {
            window.location.href = "/";
          }
        } catch (error) {
          console.error("Logout failed:", error);
        }
      },
      invalidatesTags: [
        "User",
        "Bets",
        "Wallet",
        "Transactions",
        "Favorites",
        "Messages",
        "Notifications",
      ],
    }),

    // Resend verification email
    resendVerificationEmail: builder.mutation<
      { message: string },
      { email: string }
    >({
      query: (data) => ({
        url: "/auth/resend-verification",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useForgotPasswordMutation,
  useVerifyEmailMutation,
  useResetPasswordMutation,
  useRefreshTokenMutation,
  useLogoutMutation,
  useResendVerificationEmailMutation,
} = authApi;
