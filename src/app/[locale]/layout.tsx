import AuthModal from "@/components/auth/AuthModal";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import UserInitializer from "@/components/shared/UserInitializer";
import { LanguageProvider } from "@/i18n/LanguageContext";
import { ReduxProvider } from "@/redux/provider";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Toaster } from "@/components/ui/sonner";

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

export default async function LocaleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const messages = await getMessages();

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <NextIntlClientProvider messages={messages}>
        <LanguageProvider>
          <ReduxProvider>
            <UserInitializer>
              {children}
              <AuthModal />
              <Toaster position="top-center" />
            </UserInitializer>
          </ReduxProvider>
        </LanguageProvider>
      </NextIntlClientProvider>
    </ThemeProvider>
  );
}
