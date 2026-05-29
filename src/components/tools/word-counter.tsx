"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

export function WordCounter() {
  const [text, setText] = useState("");

  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const chars = text.length;
  const charsNoSpaces = text.replace(/\s/g, "").length;
  const sentences = text.trim() ? text.split(/[.!?]+/).filter(Boolean).length : 0;
  const paragraphs = text.trim() ? text.split(/\n\n+/).filter((p) => p.trim()).length : 0;
  const readTime = Math.ceil(words / 200);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium">Enter your text</label>
        <Button variant="ghost" size="sm" onClick={() => setText("")}><Trash2 className="mr-1 h-3 w-3" /> Clear</Button>
      </div>
      <Textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Start typing or paste your text here..." className="min-h-[200px]" />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {[
          { label: "Words", value: words },
          { label: "Characters", value: chars },
          { label: "No Spaces", value: charsNoSpaces },
          { label: "Sentences", value: sentences },
          { label: "Paragraphs", value: paragraphs },
          { label: "Read Time", value: `${readTime} min` },
        ].map((stat) => (
          <div key={stat.label} className="rounded-lg border border-border p-3 text-center">
            <p className="text-2xl font-bold text-foreground">{stat.value}</p>
            <p className="text-xs text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
