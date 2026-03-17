"use client";

import { FormInput } from "@/components/form/FormInput";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface DeleteAccountFormProps {
  onClose: () => void;
}

export default function DeleteAccountForm({ onClose }: DeleteAccountFormProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [confirmText, setConfirmText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleNextStep = () => {
    setStep(2);
  };

  const handleDeleteAccount = async () => {
    if (confirmText !== "DELETE MY ACCOUNT") {
      toast.error('Please type "DELETE MY ACCOUNT" to confirm');
      return;
    }

    setLoading(true);
    try {
      // TODO: Implement API call to delete account with password verification
      await new Promise((resolve) => setTimeout(resolve, 2000));
      toast.success("Account deleted successfully");
      onClose();
    } catch {
      toast.error("Failed to delete account");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
      {step === 1 ? (
        <>
          {/* Step 1: Warning */}
          <div className="flex flex-col items-center text-center space-y-3 sm:space-y-4">
            <div className="p-3 sm:p-4 bg-red-500/10 rounded-full">
              <AlertTriangle className="w-6 h-6 sm:w-8 sm:h-8 text-red-500" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-foreground uppercase tracking-tight">
                Delete Account?
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground mt-2">
                This action cannot be undone. All your data will be permanently
                deleted.
              </p>
            </div>
          </div>

          <div className="bg-red-500/5 border border-red-500/20 rounded-lg p-3 sm:p-4 space-y-2">
            <p className="text-[10px] sm:text-xs font-black text-red-600 uppercase tracking-widest">
              Will be deleted:
            </p>
            <ul className="text-[10px] sm:text-xs text-muted-foreground space-y-1">
              <li>✓ Your profile and personal information</li>
              <li>✓ All betting history and records</li>
              <li>✓ Wallet balance and transactions</li>
              <li>✓ Friends list and connections</li>
              <li>✓ All account preferences</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 sm:gap-3 pt-2">
            <Button
              onClick={onClose}
              variant="outline"
              disabled={loading}
              className="flex-1 text-xs sm:text-sm font-black uppercase tracking-widest"
            >
              Cancel
            </Button>
            <Button
              onClick={handleNextStep}
              disabled={loading}
              className="flex-1 text-xs sm:text-sm font-black uppercase tracking-widest bg-red-600 hover:bg-red-700"
            >
              Continue
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
              <h3 className="text-base sm:text-lg font-black text-foreground uppercase tracking-tight">
                Final Confirmation
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground mt-2">
                Type the phrase below to confirm account deletion
              </p>
            </div>
          </div>

          <div className="bg-red-500/5 border border-red-500/20 rounded-lg p-3 sm:p-4">
            <p className="text-[10px] sm:text-xs font-black text-red-600 uppercase tracking-widest mb-2">
              Type to confirm:
            </p>
            <p className="text-sm sm:text-base font-black text-foreground font-mono">
              DELETE MY ACCOUNT
            </p>
          </div>

          {/* Confirmation Text Field */}
          <div className="space-y-1.5 sm:space-y-2">
            <FormInput
              label="Confirmation Text"
              placeholder="Type DELETE MY ACCOUNT"
              value={confirmText}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConfirmText(e.target.value.toUpperCase())}
              onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) =>
                e.key === "Enter" &&
                confirmText === "DELETE MY ACCOUNT" &&
                handleDeleteAccount()
              }
            />
            {confirmText === "DELETE MY ACCOUNT" ? (
              <p className="text-[10px] sm:text-xs text-emerald-600 font-medium">
                ✓ Text matches. Ready to delete.
              </p>
            ) : (
              <p className="text-[10px] sm:text-xs text-muted-foreground">
                Type exactly: DELETE MY ACCOUNT
              </p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 sm:gap-3 pt-2">
            <Button
              onClick={() => setStep(1)}
              variant="outline"
              disabled={loading}
              className="flex-1 text-xs sm:text-sm font-black uppercase tracking-widest"
            >
              Back
            </Button>
            <Button
              onClick={handleDeleteAccount}
              disabled={
                loading || confirmText !== "DELETE MY ACCOUNT"
              }
              className="flex-1 text-xs sm:text-sm font-black uppercase tracking-widest bg-red-600 hover:bg-red-700"
            >
              {loading ? (
                "Deleting..."
              ) : (
                <>
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete Account
                </>
              )}
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
