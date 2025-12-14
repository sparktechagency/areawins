"use client";

/**
 * ForgotPasswordPage Component
 * Redesigned full-screen version with Theme Support
 */

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
import { useForgotPasswordMutation } from "@/lib/redux/api/authApi";
import { forgotPasswordSchema, type ForgotPasswordFormData } from "@/lib/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, RotateCcw } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const form = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      await forgotPassword(data).unwrap();
      toast.success("Password reset email sent! Check your inbox.");
      router.push(`${ROUTES.VERIFY_EMAIL}?email=${encodeURIComponent(data.email)}`);
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to send reset email.");
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center relative overflow-hidden font-sans p-4">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
            {/* Spotlights/Gradients */}
            <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary/5 blur-[150px] rounded-full"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/5 blur-[120px] rounded-full"></div>
        </div>

      {/* Main Content */}
      <main className="w-full max-w-[480px] bg-card text-card-foreground rounded-2xl p-8 md:p-10 shadow-2xl border border-border relative z-10 transition-colors duration-200">
            {/* Top Green Glow Line (Optional: keep or remove, keeping for style) */}
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-50"></div>

          <div className="flex flex-col items-center text-center space-y-6">
            {/* Icon */}
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-2">
              <RotateCcw size={32} strokeWidth={2} />
            </div>

            {/* Text */}
            <div className="space-y-2">
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Forgot Password?</h1>
              <p className="text-muted-foreground text-sm md:text-base leading-relaxed max-w-sm mx-auto">
                Enter your email address or username and we'll send you a link to reset your password.
              </p>
            </div>

            {/* Form */}
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 text-left">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="space-y-1.5">
                      <FormLabel className="text-sm font-semibold">Email or Username</FormLabel>
                      <FormControl>
                        <div className="relative">
                            <i className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                            </i>
                            <Input
                            placeholder="e.g. user@example.com"
                            className="h-12 pl-12 focus-visible:ring-primary focus-visible:border-primary transition-colors"
                            {...field}
                            />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-base transition-all rounded-lg"
                >
                  {isLoading ? "Sending..." : "Send Reset Link"}
                </Button>
              </form>
            </Form>

            {/* Divider */}
            <div className="w-full h-[1px] bg-border my-2"></div>

            {/* Back to Login */}
             <Link
                href={ROUTES.LOGIN}
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors font-medium text-sm"
              >
                <ArrowLeft size={16} />
                Back to Login
              </Link>
          </div>
      </main>
    </div>
  );
}
