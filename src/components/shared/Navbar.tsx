"use client";
import React, { useState, useEffect } from "react";
import { Menu, ShoppingCart, Bell } from "lucide-react";
import { DarkModeToggle } from "@/components/ui/dark-mode-toggle";
import logo from "@/assets/logo/logo.png";
import logo2 from "@/assets/logo/logo2.png";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isHomePage, setIsHomePage] = useState(false);

  // Check if current page is home page
  useEffect(() => {
    const checkHomePage = () => {
      const path = window.location.pathname;
      setIsHomePage(path === "/" || path === "/home");
    };

    checkHomePage();

    // Listen for route changes
    window.addEventListener("popstate", checkHomePage);
    return () => window.removeEventListener("popstate", checkHomePage);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (isHomePage) {
    return (
      <nav
        className={`fixed top-0 h-20 flex justify-center items-center left-0 right-0 z-50 px-4 py-5  ${
          scrolled ? "bg-primary/10 backdrop-blur-lg" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto flex items-center justify-between gap-5">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image src={scrolled ? logo2 : logo} alt="Logo" />
          </Link>

          {/* Search Bar */}
          <div className="w-full max-w-xl hidden md:block ">
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                className={`w-full px-4 py-2 rounded-full ${
                  scrolled
                    ? "bg-background text-foreground border-border"
                    : "bg-white text-gray-900 border-white"
                } border  outline-none focus:outline-none `}
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <Menu className="text-muted-foreground w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Right Side */}
          <div className="flex items-center justify-end gap-4 ">
            <DarkModeToggle />
            <button className="text-white hidden md:block drop-shadow-md hover:text-green-300 transition-colors">
              English <span className="ml-1">›</span>
            </button>
            <Bell className="text-white w-6 h-6 cursor-pointer drop-shadow-md hover:text-green-300 transition-colors" />
            <button className="text-primary font-semibold hover:text-green-300 drop-shadow-md transition-colors">
              Login
            </button>
            <div className="relative">
              <ShoppingCart className="text-white w-6 h-6 cursor-pointer drop-shadow-md hover:text-green-300 transition-colors" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center shadow-lg">
                2
              </span>
            </div>
          </div>
        </div>
      </nav>
    );
  }
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-secondary backdrop-blur-lg border-b dark:border-gray-700/50 border-gray-200/50 px-4 py-3">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image src={logo2} alt="Logo" />
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-2 bg-gray-100/60 dark:bg-secondary backdrop-blur-sm rounded-full px-2 py-1 border dark:border-gray-700/50 border-gray-200/50">
          <button className="flex items-center gap-2 px-4 py-2 rounded-full hover:bg-white/90 dark:hover:bg-gray-700/90 hover:shadow-sm transition-all cursor-pointer">
            <span className="text-gray-600 dark:text-gray-300">🏠</span>
            <span className="text-gray-700 dark:text-gray-200">Home</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-full hover:bg-white/90 dark:hover:bg-gray-700/90 hover:shadow-sm transition-all cursor-pointer">
            <span className="text-gray-600 dark:text-gray-300">📺</span>
            <span className="text-gray-700 dark:text-gray-200">Live bets</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-full hover:bg-white/90 dark:hover:bg-gray-700/90 hover:shadow-sm transition-all cursor-pointer">
            <span className="text-gray-600 dark:text-gray-300">⚽</span>
            <span className="text-gray-700 dark:text-gray-200">All bets</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-full hover:bg-white/90 dark:hover:bg-gray-700/90 hover:shadow-sm transition-all cursor-pointer">
            <span className="text-gray-600 dark:text-gray-300">📊</span>
            <span className="text-gray-700 dark:text-gray-200">Bet Market</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-full hover:bg-white/90 dark:hover:bg-gray-700/90 hover:shadow-sm transition-all cursor-pointer">
            <span className="text-gray-600 dark:text-gray-300">❓</span>
            <span className="text-gray-700 dark:text-gray-200">Support</span>
          </button>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          <DarkModeToggle />
          <button className="text-gray-700 dark:text-gray-300 hidden md:block hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
            English <span className="ml-1">›</span>
          </button>
          <button className="bg-red-500 text-white px-6 py-2 rounded-full font-semibold hover:bg-red-600 hover:shadow-lg transition-all hidden md:block">
            SIGN IN
          </button>
          <button className="bg-green-500 text-white px-6 py-2 rounded-full font-semibold hover:bg-green-600 hover:shadow-lg transition-all">
            My bets
          </button>
          <button className="bg-gradient-to-r from-primary to-blue-400 text-white px-4 py-2 rounded-full font-semibold hover:from-green-500 hover:to-blue-500 hover:shadow-lg transition-all">
            Progressive bets
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700 ml-4"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile Menu with Glassmorphism */}
      {isMenuOpen && (
        <div className="md:hidden mt-4 pb-4 bg-white/60 dark:bg-gray-900/60 backdrop-blur-lg rounded-lg border dark:border-gray-700/50 border-gray-200/50 p-4 space-y-2">
          <div className="flex justify-end">
            <DarkModeToggle />
          </div>
          <button className="w-full text-left px-4 py-2 hover:bg-white/80 dark:hover:bg-gray-800/80 rounded-lg transition-all text-gray-700 dark:text-gray-300">
            🏠 Home
          </button>
          <button className="w-full text-left px-4 py-2 hover:bg-white/80 dark:hover:bg-gray-800/80 rounded-lg transition-all text-gray-700 dark:text-gray-300">
            📺 Live bets
          </button>
          <button className="w-full text-left px-4 py-2 hover:bg-white/80 dark:hover:bg-gray-800/80 rounded-lg transition-all text-gray-700 dark:text-gray-300">
            ⚽ All bets
          </button>
          <button className="w-full text-left px-4 py-2 hover:bg-white/80 dark:hover:bg-gray-800/80 rounded-lg transition-all text-gray-700 dark:text-gray-300">
            📊 Bet Market
          </button>
          <button className="w-full text-left px-4 py-2 hover:bg-white/80 dark:hover:bg-gray-800/80 rounded-lg transition-all text-gray-700 dark:text-gray-300">
            ❓ Support
          </button>
          <button className="w-full bg-red-500 text-white px-4 py-2 rounded-lg font-semibold mt-2 hover:bg-red-600 transition-all">
            SIGN IN
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
