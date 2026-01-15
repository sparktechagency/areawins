"use client";

import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { formatCurrency } from "@/lib/utils";
import {
  CheckCircle2,
  Copy,
  Gift,
  Share2,
  TrendingUp,
  Users,
  Wallet,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";

import { MOCK_REFERRED_FRIENDS } from "@/data/friends.data";

export default function FriendsReferralPage() {
  const referFriends = MOCK_REFERRED_FRIENDS;

  const [referralCode] = useState("BETPRO-99-PRO");
  const referralLink = `https://easybet.pro/register?ref=${referralCode}`;

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard!`);
  };

  return (
    <DashboardLayout>
      <div className="w-full mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-black text-foreground flex items-center gap-3 uppercase tracking-tight">
            Refer & Earn <Gift className="w-8 h-8 text-primary" />
          </h1>
          <p className="text-muted-foreground mt-2 font-medium">
            Invite your friends and earn commission from their betting activity.
          </p>
        </div>

        {/* Top Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-primary/5 border-primary/20 shadow-none">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 text-primary mb-2">
                <Users className="size-5" />
                <p className="text-xs font-black uppercase tracking-widest">
                  Total Referred
                </p>
              </div>
              <div className="text-3xl font-black text-foreground">
                12 Friends
              </div>
              <p className="text-[10px] text-muted-foreground mt-1 font-bold">
                +2 this week
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border shadow-none">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 text-emerald-500 mb-2">
                <Wallet className="size-5" />
                <p className="text-xs font-black uppercase tracking-widest">
                  Commission Earned
                </p>
              </div>
              <div className="text-3xl font-black text-foreground">
                {formatCurrency(655)}
              </div>
              <p className="text-[10px] text-muted-foreground mt-1 font-bold">
                Lifetime earnings
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border shadow-none">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 text-blue-500 mb-2">
                <TrendingUp className="size-5" />
                <p className="text-xs font-black uppercase tracking-widest">
                  Active Rate
                </p>
              </div>
              <div className="text-3xl font-black text-foreground">85%</div>
              <p className="text-[10px] text-muted-foreground mt-1 font-bold">
                Based on last 30 days
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Referral Link Section */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="border-border shadow-none bg-card overflow-hidden">
              <div className="h-2 bg-primary w-full" />
              <CardHeader>
                <CardTitle className="text-xl font-black uppercase tracking-tight">
                  Your Referral Link
                </CardTitle>
                <CardDescription>
                  Share this link to start earning
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest px-1">
                    Registration Link
                  </p>
                  <div className="flex gap-2">
                    <Input
                      value={referralLink}
                      readOnly
                      className="bg-muted/50 border-border font-medium text-xs h-11"
                    />
                    <Button
                      size="icon"
                      variant="outline"
                      className="shrink-0 size-11 rounded-lg border-border"
                      onClick={() => copyToClipboard(referralLink, "Link")}
                    >
                      <Copy className="size-4" />
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest px-1">
                    Referral Code
                  </p>
                  <div className="flex gap-2">
                    <Input
                      value={referralCode}
                      readOnly
                      className="bg-muted/50 border-border font-black text-primary tracking-widest h-11 text-center"
                    />
                    <Button
                      size="icon"
                      variant="outline"
                      className="shrink-0 size-11 rounded-lg border-border"
                      onClick={() => copyToClipboard(referralCode, "Code")}
                    >
                      <Copy className="size-4" />
                    </Button>
                  </div>
                </div>
                <Button className="w-full h-12 font-black uppercase tracking-widest gap-2 rounded-lg">
                  <Share2 className="size-4" /> Share on WhatsApp
                </Button>
              </CardContent>
            </Card>

            <Card className="border-dashed border-primary/30 shadow-none bg-primary/5">
              <CardContent className="p-6 space-y-4">
                <h4 className="font-black text-primary flex items-center gap-2 text-sm uppercase tracking-widest">
                  <TrendingUp className="size-4" /> How it works
                </h4>
                <ul className="space-y-3">
                  {[
                    "Share your link with friends",
                    "They register and start betting",
                    "Earn 5% from their winning pots",
                  ].map((step, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-xs font-medium text-foreground/80"
                    >
                      <CheckCircle2 className="size-4 text-emerald-500 shrink-0" />
                      {step}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Friends List Table */}
          <div className="lg:col-span-2">
            <Card className="border-border shadow-none bg-card">
              <CardHeader className="flex flex-row items-center justify-between border-b border-border py-6 px-8">
                <div>
                  <CardTitle className="text-xl font-black uppercase tracking-tight">
                    Referred Friends
                  </CardTitle>
                  <CardDescription>
                    Recently joined users via your link
                  </CardDescription>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-primary font-black uppercase tracking-widest text-[10px]"
                >
                  View Performance
                </Button>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto no-scrollbar">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-muted/30 border-b border-border">
                        <th className="py-4 px-8 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                          User info
                        </th>
                        <th className="py-4 px-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                          Status
                        </th>
                        <th className="py-4 px-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground text-right">
                          Commission
                        </th>
                        <th className="py-4 px-8 text-[10px] font-black uppercase tracking-widest text-muted-foreground text-right">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {referFriends.map((friend) => (
                        <tr
                          key={friend.id}
                          className="hover:bg-muted/20 transition-colors"
                        >
                          <td className="py-5 px-8">
                            <div className="flex items-center gap-3">
                              <div className="size-10 rounded-full bg-muted border border-border overflow-hidden relative">
                                <Image
                                  src={friend.avatar}
                                  alt={friend.name}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div>
                                <p className="font-black text-sm text-foreground">
                                  {friend.name}
                                </p>
                                <p className="text-[10px] font-bold text-muted-foreground">
                                  {friend.email}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="py-5 px-4 text-xs">
                            <Badge
                              variant={
                                friend.status === "Active"
                                  ? "default"
                                  : "secondary"
                              }
                              className={
                                friend.status === "Active"
                                  ? "bg-emerald-500 hover:bg-emerald-600 rounded-full font-black text-[9px] uppercase tracking-widest"
                                  : "rounded-full font-black text-[9px] uppercase tracking-widest"
                              }
                            >
                              {friend.status}
                            </Badge>
                          </td>
                          <td className="py-5 px-4 text-right">
                            <p className="font-black text-emerald-500">
                              {formatCurrency(friend.earned)}
                            </p>
                          </td>
                          <td className="py-5 px-8 text-right">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-muted-foreground hover:text-primary transition-colors"
                            >
                              Details
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {referFriends.length === 0 && (
                  <div className="p-12 text-center text-muted-foreground font-black uppercase tracking-widest text-xs">
                    No friends referred yet.
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
