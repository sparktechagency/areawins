"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import React from "react";

interface ReusableModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  padding?: "none" | "sm" | "md" | "lg";
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
  sm: "max-w-[400px]",
  md: "max-w-[500px]",
  lg: "max-w-[600px]",
  xl: "max-w-[700px]",
  "2xl": "max-w-[800px]",
  "3xl": "max-w-[900px]",
  "4xl": "max-w-[1000px]",
  "5xl": "max-w-[1100px]",
  "6xl": "max-w-[1200px]",
  "7xl": "max-w-[1300px]",
};

const paddingMap = {
  none: "p-0",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

export const ReusableModal: React.FC<ReusableModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  className,
  padding = "md",
  maxWidth = "md",
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        showCloseButton={false}
        className={cn(
          "px-4 sm:px-0", // Side margin on mobile
          "fixed left-[50%] top-[50%] z-50 w-full translate-x-[-50%] translate-y-[-50%] transition-none",
          "bg-transparent border-none shadow-none duration-0 flex justify-center items-center",
          maxWidthMap[maxWidth]
        )}
      >
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{
                duration: 0.3,
                type: "spring",
                stiffness: 300,
                damping: 30,
              }}
              className={cn(
                "bg-card border border-border w-full rounded-2xl overflow-hidden shadow-2xl relative flex flex-col",
                "max-h-[80vh]", // Responsive max height
                className
              )}
            >
              {/* Custom Close Button - Optimized for touch */}
              <div className="absolute right-3 top-3 sm:right-4 sm:top-4 z-60">
                <DialogClose className="rounded-full p-2.5 sm:p-2 bg-background/50 backdrop-blur-sm opacity-70 transition-all hover:opacity-100 border border-border cursor-pointer active:scale-90">
                  <X className="h-5 w-5" />
                  <span className="sr-only">Close</span>
                </DialogClose>
              </div>

              <div className="flex flex-col h-full overflow-hidden">
                <DialogHeader
                  className={cn(
                    "text-left shrink-0",
                    title || description
                      ? "px-5 py-5 sm:px-8 sm:py-6 sm:pb-2"
                      : "sr-only"
                  )}
                >
                  <DialogTitle
                    className={cn(
                      "text-xl sm:text-2xl font-black text-foreground tracking-tight pr-8",
                      !title && "sr-only"
                    )}
                  >
                    {title || "Modal Title"}
                  </DialogTitle>
                  <DialogDescription
                    className={cn(
                      "text-muted-foreground text-xs sm:text-sm font-medium mt-1",
                      !description && "sr-only"
                    )}
                  >
                    {description || "Modal Description"}
                  </DialogDescription>
                </DialogHeader>

                <div
                  className={cn(
                    "flex-1 overflow-y-auto custom-scrollbar no-scrollbar",
                    paddingMap[padding]
                  )}
                >
                  {children}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};

export default ReusableModal;
