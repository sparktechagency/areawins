"use client";

import { FormInput } from "@/components/form/FormInput";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import { Link } from "@/lib/i18n/routing";
import { setAuthView } from "@/lib/redux/features/authUiSlice";
import { useAppDispatch } from "@/lib/redux/hooks";
import { useRegisterMutation } from "@/lib/redux/api/authApi";
import { registerSchema } from "@/lib/validators/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Lock, Mail, Phone, User } from "lucide-react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

type RegisterFormValues = z.infer<typeof registerSchema> & { terms: boolean };

export default function RegisterForm() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [registerUser, { isLoading }] = useRegisterMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      phoneNumber: "",
      referralCode: "",
      terms: false,
    },
  });

  const onSubmit = async (data: RegisterFormValues) => {
    if (!data.terms) {
      toast.error(t("auth.pleaseAgreeToTerms"));
      return;
    }

    try {
      const result = await registerUser(data).unwrap();
      if (result.success) {
        toast.success(result.message || t("auth.registrationSuccess"));
        dispatch(setAuthView("VERIFY_OTP"));
      } else {
        toast.error(result.message || "Registration failed");
      }
    } catch (error: unknown) {
      const err = error as { data?: { message?: string } };
      toast.error(err.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="p-6 space-y-6 max-h-[85vh] overflow-y-auto no-scrollbar">
      <div className="text-center space-y-2">
        <h2 className="text-2xl  text-foreground">{t("auth.createAccount")}</h2>
        <p className="text-sm text-muted-foreground">
          {t("auth.registerSubtitle")}
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormInput
          id="fullName"
          label={t("auth.fullName")}
          icon={User}
          placeholder={t("auth.fullNamePlaceholder")}
          error={errors.fullName?.message}
          {...register("fullName")}
        />

        <FormInput
          id="email"
          type="email"
          label={t("auth.emailAddress")}
          icon={Mail}
          placeholder={t("auth.emailPlaceholder")}
          error={errors.email?.message}
          {...register("email")}
        />
        <FormInput
          id="phoneNumber"
          type="tel"
          label={t("auth.phoneNumber")}
          icon={Phone}
          placeholder={t("auth.phonePlaceholder")}
          error={errors.phoneNumber?.message}
          {...register("phoneNumber")}
        />
        <FormInput
          id="referralCode"
          label={t("auth.referralCodeOptional")}
          icon={User}
          placeholder={t("auth.referralCodePlaceholder")}
          error={errors.referralCode?.message}
          {...register("referralCode")}
        />

        <FormInput
          id="password"
          type="password"
          label={t("auth.password")}
          icon={Lock}
          placeholder={t("auth.passwordMinPlaceholder")}
          error={errors.password?.message}
          {...register("password")}
        />

        <div className="flex items-start space-x-2">
          <Checkbox 
            id="terms" 
            className="mt-0.5 cursor-pointer" 
            {...register("terms")}
          />
          <div className="space-y-1 leading-none">
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {t("auth.agreeToThe")}{" "}
              <Link
                href="/terms"
                className="text-primary hover:underline underline-offset-4"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("auth.termsOfService")}
              </Link>{" "}
              {t("auth.and")}{" "}
              <Link
                href="/privacy"
                className="text-primary hover:underline underline-offset-4"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("auth.privacyPolicy")}
              </Link>
            </label>
            <p className="text-[0.8rem] text-muted-foreground">
              {t("auth.byCreatingAccountAgree")}
            </p>
          </div>
        </div>

        <Button
          type="submit"
          className="w-full font-bold cursor-pointer mt-2"
          disabled={isLoading}
        >
          {isLoading ? t("auth.sending") : t("auth.signUp")}
        </Button>
      </form>

      <div className="text-center text-sm text-muted-foreground">
        {t("auth.haveAccount")}{" "}
        <button
          onClick={() => dispatch(setAuthView("LOGIN"))}
          className="text-primary font-bold hover:underline cursor-pointer"
        >
          {t("auth.logIn")}
        </button>
      </div>
    </div>
  );
}
