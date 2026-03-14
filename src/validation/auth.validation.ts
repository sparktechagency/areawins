import z from "zod";

export const loginValidationSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters long"),
});

const baseRegisterSchema = z.object({
  fullName: z
    .string()
    .min(1, "Full Name is required")
    .min(2, "Name is too short"),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters"),
  role: z.enum(["USER", "COMPANY"]),
  companyName: z.string().optional(),
  companyLocation: z.string().optional(),
  companyIndustry: z.string().optional(),
});

export const registerValidationSchema = baseRegisterSchema.refine(
  (data) => {
    if (data.role === "COMPANY") {
      return !!(
        data.companyName &&
        data.companyLocation &&
        data.companyIndustry
      );
    }
    return true;
  },
  {
    message:
      "Company name, location, and industry are required when role is COMPANY",
    path: ["role"],
  },
);

export const registerFormValidationSchema = z
  .object({
    fullName: z
      .string()
      .min(1, "Full Name is required")
      .min(2, "Name is too short"),
    email: z
      .string()
      .min(1, "Email is required")
      .email("Invalid email address"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(6, "Password must be at least 6 characters"),
    role: z.enum(["USER", "COMPANY"]),
    companyName: z.string().optional(),
    companyLocation: z.string().optional(),
    companyIndustry: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.role === "COMPANY" && !data.companyName) {
        return false;
      }
      return true;
    },
    {
      message: "Company name is required",
      path: ["companyName"],
    },
  )
  .refine(
    (data) => {
      if (data.role === "COMPANY" && !data.companyLocation) {
        return false;
      }
      return true;
    },
    {
      message: "Company location is required",
      path: ["companyLocation"],
    },
  )
  .refine(
    (data) => {
      if (data.role === "COMPANY" && !data.companyIndustry) {
        return false;
      }
      return true;
    },
    {
      message: "Company industry is required",
      path: ["companyIndustry"],
    },
  );

export const forgotPasswordValidationSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
});

export const verifyOtpValidationSchema = z.object({
  sessionId: z
    .string()
    .min(1, "Session ID is required")
    .min(4, "Invalid Session ID length"),
  code: z
    .string()
    .min(1, "OTP code is required")
    .min(6, "Invalid OTP code length"),
});

export const resetPasswordValidationSchema = z
  .object({
    resetPasswordToken: z
      .string()
      .min(1, "Reset password token is required")
      .min(4, "Invalid reset password token length"),
    newPassword: z
      .string()
      .min(1, "Password is required")
      .min(6, "Password must be at least 6 characters long"),
    confirmPassword: z.string().min(1, "Confirmation is required"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
