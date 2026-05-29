"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/ui/copy-button";
import { useToastContext } from "@/providers/toast-provider";
import { Card } from "@/components/ui/card";

export function OpenGraphPreview() {
  const [title, setTitle] = useState("My Website Title");
  const [description, setDescription] = useState("A brief description of the page content.");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("https://example.com");

  return (
    <div className="space-y-4">
      <div className="grid gap-3">
        <Input placeholder="Page Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <Input placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        <Input placeholder="Image URL" value={image} onChange={(e) => setImage(e.target.value)} />
        <Input placeholder="Page URL" value={url} onChange={(e) => setUrl(e.target.value)} />
      </div>
      <div>
        <p className="mb-2 text-sm font-medium">Preview (Facebook/LinkedIn)</p>
        <Card className="max-w-md overflow-hidden">
          {image && <div className="h-40 bg-muted"><img src={image} alt="" className="h-full w-full object-cover" /></div>}
          <div className="p-3">
            <p className="text-[10px] uppercase text-muted-foreground">{url}</p>
            <p className="mt-1 text-sm font-semibold text-foreground line-clamp-2">{title}</p>
            <p className="mt-0.5 text-xs text-muted-foreground line-clamp-2">{description}</p>
          </div>
        </Card>
      </div>
    </div>
  );
}

export function TwitterCardPreview() {
  const [title, setTitle] = useState("My Page Title");
  const [description, setDescription] = useState("A brief description.");
  const [image, setImage] = useState("");
  const [domain, setDomain] = useState("example.com");

  return (
    <div className="space-y-4">
      <div className="grid gap-3">
        <Input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <Input placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        <Input placeholder="Image URL" value={image} onChange={(e) => setImage(e.target.value)} />
        <Input placeholder="Domain" value={domain} onChange={(e) => setDomain(e.target.value)} />
      </div>
      <div>
        <p className="mb-2 text-sm font-medium">Preview (Twitter/X)</p>
        <Card className="max-w-md overflow-hidden rounded-xl">
          {image && <div className="h-40 bg-muted"><img src={image} alt="" className="h-full w-full object-cover" /></div>}
          <div className="p-3">
            <p className="text-sm font-semibold text-foreground line-clamp-1">{title}</p>
            <p className="mt-0.5 text-xs text-muted-foreground line-clamp-2">{description}</p>
            <p className="mt-1 text-[10px] text-muted-foreground">{domain}</p>
          </div>
        </Card>
      </div>
    </div>
  );
}

export function RobotsTxtGenerator() {
  const [sitemapUrl, setSitemapUrl] = useState("https://example.com/sitemap.xml");
  const [disallow, setDisallow] = useState("/admin\n/private");
  const [allowAll, setAllowAll] = useState(true);

  const generate = () => {
    const lines: string[] = [];
    lines.push("User-agent: *");
    if (allowAll) lines.push("Allow: /");
    disallow.split("\n").filter(Boolean).forEach((p) => lines.push(`Disallow: ${p.trim()}`));
    lines.push("");
    if (sitemapUrl) lines.push(`Sitemap: ${sitemapUrl}`);
    return lines.join("\n");
  };

  const output = generate();

  return (
    <div className="space-y-4">
      <div className="grid gap-3">
        <div><label className="mb-1 block text-xs font-medium">Sitemap URL</label><Input value={sitemapUrl} onChange={(e) => setSitemapUrl(e.target.value)} /></div>
        <div><label className="mb-1 block text-xs font-medium">Disallow Paths (one per line)</label><Textarea value={disallow} onChange={(e) => setDisallow(e.target.value)} className="min-h-[80px] font-mono text-sm" /></div>
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={allowAll} onChange={(e) => setAllowAll(e.target.checked)} /> Allow all crawlers</label>
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between"><label className="text-sm font-medium">robots.txt</label><CopyButton text={output} /></div>
        <Textarea value={output} readOnly className="min-h-[120px] font-mono text-sm" />
      </div>
    </div>
  );
}

export function SitemapGenerator() {
  const [urls, setUrls] = useState("https://example.com\nhttps://example.com/about\nhttps://example.com/blog");
  const [priority, setPriority] = useState("0.8");

  const generate = () => {
    const urlList = urls.split("\n").filter(Boolean);
    const lines = ['<?xml version="1.0" encoding="UTF-8"?>', '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'];
    urlList.forEach((url) => {
      lines.push("  <url>");
      lines.push(`    <loc>${url.trim()}</loc>`);
      lines.push(`    <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>`);
      lines.push(`    <priority>${priority}</priority>`);
      lines.push("  </url>");
    });
    lines.push("</urlset>");
    return lines.join("\n");
  };

  const output = generate();

  return (
    <div className="space-y-4">
      <div><label className="mb-1 block text-xs font-medium">URLs (one per line)</label><Textarea value={urls} onChange={(e) => setUrls(e.target.value)} className="min-h-[100px] font-mono text-sm" /></div>
      <div className="flex items-center gap-3"><label className="text-xs font-medium">Priority:</label><Input type="number" step="0.1" min="0" max="1" value={priority} onChange={(e) => setPriority(e.target.value)} className="w-24" /></div>
      <div className="space-y-2">
        <div className="flex items-center justify-between"><label className="text-sm font-medium">sitemap.xml</label><CopyButton text={output} /></div>
        <Textarea value={output} readOnly className="min-h-[200px] font-mono text-xs" />
      </div>
    </div>
  );
}

export function UtmBuilder() {
  const [baseUrl, setBaseUrl] = useState("https://example.com");
  const [source, setSource] = useState("google");
  const [medium, setMedium] = useState("cpc");
  const [campaign, setCampaign] = useState("spring_sale");
  const [term, setTerm] = useState("");
  const [content, setContent] = useState("");

  const buildUrl = () => {
    const params = new URLSearchParams();
    if (source) params.set("utm_source", source);
    if (medium) params.set("utm_medium", medium);
    if (campaign) params.set("utm_campaign", campaign);
    if (term) params.set("utm_term", term);
    if (content) params.set("utm_content", content);
    return `${baseUrl}${baseUrl.includes("?") ? "&" : "?"}${params.toString()}`;
  };

  const result = buildUrl();

  return (
    <div className="space-y-4">
      <div className="grid gap-3">
        <div><label className="mb-1 block text-xs font-medium">Website URL *</label><Input value={baseUrl} onChange={(e) => setBaseUrl(e.target.value)} /></div>
        <div className="grid grid-cols-2 gap-3">
          <div><label className="mb-1 block text-xs font-medium">Source *</label><Input value={source} onChange={(e) => setSource(e.target.value)} placeholder="google" /></div>
          <div><label className="mb-1 block text-xs font-medium">Medium *</label><Input value={medium} onChange={(e) => setMedium(e.target.value)} placeholder="cpc" /></div>
        </div>
        <div><label className="mb-1 block text-xs font-medium">Campaign *</label><Input value={campaign} onChange={(e) => setCampaign(e.target.value)} placeholder="spring_sale" /></div>
        <div className="grid grid-cols-2 gap-3">
          <div><label className="mb-1 block text-xs font-medium">Term</label><Input value={term} onChange={(e) => setTerm(e.target.value)} placeholder="running+shoes" /></div>
          <div><label className="mb-1 block text-xs font-medium">Content</label><Input value={content} onChange={(e) => setContent(e.target.value)} placeholder="banner_ad" /></div>
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between"><label className="text-sm font-medium">Generated URL</label><CopyButton text={result} /></div>
        <div className="break-all rounded-lg bg-muted p-3 text-sm font-mono">{result}</div>
      </div>
    </div>
  );
}
