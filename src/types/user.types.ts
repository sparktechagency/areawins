/**
 * User profile and settings related TypeScript type definitions
 */

import { User } from "./auth.types";

export interface UserProfile extends User {
  bio?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  timezone?: string;
  language: string;
  notifications: NotificationSettings;
  preferences: UserPreferences;
  verification: VerificationStatus;
}

export interface NotificationSettings {
  email: boolean;
  sms: boolean;
  push: boolean;
  betResults: boolean;
  promotions: boolean;
  newsletters: boolean;
  matchUpdates: boolean;
}

export interface UserPreferences {
  oddsFormat: "decimal" | "fractional" | "american";
  defaultStake: number;
  quickBetEnabled: boolean;
  autoAcceptOddsChanges: boolean;
  theme: "light";
}

export interface VerificationStatus {
  email: boolean;
  phone: boolean;
  identity: boolean;
  address: boolean;
}

export interface UpdateProfileRequest {
  firstName?: string;
  lastName?: string;
  phone?: string;
  dateOfBirth?: string;
  country?: string;
  bio?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  timezone?: string;
}

export interface UpdateProfileResponse {
  user: UserProfile;
  message: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface ChangePasswordResponse {
  message: string;
  success: boolean;
}

export interface UpdateNotificationSettingsRequest {
  notifications: Partial<NotificationSettings>;
}

export interface UpdatePreferencesRequest {
  preferences: Partial<UserPreferences>;
}

export interface UploadAvatarRequest {
  file: File;
}

export interface UploadAvatarResponse {
  avatarUrl: string;
  message: string;
}

export interface UserStats {
  totalBets: number;
  activeBets: number;
  wonBets: number;
  lostBets: number;
  totalStaked: number;
  totalWinnings: number;
  netProfit: number;
  winRate: number;
  averageOdds: number;
  biggestWin: number;
  currentStreak: number;
  longestWinStreak: number;
}

export interface UserState {
  profile: UserProfile | null;
  stats: UserStats | null;
  isLoading: boolean;
  error: string | null;
}
