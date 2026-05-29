"use client";

import { type ReactNode } from "react";
import { ThemeProvider } from "./theme-provider";
import { ToastProvider } from "./toast-provider";
import { FavoritesProvider } from "./favorites-provider";
import { RecentProvider } from "./recent-provider";
import { CommandMenuProvider } from "./command-menu-provider";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <ToastProvider>
        <FavoritesProvider>
          <RecentProvider>
            <CommandMenuProvider>{children}</CommandMenuProvider>
          </RecentProvider>
        </FavoritesProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}
