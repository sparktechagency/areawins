"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
import { registerSchema } from "@/lib/validations/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Flag, Lock, Mail, User } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

export default function RegisterForm() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      country: "",
      email: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
  });

  const onSubmit = async (values: z.infer<typeof registerSchema>) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success(t("auth.successRegister"));
      // Move to OTP Verify
      dispatch(
        openAuthModal({
          view: "VERIFY_OTP",
          email: values.email,
          otpReason: "REGISTER",
        })
      );
    }, 1500);
  };

  return (
    <div className="p-6 space-y-6 max-h-[85vh] overflow-y-auto no-scrollbar">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-black text-foreground">
          {t("auth.createAccount")}
        </h2>
        <p className="text-sm text-muted-foreground">
          {t("auth.registerSubtitle")}
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  {t("auth.firstName")}
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <User className="absolute left-3 top-4 size-4 text-muted-foreground" />
                    <Input
                      placeholder="John"
                      className="pl-9 bg-muted/50 border-border"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  {t("auth.lastName")}
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <User className="absolute left-3 top-4 size-4 text-muted-foreground" />
                    <Input
                      placeholder="Doe"
                      className="pl-9 bg-muted/50 border-border"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  {t("auth.country")}
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Flag className="absolute left-3 top-4 size-4 text-muted-foreground" />
                    <Input
                      placeholder="Country"
                      className="pl-9 bg-muted/50 border-border"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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
                      placeholder="Create password"
                      className="pl-9 pr-9 bg-muted/50 border-border"
                      {...field}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-4 text-muted-foreground hover:text-foreground"
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
            name="terms"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border border-border cursor-pointer p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>{t("auth.terms")}</FormLabel>
                  <p className="text-[0.8rem] text-muted-foreground">
                    {t("auth.termsDesc")}
                  </p>
                </div>
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full font-bold"
            disabled={isLoading}
          >
            {isLoading ? t("auth.sending") : t("auth.signUp")}
          </Button>
        </form>
      </Form>

      <div className="text-center text-sm text-muted-foreground">
        {t("auth.haveAccount")}{" "}
        <button
          onClick={() => dispatch(setAuthView("LOGIN"))}
          className="text-primary font-bold hover:underline"
        >
          {t("auth.logIn")}
        </button>
      </div>
    </div>
  );
}
