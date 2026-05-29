"use client";

import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart } from "lucide-react";
import { useFavoritesContext } from "@/providers/favorites-provider";
import type { Tool } from "@/data/tools";

interface ToolCardProps {
  tool: Tool;
}

export function ToolCard({ tool }: ToolCardProps) {
  const { toggleFavorite, isFavorite } = useFavoritesContext();
  const favorited = isFavorite(tool.id);

  return (
    <Card className="group relative flex flex-col overflow-hidden transition-all hover:border-primary/30 hover:shadow-md">
      <Link href={`/tools/${tool.slug}`} className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between">
          <span className="text-2xl">{tool.icon}</span>
          <div className="flex gap-1">
            {tool.isNew && (
              <Badge className="bg-green-500/10 text-green-500 border-green-500/20 text-[10px]">
                New
              </Badge>
            )}
            {tool.isPopular && (
              <Badge className="bg-blue-500/10 text-blue-500 border-blue-500/20 text-[10px]">
                Popular
              </Badge>
            )}
          </div>
        </div>
        <h3 className="mt-3 text-sm font-semibold text-foreground group-hover:text-primary">
          {tool.name}
        </h3>
        <p className="mt-1 flex-1 text-xs text-muted-foreground">
          {tool.description}
        </p>
      </Link>
      <div className="flex items-center justify-between border-t border-border px-5 py-3">
        <span className="text-[10px] text-muted-foreground">{tool.category}</span>
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleFavorite(tool.id);
          }}
          className="text-muted-foreground transition-colors hover:text-red-500"
        >
          <Heart className={`h-3.5 w-3.5 ${favorited ? "fill-red-500 text-red-500" : ""}`} />
        </button>
      </div>
    </Card>
  );
}
