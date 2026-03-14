"use server";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { getCookie } from "@/utils/tokenHandlers";
import { revalidateTag } from "next/cache";
import { api } from "./api";
import { ActionState } from "@/interfaces/action-state.interface";

export type UserActionState = ActionState;

export async function getMyProfile() {
  const accessToken = await getCookie("accessToken");
  const refreshToken = await getCookie("refreshToken");
  if (!accessToken && !refreshToken) {
    return null;
  }
  try {
    const res = await api.get("/users/profile/me", {
      next: {
        tags: ["profile"],
        revalidate: 180,
      },
    });
    if (!res.success) {
      console.error("Profile fetch failed:", res.message);
      return null;
    }
    return res.data;
  } catch (error: any) {
    console.error("Failed to fetch profile:", error.message);
    return null;
  }
}

export async function updateMyProfile(data: any) {
  const accessToken = await getCookie("accessToken");
  const refreshToken = await getCookie("refreshToken");

  if (!accessToken || !refreshToken) {
    throw new Error("User not authenticated");
  }

  try {
    const res = await api.patch("/users/profile/me", data);
    if (!res.success) {
      throw new Error(res.message || "Failed to update profile");
    }
    revalidateTag("profile", { expire: 0 });
    return res.data;
  } catch (error: any) {
    console.error("Failed to update profile:", error.message);
    throw error;
  }
}
