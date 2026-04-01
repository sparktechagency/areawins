import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import React from "react";

export const SidebarLink = ({
  icon,
  label,
  count,
  active,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  count?: number;
  active?: boolean;
  href?: string;
}) => {
  const content = (
    <>
      <div
        className={cn(
          "shrink-0 transition-transform group-hover:scale-110",
          typeof icon === "string" ? "text-lg" : "",
        )}
      >
        {icon}
      </div>
      <span className="flex-1 text-left">{label}</span>
      {count !== undefined && (
        <span className="text-[10px] font-bold bg-muted px-1.5 py-0.5 rounded text-muted-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
          {count}
        </span>
      )}
      <ChevronRight
        className={cn(
          "size-3.5 opacity-0 -translate-x-2 transition-all",
          active
            ? "opacity-100 translate-x-0"
            : "group-hover:opacity-40 group-hover:translate-x-0",
        )}
      />
    </>
  );

  const className = cn(
    "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all group cursor-pointer",
    active
      ? "bg-primary/10 text-primary border border-primary/20"
      : "text-muted-foreground hover:bg-muted/50 hover:text-foreground border border-transparent",
  );

  if (href) {
    return (
      <Link href={href} className={className}>
        {content}
      </Link>
    );
  }

  return <button className={className}>{content}</button>;
};
