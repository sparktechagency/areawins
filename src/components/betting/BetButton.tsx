/**
 * BetButton Component
 * Green button for placing bets
 */

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface BetButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  children?: React.ReactNode;
  className?: string;
}

export default function BetButton({
  onClick,
  disabled = false,
  children = "Bet",
  className,
}: BetButtonProps) {
  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "bg-primary hover:bg-primary/90 text-white font-semibold",
        "px-6 py-2 rounded-md transition-all",
        "hover:shadow-md active:scale-95",
        className
      )}
    >
      {children}
    </Button>
  );
}
