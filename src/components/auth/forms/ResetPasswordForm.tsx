"use client";
import { FormInput } from "@/components/form/FormInput";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import { setAuthView } from "@/lib/redux/features/authUiSlice";
import { useAppDispatch } from "@/lib/redux/hooks";
import { AuthActionState, resetPassword } from "@/services/auth.service";
import { ArrowLeft, Lock } from "lucide-react";
import { useActionState, useEffect, useState } from "react";
import toast from "react-hot-toast";

const initialState: AuthActionState = {
  success: false,
  message: "",
  errors: undefined,
  inputs: {
    password: "",
    confirmPassword: "",
  },
  timestamp: 0,
};

export default function ResetPasswordForm() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [state, formAction, isPending] = useActionState(
    resetPassword,
    initialState,
  );

  useEffect(() => {
    if (state?.success) {
      toast.success(state?.message || "Password reset successful!");
      dispatch(setAuthView("LOGIN"));
    } else if (state.message && !state.errors) {
      toast.error(state.message);
    }
  }, [state, dispatch]);
  return (
    <div className="p-6 space-y-6 max-h-[85vh] overflow-y-auto no-scrollbar">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-black text-foreground">
          {t("auth.resetPassword")}
        </h2>
        <p className="text-sm text-muted-foreground">
          {t("auth.createStrongPwd")}
        </p>
      </div>

      <form action={formAction} className="space-y-4">
        <FormInput
          id="password"
          name="password"
          type="password"
          label="New Password"
          icon={Lock}
          defaultValue={state?.inputs?.password ?? undefined}
          placeholder="Enter new password"
          error={state?.errors?.password}
          required
        />
        <FormInput
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          label="Confirm Password"
          icon={Lock}
          defaultValue={state?.inputs?.confirmPassword ?? undefined}
          placeholder="Confirm new password"
          error={state?.errors?.confirmPassword}
          required
        />

        <Button type="submit" className="w-full font-bold" disabled={isPending}>
          {isPending ? t("auth.sending") : t("auth.resetPassword")}
        </Button>
      </form>

      <div className="text-center">
        <button
          onClick={() => dispatch(setAuthView("LOGIN"))}
          className="text-muted-foreground hover:text-foreground flex items-center gap-2 text-sm"
        >
          <ArrowLeft className="size-4" />
          {t("auth.backToLogin")}
        </button>
      </div>
    </div>
  );
}
