"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Check, CheckCheck } from "lucide-react";

interface MessageItemProps {
    content: string;
    timestamp: string;
    isOwn: boolean;
    status?: "sent" | "delivered" | "read";
    senderName?: string;
    senderAvatar?: string;
}

export default function MessageItem({
    content,
    timestamp,
    isOwn,
    status = "read",
    senderName,
    senderAvatar
}: MessageItemProps) {
    return (
        <div className={cn("flex gap-3 mb-4", isOwn ? "flex-row-reverse" : "flex-row")}>
            {!isOwn && (
                <Avatar className="w-8 h-8 mt-1">
                    <AvatarImage src={senderAvatar} />
                    <AvatarFallback>{senderName?.charAt(0) || "?"}</AvatarFallback>
                </Avatar>
            )}

            <div className={cn("flex flex-col max-w-[70%]", isOwn ? "items-end" : "items-start")}>
                <div
                    className={cn(
                        "px-4 py-2 rounded-2xl text-sm relative shadow-sm",
                        isOwn
                            ? "bg-primary text-primary-foreground rounded-tr-none"
                            : "bg-muted text-foreground rounded-tl-none"
                    )}
                >
                    <p>{content}</p>
                </div>

                <div className="flex items-center gap-1 mt-1 px-1">
                    <span className="text-[10px] text-muted-foreground">{timestamp}</span>
                    {isOwn && (
                        <span className="text-muted-foreground">
                            {status === "read" ? <CheckCheck className="w-3 h-3 text-blue-500" /> : <Check className="w-3 h-3" />}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}
