"use client";

import { useGetMyProfileQuery } from "@/redux/api/userApi";
import { setAuthLoading, setUser } from "@/redux/features/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { useEffect } from "react";

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
