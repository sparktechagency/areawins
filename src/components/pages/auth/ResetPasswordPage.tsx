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
import { ROUTES } from "@/lib/constants";
import { useResetPasswordMutation } from "@/lib/redux/api/authApi";
import {
  resetPasswordSchema,
  type ResetPasswordFormData,
} from "@/lib/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const token = searchParams.get("token") || "";

  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const form = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email,
      token,
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: ResetPasswordFormData) => {
    try {
      await resetPassword(data).unwrap();
      toast.success("Password updated successfully!");
      router.push(ROUTES.LOGIN);
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to reset password.");
    }
  };

  return (
    <div className="bg-background text-foreground antialiased h-screen overflow-hidden flex flex-col lg:flex-row font-display">
      {/* Right Panel: Reset Password Form */}
      <div className="w-full max-w-3xl h-full overflow-y-auto bg-background p-8 md:p-16 border-r border-border">
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
              Set New Password
            </h1>
            <p className="text-muted-foreground text-base">
              Please create a strong password for your account.
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="New password"
                        className="bg-input text-foreground"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Confirm new password"
                        className="bg-input text-foreground"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-base rounded-lg shadow-[0_0_15px_rgba(11,218,91,0.2)] hover:shadow-[0_0_20px_rgba(11,218,91,0.4)] transition-all transform active:scale-[0.99] flex items-center justify-center gap-2 mt-4"
              >
                {isLoading ? "Updating..." : "Update Password"}
                <span className="material-symbols-outlined text-xl">
                  arrow_forward
                </span>
              </Button>

              <div className="flex items-center justify-center pt-6">
                <Link
                  href={ROUTES.LOGIN}
                  className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ArrowLeft size={16} />
                  Back to Login
                </Link>
              </div>
            </form>
          </Form>
        </div>
      </div>
      {/* Left Panel: Hero / Visuals */}
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
    </div>
  );
}
