"use server";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ActionState } from "@/interfaces/action-state.interface";
import { getCookie } from "@/utils/tokenHandlers";
import { revalidateTag } from "next/cache";
import { api } from "./api";

export type UserActionState = ActionState;

export async function getMyProfile() {
  const accessToken = await getCookie("accessToken");
  const refreshToken = await getCookie("refreshToken");
  if (!accessToken && !refreshToken) {
    return null;
  }
  try {
    const res = await api.get("/users/my-profile", {
      next: {
        tags: ["profile"],
        revalidate: 180,
      },
    });

    if (!res.success) {
      return null;
    }

    return res.data;
  } catch (error: any) {
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
    const res = await api.patch("/users/update-profile", data);
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
