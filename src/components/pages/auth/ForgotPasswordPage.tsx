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
import { useForgotPasswordMutation } from "@/lib/redux/api/authApi";
import {
  forgotPasswordSchema,
  type ForgotPasswordFormData,
} from "@/lib/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import logo from "@/assets/logo/logo2.png";
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
      router.push(
        `${ROUTES.VERIFY_EMAIL}?email=${encodeURIComponent(data.email)}`
      );
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to send reset email.");
    }
  };

  return (
    <div className="bg-background text-foreground antialiased h-screen overflow-hidden flex flex-col lg:flex-row font-display">
      {/* Left Side: Form Content */}
      <div className="w-full max-w-3xl h-full overflow-y-auto bg-background p-8 md:p-16 border-r border-border">
        <div className="min-h-full flex flex-col justify-center max-w-md mx-auto">
          <div className="flex justify-center mb-8">
            <Link href="/" className="flex items-center gap-2 text-foreground">
              <Image width={150} height={100} src={logo.src} alt="Logo" />
            </Link>
          </div>
          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              Forgot Password
            </h1>
            <p className="mt-2 text-base text-muted-foreground dark:text-[#93c8a7]">
              Enter your email address to reset your password.
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block text-sm font-medium leading-6">
                      Email or Username
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g. user@example.com"
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
                className="flex w-full justify-center items-center rounded-lg bg-primary px-3 py-3.5 text-sm leading-6 text-primary-foreground shadow-sm hover:bg-primary/90 focus-visible:outline cursor-pointer  focus-visible:outline-offset-2 focus-visible:outline-primary transition-all uppercase tracking-wide"
              >
                {isLoading ? "Sending..." : "Send Otp"}
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
