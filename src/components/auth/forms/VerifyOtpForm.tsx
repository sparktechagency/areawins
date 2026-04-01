"use client";

import { FormInput } from "@/components/form/FormInput";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import { closeAuthModal, setAuthView } from "@/lib/redux/features/authUiSlice";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { useVerifyOtpMutation } from "@/lib/redux/api/authApi";
import { verifyOtpSchema } from "@/lib/validators/authSchema";
import { getClientCookie } from "@/utils/cookieUtils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { AlertCircle, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type VerifyOtpValues = z.infer<typeof verifyOtpSchema>;

export default function VerifyOtpForm() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { email, otpReason } = useAppSelector((state) => state.authUi);
  const [verifyOtp, { isLoading }] = useVerifyOtpMutation();
  const [formMessage, setFormMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VerifyOtpValues>({
    resolver: zodResolver(verifyOtpSchema),
    defaultValues: {
      sessionId: getClientCookie("sessionId") || "",
      code: "",
    },
  });

  const onSubmit = async (data: VerifyOtpValues) => {
    setFormMessage(null);
    try {
      if (!data.sessionId) {
        const sid = getClientCookie("sessionId");
        if (sid) {
          data.sessionId = sid;
        } else {
          setFormMessage({
            type: "error",
            text: "Session expired. Please try again.",
          });
          return;
        }
      }

      const result = await verifyOtp(data).unwrap();
      if (result.success) {
        setFormMessage({
          type: "success",
          text: result.message || t("auth.emailVerifiedSuccess"),
        });
        toast.success(result.message || t("auth.emailVerifiedSuccess"));
        setTimeout(() => {
          if (result.data?.redirect === "/reset-password") {
            dispatch(setAuthView("RESET_PASSWORD"));
          } else {
            dispatch(closeAuthModal());
            if (result.data?.redirect) {
              router.push(result.data.redirect);
            }
          }
        }, 1500);
      } else {
        setFormMessage({
          type: "error",
          text: result.message || "OTP verification failed",
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
        <h2 className="text-2xl  text-foreground">{t("auth.verifyEmail")}</h2>
        <p className="text-sm text-muted-foreground">
          {otpReason === "REGISTER"
            ? `${t("auth.codeSentTo")} ${email}`
            : t("auth.enterVerificationCodeEmail")}
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
          id="code"
          type="text"
          label={t("auth.verificationCode")}
          placeholder={t("auth.enter6DigitCode")}
          error={errors.code?.message}
          {...register("code")}
          required
        />

        <Button
          type="submit"
          className="w-full font-bold cursor-pointer"
          disabled={isLoading}
        >
          {isLoading ? t("auth.verifying") : t("auth.verifyEmail")}
        </Button>
      </form>

      <div className="text-center text-sm text-muted-foreground">
        <button
          onClick={() => dispatch(setAuthView("LOGIN"))}
          className="text-primary font-bold hover:underline cursor-pointer"
        >
          {t("auth.backToLogin")}
        </button>
      </div>
    </div>
  );
}
