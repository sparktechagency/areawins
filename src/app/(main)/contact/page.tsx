"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ChevronDown, ChevronUp, Headphones, Lock, Mail, MessageSquare } from "lucide-react";
import { useState } from "react";

export default function ContactPage() {
  const [activeFaq, setActiveFaq] = useState<string | null>(null);

  const toggleFaq = (id: string) => {
    setActiveFaq(activeFaq === id ? null : id);
  };

  const faqs = [
    {
      id: "deposit",
      question: "How to deposit with bKash?",
      answer: "Go to Dashboard > Wallet > Deposit. Select bKash, enter the amount, and follow the on-screen instructions to complete the transfer via your bKash app."
    },
    {
      id: "withdrawal",
      question: "What is the minimum withdrawal?",
      answer: "The minimum withdrawal amount is 1,000 BDT. Withdrawals are typically processed within 24 hours."
    },
    {
      id: "restricted",
      question: "Why is my account restricted?",
      answer: "Accounts may be restricted due to verification pending, suspicious activity, or violation of our terms. Please contact support for assistance."
    }
  ];

  return (
    <div className="min-h-screen bg-[#0b1610] text-gray-300 pb-20">
      {/* Page Header */}
      <div className="relative py-20 bg-[#112218] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#00d65c]/5 to-transparent pointer-events-none" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00d65c]/10 text-[#00d65c] text-xs font-bold mb-4 border border-[#00d65c]/20">
            <Headphones className="w-3 h-3" />
            24/7 SUPPORT
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Get in Touch</h1>
          <p className="max-w-xl mx-auto text-gray-400 text-lg">
            Have a question about your bet, deposit, or account verification? Our team is here to help you win.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8">
        {/* Left Column: Contact Form */}
        <div className="bg-[#112218] border border-[#233228] p-6 md:p-8 rounded-2xl">
          <h2 className="text-2xl font-bold text-white mb-2">Send us a message</h2>
          <p className="text-gray-400 mb-8">Fill out the form below and we'll get back to you within 2 hours.</p>

          <form className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="fullname" className="text-gray-300">Full Name</Label>
                <Input id="fullname" placeholder="Enter your full name" className="bg-[#0b1610] border-[#233228] text-white placeholder:text-gray-600 focus:border-[#00d65c]/50 h-12" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-300">Email Address</Label>
                <Input id="email" type="email" placeholder="yourname@example.com" className="bg-[#0b1610] border-[#233228] text-white placeholder:text-gray-600 focus:border-[#00d65c]/50 h-12" />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="userid" className="text-gray-300">User ID <span className="text-gray-600 font-normal">(Optional)</span></Label>
                <Input id="userid" placeholder="e.g. 883210" className="bg-[#0b1610] border-[#233228] text-white placeholder:text-gray-600 focus:border-[#00d65c]/50 h-12" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject" className="text-gray-300">Select a Topic</Label>
                 <select id="subject" className="flex h-12 w-full items-center justify-between rounded-md border border-[#233228] bg-[#0b1610] px-3 py-2 text-sm text-white ring-offset-background placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-[#00d65c] focus:border-[#00d65c]/50 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1">
                  <option value="" disabled selected>Choose a subject...</option>
                  <option value="deposit">Deposit Issue</option>
                  <option value="withdrawal">Withdrawal Issue</option>
                  <option value="bet">Bet Settlement</option>
                  <option value="account">Account Verification</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message" className="text-gray-300">Message</Label>
              <Textarea id="message" placeholder="Describe your issue in detail so we can help you faster..." className="bg-[#0b1610] border-[#233228] text-white placeholder:text-gray-600 focus:border-[#00d65c]/50 min-h-[150px] resize-none" />
            </div>

            <Button className="w-full bg-[#00d65c] hover:bg-[#00b04c] text-[#0b1610] font-bold h-12 text-base">
              Send Message
            </Button>
          </form>
        </div>

        {/* Right Column: Info & FAQ */}
        <div className="space-y-6">
          {/* Support Channels */}
          <div className="grid gap-4">
            <div className="p-4 rounded-xl bg-[#112218] border border-[#233228] flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-[#00d65c]/10 flex items-center justify-center flex-shrink-0 text-[#00d65c]">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-white">WhatsApp Support</h3>
                <p className="text-gray-400 text-sm mb-1">+880 1712 345678</p>
                <div className="text-[#00d65c] text-xs font-medium">Typical reply: &lt; 5 min</div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#112218] border border-[#233228] flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-[#00d65c]/10 flex items-center justify-center flex-shrink-0 text-[#00d65c]">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-white">Email Support</h3>
                <p className="text-gray-400 text-sm mb-1">support@easybet.com</p>
                <div className="text-[#00d65c] text-xs font-medium">For complex inquiries</div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#112218] border border-[#233228] flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-[#00d65c]/10 flex items-center justify-center flex-shrink-0 text-[#00d65c]">
                <Headphones className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-white">Live Chat</h3>
                <p className="text-gray-400 text-sm mb-1">Available 24/7</p>
                <div className="text-[#00d65c] text-xs font-medium">Instant connection</div>
              </div>
            </div>
          </div>

          {/* FAQ */}
          <div className="bg-[#112218] border border-[#233228] rounded-2xl overflow-hidden">
            <div className="p-5 border-b border-[#233228]">
              <h3 className="font-bold text-white text-lg">Common Questions</h3>
            </div>
            <div className="divide-y divide-[#233228]">
              {faqs.map((faq) => (
                <div key={faq.id} className="bg-[#112218]">
                   <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full flex items-center justify-between p-5 text-left transition-colors hover:bg-[#1d2e24]/30"
                   >
                     <span className="text-gray-300 text-sm font-medium">{faq.question}</span>
                     {activeFaq === faq.id ? (
                       <ChevronUp className="w-4 h-4 text-gray-500" />
                     ) : (
                       <ChevronDown className="w-4 h-4 text-gray-500" />
                     )}
                   </button>
                   {activeFaq === faq.id && (
                     <div className="px-5 pb-5 text-sm text-gray-400 leading-relaxed animate-in slide-in-from-top-2 duration-200">
                       {faq.answer}
                     </div>
                   )}
                </div>
              ))}
            </div>
            <div className="p-4 bg-[#0b1610]">
               <Button variant="outline" className="w-full border-[#233228] text-[#00d65c] hover:text-[#00d65c] hover:bg-[#1d2e24] bg-transparent">
                 View Help Center
               </Button>
            </div>
          </div>

           {/* Security Note */}
           <div className="bg-[#0b1610] border border-[#233228] rounded-xl p-4 flex items-center gap-3">
             <Lock className="w-4 h-4 text-gray-500" />
             <p className="text-xs text-gray-500">Your data is protected by 256-bit SSL encryption. We never share your details.</p>
           </div>

        </div>
      </div>
    </div>
  );
}
