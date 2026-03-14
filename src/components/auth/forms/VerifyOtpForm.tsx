"use client";

import { FormInput } from "@/components/form/FormInput";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import {
  closeAuthModal,
  setAuthView,
} from "@/lib/redux/features/authUiSlice";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { verifyOtp } from "@/services/auth.service";
import { useActionState, useEffect } from "react";
import toast from "react-hot-toast";

const initialState = {
  success: false,
  message: "",
  errors: undefined,
  inputs: {
    sessionId: "",
    code: "",
  },
  timestamp: 0,
};

export default function VerifyOtpForm() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { email, otpReason } = useAppSelector((state) => state.authUi);
  const [state, formAction, isPending] = useActionState(verifyOtp, initialState);

  useEffect(() => {
    if (state?.success) {
      toast.success(state?.message || "Email verified successfully!");
      dispatch(closeAuthModal());
    } else if (state.message && !state.errors) {
      toast.error(state.message);
    }
  }, [state, dispatch]);

  return (
    <div className="p-6 space-y-6 max-h-[85vh] overflow-y-auto no-scrollbar">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-black text-foreground">
          {t("auth.verifyEmail")}
        </h2>
        <p className="text-sm text-muted-foreground">
          {otpReason === "REGISTER" 
            ? `We've sent a verification code to ${email}`
            : "Enter the verification code sent to your email"
          }
        </p>
      </div>

      <form action={formAction} className="space-y-4">
        <FormInput
          id="code"
          name="code"
          type="text"
          label="Verification Code"
          defaultValue={state?.inputs?.code || ""}
          placeholder="Enter 6-digit code"
          error={state?.errors?.code}
          required
        />

        <Button type="submit" className="w-full font-bold" disabled={isPending}>
          {isPending ? t("auth.verifying") : t("auth.verifyEmail")}
        </Button>
      </form>

      <div className="text-center text-sm text-muted-foreground">
        <button
          onClick={() => dispatch(setAuthView("LOGIN"))}
          className="text-primary font-bold hover:underline"
        >
          {t("auth.backToLogin")}
        </button>
      </div>
    </div>
  );
}
