"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { CopyButton } from "@/components/ui/copy-button";

export function SlugGenerator() {
  const [input, setInput] = useState("");

  const slug = input
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return (
    <div className="space-y-4">
      <div>
        <label className="mb-1.5 block text-sm font-medium">Enter text</label>
        <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder="e.g. My Blog Post Title!" />
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium">Generated Slug</label>
        <div className="flex items-center gap-2">
          <Input value={slug} readOnly className="font-mono" />
          {slug && <CopyButton text={slug} />}
        </div>
      </div>
      {slug && <p className="text-xs text-muted-foreground">URL: https://example.com/{slug}</p>}
    </div>
  );
}
