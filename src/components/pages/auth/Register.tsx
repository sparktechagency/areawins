import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import logo from "@/assets/logo/logo2.png";

const Register: React.FC = () => {
  return (
    <div className="bg-background  text-foreground antialiased h-screen overflow-hidden flex flex-col lg:flex-row font-display">
      {/* Left Panel: Hero / Visuals */}
      <div className="hidden lg:flex flex-1 relative flex-col justify-between p-5 md:p-8 lg:p-12 bg-background overflow-hidden border-r border-border ">
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
        <div className="absolute bottom-0 left-0 right-0 p-5 md:p-10 lg:p-12 xl:p-16 z-10 flex flex-col justify-end h-full pointer-events-none">
          <div className="w-full max-w-2xl">
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
      {/* Right Panel: Registration Form */}
      <div className="w-full  max-w-4xl h-full overflow-y-auto bg-background p-5 md:p-12 lg:p-14 xl:p-16">
        <div className="min-h-full flex flex-col justify-center max-w-[640px] mx-auto">
          <div className="flex justify-center mb-8">
            <Link href="/" className="flex items-center gap-2 text-foreground">
              <Image width={150} height={100} src={logo.src} alt="Logo" />
            </Link>
          </div>

          <div className="mb-8 text-center sm:text-left">
            <h1 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight mb-2">
              Create Account
            </h1>
            <p className="text-muted-foreground text-base">
              Enter your details to get started with the best odds.
            </p>
          </div>
          <form className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <label className="flex flex-col gap-2">
                <span className="text-foreground text-sm font-medium">
                  Username
                </span>
                <Input
                  type="text"
                  placeholder="Username"
                  className="bg-input text-foreground"
                />
              </label>
              <label className="flex flex-col gap-2">
                <span className="text-foreground text-sm font-medium">
                  Country
                </span>
                <select className="w-full h-12 bg-input border border-border rounded-lg text-foreground focus:ring-1 focus:ring-primary focus:border-primary transition-all text-sm px-4">
                  <option value="BD">Bangladesh</option>
                  <option value="IN">India</option>
                </select>
              </label>
            </div>

            <label className="flex flex-col gap-2">
              <span className="text-foreground text-sm font-medium">
                Email Address
              </span>
              <Input
                type="email"
                placeholder="yourname@example.com"
                className="bg-input text-foreground"
              />
            </label>

            <label className="flex flex-col gap-2">
              <span className="text-foreground text-sm font-medium">
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
                  <select className="w-full pl-10 pr-2 h-12 bg-input border border-border rounded-lg text-foreground focus:ring-1 focus:ring-primary focus:border-primary transition-all text-sm appearance-none">
                    <option value="+880">+880</option>
                  </select>
                </div>
                <Input
                  type="tel"
                  placeholder="Your phone number"
                  className="bg-input text-foreground"
                />
              </div>
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <label className="flex flex-col gap-2">
                <span className="text-foreground text-sm font-medium">
                  Password
                </span>
                <Input
                  type="password"
                  placeholder="Password"
                  className="bg-input text-foreground"
                />
              </label>
              <label className="flex flex-col gap-2">
                <span className="text-foreground text-sm font-medium">
                  Confirm Password
                </span>
                <Input
                  type="password"
                  placeholder="Confirm Password"
                  className="bg-input text-foreground"
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
                className="text-foreground font-bold hover:text-primary transition-colors ml-1"
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
