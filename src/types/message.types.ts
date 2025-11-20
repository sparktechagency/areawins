/**
 * Messaging and notifications related TypeScript type definitions
 */

export type MessageType = "text" | "image" | "file" | "system";
export type ConversationType = "support" | "user" | "admin";
export type NotificationType = "bet_result" | "deposit" | "withdrawal" | "promotion" | "match_update" | "system" | "message";
export type NotificationPriority = "low" | "medium" | "high" | "urgent";

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  type: MessageType;
  content: string;
  attachments?: MessageAttachment[];
  isRead: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export interface MessageAttachment {
  id: string;
  type: "image" | "file";
  url: string;
  filename: string;
  size: number;
  mimeType: string;
  thumbnail?: string;
}

export interface Conversation {
  id: string;
  type: ConversationType;
  participants: ConversationParticipant[];
  lastMessage?: Message;
  unreadCount: number;
  createdAt: Date;
  updatedAt: Date;
  isArchived: boolean;
}

export interface ConversationParticipant {
  id: string;
  userId: string;
  username: string;
  avatar?: string;
  role: "user" | "support" | "admin";
  isOnline: boolean;
  lastSeen?: Date;
}

export interface SendMessageRequest {
  conversationId?: string;
  recipientId?: string;
  type: MessageType;
  content: string;
  attachments?: File[];
}

export interface SendMessageResponse {
  message: Message;
  conversation: Conversation;
}

export interface GetMessagesRequest {
  conversationId: string;
  page?: number;
  limit?: number;
  before?: string; // Message ID to get messages before
}

export interface GetMessagesResponse {
  messages: Message[];
  totalCount: number;
  hasMore: boolean;
}

export interface MarkAsReadRequest {
  messageIds: string[];
}

export interface MarkAsReadResponse {
  success: boolean;
  updatedCount: number;
}

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  priority: NotificationPriority;
  title: string;
  message: string;
  data?: Record<string, any>; // Additional data based on notification type
  icon?: string;
  isRead: boolean;
  createdAt: Date;
  expiresAt?: Date;
  actionUrl?: string;
  actionText?: string;
}

export interface NotificationFilter {
  type?: NotificationType;
  isRead?: boolean;
  priority?: NotificationPriority;
  dateFrom?: string;
  dateTo?: string;
  page?: number;
  limit?: number;
}

export interface NotificationsResponse {
  notifications: Notification[];
  totalCount: number;
  unreadCount: number;
  page: number;
  totalPages: number;
}

export interface MarkNotificationAsReadRequest {
  notificationIds: string[];
}

export interface MarkNotificationAsReadResponse {
  success: boolean;
  updatedCount: number;
}

export interface DeleteNotificationRequest {
  notificationIds: string[];
}

export interface DeleteNotificationResponse {
  success: boolean;
  deletedCount: number;
}

export interface MessageState {
  conversations: Conversation[];
  currentConversation: Conversation | null;
  messages: Record<string, Message[]>; // conversationId -> messages
  isLoading: boolean;
  error: string | null;
}

export interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
  isLoading: boolean;
  error: string | null;
}

export interface TypingIndicator {
  conversationId: string;
  userId: string;
  username: string;
  isTyping: boolean;
  timestamp: Date;
}

export interface OnlineStatus {
  userId: string;
  isOnline: boolean;
  lastSeen: Date;
}

export interface PushNotificationSettings {
  enabled: boolean;
  sound: boolean;
  vibrate: boolean;
  betResults: boolean;
  promotions: boolean;
  messages: boolean;
  matchUpdates: boolean;
}

export interface CreateConversationRequest {
  type: ConversationType;
  recipientId?: string;
  subject?: string;
  initialMessage?: string;
}

export interface CreateConversationResponse {
  conversation: Conversation;
  message?: string;
}
