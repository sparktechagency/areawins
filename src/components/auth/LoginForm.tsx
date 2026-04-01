"use client";
import { FormInput } from "@/components/form/FormInput";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useTranslation } from "@/i18n/LanguageContext";
import { cn } from "@/lib/utils";
import { useLoginMutation } from "@/redux/api/authApi";
import { closeAuthModal, setAuthView } from "@/redux/features/authUiSlice";
import { useAppDispatch } from "@/redux/hooks";
import { loginSchema } from "@/validation/auth.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, CheckCircle, Lock, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [login, { isLoading }] = useLoginMutation();
  const [formMessage, setFormMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setFormMessage(null);
    try {
      const result = await login(data).unwrap();
      if (result.success) {
        setFormMessage({
          type: "success",
          text: result.message || t("auth.loginSuccess"),
        });
        setTimeout(() => {
          dispatch(closeAuthModal());
          if (result.data?.redirect) {
            router.push(result.data.redirect);
          }
        }, 1500);
      } else {
        setFormMessage({
          type: "error",
          text: result.message || "Failed to login",
        });
      }
    } catch (error: unknown) {
      const err = error as { data?: { message?: string } };
      setFormMessage({
        type: "error",
        text: err.data?.message || "Something went wrong",
      });
    }
  };

  return (
    <div className="w-full p-6 space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl  text-foreground font-semibold">
          {t("auth.welcomeBack")}
        </h2>
        <p className="text-sm text-muted-foreground font-medium">
          {t("auth.loginSubtitle")}
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {formMessage && (
          <div
            className={cn(
              "p-3 rounded-md flex items-center gap-2 text-sm font-medium animate-in fade-in slide-in-from-top-1",
              formMessage.type === "success"
                ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"
                : "bg-destructive/10 text-destructive border border-destructive/20",
            )}
          >
            {formMessage.type === "success" ? (
              <CheckCircle className="size-4 shrink-0" />
            ) : (
              <AlertCircle className="size-4 shrink-0" />
            )}
            {formMessage.text}
          </div>
        )}

        <FormInput
          id="email"
          label={t("auth.emailAddress")}
          icon={Mail}
          placeholder={t("auth.enterYourEmail")}
          error={errors.email?.message}
          {...register("email")}
          required
        />
        <FormInput
          id="password"
          type="password"
          label={t("auth.password")}
          icon={Lock}
          placeholder={t("auth.enterYourPassword")}
          error={errors.password?.message}
          {...register("password")}
          required
        />

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Checkbox
              id="rememberMe"
              className="mr-2 cursor-pointer"
              {...register("rememberMe")}
            />
            <label
              htmlFor="rememberMe"
              className="text-sm text-muted-foreground cursor-pointer"
            >
              {t("auth.rememberMe")}
            </label>
          </div>
          <button
            type="button"
            onClick={() => dispatch(setAuthView("FORGOT_PASSWORD"))}
            className="text-xs text-primary font-bold hover:underline cursor-pointer"
          >
            {t("auth.forgotPassword")}
          </button>
        </div>

        <Button
          type="submit"
          className="w-full font-bold cursor-pointer"
          disabled={isLoading}
        >
          {isLoading ? t("auth.sending") : t("auth.logIn")}
        </Button>
      </form>

      <div className="text-center text-sm text-muted-foreground">
        {t("auth.noAccount")}{" "}
        <button
          onClick={() => dispatch(setAuthView("REGISTER"))}
          className="text-primary font-bold hover:underline cursor-pointer"
        >
          {t("auth.signUp")}
        </button>
      </div>
    </div>
  );
}
