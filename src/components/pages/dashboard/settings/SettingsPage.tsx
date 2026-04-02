"use client";

import { FormInput } from "@/components/form/FormInput";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { useTranslation } from "@/i18n/LanguageContext";
import {
  AlertCircle,
  AlertTriangle,
  Bell,
  CheckCircle,
  CreditCard,
  Globe,
  Loader2,
  Lock,
  Save,
  Settings as SettingsIcon,
  Trash2,
  X,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import DeleteAccountForm from "../profile/DeleteAccountForm";
import { useChangePasswordMutation } from "@/redux/api/authApi";

export default function SettingsPage() {
  const { t, language, setLanguage } = useTranslation();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Password change states
  const [changePassword, { isLoading: passwordLoading }] =
    useChangePasswordMutation();
  const [passwordForm, setPasswordForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Notification states
  const [notifications, setNotifications] = useState({
    push: true,
    email: false,
    marketing: false,
  });

  const [formMessage, setFormMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handlePasswordChange = (field: string, value: string) => {
    setPasswordForm((prev) => ({ ...prev, [field]: value }));
  };

  const validatePassword = (): boolean => {
    if (!passwordForm.oldPassword.trim()) {
      setFormMessage({
        type: "error",
        text:
          t("profile.toastEnterCurrentPassword") ||
          "Please enter your current password",
      });
      return false;
    }
    if (!passwordForm.newPassword.trim()) {
      setFormMessage({
        type: "error",
        text:
          t("profile.toastEnterNewPassword") ||
          "Please enter your new password",
      });
      return false;
    }
    if (passwordForm.newPassword.length < 8) {
      setFormMessage({
        type: "error",
        text:
          t("profile.toastPasswordMin") ||
          "Password must be at least 8 characters",
      });
      return false;
    }
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setFormMessage({
        type: "error",
        text: t("profile.toastPasswordMismatch") || "Passwords do not match",
      });
      return false;
    }
    if (passwordForm.oldPassword === passwordForm.newPassword) {
      setFormMessage({
        type: "error",
        text:
          t("profile.toastPasswordDifferent") ||
          "New password must be different from current password",
      });
      return false;
    }
    return true;
  };

  const handleSavePassword = async () => {
    setFormMessage(null);
    if (!validatePassword()) return;

    try {
      const result = await changePassword({
        oldPassword: passwordForm.oldPassword,
        newPassword: passwordForm.newPassword,
      }).unwrap();

      setFormMessage({
        type: "success",
        text:
          result?.message ||
          t("profile.toastPasswordChanged") ||
          "Password updated successfully",
      });

      setPasswordForm({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      setTimeout(() => setFormMessage(null), 3000);
    } catch (error: unknown) {
      const err = error as { data?: { message?: string } };
      setFormMessage({
        type: "error",
        text:
          err.data?.message ||
          t("profile.toastPasswordFailed") ||
          "Failed to update password",
      });
    }
  };

  return (
    <DashboardLayout>
      <div className="w-full mx-auto max-w-5xl">
        {/* Page Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center gap-2 sm:gap-3 mb-2">
            <div className="p-2 sm:p-2.5 bg-primary/10 rounded-lg">
              <SettingsIcon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl  text-foreground tracking-tight">
              {t("settings.title")}
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground font-medium">
            {t("settings.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* LEFT: Preferences & Notifications */}
          <div className="md:col-span-2 space-y-6">
            {/* Account Preferences */}
            <Card className="border-border shadow-none">
              <CardHeader className="p-4 sm:p-6 border-b border-border">
                <CardTitle className="text-lg font-bold flex items-center gap-2">
                  <Globe className="w-5 h-5 text-primary" />
                  {t("settings.accountSettings")}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 space-y-6">
                <div className="flex items-center justify-between p-4 bg-muted/20 rounded-xl border border-border/50">
                  <div className="space-y-0.5">
                    <p className="text-sm font-bold text-foreground tracking-wider">
                      {t("settings.language")}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {t("settings.selectPreferredLanguage") ||
                        "Select your preferred language"}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant={language === "en" ? "default" : "outline"}
                      size="sm"
                      className="font-bold cursor-pointer"
                      onClick={() => setLanguage("en")}
                    >
                      EN
                    </Button>
                    <Button
                      variant={language === "es" ? "default" : "outline"}
                      size="sm"
                      className="font-bold cursor-pointer"
                      onClick={() => setLanguage("es")}
                    >
                      ES
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-muted/20 rounded-xl border border-border/50">
                  <div className="space-y-0.5">
                    <p className="text-sm font-bold text-foreground tracking-wider">
                      {t("settings.currency")}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {t("settings.selectDefaultCurrency") ||
                        "Select your default currency for betting"}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="font-bold flex items-center gap-2"
                  >
                    <CreditCard className="w-4 h-4" />
                    USD ($)
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Notification Settings */}
            <Card className="border-border shadow-none">
              <CardHeader className="p-4 sm:p-6 border-b border-border">
                <CardTitle className="text-lg font-bold flex items-center gap-2">
                  <Bell className="w-5 h-5 text-primary" />
                  {t("settings.notifications")}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 space-y-6">
                <div className="flex items-center justify-between p-1">
                  <div className="space-y-0.5">
                    <p className="text-sm font-bold text-foreground tracking-wider">
                      {t("settings.pushNotifications")}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {t("settings.pushNotificationsDesc")}
                    </p>
                  </div>
                  <Switch
                    checked={notifications.push}
                    className="cursor-pointer"
                    onCheckedChange={(val) =>
                      setNotifications((prev) => ({ ...prev, push: val }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between p-1">
                  <div className="space-y-0.5">
                    <p className="text-sm font-bold text-foreground tracking-wider">
                      {t("settings.emailNotifications")}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {t("settings.emailNotificationsDesc")}
                    </p>
                  </div>
                  <Switch
                    checked={notifications.email}
                    className="cursor-pointer"
                    onCheckedChange={(val) =>
                      setNotifications((prev) => ({ ...prev, email: val }))
                    }
                  />
                </div>
              </CardContent>
            </Card>
            <Card className="border-border shadow-none">
              <CardHeader className="p-4 sm:p-6 border-b border-border">
                <CardTitle className="text-lg font-bold flex items-center gap-2">
                  <Lock className="w-5 h-5 text-primary" />
                  {t("settings.changePassword")}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                <div className="max-w-2xl mx-auto space-y-6">
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
                        <CheckCircle className="size-4 shrink-0" />
                      ) : (
                        <AlertCircle className="size-4 shrink-0" />
                      )}
                      {formMessage.text}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <FormInput
                        type="password"
                        label={t("profile.currentPassword")}
                        value={passwordForm.oldPassword}
                        onChange={(e) =>
                          handlePasswordChange("oldPassword", e.target.value)
                        }
                        placeholder={t("profile.enterCurrentPassword")}
                      />
                    </div>
                    <FormInput
                      type="password"
                      label={t("profile.newPassword")}
                      value={passwordForm.newPassword}
                      onChange={(e) =>
                        handlePasswordChange("newPassword", e.target.value)
                      }
                      placeholder={t("profile.enterNewPassword")}
                    />
                    <FormInput
                      type="password"
                      label={t("profile.confirmPassword")}
                      value={passwordForm.confirmPassword}
                      onChange={(e) =>
                        handlePasswordChange("confirmPassword", e.target.value)
                      }
                      placeholder={t("profile.confirmNewPassword")}
                    />
                  </div>

                  <div className="flex justify-end">
                    <Button
                      size="lg"
                      className="w-full sm:w-auto min-w-[200px]"
                      onClick={handleSavePassword}
                      disabled={passwordLoading}
                    >
                      {passwordLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          {t("profile.saving")}
                        </>
                      ) : (
                        <>
                          <Save className="w-4 h-4 mr-2" />
                          {t("profile.saveChanges")}
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          {/* RIGHT: Danger Zone */}
          <div className="md:col-span-1 space-y-6">
            {/* Danger Zone */}
            <Card className="border-red-500/30 bg-red-500/5 shadow-none">
              <CardHeader className="p-4 sm:p-6 border-b border-red-500/20">
                <CardTitle className="text-lg font-bold flex items-center gap-2 text-red-500">
                  <AlertTriangle className="w-5 h-5" />
                  {t("settings.dangerZone")}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 space-y-4">
                <p className="text-xs text-muted-foreground">
                  {t("settings.dangerDescription")}
                </p>
                <Button
                  variant="destructive"
                  className="w-full font-bold tracking-widest text-xs cursor-pointer"
                  onClick={() => setShowDeleteModal(true)}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  {t("settings.deleteAccount")}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Delete Account Dialog */}
      <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
        <DialogContent className="max-w-lg border-red-500/30 bg-card">
          <DialogHeader>
            <DialogTitle className="text-lg sm:text-xl  tracking-tight">
              {t("profile.deleteAccount")}
            </DialogTitle>
          </DialogHeader>
          <DeleteAccountForm onClose={() => setShowDeleteModal(false)} />
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
