/**
 * Toast hook
 * Wrapper around react-hot-toast for consistent toast notifications
 */

"use client";

import toast from "react-hot-toast";

export function useToast() {
  return {
    success: (message: string) => {
      toast.success(message, {
        duration: 3000,
        position: "top-right",
        style: {
          background: "#00D65C",
          color: "#fff",
        },
      });
    },
    error: (message: string) => {
      toast.error(message, {
        duration: 4000,
        position: "top-right",
        style: {
          background: "#FF3B3B",
          color: "#fff",
        },
      });
    },
    loading: (message: string) => {
      return toast.loading(message, {
        position: "top-right",
      });
    },
    dismiss: (toastId?: string) => {
      toast.dismiss(toastId);
    },
  };
}
