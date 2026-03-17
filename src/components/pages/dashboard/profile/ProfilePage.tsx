"use client";

import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import {
  AlertTriangle,
  Camera,
  Check,
  Copy,
  Edit2,
  Shield,
  Trash2,
  User,
  UserCheck,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import EditAvatarModal from "./EditAvatarModal";
import DeleteAccountModal from "./DeleteAccountModal";

export default function ProfilePage() {
  const { user } = useAuth();
  const [copied, setCopied] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditAvatarModal, setShowEditAvatarModal] = useState(false);

  const handleCopyReferralCode = () => {
    if (user?.referralCode) {
      navigator.clipboard.writeText(user.referralCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <DashboardLayout>
      <div className="w-full mx-auto">
        {/* Page Header */}
        <div className="mb-4 sm:mb-6 md:mb-8">
          <div className="flex items-center gap-2 sm:gap-3 mb-2">
            <div className="p-2 sm:p-2.5 bg-primary/10 rounded-lg">
              <User className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-foreground uppercase tracking-tight">
              My Profile
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground font-medium">
            Manage your account information and settings
          </p>
        </div>

        {/* Profile Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-4 sm:mb-6 md:mb-8">
          {/* Avatar Card */}
          <Card className="border-border shadow-none md:col-span-1">
            <CardContent className="p-4 sm:p-6 flex flex-col items-center">
              <div className="relative mb-4 sm:mb-6">
                <Avatar className="w-24 sm:w-28 md:w-32 h-24 sm:h-28 md:h-32 border-2 sm:border-4 border-primary/20">
                  <AvatarImage src={user?.profileImage} />
                  <AvatarFallback className="text-2xl sm:text-3xl font-black bg-primary/10 text-primary">
                    {user?.fullName?.[0] || "U"}
                  </AvatarFallback>
                </Avatar>
                <button
                  onClick={() => setShowEditAvatarModal(true)}
                  className="absolute bottom-0 right-0 p-1.5 sm:p-2 bg-primary hover:bg-primary/90 rounded-full text-white transition-colors shadow-lg"
                >
                  <Camera className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-center text-foreground">
                {user?.fullName || "User"}
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground font-medium mt-1">
                {user?.email}
              </p>
              <div className="flex items-center gap-2 mt-2 sm:mt-3 px-2.5 py-1 bg-emerald-500/10 rounded-full border border-emerald-500/20">
                <Check className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-500" />
                <span className="text-[10px] sm:text-xs font-black text-emerald-500 uppercase tracking-widest">
                  Verified
                </span>
              </div>
              <Button
                onClick={() => setShowEditAvatarModal(true)}
                className="w-full mt-4 sm:mt-6 text-xs sm:text-sm font-black uppercase tracking-widest"
                variant="outline"
              >
                <Camera className="w-4 h-4 mr-2" />
                Change Photo
              </Button>
            </CardContent>
          </Card>

          {/* Personal Details Card */}
          <Card className="border-border shadow-none md:col-span-2">
            <CardHeader className="p-4 sm:p-6 border-b border-border">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg sm:text-xl font-bold">
                  Personal Information
                </CardTitle>
                <Link href="/dashboard/profile/edit">
                  <Button
                    size="sm"
                    className="text-xs sm:text-sm font-black uppercase tracking-widest"
                  >
                    <Edit2 className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 space-y-4 sm:space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                <div className="space-y-1.5 sm:space-y-2">
                  <Label className="text-xs sm:text-sm font-black uppercase tracking-widest text-muted-foreground">
                    Full Name
                  </Label>
                  <Input
                    value={user?.fullName || ""}
                    readOnly
                    className="bg-muted/50 text-xs sm:text-sm"
                  />
                </div>
                <div className="space-y-1.5 sm:space-y-2">
                  <Label className="text-xs sm:text-sm font-black uppercase tracking-widest text-muted-foreground">
                    Username
                  </Label>
                  <Input
                    value={user?.nickname || ""}
                    readOnly
                    className="bg-muted/50 text-xs sm:text-sm"
                  />
                </div>
              </div>
              <div className="space-y-1.5 sm:space-y-2">
                <Label className="text-xs sm:text-sm font-black uppercase tracking-widest text-muted-foreground">
                  Email Address
                </Label>
                <Input
                  value={user?.email || ""}
                  readOnly
                  className="bg-muted/50 text-xs sm:text-sm"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 pt-2 sm:pt-3">
                <div className="space-y-1.5 sm:space-y-2">
                  <Label className="text-xs sm:text-sm font-black uppercase tracking-widest text-muted-foreground">
                    Account ID
                  </Label>
                  <Input
                    value={user?._id || ""}
                    readOnly
                    className="bg-muted/50 text-[11px] sm:text-xs font-mono"
                  />
                </div>
                <div className="space-y-1.5 sm:space-y-2">
                  <Label className="text-xs sm:text-sm font-black uppercase tracking-widest text-muted-foreground">
                    Joined
                  </Label>
                  <Input
                    value={
                      user?.createdAt
                        ? new Date(user.createdAt).toLocaleDateString()
                        : ""
                    }
                    readOnly
                    className="bg-muted/50 text-xs sm:text-sm"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stats & Referral Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6 md:mb-8">
          {/* Account Status */}
          <Card className="border-border shadow-none">
            <CardHeader className="p-4 sm:p-6 border-b border-border">
              <CardTitle className="text-base sm:text-lg font-bold flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                Account Status
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 space-y-3 sm:space-y-4">
              <div className="flex items-center justify-between py-2 sm:py-3 px-3 sm:px-4 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
                <div className="flex items-center gap-2 sm:gap-3">
                  <UserCheck className="w-5 h-5 text-emerald-500" />
                  <div>
                    <p className="text-xs sm:text-sm font-bold text-foreground">
                      Email Verified
                    </p>
                    <p className="text-[10px] sm:text-xs text-muted-foreground">
                      {user?.isVerified ? "Verified" : "Not Verified"}
                    </p>
                  </div>
                </div>
                {user?.isVerified && (
                  <Check className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500" />
                )}
              </div>
              <div className="flex items-center justify-between py-2 sm:py-3 px-3 sm:px-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                <div className="flex items-center gap-2 sm:gap-3">
                  <Shield className="w-5 h-5 text-blue-500" />
                  <div>
                    <p className="text-xs sm:text-sm font-bold text-foreground">
                      Account Status
                    </p>
                    <p className="text-[10px] sm:text-xs text-muted-foreground">
                      {user?.isActive ? "Active" : "Inactive"}
                    </p>
                  </div>
                </div>
                {user?.isActive && (
                  <Check className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
                )}
              </div>
            </CardContent>
          </Card>

          {/* Referral Code */}
          <Card className="border-border shadow-none">
            <CardHeader className="p-4 sm:p-6 border-b border-border">
              <CardTitle className="text-base sm:text-lg font-bold">
                Referral Code
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 space-y-3 sm:space-y-4">
              <div className="p-3 sm:p-4 bg-muted/50 rounded-lg border border-border">
                <p className="text-[10px] sm:text-xs font-black text-muted-foreground uppercase tracking-widest mb-2">
                  Your Code
                </p>
                <p className="text-base sm:text-lg font-black text-foreground font-mono">
                  {user?.referralCode || "N/A"}
                </p>
              </div>
              <Button
                onClick={handleCopyReferralCode}
                variant="outline"
                className="w-full text-xs sm:text-sm font-black uppercase tracking-widest"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 mr-2" />
                    Copy Code
                  </>
                )}
              </Button>
              <p className="text-[10px] sm:text-xs text-muted-foreground font-medium">
                Share your code to earn credits when friends join
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Danger Zone */}
        <Card className="border-red-500/30 bg-red-500/5 shadow-none">
          <CardHeader className="p-4 sm:p-6 border-b border-red-500/20">
            <div className="flex items-center gap-2 sm:gap-3">
              <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6 text-red-500" />
              <CardTitle className="text-base sm:text-lg font-bold text-red-500">
                Danger Zone
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-4 sm:p-6">
            <div className="space-y-3 sm:space-y-4">
              <p className="text-xs sm:text-sm text-muted-foreground font-medium">
                Deleting your account is permanent and cannot be undone. All
                your betting history, wallet balance, and personal information
                will be permanently deleted.
              </p>
              <Button
                onClick={() => setShowDeleteModal(true)}
                variant="destructive"
                className="w-full text-xs sm:text-sm font-black uppercase tracking-widest"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Account
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Edit Avatar Modal */}
      <EditAvatarModal
        open={showEditAvatarModal}
        onClose={() => setShowEditAvatarModal(false)}
      />

      {/* Delete Account Modal */}
      <DeleteAccountModal
        open={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
      />
    </DashboardLayout>
  );
}
