"use client";

import { FormInput } from "@/components/form/FormInput";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "@/i18n/LanguageContext";
import { useAppSelector } from "@/redux/hooks";
import { Camera, Edit2, Save, User, X } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import EditAvatarModal from "./EditAvatarModal";

export default function ProfilePage() {
  const { t } = useTranslation();
  const { user } = useAppSelector((state) => state.auth);
  const [showEditAvatarModal, setShowEditAvatarModal] = useState(false);

  // Personal info edit states
  const [isEditingPersonalInfo, setIsEditingPersonalInfo] = useState(false);
  const [personalInfoLoading, setPersonalInfoLoading] = useState(false);
  const [personalInfo, setPersonalInfo] = useState({
    fullName: user?.fullName || "",
    nickname: user?.nickname || "",
    email: user?.email || "",
  });

  // Update local state when redux user changes
  useEffect(() => {
    if (user) {
      setPersonalInfo({
        fullName: user.fullName || "",
        nickname: user.nickname || "",
        email: user.email || "",
      });
    }
  }, [user]);

  const handlePersonalInfoChange = (field: string, value: string) => {
    setPersonalInfo((prev) => ({ ...prev, [field]: value }));
  };

  const handleSavePersonalInfo = async () => {
    setPersonalInfoLoading(true);
    try {
      // TODO: Implement API call to save personal info
      await new Promise((resolve) => setTimeout(resolve, 1500));
      toast.success(t("profile.toastProfileUpdated"));
      setIsEditingPersonalInfo(false);
    } catch {
      toast.error(t("profile.toastProfileFailed"));
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
            <h1 className="text-2xl sm:text-3xl md:text-4xl  text-foreground uppercase tracking-tight">
              {t("profile.title")}
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground font-medium">
            {t("profile.subtitle")}
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
                    <AvatarFallback className="text-2xl sm:text-3xl  bg-primary/10 text-primary">
                      {user?.fullName?.[0] || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <button
                    onClick={() => setShowEditAvatarModal(true)}
                    className="absolute bottom-0 right-0 p-2 bg-primary hover:bg-primary/90 rounded-full text-white transition-colors shadow-lg cursor-pointer"
                  >
                    <Camera className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>

                {/* User Name & Email */}
                <h2 className="text-lg sm:text-xl font-bold text-center text-foreground">
                  {user?.fullName || t("common.user")}
                </h2>
                <p className="text-xs sm:text-sm text-muted-foreground font-medium mt-2 text-center break-all">
                  {user?.email}
                </p>

                {/* Change Photo Button */}
                <Button
                  onClick={() => setShowEditAvatarModal(true)}
                  className="w-full mt-6 text-xs sm:text-sm  uppercase tracking-widest cursor-pointer"
                  variant="outline"
                >
                  <Camera className="w-4 h-4 mr-2" />
                  {t("profile.changePhoto")}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* RIGHT SIDE - Personal Info */}
          <div className="md:col-span-3 space-y-4 sm:space-y-6">
            <Card className="border-border shadow-none">
              <CardHeader className="p-4 sm:p-6 border-b border-border">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg sm:text-xl font-bold">
                    {t("profile.personalInformation")}
                  </CardTitle>
                  {!isEditingPersonalInfo && (
                    <Button
                      onClick={() => setIsEditingPersonalInfo(true)}
                      size="sm"
                      className="text-xs sm:text-sm  uppercase tracking-widest cursor-pointer"
                    >
                      <Edit2 className="w-4 h-4 mr-2" />
                      {t("profile.edit")}
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 space-y-4 sm:space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  <FormInput
                    label={t("profile.fullName")}
                    value={personalInfo.fullName}
                    onChange={(e) =>
                      handlePersonalInfoChange("fullName", e.target.value)
                    }
                    disabled={!isEditingPersonalInfo}
                  />
                  <FormInput
                    label={t("profile.username")}
                    value={personalInfo.nickname}
                    onChange={(e) =>
                      handlePersonalInfoChange("nickname", e.target.value)
                    }
                    disabled={!isEditingPersonalInfo}
                  />
                </div>

                <FormInput
                  label={t("profile.emailAddress")}
                  value={personalInfo.email}
                  disabled
                />
                <p className="text-[10px] sm:text-xs text-muted-foreground">
                  {t("profile.emailImmutable")}
                </p>

                {/* Action Buttons for Edit Mode */}
                {isEditingPersonalInfo && (
                  <div className="flex gap-2 sm:gap-3 pt-2 sm:pt-4">
                    <Button
                      onClick={handleCancelEdit}
                      variant="outline"
                      disabled={personalInfoLoading}
                      className="flex-1 text-xs sm:text-sm  uppercase tracking-widest cursor-pointer"
                    >
                      <X className="w-4 h-4 mr-2" />
                      {t("profile.cancel")}
                    </Button>
                    <Button
                      onClick={handleSavePersonalInfo}
                      disabled={personalInfoLoading}
                      className="flex-1 text-xs sm:text-sm  uppercase tracking-widest cursor-pointer"
                    >
                      {personalInfoLoading ? (
                        t("profile.saving")
                      ) : (
                        <>
                          <Save className="w-4 h-4 mr-2" />
                          {t("profile.save")}
                        </>
                      )}
                    </Button>
                  </div>
                )}
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
    </DashboardLayout>
  );
}
