"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import { setUser } from "@/lib/redux/features/authSlice";
import {
  closeAuthModal,
  setAuthOtp,
  setAuthView,
} from "@/lib/redux/features/authUiSlice";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { verifyOtpSchema } from "@/lib/validations/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

export default function VerifyOtpForm() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { email, otpReason } = useAppSelector((state) => state.authUi);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);

  const form = useForm<z.infer<typeof verifyOtpSchema>>({
    resolver: zodResolver(verifyOtpSchema),
    defaultValues: {
      otp: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof verifyOtpSchema>) => {
    if (!email) {
      toast.error("Email missing. Please restart.");
      return;
    }

    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);

      if (otpReason === "REGISTER") {
        toast.success(t("auth.successVerify"));
        // Mock Auto Login
        const mockUser = {
          id: "u123",
          email: email,
          firstName: "John",
          lastName: "Doe",
          username: "johndoe",
          role: "user",
        };
        dispatch(setUser(mockUser));
        dispatch(closeAuthModal());
      } else if (otpReason === "FORGOT_PASSWORD") {
        dispatch(setAuthOtp(values.otp));
        dispatch(setAuthView("RESET_PASSWORD"));
      } else {
        toast.success(t("auth.successVerify"));
        dispatch(closeAuthModal());
      }
    }, 1500);
  };

  const handleResend = async () => {
    if (!email) return;
    setIsResending(true);
    setTimeout(() => {
      setIsResending(false);
      toast.success("Code resent!");
    }, 1000);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="space-y-2">
        <button
          onClick={() =>
            dispatch(
              setAuthView(
                otpReason === "REGISTER" ? "REGISTER" : "FORGOT_PASSWORD"
              )
            )
          }
          className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground hover:text-foreground mb-4"
        >
          <ArrowLeft className="size-4" /> {t("auth.backToOtp")}
        </button>
        <h2 className="text-2xl font-black text-foreground">
          {t("auth.verifyEmail")}
        </h2>
        <p className="text-sm text-muted-foreground">
          {t("auth.enterCode")}{" "}
          <span className="text-foreground font-bold">{email}</span>
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="otp"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  {t("auth.otpCode")}
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="123456"
                    className="pl-4 bg-muted/50 border-border text-center tracking-[1em] font-bold text-lg"
                    maxLength={6}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full font-bold"
            disabled={isVerifying}
          >
            {isVerifying ? t("auth.verifying") : t("auth.verifyCode")}
          </Button>
        </form>
      </Form>

      <div className="text-center text-sm text-muted-foreground">
        {t("auth.didntReceive")}{" "}
        <button
          onClick={handleResend}
          disabled={isResending}
          className="text-primary font-bold hover:underline disabled:opacity-50"
        >
          {t("auth.resendCode")}
        </button>
      </div>
    </div>
  );
}
