/**
 * Auth state slice
 * Manages authentication state
 */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { AuthState, User } from "@/types";
import { authApi } from "../api/authApi";

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearAuth: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Handle login
    builder.addMatcher(authApi.endpoints.login.matchFulfilled, (state, { payload }) => {
      state.user = payload.user;
      state.isAuthenticated = true;
      state.error = null;
    });

    // Handle register
    builder.addMatcher(authApi.endpoints.register.matchFulfilled, (state, { payload }) => {
      state.user = payload.user;
      state.isAuthenticated = true;
      state.error = null;
    });

    // Handle logout
    builder.addMatcher(authApi.endpoints.logout.matchFulfilled, (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
    });

    // Handle errors
    builder.addMatcher(authApi.endpoints.login.matchRejected, (state, { error }) => {
      state.error = error.message || "Login failed";
      state.isAuthenticated = false;
    });

    builder.addMatcher(authApi.endpoints.register.matchRejected, (state, { error }) => {
      state.error = error.message || "Registration failed";
      state.isAuthenticated = false;
    });
  },
});

export const { setUser, setLoading, setError, clearAuth } = authSlice.actions;
export default authSlice.reducer;
