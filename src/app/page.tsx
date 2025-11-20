"use client";

/**
 * Home Page - EASY BET
 * Main landing page with live events and upcoming matches
 */

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ROUTES, SPORTS } from "@/lib/constants";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="gradient-primary text-white py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Welcome to <span className="text-secondary">EASY BET</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90">
            Your Premier Sports Betting Platform
          </p>
          <p className="text-lg mb-8 max-w-2xl mx-auto text-white/80">
            Place bets on football, cricket, basketball, and more.
            Live betting, competitive odds, and instant payouts.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href={ROUTES.REGISTER}>
              <Button size="lg" variant="secondary" className="bg-secondary hover:bg-secondary/90">
                Get Started
              </Button>
            </Link>
            <Link href={ROUTES.LIVE_EVENTS}>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                View Live Events
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Sports Categories */}
      <section className="py-12 px-4 bg-card">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Choose Your Sport
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {SPORTS.map((sport) => (
              <Link key={sport.id} href={sport.path}>
                <Card className="hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-2">{sport.icon}</div>
                    <p className="font-semibold">{sport.name}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Why Choose EASY BET?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl">⚡</span>
                </div>
                <CardTitle>Live Betting</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Bet on live matches with real-time odds updates and instant placement.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl">💰</span>
                </div>
                <CardTitle>Competitive Odds</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Get the best odds in the market with our competitive pricing.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl">🔒</span>
                </div>
                <CardTitle>Secure & Fast</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Your funds are secure with instant deposits and fast withdrawals.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Live Events Teaser */}
      <section className="py-12 px-4 bg-card">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Live Events</h2>
            <Link href={ROUTES.LIVE_EVENTS}>
              <Button variant="outline">View All</Button>
            </Link>
          </div>

          <Card>
            <CardContent className="p-8 text-center">
              <Badge className="mb-4 bg-accent">LIVE</Badge>
              <p className="text-lg text-muted-foreground mb-4">
                Connect to see live matches and place bets in real-time
              </p>
              <Link href={ROUTES.REGISTER}>
                <Button className="bg-primary hover:bg-primary/90">
                  Sign Up to Start Betting
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 gradient-primary text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Start Winning?
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Join thousands of users betting on their favorite sports
          </p>
          <Link href={ROUTES.REGISTER}>
            <Button size="lg" variant="secondary" className="bg-secondary hover:bg-secondary/90">
              Create Your Account
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary text-white py-12 px-4">
        <div className="container mx-auto grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold text-primary mb-4">EASY BET</h3>
            <p className="text-white/70">
              Your trusted sports betting platform
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-white/70">
              <li><Link href={ROUTES.ABOUT} className="hover:text-primary">About Us</Link></li>
              <li><Link href={ROUTES.CONTACT} className="hover:text-primary">Contact</Link></li>
              <li><Link href={ROUTES.BETS} className="hover:text-primary">Bets</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Sports</h4>
            <ul className="space-y-2 text-white/70">
              <li><Link href={ROUTES.FOOTBALL} className="hover:text-primary">Football</Link></li>
              <li><Link href={ROUTES.CRICKET} className="hover:text-primary">Cricket</Link></li>
              <li><Link href={ROUTES.BASKETBALL} className="hover:text-primary">Basketball</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Account</h4>
            <ul className="space-y-2 text-white/70">
              <li><Link href={ROUTES.LOGIN} className="hover:text-primary">Login</Link></li>
              <li><Link href={ROUTES.REGISTER} className="hover:text-primary">Register</Link></li>
              <li><Link href={ROUTES.DASHBOARD} className="hover:text-primary">Dashboard</Link></li>
            </ul>
          </div>
        </div>
        <div className="container mx-auto mt-8 pt-8 border-t border-white/10 text-center text-white/60">
          <p>&copy; 2025 EASY BET. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
