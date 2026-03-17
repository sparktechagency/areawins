"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Mail, MessageSquare, Smartphone } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface NotificationSettings {
  emailBets: boolean;
  emailPromos: boolean;
  emailSecurity: boolean;
  smsBets: boolean;
  smsPromos: boolean;
  pushNotifications: boolean;
}

export default function NotificationsSettings() {
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState<NotificationSettings>({
    emailBets: true,
    emailPromos: false,
    emailSecurity: true,
    smsBets: true,
    smsPromos: false,
    pushNotifications: true,
  });

  const handleToggle = (key: keyof NotificationSettings) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = async () => {
    setLoading(true);
    // TODO: Implement API call to save notification settings
    await new Promise((resolve) => setTimeout(resolve, 1500));
    toast.success("Notification settings updated");
    setLoading(false);
  };

  const notificationOptions: Array<{
    section: string;
    icon: any;
    options: Array<{
      key: keyof NotificationSettings;
      label: string;
      description: string;
    }>;
  }> = [
    {
      section: "Email Notifications",
      icon: Mail,
      options: [
        {
          key: "emailBets",
          label: "Bet Updates",
          description: "Get updates when your bets settle or odds change",
        },
        {
          key: "emailPromos",
          label: "Promotions & Offers",
          description: "Receive exclusive promos, bonuses, and special offers",
        },
        {
          key: "emailSecurity",
          label: "Security Alerts",
          description: "Important alerts about your account security",
        },
      ],
    },
    {
      section: "SMS Notifications",
      icon: Smartphone,
      options: [
        {
          key: "smsBets",
          label: "Bet Settlements",
          description: "Get SMS notifications when bets settle",
        },
        {
          key: "smsPromos",
          label: "Special Offers",
          description: "SMS alerts for time-limited offers",
        },
      ],
    },
    {
      section: "Push Notifications",
      icon: MessageSquare,
      options: [
        {
          key: "pushNotifications",
          label: "App Notifications",
          description: "In-app push notifications for important updates",
        },
      ],
    },
  ];

  return (
    <div className="space-y-4 sm:space-y-6">
      {notificationOptions.map((section, idx) => {
        const IconComponent = section.icon;
        return (
          <Card key={idx} className="border-border shadow-none">
            <CardHeader className="p-4 sm:p-6 border-b border-border bg-muted/30">
              <div className="flex items-center gap-3">
                <IconComponent className="w-5 h-5 text-primary" />
                <CardTitle className="text-base sm:text-lg font-bold">
                  {section.section}
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 space-y-3 sm:space-y-4">
              {section.options.map((option) => (
                <div
                  key={option.key}
                  className="flex items-start justify-between p-3 sm:p-4 bg-muted/30 rounded-lg border border-border hover:border-primary/20 transition-colors"
                >
                  <div className="flex-1 pr-3 sm:pr-4">
                    <Label className="text-xs sm:text-sm font-bold uppercase tracking-widest text-foreground cursor-pointer">
                      {option.label}
                    </Label>
                    <p className="text-[10px] sm:text-xs text-muted-foreground mt-1">
                      {option.description}
                    </p>
                  </div>
                  <Switch
                    checked={settings[option.key]}
                    onCheckedChange={() => handleToggle(option.key)}
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        );
      })}

      {/* Save Button */}
      <div className="flex justify-end pt-2 sm:pt-4">
        <Button
          onClick={handleSave}
          disabled={loading}
          className="text-xs sm:text-sm font-black uppercase tracking-widest px-6 sm:px-8"
        >
          {loading ? "Saving..." : "Save Preferences"}
        </Button>
      </div>
    </div>
  );
}
