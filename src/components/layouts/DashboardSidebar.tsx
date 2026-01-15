"use client";

import logo from "@/assets/logo/logo.png";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAuth } from "@/hooks/useAuth";
import { ROUTES } from "@/lib/constants";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import { cn } from "@/lib/utils";
import {
  BarChart2,
  History,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageCircle,
  Settings,
  Trophy,
  Users,
  Wallet,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function DashboardSidebar() {
  const pathname = usePathname();
  const { logout } = useAuth();
  const { t } = useTranslation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navigationItems = [
    {
      icon: LayoutDashboard,
      label: t("dashboard.menu.dashboard"),
      href: ROUTES.DASHBOARD,
    },
    { icon: Trophy, label: t("dashboard.menu.myBets"), href: ROUTES.MY_BETS },
    { icon: Wallet, label: t("dashboard.menu.wallet"), href: ROUTES.WALLET },
    {
      icon: History,
      label: t("dashboard.menu.transactions"),
      href: ROUTES.TRANSACTIONS,
    },
    { icon: Users, label: t("dashboard.menu.friends"), href: ROUTES.FRIENDS },
    {
      icon: MessageCircle,
      label: t("dashboard.menu.message"),
      href: ROUTES.MESSAGES,
    },
    {
      icon: BarChart2,
      label: t("dashboard.menu.statistics"),
      href: ROUTES.STATISTICS || "/statistics",
    },
    {
      icon: Settings,
      label: t("dashboard.menu.settings"),
      href: ROUTES.SETTINGS,
    },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-64 h-screen sticky top-0 bg-card dark:bg-background border-r border-border">
        <div className="flex flex-col h-full bg-card dark:bg-background text-card-foreground ">
          {/* Logo Area */}
          <div className="p-6 border-b border-border">
            <Link href={ROUTES.HOME} className="flex items-center gap-2">
              <Image
                src={logo}
                alt="Logo"
                width={120}
                height={120}
                className="mx-auto rounded-xl"
              />
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                pathname === item.href || pathname.startsWith(item.href + "/");

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group relative overflow-hidden",
                    isActive
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  {isActive && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-r-full" />
                  )}
                  <Icon
                    className={cn(
                      "w-5 h-5 transition-colors",
                      isActive ? "text-primary" : "group-hover:text-foreground"
                    )}
                  />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Bottom Area */}
          <div className="p-4 border-t border-border">
            <button
              onClick={logout}
              className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span>{t("dashboard.menu.logout")}</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar Trigger */}
      <div className="lg:hidden p-4 sticky top-0 z-50 bg-background border-b border-border flex items-center justify-between">
        <Link href={ROUTES.HOME} className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <Trophy className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="font-bold text-foreground">BetPro BD</span>
        </Link>
        <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="text-foreground hover:bg-muted"
            >
              <Menu className="w-6 h-6" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="p-0 border-r border-border w-64 bg-card dark:bg-background"
          >
            <div className="flex flex-col h-full bg-card dark:bg-background text-card-foreground ">
              {/* Logo Area */}
              <div className="p-6 border-b border-border">
                <Link href={ROUTES.HOME} className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <Trophy className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <h1 className="text-xl font-bold tracking-tight text-foreground">
                    BetPro BD
                  </h1>
                </Link>
              </div>

              {/* Navigation */}
              <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-1">
                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  const isActive =
                    pathname === item.href ||
                    pathname.startsWith(item.href + "/");

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsMobileOpen(false)}
                      className={cn(
                        "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group relative overflow-hidden",
                        isActive
                          ? "bg-primary/10 text-primary font-medium"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      )}
                    >
                      {isActive && (
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-r-full" />
                      )}
                      <Icon
                        className={cn(
                          "w-5 h-5 transition-colors",
                          isActive
                            ? "text-primary"
                            : "group-hover:text-foreground"
                        )}
                      />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </nav>

              {/* Bottom Area */}
              <div className="p-4 border-t border-border">
                <button
                  onClick={logout}
                  className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  <span>{t("dashboard.menu.logout")}</span>
                </button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
