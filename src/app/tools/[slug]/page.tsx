"use client";

import { useParams } from "next/navigation";
import { getToolBySlug } from "@/data/tools";
import { ToolLayout } from "@/components/layout/tool-layout";
import { getToolComponent } from "@/components/tools/registry";

export default function ToolPage() {
  const params = useParams();
  const slug = params.slug as string;
  const tool = getToolBySlug(slug);

  if (!tool) {
    return (
      <div className="container py-20 text-center">
        <h1 className="text-2xl font-bold text-foreground">Tool not found</h1>
        <p className="mt-2 text-muted-foreground">
          The tool you&apos;re looking for doesn&apos;t exist.
        </p>
      </div>
    );
  }

  const ToolComponent = getToolComponent(slug);

  return (
    <ToolLayout tool={tool}>
      {ToolComponent ? <ToolComponent /> : <PlaceholderTool />}
    </ToolLayout>
  );
}

function PlaceholderTool() {
  return (
    <div className="py-8 text-center">
      <p className="text-muted-foreground">
        This tool is coming soon. Check back later!
      </p>
    </div>
  );
}
