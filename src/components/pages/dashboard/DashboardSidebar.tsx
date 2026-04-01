"use client";

import logo from "@/assets/logo/areawins.png";
import { Button } from "@/components/ui/button";
import DarkModeToggle from "@/components/ui/dark-mode-toggle";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { clearUser } from "@/lib/redux/features/authSlice";
import { openAuthModal } from "@/lib/redux/features/authUiSlice";
import { useAppDispatch } from "@/lib/redux/hooks";
import { ROUTES } from "@/lib/constants";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import { Link, usePathname } from "@/lib/i18n/routing";
import { cn } from "@/lib/utils";
import {
  History,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageCircle,
  Settings,
  Trophy,
  User,
  Users,
  Wallet,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function DashboardSidebar() {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
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
    {
      icon: Users,
      label: t("dashboard.menu.referral_friends"),
      href: ROUTES.REFERRAL_FRIENDS,
    },
    {
      icon: MessageCircle,
      label: t("dashboard.menu.message"),
      href: ROUTES.MESSAGES,
    },
    {
      icon: User,
      label: t("dashboard.menu.profile"),
      href: ROUTES.PROFILE,
    },
    {
      icon: Settings,
      label: t("dashboard.menu.settings"),
      href: ROUTES.SETTINGS,
    },
  ];

  const handleLogout = () => {
    dispatch(clearUser());
    dispatch(openAuthModal({ view: "LOGIN" }));
  };

  const isRouteActive = (href: string) => {
    if (href === ROUTES.DASHBOARD) {
      return pathname === href;
    }

    return pathname === href || pathname.startsWith(href + "/");
  };

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
                alt="Areawins Logo"
                width={150}
                height={50}
                className="mx-auto object-contain"
              />
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = isRouteActive(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group relative overflow-hidden",
                    isActive
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-muted-foreground hover:bg-primary/10 hover:text-foreground",
                  )}
                >
                  {isActive && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-r-full" />
                  )}
                  <Icon
                    className={cn(
                      "w-5 h-5 transition-colors",
                      isActive ? "text-primary" : "group-hover:text-foreground",
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
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors cursor-pointer"
            >
              <LogOut className="w-5 h-5" />
              <span>{t("dashboard.menu.logout")}</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar Trigger */}
      <div className="lg:hidden p-4 sticky top-0 z-50 bg-background border-b border-border flex items-center justify-between animate-in slide-in-from-top-full duration-300">
        <Link href={ROUTES.HOME} className="flex items-center gap-2">
          <Image
            src={logo}
            alt="Logo"
            width={120}
            height={120}
            className="mx-auto rounded-xl"
          />
        </Link>
        <div className="flex items-center gap-2">
          {/* Theme Toggle on Mobile */}
          <div className="text-foreground">
            <DarkModeToggle />
          </div>
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
              className="p-0 border-r border-border w-64 bg-card dark:bg-background animate-in slide-in-from-left duration-300"
            >
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
                    const isActive = isRouteActive(item.href);

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsMobileOpen(false)}
                        className={cn(
                          "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group relative overflow-hidden",
                          isActive
                            ? "bg-primary/10 text-primary font-medium"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground",
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
                              : "group-hover:text-foreground",
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
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors cursor-pointer"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>{t("dashboard.menu.logout")}</span>
                  </button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </>
  );
}
