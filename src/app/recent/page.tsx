"use client";

import { ToolCard } from "@/components/layout/tool-card";
import { useRecentContext } from "@/providers/recent-provider";
import { tools } from "@/data/tools";
import { Clock } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function RecentPage() {
  const { recent } = useRecentContext();
  const recentTools = recent
    .map((id) => tools.find((t) => t.id === id))
    .filter(Boolean) as typeof tools;

  return (
    <div className="container py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">
          <Clock className="mr-2 inline h-7 w-7 text-blue-500" />
          Recently Used
        </h1>
        <p className="mt-2 text-muted-foreground">
          Tools you&apos;ve used recently for quick access.
        </p>
      </div>

      {recentTools.length === 0 ? (
        <div className="py-20 text-center">
          <Clock className="mx-auto h-12 w-12 text-muted-foreground/30" />
          <p className="mt-4 text-lg text-muted-foreground">No recent tools</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Start using tools and they&apos;ll appear here.
          </p>
          <Link href="/tools">
            <Button className="mt-4">Browse Tools</Button>
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {recentTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      )}
    </div>
  );
}
