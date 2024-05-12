"use client";
import { useState, useEffect } from "react";
import { Inter as FontSans } from "next/font/google";
import "@/styles/globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/app/ui/theme-provider";
import Sidebar from "./sidebar";
import ThemeSwitcher from "./ui/theme-switcher";
import { Toaster } from "./ui/toaster";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <html lang="en" suppressHydrationWarning>
      {isClient ? (
        <>
          <head />
          <body
            className={cn(
              "min-h-screen bg-background font-sans antialiased",
              fontSans.variable
            )}
          >
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <ThemeSwitcher />
              <main className="flex items-center justify-between">
                <Sidebar />
                <div className="flex-1 ml-64">{children}</div>
                <Toaster />
              </main>
            </ThemeProvider>
          </body>
        </>
      ) : (
        <>
          <head />
          <body>{children}</body>
        </>
      )}
    </html>
  );
}
