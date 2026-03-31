"use client";
import { FormInput } from "@/components/form/FormInput";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import { closeAuthModal, setAuthView } from "@/lib/redux/features/authUiSlice";
import { useAppDispatch } from "@/lib/redux/hooks";
import { AuthActionState, loginUser } from "@/services/auth.service";
import { Lock, Mail } from "lucide-react";
import { useActionState, useEffect } from "react";
import toast from "react-hot-toast";

const initialState: AuthActionState = {
  success: false,
  message: "",
  errors: undefined,
  inputs: {
    email: "",
    password: "",
  },
  timestamp: 0,
};
export default function LoginForm() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [state, formAction, isPending] = useActionState(
    loginUser,
    initialState,
  );

  useEffect(() => {
    if (state?.success) {
      toast.success(state?.message || t("auth.loginSuccess"));
      dispatch(closeAuthModal());
    } else if (state.message && !state.errors) {
      toast.error(state.message);
    }
  }, [dispatch, state, t]);

  return (
    <div className="w-full p-6 space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl  text-foreground">{t("auth.welcomeBack")}</h2>
        <p className="text-sm text-muted-foreground">
          {t("auth.loginSubtitle")}
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
        <FormInput
          id="password"
          name="password"
          type="password"
          label={t("auth.password")}
          icon={Lock}
          defaultValue={state?.inputs?.password ?? undefined}
          placeholder={t("auth.enterYourPassword")}
          error={state?.errors?.password}
          required
        />

        <div className="flex items-center justify-between">
          {/* Remember Me */}
          <div className="flex items-center gap-1">
            <Checkbox
              id="remember"
              name="remember"
              className="mr-2 cursor-pointer"
            />
            <label htmlFor="remember" className="text-sm text-muted-foreground">
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
          disabled={isPending}
        >
          {isPending ? t("auth.sending") : t("auth.logIn")}
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
