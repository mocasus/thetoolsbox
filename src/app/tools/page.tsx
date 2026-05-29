"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ToolCard } from "@/components/layout/tool-card";
import { tools, searchTools } from "@/data/tools";
import { categories } from "@/data/categories";
import { Search } from "lucide-react";

export default function ToolsPage() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filtered = query
    ? searchTools(query)
    : activeCategory
    ? tools.filter((t) => t.categorySlug === activeCategory)
    : tools;

  return (
    <div className="container py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">All Tools</h1>
        <p className="mt-2 text-muted-foreground">
          Browse all {tools.length} tools available in The Tools Box.
        </p>
      </div>

      {/* Search & Filter */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search tools..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        <Button
          variant={activeCategory === null ? "default" : "outline"}
          size="sm"
          onClick={() => setActiveCategory(null)}
        >
          All ({tools.length})
        </Button>
        {categories.map((cat) => {
          const count = tools.filter((t) => t.categorySlug === cat.slug).length;
          return (
            <Button
              key={cat.id}
              variant={activeCategory === cat.slug ? "default" : "outline"}
              size="sm"
              onClick={() => {
                setActiveCategory(cat.slug);
                setQuery("");
              }}
            >
              {cat.icon} {cat.name} ({count})
            </Button>
          );
        })}
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="py-20 text-center">
          <p className="text-lg text-muted-foreground">No tools found.</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Try a different search term or category.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      )}
    </div>
  );
}
