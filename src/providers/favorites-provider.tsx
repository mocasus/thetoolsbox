"use client";

import { createContext, useContext, type ReactNode } from "react";
import { useFavorites } from "@/hooks/use-favorites";

interface FavoritesContextType {
  favorites: string[];
  toggleFavorite: (toolId: string) => void;
  isFavorite: (toolId: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType>({
  favorites: [],
  toggleFavorite: () => {},
  isFavorite: () => false,
});

export const useFavoritesContext = () => useContext(FavoritesContext);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const { favorites, toggleFavorite, isFavorite } = useFavorites();

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}
