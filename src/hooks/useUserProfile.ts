"use client";
import { useAppSelector } from "@/redux/hooks";
export const useUserProfile = () => {
  const { user, isLoading } = useAppSelector((state) => state.auth);
  return { user, loading: isLoading };
};
