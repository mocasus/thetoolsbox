"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/ui/copy-button";

export function MetaTagGenerator() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [keywords, setKeywords] = useState("");
  const [url, setUrl] = useState("");
  const [image, setImage] = useState("");
  const [author, setAuthor] = useState("");

  const generateMeta = () => {
    const lines: string[] = [];
    lines.push(`<meta charset="UTF-8">`);
    lines.push(`<meta name="viewport" content="width=device-width, initial-scale=1.0">`);
    if (title) lines.push(`<title>${title}</title>`);
    if (description) lines.push(`<meta name="description" content="${description}">`);
    if (keywords) lines.push(`<meta name="keywords" content="${keywords}">`);
    if (author) lines.push(`<meta name="author" content="${author}">`);
    lines.push("");
    lines.push("<!-- Open Graph -->");
    if (title) lines.push(`<meta property="og:title" content="${title}">`);
    if (description) lines.push(`<meta property="og:description" content="${description}">`);
    if (url) lines.push(`<meta property="og:url" content="${url}">`);
    if (image) lines.push(`<meta property="og:image" content="${image}">`);
    lines.push(`<meta property="og:type" content="website">`);
    lines.push("");
    lines.push("<!-- Twitter Card -->");
    lines.push(`<meta name="twitter:card" content="summary_large_image">`);
    if (title) lines.push(`<meta name="twitter:title" content="${title}">`);
    if (description) lines.push(`<meta name="twitter:description" content="${description}">`);
    if (image) lines.push(`<meta name="twitter:image" content="${image}">`);
    return lines.join("\n");
  };

  const output = generateMeta();

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div><label className="mb-1 block text-xs font-medium">Title</label><Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="My Website" /></div>
        <div><label className="mb-1 block text-xs font-medium">Author</label><Input value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="John Doe" /></div>
        <div className="sm:col-span-2"><label className="mb-1 block text-xs font-medium">Description</label><Input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="A brief description of your page" /></div>
        <div><label className="mb-1 block text-xs font-medium">URL</label><Input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://example.com" /></div>
        <div><label className="mb-1 block text-xs font-medium">Image URL</label><Input value={image} onChange={(e) => setImage(e.target.value)} placeholder="https://example.com/image.jpg" /></div>
        <div className="sm:col-span-2"><label className="mb-1 block text-xs font-medium">Keywords</label><Input value={keywords} onChange={(e) => setKeywords(e.target.value)} placeholder="keyword1, keyword2, keyword3" /></div>
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between"><label className="text-sm font-medium">Generated Meta Tags</label><CopyButton text={output} /></div>
        <Textarea value={output} readOnly className="min-h-[250px] font-mono text-xs" />
      </div>
    </div>
  );
}
