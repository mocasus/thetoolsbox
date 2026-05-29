"use client";

import { useState } from "react";
import { FileUpload } from "@/components/ui/file-upload";
import { Button } from "@/components/ui/button";
import { useToastContext } from "@/providers/toast-provider";
import { downloadBlob } from "@/lib/utils";
import { Download, Trash2 } from "lucide-react";

const IOS_SIZES = [20, 29, 40, 58, 60, 76, 80, 87, 120, 152, 167, 180, 1024];
const ANDROID_SIZES = [36, 48, 72, 96, 144, 192, 512];

export function AppIconGenerator() {
  const [file, setFile] = useState<File | null>(null);
  const [results, setResults] = useState<{ label: string; size: number; blob: Blob }[]>([]);
  const [loading, setLoading] = useState(false);
  const { addToast } = useToastContext();

  const handleFiles = (files: File[]) => { if (files[0]) { setFile(files[0]); setResults([]); } };

  const generate = async () => {
    if (!file) return;
    setLoading(true);
    try {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      await new Promise((r) => { img.onload = r; });
      const generated: { label: string; size: number; blob: Blob }[] = [];

      for (const size of IOS_SIZES) {
        const canvas = document.createElement("canvas");
        canvas.width = size; canvas.height = size;
        canvas.getContext("2d")!.drawImage(img, 0, 0, size, size);
        const blob = await new Promise<Blob>((r) => canvas.toBlob((b) => r(b!), "image/png"));
        generated.push({ label: "iOS", size, blob });
      }
      for (const size of ANDROID_SIZES) {
        const canvas = document.createElement("canvas");
        canvas.width = size; canvas.height = size;
        canvas.getContext("2d")!.drawImage(img, 0, 0, size, size);
        const blob = await new Promise<Blob>((r) => canvas.toBlob((b) => r(b!), "image/png"));
        generated.push({ label: "Android", size, blob });
      }
      setResults(generated);
      addToast(`Generated ${generated.length} app icons!`, "success");
    } catch { addToast("Failed to generate", "error"); }
    setLoading(false);
  };

  return (
    <div className="space-y-4">
      {!file ? (
        <FileUpload accept="image/*" onFiles={handleFiles} description="Upload a square image (1024x1024 recommended)" />
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between rounded-lg bg-muted p-3">
            <p className="text-sm font-medium">{file.name}</p>
            <Button variant="ghost" size="icon" onClick={() => { setFile(null); setResults([]); }}><Trash2 className="h-4 w-4" /></Button>
          </div>
          <Button onClick={generate} disabled={loading} className="w-full">{loading ? "Generating..." : "Generate App Icons"}</Button>
          {results.length > 0 && (
            <div className="space-y-4">
              {["iOS", "Android"].map((platform) => (
                <div key={platform}>
                  <h3 className="mb-2 text-sm font-semibold">{platform} Icons</h3>
                  <div className="flex flex-wrap gap-2">
                    {results.filter((r) => r.label === platform).map(({ size, blob }) => (
                      <Button key={`${platform}-${size}`} variant="outline" size="sm" onClick={() => downloadBlob(blob, `${platform.toLowerCase()}-${size}.png`)}>
                        <Download className="mr-1 h-3 w-3" /> {size}px
                      </Button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
