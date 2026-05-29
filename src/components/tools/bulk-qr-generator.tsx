"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToastContext } from "@/providers/toast-provider";
import { Download } from "lucide-react";

export function BulkQrGenerator() {
  const [input, setInput] = useState("");
  const [results, setResults] = useState<{ text: string; dataUrl: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const { addToast } = useToastContext();

  const generate = async () => {
    const lines = input.split("\n").map((l) => l.trim()).filter(Boolean);
    if (lines.length === 0) { addToast("Please enter at least one line", "error"); return; }
    setLoading(true);
    try {
      const QRCode = (await import("qrcode")).default;
      const generated: { text: string; dataUrl: string }[] = [];
      for (const line of lines) {
        const url = await QRCode.toDataURL(line, { width: 200, margin: 2 });
        generated.push({ text: line, dataUrl: url });
      }
      setResults(generated);
      addToast(`Generated ${generated.length} QR codes!`, "success");
    } catch { addToast("Failed to generate", "error"); }
    setLoading(false);
  };

  const downloadAll = () => {
    results.forEach((r, i) => {
      const a = document.createElement("a");
      a.href = r.dataUrl;
      a.download = `qr-${i + 1}.png`;
      a.click();
    });
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="mb-1.5 block text-sm font-medium">Enter one URL/text per line</label>
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={"https://example.com\nhttps://google.com\nHello World"}
          className="min-h-[150px] font-mono text-sm"
        />
      </div>
      <Button onClick={generate} disabled={loading} className="w-full">{loading ? "Generating..." : "Generate All QR Codes"}</Button>
      {results.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">{results.length} QR codes generated</p>
            <Button variant="outline" size="sm" onClick={downloadAll}><Download className="mr-1 h-3 w-3" /> Download All</Button>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {results.map((r, i) => (
              <div key={i} className="flex flex-col items-center gap-2 rounded-lg border border-border p-3">
                <img src={r.dataUrl} alt={r.text} className="w-full rounded" />
                <p className="truncate text-[10px] text-muted-foreground max-w-full">{r.text}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
