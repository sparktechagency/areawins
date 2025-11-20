/**
 * User profile and settings API endpoints
 */

import { baseApi } from "./baseApi";
import type {
  UserProfile,
  UpdateProfileRequest,
  UpdateProfileResponse,
  ChangePasswordRequest,
  ChangePasswordResponse,
  UserStats,
  NotificationSettings,
  UserPreferences,
  FavoriteMatch,
  FavoriteTeam,
} from "@/types";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get current user profile
    getUserProfile: builder.query<{ user: UserProfile }, void>({
      query: () => "/user/profile",
      providesTags: ["User"],
    }),

    // Update profile
    updateProfile: builder.mutation<UpdateProfileResponse, UpdateProfileRequest>({
      query: (data) => ({
        url: "/user/profile",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),

    // Change password
    changePassword: builder.mutation<ChangePasswordResponse, ChangePasswordRequest>({
      query: (data) => ({
        url: "/user/change-password",
        method: "POST",
        body: data,
      }),
    }),

    // Upload avatar
    uploadAvatar: builder.mutation<{ avatarUrl: string }, FormData>({
      query: (formData) => ({
        url: "/user/avatar",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["User"],
    }),

    // Get user statistics
    getUserStats: builder.query<UserStats, void>({
      query: () => "/user/statistics",
      providesTags: ["User"],
    }),

    // Update notification settings
    updateNotificationSettings: builder.mutation<{ notifications: NotificationSettings }, Partial<NotificationSettings>>({
      query: (data) => ({
        url: "/user/notifications/settings",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),

    // Update user preferences
    updatePreferences: builder.mutation<{ preferences: UserPreferences }, Partial<UserPreferences>>({
      query: (data) => ({
        url: "/user/preferences",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),

    // Get favorite matches
    getFavoriteMatches: builder.query<{ favorites: FavoriteMatch[] }, void>({
      query: () => "/user/favorites/matches",
      providesTags: ["Favorites"],
    }),

    // Add favorite match
    addFavoriteMatch: builder.mutation<{ favorite: FavoriteMatch }, { matchId: string }>({
      query: (data) => ({
        url: "/user/favorites/matches",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Favorites"],
    }),

    // Remove favorite match
    removeFavoriteMatch: builder.mutation<{ message: string }, string>({
      query: (matchId) => ({
        url: `/user/favorites/matches/${matchId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Favorites"],
    }),

    // Get favorite teams
    getFavoriteTeams: builder.query<{ favorites: FavoriteTeam[] }, void>({
      query: () => "/user/favorites/teams",
      providesTags: ["Favorites"],
    }),

    // Add favorite team
    addFavoriteTeam: builder.mutation<{ favorite: FavoriteTeam }, { teamId: string }>({
      query: (data) => ({
        url: "/user/favorites/teams",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Favorites"],
    }),

    // Remove favorite team
    removeFavoriteTeam: builder.mutation<{ message: string }, string>({
      query: (teamId) => ({
        url: `/user/favorites/teams/${teamId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Favorites"],
    }),
  }),
});

export const {
  useGetUserProfileQuery,
  useUpdateProfileMutation,
  useChangePasswordMutation,
  useUploadAvatarMutation,
  useGetUserStatsQuery,
  useUpdateNotificationSettingsMutation,
  useUpdatePreferencesMutation,
  useGetFavoriteMatchesQuery,
  useAddFavoriteMatchMutation,
  useRemoveFavoriteMatchMutation,
  useGetFavoriteTeamsQuery,
  useAddFavoriteTeamMutation,
  useRemoveFavoriteTeamMutation,
} = userApi;
