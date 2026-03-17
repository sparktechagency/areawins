"use client";

import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import {
    ArrowLeft,
    Bell,
    Camera,
    CreditCard,
    Lock,
    ShieldCheck,
    User,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import NotificationsSettings from "./NotificationsSettings";
import SecuritySettings from "./SecuritySettings";

export default function EditProfilePage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"personal" | "security" | "notifications" | "kyc" | "payment">("personal");

  // Form States
  const [formData, setFormData] = useState({
    nickname: user?.nickname || "",
    fullName: user?.fullName || "",
    email: user?.email || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // TODO: Implement save API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    toast.success("Profile updated successfully");
    setLoading(false);
  };

  const settingsTabs = [
    { id: "personal", label: "Personal Info", icon: User },
    { id: "security", label: "Security", icon: Lock },
    { id: "kyc", label: "KYC Verification", icon: ShieldCheck },
    { id: "payment", label: "Payment Methods", icon: CreditCard },
    { id: "notifications", label: "Notifications", icon: Bell },
  ];

  return (
    <DashboardLayout>
      <div className="w-full mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8 flex items-center gap-3 sm:gap-4">
          <Link href="/dashboard/profile">
            <Button variant="outline" size="sm" className="h-9 sm:h-10 w-9 sm:w-10 p-0">
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-foreground uppercase tracking-tight">
              Edit Profile
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground font-medium mt-1">
              Update your account information
            </p>
          </div>
        </div>

        {/* Main Content - Sidebar + Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 sm:gap-6">
          {/* Settings Sidebar */}
          <div className="md:col-span-1 order-2 md:order-1">
            <Card className="border-border shadow-none sticky top-24">
              <CardContent className="p-0">
                {/* Profile Summary */}
                <div className="p-4 sm:p-6 border-b border-border bg-muted/30">
                  <div className="flex flex-col items-center">
                    <Avatar className="w-16 sm:w-20 h-16 sm:h-20 mb-3 border-2 border-primary/20">
                      <AvatarImage src={user?.profileImage} />
                      <AvatarFallback className="text-lg sm:text-2xl font-black bg-primary/10 text-primary">
                        {formData.fullName.charAt(0) || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <h3 className="font-black text-sm sm:text-base text-center text-foreground">
                      {formData.fullName || "User"}
                    </h3>
                    <p className="text-[10px] sm:text-xs text-muted-foreground mt-1">
                      {user?.email}
                    </p>
                  </div>
                </div>

                {/* Navigation */}
                <nav className="p-2 sm:p-3 space-y-1">
                  {settingsTabs.map((tab) => {
                    const IconComponent = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() =>
                          setActiveTab(tab.id as "personal" | "security" | "notifications" | "kyc" | "payment")
                        }
                        className={`w-full flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-bold uppercase tracking-widest transition-colors ${
                          activeTab === tab.id
                            ? "bg-primary/10 text-primary"
                            : "text-muted-foreground hover:bg-muted"
                        }`}
                      >
                        <IconComponent className="w-4 h-4" />
                        <span className="hidden sm:inline">{tab.label}</span>
                        <span className="sm:hidden text-[10px]">{tab.id}</span>
                      </button>
                    );
                  })}
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Form Content */}
          <div className="md:col-span-3 order-1 md:order-2">
            {/* Personal Information Tab */}
            {activeTab === "personal" && (
              <Card className="border-border shadow-none">
                <CardHeader className="p-4 sm:p-6 border-b border-border">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-lg sm:text-xl font-bold text-foreground">
                        Personal Information
                      </h2>
                      <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                        Manage your personal details
                      </p>
                    </div>
                    <Button
                      onClick={handleSave}
                      disabled={loading}
                      className="text-xs sm:text-sm font-black uppercase tracking-widest"
                    >
                      {loading ? "Saving..." : "Save"}
                    </Button>
                  </div>
                </CardHeader>

                <CardContent className="p-4 sm:p-6 space-y-6 sm:space-y-8">
                  {/* Profile Picture Upload */}
                  <div className="border-2 border-dashed border-border rounded-lg p-4 sm:p-6 bg-muted/30">
                    <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                      <div className="relative group">
                        <Avatar className="w-20 sm:w-24 h-20 sm:h-24 border-2 border-primary/20">
                          <AvatarImage src={user?.profileImage} />
                          <AvatarFallback className="text-2xl sm:text-3xl font-black bg-primary/10 text-primary">
                            {formData.fullName.charAt(0) || "U"}
                          </AvatarFallback>
                        </Avatar>
                        <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <Camera className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-black text-sm sm:text-base text-foreground">
                          Profile Picture
                        </h4>
                        <p className="text-[10px] sm:text-xs text-muted-foreground mt-1">
                          JPG, PNG or GIF. Max size of 5MB.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-3 sm:mt-4">
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-xs sm:text-sm font-bold uppercase tracking-widest"
                          >
                            Upload New
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-xs sm:text-sm font-bold uppercase tracking-widest text-destructive hover:text-destructive"
                          >
                            Remove
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Form Grid */}
                  <div className="space-y-4 sm:space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                      <div className="space-y-1.5 sm:space-y-2">
                        <Label className="text-xs sm:text-sm font-black uppercase tracking-widest">
                          Full Name
                        </Label>
                        <Input
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          className="text-xs sm:text-sm"
                        />
                      </div>
                      <div className="space-y-1.5 sm:space-y-2">
                        <Label className="text-xs sm:text-sm font-black uppercase tracking-widest">
                          Username
                        </Label>
                        <Input
                          name="nickname"
                          value={formData.nickname}
                          onChange={handleChange}
                          className="text-xs sm:text-sm"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5 sm:space-y-2">
                      <Label className="text-xs sm:text-sm font-black uppercase tracking-widest">
                        Email Address
                      </Label>
                      <Input
                        name="email"
                        value={formData.email}
                        type="email"
                        disabled
                        className="text-xs sm:text-sm bg-muted/50"
                      />
                      <p className="text-[10px] sm:text-xs text-muted-foreground">
                        Email cannot be changed. Contact support for assistance.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Security Tab */}
            {activeTab === "security" && (
              <div className="space-y-4 sm:space-y-6">
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-foreground">
                    Security Settings
                  </h2>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                    Manage your account security and passwords
                  </p>
                </div>
                <SecuritySettings />
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === "notifications" && (
              <div className="space-y-4 sm:space-y-6">
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-foreground">
                    Notification Preferences
                  </h2>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                    Control how you receive notifications across all channels
                  </p>
                </div>
                <NotificationsSettings />
              </div>
            )}

            {/* KYC Verification Tab */}
            {activeTab === "kyc" && (
              <Card className="border-border shadow-none">
                <CardHeader className="p-4 sm:p-6 border-b border-border bg-muted/30">
                  <h2 className="text-lg sm:text-xl font-bold text-foreground flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-emerald-500" />
                    KYC Verification
                  </h2>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                    Your identity verification status
                  </p>
                </CardHeader>
                <CardContent className="p-4 sm:p-6">
                  <div className="p-4 sm:p-6 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
                    <p className="text-xs sm:text-sm font-black text-emerald-500 uppercase tracking-widest mb-2">
                      Verified
                    </p>
                    <p className="text-sm sm:text-base text-foreground font-bold">
                      Your account is fully verified
                    </p>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-2">
                      You can withdraw unlimited funds and access all premium features.
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Payment Methods Tab */}
            {activeTab === "payment" && (
              <Card className="border-border shadow-none">
                <CardHeader className="p-4 sm:p-6 border-b border-border bg-muted/30">
                  <h2 className="text-lg sm:text-xl font-bold text-foreground flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-primary" />
                    Payment Methods
                  </h2>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                    Manage your saved payment methods
                  </p>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 space-y-4 sm:space-y-5">
                  <div className="p-4 sm:p-6 bg-muted/50 border border-dashed border-border rounded-lg text-center">
                    <CreditCard className="w-8 h-8 mx-auto text-muted-foreground mb-3 opacity-40" />
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      No payment methods added yet
                    </p>
                    <Button className="mt-4 text-xs sm:text-sm font-black uppercase tracking-widest">
                      Add Payment Method
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
