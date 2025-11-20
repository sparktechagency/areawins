import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ReduxProvider } from "@/lib/redux/provider";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EASY BET - Your Premier Sports Betting Platform",
  description: "Place bets on football, cricket, basketball, and more. Live betting, competitive odds, and instant payouts.",
  keywords: "sports betting, live betting, football betting, cricket betting, online gambling",
  openGraph: {
    title: "EASY BET - Your Premier Sports Betting Platform",
    description: "Place bets on football, cricket, basketball, and more.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <ReduxProvider>
          {children}
          <Toaster position="top-right" />
          <Sonner />
        </ReduxProvider>
      </body>
    </html>
  );
}
