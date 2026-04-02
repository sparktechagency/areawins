"use client";
import Image from "next/image";
import { FormInput } from "@/components/form/FormInput";
import { FormSelect } from "@/components/form/FormSelect";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "@/i18n/LanguageContext";
import { cn } from "@/lib/utils";
import { countries } from "@/lib/countries";
import {
  useCheckUserNameMutation,
  useUpdateMyProfileMutation,
} from "@/redux/api/userApi";
import { useAppSelector } from "@/redux/hooks";
import { AlertCircle, Camera, Check, CheckCircle, Edit2, Loader2, Save, User, X } from "lucide-react";
import { useEffect, useState } from "react";
import EditAvatarModal from "./EditAvatarModal";
// Helper to extract ISO code from flag emoji
const getCountryCode = (flag: string) => {
  if (!flag) return "";
  return [...flag]
    .map((c) => String.fromCodePoint((c.codePointAt(0) || 0) - 127397))
    .join("")
    .toLowerCase();
};

export default function ProfilePage() {
  const { t } = useTranslation();
  const { user } = useAppSelector((state) => state.auth);
  const [showEditAvatarModal, setShowEditAvatarModal] = useState(false);

  const [updateProfile] = useUpdateMyProfileMutation();
  const [checkUserName] = useCheckUserNameMutation();

  // Personal info edit states
  const [isEditingPersonalInfo, setIsEditingPersonalInfo] = useState(false);
  const [personalInfoLoading, setPersonalInfoLoading] = useState(false);
  const [personalInfo, setPersonalInfo] = useState({
    fullName: user?.fullName || "",
    nickname: user?.nickname || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    country: user?.country || "",
    countryFlag: user?.countryFlag || "",
  });

  const [usernameStatus, setUsernameStatus] = useState<
    "idle" | "checking" | "available" | "unavailable"
  >("idle");

  const [formMessage, setFormMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  // Debounced username check
  useEffect(() => {
    if (
      !isEditingPersonalInfo ||
      personalInfo.nickname === user?.nickname ||
      !personalInfo.nickname
    ) {
      setUsernameStatus("idle");
      return;
    }

    const timer = setTimeout(async () => {
      setUsernameStatus("checking");
      try {
        const res = await checkUserName(personalInfo.nickname).unwrap();
        setUsernameStatus(res.isAvailable ? "available" : "unavailable");
      } catch {
        setUsernameStatus("idle");
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [
    personalInfo.nickname,
    user?.nickname,
    isEditingPersonalInfo,
    checkUserName,
  ]);

  // Update local state when redux user changes
  useEffect(() => {
    if (user) {
      setPersonalInfo({
        fullName: user.fullName || "",
        nickname: user.nickname || "",
        email: user.email || "",
        phoneNumber: user.phoneNumber || "",
        country: user.country || "",
        countryFlag: user.countryFlag || "",
      });
    }
  }, [user]);

  const handlePersonalInfoChange = (field: string, value: string) => {
    setPersonalInfo((prev) => ({ ...prev, [field]: value }));
  };

  const handleSavePersonalInfo = async () => {
    setFormMessage(null);
    if (usernameStatus === "unavailable") {
      setFormMessage({
        type: "error",
        text: t("profile.usernameTaken") || "Username already taken",
      });
      return;
    }

    setPersonalInfoLoading(true);
    try {
      await updateProfile({
        fullName: personalInfo.fullName,
        nickname: personalInfo.nickname,
        phoneNumber: personalInfo.phoneNumber,
        country: personalInfo.country,
        countryFlag: personalInfo.countryFlag,
      }).unwrap();

      setFormMessage({
        type: "success",
        text: t("profile.toastProfileUpdated") || "Profile updated successfully",
      });
      setTimeout(() => {
        setIsEditingPersonalInfo(false);
        setFormMessage(null);
      }, 2000);
    } catch (error: unknown) {
      const err = error as { data?: { message?: string } };
      setFormMessage({
        type: "error",
        text: err.data?.message || t("profile.toastProfileFailed") || "Failed to update profile",
      });
    } finally {
      setPersonalInfoLoading(false);
    }
  };

  const handleCountryChange = (countryName: string) => {
    const selectedCountry = countries.find((c) => c.name === countryName);
    if (selectedCountry) {
      setPersonalInfo((prev) => ({
        ...prev,
        country: selectedCountry.name,
        countryFlag: selectedCountry.flag,
      }));
    }
  };

  const handleCancelEdit = () => {
    setPersonalInfo({
      fullName: user?.fullName || "",
      nickname: user?.nickname || "",
      email: user?.email || "",
      phoneNumber: user?.phoneNumber || "",
      country: user?.country || "",
      countryFlag: user?.countryFlag || "",
    });
    setIsEditingPersonalInfo(false);
    setUsernameStatus("idle");
    setFormMessage(null);
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
            <h1 className="text-2xl sm:text-3xl md:text-4xl  text-foreground ">
              {t("profile.title")}
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground font-medium">
            {t("profile.subtitle")}
          </p>
        </div>

        {/* Main Profile Layout - Left + Right swapped to have Avatar on Right */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 sm:gap-6">
          {/* LEFT SIDE - Personal Info (spans 3) */}
          <div className="md:col-span-3 order-2 md:order-1 space-y-4 sm:space-y-6">
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
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  <FormInput
                    label={t("profile.fullName")}
                    value={personalInfo.fullName}
                    onChange={(e) =>
                      handlePersonalInfoChange("fullName", e.target.value)
                    }
                    disabled={!isEditingPersonalInfo}
                  />
                  <div className="relative">
                    <FormInput
                      label={t("profile.username")}
                      value={personalInfo.nickname}
                      onChange={(e) =>
                        handlePersonalInfoChange("nickname", e.target.value)
                      }
                      disabled={!isEditingPersonalInfo}
                      className={cn(
                        usernameStatus === "available" && "border-green-500",
                        usernameStatus === "unavailable" && "border-red-500",
                      )}
                    />
                    {isEditingPersonalInfo && (
                      <div className="absolute right-3 top-[38px]">
                        {usernameStatus === "checking" && (
                          <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
                        )}
                        {usernameStatus === "available" && (
                          <Check className="w-4 h-4 text-green-500" />
                        )}
                        {usernameStatus === "unavailable" && (
                          <X className="w-4 h-4 text-red-500" />
                        )}
                      </div>
                    )}
                    {usernameStatus === "unavailable" && (
                      <p className="text-[10px] text-red-500 mt-1 ml-1">
                        {t("profile.usernameUnavailable") ||
                          "Username is already taken"}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  <FormInput
                    label={t("profile.phoneNumber") || "Phone Number"}
                    value={personalInfo.phoneNumber}
                    onChange={(e) =>
                      handlePersonalInfoChange("phoneNumber", e.target.value)
                    }
                    disabled={!isEditingPersonalInfo}
                  />

                  <FormSelect
                    label={t("profile.country") || "Country"}
                    options={countries.map((c) => ({
                      value: c.name,
                      label: (
                        <div className="flex items-center gap-2">
                          {c?.flag ? (
                            <Image
                              src={`https://flagcdn.com/w20/${getCountryCode(
                                c.flag,
                              )}.png`}
                              width={20}
                              height={15}
                              alt={c.name}
                              className="rounded-sm object-cover"
                              unoptimized
                            />
                          ) : (
                            <span className="w-5 h-4 bg-muted rounded-sm" />
                          )}
                          <span>{c.name}</span>
                        </div>
                      ),
                    }))}
                    value={personalInfo.country}
                    placeholder={t("profile.selectCountry") || "Select Country"}
                    onValueChange={handleCountryChange}
                    disabled={!isEditingPersonalInfo}
                  />
                </div>

                <FormInput
                  label={t("profile.emailAddress")}
                  value={personalInfo.email}
                  disabled
                />

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
                      disabled={
                        personalInfoLoading || usernameStatus === "unavailable"
                      }
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
          {/* RIGHT SIDE - Image & User Info (spans 1) */}
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
