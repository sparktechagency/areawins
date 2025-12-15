"use client";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/lib/constants";
import {
  useResendVerificationEmailMutation,
  useVerifyEmailMutation,
} from "@/lib/redux/api/authApi";
import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ClipboardEvent, KeyboardEvent, useRef, useState } from "react";
import toast from "react-hot-toast";

export default function VerifyOtp() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const [verifyEmail, { isLoading }] = useVerifyEmailMutation();
  const [resendEmail, { isLoading: isResending }] =
    useResendVerificationEmailMutation();

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
    <div className="bg-background text-foreground antialiased h-screen overflow-hidden flex flex-col lg:flex-row font-display">
      <div className="hidden lg:flex flex-1 relative flex-col justify-between p-12 bg-background overflow-hidden ">
        {/* Dark Mode Background */}
        <div className="hidden dark:block absolute inset-0 z-0">
          <div
            className="w-full h-full bg-cover bg-center bg-no-repeat opacity-60 mix-blend-overlay"
            style={{
              backgroundImage:
                'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBFpshNj-QObVsTFj680zJqBkxVVADIBcIySGOYLYcql30UgtT0cdsZFopFgOzbKLpCNPv7WK2k2TQQzi9XMs6ZZcFAd9AM00qWML6Vj00KDWSeepxkoAu1589l-8VghJ7C6AYWm0unqrzXew2CD_gvIJCm0xXxnQS2eqZSUEN3G_TXeOFRunMSDNRuxWS7WuhCu56gg9AYzyVbACaHL26va9jne0sNHx9vNHiQvg_DBt3N9e6vqB5ePoszzI37JTsNcRlxtHROn5Jw")',
            }}
          ></div>
          <div className="absolute inset-0 bg-linear-to-t from-[#102217] via-[#102217]/80 to-transparent"></div>
          <div className="absolute inset-0 bg-linear-to-r from-[#102217]/90 to-transparent"></div>
        </div>
        {/* Light Mode Background */}
        <div className="block dark:hidden absolute inset-0 z-0">
          <div
            className="w-full h-full bg-cover bg-center bg-no-repeat opacity-60 mix-blend-overlay"
            style={{
              backgroundImage:
                'url("https://images.unsplash.com/photo-1546519638-68e109498ffc")',
            }}
          ></div>
          <div className="absolute inset-0 bg-linear-to-t from-[#102217] via-[#102217]/80 to-transparent"></div>
          <div className="absolute inset-0 bg-linear-to-r from-[#102217]/90 to-transparent"></div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-16 z-10 flex flex-col justify-end h-full pointer-events-none">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#19e668]/20 border border-[#19e668]/30 text-[#19e668] text-xs font-bold uppercase tracking-wider mb-6 backdrop-blur-sm">
              Secure Account
            </div>
            <h2 className="text-4xl xl:text-5xl font-black text-white leading-tight mb-6">
              Regain access to <br />
              <span className="text-[#0bda5b]">your winnings</span>.
            </h2>
            <p className="text-lg text-gray-300 max-w-lg leading-relaxed">
              Fast and secure password recovery. We&apos;ll help you get back in
              the game in no time.
            </p>
          </div>
        </div>
      </div>
      {/* Right Panel: Verify Email Form */}
      <div className="w-full max-w-4xl h-full overflow-y-auto bg-background p-5 md:p-12 lg:p-14 xl:p-16 border-r border-border">
        <div className="min-h-full flex flex-col justify-center max-w-md mx-auto">
          <div className="lg:hidden flex justify-center mb-8">
            <Link href="/" className="flex items-center gap-2 text-foreground">
              <span className="material-symbols-outlined text-3xl text-primary">
                sports_cricket
              </span>
              <span className="text-xl font-bold text-foreground">
                BetPro BD
              </span>
            </Link>
          </div>

          <div className="mb-8 text-center sm:text-left">
            <h1 className="text-3xl sm:text-4xl font-black text-foreground tracking-tight mb-2">
              Verify Email
            </h1>
            <p className="text-muted-foreground text-base">
              We&apos;ve sent a 6-digit verification code to
              {email ? (
                <span className="block font-medium text-foreground mt-1">
                  {email}
                </span>
              ) : (
                " your email address."
              )}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
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
                    digit ? "border-primary" : "border-border"
                  )}
                  autoFocus={index === 0}
                />
              ))}
            </div>

            <Button
              type="submit"
              disabled={isLoading || otp.some((digit) => !digit)}
              className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-base rounded-lg shadow-[0_0_15px_rgba(11,218,91,0.2)] hover:shadow-[0_0_20px_rgba(11,218,91,0.4)] transition-all transform active:scale-[0.99] flex items-center justify-center gap-2 mt-4"
            >
              {isLoading ? "Verifying..." : "Verify & Login"}
              <span className="material-symbols-outlined text-xl">
                arrow_forward
              </span>
            </Button>

            <div className="flex flex-col items-center space-y-4 pt-4">
              <div className="text-center text-sm">
                <p className="text-muted-foreground">
                  Didn&apos;t receive the code?{" "}
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
    </div>
  );
}
