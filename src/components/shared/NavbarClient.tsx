"use client";
import logo from "@/assets/logo/logo.png";
import { AnimatedDropdown } from "@/components/shared/AnimatedDropdown";
import { IUser } from "@/interfaces/user.interface";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import { Link, usePathname } from "@/lib/i18n/routing";
import { openAuthModal } from "@/lib/redux/features/authUiSlice";
import { useAppDispatch } from "@/lib/redux/hooks";
import {
  Globe,
  HelpCircle,
  Home,
  Menu,
  TrendingUp,
  Trophy,
  Users,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Button } from "../ui/button";
import DarkModeToggle from "../ui/dark-mode-toggle";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import MobileUserMenu from "./MobileUserMenu";
import { UserMenu } from "./UserMenu";

const NavbarClient = ({ user }: { user: IUser | null }) => {
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const { t, language, setLanguage } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
        className="fixed inset-x-0 top-0 z-50 h-20  bg-background/95 supports-backdrop-filter:backdrop-blur-sm md:bg-white/80 md:dark:bg-background/80 md:supports-backdrop-filter:backdrop-blur-lg transform-[translateZ(0)] backface-hidden will-change-transform flex items-center justify-center"
      >
        <div className="container mx-auto flex items-center justify-between gap-5 px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link href="/" className="block">
            <Image
              src={logo}
              alt="Logo"
              width={150}
              height={120}
              className="rounded-xl"
            />
          </Link>

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

          {/* Right Side */}
          <div className="flex items-center justify-end gap-3 md:gap-4">
            <div className="text-foreground">
              <DarkModeToggle />
            </div>

            <div className="hidden md:block">
              <AnimatedDropdown
                trigger={
                  <button
                    className={`flex items-center gap-1 cursor-pointer text-sm font-medium transition-colors text-foreground`}
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
              {user ? (
                <UserMenu user={user} />
              ) : (
                <Button
                  onClick={() => dispatch(openAuthModal({ view: "LOGIN" }))}
                  variant="default"
                  className="transition-all duration-300 cursor-pointer"
                >
                  {t("navbar.login")}
                </Button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <button
                  className="md:hidden ml-4 text-foreground"
                  aria-label="Toggle menu"
                >
                  <Menu className="w-6 h-6" />
                </button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-64 border-l border-border bg-card dark:bg-background p-0 data-[state=open]:duration-300 data-[state=closed]:duration-200"
              >
                <SheetHeader className="px-5 py-4 border-b border-border text-left">
                  <SheetTitle className="text-base font-bold">Menu</SheetTitle>
                </SheetHeader>

                <div className="p-4 space-y-2">
                  {navLinks.map((link) => {
                    const IconComponent = link.icon;
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setIsMenuOpen(false)}
                        className={`flex items-center gap-3 h-12 px-4 rounded-lg transition-all text-base font-medium ${
                          pathname === link.href
                            ? "bg-primary/10 text-primary"
                            : "text-foreground hover:bg-muted"
                        }`}
                      >
                        <IconComponent className="w-5 h-5 shrink-0" />
                        <span>{link.label}</span>
                      </Link>
                    );
                  })}

                  <div className="flex gap-2 pt-3 border-t border-border mt-3">
                    <Button
                      variant={language === "en" ? "default" : "outline"}
                      size="sm"
                      className="flex-1"
                      onClick={() => setLanguage("en")}
                    >
                      English
                    </Button>
                    <Button
                      variant={language === "es" ? "default" : "outline"}
                      size="sm"
                      className="flex-1"
                      onClick={() => setLanguage("es")}
                    >
                      Español
                    </Button>
                  </div>

                  {!user ? (
                    <div className="pt-3 border-t border-border mt-3">
                      <Button
                        variant="destructive"
                        className="w-full h-11 cursor-pointer text-sm"
                        onClick={() => {
                          setIsMenuOpen(false);
                          dispatch(openAuthModal({ view: "LOGIN" }));
                        }}
                      >
                        {t("navbar.signIn")}
                      </Button>
                    </div>
                  ) : (
                    <MobileUserMenu
                      user={user}
                      onClose={() => setIsMenuOpen(false)}
                    />
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavbarClient;
