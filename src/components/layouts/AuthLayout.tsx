"use client";

/**
 * AuthLayout Component
 * Split-screen layout for authentication pages
 * Left: Stadium/sports background with logo
 * Right: Form content
 */

import { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex">
      {/* Left Side - Background Image with Logo */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-[#00D65C] to-[#00b84d] items-center justify-center p-12">
        {/* Dark overlay for better text visibility */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Content */}
        <div className="relative z-10 text-center text-white max-w-md">
          {/* Logo */}
          <h1 className="text-6xl font-bold mb-4">
            EASY BET
          </h1>

          {/* Tagline */}
          <p className="text-2xl mb-8 font-semibold">
            Bet Smart! Win Fair!
          </p>

          {/* Sports Icons */}
          <div className="flex justify-center gap-6 mb-8">
            <div className="text-5xl">⚽</div>
            <div className="text-5xl">🏀</div>
            <div className="text-5xl">🎾</div>
          </div>

          {/* Features */}
          <div className="space-y-3 text-left">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-sm">✓</span>
              </div>
              <span className="text-white/90">Live Betting on All Major Sports</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-sm">✓</span>
              </div>
              <span className="text-white/90">Instant Deposits & Withdrawals</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-sm">✓</span>
              </div>
              <span className="text-white/90">Secure & Trusted Platform</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form Content */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <h1 className="text-4xl font-bold text-primary mb-2">EASY BET</h1>
            <p className="text-gray-600">Bet Smart! Win Fair!</p>
          </div>

          {/* Form Content */}
          {children}
        </div>
      </div>
    </div>
  );
}
