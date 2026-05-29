"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

const LIMITS = [
  { name: "Twitter/X", limit: 280 },
  { name: "Instagram Bio", limit: 150 },
  { name: "YouTube Title", limit: 100 },
  { name: "Meta Description", limit: 160 },
  { name: "SMS", limit: 160 },
  { name: "Facebook Post", limit: 63206 },
];

export function CharacterCounter() {
  const [text, setText] = useState("");
  const chars = text.length;
  const charsNoSpaces = text.replace(/\s/g, "").length;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium">Enter your text</label>
        <Button variant="ghost" size="sm" onClick={() => setText("")}><Trash2 className="mr-1 h-3 w-3" /> Clear</Button>
      </div>
      <Textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Type or paste text..." className="min-h-[150px]" />
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-lg border border-border p-4 text-center">
          <p className="text-3xl font-bold text-foreground">{chars}</p>
          <p className="text-xs text-muted-foreground">Characters (with spaces)</p>
        </div>
        <div className="rounded-lg border border-border p-4 text-center">
          <p className="text-3xl font-bold text-foreground">{charsNoSpaces}</p>
          <p className="text-xs text-muted-foreground">Characters (no spaces)</p>
        </div>
      </div>
      <div>
        <p className="mb-2 text-sm font-medium">Platform Limits</p>
        <div className="space-y-2">
          {LIMITS.map((l) => (
            <div key={l.name} className="flex items-center justify-between rounded-lg bg-muted px-3 py-2">
              <span className="text-sm">{l.name}</span>
              <span className={`text-sm font-medium ${chars > l.limit ? "text-red-500" : "text-green-500"}`}>
                {chars}/{l.limit}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
