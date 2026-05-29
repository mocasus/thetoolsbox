"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/ui/copy-button";
import { Trash2 } from "lucide-react";

export function CaseConverter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const convert = (type: string) => {
    let result = input;
    switch (type) {
      case "upper": result = input.toUpperCase(); break;
      case "lower": result = input.toLowerCase(); break;
      case "title": result = input.replace(/\w\S*/g, (t) => t.charAt(0).toUpperCase() + t.slice(1).toLowerCase()); break;
      case "sentence": result = input.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase()); break;
      case "camel": result = input.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (_, c) => c.toUpperCase()); break;
      case "pascal": result = input.toLowerCase().replace(/(^|[^a-zA-Z0-9]+)(.)/g, (_, __, c) => c.toUpperCase()); break;
      case "snake": result = input.toLowerCase().replace(/\s+/g, "_").replace(/[^a-z0-9_]/g, ""); break;
      case "kebab": result = input.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""); break;
      case "toggle": result = input.split("").map((c) => c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase()).join(""); break;
    }
    setOutput(result);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium">Input Text</label>
        <Button variant="ghost" size="sm" onClick={() => { setInput(""); setOutput(""); }}><Trash2 className="mr-1 h-3 w-3" /> Clear</Button>
      </div>
      <Textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="Enter text to convert..." className="min-h-[100px]" />
      <div className="flex flex-wrap gap-2">
        {[
          { id: "upper", label: "UPPERCASE" }, { id: "lower", label: "lowercase" },
          { id: "title", label: "Title Case" }, { id: "sentence", label: "Sentence case" },
          { id: "camel", label: "camelCase" }, { id: "pascal", label: "PascalCase" },
          { id: "snake", label: "snake_case" }, { id: "kebab", label: "kebab-case" },
          { id: "toggle", label: "tOGGLE" },
        ].map((t) => (
          <Button key={t.id} variant="outline" size="sm" onClick={() => convert(t.id)}>{t.label}</Button>
        ))}
      </div>
      {output && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Result</label>
            <CopyButton text={output} />
          </div>
          <Textarea value={output} readOnly className="min-h-[100px]" />
        </div>
      )}
    </div>
  );
}
