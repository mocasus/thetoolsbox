"use client";

import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "ttb-favorites";

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setFavorites(JSON.parse(stored));
    } catch {}
  }, []);

  const saveFavorites = useCallback((newFavorites: string[]) => {
    setFavorites(newFavorites);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newFavorites));
    } catch {}
  }, []);

  const toggleFavorite = useCallback(
    (toolId: string) => {
      const newFavorites = favorites.includes(toolId)
        ? favorites.filter((id) => id !== toolId)
        : [...favorites, toolId];
      saveFavorites(newFavorites);
    },
    [favorites, saveFavorites]
  );

  const isFavorite = useCallback(
    (toolId: string) => favorites.includes(toolId),
    [favorites]
  );

  return { favorites, toggleFavorite, isFavorite };
}
