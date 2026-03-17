"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertTriangle, Trash2 } from "lucide-react";
import { useState } from "react";

interface DeleteAccountModalProps {
  open: boolean;
  onClose: () => void;
}

export default function DeleteAccountModal({
  open,
  onClose,
}: DeleteAccountModalProps) {
  const [confirmText, setConfirmText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState<"warning" | "confirm">("warning");

  const handleProceed = () => {
    setStep("confirm");
    setConfirmText("");
  };

  const handleDelete = async () => {
    if (confirmText.toUpperCase() !== "DELETE MY ACCOUNT") return;

    setIsLoading(true);
    // TODO: Implement account deletion API call here
    setTimeout(() => {
      setIsLoading(false);
      // Handle successful deletion - redirect or show success
      alert("Account deleted successfully");
      onClose();
      setStep("warning");
      setConfirmText("");
    }, 2000);
  };

  const handleClose = () => {
    onClose();
    setStep("warning");
    setConfirmText("");
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        {step === "warning" ? (
          <>
            <DialogHeader>
              <div className="flex items-center gap-3 mb-2">
                <AlertTriangle className="w-6 h-6 text-red-500" />
                <DialogTitle className="text-lg sm:text-xl font-bold text-red-500">
                  Delete Account
                </DialogTitle>
              </div>
              <DialogDescription className="text-xs sm:text-sm text-foreground font-medium mt-3">
                This action cannot be undone. Please read carefully.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div className="p-3 sm:p-4 bg-red-500/10 rounded-lg border border-red-500/20">
                <p className="text-xs sm:text-sm text-foreground font-medium leading-relaxed">
                  <strong>Warning:</strong> Deleting your account will:
                </p>
                <ul className="text-xs sm:text-sm text-muted-foreground mt-3 space-y-1.5 ml-3">
                  <li className="flex gap-2">
                    <span>•</span>
                    <span>Permanently delete all your account data</span>
                  </li>
                  <li className="flex gap-2">
                    <span>•</span>
                    <span>Remove all betting history and records</span>
                  </li>
                  <li className="flex gap-2">
                    <span>•</span>
                    <span>Forfeit any remaining wallet balance</span>
                  </li>
                  <li className="flex gap-2">
                    <span>•</span>
                    <span>Cancel all active bets and pending payouts</span>
                  </li>
                  <li className="flex gap-2">
                    <span>•</span>
                    <span>Cannot be recovered after deletion</span>
                  </li>
                </ul>
              </div>

              <div className="flex gap-2 sm:gap-3 pt-2 sm:pt-4">
                <Button
                  onClick={handleClose}
                  variant="outline"
                  className="flex-1 text-xs sm:text-sm font-black uppercase tracking-widest"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleProceed}
                  variant="destructive"
                  className="flex-1 text-xs sm:text-sm font-black uppercase tracking-widest"
                >
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  Continue
                </Button>
              </div>
            </div>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-lg sm:text-xl font-bold">
                Confirm Deletion
              </DialogTitle>
              <DialogDescription className="text-xs sm:text-sm">
                Type the message below to confirm account deletion
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 sm:space-y-5">
              <div>
                <Label className="text-xs sm:text-sm font-black uppercase tracking-widest text-muted-foreground mb-2 block">
                  Confirmation Message
                </Label>
                <div className="p-3 sm:p-4 bg-muted/50 rounded-lg border border-border font-mono text-xs sm:text-sm font-bold text-foreground">
                  DELETE MY ACCOUNT
                </div>
              </div>

              <div>
                <Label htmlFor="confirm-text" className="text-xs sm:text-sm font-black uppercase tracking-widest text-muted-foreground">
                  Type the message above
                </Label>
                <Input
                  id="confirm-text"
                  placeholder="Type here..."
                  value={confirmText}
                  onChange={(e) => setConfirmText(e.target.value)}
                  className="mt-2 text-xs sm:text-sm"
                />
              </div>

              <p className="text-xs text-muted-foreground font-medium">
                This is permanent. Your account and all associated data will be deleted
                immediately.
              </p>

              <div className="flex gap-2 sm:gap-3 pt-2 sm:pt-4">
                <Button
                  onClick={() => setStep("warning")}
                  variant="outline"
                  className="flex-1 text-xs sm:text-sm font-black uppercase tracking-widest"
                  disabled={isLoading}
                >
                  Back
                </Button>
                <Button
                  onClick={handleDelete}
                  variant="destructive"
                  disabled={
                    confirmText.toUpperCase() !== "DELETE MY ACCOUNT" || isLoading
                  }
                  className="flex-1 text-xs sm:text-sm font-black uppercase tracking-widest"
                >
                  {isLoading ? (
                    "Deleting..."
                  ) : (
                    <>
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete Account
                    </>
                  )}
                </Button>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
