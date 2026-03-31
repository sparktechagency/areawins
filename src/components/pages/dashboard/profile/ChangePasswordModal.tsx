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
import { Eye, EyeOff, Lock } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface ChangePasswordModalProps {
  open: boolean;
  onClose: () => void;
}

export default function ChangePasswordModal({
  open,
  onClose,
}: ChangePasswordModalProps) {
  const [loading, setLoading] = useState(false);
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.currentPassword) {
      newErrors.currentPassword = "Current password is required";
    }
    if (!formData.newPassword) {
      newErrors.newPassword = "New password is required";
    }
    if (formData.newPassword.length < 8) {
      newErrors.newPassword = "Password must be at least 8 characters";
    }
    if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    if (formData.currentPassword === formData.newPassword) {
      newErrors.newPassword = "New password must be different from current";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    // TODO: Implement API call to change password
    await new Promise((resolve) => setTimeout(resolve, 2000));
    toast.success("Password changed successfully");
    setLoading(false);
    handleClose();
  };

  const handleClose = () => {
    onClose();
    setFormData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setErrors({});
    setShowPasswords({
      current: false,
      new: false,
      confirm: false,
    });
  };

  const passwordStrength = (() => {
    const password = formData.newPassword;
    if (!password) return { level: 0, label: "", color: "" };
    if (password.length < 8)
      return { level: 1, label: "Weak", color: "text-red-500" };
    if (!/[A-Z]/.test(password) || !/[0-9]/.test(password)) {
      return { level: 2, label: "Fair", color: "text-yellow-500" };
    }
    if (!/[!@#$%^&*]/.test(password)) {
      return { level: 3, label: "Good", color: "text-blue-500" };
    }
    return { level: 4, label: "Strong", color: "text-emerald-500" };
  })();

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-2">
            <Lock className="w-5 h-5 text-primary" />
            <DialogTitle className="text-lg sm:text-xl font-bold">
              Change Password
            </DialogTitle>
          </div>
          <DialogDescription className="text-xs sm:text-sm">
            Create a strong password to keep your account secure
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
          {/* Current Password */}
          <div className="space-y-1.5 sm:space-y-2">
            <Label
              htmlFor="currentPassword"
              className="text-xs sm:text-sm  uppercase tracking-widest"
            >
              Current Password
            </Label>
            <div className="relative">
              <Input
                id="currentPassword"
                name="currentPassword"
                type={showPasswords.current ? "text" : "password"}
                placeholder="Enter your current password"
                value={formData.currentPassword}
                onChange={handleChange}
                className={`text-xs sm:text-sm pr-10 ${
                  errors.currentPassword ? "border-red-500" : ""
                }`}
              />
              <button
                type="button"
                onClick={() =>
                  setShowPasswords((prev) => ({
                    ...prev,
                    current: !prev.current,
                  }))
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPasswords.current ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
            {errors.currentPassword && (
              <p className="text-xs text-red-500 font-medium">
                {errors.currentPassword}
              </p>
            )}
          </div>

          {/* New Password */}
          <div className="space-y-1.5 sm:space-y-2">
            <Label
              htmlFor="newPassword"
              className="text-xs sm:text-sm  uppercase tracking-widest"
            >
              New Password
            </Label>
            <div className="relative">
              <Input
                id="newPassword"
                name="newPassword"
                type={showPasswords.new ? "text" : "password"}
                placeholder="Enter your new password"
                value={formData.newPassword}
                onChange={handleChange}
                className={`text-xs sm:text-sm pr-10 ${
                  errors.newPassword ? "border-red-500" : ""
                }`}
              />
              <button
                type="button"
                onClick={() =>
                  setShowPasswords((prev) => ({
                    ...prev,
                    new: !prev.new,
                  }))
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPasswords.new ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
            {errors.newPassword && (
              <p className="text-xs text-red-500 font-medium">
                {errors.newPassword}
              </p>
            )}

            {/* Password Strength */}
            {formData.newPassword && (
              <div className="pt-1 sm:pt-2">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] sm:text-xs font-bold text-muted-foreground uppercase">
                    Strength
                  </span>
                  <span
                    className={`text-xs font-bold ${passwordStrength.color}`}
                  >
                    {passwordStrength.label}
                  </span>
                </div>
                <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all ${
                      passwordStrength.level === 1
                        ? "w-1/4 bg-red-500"
                        : passwordStrength.level === 2
                          ? "w-1/2 bg-yellow-500"
                          : passwordStrength.level === 3
                            ? "w-3/4 bg-blue-500"
                            : "w-full bg-emerald-500"
                    }`}
                  />
                </div>
                <p className="text-[10px] text-muted-foreground mt-1.5">
                  Use uppercase, lowercase, numbers, and symbols for stronger
                  passwords
                </p>
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <div className="space-y-1.5 sm:space-y-2">
            <Label
              htmlFor="confirmPassword"
              className="text-xs sm:text-sm  uppercase tracking-widest"
            >
              Confirm Password
            </Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type={showPasswords.confirm ? "text" : "password"}
                placeholder="Confirm your new password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`text-xs sm:text-sm pr-10 ${
                  errors.confirmPassword ? "border-red-500" : ""
                }`}
              />
              <button
                type="button"
                onClick={() =>
                  setShowPasswords((prev) => ({
                    ...prev,
                    confirm: !prev.confirm,
                  }))
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPasswords.confirm ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-xs text-red-500 font-medium">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-2 sm:gap-3 pt-2 sm:pt-4">
            <Button
              type="button"
              onClick={handleClose}
              variant="outline"
              className="flex-1 text-xs sm:text-sm  uppercase tracking-widest"
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="flex-1 text-xs sm:text-sm  uppercase tracking-widest"
            >
              {loading ? "Changing..." : "Change Password"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
