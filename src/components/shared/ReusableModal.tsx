"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import React from "react";

interface ReusableModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  maxWidth?:
    | "sm"
    | "md"
    | "lg"
    | "xl"
    | "2xl"
    | "3xl"
    | "4xl"
    | "5xl"
    | "6xl"
    | "7xl";
}

const maxWidthMap = {
  sm: "sm:max-w-[400px]",
  md: "sm:max-w-[500px]",
  lg: "sm:max-w-[600px]",
  xl: "sm:max-w-[700px]",
  "2xl": "sm:max-w-[800px]",
  "3xl": "sm:max-w-[900px]",
  "4xl": "sm:max-w-[1000px]",
  "5xl": "sm:max-w-[1100px]",
  "6xl": "sm:max-w-[1200px]",
  "7xl": "sm:max-w-[1300px]",
};

export const ReusableModal: React.FC<ReusableModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  className,
  maxWidth = "md",
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className={cn(
          maxWidthMap[maxWidth],
          "p-0 overflow-hidden bg-card border-none rounded-lg",
          className
        )}
      >
        {(title || description) && (
          <DialogHeader className="p-6 pb-0">
            {title && (
              <DialogTitle className="text-2xl font-black text-foreground tracking-tight">
                {title}
              </DialogTitle>
            )}
            {description && (
              <DialogDescription className="text-muted-foreground font-medium">
                {description}
              </DialogDescription>
            )}
          </DialogHeader>
        )}
        <div className="p-6">{children}</div>
      </DialogContent>
    </Dialog>
  );
};

export default ReusableModal;
