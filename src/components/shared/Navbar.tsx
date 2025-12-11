"use client";
import React, { useState, useEffect } from "react";
import { Search, Menu, ShoppingCart, Bell } from "lucide-react";
import { Input } from "../ui/input";
import logo from "@/assets/logo/logo.png";
import Image from "next/image";

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
    // Home Page Navbar - Transparent with Glassmorphism
    return (
      <nav
        className={`fixed top-0 h-20 flex justify-center items-center left-0 right-0 z-50 px-4 py-5 transition-all duration-300 ${
          scrolled
            ? "bg-white/20 backdrop-blur-lg border-b border-white/20"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto flex items-center justify-between gap-5">
          {/* Logo */}
          <div className="flex items-center">
            <Image src={logo} alt="Logo" />
          </div>

          {/* Search Bar */}
          <div className="w-full max-w-xl hidden md:block ">
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                className="w-full px-4 py-2 rounded-full bg-white border border-gray-300 outline-none focus:border focus:border-primary"
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <Menu className="text-gray-600 w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Right Side */}
          <div className="flex items-center justify-end gap-4 ">
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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200/50 shadow-sm px-4 py-3">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <span className="text-gray-800 text-2xl font-bold">
            EASY<span className="text-green-500">BET</span>
          </span>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-2 bg-gray-100/60 backdrop-blur-sm rounded-full px-2 py-1 border border-gray-200/50">
          <button className="flex items-center gap-2 px-4 py-2 rounded-full hover:bg-white/90 hover:shadow-sm transition-all">
            <span className="text-gray-600">🏠</span>
            <span className="text-gray-700 font-medium">Home</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-full hover:bg-white/90 hover:shadow-sm transition-all">
            <span className="text-gray-600">📺</span>
            <span className="text-gray-700 font-medium">Live bets</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-full hover:bg-white/90 hover:shadow-sm transition-all">
            <span className="text-gray-600">⚽</span>
            <span className="text-gray-700 font-medium">All bets</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-full hover:bg-white/90 hover:shadow-sm transition-all">
            <span className="text-gray-600">📊</span>
            <span className="text-gray-700 font-medium">Bet Market</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-full hover:bg-white/90 hover:shadow-sm transition-all">
            <span className="text-gray-600">❓</span>
            <span className="text-gray-700 font-medium">Support</span>
          </button>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          <button className="text-gray-700 hidden md:block hover:text-gray-900 transition-colors">
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
        <div className="md:hidden mt-4 pb-4 bg-white/60 backdrop-blur-lg rounded-lg border border-gray-200/50 p-4 space-y-2">
          <button className="w-full text-left px-4 py-2 hover:bg-white/80 rounded-lg transition-all">
            🏠 Home
          </button>
          <button className="w-full text-left px-4 py-2 hover:bg-white/80 rounded-lg transition-all">
            📺 Live bets
          </button>
          <button className="w-full text-left px-4 py-2 hover:bg-white/80 rounded-lg transition-all">
            ⚽ All bets
          </button>
          <button className="w-full text-left px-4 py-2 hover:bg-white/80 rounded-lg transition-all">
            📊 Bet Market
          </button>
          <button className="w-full text-left px-4 py-2 hover:bg-white/80 rounded-lg transition-all">
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
