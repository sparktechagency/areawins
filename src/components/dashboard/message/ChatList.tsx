"use client";

import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search } from "lucide-react";
import ChatItem from "./ChatItem";

interface Chat {
    id: string;
    name: string;
    avatar?: string;
    lastMessage: string;
    time: string;
    unreadCount: number;
    isOnline: boolean;
}

interface ChatListProps {
    chats: Chat[];
    activeChatId: string;
    onChatSelect: (id: string) => void;
}

export default function ChatList({ chats, activeChatId, onChatSelect }: ChatListProps) {
    return (
        <div className="flex flex-col h-full bg-card border-r border-border">
            <div className="p-4 border-b border-border">
                <h2 className="text-xl font-bold mb-4">Messages</h2>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                        placeholder="Search messages..."
                        className="pl-9 bg-muted/50 border-input focus-visible:ring-primary"
                    />
                </div>
            </div>

            <ScrollArea className="flex-1">
                <div className="p-2 space-y-1">
                    {chats.map((chat) => (
                        <ChatItem
                            key={chat.id}
                            {...chat}
                            isActive={chat.id === activeChatId}
                            onClick={onChatSelect}
                        />
                    ))}
                </div>
            </ScrollArea>
        </div>
    );
}
