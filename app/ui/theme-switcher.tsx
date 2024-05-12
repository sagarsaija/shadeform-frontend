import React from "react";
import { Moon, Sun } from "lucide-react";
// import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/ui/dropdown-menu";
import { Button } from "@/app/ui/button";
import { useState, useEffect } from "react";
import { useTheme as useNextTheme } from "next-themes";

const ThemeSwitcher = () => {
  const { theme, setTheme } = useNextTheme();

  // Use a local state to store the theme on the client-side
  const [localTheme, setLocalTheme] = useState(theme);

  useEffect(() => {
    // Update the local state when the theme changes
    setLocalTheme(theme);
  }, [theme]);

  // Use the local state to determine the current theme
  const currentTheme = localTheme;

  return (
    <div className="flex justify-end fixed top-0 right-0 m-4">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            {currentTheme === "light" ? (
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            ) : (
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            )}
            <span className="sr-only">Toggle theme</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setTheme("light")}>
            Light
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("dark")}>
            Dark
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("system")}>
            System
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ThemeSwitcher;
