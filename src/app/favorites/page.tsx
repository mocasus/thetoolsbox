"use client";

import { ToolCard } from "@/components/layout/tool-card";
import { useFavoritesContext } from "@/providers/favorites-provider";
import { tools } from "@/data/tools";
import { Heart } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function FavoritesPage() {
  const { favorites } = useFavoritesContext();
  const favoriteTools = tools.filter((t) => favorites.includes(t.id));

  return (
    <div className="container py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">
          <Heart className="mr-2 inline h-7 w-7 text-red-500" />
          Favorite Tools
        </h1>
        <p className="mt-2 text-muted-foreground">
          Your saved favorite tools for quick access.
        </p>
      </div>

      {favoriteTools.length === 0 ? (
        <div className="py-20 text-center">
          <Heart className="mx-auto h-12 w-12 text-muted-foreground/30" />
          <p className="mt-4 text-lg text-muted-foreground">No favorites yet</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Click the heart icon on any tool to add it to your favorites.
          </p>
          <Link href="/tools">
            <Button className="mt-4">Browse Tools</Button>
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {favoriteTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      )}
    </div>
  );
}
