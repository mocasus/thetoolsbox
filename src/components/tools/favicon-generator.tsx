"use client";

import { useState } from "react";
import { FileUpload } from "@/components/ui/file-upload";
import { Button } from "@/components/ui/button";
import { useToastContext } from "@/providers/toast-provider";
import { downloadBlob } from "@/lib/utils";
import { Download, Trash2 } from "lucide-react";

const SIZES = [16, 32, 48, 64, 128, 180, 192, 512];

export function FaviconGenerator() {
  const [file, setFile] = useState<File | null>(null);
  const [results, setResults] = useState<{ size: number; blob: Blob }[]>([]);
  const [loading, setLoading] = useState(false);
  const { addToast } = useToastContext();

  const handleFiles = (files: File[]) => {
    if (files[0]) { setFile(files[0]); setResults([]); }
  };

  const generate = async () => {
    if (!file) return;
    setLoading(true);
    try {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      await new Promise((r) => { img.onload = r; });

      const generated: { size: number; blob: Blob }[] = [];
      for (const size of SIZES) {
        const canvas = document.createElement("canvas");
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext("2d")!;
        ctx.drawImage(img, 0, 0, size, size);
        const blob = await new Promise<Blob>((r) => canvas.toBlob((b) => r(b!), "image/png"));
        generated.push({ size, blob });
      }
      setResults(generated);
      addToast(`Generated ${SIZES.length} favicon sizes!`, "success");
    } catch { addToast("Failed to generate favicons", "error"); }
    setLoading(false);
  };

  return (
    <div className="space-y-4">
      {!file ? (
        <FileUpload accept="image/*" onFiles={handleFiles} description="Upload a square image (recommended 512x512 or larger)" />
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between rounded-lg bg-muted p-3">
            <p className="text-sm font-medium">{file.name}</p>
            <Button variant="ghost" size="icon" onClick={() => { setFile(null); setResults([]); }}><Trash2 className="h-4 w-4" /></Button>
          </div>
          <Button onClick={generate} disabled={loading} className="w-full">{loading ? "Generating..." : "Generate Favicons"}</Button>
          {results.length > 0 && (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {results.map(({ size, blob }) => (
                <div key={size} className="flex flex-col items-center gap-2 rounded-lg border border-border p-3">
                  <img src={URL.createObjectURL(blob)} alt={`${size}x${size}`} className="rounded" style={{ width: Math.min(size, 64), height: Math.min(size, 64) }} />
                  <p className="text-xs text-muted-foreground">{size}x{size}</p>
                  <Button variant="ghost" size="sm" onClick={() => downloadBlob(blob, `favicon-${size}x${size}.png`)}><Download className="h-3 w-3" /></Button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
