"use client";
import { AnimatedDropdown } from "@/components/shared/AnimatedDropdown";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { IUser } from "@/interfaces/user.interface";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import { deleteCookie } from "@/utils/tokenHandlers";
import {
  LayoutDashboard,
  LogOut,
  Trophy,
  User as UserIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";

interface UserMenuProps {
  user: IUser | null;
  isHomePage?: boolean;
  scrolled?: boolean;
}

export const UserMenu = ({
  user,
  isHomePage = false,
  scrolled = false,
}: UserMenuProps) => {
  const { t } = useTranslation();
  const router = useRouter();

  const handleLogout = () => {
    // Delete all authentication cookies
    deleteCookie("accessToken"); // accessToken
    deleteCookie("refreshToken"); // refreshToken
    deleteCookie("sessionId"); // sessionId
    deleteCookie("userRole"); // userRole

    // Redirect to home page
    router.push("/");
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

  if (!user) {
    return (
      <Button
        onClick={handleLogout}
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
            <AvatarImage src={user.profileImage} alt={user.fullName} />
            <AvatarFallback className="bg-primary/10 text-primary font-bold">
              {user.fullName?.[0]}
            </AvatarFallback>
          </Avatar>
        </div>
      }
      items={userMenuItems}
      width="w-56"
    />
  );
};
