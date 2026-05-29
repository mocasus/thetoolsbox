"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { useCommandMenu } from "@/providers/command-menu-provider";
import { Button } from "@/components/ui/button";
import { Search, Moon, Sun, Menu, X, Heart } from "lucide-react";
import { useState } from "react";

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const { setOpen } = useCommandMenu();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { href: "/tools", label: "Tools" },
    { href: "/categories/image-tools", label: "Categories" },
    { href: "/favorites", label: "Favorites" },
    { href: "/about", label: "About" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-violet-600">
              <span className="text-sm font-bold text-white">T</span>
            </div>
            <span className="text-lg font-bold text-foreground">
              The Tools Box
            </span>
          </Link>
          <nav className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setOpen(true)}
            className="hidden gap-2 text-muted-foreground sm:flex"
          >
            <Search className="h-3.5 w-3.5" />
            <span className="text-xs">Search tools...</span>
            <kbd className="ml-2 rounded border border-border bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground">
              Ctrl+K
            </kbd>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setOpen(true)}
            className="sm:hidden"
          >
            <Search className="h-4 w-4" />
          </Button>
          <Link href="/favorites">
            <Button variant="ghost" size="icon" className="hidden sm:flex">
              <Heart className="h-4 w-4" />
            </Button>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-border md:hidden">
          <nav className="container flex flex-col gap-1 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
