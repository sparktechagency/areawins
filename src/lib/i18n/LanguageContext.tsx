"use client";
import { useLocale } from "next-intl";
import React, { createContext, useContext } from "react";
import { routing, usePathname, useRouter } from "./routing";
import { translations } from "./translations";

type Language = (typeof routing.locales)[number];

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const language: Language = routing.locales.includes(locale as Language)
    ? (locale as Language)
    : routing.defaultLocale;

  const handleSetLanguage = (lang: Language) => {
    if (lang === language) return;
    router.replace(pathname, { locale: lang });
  };

  const t = (path: string) => {
    const keys = path.split(".");
    let current: unknown = translations[language];

    for (const key of keys) {
      if (
        typeof current !== "object" ||
        current === null ||
        !(key in current)
      ) {
        console.warn(
          `Translation missing for key: ${path} in language: ${language}`
        );
        return path;
      }
      current = (current as Record<string, unknown>)[key];
    }

    return typeof current === "string" ? current : path;
  };

  return (
    <LanguageContext.Provider
      value={{ language, setLanguage: handleSetLanguage, t }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export const useTranslation = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useTranslation must be used within a LanguageProvider");
  }
  return context;
};
