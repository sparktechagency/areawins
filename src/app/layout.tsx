import type { Metadata } from "next";
import { Oswald } from "next/font/google";
import "./globals.css";
import { ReduxProvider } from "@/lib/redux/provider";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "@/components/providers/ThemeProvider";

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-oswald",
});
// const antonio = Antonio({
//   subsets: ["latin"],
//   weight: ["400", "500", "600", "700"],
//   variable: "--font-oswald",
// });

export const metadata: Metadata = {
  title: "EASY BET - Your Premier Sports Betting Platform",
  description:
    "Place bets on football, cricket, basketball, and more. Live betting, competitive odds, and instant payouts.",
  keywords:
    "sports betting, live betting, football betting, cricket betting, online gambling",
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
        className={`${oswald.className} antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ReduxProvider>
            {children}
            <Toaster position="top-right" />
            <Sonner />
          </ReduxProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
