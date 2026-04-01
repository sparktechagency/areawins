"use client";
import { FormInput } from "@/components/form/FormInput";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import { closeAuthModal, setAuthView } from "@/lib/redux/features/authUiSlice";
import { useAppDispatch } from "@/lib/redux/hooks";
import { useLoginMutation } from "@/lib/redux/api/authApi";
import { loginSchema } from "@/lib/validators/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Lock, Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";
import { useRouter } from "next/navigation";

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [login, { isLoading }] = useLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const result = await login(data).unwrap();
      if (result.success) {
        toast.success(result.message || t("auth.loginSuccess"));
        dispatch(closeAuthModal());
        if (result.data?.redirect) {
          router.push(result.data.redirect);
        }
      } else {
        toast.error(result.message || "Failed to login");
      }
    } catch (error: unknown) {
      const err = error as { data?: { message?: string } };
      toast.error(err.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="w-full p-6 space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl  text-foreground">{t("auth.welcomeBack")}</h2>
        <p className="text-sm text-muted-foreground">
          {t("auth.loginSubtitle")}
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormInput
          id="email"
          label={t("auth.emailAddress")}
          icon={Mail}
          placeholder={t("auth.enterYourEmail")}
          error={errors.email?.message}
          {...register("email")}
        />
        <FormInput
          id="password"
          type="password"
          label={t("auth.password")}
          icon={Lock}
          placeholder={t("auth.enterYourPassword")}
          error={errors.password?.message}
          {...register("password")}
        />

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Checkbox
              id="rememberMe"
              className="mr-2 cursor-pointer"
              {...register("rememberMe")}
            />
            <label htmlFor="rememberMe" className="text-sm text-muted-foreground">
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
          disabled={isLoading}
        >
          {isLoading ? t("auth.sending") : t("auth.logIn")}
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
