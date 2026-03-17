"use client";

import { FormInput } from "@/components/form/FormInput";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAuth } from "@/hooks/useAuth";
import {
  AlertTriangle,
  Camera,
  Edit2,
  Lock,
  Save,
  Trash2,
  User,
  X,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import DeleteAccountForm from "./DeleteAccountForm";
import EditAvatarModal from "./EditAvatarModal";

export default function ProfilePage() {
  const { user } = useAuth();
  const [showEditAvatarModal, setShowEditAvatarModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Personal info edit states
  const [isEditingPersonalInfo, setIsEditingPersonalInfo] = useState(false);
  const [personalInfoLoading, setPersonalInfoLoading] = useState(false);
  const [personalInfo, setPersonalInfo] = useState({
    fullName: user?.fullName || "",
    nickname: user?.nickname || "",
    email: user?.email || "",
  });

  // Password change states
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handlePersonalInfoChange = (field: string, value: string) => {
    setPersonalInfo((prev) => ({ ...prev, [field]: value }));
  };

  const handlePasswordChange = (field: string, value: string) => {
    setPasswordForm((prev) => ({ ...prev, [field]: value }));
  };

  const validatePassword = (): boolean => {
    if (!passwordForm.oldPassword.trim()) {
      toast.error("Please enter your current password");
      return false;
    }
    if (!passwordForm.newPassword.trim()) {
      toast.error("Please enter a new password");
      return false;
    }
    if (passwordForm.newPassword.length < 6) {
      toast.error("New password must be at least 6 characters");
      return false;
    }
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error("Passwords do not match");
      return false;
    }
    if (passwordForm.oldPassword === passwordForm.newPassword) {
      toast.error("New password must be different from current password");
      return false;
    }
    return true;
  };

  const handleSavePassword = async () => {
    if (!validatePassword()) return;

    setPasswordLoading(true);
    try {
      // TODO: Implement API call to change password
      await new Promise((resolve) => setTimeout(resolve, 1500));
      toast.success("Password changed successfully");
      setPasswordForm({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setIsEditingPassword(false);
    } catch {
      toast.error("Failed to change password");
    } finally {
      setPasswordLoading(false);
    }
  };

  const handleCancelPasswordEdit = () => {
    setPasswordForm({
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setIsEditingPassword(false);
  };

  const handleSavePersonalInfo = async () => {
    setPersonalInfoLoading(true);
    try {
      // TODO: Implement API call to save personal info
      await new Promise((resolve) => setTimeout(resolve, 1500));
      toast.success("Personal information updated successfully");
      setIsEditingPersonalInfo(false);
    } catch {
      toast.error("Failed to update personal information");
    } finally {
      setPersonalInfoLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setPersonalInfo({
      fullName: user?.fullName || "",
      nickname: user?.nickname || "",
      email: user?.email || "",
    });
    setIsEditingPersonalInfo(false);
  };

  return (
    <DashboardLayout>
      <div className="w-full mx-auto max-w-5xl">
        {/* Page Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center gap-2 sm:gap-3 mb-2">
            <div className="p-2 sm:p-2.5 bg-primary/10 rounded-lg">
              <User className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-foreground uppercase tracking-tight">
              My Profile
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground font-medium">
            Manage your account information
          </p>
        </div>

        {/* Main Profile Layout - Left + Right */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 sm:gap-6">
          {/* LEFT SIDE - Image & User Info */}
          <div className="md:col-span-1">
            <Card className="border-border shadow-none">
              <CardContent className="p-4 sm:p-6 flex flex-col items-center">
                {/* Avatar with Camera Button */}
                <div className="relative mb-4 sm:mb-6">
                  <Avatar className="w-24 sm:w-28 md:w-32 h-24 sm:h-28 md:h-32 border-4 border-primary/20">
                    <AvatarImage src={user?.profileImage} />
                    <AvatarFallback className="text-2xl sm:text-3xl font-black bg-primary/10 text-primary">
                      {user?.fullName?.[0] || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <button
                    onClick={() => setShowEditAvatarModal(true)}
                    className="absolute bottom-0 right-0 p-2 bg-primary hover:bg-primary/90 rounded-full text-white transition-colors shadow-lg"
                  >
                    <Camera className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>

                {/* User Name & Email */}
                <h2 className="text-lg sm:text-xl font-bold text-center text-foreground">
                  {user?.fullName || "User"}
                </h2>
                <p className="text-xs sm:text-sm text-muted-foreground font-medium mt-2 text-center break-all">
                  {user?.email}
                </p>

                {/* Change Photo Button */}
                <Button
                  onClick={() => setShowEditAvatarModal(true)}
                  className="w-full mt-6 text-xs sm:text-sm font-black uppercase tracking-widest"
                  variant="outline"
                >
                  <Camera className="w-4 h-4 mr-2" />
                  Change Photo
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* RIGHT SIDE - Personal Info, Change Password, Danger Zone */}
          <div className="md:col-span-3 space-y-4 sm:space-y-6">
            {/* Personal Information Card */}
            <Card className="border-border shadow-none">
              <CardHeader className="p-4 sm:p-6 border-b border-border">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg sm:text-xl font-bold">
                    Personal Information
                  </CardTitle>
                  {!isEditingPersonalInfo && (
                    <Button
                      onClick={() => setIsEditingPersonalInfo(true)}
                      size="sm"
                      className="text-xs sm:text-sm font-black uppercase tracking-widest"
                    >
                      <Edit2 className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 space-y-4 sm:space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  <FormInput
                    label="Full Name"
                    value={personalInfo.fullName}
                    onChange={(e) =>
                      handlePersonalInfoChange("fullName", e.target.value)
                    }
                    disabled={!isEditingPersonalInfo}
                  />
                  <FormInput
                    label="Username"
                    value={personalInfo.nickname}
                    onChange={(e) =>
                      handlePersonalInfoChange("nickname", e.target.value)
                    }
                    disabled={!isEditingPersonalInfo}
                  />
                </div>

                <FormInput
                  label="Email Address"
                  value={personalInfo.email}
                  disabled
                />
                <p className="text-[10px] sm:text-xs text-muted-foreground">
                  Email cannot be changed. Contact support for assistance.
                </p>

                {/* Action Buttons for Edit Mode */}
                {isEditingPersonalInfo && (
                  <div className="flex gap-2 sm:gap-3 pt-2 sm:pt-4">
                    <Button
                      onClick={handleCancelEdit}
                      variant="outline"
                      disabled={personalInfoLoading}
                      className="flex-1 text-xs sm:text-sm font-black uppercase tracking-widest"
                    >
                      <X className="w-4 h-4 mr-2" />
                      Cancel
                    </Button>
                    <Button
                      onClick={handleSavePersonalInfo}
                      disabled={personalInfoLoading}
                      className="flex-1 text-xs sm:text-sm font-black uppercase tracking-widest"
                    >
                      {personalInfoLoading ? (
                        "Saving..."
                      ) : (
                        <>
                          <Save className="w-4 h-4 mr-2" />
                          Save
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Change Password Card */}
            <Card className="border-border shadow-none">
              <CardHeader className="p-4 sm:p-6 border-b border-border">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg sm:text-xl font-bold flex items-center gap-2">
                    <Lock className="w-5 h-5 text-primary" />
                    Change Password
                  </CardTitle>
                  {!isEditingPassword && (
                    <Button
                      onClick={() => setIsEditingPassword(true)}
                      size="sm"
                      className="text-xs sm:text-sm font-black uppercase tracking-widest"
                    >
                      <Edit2 className="w-4 h-4 mr-2" />
                      Change
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 space-y-4 sm:space-y-5">
                {!isEditingPassword ? (
                  <>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      Change your password to keep your account secure. Use a
                      strong password with letters, numbers, and symbols.
                    </p>
                    <Button
                      onClick={() => setIsEditingPassword(true)}
                      className="w-full text-xs sm:text-sm font-black uppercase tracking-widest"
                    >
                      <Lock className="w-4 h-4 mr-2" />
                      Change Password
                    </Button>
                  </>
                ) : (
                  <>
                    {/* Old Password */}
                    <FormInput
                      type="password"
                      label="Current Password"
                      value={passwordForm.oldPassword}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handlePasswordChange("oldPassword", e.target.value)
                      }
                      placeholder="Enter current password"
                    />

                    {/* New Password */}
                    <div className="space-y-1.5 sm:space-y-2">
                      <FormInput
                        type="password"
                        label="New Password"
                        value={passwordForm.newPassword}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          handlePasswordChange("newPassword", e.target.value)
                        }
                        placeholder="Enter new password"
                      />
                      <p className="text-[10px] sm:text-xs text-muted-foreground">
                        Minimum 6 characters
                      </p>
                    </div>

                    {/* Confirm Password */}
                    <FormInput
                      type="password"
                      label="Confirm Password"
                      value={passwordForm.confirmPassword}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handlePasswordChange("confirmPassword", e.target.value)
                      }
                      placeholder="Confirm new password"
                    />

                    {/* Action Buttons */}
                    <div className="flex gap-2 sm:gap-3 pt-2 sm:pt-4">
                      <Button
                        onClick={handleCancelPasswordEdit}
                        variant="outline"
                        disabled={passwordLoading}
                        className="flex-1 text-xs sm:text-sm font-black uppercase tracking-widest"
                      >
                        <X className="w-4 h-4 mr-2" />
                        Cancel
                      </Button>
                      <Button
                        onClick={handleSavePassword}
                        disabled={passwordLoading}
                        className="flex-1 text-xs sm:text-sm font-black uppercase tracking-widest"
                      >
                        {passwordLoading ? (
                          "Saving..."
                        ) : (
                          <>
                            <Save className="w-4 h-4 mr-2" />
                            Save
                          </>
                        )}
                      </Button>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Danger Zone Card */}
            <Card className="border-red-500/30 bg-red-500/5 shadow-none">
              <CardHeader className="p-4 sm:p-6 border-b border-red-500/20">
                <div className="flex items-center gap-2 sm:gap-3">
                  <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6 text-red-500" />
                  <CardTitle className="text-lg sm:text-xl font-bold text-red-500">
                    Danger Zone
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 space-y-4 sm:space-y-5">
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
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Edit Avatar Modal */}
      <EditAvatarModal
        open={showEditAvatarModal}
        onClose={() => setShowEditAvatarModal(false)}
      />

      {/* Delete Account Dialog */}
      <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
        <DialogContent className="max-w-lg border-red-500/30 bg-card">
          <DialogHeader>
            <DialogTitle className="text-lg sm:text-xl font-black uppercase tracking-tight">
              Delete Account
            </DialogTitle>
          </DialogHeader>
          <DeleteAccountForm onClose={() => setShowDeleteModal(false)} />
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
