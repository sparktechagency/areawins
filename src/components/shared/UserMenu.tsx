"use client";

import { AnimatedDropdown } from "@/components/shared/AnimatedDropdown";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import { clearAuth } from "@/lib/redux/features/authSlice";
import { openAuthModal } from "@/lib/redux/features/authUiSlice";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
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
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(clearAuth());
  };

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
      onClick: handleLogout,
      variant: "destructive" as const,
    },
  ];

  if (!isAuthenticated || !user) {
    return (
      <Button
        onClick={() => dispatch(openAuthModal({ view: "LOGIN" }))}
        variant={
          isHomePage && scrolled
            ? "default"
            : isHomePage
            ? "secondary"
            : "default"
        }
        className={`transition-all duration-300 ${
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
          <Avatar className="h-10 w-10 border border-border cursor-pointer">
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
