"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

const DarkModeToggle = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // Only render after component is mounted to avoid hydration mismatch
  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Show nothing during SSR and initial render
  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" aria-label="Toggle theme">
        <div className="size-6" />
      </Button>
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Toggle theme"
      className="relative cursor-pointer bg-transparent"
    >
      {isDark ? (
        <Moon className="size-6 transition-transform duration-300 hover:rotate-12" />
      ) : (
        <Sun className="size-6 transition-transform duration-300 hover:rotate-90" />
      )}
    </button>
  );
};
export default DarkModeToggle;
