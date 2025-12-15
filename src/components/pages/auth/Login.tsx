import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Login: React.FC = () => {
  return (
    <div className="min-h-screen flex bg-background font-display text-foreground ">
      {/* Left Side: Login Form */}
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24 bg-background w-full lg:w-[600px] z-10 relative border-r  border-border">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div className="mb-10">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Welcome back
            </h1>
            <p className="mt-2 text-base text-muted-foreground dark:text-[#93c8a7]">
              Secure access to your betting dashboard.
            </p>
          </div>

          <form action="#" className="space-y-6">
            <div>
              <label
                className="block text-sm font-medium leading-6"
                htmlFor="email"
              >
                Email or Username
              </label>
              <div className="mt-2">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="Email or Username"
                />
              </div>
            </div>

            <div>
              <label
                className="block text-sm font-medium leading-6"
                htmlFor="password"
              >
                Password
              </label>
              <div className="mt-2 relative rounded-lg">
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  placeholder="Password"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-[#19e668] focus:ring-[#19e668] bg-gray-100 dark:bg-[#1a3223] dark:border-[#346547] dark:checked:bg-[#19e668] cursor-pointer"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-foreground cursor-pointer select-none"
                >
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <Link
                  href="/forgot-password"
                  className="font-medium text-primary hover:text-primary/80 transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center items-center rounded-lg bg-primary px-3 py-3.5 text-sm font-bold leading-6 text-primary-foreground shadow-sm hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-all uppercase tracking-wide"
              >
                Log in
              </button>
            </div>

            <div className="space-y-6 pt-2">
              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  Don&apos;t have an account?
                  <Link
                    href="/register"
                    className="font-bold text-primary hover:text-primary/80 ml-1 transition-colors"
                  >
                    Register now
                  </Link>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Right Side: Hero Image */}
      <div className="hidden lg:block relative w-0 flex-1 p-12 overflow-hidden bg-background">
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

        <div className="relative z-10 max-w-lg">
          <h2 className="text-4xl xl:text-5xl font-black text-white leading-tight mb-6">
            Join the <span className="text-[#0bda5b]">Winning Team</span> today.
          </h2>
          <p className="text-xl text-white font-medium mb-8">
            Experience the thrill of live betting with the best odds in
            Bangladesh. Sign up now and claim your welcome bonus.
          </p>
          <div className="flex gap-6 items-center">
            <div className="flex -space-x-4">
              <Image
                width={40}
                height={40}
                className="w-10 h-10 rounded-full border-2 border-[#102217]"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD1SXgSrNvmLE7tV9pXHnh_INjBlfsZgL1Cmm2EjUpRLCi0Nztzpqsw2T4dXhGeUn753VIznDYC0EDSyc3r2NAsyszYe3g-QQRgBzY0esx0VqQ27sbz-Cdxs5mHBR_lp8W4GDv7C37KFn7jYF5hI5wV6VsIv3Nsjafxf6JkzvpnP8FqUpbbSe6ljYcohLguxGZfSBsF3n929fIwYf49z8mzZkXzIanLNt-yE4yRgzn_KI05b3WQa0hrFaRfw45J4nDV8UMtVPDAzXSh"
                alt="User"
              />
              <Image
                width={40}
                height={40}
                className="w-10 h-10 rounded-full border-2 border-[#102217]"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC_PnrOY76N6vOt3LuUsMNLKvcExt80uyttEQSotsUurMwsOCGHKOsCvfiz0ysNxwBsfQBIZkl1NzOJLwvmoCqbIVRSqZeZdg1YWKQq8ntAyxyjafECXoUyXE8za87n9UjLsLMjLLs4sDMOzEKmfnWwGGC6AuLxBZcWR7NNAEfqEo0YpicxQLd05u_JiYXelZHoTfAe_UI1i2EHwbNvUtbusMFuNS2XB-5xgLhNljPveHZS_GQLBgcf03qfzgW9GEJ0lucEqzKKiqQG"
                alt="User"
              />
              <Image
                width={40}
                height={40}
                className="w-10 h-10 rounded-full border-2 border-[#102217]"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBOCWQ1pl1m_yYhlUpYhd9tlM20JxDU909Thn6juDZ3AE8BxXFLwl7tWtz3U6IRJ67AqImruhV0fKny05EjiWP93u0jOM7KTY9C6jkRJn-inuo3DLf5IxqBCpLA1IjMTjOkQ_d1bOim-dF27kxSCWGWKq49NVQhAtauEnsiQrnxxLDmcF14WHuDOdE_Rz8fFaxnbad1Abj6zG9ypZyk-S-_vWEQpOFA10XbNvvYy_-NehhwPOPn7k_ejQaN8UaVJxEoS6aXTI0BRVpx"
                alt="User"
              />
              <div className="w-10 h-10 rounded-full border-2 border-[#102217] bg-background flex items-center justify-center text-xs font-bold text-foreground">
                +2k
              </div>
            </div>
            <div className="text-sm font-medium text-foreground">
              <span className="text-[#0bda5b] font-bold">2,000+</span> New users
              this week
            </div>
          </div>
        </div>

        <div className="relative z-10 flex gap-4 text-[#9cbaa7] text-xs font-semibold uppercase tracking-wider">
          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined text-sm">lock</span> SSL
            Secured
          </span>
          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined text-sm">
              18_up_rating
            </span>{" "}
            18+ Only
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
