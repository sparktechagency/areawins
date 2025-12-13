import Link from "next/link";
import React from "react";

const Login: React.FC = () => {
  return (
    <div className="min-h-screen flex bg-[#f6f8f7] dark:bg-[#112218] font-display text-slate-900 dark:text-white">
      {/* Left Side: Login Form */}
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24 bg-white dark:bg-[#112218] w-full lg:w-[600px] z-10 relative border-r dark:border-[#244732] border-gray-200">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <Link href="/" className="flex items-center gap-3 mb-12">
            <div className="size-8 text-[#19e668]">
              <svg
                className="w-full h-full"
                fill="none"
                viewBox="0 0 48 48"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M24 45.8096C19.6865 45.8096 15.4698 44.5305 11.8832 42.134C8.29667 39.7376 5.50128 36.3314 3.85056 32.3462C2.19985 28.361 1.76794 23.9758 2.60947 19.7452C3.451 15.5145 5.52816 11.6284 8.57829 8.5783C11.6284 5.52817 15.5145 3.45101 19.7452 2.60948C23.9758 1.76795 28.361 2.19986 32.3462 3.85057C36.3314 5.50129 39.7376 8.29668 42.134 11.8833C44.5305 15.4698 45.8096 19.6865 45.8096 24L24 24L24 45.8096Z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>
            <span className="text-2xl font-bold tracking-tight">BetBrand</span>
          </Link>

          <div className="mb-10">
            <h1 className="text-3xl font-bold tracking-tight">Welcome back</h1>
            <p className="mt-2 text-base text-slate-600 dark:text-[#93c8a7]">
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
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="username"
                  required
                  className="block w-full rounded-lg border-0 py-3.5 text-slate-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-[#346547] placeholder:text-gray-400 dark:placeholder:text-[#93c8a7] focus:ring-2 focus:ring-inset focus:ring-[#19e668] sm:text-base sm:leading-6 bg-transparent dark:bg-[#1a3223] pl-4 transition-all"
                  placeholder="user@example.com"
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
              <div className="mt-2 relative rounded-lg shadow-sm">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-lg border-0 py-3.5 text-slate-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-[#346547] placeholder:text-gray-400 dark:placeholder:text-[#93c8a7] focus:ring-2 focus:ring-inset focus:ring-[#19e668] sm:text-base sm:leading-6 bg-transparent dark:bg-[#1a3223] pl-4 pr-10 transition-all"
                  placeholder="••••••••"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer text-gray-400 dark:text-[#93c8a7] hover:text-[#19e668] dark:hover:text-[#19e668] transition-colors">
                  <span className="material-symbols-outlined text-[24px]">
                    visibility
                  </span>
                </div>
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
                  className="ml-2 block text-sm text-slate-700 dark:text-gray-300 cursor-pointer select-none"
                >
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-[#19e668] hover:text-green-400 transition-colors"
                >
                  Forgot password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center items-center rounded-lg bg-[#19e668] px-3 py-3.5 text-sm font-bold leading-6 text-[#112218] shadow-sm hover:bg-green-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#19e668] transition-all uppercase tracking-wide"
              >
                Log in
              </button>
            </div>

            <div className="space-y-6 pt-2">
              <button
                type="button"
                className="group flex items-center justify-center gap-2 w-full text-sm font-medium text-slate-600 dark:text-[#93c8a7] hover:text-[#19e668] dark:hover:text-[#19e668] transition-colors py-2 border border-dashed border-gray-300 dark:border-[#346547] rounded-lg hover:border-[#19e668] dark:hover:border-[#19e668] bg-gray-50 dark:bg-transparent"
              >
                <span className="material-symbols-outlined text-[20px]">
                  lock_person
                </span>
                Log in with Two-Factor Code
              </button>
              <div className="text-center">
                <p className="text-sm text-slate-500 dark:text-gray-400">
                  Don&apos;t have an account?
                  <Link
                    href="/register"
                    className="font-bold text-[#19e668] hover:text-green-400 ml-1 transition-colors"
                  >
                    Register now
                  </Link>
                </p>
              </div>
            </div>
          </form>
        </div>
        <div className="absolute bottom-6 left-0 right-0 flex justify-center items-center gap-2 text-xs text-slate-400 dark:text-[#5a7d68]">
          <span className="material-symbols-outlined text-[16px]">
            verified_user
          </span>
          <span>Protected by 256-bit SSL Encryption</span>
        </div>
      </div>

      {/* Right Side: Hero Image */}
      <div className="hidden lg:block relative w-0 flex-1 overflow-hidden bg-[#1a3223]">
        <img
          className="absolute inset-0 h-full w-full object-cover"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBGHfmROBvNgx-vXT0JtyW9iIW89MISZDWJ6w2TZptzBHf445R1R5mmYgxnztxr8Sgi6Fiy46q_vLSeT4eT2_EStZ4SxMk7Hv9da-B8rvblOI-6p8_rsm-bCo8eYdEs6k-a9v1elmPkyTyy5KhfJnA9zgzUJ9hL3ilqIjjTdE2q04oKw6kO3PYsur8nID5rTrSe7qCjemNvXZKATmPr6IQp1VZF3KVsCMnKm3e41geiby4Pedb0yawxsh_F7S0Fi8wMHHfDNicW0Js_"
          alt="Stadium"
        />
        <div className="absolute inset-0 bg-[#112218]/80 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#112218] via-transparent to-transparent opacity-90"></div>

        <div className="absolute bottom-0 left-0 right-0 p-16 z-10 flex flex-col justify-end h-full pointer-events-none">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#19e668]/20 border border-[#19e668]/30 text-[#19e668] text-xs font-bold uppercase tracking-wider mb-6 backdrop-blur-sm">
              Live Sports Data
            </div>
            <h2 className="text-5xl font-bold text-white mb-6 tracking-tight leading-tight">
              Experience the <span className="text-[#19e668]">next level</span>{" "}
              of sports betting.
            </h2>
            <p className="text-lg text-gray-300 max-w-lg leading-relaxed">
              Real-time odds, secure transactions, and instant payouts. Join
              thousands of winners on Bangladesh&apos;s premier platform.
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
  );
};

export default Login;
