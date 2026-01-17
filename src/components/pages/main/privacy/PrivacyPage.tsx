"use client";

import { Button } from "@/components/ui/button";
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
  const [activeSection, setActiveSection] = React.useState("introduction");

  const sections = [
    { id: "introduction", label: "Introduction" },
    { id: "data-collection", label: "Data Collection" },
    { id: "how-we-use", label: "How We Use It" },
    { id: "data-sharing", label: "Data Sharing" },
    { id: "security", label: "Security" },
    { id: "your-rights", label: "Your Rights" },
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
      <div className="bg-card border-b border-border py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-wider mb-2">
            <ShieldCheck className="w-4 h-4" />
            Legal Documentation
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Privacy Policy
          </h1>
          <div className="flex items-center gap-4 text-sm mt-2">
            <span className="text-muted-foreground">
              Last Updated: October 24, 2023
            </span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8">
        {/* Sidebar */}
        <aside className="hidden lg:block space-y-8 sticky top-24 h-fit">
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
              Contents
            </h3>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-2">
              Jump to section
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
              DOWNLOAD PDF
            </Button>
          </div>
        </aside>

        {/* Content */}
        <div className="space-y-8">
          {/* Introduction */}
          <div id="introduction" className="space-y-6">
            <p className="text-muted-foreground text-lg leading-relaxed">
              At <span className="text-primary font-bold">EasyBet</span>, your
              privacy is our priority. This policy outlines how we collect, use,
              and protect your personal data when you use our sports betting
              platform. We are committed to transparency and ensuring your
              information is handled securely and in accordance with applicable
              laws in Bangladesh and international standards.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Data Protection Card */}
              <div className="bg-card p-6 rounded-2xl border border-border">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center mb-4">
                  <Check className="w-4 h-4 text-primary-foreground stroke-[3]" />
                </div>
                <h3 className="text-foreground font-bold mb-2">
                  Data Protection
                </h3>
                <p className="text-sm text-muted-foreground">
                  We use advanced encryption to safeguard your personal and
                  financial data.
                </p>
              </div>
              {/* Transparency Card */}
              <div className="bg-card p-6 rounded-2xl border border-border">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Eye className="w-4 h-4 text-primary" />
                </div>
                <h3 className="text-foreground font-bold mb-2">Transparency</h3>
                <p className="text-sm text-muted-foreground">
                  You have full visibility and control over how your data is
                  processed.
                </p>
              </div>
            </div>

            {/* Policy at a Glance */}
            <div className="bg-card rounded-2xl border border-border overflow-hidden">
              <div className="p-6 border-b border-border">
                <h3 className="text-xl font-bold text-foreground">
                  Policy at a Glance
                </h3>
              </div>
              <div className="divide-y divide-border">
                <div className="p-6 grid md:grid-cols-[120px_1fr] gap-4">
                  <div className="text-sm text-muted-foreground font-medium">
                    Scope
                  </div>
                  <div className="text-sm text-foreground">
                    This policy applies to all registered users, visitors, and
                    affiliates using the EasyBet web and mobile applications.
                  </div>
                </div>
                <div className="p-6 grid md:grid-cols-[120px_1fr] gap-4">
                  <div className="text-sm text-muted-foreground font-medium">
                    Consent
                  </div>
                  <div className="text-sm text-foreground">
                    By creating an account, you consent to the data practices
                    described in this document.
                  </div>
                </div>
                <div className="p-6 grid md:grid-cols-[120px_1fr] gap-4">
                  <div className="text-sm text-muted-foreground font-medium">
                    Updates
                  </div>
                  <div className="text-sm text-foreground">
                    We may update this policy periodically. Significant changes
                    will be notified via email.
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-border my-8" />

          <h2 className="text-2xl font-bold text-foreground mb-6">
            Detailed Provisions
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
                  Information We Collect
                </h3>
              </div>
              <ChevronUp className="w-5 h-5 text-muted-foreground" />
            </div>
            <div className="px-6 pb-6 pt-0">
              <p className="text-muted-foreground text-sm mb-4">
                To provide our betting services, we collect several types of
                information:
              </p>
              <ul className="space-y-3">
                <li className="flex gap-3 text-sm text-muted-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <span>
                    <strong className="text-foreground">
                      Personal Identification:
                    </strong>{" "}
                    Full name, date of birth, residential address, and email.
                  </span>
                </li>
                <li className="flex gap-3 text-sm text-muted-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <span>
                    <strong className="text-foreground">Financial Data:</strong>{" "}
                    Bank account details, transaction history, and payment
                    method verification.
                  </span>
                </li>
                <li className="flex gap-3 text-sm text-muted-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <span>
                    <strong className="text-foreground">Technical Data:</strong>{" "}
                    IP address, login data, browser type and version, time zone
                    setting, and location data (where permitted).
                  </span>
                </li>
                <li className="flex gap-3 text-sm text-muted-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <span>
                    <strong className="text-foreground">Usage Data:</strong>{" "}
                    Information about how you use our website, products, and
                    services.
                  </span>
                </li>
              </ul>
            </div>
          </section>

          {/* Placeholder Sections for Accordion Style */}
          {[
            "How We Use Information",
            "Data Sharing & Disclosure",
            "Security Measures",
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
              Your Rights
            </h3>
            <p className="text-muted-foreground mb-6">
              You have the right to request access to your personal data,
              correction of inaccurate data, and deletion of your data under
              certain circumstances.
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              <button className="flex items-center justify-between p-4 rounded-xl bg-background border border-border hover:border-primary group transition-colors">
                <span className="font-medium text-foreground">
                  Request Data Access
                </span>
                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </button>
              <button className="flex items-center justify-between p-4 rounded-xl bg-background border border-border hover:border-primary group transition-colors">
                <span className="font-medium text-foreground">
                  Delete My Account
                </span>
                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </button>
            </div>
          </section>

          {/* Contact DPO */}
          <div className="bg-background border border-border rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold text-foreground mb-2">
                Have questions about your privacy?
              </h3>
              <p className="text-muted-foreground">
                Our Data Protection Officer is here to help you.
              </p>
            </div>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-8">
              Contact DPO
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;
