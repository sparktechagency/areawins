"use client";

import { FormInput } from "@/components/form/FormInput";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import { setAuthView } from "@/lib/redux/features/authUiSlice";
import { useAppDispatch } from "@/lib/redux/hooks";
import { AuthActionState, register } from "@/services/auth.service";
import { Lock, Mail, Phone, User } from "lucide-react";
import { useActionState, useEffect } from "react";
import toast from "react-hot-toast";

const initialState: AuthActionState = {
  success: false,
  message: "",
  errors: undefined,
  inputs: {
    fullName: "",
    email: "",
    password: "",
    phoneNumber: "",
    referralCode: "",
    terms: false,
  },
  timestamp: 0,
};

export default function RegisterForm() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [state, formAction, isPending] = useActionState(register, initialState);

  useEffect(() => {
    if (state?.success) {
      toast.success(state?.message || "Registration successful!");
      dispatch(setAuthView("VERIFY_OTP"));
    } else if (state?.message && !state?.success) {
      toast.error(state?.message);
    }
  }, [state, dispatch]);

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

      <form action={formAction} className="space-y-4">
        <FormInput
          id="fullName"
          name="fullName"
          type="text"
          label="Full Name"
          icon={User}
          defaultValue={state?.inputs?.fullName || ""}
          placeholder="John Doe"
          error={state?.errors?.fullName}
          required
        />

        <FormInput
          id="email"
          name="email"
          type="email"
          label="Email Address"
          icon={Mail}
          defaultValue={state?.inputs?.email || ""}
          placeholder="john@example.com"
          error={state?.errors?.email}
          required
        />
        <FormInput
          id="phoneNumber"
          name="phoneNumber"
          type="tel"
          label="Phone Number"
          icon={Phone}
          defaultValue={state?.inputs?.phoneNumber || ""}
          placeholder="+1234567890"
          error={state?.errors?.phoneNumber}
          required
        />
        <FormInput
          id="referralCode"
          name="referralCode"
          type="text"
          label="Referral Code (Optional)"
          icon={User}
          defaultValue={state?.inputs?.referralCode || ""}
          placeholder="YRSVUQYN"
          error={state?.errors?.referralCode}
        />

        <FormInput
          id="password"
          name="password"
          type="password"
          label="Password"
          icon={Lock}
          defaultValue={state?.inputs?.password || ""}
          placeholder="Min. 6 characters"
          error={state?.errors?.password}
          required
        />

        <div className="flex items-start space-x-2">
          <Checkbox id="terms" className="mt-0.5" />
          <div className="space-y-1 leading-none">
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              I agree to the{" "}
              <a
                href="/terms"
                className="text-primary hover:underline underline-offset-4"
                target="_blank"
                rel="noopener noreferrer"
              >
                Terms of Service
              </a>{" "}
              and{" "}
              <a
                href="/privacy"
                className="text-primary hover:underline underline-offset-4"
                target="_blank"
                rel="noopener noreferrer"
              >
                Privacy Policy
              </a>
            </label>
            <p className="text-[0.8rem] text-muted-foreground">
              By creating an account, you agree to our terms and privacy policy
            </p>
          </div>
        </div>

        <Button type="submit" className="w-full font-bold" disabled={isPending}>
          {isPending ? t("auth.sending") : t("auth.signUp")}
        </Button>
      </form>

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
