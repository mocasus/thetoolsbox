"use client";

import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "ttb-recent";
const MAX_RECENT = 20;

export function useRecent() {
  const [recent, setRecent] = useState<string[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setRecent(JSON.parse(stored));
    } catch {}
  }, []);

  const addRecent = useCallback(
    (toolId: string) => {
      const newRecent = [toolId, ...recent.filter((id) => id !== toolId)].slice(
        0,
        MAX_RECENT
      );
      setRecent(newRecent);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newRecent));
      } catch {}
    },
    [recent]
  );

  return { recent, addRecent };
}
