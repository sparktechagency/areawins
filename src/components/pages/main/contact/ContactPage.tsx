"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ChevronDown, ChevronUp, Headphones, Lock, Mail, MessageSquare } from "lucide-react";
import { useState } from "react";

const ContactPage = () =>{
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
    <div className="min-h-screen bg-background text-foreground pb-20">
      {/* Page Header */}
      <div className="relative py-20 bg-card overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold mb-4 border border-primary/20">
            <Headphones className="w-3 h-3" />
            24/7 SUPPORT
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Get in Touch</h1>
          <p className="max-w-xl mx-auto text-muted-foreground text-lg">
            Have a question about your bet, deposit, or account verification? Our team is here to help you win.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8">
        {/* Left Column: Contact Form */}
        <div className="bg-card border border-border p-6 md:p-8 rounded-2xl">
          <h2 className="text-2xl font-bold text-foreground mb-2">Send us a message</h2>
          <p className="text-muted-foreground mb-8">Fill out the form below and we&apos;ll get back to you within 2 hours.</p>

          <form className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="fullname" className="text-foreground">Full Name</Label>
                <Input id="fullname" placeholder="Enter your full name" className="bg-background border-border text-foreground placeholder:text-muted-foreground focus:border-primary/50 h-12" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground">Email Address</Label>
                <Input id="email" type="email" placeholder="yourname@example.com" className="bg-background border-border text-foreground placeholder:text-muted-foreground focus:border-primary/50 h-12" />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="userid" className="text-foreground">User ID <span className="text-muted-foreground font-normal">(Optional)</span></Label>
                <Input id="userid" placeholder="e.g. 883210" className="bg-background border-border text-foreground placeholder:text-muted-foreground focus:border-primary/50 h-12" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject" className="text-foreground">Select a Topic</Label>
                 <select id="subject" className="flex h-12 w-full items-center justify-between rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary/50 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1">
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
              <Label htmlFor="message" className="text-foreground">Message</Label>
              <Textarea id="message" placeholder="Describe your issue in detail so we can help you faster..." className="bg-background border-border text-foreground placeholder:text-muted-foreground focus:border-primary/50 min-h-[150px] resize-none" />
            </div>

            <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold h-12 text-base">
              Send Message
            </Button>
          </form>
        </div>

        {/* Right Column: Info & FAQ */}
        <div className="space-y-6">
          {/* Support Channels */}
          <div className="grid gap-4">
            <div className="p-4 rounded-xl bg-card border border-border flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-foreground">WhatsApp Support</h3>
                <p className="text-muted-foreground text-sm mb-1">+880 1712 345678</p>
                <div className="text-primary text-xs font-medium">Typical reply: &lt; 5 min</div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-card border border-border flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-foreground">Email Support</h3>
                <p className="text-muted-foreground text-sm mb-1">support@easybet.com</p>
                <div className="text-primary text-xs font-medium">For complex inquiries</div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-card border border-border flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary">
                <Headphones className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-foreground">Live Chat</h3>
                <p className="text-muted-foreground text-sm mb-1">Available 24/7</p>
                <div className="text-primary text-xs font-medium">Instant connection</div>
              </div>
            </div>
          </div>

          {/* FAQ */}
          <div className="bg-card border border-border rounded-2xl overflow-hidden">
            <div className="p-5 border-b border-border">
              <h3 className="font-bold text-foreground text-lg">Common Questions</h3>
            </div>
            <div className="divide-y divide-border">
              {faqs.map((faq) => (
                <div key={faq.id} className="bg-card">
                   <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full flex items-center justify-between p-5 text-left transition-colors hover:bg-muted/30"
                   >
                     <span className="text-foreground text-sm font-medium">{faq.question}</span>
                     {activeFaq === faq.id ? (
                       <ChevronUp className="w-4 h-4 text-muted-foreground" />
                     ) : (
                       <ChevronDown className="w-4 h-4 text-muted-foreground" />
                     )}
                   </button>
                   {activeFaq === faq.id && (
                     <div className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed animate-in slide-in-from-top-2 duration-200">
                       {faq.answer}
                     </div>
                   )}
                </div>
              ))}
            </div>
            <div className="p-4 bg-background">
               <Button variant="outline" className="w-full border-border text-primary hover:text-primary hover:bg-muted bg-transparent">
                 View Help Center
               </Button>
            </div>
          </div>

           {/* Security Note */}
           <div className="bg-background border border-border rounded-xl p-4 flex items-center gap-3">
             <Lock className="w-4 h-4 text-muted-foreground" />
             <p className="text-xs text-muted-foreground">Your data is protected by 256-bit SSL encryption. We never share your details.</p>
           </div>

        </div>
      </div>
    </div>
  );
}


export default ContactPage