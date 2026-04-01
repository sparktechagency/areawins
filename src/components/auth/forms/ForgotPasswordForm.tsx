"use client";
import { FormInput } from "@/components/form/FormInput";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import { setAuthView } from "@/lib/redux/features/authUiSlice";
import { useAppDispatch } from "@/lib/redux/hooks";
import { useForgotPasswordMutation } from "@/lib/redux/api/authApi";
import { forgotPasswordSchema } from "@/lib/validators/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";
type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordForm() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: ForgotPasswordValues) => {
    try {
      const result = await forgotPassword(data).unwrap();
      if (result.success) {
        toast.success(result.message || t("auth.resetLinkSent"));
        dispatch(setAuthView("VERIFY_OTP"));
      } else {
        toast.error(result.message || "Failed to send reset code");
      }
    } catch (error: unknown) {
      const err = error as { data?: { message?: string } };
      toast.error(err.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="p-6 space-y-6 max-h-[85vh] overflow-y-auto no-scrollbar">
      <div className="text-center space-y-2">
        <h2 className="text-2xl  text-foreground">
          {t("auth.forgotPassword")}
        </h2>
        <p className="text-sm text-muted-foreground">
          {t("auth.forgotPasswordSubtitle")}
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormInput
          id="email"
          type="email"
          label={t("auth.emailAddress")}
          icon={Mail}
          placeholder={t("auth.enterYourEmail")}
          error={errors.email?.message}
          {...register("email")}
        />

        <Button
          type="submit"
          className="w-full font-bold cursor-pointer"
          disabled={isLoading}
        >
          {isLoading ? t("auth.sending") : t("auth.sendResetCode")}
        </Button>
      </form>

      <div className="text-center flex items-center justify-center">
        <button
          onClick={() => dispatch(setAuthView("LOGIN"))}
          className="text-muted-foreground hover:text-foreground flex items-center gap-2 text-sm cursor-pointer"
        >
          <ArrowLeft className="size-4" />
          {t("auth.backToLogin")}
        </button>
      </div>
    </div>
  );
}
