"use client";

/**
 * VerifyEmailPage Component
 * Split-screen layout matching Login page
 */

import { Button } from "@/components/ui/button";
import { ROUTES } from "@/lib/constants";
import { useResendVerificationEmailMutation, useVerifyEmailMutation } from "@/lib/redux/api/authApi";
import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ClipboardEvent, KeyboardEvent, useRef, useState } from "react";
import toast from "react-hot-toast";

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
    <div className="min-h-screen flex bg-background font-display text-foreground">
      {/* Left Side: Form Content */}
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24 bg-background w-full lg:w-[600px] z-10 relative border-r border-border">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div className="mb-10">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Verify Email
            </h1>
            <p className="mt-2 text-base text-muted-foreground dark:text-[#93c8a7]">
              We've sent a 6-digit verification code to
              {email ? (
                <span className="block font-medium text-foreground mt-1">{email}</span>
              ) : (
                " your email address."
              )}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex justify-center gap-2 sm:gap-3">
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
                    "w-10 h-10 sm:w-12 sm:h-12 text-center text-xl font-bold rounded-lg",
                    "border transition-all bg-input text-foreground",
                    "focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary",
                    digit
                      ? "border-primary"
                      : "border-border"
                  )}
                  autoFocus={index === 0}
                />
              ))}
            </div>

            <Button
              type="submit"
              disabled={isLoading || otp.some((digit) => !digit)}
              className="flex w-full justify-center items-center rounded-lg bg-primary px-3 py-3.5 text-sm font-bold leading-6 text-primary-foreground shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-all uppercase tracking-wide"
            >
              {isLoading ? "Verifying..." : "Verify & Login"}
            </Button>

            <div className="flex flex-col items-center space-y-4">
              <div className="text-center text-sm">
                <p className="text-muted-foreground">
                  Didn't receive the code?{" "}
                  <button
                    type="button"
                    onClick={handleResend}
                    disabled={isResending}
                    className="font-medium text-primary hover:text-primary/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isResending ? "Sending..." : "Resend it"}
                  </button>
                </p>
              </div>

               <Link
                  href={ROUTES.LOGIN}
                  className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ArrowLeft size={16} />
                  Back to Login
                </Link>
            </div>
          </form>
        </div>
      </div>

      {/* Right Side: Hero Image */}
      <div className="hidden lg:block relative w-0 flex-1 overflow-hidden bg-background">
        
        {/* Dark Mode Version */}
        <div className="hidden dark:block h-full w-full relative">
          <Image
            fill
            className="absolute inset-0 h-full w-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBGHfmROBvNgx-vXT0JtyW9iIW89MISZDWJ6w2TZptzBHf445R1R5mmYgxnztxr8Sgi6Fiy46q_vLSeT4eT2_EStZ4SxMk7Hv9da-B8rvblOI-6p8_rsm-bCo8eYdEs6k-a9v1elmPkyTyy5KhfJnA9zgzUJ9hL3ilqIjjTdE2q04oKw6kO3PYsur8nID5rTrSe7qCjemNvXZKATmPr6IQp1VZF3KVsCMnKm3e41geiby4Pedb0yawxsh_F7S0Fi8wMHHfDNicW0Js_"
            alt="Stadium Dark"
          />
          <div className="absolute inset-0 bg-[#112218]/80 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-linear-to-t from-[#112218] via-transparent to-transparent opacity-90"></div>

          <div className="absolute bottom-0 left-0 right-0 p-16 z-10 flex flex-col justify-end h-full pointer-events-none">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#19e668]/20 border border-[#19e668]/30 text-[#19e668] text-xs font-bold uppercase tracking-wider mb-6 backdrop-blur-sm">
                Secure Account
              </div>
              <h2 className="text-5xl font-bold text-white mb-6 tracking-tight leading-tight">
                Regain access to <br /><span className="text-[#19e668]">your winnings</span>.
              </h2>
              <p className="text-lg text-gray-300 max-w-lg leading-relaxed">
                Fast and secure password recovery. We'll help you get back in the game in no time.
              </p>
              <div className="mt-10 flex gap-2">
                <div className="w-12 h-1.5 bg-[#19e668] rounded-full"></div>
                <div className="w-3 h-1.5 bg-gray-600 rounded-full"></div>
                <div className="w-3 h-1.5 bg-gray-600 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Light Mode Version */}
        <div className="block dark:hidden h-full w-full relative">
          <Image
            fill
            className="absolute inset-0 h-full w-full object-cover"
            src="https://images.unsplash.com/photo-1570498839593-e565b39455fc"
            alt="Stadium Light"
          />
          <div className="absolute inset-0 bg-[#112218]/80 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-linear-to-t from-[#112218] via-transparent to-transparent opacity-90"></div>

          <div className="absolute bottom-0 left-0 right-0 p-16 z-10 flex flex-col justify-end h-full pointer-events-none">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#19e668]/20 border border-[#19e668]/30 text-[#19e668] text-xs font-bold uppercase tracking-wider mb-6 backdrop-blur-sm">
                Secure Account
              </div>
              <h2 className="text-5xl font-bold text-white mb-6 tracking-tight leading-tight">
                Regain access to <br /><span className="text-[#19e668]">your winnings</span>.
              </h2>
              <p className="text-lg text-gray-300 max-w-lg leading-relaxed">
                Fast and secure password recovery. We'll help you get back in the game in no time.
              </p>
              <div className="mt-10 flex gap-2">
                <div className="w-12 h-1.5 bg-[#19e668] rounded-full"></div>
                <div className="w-3 h-1.5 bg-gray-600 rounded-full"></div>
                <div className="w-3 h-1.5 bg-gray-600 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
