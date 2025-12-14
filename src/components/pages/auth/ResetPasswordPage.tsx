"use client";

/**
 * ResetPasswordPage Component
 * Split-screen layout matching Login page
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
import { useResetPasswordMutation } from "@/lib/redux/api/authApi";
import { resetPasswordSchema, type ResetPasswordFormData } from "@/lib/validators";
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
    <div className="min-h-screen flex bg-background font-display text-foreground">
      {/* Left Side: Form Content */}
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24 bg-background w-full lg:w-[600px] z-10 relative border-r border-border">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div className="mb-10">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Set New Password
            </h1>
            <p className="mt-2 text-base text-muted-foreground dark:text-[#93c8a7]">
              Please create a strong password for your account.
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block text-sm font-medium leading-6">New Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="New password"
                        className="mt-2"
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
                    <FormLabel className="block text-sm font-medium leading-6">Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Confirm new password"
                        className="mt-2"
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
                className="flex w-full justify-center items-center rounded-lg bg-primary px-3 py-3.5 text-sm font-bold leading-6 text-primary-foreground shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-all uppercase tracking-wide"
              >
                {isLoading ? "Updating..." : "Update Password"}
              </Button>

              <div className="flex items-center justify-center">
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
