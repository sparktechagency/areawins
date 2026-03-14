import * as z from "zod";

export const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
  rememberMe: z.boolean().default(false).optional(),
});

export const registerSchema = z.object({
  fullName: z
    .string()
    .min(3, { message: "Full name must be at least 3 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
  phoneNumber: z
    .string()
    .min(10, { message: "Phone number must be at least 10 characters" }),
  referralCode: z
    .string()
    .optional()
    .refine(
      (val) => {
        if (!val || val.trim() === "") return true; // Optional - no validation if empty
        return /^[A-Z0-9]{8}$/.test(val.toUpperCase());
      },
      {
        message: "Referral code must be exactly 8 alphanumeric characters",
      },
    ),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

export const verifyOtpSchema = z.object({
  sessionId: z.string().min(1, { message: "Session ID is required" }),
  code: z.string().length(6, { message: "Code must be exactly 6 digits" }),
});

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
