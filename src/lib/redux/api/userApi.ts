import { baseApi } from "./baseApi";
import { IUser } from "@/interfaces/user.interface";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyProfile: builder.query<IUser, void>({
      query: () => "/users/my-profile",
      providesTags: ["Profile"],
      transformResponse: (response: { success: boolean; data: IUser }) => response.data,
    }),
    updateMyProfile: builder.mutation<IUser, Partial<IUser>>({
      query: (data) => ({
        url: "/users/update-profile",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Profile"],
      transformResponse: (response: { success: boolean; data: IUser }) => response.data,
    }),
  }),
});

export const { useGetMyProfileQuery, useUpdateMyProfileMutation } = userApi;
