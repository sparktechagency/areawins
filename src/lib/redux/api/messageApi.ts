/**
 * Messaging and notifications API endpoints
 */

import { baseApi } from "./baseApi";
import type {
  Conversation,
  Message,
  SendMessageRequest,
  SendMessageResponse,
  GetMessagesRequest,
  GetMessagesResponse,
  Notification,
  NotificationFilter,
  NotificationsResponse,
} from "@/types";

export const messageApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get conversations
    getConversations: builder.query<{ conversations: Conversation[] }, void>({
      query: () => "/messages/conversations",
      providesTags: ["Conversations"],
    }),

    // Get messages in a conversation
    getMessages: builder.query<GetMessagesResponse, GetMessagesRequest>({
      query: ({ conversationId, ...params }) => ({
        url: `/messages/${conversationId}`,
        params,
      }),
      providesTags: (result, error, { conversationId }) => [{ type: "Messages", id: conversationId }],
    }),

    // Send message
    sendMessage: builder.mutation<SendMessageResponse, SendMessageRequest>({
      query: (data) => ({
        url: "/messages/send",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Messages", "Conversations"],
    }),

    // Mark messages as read
    markAsRead: builder.mutation<{ success: boolean }, { messageIds: string[] }>({
      query: (data) => ({
        url: "/messages/mark-read",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Messages", "Conversations"],
    }),

    // Get notifications
    getNotifications: builder.query<NotificationsResponse, NotificationFilter | void>({
      query: (filter) => ({
        url: "/notifications",
        params: filter,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.notifications.map(({ id }) => ({ type: "Notifications" as const, id })),
              { type: "Notifications", id: "LIST" },
            ]
          : [{ type: "Notifications", id: "LIST" }],
    }),

    // Mark notifications as read
    markNotificationsAsRead: builder.mutation<{ success: boolean }, { notificationIds: string[] }>({
      query: (data) => ({
        url: "/notifications/mark-read",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Notifications"],
    }),

    // Delete notifications
    deleteNotifications: builder.mutation<{ success: boolean }, { notificationIds: string[] }>({
      query: (data) => ({
        url: "/notifications",
        method: "DELETE",
        body: data,
      }),
      invalidatesTags: ["Notifications"],
    }),

    // Get unread count
    getUnreadCount: builder.query<{ count: number }, void>({
      query: () => "/notifications/unread-count",
      providesTags: ["Notifications"],
    }),
  }),
});

export const {
  useGetConversationsQuery,
  useGetMessagesQuery,
  useSendMessageMutation,
  useMarkAsReadMutation,
  useGetNotificationsQuery,
  useMarkNotificationsAsReadMutation,
  useDeleteNotificationsMutation,
  useGetUnreadCountQuery,
} = messageApi;
