"use client";

import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { HelpCircle, Mail, MessageSquare, Phone } from "lucide-react";

export default function SupportPage() {
  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
            Support Center <HelpCircle className="w-8 h-8 text-primary" />
          </h1>
          <p className="text-muted-foreground mt-2">
            We are here to help you 24/7
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
           <Card className="flex flex-col items-center text-center p-6">
              <div className="p-4 bg-primary/10 rounded-full mb-4">
                 <MessageSquare className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-bold mb-2">Live Chat</h3>
              <p className="text-sm text-muted-foreground mb-4">Chat with our support team instantly</p>
              <Button className="w-full">Start Chat</Button>
           </Card>

           <Card className="flex flex-col items-center text-center p-6">
              <div className="p-4 bg-primary/10 rounded-full mb-4">
                 <Mail className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-bold mb-2">Email Support</h3>
              <p className="text-sm text-muted-foreground mb-4">Get a response within 24 hours</p>
              <Button variant="outline" className="w-full">Send Email</Button>
           </Card>

           <Card className="flex flex-col items-center text-center p-6">
              <div className="p-4 bg-primary/10 rounded-full mb-4">
                 <Phone className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-bold mb-2">Phone</h3>
              <p className="text-sm text-muted-foreground mb-4">Call us directly for urgent matters</p>
              <Button variant="outline" className="w-full">+880 1234 567890</Button>
           </Card>
        </div>

        <Card>
           <CardHeader>
              <CardTitle>Send us a message</CardTitle>
              <CardDescription>Fill out the form below and we will get back to you.</CardDescription>
           </CardHeader>
           <CardContent>
              <form className="space-y-4">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                       <Label htmlFor="name">Name</Label>
                       <Input id="name" placeholder="Your name" />
                    </div>
                    <div className="space-y-2">
                       <Label htmlFor="email">Email</Label>
                       <Input id="email" type="email" placeholder="your@email.com" />
                    </div>
                 </div>
                 
                 <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" placeholder="What is this regarding?" />
                 </div>

                 <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea id="message" placeholder="Describe your issue in detail..." rows={6} />
                 </div>

                 <Button className="w-full md:w-auto">Submit Ticket</Button>
              </form>
           </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
