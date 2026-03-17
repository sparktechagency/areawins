"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, Check, Eye, EyeOff, Lock, Shield } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import ChangePasswordModal from "./ChangePasswordModal";

export default function SecuritySettings() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [show2FAModal, setShow2FAModal] = useState(false);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);

  const handleEnable2FA = async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    toast.success("2FA enabled successfully");
    setLoading(false);
    setShow2FAModal(false);
  };

  const handleDisable2FA = async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    toast.success("2FA disabled");
    setIs2FAEnabled(false);
    setLoading(false);
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Password Section */}
      <Card className="border-border shadow-none">
        <CardHeader className="p-4 sm:p-6 border-b border-border bg-muted/30">
          <div className="flex items-center gap-3">
            <Lock className="w-5 h-5 text-primary" />
            <CardTitle className="text-base sm:text-lg font-bold">
              Password
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-4 sm:p-6 space-y-4 sm:space-y-5">
          <div className="p-3 sm:p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg flex gap-3">
            <AlertCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
            <p className="text-xs sm:text-sm text-foreground">
              Keep your password strong and unique. Change it regularly for better security.
            </p>
          </div>

          <div className="space-y-3 sm:space-y-4">
            <div>
              <Label className="text-xs sm:text-sm font-black uppercase tracking-widest text-muted-foreground mb-2 block">
                Current Password
              </Label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  disabled
                  className="text-xs sm:text-sm bg-muted/50"
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <Button
              onClick={() => setShowChangePasswordModal(true)}
              className="w-full text-xs sm:text-sm font-black uppercase tracking-widest"
            >
              Change Password
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Two-Factor Authentication */}
      <Card className="border-border shadow-none">
        <CardHeader className="p-4 sm:p-6 border-b border-border bg-muted/30">
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5 text-primary" />
            <CardTitle className="text-base sm:text-lg font-bold">
              Two-Factor Authentication
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-4 sm:p-6 space-y-4 sm:space-y-5">
          <p className="text-xs sm:text-sm text-muted-foreground">
            Add an extra layer of security to your account using authenticator apps like Google Authenticator or Authy.
          </p>

          <div className="p-3 sm:p-4 bg-muted/50 rounded-lg border border-border">
            <div className="flex items-center justify-between mb-2 sm:mb-3">
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${is2FAEnabled ? "bg-emerald-500" : "bg-muted-foreground"}`} />
                <span className="text-xs sm:text-sm font-bold">
                  Status: {is2FAEnabled ? "Enabled" : "Disabled"}
                </span>
              </div>
            </div>
            <p className="text-[10px] sm:text-xs text-muted-foreground">
              {is2FAEnabled
                ? "Your account is protected with 2FA"
                : "Enable 2FA to secure your account"}
            </p>
          </div>

          <div className="flex gap-2 sm:gap-3">
            {!is2FAEnabled ? (
              <Button
                onClick={() => setShow2FAModal(true)}
                className="flex-1 text-xs sm:text-sm font-black uppercase tracking-widest"
              >
                <Shield className="w-4 h-4 mr-2" />
                Enable 2FA
              </Button>
            ) : (
              <Button
                onClick={handleDisable2FA}
                disabled={loading}
                variant="outline"
                className="flex-1 text-xs sm:text-sm font-black uppercase tracking-widest text-destructive hover:text-destructive"
              >
                Disable 2FA
              </Button>
            )}
          </div>

          {is2FAEnabled && (
            <div className="p-3 sm:p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-lg flex gap-3">
              <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <p className="text-xs sm:text-sm text-foreground">
                Two-factor authentication is active on your account
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Active Sessions */}
      <Card className="border-border shadow-none">
        <CardHeader className="p-4 sm:p-6 border-b border-border bg-muted/30">
          <CardTitle className="text-base sm:text-lg font-bold">
            Active Sessions
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-6 space-y-3 sm:space-y-4">
          <div className="space-y-2 sm:space-y-3">
            <div className="p-3 sm:p-4 bg-muted/50 rounded-lg border border-border flex items-start justify-between">
              <div>
                <p className="text-xs sm:text-sm font-bold text-foreground">
                  Chrome on Windows
                </p>
                <p className="text-[10px] sm:text-xs text-muted-foreground mt-1">
                  Last active: 2 hours ago
                </p>
              </div>
              <span className="px-2.5 py-1 text-[10px] sm:text-xs font-bold bg-emerald-500/20 text-emerald-500 rounded">
                CURRENT
              </span>
            </div>

            <div className="p-3 sm:p-4 bg-muted/50 rounded-lg border border-border flex items-start justify-between">
              <div>
                <p className="text-xs sm:text-sm font-bold text-foreground">
                  Safari on iPhone
                </p>
                <p className="text-[10px] sm:text-xs text-muted-foreground mt-1">
                  Last active: 1 day ago
                </p>
              </div>
              <Button
                size="sm"
                variant="ghost"
                className="text-destructive hover:text-destructive text-xs font-bold"
              >
                Logout
              </Button>
            </div>
          </div>

          <div className="pt-2 sm:pt-3">
            <Button
              variant="outline"
              className="w-full text-xs sm:text-sm font-black uppercase tracking-widest text-destructive hover:text-destructive"
            >
              Logout All Devices
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Change Password Modal */}
      <ChangePasswordModal
        open={showChangePasswordModal}
        onClose={() => setShowChangePasswordModal(false)}
      />
    </div>
  );
}
