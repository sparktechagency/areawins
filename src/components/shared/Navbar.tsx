"use client";
import logo from "@/assets/logo/logo.png";

import { AnimatedDropdown } from "@/components/shared/AnimatedDropdown";
import { UserMenu } from "@/components/shared/UserMenu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import { clearAuth } from "@/lib/redux/features/authSlice";
import { openAuthModal } from "@/lib/redux/features/authUiSlice";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import {
  Globe,
  HelpCircle,
  Home,
  LayoutDashboard,
  LogOut,
  Menu,
  TrendingUp,
  Trophy,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import DarkModeToggle from "../ui/dark-mode-toggle";
import { ROUTES } from "@/lib/constants";

const MobileUserMenu = ({ onClose }: { onClose: () => void }) => {
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(clearAuth());
    onClose();
  };

  if (!isAuthenticated) return null;

  return (
    <div className="border-t border-border mt-2 pt-2 space-y-2">
      <div className="px-4 py-2 flex items-center gap-3">
        <Avatar className="h-10 w-10 border border-border">
          <AvatarFallback className="bg-primary/10 text-primary font-bold">
            {user?.firstName?.[0]}
            {user?.lastName?.[0]}
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="text-sm font-bold">{user?.username}</p>
          <p className="text-xs text-muted-foreground">{user?.email}</p>
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

const Navbar = () => {
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const { t, language, setLanguage } = useTranslation();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Check if current page is home page - using pathname directly
  const isHomePage = pathname === "/" || pathname === "/home";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: t("navbar.home"), href: "/", icon: Home },
    { label: t("navbar.matches"), href: "/matches", icon: Trophy },
    { label: t("navbar.market"), href: "/market", icon: TrendingUp },
    { label: t("navbar.friends"), href: "/friends", icon: Users },
    { label: t("navbar.support"), href: "/support", icon: HelpCircle },
  ];

  const languageItems = [
    { label: "English", onClick: () => setLanguage("en") },
    { label: "Español", onClick: () => setLanguage("es") },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 px-4 py-5 transition-all duration-300 ${
          isHomePage
            ? scrolled
              ? "bg-white/80 dark:bg-black/20 backdrop-blur-lg shadow-sm h-20 flex justify-center items-center"
              : "bg-transparent h-20 flex justify-center items-center"
            : "bg-white/80 dark:bg-background/80 backdrop-blur-lg shadow-sm"
        }`}
      >
        <div className="container mx-auto flex items-center justify-between gap-5">
          {/* Logo */}
          <Link href={ROUTES.HOME} className="block">
            <Image
              src={logo}
              alt="Logo"
              width={150}
              height={120}
              className="rounded-xl"
            />
          </Link>

          {/* Navigation Links for Non-Home Pages OR Search for Home Page */}
          {isHomePage ? (
            <div className="w-full max-w-xl hidden md:block">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search"
                  className={`w-full px-4 py-2 rounded-full transition-all duration-300 ${
                    scrolled
                      ? "bg-white/20 dark:bg-black/20 border-border text-white placeholder:text-white"
                      : "bg-white/20 dark:bg-black/20 text-white border-white/30 placeholder:text-white"
                  } border outline-none`}
                />
              </div>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-2 bg-transparent backdrop-blur-sm rounded-full px-2 py-1 border border-border">
              {navLinks.map((link) => {
                const IconComponent = link.icon;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full hover:bg-background/80 dark:hover:bg-primary/10 hover:shadow-sm transition-all cursor-pointer group ${
                      pathname === link.href ? "bg-primary/10 text-primary" : ""
                    }`}
                  >
                    <IconComponent className="w-4 h-4 text-muted-foreground group-hover:scale-110 transition-transform" />
                    <span className="font-medium text-sm">{link.label}</span>
                  </Link>
                );
              })}
            </div>
          )}

          {/* Right Side */}
          <div className="flex items-center justify-end gap-3 md:gap-4">
            <div className={`${isHomePage ? "text-white" : "text-foreground"}`}>
              <DarkModeToggle />
            </div>

            <div className="hidden md:block">
              <AnimatedDropdown
                trigger={
                  <button
                    className={`flex items-center gap-1  cursor-pointer text-sm font-medium transition-colors ${
                      isHomePage ? "text-white" : "text-foreground "
                    }`}
                  >
                    <Globe className="w-4 h-4" />
                    {language === "en" ? "English" : "Español"}
                  </button>
                }
                items={languageItems}
                width="w-32"
              />
            </div>

            <div className="hidden md:block">
              <UserMenu isHomePage={isHomePage} scrolled={scrolled} />
            </div>

            {/* Mobile Menu Button */}
            <button
              className={`md:hidden ml-4 ${
                isHomePage && !scrolled ? "text-white" : "text-foreground"
              }`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 bg-background/95 backdrop-blur-md rounded-lg border border-border p-4 space-y-2 shadow-xl absolute top-full left-0 right-0 mx-4">
            <div className="flex justify-between items-center mb-2 px-2">
              <span className="text-sm font-bold text-muted-foreground">
                Menu
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMenuOpen(false)}
              >
                Close
              </Button>
            </div>
            {navLinks.map((link) => {
              const IconComponent = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 hover:bg-muted rounded-lg transition-all font-medium ${
                    pathname === link.href
                      ? "bg-primary/10 text-primary"
                      : "text-foreground"
                  }`}
                >
                  <IconComponent className="w-5 h-5" />
                  <span>{link.label}</span>
                </Link>
              );
            })}

            {/* Mobile Language Switcher */}
            <div className="flex gap-2 px-4 py-2 border-t border-border mt-2">
              <Button
                variant={language === "en" ? "default" : "outline"}
                size="sm"
                onClick={() => setLanguage("en")}
              >
                English
              </Button>
              <Button
                variant={language === "es" ? "default" : "outline"}
                size="sm"
                onClick={() => setLanguage("es")}
              >
                Español
              </Button>
            </div>

            {!isAuthenticated ? (
              <div className="pt-2 border-t border-border mt-2 space-y-2">
                <div className="block w-full">
                  <Button
                    variant="destructive"
                    className="w-full cursor-pointer"
                    onClick={() => {
                      setIsMenuOpen(false);
                      dispatch(openAuthModal({ view: "LOGIN" }));
                    }}
                  >
                    {t("navbar.signIn")}
                  </Button>
                </div>
              </div>
            ) : (
              <MobileUserMenu onClose={() => setIsMenuOpen(false)} />
            )}
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
