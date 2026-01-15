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
import { motion } from "framer-motion";
import { X } from "lucide-react";
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
        showCloseButton={false}
        className={cn(
          maxWidthMap[maxWidth],
          "p-0 overflow-visible bg-transparent border-none shadow-none duration-0" // Transparent container
        )}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{
            duration: 0.3,
            type: "spring",
            stiffness: 300,
            damping: 25,
          }}
          className={cn(
            "bg-card border border-border w-full h-full rounded-xl overflow-hidden shadow-2xl relative flex flex-col",
            className
          )}
        >
          {/* Custom Close Button */}
          <div className="absolute right-4 top-4 z-50">
            <DialogClose className="rounded-full p-2 opacity-70 transition-all hover:opacity-100 border border-border cursor-pointer disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
              <X className="h-5 w-5" />
              <span className="sr-only">Close</span>
            </DialogClose>
          </div>

          {(title || description) && (
            <DialogHeader className="p-6 pb-2">
              {title && (
                <DialogTitle className="text-2xl font-bold text-foreground tracking-tight">
                  {title}
                </DialogTitle>
              )}
              {description && (
                <DialogDescription className="text-muted-foreground text-sm font-medium mt-1.5">
                  {description}
                </DialogDescription>
              )}
            </DialogHeader>
          )}
          <div className="p-2">{children}</div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

export default ReusableModal;
