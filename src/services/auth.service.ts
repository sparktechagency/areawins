/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { ActionState } from "@/interfaces/action-state.interface";
import {
  forgotPasswordSchema,
  loginSchema,
  registerSchema,
  resetPasswordSchema,
  verifyOtpSchema,
} from "@/lib/validators/authSchema";
import { api } from "@/services/api";
import { getDefaultDashboardRoute } from "@/utils/auth-utils";
import { deleteCookie, getCookie, setCookie } from "@/utils/tokenHandlers";
import { cookies } from "next/headers";

export type AuthActionState = ActionState;

export async function loginUser(
  prevState: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const values = Object.fromEntries(formData.entries());
  const parsed = loginSchema.safeParse(values);
  if (!parsed.success) {
    return {
      success: false,
      message: "Invalid fields",
      errors: parsed.error?.flatten().fieldErrors || {},
      inputs: values,
      timestamp: Date.now(),
    };
  }

  try {
    const res = await api.post("/auth/login", parsed.data);
    if (!res.success) {
      return {
        success: false,
        message: res.message || "Failed to login",
        inputs: values,
        timestamp: Date.now(),
      };
    }

    const loginData = res.data;

    // 1. Handle Email Verification - Set sessionId and return redirect
    if (loginData?.isEmailVerified === false) {
      if (loginData.sessionId) {
        await setCookie("sessionId", loginData.sessionId, {
          secure: process.env.NODE_ENV === "production",
          httpOnly: true,
          maxAge: 3600,
          path: "/",
        });
      }
      return {
        success: true,
        message: res.message || "Please verify your email.",
        data: { redirect: "/verify-email" },
        timestamp: Date.now(),
      };
    }
    // 2. Save tokens if they exist
    if (loginData?.tokens) {
      const isProduction = process.env.NODE_ENV === "production";
      await setCookie("accessToken", loginData.tokens.accessToken, {
        secure: isProduction,
        httpOnly: true,
        maxAge: 3600,
        path: "/",
      });

      await setCookie("refreshToken", loginData.tokens.refreshToken, {
        secure: isProduction,
        httpOnly: true,
        maxAge: 3600 * 24 * 90,
        path: "/",
      });
      // set userRole in cookie
      await setCookie("userRole", loginData.user.role, {
        secure: isProduction,
        httpOnly: true,
        maxAge: 3600,
        path: "/",
      });
    }
    // 3. Final Success Case (Successful Login)
    await deleteCookie("sessionId");
    const userRole = loginData?.user?.role;
    return {
      success: true,
      message: res.message || "Logged in successfully",
      data: {
        ...loginData,
        redirect: userRole ? getDefaultDashboardRoute(userRole) : "/dashboard",
      },
      timestamp: Date.now(),
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Failed to login",
      inputs: values,
      timestamp: Date.now(),
    };
  }
}

export async function register(
  prevState: AuthActionState,
  payload: any,
): Promise<AuthActionState> {
  const values = Object.fromEntries(payload.entries());

  const registrationData: any = {
    fullName: values.fullName || "",
    email: values.email || "",
    password: values.password || "",
    phoneNumber: values.phoneNumber || "",
    role: values.role || "user",
  };

  // Only add referralCode if it exists
  if (values.referralCode && values.referralCode.trim() !== "") {
    registrationData.referralCode = values.referralCode;
  }

  console.log("Register Data", registrationData);
  const parsed = registerSchema.safeParse(registrationData);

  console.log("Parsed", parsed);

  if (!parsed.success) {
    return {
      success: false,
      message: "Please fix the errors in the form",
      errors: parsed.error?.flatten().fieldErrors || {},
      inputs: values,
      timestamp: Date.now(),
    };
  }

  try {
    const res = await api.post("/auth/register", parsed.data);

    if (!res.success) {
      return {
        success: false,
        message: res.message || "Registration failed",
        inputs: values,
        timestamp: Date.now(),
      };
    }

    // Set sessionId in cookies
    const sessionId = res?.data?.sessionId;
    if (sessionId) {
      const cookieStore = await cookies();
      cookieStore.set("sessionId", sessionId, {
        httpOnly: true,
        secure: true,
        maxAge: 3600, // 1 hour
      });
    }
    return {
      success: true,
      message: res?.message,
      data: res.data,
      timestamp: Date.now(),
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Registration failed",
      inputs: values,
      timestamp: Date.now(),
    };
  }
}

export async function forgotPassword(
  prevState: AuthActionState,
  payload: any,
): Promise<AuthActionState> {
  const values = Object.fromEntries(payload.entries());
  const parsed = forgotPasswordSchema.safeParse(values);

  if (!parsed.success) {
    return {
      success: false,
      message: "Invalid email",
      errors: parsed.error?.flatten().fieldErrors || {},
      inputs: values,
      timestamp: Date.now(),
    };
  }

  try {
    const res = await api.post("/auth/forgot-password", parsed.data);

    // Set sessionId in cookies for reset password flow
    const sessionId = res?.data?.sessionId;
    if (sessionId) {
      const cookieStore = await cookies();
      cookieStore.set("sessionId", sessionId, {
        httpOnly: true,
        secure: true,
        maxAge: 3600,
      });
    }

    return {
      success: true,
      message: res.message || "Reset link sent!",
      data: res.data,
      timestamp: Date.now(),
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Failed to send link",
      inputs: values,
      timestamp: Date.now(),
    };
  }
}

