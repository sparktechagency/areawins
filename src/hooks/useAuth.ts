/**
 * Auth hook
 * Provides authentication state and methods
 */

"use client";

import { useAppSelector } from "@/lib/redux/hooks";
import { useLoginMutation, useLogoutMutation, useRegisterMutation } from "@/lib/redux/api/authApi";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/lib/constants";

export function useAuth() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading, error } = useAppSelector((state) => state.auth);
  const [login, { isLoading: isLoggingIn }] = useLoginMutation();
  const [register, { isLoading: isRegistering }] = useRegisterMutation();
  const [logout, { isLoading: isLoggingOut }] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      router.push(ROUTES.HOME);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return {
    user,
    isAuthenticated,
    isLoading: isLoading || isLoggingIn || isRegistering || isLoggingOut,
    error,
    login,
    register,
    logout: handleLogout,
    isLoggingIn,
    isRegistering,
    isLoggingOut,
  };
}
