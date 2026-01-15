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
import { useAppDispatch } from "@/lib/redux/hooks";
import { forgotPasswordSchema } from "@/lib/validations/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Mail } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

export default function ForgotPasswordForm() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof forgotPasswordSchema>) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success("OTP sent to your email");
      dispatch(
        openAuthModal({
          view: "VERIFY_OTP",
          email: values.email,
          otpReason: "FORGOT_PASSWORD",
        })
      );
    }, 1500);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="space-y-2">
        <button
          onClick={() => dispatch(setAuthView("LOGIN"))}
          className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground hover:text-foreground mb-4"
        >
          <ArrowLeft className="size-4" /> {t("auth.backToLogin")}
        </button>
        <h2 className="text-2xl font-black text-foreground">
          {t("auth.resetPassword")}
        </h2>
        <p className="text-sm text-muted-foreground">
          {t("auth.createStrongPwd")}
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  {t("auth.email")}
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Mail className="absolute left-3 top-4 size-4 text-muted-foreground" />
                    <Input
                      placeholder="name@example.com"
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
            {isLoading ? t("auth.sending") : t("auth.sendResetCode")}
          </Button>
        </form>
      </Form>
    </div>
  );
}
