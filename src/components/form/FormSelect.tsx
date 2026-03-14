import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import React from "react";

interface FormSelectProps extends React.ComponentProps<typeof Select> {
  label?: string;
  icon?: LucideIcon;
  error?: string | string[];
  required?: boolean;
  options: { value: string; label: string }[];
  placeholder?: string;
  triggerClassName?: string;
  id?: string;
}

const FormSelect: React.FC<FormSelectProps> = ({
  label,
  icon: Icon,
  error,
  required,
  options,
  placeholder = "Select an option",
  triggerClassName,
  id,
  ...props
}) => {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <Label
          htmlFor={id || props.name}
          className="text-sm font-semibold text-gray-700"
        >
          {label} {required && <span className="text-red-500">*</span>}
        </Label>
      )}
      <div className="relative">
        <Select {...props}>
          <SelectTrigger
            className={cn(
              "h-12 border-gray-200 font-medium transition-all",
              Icon && "pl-10",
              error ? "border-red-500 bg-red-50/10" : "bg-gray-50/30",
              triggerClassName,
            )}
          >
            {Icon && (
              <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            )}
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {error && (
        <p className="text-xs font-medium text-red-500 mt-1">
          {Array.isArray(error) ? error[0] : error}
        </p>
      )}
    </div>
  );
};

export { FormSelect };
