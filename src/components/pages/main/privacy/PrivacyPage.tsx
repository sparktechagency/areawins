"use client";

import { Button } from "@/components/ui/button";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  Check,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  Download,
  Eye,
  ShieldCheck,
} from "lucide-react";
import React from "react";

const PrivacyPage = () => {
  const { t } = useTranslation();
  const [activeSection, setActiveSection] = React.useState("introduction");

  const sections = [
    { id: "introduction", label: t("privacy.sections.introduction") },
    { id: "data-collection", label: t("privacy.sections.dataCollection") },
    { id: "how-we-use", label: t("privacy.sections.howWeUse") },
    { id: "data-sharing", label: t("privacy.sections.dataSharing") },
    { id: "security", label: t("privacy.sections.security") },
    { id: "your-rights", label: t("privacy.sections.yourRights") },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveSection(id);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      {/* Page Header */}
      <div className="bg-card border-b border-border py-12 px-4 sm:px-6 lg:px-12 xl:px-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
          <div className="flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-wider mb-2">
            <ShieldCheck className="w-4 h-4" />
            {t("privacy.legalDocumentation")}
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 md:mb-4">
            {t("privacy.title")}
          </h1>
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-xs sm:text-sm mt-2">
            <span className="text-muted-foreground">
              {t("privacy.lastUpdated")}
            </span>
          </div>
        </div>
      </div>

      <div className="py-8 px-4 sm:px-6 lg:px-12 xl:px-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8">
        {/* Sidebar */}
        <aside className="hidden lg:block space-y-8 sticky top-24 h-fit">
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
              {t("privacy.contents")}
            </h3>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-2">
              {t("privacy.jumpToSection")}
            </p>
            <nav className="flex flex-col space-y-1">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={cn(
                    "flex items-center justify-between px-4 py-3 text-sm font-medium rounded-lg transition-colors text-left",
                    activeSection === section.id
                      ? "bg-secondary text-primary"
                      : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
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

          <div>
            <Button
              variant="outline"
              className="w-full justify-center gap-2 border-border bg-transparent hover:bg-muted text-primary hover:text-primary"
            >
              <Download className="w-4 h-4" />
              {t("privacy.downloadPdf")}
            </Button>
          </div>
        </aside>

        {/* Content */}
        <div className="space-y-8">
          {/* Introduction */}
          <div id="introduction" className="space-y-6">
            <p className="text-muted-foreground text-lg leading-relaxed">
              {t("privacy.introParagraph")}
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Data Protection Card */}
              <div className="bg-card p-6 rounded-2xl border border-border">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center mb-4">
                  <Check className="w-4 h-4 text-primary-foreground stroke-3" />
                </div>
                <h3 className="text-foreground font-bold mb-2">
                  {t("privacy.dataProtectionTitle")}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {t("privacy.dataProtectionDesc")}
                </p>
              </div>
              {/* Transparency Card */}
              <div className="bg-card p-6 rounded-2xl border border-border">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Eye className="w-4 h-4 text-primary" />
                </div>
                <h3 className="text-foreground font-bold mb-2">{t("privacy.transparencyTitle")}</h3>
                <p className="text-sm text-muted-foreground">
                  {t("privacy.transparencyDesc")}
                </p>
              </div>
            </div>

            {/* Policy at a Glance */}
            <div className="bg-card rounded-2xl border border-border overflow-hidden">
              <div className="p-6 border-b border-border">
                <h3 className="text-xl font-bold text-foreground">
                  {t("privacy.policyAtGlance")}
                </h3>
              </div>
              <div className="divide-y divide-border">
                <div className="p-6 grid md:grid-cols-[120px_1fr] gap-4">
                  <div className="text-sm text-muted-foreground font-medium">
                    {t("privacy.scope")}
                  </div>
                  <div className="text-sm text-foreground">
                    {t("privacy.scopeDesc")}
                  </div>
                </div>
                <div className="p-6 grid md:grid-cols-[120px_1fr] gap-4">
                  <div className="text-sm text-muted-foreground font-medium">
                    {t("privacy.consent")}
                  </div>
                  <div className="text-sm text-foreground">
                    {t("privacy.consentDesc")}
                  </div>
                </div>
                <div className="p-6 grid md:grid-cols-[120px_1fr] gap-4">
                  <div className="text-sm text-muted-foreground font-medium">
                    {t("privacy.updates")}
                  </div>
                  <div className="text-sm text-foreground">
                    {t("privacy.updatesDesc")}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-border my-8" />

          <h2 className="text-2xl font-bold text-foreground mb-6">
            {t("privacy.detailedProvisions")}
          </h2>

          {/* Information We Collect */}
          <section
            id="data-collection"
            className="bg-card border border-border rounded-2xl overflow-hidden"
          >
            <div className="p-6 flex items-center justify-between cursor-pointer hover:bg-muted/50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">
                  01
                </div>
                <h3 className="text-lg font-bold text-foreground">
                  {t("privacy.informationWeCollect")}
                </h3>
              </div>
              <ChevronUp className="w-5 h-5 text-muted-foreground" />
            </div>
            <div className="px-6 pb-6 pt-0">
              <p className="text-muted-foreground text-sm mb-4">
                {t("privacy.collectInfoIntro")}
              </p>
              <ul className="space-y-3">
                <li className="flex gap-3 text-sm text-muted-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                  <span>
                    <strong className="text-foreground">
                      {t("privacy.personalIdentification")}:
                    </strong>{" "}
                    {t("privacy.personalIdentificationDesc")}
                  </span>
                </li>
                <li className="flex gap-3 text-sm text-muted-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                  <span>
                    <strong className="text-foreground">{t("privacy.financialData")}:</strong>{" "}
                    {t("privacy.financialDataDesc")}
                  </span>
                </li>
                <li className="flex gap-3 text-sm text-muted-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                  <span>
                    <strong className="text-foreground">{t("privacy.technicalData")}:</strong>{" "}
                    {t("privacy.technicalDataDesc")}
                  </span>
                </li>
                <li className="flex gap-3 text-sm text-muted-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                  <span>
                    <strong className="text-foreground">{t("privacy.usageData")}:</strong>{" "}
                    {t("privacy.usageDataDesc")}
                  </span>
                </li>
              </ul>
            </div>
          </section>

          {/* Placeholder Sections for Accordion Style */}
          {[
            t("privacy.howWeUseInformation"),
            t("privacy.dataSharingDisclosure"),
            t("privacy.securityMeasures"),
          ].map((title, idx) => (
            <section
              key={idx}
              id={
                idx === 0
                  ? "how-we-use"
                  : idx === 1
                  ? "data-sharing"
                  : "security"
              }
              className="bg-card border border-border rounded-2xl overflow-hidden"
            >
              <div className="p-6 flex items-center justify-between cursor-pointer hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">
                    0{idx + 2}
                  </div>
                  <h3 className="text-lg font-bold text-foreground">{title}</h3>
                </div>
                <ChevronDown className="w-5 h-5 text-muted-foreground" />
              </div>
            </section>
          ))}

          {/* Your Rights */}
          <section
            id="your-rights"
            className="p-6 rounded-2xl bg-card border border-border"
          >
            <h3 className="text-xl font-bold text-foreground mb-4">
              {t("privacy.yourRights")}
            </h3>
            <p className="text-muted-foreground mb-6">
              {t("privacy.yourRightsDesc")}
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              <button className="flex items-center justify-between p-4 rounded-xl bg-background border border-border hover:border-primary group transition-colors">
                <span className="font-medium text-foreground">
                  {t("privacy.requestDataAccess")}
                </span>
                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </button>
              <button className="flex items-center justify-between p-4 rounded-xl bg-background border border-border hover:border-primary group transition-colors">
                <span className="font-medium text-foreground">
                  {t("privacy.deleteMyAccount")}
                </span>
                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </button>
            </div>
          </section>

          {/* Contact DPO */}
          <div className="bg-background border border-border rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold text-foreground mb-2">
                {t("privacy.haveQuestions")}
              </h3>
              <p className="text-muted-foreground">
                {t("privacy.dpoHelp")}
              </p>
            </div>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-8">
              {t("privacy.contactDpo")}
            </Button>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default PrivacyPage;
