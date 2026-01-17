"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Mail, MessageCircle, Phone } from "lucide-react";
import Link from "next/link";

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-background pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            How can we help?
          </h1>
          <p className="text-xl text-muted-foreground">
            Our dedicated support team is available 24/7 to assist you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center hover:border-primary transition-colors">
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
                <MessageCircle className="w-6 h-6" />
              </div>
              <CardTitle>Live Chat</CardTitle>
              <CardDescription>Instant support</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Average response time: 2 mins
              </p>
              <Button className="w-full">Start Chat</Button>
            </CardContent>
          </Card>

          <Card className="text-center hover:border-primary transition-colors">
            <CardHeader>
              <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-500">
                <Mail className="w-6 h-6" />
              </div>
              <CardTitle>Email Us</CardTitle>
              <CardDescription>For detailed inquiries</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                support@easybet.com
              </p>
              <Button variant="outline" className="w-full">
                Send Email
              </Button>
            </CardContent>
          </Card>

          <Card className="text-center hover:border-primary transition-colors">
            <CardHeader>
              <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4 text-green-500">
                <Phone className="w-6 h-6" />
              </div>
              <CardTitle>WhatsApp</CardTitle>
              <CardDescription>Mobile support</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                +880 1XXX XXXXXX
              </p>
              <Button variant="outline" className="w-full">
                Chat on WhatsApp
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <p className="text-muted-foreground mb-4">
            Looking for general information?
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/terms" className="text-primary hover:underline">
              Terms & Conditions
            </Link>
            <span className="text-border">|</span>
            <Link href="/privacy" className="text-primary hover:underline">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
