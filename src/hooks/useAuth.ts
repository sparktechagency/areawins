"use client";
import { IUser } from "@/interfaces/user.interface";
import { ROUTES } from "@/lib/constants";
import { openAuthModal } from "@/lib/redux/features/authUiSlice";
import { useAppDispatch } from "@/lib/redux/hooks";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function useAuth() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [user, setUser] = useState<IUser | null>({
    _id: "u123",
    fullName: "John Doe",
    email: "john@example.com",
    role: "user",
    nickname: "johndoe",
    customerId: "cust123",
    profileImage: "https://i.pravatar.cc/150?img=1",
    referralCode: "REF123",
    referredUsers: [],
    referralEarnings: 0,
    isVerified: true,
    isBlocked: false,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    lastLoginAt: new Date().toISOString(),
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
