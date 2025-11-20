/**
 * User state slice
 * Manages user profile and preferences
 */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { UserState, UserProfile, UserStats } from "@/types";
import { userApi } from "../api/userApi";

const initialState: UserState = {
  profile: null,
  stats: null,
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<UserProfile | null>) => {
      state.profile = action.payload;
    },
    setStats: (state, action: PayloadAction<UserStats | null>) => {
      state.stats = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearUser: (state) => {
      state.profile = null;
      state.stats = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(userApi.endpoints.getUserProfile.matchFulfilled, (state, { payload }) => {
      state.profile = payload.user;
      state.error = null;
    });

    builder.addMatcher(userApi.endpoints.getUserStats.matchFulfilled, (state, { payload }) => {
      state.stats = payload;
    });

    builder.addMatcher(userApi.endpoints.updateProfile.matchFulfilled, (state, { payload }) => {
      state.profile = payload.user;
    });
  },
});

export const { setProfile, setStats, setLoading, setError, clearUser } = userSlice.actions;
export default userSlice.reducer;
