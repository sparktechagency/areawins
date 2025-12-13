import Link from "next/link";
import React from "react";

const Register: React.FC = () => {
  return (
    <div className="bg-background dark:bg-[#102217] text-foreground dark:text-white antialiased h-screen overflow-hidden flex flex-col lg:flex-row font-display">
      {/* Left Panel: Hero / Visuals */}
      <div className="hidden lg:flex lg:w-5/12 xl:w-1/2 relative flex-col justify-between p-12 bg-[#1b2720] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div
            className="w-full h-full bg-cover bg-center bg-no-repeat opacity-60 mix-blend-overlay"
            style={{
              backgroundImage:
                'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBFpshNj-QObVsTFj680zJqBkxVVADIBcIySGOYLYcql30UgtT0cdsZFopFgOzbKLpCNPv7WK2k2TQQzi9XMs6ZZcFAd9AM00qWML6Vj00KDWSeepxkoAu1589l-8VghJ7C6AYWm0unqrzXew2CD_gvIJCm0xXxnQS2eqZSUEN3G_TXeOFRunMSDNRuxWS7WuhCu56gg9AYzyVbACaHL26va9jne0sNHx9vNHiQvg_DBt3N9e6vqB5ePoszzI37JTsNcRlxtHROn5Jw")',
            }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#102217] via-[#102217]/80 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#102217]/90 to-transparent"></div>
        </div>

        <div className="relative z-10">
          <Link
            href="/"
            className="flex items-center gap-2 text-[#0bda5b] mb-6"
          >
            <span className="material-symbols-outlined text-4xl">
              sports_cricket
            </span>
            <span className="text-2xl font-bold tracking-tight text-white">
              BetPro BD
            </span>
          </Link>
        </div>

        <div className="relative z-10 max-w-lg">
          <h2 className="text-4xl xl:text-5xl font-black text-white leading-tight mb-6">
            Join the <span className="text-[#0bda5b]">Winning Team</span> today.
          </h2>
          <p className="text-xl text-[#9cbaa7] font-medium mb-8">
            Experience the thrill of live betting with the best odds in
            Bangladesh. Sign up now and claim your welcome bonus.
          </p>
          <div className="flex gap-6 items-center">
            <div className="flex -space-x-4">
              <img
                className="w-10 h-10 rounded-full border-2 border-[#102217]"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD1SXgSrNvmLE7tV9pXHnh_INjBlfsZgL1Cmm2EjUpRLCi0Nztzpqsw2T4dXhGeUn753VIznDYC0EDSyc3r2NAsyszYe3g-QQRgBzY0esx0VqQ27sbz-Cdxs5mHBR_lp8W4GDv7C37KFn7jYF5hI5wV6VsIv3Nsjafxf6JkzvpnP8FqUpbbSe6ljYcohLguxGZfSBsF3n929fIwYf49z8mzZkXzIanLNt-yE4yRgzn_KI05b3WQa0hrFaRfw45J4nDV8UMtVPDAzXSh"
                alt="User"
              />
              <img
                className="w-10 h-10 rounded-full border-2 border-[#102217]"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC_PnrOY76N6vOt3LuUsMNLKvcExt80uyttEQSotsUurMwsOCGHKOsCvfiz0ysNxwBsfQBIZkl1NzOJLwvmoCqbIVRSqZeZdg1YWKQq8ntAyxyjafECXoUyXE8za87n9UjLsLMjLLs4sDMOzEKmfnWwGGC6AuLxBZcWR7NNAEfqEo0YpicxQLd05u_JiYXelZHoTfAe_UI1i2EHwbNvUtbusMFuNS2XB-5xgLhNljPveHZS_GQLBgcf03qfzgW9GEJ0lucEqzKKiqQG"
                alt="User"
              />
              <img
                className="w-10 h-10 rounded-full border-2 border-[#102217]"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBOCWQ1pl1m_yYhlUpYhd9tlM20JxDU909Thn6juDZ3AE8BxXFLwl7tWtz3U6IRJ67AqImruhV0fKny05EjiWP93u0jOM7KTY9C6jkRJn-inuo3DLf5IxqBCpLA1IjMTjOkQ_d1bOim-dF27kxSCWGWKq49NVQhAtauEnsiQrnxxLDmcF14WHuDOdE_Rz8fFaxnbad1Abj6zG9ypZyk-S-_vWEQpOFA10XbNvvYy_-NehhwPOPn7k_ejQaN8UaVJxEoS6aXTI0BRVpx"
                alt="User"
              />
              <div className="w-10 h-10 rounded-full border-2 border-[#102217] bg-[#1b2720] flex items-center justify-center text-xs font-bold text-white">
                +2k
              </div>
            </div>
            <div className="text-sm font-medium text-white">
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

      {/* Right Panel: Registration Form */}
      <div className="w-full lg:w-7/12 xl:w-1/2 h-full overflow-y-auto bg-card dark:bg-[#102217] p-8 md:p-12">
        <div className="min-h-full flex flex-col justify-center max-w-[640px] mx-auto">
          <div className="lg:hidden flex justify-center mb-8">
            <Link href="/" className="flex items-center gap-2 text-white">
              <span className="material-symbols-outlined text-3xl text-primary">
                sports_cricket
              </span>
              <span className="text-xl font-bold text-white">BetPro BD</span>
            </Link>
          </div>

          <div className="mb-8 text-center sm:text-left">
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-2">
              Create Account
            </h1>
            <p className="text-muted-foreground text-base">
              Enter your details to get started with the best odds.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <button className="flex items-center justify-center gap-2 h-12 rounded-lg bg-card border border-border hover:bg-card/80 hover:border-border/80 transition-all text-white font-medium text-sm">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAa5InagKMKSf1ZaCpGqW6JRtuN21Zut6whqLPKC8c1Kh3B9GeKpbjx7WHlo-F0dnNvkhNMsZd6lnj1z-rG-vQ5uo2jJmIxIa4-NPezs_vONh4dYnU1JuwaCBllwxr-ewZ8OeHZsve57JZrmsQD4q3JCFmEp6cJ0jDnTcnjfopDg0Qraldhu39UKhyjeVJFhxan_PcBlbcdXKvVjVlAOvkGCLYRf8pVH91OcGzb6DYqayl395RlMt0n9SPaZh-BCHIrLuRl_bfShUSq"
                alt="Google"
                className="w-5 h-5"
              />
              Google
            </button>
            <button className="flex items-center justify-center gap-2 h-12 rounded-lg bg-card border border-border hover:bg-card/80 hover:border-border/80 transition-all text-white font-medium text-sm">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCBKgfdyHNe3Q7jGLZ9_vzHyU8dUiAxsLZCRHYMWBY2DeOWyYw-Q2-xNIrBUFSL6crg7sjH8hNAwuoONUWRRqViUmSapaop4QcXBXV4JzE8QpMJrs95E-8laeFqazFcjUdK05L3OUJf9IVNhZGfPEylu8kQpDQbvGjBkUoJ01g-dY1YdQTulctk9WPSuPNPQFguy_ZezoEj-Cf3EVk0yz9Jsw6EfUw9rwMYO0QT2upod-hrsJ9pl5CBo0VPmf72MU3IJfz6K_HfPAXN"
                alt="Facebook"
                className="w-5 h-5"
              />
              Facebook
            </button>
          </div>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#28392e]"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-[#102217] text-[#9cbaa7]">
                Or register with email
              </span>
            </div>
          </div>

          <form className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <label className="flex flex-col gap-2">
                <span className="text-white text-sm font-medium">Username</span>
                <input
                  className="w-full h-12 bg-input border border-border rounded-lg text-white placeholder:text-muted-foreground focus:ring-1 focus:ring-primary focus:border-primary transition-all text-sm px-4"
                  placeholder="Choose a username"
                  type="text"
                />
              </label>
              <label className="flex flex-col gap-2">
                <span className="text-white text-sm font-medium">Country</span>
                <select className="w-full h-12 bg-input border border-border rounded-lg text-white focus:ring-1 focus:ring-primary focus:border-primary transition-all text-sm px-4">
                  <option value="BD">Bangladesh</option>
                  <option value="IN">India</option>
                </select>
              </label>
            </div>

            <label className="flex flex-col gap-2">
              <span className="text-white text-sm font-medium">
                Email Address
              </span>
              <input
                className="w-full h-12 bg-input border border-border rounded-lg text-white placeholder:text-muted-foreground focus:ring-1 focus:ring-primary focus:border-primary transition-all text-sm px-4"
                placeholder="yourname@example.com"
                type="email"
              />
            </label>

            <label className="flex flex-col gap-2">
              <span className="text-white text-sm font-medium">
                Phone Number
              </span>
              <div className="flex gap-3">
                <div className="w-[120px] relative">
                  <div
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-cover bg-center"
                    style={{
                      backgroundImage:
                        'url("https://lh3.googleusercontent.com/aida-public/AB6AXuADqeLn4m_opIFiaeMbmrRCf72tDv1l8DRfnVjm9hqgTSMyK-_03pFb258GHG2U3QLFX6BscvIfpTyI2oSgB_NWuws8uJH2DUyJjy0TqayJfvr9ArpE379DznBhZCET7Bl4uyUMgARp-L40iRpUhH3eOiHM_O8-5pqEES3mdEXgz0-sLMJxtFi2vsWXPHKLWkhgr5zn9jbMV9vZCQnl65Kvjp4CvA78Lq7oarJWaZpkulfE1DnNXy0GnlSPaY3n3hidcgCwMr5fhazf")',
                    }}
                  ></div>
                  <select className="w-full pl-10 pr-2 h-12 bg-input border border-border rounded-lg text-white focus:ring-1 focus:ring-primary focus:border-primary transition-all text-sm appearance-none">
                    <option value="+880">+880</option>
                  </select>
                </div>
                <input
                  className="w-full h-12 bg-input border border-border rounded-lg text-white placeholder:text-muted-foreground focus:ring-1 focus:ring-primary focus:border-primary transition-all text-sm px-4"
                  placeholder="1XXX-XXXXXX"
                  type="tel"
                />
              </div>
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <label className="flex flex-col gap-2">
                <span className="text-white text-sm font-medium">Password</span>
                <input
                  className="w-full h-12 bg-input border border-border rounded-lg text-white placeholder:text-muted-foreground focus:ring-1 focus:ring-primary focus:border-primary transition-all text-sm px-4"
                  placeholder="Min. 8 characters"
                  type="password"
                />
              </label>
              <label className="flex flex-col gap-2">
                <span className="text-white text-sm font-medium">
                  Confirm Password
                </span>
                <input
                  className="w-full h-12 bg-input border border-border rounded-lg text-white placeholder:text-muted-foreground focus:ring-1 focus:ring-primary focus:border-primary transition-all text-sm px-4"
                  placeholder="Repeat password"
                  type="password"
                />
              </label>
            </div>

            <div className="flex items-start gap-3 pt-2">
              <input
                className="w-5 h-5 rounded border-border bg-input text-primary focus:ring-offset-[#102217] cursor-pointer focus:ring-primary"
                id="terms"
                type="checkbox"
              />
              <label
                className="text-sm text-muted-foreground leading-tight"
                htmlFor="terms"
              >
                I confirm that I am at least 18 years old and I have read and
                agree to the{" "}
                <a href="#" className="text-primary hover:underline">
                  Terms of Service
                </a>
                .
              </label>
            </div>

            <button
              type="button"
              className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-base rounded-lg shadow-[0_0_15px_rgba(11,218,91,0.2)] hover:shadow-[0_0_20px_rgba(11,218,91,0.4)] transition-all transform active:scale-[0.99] flex items-center justify-center gap-2 mt-4"
            >
              Create Account{" "}
              <span className="material-symbols-outlined text-xl">
                arrow_forward
              </span>
            </button>

            <p className="text-center text-muted-foreground text-sm mt-6">
              Already a member?{" "}
              <Link
                href="/login"
                className="text-white font-bold hover:text-primary transition-colors ml-1"
              >
                Log In
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
