import { cn } from "@/lib/utils";
import { formatOdds } from "@/lib/utils";

interface OddsButtonProps {
  odds: number;
  selected?: boolean;
  onClick?: () => void;
  label?: string;
  disabled?: boolean;
  className?: string;
}

export default function OddsButton({
  odds,
  selected = false,
  onClick,
  label,
  disabled = false,
  className,
}: OddsButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "odds-button flex flex-col items-center justify-center",
        "min-w-[80px] px-4 py-3 rounded-lg border transition-all duration-200",
        "hover:shadow-md active:scale-95",
        selected
          ? "bg-primary text-white border-primary"
          : "bg-white text-gray-900 border-gray-200 hover:border-primary hover:bg-green-50",
        disabled && "opacity-50 cursor-not-allowed hover:shadow-none",
        className
      )}
    >
      {label && (
        <span className="text-xs font-medium mb-1 opacity-80">{label}</span>
      )}
      <span className="text-lg font-bold">{formatOdds(odds)}</span>
    </button>
  );
}
