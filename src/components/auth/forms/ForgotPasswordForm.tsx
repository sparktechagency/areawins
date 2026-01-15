"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForgotPasswordMutation } from "@/lib/redux/api/authApi";
import { openAuthModal, setAuthView } from "@/lib/redux/features/authUiSlice";
import { useAppDispatch } from "@/lib/redux/hooks";
import { ArrowLeft, Mail } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function ForgotPasswordForm() {
  const dispatch = useAppDispatch();
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await forgotPassword({ email }).unwrap();
      toast.success("OTP sent to your email");
      // Redirect to Verify OTP
      dispatch(openAuthModal({ view: "VERIFY_OTP", email }));
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to send OTP");
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="space-y-2">
        <button
          onClick={() => dispatch(setAuthView("LOGIN"))}
          className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground hover:text-foreground mb-4"
        >
          <ArrowLeft className="size-4" /> Back to Login
        </button>
        <h2 className="text-2xl font-black text-foreground">Reset Password</h2>
        <p className="text-sm text-muted-foreground">
          Enter your email to receive a reset code
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Email
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-2.5 size-4 text-muted-foreground" />
            <Input
              type="email"
              placeholder="name@example.com"
              className="pl-9 bg-muted/50 border-border"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>

        <Button type="submit" className="w-full font-bold" disabled={isLoading}>
          {isLoading ? "Sending..." : "Send Reset Code"}
        </Button>
      </form>
    </div>
  );
}
