/**
 * Footer Component
 * Site footer with company info, quick links, and contact details
 */

import Link from "next/link";
import { ROUTES, CONTACT_INFO, SOCIAL_LINKS } from "@/lib/constants";
import { Facebook, Twitter, Instagram, Youtube, Send } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-secondary text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold text-primary mb-4">EASY BETS</h3>
            <div className="space-y-2 text-white/70 text-sm">
              <p>+1 (252) 555-0126</p>
              <p>info@easybet.com</p>
              <p>1131 Hearts Desire Street,</p>
              <p>HN 83486</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-white/70 text-sm">
              <li>
                <Link href="/privacy" className="hover:text-primary transition">
                  Privacy policy
                </Link>
              </li>
              <li>
                <Link href={ROUTES.ABOUT} className="hover:text-primary transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link href={ROUTES.BETS} className="hover:text-primary transition">
                  Bets
                </Link>
              </li>
              <li>
                <Link href={ROUTES.CONTACT} className="hover:text-primary transition">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-primary transition">
                  Terms and conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Discover */}
          <div>
            <h4 className="font-semibold mb-4">Discover</h4>
            <ul className="space-y-2 text-white/70 text-sm">
              <li>
                <Link href={ROUTES.LIVE_EVENTS} className="hover:text-primary transition">
                  Live Bets
                </Link>
              </li>
              <li>
                <Link href={ROUTES.UPCOMING} className="hover:text-primary transition">
                  Live Games
                </Link>
              </li>
              <li>
                <Link href={ROUTES.FOOTBALL} className="hover:text-primary transition">
                  Live Suppliers
                </Link>
              </li>
              <li>
                <Link href={ROUTES.CRICKET} className="hover:text-primary transition">
                  New Supplier
                </Link>
              </li>
              <li>
                <Link href={ROUTES.MORE} className="hover:text-primary transition">
                  Casino
                </Link>
              </li>
              <li>
                <Link href={ROUTES.MORE} className="hover:text-primary transition">
                  More
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <div className="space-y-2 text-white/70 text-sm mb-6">
              <p>admin@easybetdigital.com</p>
              <p>+8801170012345</p>
              <p>Bangladesh</p>
            </div>

            {/* Social Links */}
            <div className="flex gap-3">
              <a
                href={SOCIAL_LINKS.FACEBOOK}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={SOCIAL_LINKS.TWITTER}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href={SOCIAL_LINKS.INSTAGRAM}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={SOCIAL_LINKS.YOUTUBE}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href={SOCIAL_LINKS.TELEGRAM}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition"
              >
                <Send className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/10 pt-6 text-center text-white/60 text-sm">
          <p>&copy; 2025 EASY BET. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
