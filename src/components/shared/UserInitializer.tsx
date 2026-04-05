"use client";

import { useGetMyProfileQuery } from "@/redux/api/userApi";
import { setAuthLoading, setUser } from "@/redux/features/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getClientCookie } from "@/utils/cookieUtils";
import { useEffect } from "react";

export default function UserInitializer({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const token = getClientCookie("accessToken");

  const {
    data: user,
    isLoading,
    isError,
    isFetching,
  } = useGetMyProfileQuery(undefined, {
    skip: !token && !isAuthenticated,
  });

  useEffect(() => {
    if (isLoading || isFetching) {
      dispatch(setAuthLoading(true));
    } else {
      dispatch(setAuthLoading(false));
    }
  }, [isLoading, isFetching, dispatch]);

  useEffect(() => {
    if (user) {
      dispatch(setUser(user));
    } else if (isError) {
      dispatch(setUser(null));
    }
  }, [user, isError, dispatch]);

  return <>{children}</>;
}
