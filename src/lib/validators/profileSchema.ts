/**
 * Zod validation schemas for user profile forms
 */

import { z } from "zod";

// Update profile schema
export const updateProfileSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters").optional(),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  phone: z.string().optional(),
  dateOfBirth: z.string().optional(),
  country: z.string().optional(),
  bio: z.string().max(500, "Bio must not exceed 500 characters").optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zipCode: z.string().optional(),
  timezone: z.string().optional(),
});

export type UpdateProfileFormData = z.infer<typeof updateProfileSchema>;

// Notification settings schema
export const notificationSettingsSchema = z.object({
  email: z.boolean(),
  sms: z.boolean(),
  push: z.boolean(),
  betResults: z.boolean(),
  promotions: z.boolean(),
  newsletters: z.boolean(),
  matchUpdates: z.boolean(),
});

export type NotificationSettingsFormData = z.infer<typeof notificationSettingsSchema>;

// User preferences schema
export const userPreferencesSchema = z.object({
  oddsFormat: z.enum(["decimal", "fractional", "american"]),
  defaultStake: z.number().min(0, "Default stake must be positive"),
  quickBetEnabled: z.boolean(),
  autoAcceptOddsChanges: z.boolean(),
  theme: z.enum(["light", "dark", "system"]),
  language: z.string(),
  currency: z.string(),
});

export type UserPreferencesFormData = z.infer<typeof userPreferencesSchema>;

// Upload avatar schema
export const uploadAvatarSchema = z.object({
  file: z
    .instanceof(File)
    .refine((file) => file.size <= 5000000, "File size must be less than 5MB")
    .refine(
      (file) => ["image/jpeg", "image/png", "image/webp"].includes(file.type),
      "Only JPEG, PNG, and WebP images are allowed"
    ),
});

export type UploadAvatarFormData = z.infer<typeof uploadAvatarSchema>;

// Contact form schema
export const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  category: z.enum(["general", "support", "billing", "technical", "other"]).optional(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
