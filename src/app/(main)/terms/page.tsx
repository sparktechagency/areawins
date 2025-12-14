"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Check, ChevronRight, Download, Lock, Printer, Shield } from "lucide-react";
import React from "react";

export default function TermsPage() {
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
    <div className="min-h-screen bg-[#0b1610] text-gray-300 pb-20">
      {/* Page Header */}
      <div className="bg-[#112218] border-b border-[#233228] py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-white mb-4">Terms and Conditions</h1>
          <div className="flex items-center gap-4 text-sm">
            <span className="bg-[#00d65c]/20 text-[#00d65c] px-2 py-1 rounded text-xs font-semibold">
              Version 2.4
            </span>
            <span className="text-gray-400">Last updated: October 25, 2023</span>
          </div>
          <p className="mt-4 max-w-2xl text-gray-400">
            Welcome to EasyBet. Please read these terms carefully before using our platform. By registering an account, you acknowledge that you are at least 18 years old and accept these rules.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8">
        {/* Sidebar */}
        <aside className="hidden lg:block space-y-8 sticky top-24 h-fit">
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Table of Contents</h3>
            <nav className="flex flex-col space-y-1">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={cn(
                    "flex items-center justify-between px-4 py-3 text-sm font-medium rounded-lg transition-colors text-left",
                    activeSection === section.id
                      ? "bg-[#1d2e24] text-[#00d65c]"
                      : "text-gray-400 hover:bg-[#1d2e24/50] hover:text-white"
                  )}
                >
                  {section.label}
                  {activeSection === section.id && <ChevronRight className="w-4 h-4" />}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-4 rounded-xl border border-[#233228] bg-[#112218] space-y-4">
            <div className="text-sm font-medium text-white">Need a copy for your records?</div>
            <Button variant="outline" className="w-full justify-start gap-2 border-[#233228] bg-transparent hover:bg-[#1d2e24] text-gray-300">
              <Download className="w-4 h-4" />
              Download PDF
            </Button>
            <Button variant="outline" className="w-full justify-start gap-2 border-[#233228] bg-transparent hover:bg-[#1d2e24] text-gray-300">
              <Printer className="w-4 h-4" />
              Print Version
            </Button>
          </div>
        </aside>

        {/* Content */}
        <div className="space-y-8">
          {/* Introduction */}
          <section id="introduction" className="p-6 rounded-2xl bg-[#112218] border border-[#233228]">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-8 h-8 rounded-lg bg-[#00d65c]/20 flex items-center justify-center text-[#00d65c] font-bold text-sm">01</div>
              <h2 className="text-xl font-bold text-white">Introduction</h2>
            </div>
            <div className="space-y-4 text-gray-400 leading-relaxed">
              <p>
                By registering and accepting the EasyBet Terms and Conditions, you are entering into a legally binding agreement which incorporates our Privacy Policy, Betting Rules, and any other specific terms related to promotions or special offers.
              </p>
              <p>
                EasyBet is operated under the laws and regulations applicable for online gaming. We reserve the right to amend these terms at any time. Significant changes will be communicated via email or a prominent notice on our website.
              </p>
            </div>
          </section>

          {/* Account Rules */}
          <section id="account-rules" className="p-6 rounded-2xl bg-[#112218] border border-[#233228]">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-8 h-8 rounded-lg bg-[#00d65c]/20 flex items-center justify-center text-[#00d65c] font-bold text-sm">02</div>
              <h2 className="text-xl font-bold text-white">Account Rules & Verification</h2>
            </div>
            <p className="text-gray-400 mb-6">
              You must be at least 18 years of age (or the legal age of majority in your jurisdiction) to use our services. We reserve the right to ask for proof of age from any customer and suspend their account until satisfactory documentation is provided.
            </p>
            <div className="grid gap-4">
              <div className="flex gap-4 p-4 rounded-xl bg-[#0b1610] border border-[#233228]">
                <div className="w-8 h-8 rounded-full bg-[#00d65c] flex items-center justify-center flex-shrink-0 mt-1">
                  <Check className="w-4 h-4 text-[#0b1610] stroke-[3]" />
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1">One Account Policy</h4>
                  <p className="text-sm text-gray-400">Customers are allowed only one account per person, family, household address, email address, telephone number, same payment account number, and shared computer.</p>
                </div>
              </div>
              <div className="flex gap-4 p-4 rounded-xl bg-[#0b1610] border border-[#233228]">
                <div className="w-8 h-8 rounded-full bg-[#00d65c] flex items-center justify-center flex-shrink-0 mt-1">
                  <Shield className="w-4 h-4 text-[#0b1610] fill-current" />
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1">KYC Requirement</h4>
                  <p className="text-sm text-gray-400">To withdraw funds, you must complete our Know Your Customer (KYC) procedure by submitting a valid National ID, Passport, or Driving License.</p>
                </div>
              </div>
              <div className="flex gap-4 p-4 rounded-xl bg-[#0b1610] border border-[#233228]">
                <div className="w-8 h-8 rounded-full bg-[#00d65c] flex items-center justify-center flex-shrink-0 mt-1">
                  <Lock className="w-4 h-4 text-[#0b1610] fill-current" />
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1">Security</h4>
                  <p className="text-sm text-gray-400">You are responsible for maintaining the confidentiality of your username and password. Any bets placed via your account will be considered valid.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Deposits */}
          <section id="deposits-withdrawals" className="p-6 rounded-2xl bg-[#112218] border border-[#233228]">
             <div className="flex items-center gap-4 mb-6">
              <div className="w-8 h-8 rounded-lg bg-[#00d65c]/20 flex items-center justify-center text-[#00d65c] font-bold text-sm">03</div>
              <h2 className="text-xl font-bold text-white">Deposits & Withdrawals (BDT)</h2>
            </div>
            <p className="text-gray-400 mb-6">
              We support transactions in Bangladeshi Taka (BDT) via mobile financial services like bKash, Nagad, and Rocket.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
               <div className="p-5 rounded-xl bg-[#0b1610] border-l-4 border-[#00d65c]">
                  <h3 className="font-bold text-white mb-2">Deposits</h3>
                  <p className="text-sm text-gray-400">Minimum deposit is 500 BDT. Deposits are usually instant but may take up to 15 minutes during peak times.</p>
               </div>
               <div className="p-5 rounded-xl bg-[#0b1610] border-l-4 border-[#00d65c]/50">
                  <h3 className="font-bold text-white mb-2">Withdrawals</h3>
                  <p className="text-sm text-gray-400">Minimum withdrawal is 1000 BDT. Withdrawals are processed within 24 hours. You must wager 100% of your deposit before withdrawing.</p>
               </div>
            </div>
          </section>

          {/* Betting Rules */}
           <section id="betting-rules" className="p-6 rounded-2xl bg-[#112218] border border-[#233228]">
             <div className="flex items-center gap-4 mb-6">
              <div className="w-8 h-8 rounded-lg bg-[#00d65c]/20 flex items-center justify-center text-[#00d65c] font-bold text-sm">04</div>
              <h2 className="text-xl font-bold text-white">Betting Rules</h2>
            </div>
             <div className="space-y-4 text-gray-400">
               <p>
                 A bet is not valid until it has been confirmed by our servers and a confirmation message appears on your screen. EasyBet Board reserves the right to void any bet that may have been accepted when the account did not have sufficient funds to cover the bet.
               </p>
               <p>
                 <strong className="text-white">Late Bets:</strong> If a bet is placed on an event after the deadline or after the result is known, we reserve the right to void the bet, win or lose.
               </p>
             </div>
          </section>

           {/* Responsible Gaming */}
           <section id="responsible-gaming" className="p-6 rounded-2xl bg-[#112218] border border-[#233228]">
             <div className="flex items-center gap-4 mb-6">
              <div className="w-8 h-8 rounded-lg bg-[#00d65c]/20 flex items-center justify-center text-[#00d65c] font-bold text-sm">05</div>
              <h2 className="text-xl font-bold text-white">Responsible Gaming</h2>
            </div>
            <div className="bg-[#0b1610] rounded-xl p-6 border border-[#233228]">
              <div className="flex items-start gap-4">
                 <div className="w-10 h-10 rounded-full bg-[#00d65c]/10 flex items-center justify-center flex-shrink-0">
                    <Shield className="w-5 h-5 text-[#00d65c]" />
                 </div>
                 <div>
                   <h3 className="font-bold text-white text-lg mb-2">Play Responsibly</h3>
                   <p className="text-gray-400 text-sm mb-6">Gambling should be entertaining and not seen as a way of making money. EasyBet offers tools to help you stay in control.</p>
                   <div className="flex flex-wrap gap-2">
                     <span className="px-3 py-1 bg-[#1d2e24] text-xs font-medium text-gray-300 rounded-full border border-[#233228]">Self-Exclusion</span>
                     <span className="px-3 py-1 bg-[#1d2e24] text-xs font-medium text-gray-300 rounded-full border border-[#233228]">Deposit Limits</span>
                     <span className="px-3 py-1 bg-[#1d2e24] text-xs font-medium text-gray-300 rounded-full border border-[#233228]">Reality Checks</span>
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
