"use client";

import { createContext, useContext, type ReactNode } from "react";
import { useRecent } from "@/hooks/use-recent";

interface RecentContextType {
  recent: string[];
  addRecent: (toolId: string) => void;
}

const RecentContext = createContext<RecentContextType>({
  recent: [],
  addRecent: () => {},
});

export const useRecentContext = () => useContext(RecentContext);

export function RecentProvider({ children }: { children: ReactNode }) {
  const { recent, addRecent } = useRecent();

  return (
    <RecentContext.Provider value={{ recent, addRecent }}>
      {children}
    </RecentContext.Provider>
  );
}