export async function verifyOtp(
  prevState: AuthActionState,
  payload: any,
): Promise<AuthActionState> {
  const values = Object.fromEntries(payload.entries());
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("sessionId")?.value;

  if (!sessionId) {
    return { success: false, message: "Session expired", inputs: values };
  }

  const data = {
    sessionId: sessionId,
    code: values.otp || values.code,
  };
  const parsed = verifyOtpSchema.safeParse(data);

  if (!parsed.success) {
    return {
      success: false,
      message: "Invalid OTP",
      errors: parsed.error?.flatten().fieldErrors || {},
      inputs: values,
      timestamp: Date.now(),
    };
  }

  try {
    const res = await api.post("/auth/verify-otp", data);
    if (!res.success) {
      return {
        success: false,
        message: res.message || "Invalid OTP",
        inputs: values,
        timestamp: Date.now(),
      };
    }

    const verifyData = res?.data;
    // 2. Handle Forgot Password Flow (resetToken)
    if (verifyData?.resetToken) {
      const isProduction = process.env.NODE_ENV === "production";
      await setCookie("resetPasswordToken", verifyData.resetToken, {
        secure: isProduction,
        httpOnly: true,
        maxAge: 3600, // 1 hour
        path: "/",
      });

      await deleteCookie("sessionId");

      return {
        success: true,
        message:
          res.message || "OTP verified. You can now reset your password.",
        data: { redirect: "/reset-password" },
        timestamp: Date.now(),
      };
    }
    return {
      success: true,
      message: res.message,
      data: {
        ...verifyData,
        redirect:
          verifyData?.user?.isEmailVerified === false
            ? "/verify-email"
            : getDefaultDashboardRoute(verifyData?.user?.role),
      },
      timestamp: Date.now(),
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Invalid OTP",
      inputs: values,
      timestamp: Date.now(),
    };
  }
}

export async function resetPassword(
  prevState: AuthActionState,
  payload: any,
): Promise<AuthActionState> {
  const values = Object.fromEntries(payload.entries());

  const parsed = resetPasswordSchema.safeParse({
    password: values.password,
    confirmPassword: values.confirmPassword,
  });

  if (!parsed.success) {
    return {
      success: false,
      message: "Invalid password",
      errors: parsed.error?.flatten().fieldErrors || {},
      inputs: values,
      timestamp: Date.now(),
    };
  }

  try {
    const resetToken = await getCookie("resetPasswordToken");

    if (!resetToken) {
      return {
        success: false,
        message: "Reset token expired or missing. Please try again.",
        timestamp: Date.now(),
      };
    }

    const res = await api.post("/auth/reset-password", {
      ...parsed.data,
      token: resetToken,
    });

    if (!res.success) {
      return {
        success: false,
        message: res.message || "Password reset failed",
        timestamp: Date.now(),
      };
    }

    // Success - clear the token
    await deleteCookie("resetPasswordToken");

    return {
      success: true,
      message: "Password reset successful!",
      data: res.data,
      timestamp: Date.now(),
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Failed to reset password",
      inputs: values,
      timestamp: Date.now(),
    };
  }
}

export async function getNewAccessToken() {
  try {
    const accessToken = await getCookie("accessToken");
    const refreshToken = await getCookie("refreshToken");

    //Case 1: Both tokens are missing - user is logged out
    if (!accessToken && !refreshToken) {
      return {
        success: false,
        message: "User is logged out",
      };
    }
    const res = await api.post("/auth/refresh-token", {
      refreshToken: refreshToken,
    });
    const isProduction = process.env.NODE_ENV === "production";
    if (res.success) {
      //set new tokens
      await setCookie("accessToken", res.data.accessToken, {
        secure: isProduction,
        httpOnly: true,
        maxAge: 3600,
        path: "/",
      });
      await setCookie("refreshToken", res.data.refreshToken, {
        secure: isProduction,
        httpOnly: true,
        maxAge: 3600 * 24 * 90,
        path: "/",
      });
    }
    return {
      success: true,
      message: "Token refreshed successfully!",
      data: res,
    };
  } catch (error: any) {
    console.error("Failed to refresh token", error);
    throw error;
  }
}

export async function resendOtp(
  prevState: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const values = Object.fromEntries(formData.entries());

  try {
    const res = await api.post("/auth/resend-otp", { email: values.email });
    if (!res.success) {
      return {
        success: false,
        message: res.message || "Failed to resend OTP",
        timestamp: Date.now(),
      };
    }

    return {
      success: true,
      message: res.message || "OTP sent successfully!",
      data: res.data,
      timestamp: Date.now(),
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Failed to resend OTP",
      timestamp: Date.now(),
    };
  }
}

export async function changePassword(
  prevState: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const values = Object.fromEntries(formData.entries());

  if (!values.currentPassword || !values.newPassword) {
    return {
      success: false,
      message: "Current password and new password are required",
      timestamp: Date.now(),
    };
  }

  try {
    const res = await api.post("/auth/change-password", {
      currentPassword: values.currentPassword,
      newPassword: values.newPassword,
    });
    if (!res.success) {
      return {
        success: false,
        message: res.message || "Failed to change password",
        timestamp: Date.now(),
      };
    }

    return {
      success: true,
      message: res.message || "Password changed successfully!",
      timestamp: Date.now(),
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Failed to change password",
      timestamp: Date.now(),
    };
  }
}

// Logout
export async function logoutUser() {
  try {
    const refreshToken = await getCookie("refreshToken");
    if (refreshToken) {
      await api.post("/auth/logout", { refreshToken });
    }
  } catch (error) {
    console.error("Backend logout failed", error);
  } finally {
    await deleteCookie("accessToken");
    await deleteCookie("refreshToken");
    await deleteCookie("userRole");
  }
  return { success: true };
}
