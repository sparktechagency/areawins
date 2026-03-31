import type { Metadata } from "next";
import { Work_Sans } from "next/font/google";
import "./globals.css";

const workSans = Work_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-work-sans",
});

export const metadata: Metadata = {
  title: "AreaWins - Your Premier Sports Betting Platform",
  description:
    "Place bets on football, cricket, basketball, and more. Live betting, competitive odds, and instant payouts.",
  keywords:
    "sports betting, live betting, football betting, cricket betting, online gambling",
  openGraph: {
    title: "AreaWins - Your Premier Sports Betting Platform",
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
        className={`${workSans.className}  ${workSans.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
