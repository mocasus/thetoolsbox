"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { ToolCard } from "@/components/layout/tool-card";
import { getToolsByCategory } from "@/data/tools";
import { getCategoryBySlug, categories } from "@/data/categories";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";

export default function CategoryPage() {
  const params = useParams();
  const slug = params.category as string;
  const category = getCategoryBySlug(slug);
  const categoryTools = getToolsByCategory(slug);

  if (!category) {
    return (
      <div className="container py-20 text-center">
        <h1 className="text-2xl font-bold text-foreground">Category not found</h1>
        <p className="mt-2 text-muted-foreground">
          The category you&apos;re looking for doesn&apos;t exist.
        </p>
      </div>
    );
  }

  return (
    <div className="container py-10">
      <div className="mb-2">
        <Link
          href="/tools"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-3 w-3" /> All Tools
        </Link>
      </div>

      <div className="mb-8">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{category.icon}</span>
          <h1 className="text-3xl font-bold text-foreground">{category.name}</h1>
        </div>
        <p className="mt-2 text-muted-foreground">{category.description}</p>
        <Badge variant="secondary" className="mt-3">
          {categoryTools.length} tools
        </Badge>
      </div>

      {/* Other Categories */}
      <div className="mb-8 flex flex-wrap gap-2">
        {categories.map((cat) => (
          <Link key={cat.id} href={`/categories/${cat.slug}`}>
            <Badge
              variant={cat.slug === slug ? "default" : "outline"}
              className="cursor-pointer"
            >
              {cat.icon} {cat.name}
            </Badge>
          </Link>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {categoryTools.map((tool) => (
          <ToolCard key={tool.id} tool={tool} />
        ))}
      </div>
    </div>
  );
}
