"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowRight, Check, ChevronDown, ChevronRight, ChevronUp, Download, Eye, ShieldCheck } from "lucide-react";
import React from "react";

export default function PrivacyPage() {
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
    <div className="min-h-screen bg-[#0b1610] text-gray-300 pb-20">
      {/* Page Header */}
      <div className="bg-[#112218] border-b border-[#233228] py-12">
        <div className="container mx-auto px-4">
            <div className="flex items-center gap-2 text-[#00d65c] text-xs font-bold uppercase tracking-wider mb-2">
                <ShieldCheck className="w-4 h-4" />
                Legal Documentation
            </div>
          <h1 className="text-4xl font-bold text-white mb-4">Privacy Policy</h1>
          <div className="flex items-center gap-4 text-sm mt-2">
            <span className="text-gray-400">Last Updated: October 24, 2023</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8">
        {/* Sidebar */}
        <aside className="hidden lg:block space-y-8 sticky top-24 h-fit">
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Contents</h3>
            <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-2">Jump to section</p>
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

          <div>
             <Button variant="outline" className="w-full justify-center gap-2 border-[#233228] bg-transparent hover:bg-[#1d2e24] text-[#00d65c] hover:text-[#00d65c]">
              <Download className="w-4 h-4" />
              DOWNLOAD PDF
            </Button>
          </div>
        </aside>

        {/* Content */}
        <div className="space-y-8">
            {/* Introduction */}
            <div id="introduction" className="space-y-6">
                <p className="text-gray-300 text-lg leading-relaxed">
                    At <span className="text-[#00d65c] font-bold">EasyBet</span>, your privacy is our priority. This policy outlines how we collect, use, and protect your personal data when you use our sports betting platform. We are committed to transparency and ensuring your information is handled securely and in accordance with applicable laws in Bangladesh and international standards.
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                     {/* Data Protection Card */}
                    <div className="bg-[#112218] p-6 rounded-2xl border border-[#233228]">
                        <div className="w-8 h-8 rounded-full bg-[#00d65c] flex items-center justify-center mb-4">
                            <Check className="w-4 h-4 text-[#0b1610] stroke-[3]" />
                        </div>
                        <h3 className="text-white font-bold mb-2">Data Protection</h3>
                        <p className="text-sm text-gray-400">We use advanced encryption to safeguard your personal and financial data.</p>
                    </div>
                     {/* Transparency Card */}
                    <div className="bg-[#112218] p-6 rounded-2xl border border-[#233228]">
                        <div className="w-8 h-8 rounded-full bg-[#00d65c]/10 flex items-center justify-center mb-4">
                            <Eye className="w-4 h-4 text-[#00d65c]" />
                        </div>
                        <h3 className="text-white font-bold mb-2">Transparency</h3>
                        <p className="text-sm text-gray-400">You have full visibility and control over how your data is processed.</p>
                    </div>
                </div>

                {/* Policy at a Glance */}
                <div className="bg-[#112218] rounded-2xl border border-[#233228] overflow-hidden">
                    <div className="p-6 border-b border-[#233228]">
                        <h3 className="text-xl font-bold text-white">Policy at a Glance</h3>
                    </div>
                    <div className="divide-y divide-[#233228]">
                        <div className="p-6 grid md:grid-cols-[120px_1fr] gap-4">
                            <div className="text-sm text-gray-500 font-medium">Scope</div>
                             <div className="text-sm text-gray-300">This policy applies to all registered users, visitors, and affiliates using the EasyBet web and mobile applications.</div>
                        </div>
                         <div className="p-6 grid md:grid-cols-[120px_1fr] gap-4">
                            <div className="text-sm text-gray-500 font-medium">Consent</div>
                             <div className="text-sm text-gray-300">By creating an account, you consent to the data practices described in this document.</div>
                        </div>
                         <div className="p-6 grid md:grid-cols-[120px_1fr] gap-4">
                            <div className="text-sm text-gray-500 font-medium">Updates</div>
                             <div className="text-sm text-gray-300">We may update this policy periodically. Significant changes will be notified via email.</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="border-t border-[#233228] my-8" />

            <h2 className="text-2xl font-bold text-white mb-6">Detailed Provisions</h2>

            {/* Information We Collect */}
             <section id="data-collection" className="bg-[#112218] border border-[#233228] rounded-2xl overflow-hidden">
                 <div className="p-6 flex items-center justify-between cursor-pointer hover:bg-[#1d2e24/50] transition-colors">
                     <div className="flex items-center gap-4">
                         <div className="w-8 h-8 rounded-lg bg-[#00d65c]/20 flex items-center justify-center text-[#00d65c] font-bold text-sm">01</div>
                         <h3 className="text-lg font-bold text-white">Information We Collect</h3>
                     </div>
                     <ChevronUp className="w-5 h-5 text-gray-500" />
                 </div>
                 <div className="px-6 pb-6 pt-0">
                     <p className="text-gray-400 text-sm mb-4">To provide our betting services, we collect several types of information:</p>
                     <ul className="space-y-3">
                         <li className="flex gap-3 text-sm text-gray-300">
                             <span className="w-1.5 h-1.5 rounded-full bg-[#00d65c] mt-2 flex-shrink-0" />
                             <span><strong className="text-white">Personal Identification:</strong> Full name, date of birth, residential address, and email.</span>
                         </li>
                          <li className="flex gap-3 text-sm text-gray-300">
                             <span className="w-1.5 h-1.5 rounded-full bg-[#00d65c] mt-2 flex-shrink-0" />
                             <span><strong className="text-white">Financial Data:</strong> Bank account details, transaction history, and payment method verification.</span>
                         </li>
                          <li className="flex gap-3 text-sm text-gray-300">
                             <span className="w-1.5 h-1.5 rounded-full bg-[#00d65c] mt-2 flex-shrink-0" />
                             <span><strong className="text-white">Technical Data:</strong> IP address, login data, browser type and version, time zone setting, and location data (where permitted).</span>
                         </li>
                          <li className="flex gap-3 text-sm text-gray-300">
                             <span className="w-1.5 h-1.5 rounded-full bg-[#00d65c] mt-2 flex-shrink-0" />
                             <span><strong className="text-white">Usage Data:</strong> Information about how you use our website, products, and services.</span>
                         </li>
                     </ul>
                 </div>
             </section>

             {/* Placeholder Sections for Accordion Style */}
             {["How We Use Information", "Data Sharing & Disclosure", "Security Measures"].map((title, idx) => (
                  <section key={idx} id={idx === 0 ? "how-we-use" : idx === 1 ? "data-sharing" : "security"} className="bg-[#112218] border border-[#233228] rounded-2xl overflow-hidden">
                     <div className="p-6 flex items-center justify-between cursor-pointer hover:bg-[#1d2e24/50] transition-colors">
                         <div className="flex items-center gap-4">
                             <div className="w-8 h-8 rounded-lg bg-[#00d65c]/20 flex items-center justify-center text-[#00d65c] font-bold text-sm">0{idx + 2}</div>
                             <h3 className="text-lg font-bold text-white">{title}</h3>
                         </div>
                         <ChevronDown className="w-5 h-5 text-gray-500" />
                     </div>
                 </section>
             ))}

            {/* Your Rights */}
            <section id="your-rights" className="p-6 rounded-2xl bg-[#112218] border border-[#233228]">
                <h3 className="text-xl font-bold text-white mb-4">Your Rights</h3>
                <p className="text-gray-400 mb-6">You have the right to request access to your personal data, correction of inaccurate data, and deletion of your data under certain circumstances.</p>
                
                <div className="grid md:grid-cols-2 gap-4">
                    <button className="flex items-center justify-between p-4 rounded-xl bg-[#0b1610] border border-[#233228] hover:border-[#00d65c] group transition-colors">
                        <span className="font-medium text-white">Request Data Access</span>
                        <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-[#00d65c] transition-colors" />
                    </button>
                    <button className="flex items-center justify-between p-4 rounded-xl bg-[#0b1610] border border-[#233228] hover:border-[#00d65c] group transition-colors">
                        <span className="font-medium text-white">Delete My Account</span>
                        <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-[#00d65c] transition-colors" />
                    </button>
                </div>
            </section>

             {/* Contact DPO */}
             <div className="bg-[#0b1610] border border-[#233228] rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                 <div>
                     <h3 className="text-xl font-bold text-white mb-2">Have questions about your privacy?</h3>
                     <p className="text-gray-400">Our Data Protection Officer is here to help you.</p>
                 </div>
                 <Button className="bg-[#00d65c] hover:bg-[#00b04c] text-[#0b1610] font-bold px-8">
                     Contact DPO
                 </Button>
             </div>

        </div>
      </div>
    </div>
  );
}
