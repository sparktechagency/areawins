"use client";
import { FormInput } from "@/components/form/FormInput";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import { setAuthView } from "@/lib/redux/features/authUiSlice";
import { useAppDispatch } from "@/lib/redux/hooks";
import { AuthActionState, forgotPassword } from "@/services/auth.service";
import { ArrowLeft, Mail } from "lucide-react";
import { useActionState, useEffect } from "react";
import toast from "react-hot-toast";

const initialState: AuthActionState = {
  success: false,
  message: "",
  errors: undefined,
  inputs: {
    email: "",
  },
  timestamp: 0,
};

export default function ForgotPasswordForm() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [state, formAction, isPending] = useActionState(
    forgotPassword,
    initialState,
  );

  useEffect(() => {
    if (state?.success) {
      toast.success(state?.message || t("auth.resetLinkSent"));
      dispatch(setAuthView("VERIFY_OTP"));
    } else if (state.message && !state.errors) {
      toast.error(state.message);
    }
  }, [state, dispatch, t]);

  
  return (
    <div className="p-6 space-y-6 max-h-[85vh] overflow-y-auto no-scrollbar">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-black text-foreground">
          {t("auth.forgotPassword")}
        </h2>
        <p className="text-sm text-muted-foreground">
          {t("auth.forgotPasswordSubtitle")}
        </p>
      </div>

      <form action={formAction} className="space-y-4">
        <FormInput
          id="email"
          name="email"
          type="email"
          label={t("auth.emailAddress")}
          icon={Mail}
          defaultValue={state?.inputs?.email ?? undefined}
          placeholder={t("auth.enterYourEmail")}
          error={state?.errors?.email}
          required
        />

        <Button
          type="submit"
          className="w-full font-bold cursor-pointer"
          disabled={isPending}
        >
          {isPending ? t("auth.sending") : t("auth.sendResetCode")}
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
