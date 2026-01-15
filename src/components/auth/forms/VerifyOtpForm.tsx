"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  useResendVerificationEmailMutation,
  useVerifyEmailMutation,
} from "@/lib/redux/api/authApi";
import {
  closeAuthModal,
  openAuthModal,
  setAuthOtp,
  setAuthView,
} from "@/lib/redux/features/authUiSlice";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { verifyOtpSchema } from "@/lib/validations/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

export default function VerifyOtpForm() {
  const dispatch = useAppDispatch();
  const { email, otpReason } = useAppSelector((state) => state.authUi);
  const [verifyEmail, { isLoading: isVerifying }] = useVerifyEmailMutation();
  const [resendEmail, { isLoading: isResending }] =
    useResendVerificationEmailMutation();

  const form = useForm<z.infer<typeof verifyOtpSchema>>({
    resolver: zodResolver(verifyOtpSchema),
    defaultValues: {
      otp: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof verifyOtpSchema>) => {
    if (!email) {
      toast.error("Email missing. Please restart.");
      return;
    }

    if (otpReason === "REGISTER") {
      try {
        // API expects 'code' usually for OTP
        await verifyEmail({ email, code: values.otp }).unwrap();
        toast.success("Email verified! You can now log in.");
        dispatch(openAuthModal({ view: "LOGIN" }));
      } catch (err: any) {
        toast.error(err?.data?.message || "Verification failed");
      }
    } else if (otpReason === "FORGOT_PASSWORD") {
      dispatch(setAuthOtp(values.otp));
      dispatch(setAuthView("RESET_PASSWORD"));
    } else {
      try {
        await verifyEmail({ email, code: values.otp }).unwrap();
        toast.success("Verified!");
        dispatch(closeAuthModal());
      } catch (err: any) {
        toast.error(err?.data?.message || "Verification failed");
      }
    }
  };

  const handleResend = async () => {
    if (!email) return;
    try {
      await resendEmail({ email }).unwrap();
      toast.success("Code resent!");
    } catch (err: any) {
      toast.error("Failed to resend code");
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="space-y-2">
        <button
          onClick={() =>
            dispatch(
              setAuthView(
                otpReason === "REGISTER" ? "REGISTER" : "FORGOT_PASSWORD"
              )
            )
          }
          className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground hover:text-foreground mb-4"
        >
          <ArrowLeft className="size-4" /> Back
        </button>
        <h2 className="text-2xl font-black text-foreground">Verify Email</h2>
        <p className="text-sm text-muted-foreground">
          Enter the code sent to{" "}
          <span className="text-foreground font-bold">{email}</span>
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="otp"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  OTP Code
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="123456"
                    className="pl-4 bg-muted/50 border-border text-center tracking-[1em] font-bold text-lg"
                    maxLength={6}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full font-bold"
            disabled={isVerifying}
          >
            {isVerifying ? "Verifying..." : "Verify Code"}
          </Button>
        </form>
      </Form>

      <div className="text-center text-sm text-muted-foreground">
        Didn&apos;t receive it?{" "}
        <button
          onClick={handleResend}
          disabled={isResending}
          className="text-primary font-bold hover:underline disabled:opacity-50"
        >
          Resend Code
        </button>
      </div>
    </div>
  );
}
