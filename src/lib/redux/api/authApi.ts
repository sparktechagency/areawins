import { baseApi } from "./baseApi";
import {
  setClientCookie,
  removeClientCookie,
  clearAllAuthCookies,
} from "@/utils/cookieUtils";
import { setUser, clearUser } from "../features/authSlice";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data.success && data.data) {
            const { tokens, user } = data.data;
            const cookieOptions = arg.rememberMe ? { expires: 7 } : undefined;

            if (tokens) {
              setClientCookie("accessToken", tokens.accessToken, cookieOptions);
              setClientCookie("refreshToken", tokens.refreshToken, cookieOptions);
              if (user?.role) {
                setClientCookie("userRole", user.role, cookieOptions);
              }
            }
            dispatch(setUser(user));
          }
        } catch {
          // Error handled by component
        }
      },
    }),
    register: builder.mutation({
      query: (data) => ({
        url: "/auth/register",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data.success && data.data?.sessionId) {
            setClientCookie("sessionId", data.data.sessionId);
          }
        } catch {}
      },
    }),
    verifyOtp: builder.mutation({
      query: (data) => ({
        url: "/auth/verify-otp",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data.success && data.data) {
            const { tokens, user, resetPasswordToken } = data.data;
            // Common cleanup: remove registration/forgot-password session
            removeClientCookie("sessionId");
            if (tokens) {
              setClientCookie("accessToken", tokens.accessToken);
              setClientCookie("refreshToken", tokens.refreshToken);
              if (user?.role) {
                setClientCookie("userRole", user.role);
              }
              dispatch(setUser(user));
            }
            if (resetPasswordToken) {
              setClientCookie("resetPasswordToken", resetPasswordToken);
            }
          }
        } catch {}
      },
    }),
    forgotPassword: builder.mutation({
      query: (data) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data.success && data.data?.sessionId) {
            setClientCookie("sessionId", data.data.sessionId);
          }
        } catch {}
      },
    }),
    resetPassword: builder.mutation({
      query: (data) => ({
        url: "/auth/reset-password",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data.success) {
            removeClientCookie("resetPasswordToken");
          }
        } catch {}
      },
    }),
    resendOtp: builder.mutation({
      query: (data) => ({
        url: "/auth/resend-otp",
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error) {
        } finally {
          clearAllAuthCookies();
          dispatch(clearUser());
        }
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useVerifyOtpMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useResendOtpMutation,
  useLogoutMutation,
} = authApi;
