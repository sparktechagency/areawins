"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertTriangle, Trash2, CheckCircle, AlertCircle } from "lucide-react";
import { useState } from "react";
import { useDeleteProfileMutation } from "@/redux/api/userApi";
import { useTranslation } from "@/i18n/LanguageContext";
import { cn } from "@/lib/utils";
import { ReusableModal } from "@/components/shared/ReusableModal";

interface DeleteAccountModalProps {
  open: boolean;
  onClose: () => void;
}

export default function DeleteAccountModal({
  open,
  onClose,
}: DeleteAccountModalProps) {
  const { t } = useTranslation();
  const [confirmText, setConfirmText] = useState("");
  const [deleteProfile, { isLoading }] = useDeleteProfileMutation();
  const [step, setStep] = useState<"warning" | "confirm">("warning");
  const [formMessage, setFormMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleProceed = () => {
    setStep("confirm");
    setConfirmText("");
  };

  const handleDelete = async () => {
    if (confirmText.toUpperCase() !== "DELETE MY ACCOUNT") return;

    setFormMessage(null);
    try {
      const result = await deleteProfile().unwrap();
      setFormMessage({
        type: "success",
        text:
          result?.message ||
          t("deleteAccount.toastDeleted") ||
          "Account deleted successfully",
      });
      setTimeout(() => {
        onClose();
        setStep("warning");
        setConfirmText("");
        setFormMessage(null);
      }, 2000);
    } catch (error: unknown) {
      const err = error as { data?: { message?: string } };
      setFormMessage({
        type: "error",
        text:
          err.data?.message ||
          t("deleteAccount.toastDeleteFailed") ||
          "Failed to delete account",
      });
    }
  };

  const handleClose = () => {
    onClose();
    setStep("warning");
    setConfirmText("");
  };

  return (
    <ReusableModal
      isOpen={open}
      onClose={handleClose}
      title={
        step === "warning"
          ? t("deleteAccount.title")
          : t("deleteAccount.finalConfirmation")
      }
      description={
        step === "warning"
          ? t("deleteAccount.description")
          : t("deleteAccount.finalDescription")
      }
      maxWidth="md"
      padding="none"
      showBorder={false}
    >
      <div className="flex flex-col h-full bg-card">
        {formMessage && (
          <div
            className={cn(
              "mx-4 sm:mx-8 mt-4 p-3 rounded-md flex items-center gap-2 text-sm font-medium animate-in fade-in slide-in-from-top-1",
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

        <div className="p-5 sm:p-8 pt-4">
          {step === "warning" ? (
            <div className="space-y-6">
              <div className="p-4 sm:p-5 bg-red-500/5 rounded-2xl space-y-4">
                <div className="flex items-center gap-3 text-red-500">
                  <div className="p-2 bg-red-500/10 rounded-lg">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-bold uppercase tracking-wider italic">
                    {t("deleteAccount.warningPrefix") || "Warning"}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-foreground/80 font-medium leading-relaxed">
                  {t("deleteAccount.willBeDeletedDesc") ||
                    "Deleting your account will:"}
                </p>

                <ul className="grid grid-cols-1 gap-2.5">
                  {[
                    t("deleteAccount.item1"),
                    t("deleteAccount.item2"),
                    t("deleteAccount.item3"),
                    t("deleteAccount.item4"),
                    t("deleteAccount.item5"),
                  ].map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2.5 text-xs sm:text-sm text-muted-foreground group"
                    >
                      <div className="mt-1 size-1.5 rounded-full bg-red-500/40 group-hover:bg-red-500 transition-colors shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex gap-3 pt-2">
                <Button
                  onClick={handleClose}
                  variant="outline"
                  className="flex-1 h-12 text-xs sm:text-sm font-bold uppercase tracking-widest rounded-xl hover:bg-muted/50 transition-all active:scale-[0.98]"
                >
                  {t("profile.cancel")}
                </Button>
                <Button
                  onClick={handleProceed}
                  variant="destructive"
                  className="flex-1 h-12 text-xs sm:text-sm font-bold uppercase tracking-widest rounded-xl bg-red-600 hover:bg-red-700 shadow-lg shadow-red-600/20 active:scale-[0.98] transition-all"
                >
                  {t("deleteAccount.continue")}
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-muted-foreground/60 ml-1">
                    {t("deleteAccount.confirmationText")}
                  </Label>
                  <div className="p-4 sm:p-5 bg-muted/30 rounded-2xl border border-border/50 text-center">
                    <span className="text-lg sm:text-xl font-black tracking-[0.2em] text-foreground/90 font-mono">
                      DELETE MY ACCOUNT
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="confirm-text"
                    className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-muted-foreground/60 ml-1"
                  >
                    {t("deleteAccount.typeToConfirm")}
                  </Label>
                  <Input
                    id="confirm-text"
                    placeholder="Type here..."
                    value={confirmText}
                    onChange={(e) => setConfirmText(e.target.value)}
                    className="h-14 bg-muted/20 border-border/50 rounded-2xl text-center text-sm font-bold tracking-widest focus:ring-red-500/20 focus:border-red-500/30 transition-all"
                  />
                </div>

                <p className="text-[10px] sm:text-xs text-muted-foreground text-center font-medium leading-relaxed px-4">
                  This is permanent. Your account and all associated data will
                  be deleted immediately.
                </p>
              </div>

              <div className="flex gap-3 pt-2">
                <Button
                  onClick={() => setStep("warning")}
                  variant="outline"
                  className="flex-1 h-12 text-xs sm:text-sm font-bold uppercase tracking-widest rounded-xl hover:bg-muted/50 transition-all active:scale-[0.98]"
                  disabled={isLoading}
                >
                  {t("deleteAccount.back")}
                </Button>
                <Button
                  onClick={handleDelete}
                  variant="destructive"
                  disabled={
                    confirmText.toUpperCase() !== "DELETE MY ACCOUNT" ||
                    isLoading
                  }
                  className="flex-1 h-12 cursor-pointer text-xs sm:text-sm font-bold uppercase tracking-widest rounded-xl bg-red-600 hover:bg-red-700 shadow-lg shadow-red-600/20 active:scale-[0.98] transition-all"
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <div className="size-4 rounded-full border-2 border-white/20 border-t-white animate-spin" />
                      {t("deleteAccount.deleting")}
                    </span>
                  ) : (
                    <>
                      <Trash2 className="w-4 h-4 mr-2" />
                      {t("profile.deleteAccount")}
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </ReusableModal>
  );
}
