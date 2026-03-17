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
import { Upload, X } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";

interface EditAvatarModalProps {
  open: boolean;
  onClose: () => void;
}

export default function EditAvatarModal({ open, onClose }: EditAvatarModalProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreview(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    if (!preview || !fileInputRef.current?.files?.[0]) return;

    setIsLoading(true);
    // TODO: Implement image upload logic here
    // This will be replaced with actual API call
    setTimeout(() => {
      setIsLoading(false);
      onClose();
      setPreview(null);
      setFileName("");
    }, 1500);
  };

  const handleClear = () => {
    setPreview(null);
    setFileName("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg sm:text-xl font-bold">
            Update Profile Photo
          </DialogTitle>
          <DialogDescription className="text-xs sm:text-sm">
            Choose an image from your device to set as your profile picture
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 sm:space-y-5">
          {/* Preview */}
          {preview ? (
            <div className="relative w-full h-48 sm:h-56 rounded-lg border-2 border-primary/30 overflow-hidden bg-muted">
              <Image
                src={preview}
                alt="Preview"
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div className="w-full h-48 sm:h-56 rounded-lg border-2 border-dashed border-border flex flex-col items-center justify-center bg-muted/50">
              <Upload className="w-8 h-8 sm:w-10 sm:h-10 text-muted-foreground mb-2" />
              <p className="text-xs sm:text-sm text-muted-foreground font-medium">
                No image selected
              </p>
            </div>
          )}

          {/* File Input */}
          <div>
            <Label
              htmlFor="avatar-upload"
              className="text-xs sm:text-sm font-black uppercase tracking-widest text-muted-foreground"
            >
              Select Image
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
              className="w-full mt-2 text-xs sm:text-sm font-black uppercase tracking-widest"
            >
              <Upload className="w-4 h-4 mr-2" />
              Browse Files
            </Button>
          </div>

          {/* File Name */}
          {fileName && (
            <p className="text-xs sm:text-sm text-muted-foreground break-all">
              Selected: <span className="font-bold text-foreground">{fileName}</span>
            </p>
          )}

          {/* Actions */}
          <div className="flex gap-2 sm:gap-3 pt-2 sm:pt-4">
            <Button
              onClick={handleClear}
              variant="outline"
              className="flex-1 text-xs sm:text-sm font-black uppercase tracking-widest"
              disabled={!preview}
            >
              <X className="w-4 h-4 mr-2" />
              Clear
            </Button>
            <Button
              onClick={handleUpload}
              disabled={!preview || isLoading}
              className="flex-1 text-xs sm:text-sm font-black uppercase tracking-widest"
            >
              {isLoading ? "Uploading..." : "Upload"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
