"use client";
import { ROUTES } from "@/lib/constants";
import { openAuthModal } from "@/lib/redux/features/authUiSlice";
import { useAppDispatch } from "@/lib/redux/hooks";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function useAuth() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [user, setUser] = useState<{
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    username: string;
    phone: string;
    avatar: string;
    currency: string;
    isEmailVerified: boolean;
    isPhoneVerified: boolean;
    createdAt: Date;
    updatedAt: Date;
  } | null>({
    id: "u123",
    email: "john@example.com",
    firstName: "John",
    lastName: "Doe",
    username: "johndoe",
    phone: "1711223344",
    avatar: "https://i.pravatar.cc/150?img=1",
    currency: "USD",
    isEmailVerified: true,
    isPhoneVerified: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  
  const isLoading = false;
  const error = null;

  const handleLogout = async () => {
    // Update auth state to logged out
    setIsAuthenticated(false);
    setUser(null);
    
    // Open login modal
    dispatch(openAuthModal({ view: "LOGIN" }));
  };

  const login = async (credentials: any) => {
    console.log("Login credentials:", credentials);
    router.push(ROUTES.DASHBOARD);
  };

  const register = async (userData: any) => {
    console.log("Register user:", userData);  
    router.push(ROUTES.DASHBOARD);
  };

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    register,
    logout: handleLogout,
    isLoggingIn: false,
    isRegistering: false,
    isLoggingOut: false,
  };
}
