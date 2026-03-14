"use client";

import { AnimatedDropdown } from "@/components/shared/AnimatedDropdown";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import {
  LayoutDashboard,
  LogOut,
  Trophy,
  User as UserIcon,
} from "lucide-react";

interface UserMenuProps {
  isHomePage?: boolean;
  scrolled?: boolean;
}

export const UserMenu = ({
  isHomePage = false,
  scrolled = false,
}: UserMenuProps) => {
  const { t } = useTranslation();
  const { user, logout } = useAuth();
  
  const userMenuItems = [
    {
      label: t("navbar.dashboard"),
      icon: <LayoutDashboard className="h-4 w-4" />,
      href: "/dashboard",
    },
    {
      label: t("navbar.myBets"),
      icon: <Trophy className="h-4 w-4" />,
      href: "/dashboard/my-bets",
    },
    {
      label: t("navbar.profile"),
      icon: <UserIcon className="h-4 w-4" />,
      href: "/dashboard/profile",
    },
    {
      label: t("navbar.logout"),
      icon: <LogOut className="h-4 w-4" />,
      onClick: logout,
      variant: "destructive" as const,
    },
  ];

  if (!user) {
    return (
      <Button
        onClick={() => logout()}
        variant={
          isHomePage && scrolled
            ? "default"
            : isHomePage
            ? "secondary"
            : "default"
        }
        className={`transition-all duration-300 cursor-pointer ${
          isHomePage && !scrolled
            ? "bg-white text-primary hover:bg-white/90"
            : ""
        }`}
      >
        {t("navbar.login")}
      </Button>
    );
  }

  return (
    <AnimatedDropdown
      trigger={
        <div className="flex items-center gap-2">
          <Avatar className="size-11 border border-border cursor-pointer">
            <AvatarImage src="/avatars/01.png" alt={user.username} />
            <AvatarFallback className="bg-primary/10 text-primary font-bold">
              {user.firstName?.[0]}
              {user.lastName?.[0]}
            </AvatarFallback>
          </Avatar>
        </div>
      }
      items={userMenuItems}
      width="w-56"
    />
  );
};
