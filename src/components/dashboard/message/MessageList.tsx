"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MoreVertical, Paperclip, Phone, Send, Video } from "lucide-react";
import MessageItem from "./MessageItem";

interface Message {
    id: string;
    content: string;
    timestamp: string;
    isOwn: boolean;
    status: "sent" | "delivered" | "read";
    senderName?: string;
    senderAvatar?: string;
}

interface ActiveChat {
    id: string;
    name: string;
    avatar?: string;
    isOnline: boolean;
}

interface MessageListProps {
    activeChat: ActiveChat | null;
    messages: Message[];
    messageInput: string;
    setMessageInput: (val: string) => void;
    onSendMessage: () => void;
}

export default function MessageList({
    activeChat,
    messages,
    messageInput,
    setMessageInput,
    onSendMessage
}: MessageListProps) {

    if (!activeChat) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-muted-foreground bg-background/50">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                    <Send className="w-8 h-8 text-muted-foreground" />
                </div>
                <p className="text-lg font-medium">Select a conversation to start messaging</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full bg-background">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border bg-card/50 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                    <Avatar>
                        <AvatarImage src={activeChat.avatar} />
                        <AvatarFallback>{activeChat.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <h3 className="font-bold text-foreground">{activeChat.name}</h3>
                        <span className="text-xs text-green-500 font-medium flex items-center gap-1">
                            {activeChat.isOnline && <span className="w-2 h-2 rounded-full bg-green-500" />}
                            {activeChat.isOnline ? "Online" : "Offline"}
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                        <Phone className="w-5 h-5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                        <Video className="w-5 h-5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                        <MoreVertical className="w-5 h-5" />
                    </Button>
                </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4 bg-muted/10">
                <div className="flex flex-col justify-end min-h-full">
                    {messages.map((msg) => (
                        <MessageItem
                            key={msg.id}
                            {...msg}
                        />
                    ))}
                </div>
            </ScrollArea>

            {/* Input Area */}
            <div className="p-4 border-t border-border bg-card">
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="text-muted-foreground shrink-0">
                        <Paperclip className="w-5 h-5" />
                    </Button>
                    <div className="relative flex-1">
                        <Input
                            placeholder="Type a message..."
                            value={messageInput}
                            onChange={(e) => setMessageInput(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && onSendMessage()}
                            className="bg-muted/50 border-input focus-visible:ring-primary pr-10"
                        />
                    </div>
                    <Button
                        onClick={onSendMessage}
                        disabled={!messageInput.trim()}
                        size="icon"
                        className="shrink-0"
                    >
                        <Send className="w-5 h-5" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
