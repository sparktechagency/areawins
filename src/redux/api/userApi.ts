import { baseApi } from "./baseApi";
import { IUser } from "@/interfaces/user.interface";
import { clearAllAuthCookies } from "@/utils/cookieUtils";
import { clearUser, setUser } from "../features/authSlice";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyProfile: builder.query<IUser, void>({
      query: () => "/users/my-profile",
      providesTags: ["Profile"],
      transformResponse: (response: { success: boolean; data: IUser }) =>
        response.data,
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data) {
            dispatch(setUser(data));
          }
        } catch {}
      },
    }),
    updateMyProfile: builder.mutation<IUser, Partial<IUser>>({
      query: (data) => ({
        url: "/users/update-profile",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Profile"],
      transformResponse: (response: { success: boolean; data: IUser }) =>
        response.data,
    }),
    updateMyProfilePicture: builder.mutation<IUser, FormData>({
      query: (data) => ({
        url: "/users/update-profile-image",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Profile"],
      transformResponse: (response: { success: boolean; data: IUser }) =>
        response.data,
    }),
    checkUserName: builder.mutation<{ isAvailable: boolean }, string>({
      query: (username) => {
        return {
          url: `/users/check-username?username=${username}`,
          method: "GET",
        };
      },
      transformResponse: (response: {
        success: boolean;
        data: { isAvailable: boolean };
      }) => response.data,
    }),
    deleteProfile: builder.mutation<void, void>({
      query: () => ({
        url: "/users/delete-profile",
        method: "DELETE",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          clearAllAuthCookies();
          dispatch(clearUser());
        } catch {}
      },
    }),
  }),
});

export const {
  useGetMyProfileQuery,
  useUpdateMyProfileMutation,
  useUpdateMyProfilePictureMutation,
  useCheckUserNameMutation,
  useDeleteProfileMutation,
} = userApi;
