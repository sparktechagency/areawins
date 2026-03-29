"use client";

import DashboardLayout from "@/components/layouts/DashboardLayout";
import ChatList from "@/components/pages/dashboard/message/ChatList";
import MessageList from "@/components/pages/dashboard/message/MessageList";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import { useState } from "react";

const MessagePage = () => {
  const { t } = useTranslation();
  const MOCK_CHATS = [
    {
      id: "1",
      name: t("message.supportTeam"),
      avatar:
        "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80",
      lastMessage: t("message.yourWithdrawalProcessed"),
      time: "10:30 AM",
      unreadCount: 1,
      isOnline: true,
    },
    {
      id: "2",
      name: "John Doe",
      avatar:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80",
      lastMessage: t("message.checkOutMatch"),
      time: t("message.yesterday"),
      unreadCount: 0,
      isOnline: false,
    },
    {
      id: "3",
      name: t("message.adminAlice"),
      lastMessage: t("message.verifyEmail"),
      time: "Oct 24",
      unreadCount: 0,
      isOnline: true,
    },
  ];

  const MOCK_MESSAGES = {
    "1": [
      {
        id: "m1",
        content: t("message.issueWithWithdrawal"),
        timestamp: "10:00 AM",
        isOwn: true,
        status: "read",
      },
      {
        id: "m2",
        content: t("message.askTransactionId"),
        timestamp: "10:05 AM",
        isOwn: false,
        senderName: t("message.supportTeam"),
      },
      {
        id: "m3",
        content: t("message.txnReply"),
        timestamp: "10:06 AM",
        isOwn: true,
        status: "read",
      },
      {
        id: "m4",
        content: t("message.yourWithdrawalProcessed"),
        timestamp: "10:30 AM",
        isOwn: false,
        senderName: t("message.supportTeam"),
      },
    ],
    "2": [
      {
        id: "m5",
        content: t("message.yoBettingTonight"),
        timestamp: t("message.yesterday"),
        isOwn: false,
        senderName: "John Doe",
      },
      {
        id: "m6",
        content: t("message.manCityStrong"),
        timestamp: t("message.yesterday"),
        isOwn: true,
        status: "read",
      },
    ],
  };

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
          ? { ...chat, lastMessage: messageInput, time: t("message.justNow") }
          : chat
      )
    );

    setMessageInput("");
  };

  return (
    <DashboardLayout>
      <div className="flex h-[calc(100vh-150px)] overflow-hidden bg-background border border-border rounded-lg">
        {/* Sidebar List */}
        <div className="w-full md:w-80 shrink-0 h-full ">
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
              ← {t("message.back")}
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
};

export default MessagePage;
