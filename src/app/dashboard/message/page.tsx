"use client";

import ChatList from "@/components/dashboard/message/ChatList";
import MessageList from "@/components/dashboard/message/MessageList";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { useState } from "react";

// Mock Data
const MOCK_CHATS = [
  {
    id: "1",
    name: "Support Team",
    avatar:
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80",
    lastMessage: "Your withdrawal has been processed.",
    time: "10:30 AM",
    unreadCount: 1,
    isOnline: true,
  },
  {
    id: "2",
    name: "John Doe",
    avatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80",
    lastMessage: "Hey, check out this match!",
    time: "Yesterday",
    unreadCount: 0,
    isOnline: false,
  },
  {
    id: "3",
    name: "Admin Alice",
    lastMessage: "Please verify your email address.",
    time: "Oct 24",
    unreadCount: 0,
    isOnline: true,
  },
];

const MOCK_MESSAGES = {
  "1": [
    {
      id: "m1",
      content: "Hello, I have an issue with my withdrawal.",
      timestamp: "10:00 AM",
      isOwn: true,
      status: "read",
    },
    {
      id: "m2",
      content: "Hi! I can help you with that. What is your transaction ID?",
      timestamp: "10:05 AM",
      isOwn: false,
      senderName: "Support Team",
    },
    {
      id: "m3",
      content: "It's TXN123456.",
      timestamp: "10:06 AM",
      isOwn: true,
      status: "read",
    },
    {
      id: "m4",
      content: "Your withdrawal has been processed.",
      timestamp: "10:30 AM",
      isOwn: false,
      senderName: "Support Team",
    },
  ],
  "2": [
    {
      id: "m5",
      content: "Yo, are you betting on the game tonight?",
      timestamp: "Yesterday",
      isOwn: false,
      senderName: "John Doe",
    },
    {
      id: "m6",
      content: "Yeah, Man City looks strong.",
      timestamp: "Yesterday",
      isOwn: true,
      status: "read",
    },
  ],
};

export default function MessagePage() {
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [messageInput, setMessageInput] = useState("");
  const [chats, setChats] = useState(MOCK_CHATS);
  const [messages, setMessages] =
    useState<Record<string, any[]>>(MOCK_MESSAGES);

  const activeChat = chats.find((c) => c.id === activeChatId) || null;
  const currentMessages = activeChatId ? messages[activeChatId] || [] : [];

  const handleSendMessage = () => {
    if (!messageInput.trim() || !activeChatId) return;

    const newMessage = {
      id: Date.now().toString(),
      content: messageInput,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      isOwn: true,
      status: "sent",
    };

    setMessages((prev) => ({
      ...prev,
      [activeChatId]: [...(prev[activeChatId] || []), newMessage],
    }));

    // Update last message in chat list
    setChats((prev) =>
      prev.map((chat) =>
        chat.id === activeChatId
          ? { ...chat, lastMessage: messageInput, time: "Just now" }
          : chat
      )
    );

    setMessageInput("");
  };

  return (
    <DashboardLayout>
      <div className="flex h-[calc(100vh-150px)] overflow-hidden bg-background border border-border rounded-xl">
        {/* Sidebar List */}
        <div className="w-full md:w-80 lg:w-96 shrink-0 h-full ">
          <ChatList
            chats={chats}
            activeChatId={activeChatId || ""}
            onChatSelect={setActiveChatId}
          />
        </div>

        {/* Main Message View */}
        <div className="hidden md:block flex-1 h-full">
          <MessageList
            activeChat={activeChat}
            messages={currentMessages}
            messageInput={messageInput}
            setMessageInput={setMessageInput}
            onSendMessage={handleSendMessage}
          />
        </div>

        {/* Mobile Active Chat View Overlay (Simple implementation) */}
        {activeChatId && (
          <div className="md:hidden fixed inset-0 z-50 bg-background flex flex-col pt-16">
            <button
              onClick={() => setActiveChatId(null)}
              className="absolute top-20 left-4 z-50 p-2 bg-primary/20 rounded-full text-xs font-bold"
            >
              ← Back
            </button>
            <MessageList
              activeChat={activeChat}
              messages={currentMessages}
              messageInput={messageInput}
              setMessageInput={setMessageInput}
              onSendMessage={handleSendMessage}
            />
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
