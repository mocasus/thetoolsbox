"use client";

import Link from "next/link";
import { useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useFavoritesContext } from "@/providers/favorites-provider";
import { useRecentContext } from "@/providers/recent-provider";
import { getRelatedTools, type Tool } from "@/data/tools";
import { Heart, ArrowLeft, Shield } from "lucide-react";

interface ToolLayoutProps {
  tool: Tool;
  children: React.ReactNode;
}

export function ToolLayout({ tool, children }: ToolLayoutProps) {
  const { toggleFavorite, isFavorite } = useFavoritesContext();
  const { addRecent } = useRecentContext();
  const relatedTools = getRelatedTools(tool.id);
  const favorited = isFavorite(tool.id);

  useEffect(() => {
    addRecent(tool.id);
  }, [tool.id, addRecent]);

  return (
    <div className="container py-6 lg:py-10">
      {/* Breadcrumb */}
      <div className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/tools" className="hover:text-foreground">
          <ArrowLeft className="inline h-3 w-3" /> All Tools
        </Link>
        <span>/</span>
        <Link
          href={`/categories/${tool.categorySlug}`}
          className="hover:text-foreground"
        >
          {tool.category}
        </Link>
        <span>/</span>
        <span className="text-foreground">{tool.name}</span>
      </div>

      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <span className="text-3xl">{tool.icon}</span>
            <h1 className="text-2xl font-bold text-foreground lg:text-3xl">
              {tool.name}
            </h1>
          </div>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            {tool.longDescription}
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <Badge variant="secondary">{tool.category}</Badge>
            {tool.isNew && <Badge className="bg-green-500/10 text-green-500 border-green-500/20">New</Badge>}
            {tool.isClientSide && (
              <Badge variant="outline" className="gap-1">
                <Shield className="h-3 w-3" /> Client-side
              </Badge>
            )}
          </div>
        </div>
        <Button
          variant={favorited ? "default" : "outline"}
          size="sm"
          onClick={() => toggleFavorite(tool.id)}
          className="shrink-0"
        >
          <Heart className={`mr-1 h-3 w-3 ${favorited ? "fill-current" : ""}`} />
          {favorited ? "Favorited" : "Add to Favorites"}
        </Button>
      </div>

      {/* Tool Content */}
      <Card className="mb-8 p-6">{children}</Card>

      {/* Privacy Note */}
      {tool.isClientSide && (
        <div className="mb-8 flex items-start gap-3 rounded-lg border border-green-500/20 bg-green-500/5 p-4">
          <Shield className="mt-0.5 h-4 w-4 text-green-500" />
          <div>
            <p className="text-sm font-medium text-foreground">Privacy Friendly</p>
            <p className="text-xs text-muted-foreground">
              This tool processes everything in your browser. No files are uploaded to any server.
            </p>
          </div>
        </div>
      )}

      {/* Use Cases */}
      {tool.useCases.length > 0 && (
        <div className="mb-8">
          <h2 className="mb-3 text-lg font-semibold text-foreground">Use Cases</h2>
          <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {tool.useCases.map((uc) => (
              <li key={uc} className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                {uc}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Related Tools */}
      {relatedTools.length > 0 && (
        <div>
          <h2 className="mb-3 text-lg font-semibold text-foreground">Related Tools</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {relatedTools.map((rt) => (
              <Link key={rt.id} href={`/tools/${rt.slug}`}>
                <Card className="flex items-center gap-3 p-4 transition-colors hover:bg-accent">
                  <span className="text-xl">{rt.icon}</span>
                  <div>
                    <p className="text-sm font-medium text-foreground">{rt.name}</p>
                    <p className="text-xs text-muted-foreground">{rt.description}</p>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
