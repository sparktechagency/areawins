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
import { CheckCircle2, Copy, Gift, Share2, TrendingUp, Users, Wallet, AlertCircle } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

import { MOCK_REFERRED_FRIENDS } from "@/data/friends.data";
import { useTranslation } from "@/i18n/LanguageContext";

const ReferralFriends = () => {
  const { t } = useTranslation();
  const referFriends = MOCK_REFERRED_FRIENDS;

  const [referralCode] = useState("BETPRO-99-PRO");
  const referralLink = `https://areawins.pro/register?ref=${referralCode}`;
  const [formMessage, setFormMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setFormMessage({
      type: "success",
      text: `${label} ${t("referral.copiedToClipboard") || "copied to clipboard"}`,
    });
    setTimeout(() => setFormMessage(null), 3000);
  };

  return (
    <DashboardLayout>
      <div className="w-full mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl  text-foreground flex items-center gap-3 uppercase tracking-tight">
            {t("referral.title")} <Gift className="w-8 h-8 text-primary" />
          </h1>
          <p className="text-muted-foreground mt-2 font-medium">
            {t("referral.subtitle")}
          </p>
        </div>

        {/* Top Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-primary/5 border-primary/20 shadow-none">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 text-primary mb-2">
                <Users className="size-5" />
                <p className="text-xs  uppercase tracking-widest">
                  {t("referral.totalReferred")}
                </p>
              </div>
              <div className="text-3xl  text-foreground">
                {t("referral.totalReferredValue")}
              </div>
              <p className="text-[10px] text-muted-foreground mt-1 font-bold">
                {t("referral.totalReferredDelta")}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border shadow-none">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 text-emerald-500 mb-2">
                <Wallet className="size-5" />
                <p className="text-xs  uppercase tracking-widest">
                  {t("referral.commissionEarned")}
                </p>
              </div>
              <div className="text-3xl  text-foreground">
                {formatCurrency(655)}
              </div>
              <p className="text-[10px] text-muted-foreground mt-1 font-bold">
                {t("referral.lifetimeEarnings")}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border shadow-none">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 text-blue-500 mb-2">
                <TrendingUp className="size-5" />
                <p className="text-xs  uppercase tracking-widest">
                  {t("referral.activeRate")}
                </p>
              </div>
              <div className="text-3xl  text-foreground">85%</div>
              <p className="text-[10px] text-muted-foreground mt-1 font-bold">
                {t("referral.basedLast30Days")}
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
                <CardTitle className="text-xl  uppercase tracking-tight">
                  {t("referral.yourReferralLink")}
                </CardTitle>
                <CardDescription>{t("referral.shareThisLink")}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {formMessage && (
                  <div
                    className={cn(
                      "p-3 rounded-md flex items-center gap-2 text-sm font-medium animate-in fade-in slide-in-from-top-1",
                      formMessage.type === "success"
                        ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"
                        : "bg-destructive/10 text-destructive border border-destructive/20",
                    )}
                  >
                    {formMessage.type === "success" ? (
                      <CheckCircle2 className="size-4 shrink-0" />
                    ) : (
                      <AlertCircle className="size-4 shrink-0" />
                    )}
                    {formMessage.text}
                  </div>
                )}
                <div className="space-y-2">
                  <p className="text-[10px]  text-muted-foreground uppercase tracking-widest px-1">
                    {t("referral.registrationLink")}
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
                      onClick={() =>
                        copyToClipboard(referralLink, t("referral.linkLabel"))
                      }
                    >
                      <Copy className="size-4" />
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-[10px]  text-muted-foreground uppercase tracking-widest px-1">
                    {t("referral.referralCode")}
                  </p>
                  <div className="flex gap-2">
                    <Input
                      value={referralCode}
                      readOnly
                      className="bg-muted/50 border-border  text-primary tracking-widest h-11 text-center"
                    />
                    <Button
                      size="icon"
                      variant="outline"
                      className="shrink-0 size-11 rounded-lg border-border"
                      onClick={() =>
                        copyToClipboard(referralCode, t("referral.codeLabel"))
                      }
                    >
                      <Copy className="size-4" />
                    </Button>
                  </div>
                </div>
                <Button className="w-full h-12  uppercase tracking-widest gap-2 rounded-lg">
                  <Share2 className="size-4" /> {t("referral.shareOnWhatsApp")}
                </Button>
              </CardContent>
            </Card>

            <Card className="border-dashed border-primary/30 shadow-none bg-primary/5">
              <CardContent className="p-6 space-y-4">
                <h4 className=" text-primary flex items-center gap-2 text-sm uppercase tracking-widest">
                  <TrendingUp className="size-4" /> {t("referral.howItWorks")}
                </h4>
                <ul className="space-y-3">
                  {[
                    t("referral.step1"),
                    t("referral.step2"),
                    t("referral.step3"),
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
                  <CardTitle className="text-xl  uppercase tracking-tight">
                    {t("referral.referredFriends")}
                  </CardTitle>
                  <CardDescription>
                    {t("referral.recentlyJoinedUsers")}
                  </CardDescription>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-primary  uppercase tracking-widest text-[10px]"
                >
                  {t("referral.viewPerformance")}
                </Button>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto no-scrollbar">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-muted/30 border-b border-border">
                        <th className="py-4 px-8 text-[10px]  uppercase tracking-widest text-muted-foreground">
                          {t("referral.userInfo")}
                        </th>
                        <th className="py-4 px-4 text-[10px]  uppercase tracking-widest text-muted-foreground">
                          {t("referral.status")}
                        </th>
                        <th className="py-4 px-4 text-[10px]  uppercase tracking-widest text-muted-foreground text-right">
                          {t("referral.commission")}
                        </th>
                        <th className="py-4 px-8 text-[10px]  uppercase tracking-widest text-muted-foreground text-right">
                          {t("referral.action")}
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
                                <p className=" text-sm text-foreground">
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
                                  ? "bg-emerald-500 hover:bg-emerald-600 rounded-full  text-[9px] uppercase tracking-widest"
                                  : "rounded-full  text-[9px] uppercase tracking-widest"
                              }
                            >
                              {friend.status === "Active"
                                ? t("referral.active")
                                : t("referral.pending")}
                            </Badge>
                          </td>
                          <td className="py-5 px-4 text-right">
                            <p className=" text-emerald-500">
                              {formatCurrency(friend.earned)}
                            </p>
                          </td>
                          <td className="py-5 px-8 text-right">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-muted-foreground hover:text-primary transition-colors"
                            >
                              {t("referral.details")}
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {referFriends.length === 0 && (
                  <div className="p-12 text-center text-muted-foreground  uppercase tracking-widest text-xs">
                    {t("referral.noFriends")}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ReferralFriends;
