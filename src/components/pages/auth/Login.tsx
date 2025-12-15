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
import { Checkbox } from "@/components/ui/checkbox";
import { loginSchema, type LoginFormData } from "@/lib/validators/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import React from "react";
import logo from "@/assets/logo/logo2.png";

const Login: React.FC = () => {
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = (data: LoginFormData) => {
    console.log(data);
  };

  return (
    <div className="bg-background text-foreground antialiased h-screen overflow-hidden flex flex-col lg:flex-row font-display">
      <div className="w-full  max-w-3xl h-full overflow-y-auto bg-background p-5 md:p-12 lg:p-14 xl:p-16 border-r border-border">
        <div className="min-h-full flex flex-col justify-center max-w-md mx-auto">
          <div className="flex justify-center mb-8">
            <Link href="/" className="flex items-center gap-2 text-foreground">
              <Image width={150} height={100} src={logo.src} alt="Logo" />
            </Link>
          </div>

          <div className="mb-8 text-center sm:text-left">
            <h1 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight mb-2">
              Log In
            </h1>
            <p className="text-muted-foreground text-base">
              Secure access to your betting dashboard.
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email or Username</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Email or Username"
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
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Password"
                        className="bg-input text-foreground"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex items-center justify-between">
                <FormField
                  control={form.control}
                  name="rememberMe"
                  render={({ field }) => (
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="remember-me"
                        checked={field.value}
                        className="cursor-pointer"
                        onCheckedChange={field.onChange}
                      />
                      <label
                        htmlFor="remember-me"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground cursor-pointer select-none"
                      >
                        Remember me
                      </label>
                    </div>
                  )}
                />
                <div className="text-sm">
                  <Link
                    href="/forgot-password"
                    className="font-medium text-primary hover:text-primary/80 transition-colors"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-base rounded-lg shadow-[0_0_15px_rgba(11,218,91,0.2)] hover:shadow-[0_0_20px_rgba(11,218,91,0.4)] transition-all transform active:scale-[0.99] flex items-center justify-center gap-2 mt-4"
              >
                Log In
                <span className="material-symbols-outlined text-xl">
                  arrow_forward
                </span>
              </Button>

              <p className="text-center text-muted-foreground text-sm mt-6">
                Don&apos;t have an account?{" "}
                <Link
                  href="/register"
                  className="text-foreground font-bold hover:text-primary transition-colors ml-1"
                >
                  Register now
                </Link>
              </p>
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
              Fast and secure password recovery. We&apos;ll help you get back in the
              game in no time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
