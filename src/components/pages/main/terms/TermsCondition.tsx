"use client";

import { Button } from "@/components/ui/button";
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
  const [activeSection, setActiveSection] = React.useState("introduction");

  const sections = [
    { id: "introduction", label: "1. Introduction" },
    { id: "account-rules", label: "2. Account Rules" },
    { id: "deposits-withdrawals", label: "3. Deposits & Withdrawals" },
    { id: "betting-rules", label: "4. Betting Rules" },
    { id: "responsible-gaming", label: "5. Responsible Gaming" },
    { id: "liability", label: "6. Liability & Indemnity" },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveSection(id);
    }
  };

  return (
    <div className="w-full min-h-screen bg-background text-foreground pt-16 md:pt-20 pb-5">
      {/* Page Header */}
      <div className="bg-card border-b border-border py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Terms and Conditions
          </h1>
          <div className="flex items-center gap-4 text-sm">
            <span className="bg-primary/20 text-primary px-2 py-1 rounded text-xs font-semibold">
              Version 2.4
            </span>
            <span className="text-muted-foreground">
              Last updated: October 25, 2023
            </span>
          </div>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            Welcome to EasyBet. Please read these terms carefully before using
            our platform. By registering an account, you acknowledge that you
            are at least 18 years old and accept these rules.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8">
        {/* Sidebar */}
        <aside className="hidden lg:block space-y-8 sticky top-24 h-fit">
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">
              Table of Contents
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
                      : "text-muted-foreground hover:bg-primary/10"
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
              Need a copy for your records?
            </div>
            <Button
              variant="outline"
              className="w-full justify-start gap-2 border-border bg-transparent hover:bg-muted text-muted-foreground"
            >
              <Download className="w-4 h-4" />
              Download PDF
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start gap-2 border-border bg-transparent hover:bg-muted text-muted-foreground"
            >
              <Printer className="w-4 h-4" />
              Print Version
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
                Introduction
              </h2>
            </div>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                By registering and accepting the EasyBet Terms and Conditions,
                you are entering into a legally binding agreement which
                incorporates our Privacy Policy, Betting Rules, and any other
                specific terms related to promotions or special offers.
              </p>
              <p>
                EasyBet is operated under the laws and regulations applicable
                for online gaming. We reserve the right to amend these terms at
                any time. Significant changes will be communicated via email or
                a prominent notice on our website.
              </p>
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
                Account Rules & Verification
              </h2>
            </div>
            <p className="text-muted-foreground mb-6">
              You must be at least 18 years of age (or the legal age of majority
              in your jurisdiction) to use our services. We reserve the right to
              ask for proof of age from any customer and suspend their account
              until satisfactory documentation is provided.
            </p>
            <div className="grid gap-4">
              <div className="flex gap-4 p-4 rounded-xl bg-background border border-border">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0 mt-1">
                  <Check className="w-4 h-4 text-primary-foreground stroke-3" />
                </div>
                <div>
                  <h4 className="text-foreground font-bold mb-1">
                    One Account Policy
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Customers are allowed only one account per person, family,
                    household address, email address, telephone number, same
                    payment account number, and shared computer.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 p-4 rounded-xl bg-background border border-border">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0 mt-1">
                  <Shield className="w-4 h-4 text-primary-foreground fill-current" />
                </div>
                <div>
                  <h4 className="text-foreground font-bold mb-1">
                    KYC Requirement
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    To withdraw funds, you must complete our Know Your Customer
                    (KYC) procedure by submitting a valid National ID, Passport,
                    or Driving License.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 p-4 rounded-xl bg-background border border-border">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0 mt-1">
                  <Lock className="w-4 h-4 text-primary-foreground fill-current" />
                </div>
                <div>
                  <h4 className="text-foreground font-bold mb-1">Security</h4>
                  <p className="text-sm text-muted-foreground">
                    You are responsible for maintaining the confidentiality of
                    your username and password. Any bets placed via your account
                    will be considered valid.
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
                Deposits & Withdrawals (BDT)
              </h2>
            </div>
            <p className="text-muted-foreground mb-6">
              We support transactions in Bangladeshi Taka (BDT) via mobile
              financial services like bKash, Nagad, and Rocket.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-5 rounded-xl bg-background border-l-4 border-primary">
                <h3 className="font-bold text-foreground mb-2">Deposits</h3>
                <p className="text-sm text-muted-foreground">
                  Minimum deposit is 500 BDT. Deposits are usually instant but
                  may take up to 15 minutes during peak times.
                </p>
              </div>
              <div className="p-5 rounded-xl bg-background border-l-4 border-primary/50">
                <h3 className="font-bold text-foreground mb-2">Withdrawals</h3>
                <p className="text-sm text-muted-foreground">
                  Minimum withdrawal is 1000 BDT. Withdrawals are processed
                  within 24 hours. You must wager 100% of your deposit before
                  withdrawing.
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
                Betting Rules
              </h2>
            </div>
            <div className="space-y-4 text-muted-foreground">
              <p>
                A bet is not valid until it has been confirmed by our servers
                and a confirmation message appears on your screen. EasyBet Board
                reserves the right to void any bet that may have been accepted
                when the account did not have sufficient funds to cover the bet.
              </p>
              <p>
                <strong className="text-foreground">Late Bets:</strong> If a bet
                is placed on an event after the deadline or after the result is
                known, we reserve the right to void the bet, win or lose.
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
                Responsible Gaming
              </h2>
            </div>
            <div className="bg-background rounded-xl p-6 border border-border">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Shield className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground text-lg mb-2">
                    Play Responsibly
                  </h3>
                  <p className="text-muted-foreground text-sm mb-6">
                    Gambling should be entertaining and not seen as a way of
                    making money. EasyBet offers tools to help you stay in
                    control.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-secondary text-xs font-medium text-muted-foreground rounded-full border border-border">
                      Self-Exclusion
                    </span>
                    <span className="px-3 py-1 bg-secondary text-xs font-medium text-muted-foreground rounded-full border border-border">
                      Deposit Limits
                    </span>
                    <span className="px-3 py-1 bg-secondary text-xs font-medium text-muted-foreground rounded-full border border-border">
                      Reality Checks
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
export default TermsCondition;