import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "Area Wins - Your Premier Sports Betting Platform",
  description:
    "Place bets on football, cricket, basketball, and more. Live betting, competitive odds, and instant payouts.",
  keywords:
    "sports betting, live betting, football betting, cricket betting, online gambling",
  openGraph: {
    title: "Area Wins  - Your Premier Sports Betting Platform",
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
      <body className={`${roboto.className}  ${roboto.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
