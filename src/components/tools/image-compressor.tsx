"use client";

import { useState } from "react";
import { FileUpload } from "@/components/ui/file-upload";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { useToastContext } from "@/providers/toast-provider";
import { formatFileSize, downloadBlob } from "@/lib/utils";
import { Download, Trash2 } from "lucide-react";

export function ImageCompressor() {
  const [file, setFile] = useState<File | null>(null);
  const [quality, setQuality] = useState("0.7");
  const [result, setResult] = useState<Blob | null>(null);
  const [originalSize, setOriginalSize] = useState(0);
  const [loading, setLoading] = useState(false);
  const { addToast } = useToastContext();

  const handleFiles = (files: File[]) => {
    if (files[0]) {
      setFile(files[0]);
      setOriginalSize(files[0].size);
      setResult(null);
    }
  };

  const compress = async () => {
    if (!file) return;
    setLoading(true);
    try {
      const img = new Image();
      const url = URL.createObjectURL(file);
      img.src = url;
      await new Promise((resolve) => { img.onload = resolve; });

      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0);
      URL.revokeObjectURL(url);

      const blob = await new Promise<Blob>((resolve) => {
        canvas.toBlob((b) => resolve(b!), "image/jpeg", parseFloat(quality));
      });
      setResult(blob);
      addToast(`Compressed: ${formatFileSize(originalSize)} → ${formatFileSize(blob.size)} (${Math.round((1 - blob.size / originalSize) * 100)}% smaller)`, "success");
    } catch {
      addToast("Failed to compress image", "error");
    }
    setLoading(false);
  };

  const clear = () => { setFile(null); setResult(null); };

  return (
    <div className="space-y-4">
      {!file ? (
        <FileUpload accept="image/*" onFiles={handleFiles} description="Supports JPG, PNG, WebP" />
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between rounded-lg bg-muted p-3">
            <div>
              <p className="text-sm font-medium">{file.name}</p>
              <p className="text-xs text-muted-foreground">Original: {formatFileSize(originalSize)}</p>
            </div>
            <Button variant="ghost" size="icon" onClick={clear}><Trash2 className="h-4 w-4" /></Button>
          </div>

          <div className="flex items-center gap-4">
            <label className="text-sm font-medium">Quality:</label>
            <Select
              value={quality}
              onChange={(e) => setQuality(e.target.value)}
              options={[
                { value: "0.9", label: "High (90%)" },
                { value: "0.7", label: "Medium (70%)" },
                { value: "0.5", label: "Low (50%)" },
                { value: "0.3", label: "Very Low (30%)" },
              ]}
            />
          </div>

          <Button onClick={compress} disabled={loading} className="w-full">
            {loading ? "Compressing..." : "Compress Image"}
          </Button>

          {result && (
            <div className="flex items-center justify-between rounded-lg border border-green-500/20 bg-green-500/5 p-3">
              <div>
                <p className="text-sm font-medium text-green-600">Compressed!</p>
                <p className="text-xs text-muted-foreground">
                  New size: {formatFileSize(result.size)} ({Math.round((1 - result.size / originalSize) * 100)}% smaller)
                </p>
              </div>
              <Button size="sm" onClick={() => downloadBlob(result, `compressed-${file.name}`)}>
                <Download className="mr-1 h-3 w-3" /> Download
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
