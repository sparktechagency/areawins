"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface ChatItemProps {
    id: string;
    name: string;
    avatar?: string;
    lastMessage: string;
    time: string;
    unreadCount?: number;
    isActive?: boolean;
    onClick: (id: string) => void;
    isOnline?: boolean;
}

export default function ChatItem({
    id,
    name,
    avatar,
    lastMessage,
    time,
    unreadCount,
    isActive,
    onClick,
    isOnline
}: ChatItemProps) {
    return (
        <div
            onClick={() => onClick(id)}
            className={cn(
                "flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors hover:bg-muted/50",
                isActive && "bg-muted"
            )}
        >
            <div className="relative">
                <Avatar>
                    <AvatarImage src={avatar} alt={name} />
                    <AvatarFallback>{name.charAt(0)}</AvatarFallback>
                </Avatar>
                {isOnline && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-background rounded-full" />
                )}
            </div>

            <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-1">
                    <h4 className="font-semibold text-sm truncate text-foreground">{name}</h4>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">{time}</span>
                </div>
                <p className="text-xs text-muted-foreground truncate pr-2">
                    {lastMessage}
                </p>
            </div>

            {unreadCount && unreadCount > 0 && (
                <div className="flex-shrink-0">
                    <span className="flex items-center justify-center w-5 h-5 bg-primary text-primary-foreground text-[10px] font-bold rounded-full">
                        {unreadCount}
                    </span>
                </div>
            )}
        </div>
    );
}
