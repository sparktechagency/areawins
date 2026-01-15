"use client";
import logo from "@/assets/logo/logo.png";
import logo2 from "@/assets/logo/logo2.png";
import { useAppDispatch } from "@/lib/redux/hooks";
import {
  HelpCircle,
  Home,
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

const Navbar = () => {
  const dispatch = useAppDispatch();
  const pathname = usePathname();
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

  // Navigation Links Data to ensure consistency
  const navLinks = [
    { label: "Home", href: "/", icon: Home },
    { label: "All Matches", href: "/matches", icon: Trophy },
    { label: "Bet Market", href: "/market", icon: TrendingUp },
    { label: "Friends", href: "/friends", icon: Users },
    { label: "Support", href: "/support", icon: HelpCircle },
  ];

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
            <div className="text-white">
              <DarkModeToggle />
            </div>
            <button
              className={`hidden md:block drop-shadow-md text-white transition-colors`}
            >
              English <span className="ml-1">›</span>
            </button>
            <Button
              onClick={() => dispatch(openAuthModal({ view: "LOGIN" }))}
              variant={scrolled ? "default" : "secondary"}
              className={`transition-all duration-300 ${
                !scrolled ? "bg-white text-primary hover:bg-white/90" : ""
              }`}
            >
              Login
            </Button>
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
          <button className="text-muted-foreground hidden md:block hover:text-foreground transition-colors text-sm">
            English <span className="ml-1">›</span>
          </button>
          <Button
            variant="default"
            className="px-8 hidden md:block"
            onClick={() => dispatch(openAuthModal({ view: "LOGIN" }))}
          >
            Login
          </Button>
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

      {/* Mobile Menu with Glassmorphism */}
      {isMenuOpen && (
        <div className="md:hidden mt-4 pb-4 bg-background/95 backdrop-blur-md rounded-lg border border-border p-4 space-y-2 shadow-xl">
          <div className="flex justify-end mb-2">
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
                SIGN IN
              </Button>
            </div>
            <Link
              href="/dashboard/my-bets"
              onClick={() => setIsMenuOpen(false)}
              className="block w-full"
            >
              <Button variant="default" className="w-full">
                My bets
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
