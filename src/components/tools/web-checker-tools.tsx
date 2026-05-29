"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/ui/copy-button";
import { useToastContext } from "@/providers/toast-provider";
import { Card } from "@/components/ui/card";

export function RedirectChecker() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const { addToast } = useToastContext();

  const check = async () => {
    if (!url.trim()) { addToast("Please enter a URL", "error"); return; }
    setLoading(true);
    try {
      const res = await fetch(`/api/check-redirect?url=${encodeURIComponent(url)}`);
      const data = await res.json();
      setResult(JSON.stringify(data, null, 2));
      addToast("Redirect check complete!", "success");
    } catch {
      setResult("Note: This tool requires server-side API. Run locally to use.");
      addToast("API not available in this mode", "info");
    }
    setLoading(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input placeholder="https://example.com/old-page" value={url} onChange={(e) => setUrl(e.target.value)} className="flex-1" />
        <Button onClick={check} disabled={loading}>{loading ? "Checking..." : "Check"}</Button>
      </div>
      {result && (
        <Card className="p-4">
          <pre className="whitespace-pre-wrap text-sm font-mono text-muted-foreground">{result}</pre>
        </Card>
      )}
      <p className="text-xs text-muted-foreground">This tool requires a server-side API endpoint for checking redirects.</p>
    </div>
  );
}

export function HttpStatusChecker() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const { addToast } = useToastContext();

  const check = async () => {
    if (!url.trim()) { addToast("Please enter a URL", "error"); return; }
    setLoading(true);
    try {
      const res = await fetch(`/api/check-status?url=${encodeURIComponent(url)}`);
      const data = await res.json();
      setResult(JSON.stringify(data, null, 2));
      addToast("Status check complete!", "success");
    } catch {
      setResult("Note: This tool requires server-side API. Run locally to use.");
      addToast("API not available in this mode", "info");
    }
    setLoading(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input placeholder="https://example.com" value={url} onChange={(e) => setUrl(e.target.value)} className="flex-1" />
        <Button onClick={check} disabled={loading}>{loading ? "Checking..." : "Check"}</Button>
      </div>
      {result && (
        <Card className="p-4">
          <pre className="whitespace-pre-wrap text-sm font-mono text-muted-foreground">{result}</pre>
        </Card>
      )}
      <p className="text-xs text-muted-foreground">This tool requires a server-side API endpoint.</p>
    </div>
  );
}

export function UrlSlugChecker() {
  const [url, setUrl] = useState("");

  const analyze = () => {
    const slug = url.split("/").pop() || "";
    const issues: string[] = [];
    if (slug.length > 60) issues.push("Too long (>60 chars)");
    if (/[A-Z]/.test(slug)) issues.push("Contains uppercase letters");
    if (/[_]/.test(slug)) issues.push("Contains underscores (use hyphens)");
    if (/[^a-z0-9-]/.test(slug) && slug) issues.push("Contains special characters");
    if (/--/.test(slug)) issues.push("Contains consecutive hyphens");
    if (slug.startsWith("-") || slug.endsWith("-")) issues.push("Starts/ends with hyphen");
    return { slug, issues, length: slug.length };
  };

  const result = analyze();

  return (
    <div className="space-y-4">
      <div>
        <label className="mb-1.5 block text-sm font-medium">Enter URL or Slug</label>
        <Input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://example.com/my-page-slug" />
      </div>
      {url && (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Slug:</span>
            <code className="rounded bg-muted px-2 py-1 text-sm">{result.slug || "(empty)"}</code>
            {result.slug && <CopyButton text={result.slug} />}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm">Length: {result.length} chars</span>
            <span className={`text-xs ${result.length <= 60 ? "text-green-500" : "text-red-500"}`}>
              {result.length <= 60 ? "✓ Good" : "✗ Too long"}
            </span>
          </div>
          {result.issues.length === 0 ? (
            <p className="text-sm text-green-500">✓ No issues found. Slug looks good!</p>
          ) : (
            <div className="space-y-1">
              <p className="text-sm font-medium text-red-500">Issues found:</p>
              {result.issues.map((issue) => (
                <p key={issue} className="text-sm text-muted-foreground">• {issue}</p>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export function LinkPreviewChecker() {
  const [url, setUrl] = useState("");
  const { addToast } = useToastContext();

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input placeholder="https://example.com" value={url} onChange={(e) => setUrl(e.target.value)} className="flex-1" />
        <Button onClick={() => addToast("This tool requires server-side fetching of meta tags", "info")}>Check</Button>
      </div>
      <p className="text-xs text-muted-foreground">This tool fetches and parses Open Graph meta tags from the given URL to preview how it appears on social media. Requires server-side API.</p>
      {url && (
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Enter a URL and click Check to see how it appears when shared on social media platforms.</p>
        </Card>
      )}
    </div>
  );
}
