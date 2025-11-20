"use client";

/**
 * DashboardLayout Component
 * Layout for dashboard pages with balance header and sidebar navigation
 */

import { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Trophy,
  Wallet,
  User,
  Settings,
  Star,
  MessageSquare,
  Bell,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ROUTES } from "@/lib/constants";
import { useAuth } from "@/hooks/useAuth";
import { useWallet } from "@/hooks/useWallet";
import { formatCurrency } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface DashboardLayoutProps {
  children: ReactNode;
}

const navigationItems = [
  { icon: Home, label: "Dashboard", href: ROUTES.DASHBOARD },
  { icon: Trophy, label: "My Bets", href: ROUTES.MY_BETS },
  { icon: Wallet, label: "Wallet", href: ROUTES.WALLET },
  { icon: Star, label: "Favorites", href: ROUTES.FAVORITES },
  { icon: MessageSquare, label: "Messages", href: ROUTES.MESSAGES },
  { icon: Bell, label: "Notifications", href: ROUTES.NOTIFICATIONS },
  { icon: User, label: "Profile", href: ROUTES.PROFILE },
  { icon: Settings, label: "Settings", href: ROUTES.SETTINGS },
];

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const { wallet } = useWallet();

  return (
    <div className="min-h-screen bg-background">
      {/* Top Bar */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href={ROUTES.HOME} className="flex items-center">
              <h1 className="text-2xl font-bold text-primary">EASY BET</h1>
            </Link>

            {/* Balance Display */}
            <div className="flex items-center gap-6">
              <div className="text-right">
                <p className="text-3xl font-bold text-primary">
                  {formatCurrency(wallet?.balance || 0)}
                </p>
                <p className="text-sm text-gray-500">
                  Recent: {formatCurrency(wallet?.recentBalance || 0)}
                </p>
              </div>

              {/* User Avatar */}
              <Avatar className="w-10 h-10">
                <AvatarImage src={user?.avatar} />
                <AvatarFallback>
                  {user?.firstName?.[0] || user?.username?.[0] || "U"}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <aside className="lg:w-64">
            <nav className="space-y-1">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href || pathname.startsWith(item.href + "/");

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                      isActive
                        ? "bg-primary text-white"
                        : "text-gray-700 hover:bg-gray-100"
                    )}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}

              {/* Logout Button */}
              <button
                onClick={logout}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors w-full"
              >
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </nav>

            {/* Quick Actions */}
            <div className="mt-6 p-4 bg-white rounded-lg border">
              <h3 className="font-semibold mb-3">Quick Actions</h3>
              <div className="space-y-2">
                <Link href={ROUTES.WALLET_DEPOSIT}>
                  <Button size="sm" className="w-full bg-primary hover:bg-primary/90">
                    Deposit
                  </Button>
                </Link>
                <Link href={ROUTES.WALLET_WITHDRAW}>
                  <Button size="sm" variant="outline" className="w-full">
                    Withdraw
                  </Button>
                </Link>
              </div>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="flex-1">{children}</main>
        </div>
      </div>
    </div>
  );
}
