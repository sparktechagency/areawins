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
            if (tokens) {
              setClientCookie("accessToken", tokens.accessToken);
              setClientCookie("refreshToken", tokens.refreshToken);
              if (user?.role) {
                setClientCookie("userRole", user.role);
              }
            }
            dispatch(setUser(user));
          }
        } catch (error) {
          // Handle error if needed
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
        } catch (error) {}
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
            if (tokens) {
              setClientCookie("accessToken", tokens.accessToken);
              setClientCookie("refreshToken", tokens.refreshToken);
              if (user?.role) {
                setClientCookie("userRole", user.role);
              }
              removeClientCookie("sessionId");
              dispatch(setUser(user));
            }
            if (resetPasswordToken) {
              setClientCookie("resetPasswordToken", resetPasswordToken);
              removeClientCookie("sessionId");
            }
          }
        } catch (error) {}
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
        } catch (error) {}
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
        } catch (error) {}
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
