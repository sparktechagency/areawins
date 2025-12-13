"use client";

/**
 * VerifyEmailPage Component
 * 6-digit OTP verification with auto-focus and auto-advance
 */

import { useState, useRef, KeyboardEvent, ClipboardEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useVerifyEmailMutation, useResendVerificationEmailMutation } from "@/lib/redux/api/authApi";
import { Button } from "@/components/ui/button";
import AuthLayout from "@/components/layouts/AuthLayout";
import { ROUTES } from "@/lib/constants";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";

export default function VerifyEmailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const [verifyEmail, { isLoading }] = useVerifyEmailMutation();
  const [resendEmail, { isLoading: isResending }] = useResendVerificationEmailMutation();

  const handleChange = (index: number, value: string) => {
    // Only allow numbers
    if (value && !/^\d$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-advance to next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    // Handle backspace
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text/plain").trim();

    // Only process if it's 6 digits
    if (/^\d{6}$/.test(pastedData)) {
      const newOtp = pastedData.split("");
      setOtp(newOtp);
      inputRefs.current[5]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const otpString = otp.join("");
    if (otpString.length !== 6) {
      toast.error("Please enter all 6 digits");
      return;
    }

    try {
      await verifyEmail({ email, otp: otpString }).unwrap();
      toast.success("Email verified successfully!");
      router.push(ROUTES.LOGIN);
    } catch (error: any) {
      toast.error(error?.data?.message || "Invalid OTP. Please try again.");
      setOtp(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
    }
  };

  const handleResend = async () => {
    try {
      await resendEmail({ email }).unwrap();
      toast.success("Verification code sent!");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to resend code.");
    }
  };

  return (
    <AuthLayout>
      <div className="space-y-6">
        {/* Title */}
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Verify Email</h1>
          <p className="text-muted-foreground">Please Check Your Email And Enter The Code</p>
          {email && (
            <p className="text-sm text-muted-foreground mt-2">
              Code sent to: <span className="font-medium">{email}</span>
            </p>
          )}
        </div>

        {/* OTP Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* OTP Input Boxes */}
          <div className="flex justify-center gap-3">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => {
                  inputRefs.current[index] = el;
                }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={index === 0 ? handlePaste : undefined}
                className={cn(
                  "w-14 h-14 text-center text-2xl font-bold rounded-lg",
                  "border-2 transition-all",
                  "focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary",
                  digit
                    ? "border-primary bg-green-50 dark:bg-green-500/20"
                    : "border-border bg-card hover:border-border/50"
                )}
                autoFocus={index === 0}
              />
            ))}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isLoading || otp.some((digit) => !digit)}
            className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
          >
            {isLoading ? "Verifying..." : "Login"}
          </Button>
        </form>

        {/* Resend Code */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Didn't receive code?{" "}
            <button
              onClick={handleResend}
              disabled={isResending}
              className="font-semibold text-primary hover:underline disabled:opacity-50"
            >
              {isResending ? "Sending..." : "Resend it"}
            </button>
          </p>
        </div>

        {/* Back to Login */}
        <p className="text-center text-sm text-muted-foreground">
          <Link href={ROUTES.LOGIN} className="font-semibold text-primary hover:underline">
            Back to Login
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
