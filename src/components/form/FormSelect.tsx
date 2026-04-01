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
  onChange?: (value: string) => void;
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
  onChange,
  onValueChange,
  ...props
}) => {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <Label
          htmlFor={id || props.name}
          className="text-sm font-semibold text-muted-foreground"
        >
          {label} {required && <span className="text-red-500">*</span>}
        </Label>
      )}
      <div className="relative">
        <Select
          {...props}
          onValueChange={(value) => {
            onValueChange?.(value);
            onChange?.(value);
          }}
        >
          <SelectTrigger
            id={id || props.name}
            aria-invalid={!!error}
            className={cn(
              "w-full h-12 rounded-md outline-none shadow-none focus-visible:ring-0 focus-visible:border-primary transition-all text-sm",
              Icon && "pl-10",
              error ? "border-red-500" : "bg-border border-border",
              triggerClassName,
            )}
          >
            {Icon && (
              <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
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
