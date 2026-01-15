"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface DropdownItemProps {
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: "default" | "destructive";
}

interface AnimatedDropdownProps {
  trigger: React.ReactNode;
  items: DropdownItemProps[];
  className?: string;
  align?: "left" | "right";
  width?: string;
}

export const AnimatedDropdown = ({
  trigger,
  items,
  className,
  align = "right",
  width = "w-56",
}: AnimatedDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className={cn("relative inline-block text-left", className)}
      ref={dropdownRef}
    >
      <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
        {trigger}
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={cn(
              "absolute z-50 mt-2 rounded-xl border border-border bg-popover text-popover-foreground shadow-xl focus:outline-none overflow-hidden",
              align === "right" ? "right-0" : "left-0",
              width
            )}
          >
            <div className="py-1">
              {items.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  onClick={(e) => {
                    if (item.onClick) {
                      e.preventDefault();
                      item.onClick();
                    }
                    setIsOpen(false);
                  }}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-colors hover:bg-muted/50 cursor-pointer block",
                    item.variant === "destructive"
                      ? "text-destructive hover:text-destructive/90"
                      : "text-foreground"
                  )}
                >
                  {item.icon && (
                    <span className="text-muted-foreground">{item.icon}</span>
                  )}
                  {item.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
