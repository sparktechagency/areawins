"use client";

/**
 * MessagesPage Component
 * 2-column chat interface for user messages
 */

import { useState, useRef, useEffect } from "react";
import {
  useGetConversationsQuery,
  useGetMessagesQuery,
  useSendMessageMutation,
} from "@/lib/redux/api/messageApi";
import { useAuth } from "@/hooks/useAuth";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDate } from "@/lib/utils";
import { Search, Send, MessageCircle, Phone, Video, MoreVertical } from "lucide-react";
import toast from "react-hot-toast";

export default function MessagesPage() {
  const { user } = useAuth();
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [messageText, setMessageText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { data: conversations, isLoading: loadingConversations } = useGetConversationsQuery();
  const { data: messages, isLoading: loadingMessages } = useGetMessagesQuery(
    { conversationId: selectedConversation || "" },
    { skip: !selectedConversation }
  );
  const [sendMessage, { isLoading: sending }] = useSendMessageMutation();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!messageText.trim() || !selectedConversation) return;

    try {
      await sendMessage({
        conversationId: selectedConversation,
        content: messageText,
        type: "text",
      }).unwrap();
      setMessageText("");
      toast.success("Message sent!");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to send message");
    }
  };

  const filteredConversations = conversations?.conversations.filter((conv) =>
    conv.participant.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedConv = conversations?.conversations.find((c) => c.id === selectedConversation);

  return (
    <DashboardLayout>
      <div className="h-[calc(100vh-12rem)]">
        <Card className="h-full flex flex-col">
          <div className="flex h-full">
            {/* Left Column - Conversation List */}
            <div className="w-80 border-r flex flex-col bg-gray-50">
              {/* Search Header */}
              <div className="p-4 border-b bg-white">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search conversations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Conversations List */}
              <div className="flex-1 overflow-y-auto">
                {loadingConversations ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  </div>
                ) : filteredConversations && filteredConversations.length > 0 ? (
                  <div>
                    {filteredConversations.map((conversation) => (
                      <button
                        key={conversation.id}
                        onClick={() => setSelectedConversation(conversation.id)}
                        className={`w-full p-4 flex items-start gap-3 border-b hover:bg-white transition-colors ${
                          selectedConversation === conversation.id
                            ? "bg-white border-l-4 border-l-primary"
                            : ""
                        }`}
                      >
                        {/* Avatar */}
                        <div className="relative">
                          <Avatar className="w-12 h-12">
                            <AvatarImage src={conversation.participant.avatar} />
                            <AvatarFallback className="bg-primary text-white">
                              {conversation.participant.name.charAt(0).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          {conversation.participant.isOnline && (
                            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                          )}
                        </div>

                        {/* Conversation Info */}
                        <div className="flex-1 text-left overflow-hidden">
                          <div className="flex items-center justify-between mb-1">
                            <p className="font-semibold text-gray-900 truncate">
                              {conversation.participant.name}
                            </p>
                            <span className="text-xs text-gray-500">
                              {formatDate(conversation.lastMessage.createdAt, "HH:mm")}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <p className="text-sm text-gray-600 truncate flex-1">
                              {conversation.lastMessage.content}
                            </p>
                            {conversation.unreadCount > 0 && (
                              <Badge className="bg-primary text-white ml-2 min-w-[20px] h-5 flex items-center justify-center px-1">
                                {conversation.unreadCount}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 px-4">
                    <MessageCircle className="w-16 h-16 text-gray-300 mb-3" />
                    <p className="text-gray-600 text-center">
                      {searchQuery ? "No conversations found" : "No messages yet"}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column - Chat Area */}
            <div className="flex-1 flex flex-col bg-white">
              {selectedConversation && selectedConv ? (
                <>
                  {/* Chat Header */}
                  <div className="p-4 border-b flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={selectedConv.participant.avatar} />
                        <AvatarFallback className="bg-primary text-white">
                          {selectedConv.participant.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold text-gray-900">
                          {selectedConv.participant.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {selectedConv.participant.isOnline ? "Online" : "Offline"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon">
                        <Phone className="w-5 h-5" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Video className="w-5 h-5" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>

                  {/* Messages Area */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                    {loadingMessages ? (
                      <div className="flex items-center justify-center h-full">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                      </div>
                    ) : messages && messages.messages.length > 0 ? (
                      <>
                        {messages.messages.map((message) => {
                          const isSent = message.senderId === user?.id;

                          return (
                            <div
                              key={message.id}
                              className={`flex ${isSent ? "justify-end" : "justify-start"}`}
                            >
                              <div className={`flex gap-2 max-w-[70%] ${isSent ? "flex-row-reverse" : ""}`}>
                                {!isSent && (
                                  <Avatar className="w-8 h-8 flex-shrink-0">
                                    <AvatarImage src={selectedConv.participant.avatar} />
                                    <AvatarFallback className="bg-gray-300 text-gray-700 text-xs">
                                      {selectedConv.participant.name.charAt(0).toUpperCase()}
                                    </AvatarFallback>
                                  </Avatar>
                                )}

                                <div className="flex flex-col">
                                  <div
                                    className={`rounded-2xl px-4 py-2 ${
                                      isSent
                                        ? "bg-[#d4f4dd] text-gray-900"
                                        : "bg-white text-gray-900 shadow-sm"
                                    }`}
                                  >
                                    <p className="text-sm">{message.content}</p>
                                  </div>
                                  <span
                                    className={`text-xs text-gray-500 mt-1 ${
                                      isSent ? "text-right" : "text-left"
                                    }`}
                                  >
                                    {formatDate(message.createdAt, "HH:mm")}
                                    {isSent && message.isRead && " • Read"}
                                  </span>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                        <div ref={messagesEndRef} />
                      </>
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <p className="text-gray-500">No messages yet. Start the conversation!</p>
                      </div>
                    )}
                  </div>

                  {/* Message Input */}
                  <div className="p-4 border-t bg-white">
                    <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                      <Input
                        type="text"
                        placeholder="Type a message..."
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                        className="flex-1"
                        disabled={sending}
                      />
                      <Button
                        type="submit"
                        disabled={sending || !messageText.trim()}
                        className="bg-primary hover:bg-primary/90"
                      >
                        <Send className="w-4 h-4" />
                      </Button>
                    </form>
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <MessageCircle className="w-20 h-20 text-gray-300 mx-auto mb-4" />
                    <p className="text-xl font-semibold text-gray-900 mb-2">
                      Select a conversation
                    </p>
                    <p className="text-gray-600">
                      Choose a conversation from the left to start messaging
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
