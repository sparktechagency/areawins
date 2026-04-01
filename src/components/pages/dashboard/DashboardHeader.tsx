"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import DarkModeToggle from "@/components/ui/dark-mode-toggle";
import { ROUTES } from "@/constants";
import { useTranslation } from "@/i18n/LanguageContext";
import { Link, usePathname } from "@/i18n/routing";
import { Bell, ChevronRight } from "lucide-react";
import { useAppSelector } from "@/redux/hooks";

export default function DashboardHeader() {
  const pathname = usePathname();
  const { t } = useTranslation();
  const { user } = useAppSelector((state) => state.auth);

  // Generate breadcrumbs from pathname
  const pathSegments = pathname.split("/").filter(Boolean);
  const breadcrumbs = pathSegments.map((segment, index) => {
    const href = "/" + pathSegments.slice(0, index + 1).join("/");
    const label =
      segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " ");
    return { href, label };
  });

  return (
    <header className="w-full py-[22px] border-b border-border sticky top-0 z-40 bg-background">
      <div className="w-full h-full flex items-center justify-between px-4 lg:px-8">
        {/* Left Side: Breadcrumbs */}
        <div className="hidden md:flex items-center text-sm text-muted-foreground">
          <Link
            href={ROUTES.HOME}
            className="hover:text-foreground transition-colors"
          >
            {t("dashboardHeader.home")}
          </Link>
          {breadcrumbs.map((crumb, index) => (
            <div key={crumb.href} className="flex items-center">
              <ChevronRight className="w-4 h-4 mx-2" />
              <Link
                href={crumb.href}
                className={`hover:text-foreground transition-colors ${
                  index === breadcrumbs.length - 1
                    ? "text-foreground font-medium"
                    : ""
                }`}
              >
                {crumb.label}
              </Link>
            </div>
          ))}
        </div>

        {/* Right Side: Actions */}
        <div className="flex items-center gap-4 ml-auto">
          {/* Theme Toggle */}
          <div className="text-foreground">
            <DarkModeToggle />
          </div>

          <Link href={ROUTES.WALLET_DEPOSIT || "/wallet/deposit"}>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20">
              {t("dashboardHeader.deposit")}
            </Button>
          </Link>

          <Button
            variant="ghost"
            size="icon"
            className="relative text-muted-foreground hover:text-foreground"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-background" />
          </Button>

          <div className="flex items-center gap-3 pl-4 border-l">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium leading-none">
                {user?.fullName?.split(" ")[0] || t("dashboardHeader.user")}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {t("dashboardHeader.proBettor")}
              </p>
            </div>
            <Avatar className="w-9 h-9 border-2 border-primary/20">
              <AvatarImage src={user?.profileImage} />
              <AvatarFallback className="bg-primary/10 text-primary font-bold">
                {user?.fullName?.[0] || t("dashboardHeader.user")[0]}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </header>
  );
}
