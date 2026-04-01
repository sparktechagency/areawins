"use client";

import { useEffect } from "react";
import { useGetMyProfileQuery } from "@/lib/redux/api/userApi";
import { useAppDispatch } from "@/lib/redux/hooks";
import { setUser, setAuthLoading } from "@/lib/redux/features/authSlice";

export default function UserInitializer({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();
  const {
    data: user,
    isLoading,
    isError,
    isFetching,
  } = useGetMyProfileQuery(undefined);

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
