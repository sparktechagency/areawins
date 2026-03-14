"use client";

import { FormInput } from "@/components/form/FormInput";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import { setAuthView } from "@/lib/redux/features/authUiSlice";
import { useAppDispatch } from "@/lib/redux/hooks";
import { AuthActionState, register } from "@/services/auth.service";
import { Flag, Lock, Mail, User } from "lucide-react";
import { useActionState, useEffect, useState } from "react";
import toast from "react-hot-toast";

const initialState: AuthActionState = {
  success: false,
  message: "",
  errors: undefined,
  inputs: {
    firstName: "",
    lastName: "",
    country: "",
    email: "",
    password: "",
    confirmPassword: "",
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
          id="firstName"
          name="firstName"
          type="text"
          label="First Name"
          icon={User}
          defaultValue={state?.inputs?.firstName ?? undefined}
          placeholder="Enter your first name"
          error={state?.errors?.firstName}
          required
        />
        <FormInput
          id="lastName"
          name="lastName"
          type="text"
          label="Last Name"
          icon={User}
          defaultValue={state?.inputs?.lastName ?? undefined}
          placeholder="Enter your last name"
          error={state?.errors?.lastName}
          required
        />
        <FormInput
          id="country"
          name="country"
          type="text"
          label="Country"
          icon={Flag}
          defaultValue={state?.inputs?.country ?? undefined}
          placeholder="Enter your country"
          error={state?.errors?.country}
          required
        />
        <FormInput
          id="email"
          name="email"
          type="email"
          label="Email Address"
          icon={Mail}
          defaultValue={state?.inputs?.email ?? undefined}
          placeholder="Enter your email"
          error={state?.errors?.email}
          required
        />
        <FormInput
          id="password"
          name="password"
          type="password"
          label="Password"
          icon={Lock}
          defaultValue={state?.inputs?.password ?? undefined}
          placeholder="Create password"
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
          placeholder="Confirm your password"
          error={state?.errors?.confirmPassword}
          required
        />

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="terms"
            name="terms"
            defaultChecked={state?.inputs?.terms ?? false}
            className="h-4 w-4 rounded border-border cursor-pointer"
          />
          <div className="space-y-1 leading-none">
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {t("auth.terms")}
            </label>
            <p className="text-[0.8rem] text-muted-foreground">
              {t("auth.termsDesc")}
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
