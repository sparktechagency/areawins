"use client";

import { Button } from "@/components/ui/button";
import { useTranslation } from "@/i18n/LanguageContext";
import { cn } from "@/lib/utils";
import {
  Check,
  ChevronRight,
  Download,
  Lock,
  Printer,
  Shield,
} from "lucide-react";
import React from "react";

const TermsCondition = () => {
  const { t } = useTranslation();
  const [activeSection, setActiveSection] = React.useState("introduction");

  const sections = [
    { id: "introduction", label: `1. ${t("terms.introduction")}` },
    { id: "account-rules", label: `2. ${t("terms.accountRules")}` },
    {
      id: "deposits-withdrawals",
      label: `3. ${t("terms.depositsWithdrawals")}`,
    },
    { id: "betting-rules", label: `4. ${t("terms.bettingRules")}` },
    {
      id: "responsible-gaming",
      label: `5. ${t("terms.responsibleGaming")}`,
    },
    { id: "liability", label: `6. ${t("terms.liability")}` },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveSection(id);
    }
  };

  return (
    <div className="w-full min-h-screen bg-background text-foreground pt-16 md:pt-20 pb-12 px-4 sm:px-6 lg:px-12 xl:px-16">
      {/* Page Header */}
      <div className="bg-card border-b border-border py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 md:mb-4">
            {t("terms.title")}
          </h1>
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs sm:text-sm">
            <span className="bg-primary/20 text-primary px-2 py-1 rounded text-xs font-semibold">
              {t("terms.version")}
            </span>
            <span className="text-muted-foreground">
              {t("terms.lastUpdated")}
            </span>
          </div>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            {t("terms.introText")}
          </p>
        </div>
      </div>

      <div className="py-8 px-4 sm:px-6 lg:px-12 xl:px-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8">
          {/* Sidebar */}
          <aside className="hidden lg:block space-y-8 sticky top-24 h-fit">
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                {t("terms.tableOfContents")}
              </h3>
              <nav className="flex flex-col space-y-2">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={cn(
                      "flex items-center justify-between px-4 py-3 text-sm font-medium rounded-lg cursor-pointer transition-colors text-left",
                      activeSection === section.id
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-primary/10",
                    )}
                  >
                    {section.label}
                    {activeSection === section.id && (
                      <ChevronRight className="w-4 h-4" />
                    )}
                  </button>
                ))}
              </nav>
            </div>

            <div className="p-4 rounded-xl border border-border bg-card space-y-4">
              <div className="text-sm font-medium text-foreground">
                {t("terms.needCopy")}
              </div>
              <Button
                variant="outline"
                className="w-full justify-start gap-2 border-border bg-transparent hover:bg-muted text-muted-foreground"
              >
                <Download className="w-4 h-4" />
                {t("terms.downloadPdf")}
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start gap-2 border-border bg-transparent hover:bg-muted text-muted-foreground"
              >
                <Printer className="w-4 h-4" />
                {t("terms.printVersion")}
              </Button>
            </div>
          </aside>

          {/* Content */}
          <div className="space-y-8">
            {/* Introduction */}
            <section
              id="introduction"
              className="p-6 rounded-2xl bg-card border border-border"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">
                  01
                </div>
                <h2 className="text-xl font-bold text-foreground">
                  {t("terms.introduction")}
                </h2>
              </div>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>{t("terms.introP1")}</p>
                <p>{t("terms.introP2")}</p>
              </div>
            </section>

            {/* Account Rules */}
            <section
              id="account-rules"
              className="p-6 rounded-2xl bg-card border border-border"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">
                  02
                </div>
                <h2 className="text-xl font-bold text-foreground">
                  {t("terms.accountRulesVerification")}
                </h2>
              </div>
              <p className="text-muted-foreground mb-6">
                {t("terms.accountRulesDesc")}
              </p>
              <div className="grid gap-4">
                <div className="flex gap-4 p-4 rounded-xl bg-background border border-border">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0 mt-1">
                    <Check className="w-4 h-4 text-primary-foreground stroke-3" />
                  </div>
                  <div>
                    <h4 className="text-foreground font-bold mb-1">
                      {t("terms.oneAccountPolicy")}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {t("terms.oneAccountPolicyDesc")}
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 p-4 rounded-xl bg-background border border-border">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0 mt-1">
                    <Shield className="w-4 h-4 text-primary-foreground fill-current" />
                  </div>
                  <div>
                    <h4 className="text-foreground font-bold mb-1">
                      {t("terms.kycRequirement")}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {t("terms.kycRequirementDesc")}
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 p-4 rounded-xl bg-background border border-border">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0 mt-1">
                    <Lock className="w-4 h-4 text-primary-foreground fill-current" />
                  </div>
                  <div>
                    <h4 className="text-foreground font-bold mb-1">
                      {t("terms.security")}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {t("terms.securityDesc")}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Deposits */}
            <section
              id="deposits-withdrawals"
              className="p-6 rounded-2xl bg-card border border-border"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">
                  03
                </div>
                <h2 className="text-xl font-bold text-foreground">
                  {t("terms.depositsWithdrawalsUsd")}
                </h2>
              </div>
              <p className="text-muted-foreground mb-6">
                {t("terms.depositsWithdrawalsDesc")}
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-5 rounded-xl bg-background border-l-4 border-primary">
                  <h3 className="font-bold text-foreground mb-2">
                    {t("terms.deposits")}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {t("terms.depositsDesc")}
                  </p>
                </div>
                <div className="p-5 rounded-xl bg-background border-l-4 border-primary/50">
                  <h3 className="font-bold text-foreground mb-2">
                    {t("terms.withdrawals")}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {t("terms.withdrawalsDesc")}
                  </p>
                </div>
              </div>
            </section>

            {/* Betting Rules */}
            <section
              id="betting-rules"
              className="p-6 rounded-2xl bg-card border border-border"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">
                  04
                </div>
                <h2 className="text-xl font-bold text-foreground">
                  {t("terms.bettingRules")}
                </h2>
              </div>
              <div className="space-y-4 text-muted-foreground">
                <p>{t("terms.bettingRulesP1")}</p>
                <p>
                  <strong className="text-foreground">
                    {t("terms.lateBetsLabel")}
                  </strong>{" "}
                  {t("terms.lateBetsDesc")}
                </p>
              </div>
            </section>

            {/* Responsible Gaming */}
            <section
              id="responsible-gaming"
              className="p-6 rounded-2xl bg-card border border-border"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">
                  05
                </div>
                <h2 className="text-xl font-bold text-foreground">
                  {t("terms.responsibleGaming")}
                </h2>
              </div>
              <div className="bg-background rounded-xl p-6 border border-border">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Shield className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground text-lg mb-2">
                      {t("terms.playResponsibly")}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-6">
                      {t("terms.playResponsiblyDesc")}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-secondary text-xs font-medium text-muted-foreground rounded-full border border-border">
                        {t("terms.selfExclusion")}
                      </span>
                      <span className="px-3 py-1 bg-secondary text-xs font-medium text-muted-foreground rounded-full border border-border">
                        {t("terms.depositLimits")}
                      </span>
                      <span className="px-3 py-1 bg-secondary text-xs font-medium text-muted-foreground rounded-full border border-border">
                        {t("terms.realityChecks")}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsCondition;
