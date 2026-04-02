"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useTranslation } from "@/i18n/LanguageContext";
import { useUpdateMyProfilePictureMutation } from "@/redux/api/userApi";
import {
  AlertCircle,
  CheckCircle,
  RotateCw,
  Upload,
  X,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import type { Area, Point } from "react-easy-crop";
import Cropper from "react-easy-crop";
import { cn } from "@/lib/utils";

interface EditAvatarModalProps {
  open: boolean;
  onClose: () => void;
}

export default function EditAvatarModal({
  open,
  onClose,
}: EditAvatarModalProps) {
  const { t } = useTranslation();
  const [updateProfilePicture] = useUpdateMyProfilePictureMutation();
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isCropping, setIsCropping] = useState(false);
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedArea, setCroppedArea] = useState<Area | null>(null);
  const [formMessage, setFormMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreview(event.target?.result as string);
        setIsCropping(true);
        setCrop({ x: 0, y: 0 });
        setZoom(1);
        setRotation(0);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCropComplete = (_croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedArea(croppedAreaPixels);
  };

  const getCroppedImage = async (): Promise<string | null> => {
    if (!preview || !croppedArea) return null;

    return new Promise((resolve) => {
      const image = new window.Image();
      image.src = preview;
      image.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          resolve(null);
          return;
        }

        canvas.width = croppedArea.width;
        canvas.height = croppedArea.height;

        ctx.drawImage(
          image,
          croppedArea.x,
          croppedArea.y,
          croppedArea.width,
          croppedArea.height,
          0,
          0,
          croppedArea.width,
          croppedArea.height,
        );

        resolve(canvas.toDataURL("image/jpeg"));
      };
    });
  };

  const handleFinishCrop = async () => {
    const croppedImage = await getCroppedImage();
    if (croppedImage) {
      setPreview(croppedImage);
      setIsCropping(false);
    }
  };

  const handleUpload = async () => {
    if (!preview) return;

    setIsLoading(true);
    setFormMessage(null);
    try {
      // Convert base64 to blob/file
      const response = await fetch(preview);
      const blob = await response.blob();
      const file = new File([blob], "profile-picture.jpg", {
        type: "image/jpeg",
      });

      const formData = new FormData();
      formData.append("profileImage", file);

      await updateProfilePicture(formData).unwrap();
      setFormMessage({
        type: "success",
        text: t("avatar.uploadSuccess") || "Profile picture updated",
      });
      setTimeout(() => {
        onClose();
        setPreview(null);
        setIsCropping(false);
        setFormMessage(null);
      }, 2000);
    } catch (error: unknown) {
      const err = error as { data?: { message?: string } };
      setFormMessage({
        type: "error",
        text:
          err.data?.message ||
          t("avatar.uploadFailed") ||
          "Failed to upload image",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setPreview(null);
    setIsCropping(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md border-0">
        <DialogHeader>
          <DialogTitle className="text-lg sm:text-xl font-bold">
            {isCropping ? t("avatar.cropTitle") : t("avatar.uploadTitle")}
          </DialogTitle>
          <DialogDescription className="text-xs sm:text-sm">
            {isCropping
              ? t("avatar.cropDescription")
              : t("avatar.uploadDescription")}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 sm:space-y-5">
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
          {/* Crop View */}
          {isCropping && preview ? (
            <>
              <div
                className="relative w-full rounded-lg overflow-hidden bg-primary/10"
                style={{ height: "320px" }}
              >
                <Cropper
                  image={preview}
                  crop={crop}
                  zoom={zoom}
                  rotation={rotation}
                  aspect={1}
                  cropShape="round"
                  showGrid={true}
                  onCropChange={setCrop}
                  onCropComplete={handleCropComplete}
                  onZoomChange={setZoom}
                  onRotationChange={setRotation}
                />
              </div>

              {/* Crop Controls */}
              <div className="space-y-3">
                {/* Zoom Control */}
                <div className="flex items-center gap-3">
                  <ZoomOut className="w-4 h-4 text-muted-foreground" />
                  <Slider
                    value={[zoom]}
                    onValueChange={(value: number[]) => setZoom(value[0])}
                    min={1}
                    max={3}
                    step={0.1}
                    className="flex-1"
                  />
                  <ZoomIn className="w-4 h-4 text-muted-foreground" />
                </div>

                {/* Rotation Control */}
                <div className="flex items-center gap-3">
                  <RotateCw className="w-4 h-4 text-muted-foreground" />
                  <Slider
                    value={[rotation]}
                    onValueChange={(value: number[]) => setRotation(value[0])}
                    min={0}
                    max={360}
                    step={15}
                    className="flex-1"
                  />
                  <span className="text-xs text-muted-foreground w-8">
                    {rotation}°
                  </span>
                </div>
              </div>

              {/* Crop Actions */}
              <div className="flex gap-2 sm:gap-3 pt-2 sm:pt-4">
                <Button
                  onClick={handleClear}
                  variant="outline"
                  className="flex-1 text-xs sm:text-sm  tracking-widest cursor-pointer"
                >
                  <X className="w-4 h-4 mr-2" />
                  {t("avatar.cancel")}
                </Button>
                <Button
                  onClick={handleFinishCrop}
                  className="flex-1 text-xs sm:text-sm  tracking-widest cursor-pointer"
                >
                  {t("avatar.cropContinue")}
                </Button>
              </div>
            </>
          ) : (
            <>
              {/* Preview (after crop) */}
              {preview ? (
                <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-full border-2 border-primary/30 overflow-hidden bg-muted mx-auto flex items-center justify-center">
                  <Image
                    src={preview}
                    alt="Preview"
                    width={200}
                    height={200}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="w-full h-48 sm:h-56 rounded-lg border-2 border-dashed border-border flex flex-col items-center justify-center bg-muted/50">
                  <Upload className="w-8 h-8 sm:w-10 sm:h-10 text-muted-foreground mb-2" />
                  <p className="text-xs sm:text-sm text-muted-foreground font-medium">
                    {t("avatar.noImage")}
                  </p>
                </div>
              )}

              {/* File Input */}
              <div>
                <Label
                  htmlFor="avatar-upload"
                  className="text-xs sm:text-sm  tracking-widest text-muted-foreground"
                >
                  {t("avatar.selectImage")}
                </Label>
                <input
                  ref={fileInputRef}
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  variant="outline"
                  className="w-full mt-2 text-xs sm:text-sm tracking-widest cursor-pointer"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  {t("avatar.browseFiles")}
                </Button>
              </div>

              {/* Actions */}
              <div className="flex gap-2 sm:gap-3 pt-2 sm:pt-4">
                <Button
                  onClick={handleClear}
                  variant="outline"
                  className="flex-1 text-xs sm:text-sm  tracking-widest cursor-pointer"
                  disabled={!preview}
                >
                  <X className="w-4 h-4 mr-2" />
                  {t("avatar.clear")}
                </Button>
                <Button
                  onClick={handleUpload}
                  disabled={!preview || isLoading}
                  className="flex-1 text-xs sm:text-sm tracking-widest cursor-pointer"
                >
                  {isLoading ? t("avatar.uploading") : t("avatar.upload")}
                </Button>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
