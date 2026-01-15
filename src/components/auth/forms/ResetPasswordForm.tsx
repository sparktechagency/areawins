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
import { openAuthModal, setAuthView } from "@/lib/redux/features/authUiSlice";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { resetPasswordSchema } from "@/lib/validations/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Eye, EyeOff, Lock } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

export default function ResetPasswordForm() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { email, otp } = useAppSelector((state) => state.authUi);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof resetPasswordSchema>) => {
    if (!email || !otp) {
      toast.error("Session expired. Please start over.");
      dispatch(setAuthView("FORGOT_PASSWORD"));
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success(t("auth.resetSuccess"));
      dispatch(openAuthModal({ view: "LOGIN" }));
    }, 1500);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="space-y-2">
        <button
          onClick={() => dispatch(setAuthView("VERIFY_OTP"))}
          className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground hover:text-foreground mb-4"
        >
          <ArrowLeft className="size-4" /> {t("auth.backToOtp")}
        </button>
        <h2 className="text-2xl font-black text-foreground">
          {t("auth.setNewPassword")}
        </h2>
        <p className="text-sm text-muted-foreground">
          {t("auth.createStrongPwd")}
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  {t("auth.password")}
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Lock className="absolute left-3 top-4 size-4 text-muted-foreground" />
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="New password"
                      className="pl-9 pr-9 bg-muted/50 border-border"
                      {...field}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-2.5 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? (
                        <EyeOff className="size-4" />
                      ) : (
                        <Eye className="size-4" />
                      )}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  {t("auth.confirmPassword")}
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Lock className="absolute left-3 top-4 size-4 text-muted-foreground" />
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Confirm new password"
                      className="pl-9 bg-muted/50 border-border"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full font-bold"
            disabled={isLoading}
          >
            {isLoading ? t("auth.sending") : t("auth.resetPassword")}
          </Button>
        </form>
      </Form>
    </div>
  );
}
