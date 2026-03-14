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
        revalidate: 180, // 3 minutes
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

export async function updateInstitutionBatch(
  prevState: UserActionState,
  formData: FormData,
): Promise<UserActionState> {
  const values = Object.fromEntries(formData.entries());
  try {
    const institutionInfo = {
      name: values.institutionName,
      shortName: values.shortName,
      establishedYear: values.establishedYear,
      type: values.institutionType,
      contactEmail: values.contactEmail,
      contactPhone: values.contactPhone,
      website: values.website,
      address: values.address,
    };
    const batchInformation = {
      department: values.department,
      batchType: values.batchType,
      academicYear: values.academicYear,
      session: values.session,
      semester: values.semester || undefined,
      shift: values.shift || undefined,
      group: values.group || undefined,
    };
    // 2. Prepare final FormData for submission
    const finalFormData = new FormData();
    finalFormData.append("institutionInfo", JSON.stringify(institutionInfo));
    finalFormData.append("batchInformation", JSON.stringify(batchInformation));
    // Process file
    const file = formData.get("logo") as File | null;
    if (file && file.size > 0) {
      finalFormData.append("logo", file);
    }
    // 3. Call API
    const res = await api.patch(
      "/users/update-institution-and-batch",
      finalFormData,
      {},
    );

    if (!res.success) {
      throw new Error(res.message || "Failed to update institution batch");
    }
    revalidateTag("profile", { expire: 0 });

    return {
      success: true,
      message: res.message,
      data: res.data,
      timestamp: Date.now(),
    };
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message: error.message || "Failed to update institution batch",
      errors: error,
      inputs: values,
      timestamp: Date.now(),
    };
  }
}
