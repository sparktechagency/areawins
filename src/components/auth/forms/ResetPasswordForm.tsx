"use client";

import { FormInput } from "@/components/form/FormInput";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import { setAuthView } from "@/lib/redux/features/authUiSlice";
import { useAppDispatch } from "@/lib/redux/hooks";
import { useResetPasswordMutation } from "@/lib/redux/api/authApi";
import { resetPasswordSchema } from "@/lib/validators/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { getClientCookie } from "@/utils/cookieUtils";
import { ArrowLeft, Lock, AlertCircle, CheckCircle } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";
import { cn } from "@/lib/utils";

type ResetPasswordValues = z.infer<typeof resetPasswordSchema>;

export default function ResetPasswordForm() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const [formMessage, setFormMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: ResetPasswordValues) => {
    setFormMessage(null);
    const resetToken = getClientCookie("resetPasswordToken");

    if (!resetToken) {
      setFormMessage({
        type: "error",
        text: "Reset token expired or missing. Please try again.",
      });
      return;
    }

    try {
      const result = await resetPassword({
        ...data,
        resetPasswordToken: resetToken,
      }).unwrap();
      if (result.success) {
        setFormMessage({
          type: "success",
          text: result.message || t("auth.passwordResetSuccess"),
        });
        toast.success(result.message || t("auth.passwordResetSuccess"));
        setTimeout(() => {
          dispatch(setAuthView("LOGIN"));
        }, 1500);
      } else {
        setFormMessage({
          type: "error",
          text: result.message || "Failed to reset password",
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
    <div className="p-6 space-y-6 max-h-[85vh] overflow-y-auto no-scrollbar">
      <div className="text-center space-y-2">
        <h2 className="text-2xl  text-foreground">{t("auth.resetPassword")}</h2>
        <p className="text-sm text-muted-foreground">
          {t("auth.createStrongPwd")}
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
          id="password"
          type="password"
          label={t("auth.newPassword")}
          icon={Lock}
          placeholder={t("auth.enterNewPassword")}
          error={errors.password?.message}
          {...register("password")}
          required
        />
        <FormInput
          id="confirmPassword"
          type="password"
          label={t("auth.confirmPassword")}
          icon={Lock}
          placeholder={t("auth.confirmNewPassword")}
          error={errors.confirmPassword?.message}
          {...register("confirmPassword")}
          required
        />

        <Button
          type="submit"
          className="w-full font-bold cursor-pointer"
          disabled={isLoading}
        >
          {isLoading ? t("auth.sending") : t("auth.resetPassword")}
        </Button>
      </form>

      <div className="text-center">
        <button
          onClick={() => dispatch(setAuthView("LOGIN"))}
          className="text-muted-foreground hover:text-foreground flex items-center gap-2 text-sm cursor-pointer font-medium"
        >
          <ArrowLeft className="size-4" />
          {t("auth.backToLogin")}
        </button>
      </div>
    </div>
  );
}
