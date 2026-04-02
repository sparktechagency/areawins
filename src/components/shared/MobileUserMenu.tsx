"use client";
import { useTranslation } from "@/i18n/LanguageContext";
import { IUser } from "@/interfaces/user.interface";
import { LayoutDashboard, LogOut } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useLogoutMutation } from "@/redux/api/authApi";

interface MobileUserMenuProps {
  user: IUser;
  onClose: () => void;
}

const MobileUserMenu = ({ user, onClose }: MobileUserMenuProps) => {
  const { t } = useTranslation();
  const [logout] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logout({}).unwrap();
      onClose();
    } catch (error) {
      console.error("Logout failed:", error);
      onClose();
    }
  };

  return (
    <div className="border-t border-border mt-2 pt-2 space-y-2">
      <div className="px-4 py-2 flex items-center gap-3">
        <Avatar className="h-10 w-10 border border-border">
          <AvatarImage src={user.profileImage} alt={user.fullName} />
          <AvatarFallback className="bg-primary/10 text-primary font-bold">
            {user.fullName?.[0]}
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="text-sm font-bold">{user.nickname}</p>
          <p className="text-xs text-muted-foreground">{user.email}</p>
        </div>
      </div>
      <Link
        href="/dashboard"
        onClick={onClose}
        className="flex items-center gap-3 px-4 py-3 hover:bg-muted rounded-lg transition-all font-medium"
      >
        <LayoutDashboard className="w-5 h-5" />
        {t("navbar.dashboard")}
      </Link>
      <button
        onClick={handleLogout}
        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-muted rounded-lg transition-all font-medium text-destructive"
      >
        <LogOut className="w-5 h-5" />
        {t("navbar.logout")}
      </button>
    </div>
  );
};

export default MobileUserMenu;
