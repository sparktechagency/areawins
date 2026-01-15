"use client";
import logo from "@/assets/logo/logo.png";
import logo2 from "@/assets/logo/logo2.png";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
  User as UserIcon,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import DarkModeToggle from "../ui/dark-mode-toggle";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const { t, language, setLanguage } = useTranslation();
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);

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

  const handleLogout = () => {
    dispatch(clearAuth());
  };

  const navLinks = [
    { label: t("navbar.home"), href: "/", icon: Home },
    { label: t("navbar.matches"), href: "/matches", icon: Trophy },
    { label: t("navbar.market"), href: "/market", icon: TrendingUp },
    { label: t("navbar.friends"), href: "/friends", icon: Users },
    { label: t("navbar.support"), href: "/support", icon: HelpCircle },
  ];

  const LanguageSwitcher = () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={`flex items-center gap-1 text-sm font-medium transition-colors ${
            isHomePage && !scrolled
              ? "text-white hover:text-white/80"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Globe className="w-4 h-4" />
          {language === "en" ? "English" : "Español"}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setLanguage("en")}>
          English
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage("es")}>
          Español
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  const UserMenu = () => {
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
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-10 w-10 rounded-full">
            <Avatar className="h-10 w-10 border border-border">
              <AvatarImage src="/avatars/01.png" alt={user.username} />
              <AvatarFallback className="bg-primary/10 text-primary font-bold">
                {user.firstName?.[0]}
                {user.lastName?.[0]}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">
                {user.firstName} {user.lastName}
              </p>
              <p className="text-xs leading-none text-muted-foreground">
                {user.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link
              href="/dashboard"
              className="cursor-pointer flex items-center"
            >
              <LayoutDashboard className="mr-2 h-4 w-4" />
              {t("navbar.dashboard")}
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link
              href="/dashboard/my-bets"
              className="cursor-pointer flex items-center"
            >
              <Trophy className="mr-2 h-4 w-4" />
              {t("navbar.myBets")}
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link
              href="/dashboard/profile"
              className="cursor-pointer flex items-center"
            >
              <UserIcon className="mr-2 h-4 w-4" />
              Profile
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={handleLogout}
            className="text-destructive focus:text-destructive cursor-pointer"
          >
            <LogOut className="mr-2 h-4 w-4" />
            {t("navbar.logout")}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

  const MobileUserMenu = () => {
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
          onClick={() => setIsMenuOpen(false)}
          className="flex items-center gap-3 px-4 py-3 hover:bg-muted rounded-lg transition-all font-medium"
        >
          <LayoutDashboard className="w-5 h-5" />
          {t("navbar.dashboard")}
        </Link>
        <button
          onClick={() => {
            handleLogout();
            setIsMenuOpen(false);
          }}
          className="w-full flex items-center gap-3 px-4 py-3 hover:bg-muted rounded-lg transition-all font-medium text-destructive"
        >
          <LogOut className="w-5 h-5" />
          {t("navbar.logout")}
        </button>
      </div>
    );
  };

  if (isHomePage) {
    return (
      <nav
        className={`fixed top-0 h-20 flex justify-center items-center left-0 right-0 z-50 px-4 py-3 transition-all duration-300 ${
          scrolled
            ? "bg-white/80 dark:bg-black/20 backdrop-blur-lg shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto flex items-center justify-between gap-5">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src={scrolled ? logo2 : logo}
              alt="Logo"
              className="w-36 h-10 object-contain transition-all duration-300"
              priority
            />
          </Link>

          {/* Search Bar */}
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
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <Menu
                  className={`w-5 h-5 transition-colors duration-300 text-white`}
                />
              </button>
            </div>
          </div>

          {/* Right Side */}
          <div className="flex items-center justify-end gap-4">
            <div className={`${!scrolled ? "text-white" : ""}`}>
              <DarkModeToggle />
            </div>

            <LanguageSwitcher />

            <div className="hidden md:block">
              <UserMenu />
            </div>
          </div>
        </div>
      </nav>
    );
  }

  // Navbar for other pages
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-background/80 backdrop-blur-lg shadow-sm px-4 py-3 transition-all">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src={logo2}
            alt="Logo"
            className="w-36 h-10 object-contain"
            priority
          />
        </Link>

        {/* Navigation Links */}
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
        <div className="flex items-center gap-3">
          <DarkModeToggle />

          <div className="hidden md:block text-muted-foreground">
            <LanguageSwitcher />
          </div>

          <div className="hidden md:block">
            <UserMenu />
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground ml-4"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile Menu with Glassmorphism */}
      {isMenuOpen && (
        <div className="md:hidden mt-4 pb-4 bg-background/95 backdrop-blur-md rounded-lg border border-border p-4 space-y-2 shadow-xl">
          <div className="flex justify-between items-center mb-2">
            <LanguageSwitcher />
            <DarkModeToggle />
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

          {!isAuthenticated ? (
            <div className="pt-2 border-t border-border mt-2 space-y-2">
              <div className="block w-full">
                <Button
                  variant="destructive"
                  className="w-full"
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
            <MobileUserMenu />
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
