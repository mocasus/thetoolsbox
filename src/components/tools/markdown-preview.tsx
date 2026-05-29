"use client";

import { useState, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/ui/copy-button";
import { Trash2 } from "lucide-react";

const SAMPLE = `# Hello World

This is a **Markdown** preview tool.

## Features
- Real-time preview
- GitHub-flavored markdown
- Supports *italic*, **bold**, and \`code\`

### Code Block
\`\`\`javascript
const greeting = "Hello!";
console.log(greeting);
\`\`\`

> This is a blockquote

[Link](https://example.com) | ![Image](https://via.placeholder.com/50)
`;

export function MarkdownPreview() {
  const [input, setInput] = useState(SAMPLE);
  const [html, setHtml] = useState("");

  useEffect(() => {
    const renderMarkdown = async () => {
      const { marked } = await import("marked");
      const result = await marked(input);
      setHtml(result);
    };
    renderMarkdown();
  }, [input]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium">Markdown</label>
        <div className="flex gap-2">
          <CopyButton text={html} />
          <Button variant="ghost" size="sm" onClick={() => setInput("")}><Trash2 className="mr-1 h-3 w-3" /> Clear</Button>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Textarea value={input} onChange={(e) => setInput(e.target.value)} className="min-h-[400px] font-mono text-sm" />
        <div className="prose prose-sm dark:prose-invert max-w-none rounded-lg border border-border p-4 overflow-auto min-h-[400px]" dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </div>
  );
}
