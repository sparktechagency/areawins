"use client";

import { Button } from "@/components/ui/button";
import { Lock, Shield, Trophy, Users, Wallet, Zap } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#0b1610] text-gray-300">
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0b1610] via-transparent to-[#0b1610]" />
        
        <div className="container mx-auto px-4 relative z-10 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00d65c]/10 text-[#00d65c] text-xs font-bold mb-6 border border-[#00d65c]/20 uppercase tracking-wider">
                Platform Overview
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                Revolutionizing Sports <br />
                Betting in <span className="text-[#00d65c]">Bangladesh</span>
            </h1>
            <p className="max-w-2xl mx-auto text-gray-400 text-lg mb-8 leading-relaxed">
                EasyBet is built for the modern fan. We combine lightning-fast technology with rock-solid security to deliver the ultimate betting experience tailored for you.
            </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 border-y border-[#233228] bg-[#112218]/50">
        <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">50k+</div>
                <div className="text-xs uppercase tracking-wider text-[#00d65c] font-bold">Active Users</div>
            </div>
            <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">1,000+</div>
                <div className="text-xs uppercase tracking-wider text-[#00d65c] font-bold">Daily Matches</div>
            </div>
            <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">24/7</div>
                <div className="text-xs uppercase tracking-wider text-[#00d65c] font-bold">Bangla Support</div>
            </div>
            <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">99.9%</div>
                <div className="text-xs uppercase tracking-wider text-[#00d65c] font-bold">Uptime</div>
            </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
              <div className="order-2 md:order-1 relative rounded-2xl overflow-hidden aspect-video bg-[#112218] border border-[#233228]">
                  {/* Placeholder for "Built for Fans" image */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#00d65c]/20 to-transparent flex items-end p-8">
                      <div>
                          <h3 className="text-2xl font-bold text-white mb-2">Built for Fans</h3>
                          <p className="text-sm text-gray-300">Experience the thrill from anywhere, anytime.</p>
                      </div>
                  </div>
              </div>
              <div className="order-1 md:order-2">
                  <div className="text-[#00d65c] text-xs font-bold uppercase tracking-wider mb-2">Our Mission</div>
                  <h2 className="text-3xl font-bold text-white mb-4">Empowering the Modern Bettor</h2>
                  <p className="text-gray-400 leading-relaxed mb-6">
                      Our mission is to provide a transparent, secure, and exhilarating platform where sports enthusiasts can engage with their favorite games. We believe in fair play, instant rewards, and creating a community where every match matters.
                  </p>
              </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
               <div>
                  <div className="text-[#00d65c] text-xs font-bold uppercase tracking-wider mb-2">Our Vision</div>
                  <h2 className="text-3xl font-bold text-white mb-4">The Future of Interactive Sports</h2>
                  <p className="text-gray-400 leading-relaxed mb-6">
                      We envision a world where sports betting is seamless and integrated into the viewing experience. By leveraging cutting-edge technology and local insights, we aim to be the #1 choice for sports entertainment in Bangladesh.
                  </p>
              </div>
               <div className="relative rounded-2xl overflow-hidden aspect-video bg-[#112218] border border-[#233228]">
                   {/* Placeholder for Vision image */}
                  <div className="absolute inset-0 bg-gradient-to-bl from-[#00d65c]/20 to-transparent" />
              </div>
          </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-[#112218]">
          <div className="container mx-auto px-4">
              <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-4">Why Choose EasyBet</h2>
              <p className="text-center text-gray-400 max-w-2xl mx-auto mb-16">
                  We prioritize your experience with industry-leading features designed for the modern bettor.
              </p>

              <div className="grid md:grid-cols-3 gap-6">
                  {/* Card 1 */}
                  <div className="p-8 rounded-2xl bg-[#0b1610] border border-[#233228] hover:border-[#00d65c]/50 transition-colors group">
                      <div className="w-12 h-12 rounded-xl bg-[#00d65c]/10 flex items-center justify-center text-[#00d65c] mb-6 group-hover:bg-[#00d65c] group-hover:text-[#0b1610] transition-colors">
                          <Shield className="w-6 h-6" />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-3">Integrity & Fair Play</h3>
                      <p className="text-gray-400 text-sm leading-relaxed">Guaranteed transparent odds and instant payouts you can trust. We operate with the highest standards of security.</p>
                  </div>

                  {/* Card 2 */}
                  <div className="p-8 rounded-2xl bg-[#0b1610] border border-[#233228] hover:border-[#00d65c]/50 transition-colors group">
                      <div className="w-12 h-12 rounded-xl bg-[#00d65c]/10 flex items-center justify-center text-[#00d65c] mb-6 group-hover:bg-[#00d65c] group-hover:text-[#0b1610] transition-colors">
                          <Zap className="w-6 h-6" />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-3">Cutting-edge Innovation</h3>
                      <p className="text-gray-400 text-sm leading-relaxed">Live betting technology that keeps up with every match moment. Experience zero lag during crucial plays.</p>
                  </div>

                   {/* Card 3 */}
                  <div className="p-8 rounded-2xl bg-[#0b1610] border border-[#233228] hover:border-[#00d65c]/50 transition-colors group">
                      <div className="w-12 h-12 rounded-xl bg-[#00d65c]/10 flex items-center justify-center text-[#00d65c] mb-6 group-hover:bg-[#00d65c] group-hover:text-[#0b1610] transition-colors">
                          <Users className="w-6 h-6" />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-3">Community Focused</h3>
                      <p className="text-gray-400 text-sm leading-relaxed">Tailored specifically for the local Bangladeshi market with 24/7 Bangla support and local payment methods.</p>
                  </div>

                   {/* Card 4 */}
                  <div className="p-8 rounded-2xl bg-[#0b1610] border border-[#233228] hover:border-[#00d65c]/50 transition-colors group">
                      <div className="w-12 h-12 rounded-xl bg-[#00d65c]/10 flex items-center justify-center text-[#00d65c] mb-6 group-hover:bg-[#00d65c] group-hover:text-[#0b1610] transition-colors">
                          <Wallet className="w-6 h-6" />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-3">Instant Withdrawals</h3>
                      <p className="text-gray-400 text-sm leading-relaxed">Get your winnings fast. We support bKash, Nagad, and Rocket for seamless transactions.</p>
                  </div>

                   {/* Card 5 */}
                  <div className="p-8 rounded-2xl bg-[#0b1610] border border-[#233228] hover:border-[#00d65c]/50 transition-colors group">
                      <div className="w-12 h-12 rounded-xl bg-[#00d65c]/10 flex items-center justify-center text-[#00d65c] mb-6 group-hover:bg-[#00d65c] group-hover:text-[#0b1610] transition-colors">
                          <Trophy className="w-6 h-6" />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-3">Cricket Specialists</h3>
                      <p className="text-gray-400 text-sm leading-relaxed">The best odds on BPL, IPL, and International Cricket. We know what the fans want.</p>
                  </div>

                   {/* Card 6 */}
                  <div className="p-8 rounded-2xl bg-[#0b1610] border border-[#233228] hover:border-[#00d65c]/50 transition-colors group">
                      <div className="w-12 h-12 rounded-xl bg-[#00d65c]/10 flex items-center justify-center text-[#00d65c] mb-6 group-hover:bg-[#00d65c] group-hover:text-[#0b1610] transition-colors">
                          <Lock className="w-6 h-6" />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-3">Data Privacy</h3>
                      <p className="text-gray-400 text-sm leading-relaxed">Your data is protected by industry-standard SSL encryption. We never share your info.</p>
                  </div>
              </div>
          </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 container mx-auto px-4">
          <div className="bg-[#112218] rounded-3xl p-12 text-center border border-[#233228] relative overflow-hidden">
               <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#00d65c]/10 via-transparent to-transparent" />
              <div className="relative z-10">
                  <h2 className="text-4xl font-bold text-white mb-6">Ready to Win?</h2>
                  <p className="text-gray-400 max-w-xl mx-auto mb-8 text-lg">
                      Join thousands of satisfied players in Bangladesh. Sign up today and get a 100% Welcome Bonus on your first deposit.
                  </p>
                  <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                      <Button size="lg" className="bg-[#00d65c] hover:bg-[#00b04c] text-[#0b1610] font-bold min-w-[200px] h-14 text-lg">
                          Join Now
                      </Button>
                      <Button variant="outline" size="lg" className="border-[#233228] text-white hover:bg-[#1d2e24] bg-transparent min-w-[200px] h-14 text-lg">
                          Contact Support
                      </Button>
                  </div>
              </div>
          </div>
      </section>
    </div>
  );
}
