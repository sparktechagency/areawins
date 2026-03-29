"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import { Link } from "@/lib/i18n/routing";
import { cn } from "@/lib/utils";
import {
  ChevronDown,
  ChevronUp,
  Clock3,
  Headset,
  Mail,
  MessageCircle,
  Phone,
} from "lucide-react";
import { useState } from "react";

const SupportPage = () => {
  const { t } = useTranslation();
  const [activeFaq, setActiveFaq] = useState<string | null>("response");

  const faqs = [
    { id: "response", q: t("supportPage.faq1Q"), a: t("supportPage.faq1A") },
    {
      id: "verification",
      q: t("supportPage.faq2Q"),
      a: t("supportPage.faq2A"),
    },
    { id: "payments", q: t("supportPage.faq3Q"), a: t("supportPage.faq3A") },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground pb-16">
      <section className="relative overflow-hidden border-b border-border bg-linear-to-b from-primary/5 via-card/50 to-background pt-24 pb-12 px-4 sm:px-6 lg:px-12 xl:px-16">
        <div className="absolute -top-16 -right-16 size-56 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-20 -left-16 size-64 rounded-full bg-primary/10 blur-3xl" />
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-primary">
            <Headset className="size-3.5" /> {t("supportPage.badge")}
          </div>
          <h1 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-black tracking-tight">
            {t("supportPage.title")}
          </h1>
          <p className="mt-3 max-w-2xl text-muted-foreground text-sm sm:text-base md:text-lg leading-relaxed">
            {t("supportPage.subtitle")}
          </p>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-3xl">
            <div className="rounded-xl border border-border bg-background/70 p-3">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                {t("supportPage.metric1Label")}
              </p>
              <p className="mt-1 text-lg font-bold text-primary">
                {t("supportPage.metric1Value")}
              </p>
            </div>
            <div className="rounded-xl border border-border bg-background/70 p-3">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                {t("supportPage.metric2Label")}
              </p>
              <p className="mt-1 text-lg font-bold text-primary">
                {t("supportPage.metric2Value")}
              </p>
            </div>
            <div className="rounded-xl border border-border bg-background/70 p-3">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                {t("supportPage.metric3Label")}
              </p>
              <p className="mt-1 text-lg font-bold text-primary">
                {t("supportPage.metric3Value")}
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-12 xl:px-16 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-8">
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card className="border-border shadow-none bg-card">
                <CardHeader>
                  <div className="w-11 h-11 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <CardTitle>{t("supportPage.liveChat")}</CardTitle>
                  <CardDescription>
                    {t("supportPage.liveChatDesc")}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    {t("supportPage.liveChatTime")}
                  </p>
                  <Button className="w-full">
                    {t("supportPage.startChat")}
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-border shadow-none bg-card">
                <CardHeader>
                  <div className="w-11 h-11 bg-blue-500/10 rounded-full flex items-center justify-center text-blue-500">
                    <Mail className="w-5 h-5" />
                  </div>
                  <CardTitle>{t("supportPage.emailUs")}</CardTitle>
                  <CardDescription>
                    {t("supportPage.emailUsDesc")}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    support@areawins.com
                  </p>
                  <Button variant="outline" className="w-full">
                    {t("supportPage.sendEmail")}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-2xl border border-border bg-card p-5">
              <h3 className="text-lg font-bold mb-3">
                {t("supportPage.quickHelp")}
              </h3>
              <div className="space-y-2">
                {faqs.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-lg border border-border bg-background/70"
                  >
                    <button
                      onClick={() =>
                        setActiveFaq(activeFaq === item.id ? null : item.id)
                      }
                      className="w-full flex items-center justify-between p-3 text-left"
                    >
                      <span className="text-sm font-medium">{item.q}</span>
                      {activeFaq === item.id ? (
                        <ChevronUp className="w-4 h-4 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-muted-foreground" />
                      )}
                    </button>
                    <div
                      className={cn(
                        "grid transition-all duration-200",
                        activeFaq === item.id
                          ? "grid-rows-[1fr]"
                          : "grid-rows-[0fr]",
                      )}
                    >
                      <div className="overflow-hidden">
                        <p className="px-3 pb-3 text-sm text-muted-foreground leading-relaxed">
                          {item.a}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-5">
              <div className="flex items-center gap-2 text-primary mb-2">
                <Clock3 className="size-4" />
                <span className="text-sm font-semibold">
                  {t("supportPage.workingHours")}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                {t("supportPage.workingHoursDesc")}
              </p>
            </div>

            <div className="text-center pt-2">
              <p className="text-muted-foreground mb-3 text-sm">
                {t("supportPage.generalInfo")}
              </p>
              <div className="flex justify-center gap-4">
                <Link
                  href="/terms"
                  className="text-primary hover:underline text-sm"
                >
                  {t("supportPage.terms")}
                </Link>
                <span className="text-border">|</span>
                <Link
                  href="/privacy"
                  className="text-primary hover:underline text-sm"
                >
                  {t("supportPage.privacy")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportPage;
