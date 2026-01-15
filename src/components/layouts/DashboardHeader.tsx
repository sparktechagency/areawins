"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/lib/constants";
import { Bell, ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardHeader() {
  const pathname = usePathname();
  // const { user } = useAuth();
  const user = {
    firstName: "Rakib",
    lastName: "Hassan",
    avatar: "",
    role: "User",
  }; // Mock user

  // Generate breadcrumbs from pathname
  const pathSegments = pathname.split("/").filter(Boolean);
  const breadcrumbs = pathSegments.map((segment, index) => {
    const href = "/" + pathSegments.slice(0, index + 1).join("/");
    const label =
      segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " ");
    return { href, label };
  });

  return (
    <header className="w-full py-[14px] border-b border-border sticky top-0 z-40 bg-background">
      <div className="w-full h-full flex items-center justify-between px-4">
        {/* Left Side: Breadcrumbs */}
        <div className="hidden md:flex items-center text-sm text-muted-foreground">
          <Link
            href={ROUTES.HOME}
            className="hover:text-foreground transition-colors"
          >
            Home
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

        {/* Mobile menu handled by sidebar, so we just keep empty space or logic here if needed for independent header */}
        <div className="md:hidden">
          {/* Spacer or mobile logo if sidebar is separate */}
        </div>

        {/* Right Side: Actions */}
        <div className="flex items-center gap-4 ml-auto">
          <Link href={ROUTES.WALLET_DEPOSIT || "/wallet/deposit"}>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20">
              Deposit
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
                {user?.firstName || "User"}
              </p>
              <p className="text-xs text-muted-foreground mt-1">Pro Bettor</p>
            </div>
            <Avatar className="w-9 h-9 border-2 border-primary/20">
              <AvatarImage src={user?.avatar} />
              <AvatarFallback className="bg-primary/10 text-primary font-bold">
                {user?.firstName?.[0] || "U"}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </header>
  );
}
