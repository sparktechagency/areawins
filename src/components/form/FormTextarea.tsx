import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import React from "react";

interface FormTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  icon?: LucideIcon;
  error?: string | string[];
}

const FormTextarea = React.forwardRef<HTMLTextAreaElement, FormTextareaProps>(
  (
    { label, icon: Icon, error, className, id, name, required, ...props },
    ref,
  ) => {
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <Label
            htmlFor={id || name}
            className="text-sm font-semibold text-gray-700"
          >
            {label} {required && <span className="text-red-500">*</span>}
          </Label>
        )}
        <div className="relative">
          {Icon && (
            <Icon className="absolute left-3 top-3 w-5 h-5 text-gray-400 pointer-events-none" />
          )}
          <Textarea
            id={id}
            name={name}
            ref={ref}
            className={cn(
              "min-h-[100px] text-base border-gray-200 rounded-md focus:border-primary focus:ring-primary transition-all font-medium",
              Icon && "pl-10 pt-2.5",
              error ? "border-red-500 bg-red-50/10" : "bg-gray-50/30",
              className,
            )}
            required={required}
            {...props}
          />
        </div>
        {error && (
          <p className="text-xs font-medium text-red-500 mt-1">
            {Array.isArray(error) ? error[0] : error}
          </p>
        )}
      </div>
    );
  },
);
FormTextarea.displayName = "FormTextarea";

export { FormTextarea };
