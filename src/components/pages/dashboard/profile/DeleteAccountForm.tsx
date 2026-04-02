"use client";

import { FormInput } from "@/components/form/FormInput";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/i18n/LanguageContext";
import { AlertCircle, AlertTriangle, CheckCircle, Trash2 } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface DeleteAccountFormProps {
  onClose: () => void;
}

export default function DeleteAccountForm({ onClose }: DeleteAccountFormProps) {
  const { t } = useTranslation();
  const [step, setStep] = useState<1 | 2>(1);
  const [confirmText, setConfirmText] = useState("");
  const [loading, setLoading] = useState(false);
  const [formMessage, setFormMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const confirmPhrase = "DELETE MY ACCOUNT";

  const handleNextStep = () => {
    setStep(2);
  };

  const handleDeleteAccount = async () => {
    setFormMessage(null);
    if (confirmText !== confirmPhrase) {
      setFormMessage({
        type: "error",
        text: t("deleteAccount.toastTypePhrase"),
      });
      return;
    }

    setLoading(true);
    try {
      // TODO: Implement API call to delete account with password verification
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setFormMessage({
        type: "success",
        text: t("deleteAccount.toastDeleted"),
      });
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error: unknown) {
      const err = error as { data?: { message?: string } };
      setFormMessage({
        type: "error",
        text: err.data?.message || t("deleteAccount.toastDeleteFailed") || "Failed to delete account",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
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
      {step === 1 ? (
        <>
          {/* Step 1: Warning */}
          <div className="flex flex-col items-center text-center space-y-3 sm:space-y-4">
            <div className="p-3 sm:p-4 bg-red-500/10 rounded-full">
              <AlertTriangle className="w-6 h-6 sm:w-8 sm:h-8 text-red-500" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg  text-foreground uppercase tracking-tight">
                {t("deleteAccount.title")}
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground mt-2">
                {t("deleteAccount.description")}
              </p>
            </div>
          </div>

          <div className="bg-red-500/5 border border-red-500/20 rounded-lg p-3 sm:p-4 space-y-2">
            <p className="text-[10px] sm:text-xs  text-red-600 uppercase tracking-widest">
              {t("deleteAccount.willBeDeleted")}
            </p>
            <ul className="text-[10px] sm:text-xs text-muted-foreground space-y-1">
              <li>✓ {t("deleteAccount.item1")}</li>
              <li>✓ {t("deleteAccount.item2")}</li>
              <li>✓ {t("deleteAccount.item3")}</li>
              <li>✓ {t("deleteAccount.item4")}</li>
              <li>✓ {t("deleteAccount.item5")}</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 sm:gap-3 pt-2">
            <Button
              onClick={onClose}
              variant="outline"
              disabled={loading}
              className="flex-1 text-xs sm:text-sm  uppercase tracking-widest"
            >
              {t("profile.cancel")}
            </Button>
            <Button
              onClick={handleNextStep}
              disabled={loading}
              className="flex-1 text-xs sm:text-sm  uppercase tracking-widest bg-red-600 hover:bg-red-700"
            >
              {t("deleteAccount.continue")}
            </Button>
          </div>
        </>
      ) : (
        <>
          {/* Step 2: Confirmation */}
          <div className="flex flex-col items-center text-center space-y-3 sm:space-y-4">
            <div className="p-3 sm:p-4 bg-red-500/10 rounded-full">
              <AlertTriangle className="w-6 h-6 sm:w-8 sm:h-8 text-red-500" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg  text-foreground uppercase tracking-tight">
                {t("deleteAccount.finalConfirmation")}
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground mt-2">
                {t("deleteAccount.finalDescription")}
              </p>
            </div>
          </div>

          <div className="bg-red-500/5 border border-red-500/20 rounded-lg p-3 sm:p-4">
            <p className="text-[10px] sm:text-xs  text-red-600 uppercase tracking-widest mb-2">
              {t("deleteAccount.typeToConfirm")}
            </p>
            <p className="text-sm sm:text-base  text-foreground font-mono">
              {confirmPhrase}
            </p>
          </div>

          {/* Confirmation Text Field */}
          <div className="space-y-1.5 sm:space-y-2">
            <FormInput
              label={t("deleteAccount.confirmationText")}
              placeholder={t("deleteAccount.placeholder")}
              value={confirmText}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setConfirmText(e.target.value.toUpperCase())
              }
              onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) =>
                e.key === "Enter" &&
                confirmText === confirmPhrase &&
                handleDeleteAccount()
              }
            />
            {confirmText === confirmPhrase ? (
              <p className="text-[10px] sm:text-xs text-emerald-600 font-medium">
                ✓ {t("deleteAccount.textMatches")}
              </p>
            ) : (
              <p className="text-[10px] sm:text-xs text-muted-foreground">
                {t("deleteAccount.textHint")}
              </p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 sm:gap-3 pt-2">
            <Button
              onClick={() => setStep(1)}
              variant="outline"
              disabled={loading}
              className="flex-1 text-xs sm:text-sm  uppercase tracking-widest"
            >
              {t("deleteAccount.back")}
            </Button>
            <Button
              onClick={handleDeleteAccount}
              disabled={loading || confirmText !== confirmPhrase}
              className="flex-1 text-xs sm:text-sm  uppercase tracking-widest bg-red-600 hover:bg-red-700"
            >
              {loading ? (
                t("deleteAccount.deleting")
              ) : (
                <>
                  <Trash2 className="w-4 h-4 mr-2" />
                  {t("profile.deleteAccount")}
                </>
              )}
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
