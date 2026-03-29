"use client";

import logo from "@/assets/logo/logo.png";
import { ROUTES } from "@/lib/constants";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import { Link } from "@/lib/i18n/routing";
import { Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="w-full border-t border-border bg-linear-to-b from-background via-card/60 to-background text-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 py-14">
          <div className="space-y-4 lg:col-span-2">
            <Link href={ROUTES.HOME} className="block">
              <Image
                src={logo}
                alt="Logo"
                width={150}
                height={120}
                className="rounded-xl"
              />
            </Link>
            <p className="max-w-md text-sm text-muted-foreground leading-relaxed">
              {t("footer.tagline")}
            </p>
            <div className="grid sm:grid-cols-3 gap-3">
              <div className="rounded-xl border border-border bg-background/70 p-3">
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{t("footer.activeMarkets")}</p>
                <p className="mt-1 text-lg font-bold text-primary">24/7</p>
              </div>
              <div className="rounded-xl border border-border bg-background/70 p-3">
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{t("footer.supportLabel")}</p>
                <p className="mt-1 text-lg font-bold text-primary">24/7</p>
              </div>
              <div className="rounded-xl border border-border bg-background/70 p-3">
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{t("footer.payouts")}</p>
                <p className="mt-1 text-lg font-bold text-primary">{t("footer.instant")}</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-4 uppercase tracking-wider text-foreground">{t("footer.quickLinks")}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href={ROUTES.PRIVACY} className="text-muted-foreground hover:text-primary transition-colors">
                  {t("footer.privacy")}
                </Link>
              </li>
              <li>
                <Link href={ROUTES.ABOUT} className="text-muted-foreground hover:text-primary transition-colors">
                  {t("footer.about")}
                </Link>
              </li>
              <li>
                <Link href={ROUTES.CONTACT} className="text-muted-foreground hover:text-primary transition-colors">
                  {t("footer.contact")}
                </Link>
              </li>
              <li>
                <Link href={ROUTES.TERMS} className="text-muted-foreground hover:text-primary transition-colors">
                  {t("footer.terms")}
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-semibold mb-4 uppercase tracking-wider text-foreground">{t("footer.contactInfo")}</h3>
            <p className="text-sm text-muted-foreground flex items-center gap-2">
              <Mail className="w-4 h-4 text-primary" />
              support@areawins.com
            </p>
            <p className="text-sm text-muted-foreground flex items-center gap-2">
              <Phone className="w-4 h-4 text-primary" />
              +1 800-123-4567
            </p>
            <p className="text-sm text-muted-foreground flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" />
              {t("footer.locationValue")}
            </p>
            <p className="text-xs text-muted-foreground mt-5">{t("footer.joinText")}</p>
          </div>
        </div>

        <div className="border-t border-border py-5 text-center text-xs text-muted-foreground">
          {t("footer.copyright")}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
