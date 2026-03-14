import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Eye, EyeOff, LucideIcon } from "lucide-react";
import React from "react";

interface FormInputProps extends React.ComponentProps<typeof Input> {
  label?: string;
  icon?: LucideIcon;
  error?: string | string[];
  required?: boolean;
}

const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, icon: Icon, error, className, required, type, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const isPassword = type === "password";
    const inputType = isPassword ? (showPassword ? "text" : "password") : type;

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <Label
            htmlFor={props.id || props.name}
            className="text-sm font-semibold text-gray-700"
          >
            {label} {required && <span className="text-red-500">*</span>}
          </Label>
        )}
        <div className="relative">
          {Icon && (
            <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
          )}
          <Input
            ref={ref}
            type={inputType}
            className={cn(
              "w-full h-12  rounded-md outline-none shadow-none focus-visible:ring-0 focus-visible:border-primary transition-all text-sm",
              Icon && "pl-10",
              isPassword && "pr-10",
              error ? "border-red-500" : "bg-gray-50 border-gray-100",
              className,
            )}
            {...props}
          />
          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          )}
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
FormInput.displayName = "FormInput";

export { FormInput };
