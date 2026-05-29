"use client";

import { useState } from "react";
import { FileUpload } from "@/components/ui/file-upload";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToastContext } from "@/providers/toast-provider";
import { downloadBlob } from "@/lib/utils";
import { Download, Trash2 } from "lucide-react";

export function ImageResizer() {
  const [file, setFile] = useState<File | null>(null);
  const [width, setWidth] = useState("800");
  const [height, setHeight] = useState("600");
  const [keepAspect, setKeepAspect] = useState(true);
  const [originalDim, setOriginalDim] = useState({ w: 0, h: 0 });
  const [result, setResult] = useState<Blob | null>(null);
  const [loading, setLoading] = useState(false);
  const { addToast } = useToastContext();

  const handleFiles = (files: File[]) => {
    if (files[0]) {
      setFile(files[0]);
      setResult(null);
      const img = new Image();
      img.onload = () => {
        setOriginalDim({ w: img.width, h: img.height });
        setWidth(String(img.width));
        setHeight(String(img.height));
      };
      img.src = URL.createObjectURL(files[0]);
    }
  };

  const handleWidthChange = (val: string) => {
    setWidth(val);
    if (keepAspect && originalDim.w > 0) {
      const ratio = originalDim.h / originalDim.w;
      setHeight(String(Math.round(parseInt(val || "0") * ratio)));
    }
  };

  const resize = async () => {
    if (!file) return;
    setLoading(true);
    try {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      await new Promise((r) => { img.onload = r; });
      const canvas = document.createElement("canvas");
      canvas.width = parseInt(width);
      canvas.height = parseInt(height);
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      const blob = await new Promise<Blob>((r) => canvas.toBlob((b) => r(b!), "image/png"));
      setResult(blob);
      addToast(`Resized to ${width}x${height}`, "success");
    } catch { addToast("Failed to resize", "error"); }
    setLoading(false);
  };

  return (
    <div className="space-y-4">
      {!file ? (
        <FileUpload accept="image/*" onFiles={handleFiles} description="Upload an image to resize" />
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between rounded-lg bg-muted p-3">
            <p className="text-sm font-medium">{file.name} ({originalDim.w}x{originalDim.h})</p>
            <Button variant="ghost" size="icon" onClick={() => { setFile(null); setResult(null); }}><Trash2 className="h-4 w-4" /></Button>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <label className="mb-1 block text-xs text-muted-foreground">Width (px)</label>
              <Input type="number" value={width} onChange={(e) => handleWidthChange(e.target.value)} />
            </div>
            <span className="mt-5 text-muted-foreground">×</span>
            <div className="flex-1">
              <label className="mb-1 block text-xs text-muted-foreground">Height (px)</label>
              <Input type="number" value={height} onChange={(e) => setHeight(e.target.value)} />
            </div>
          </div>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={keepAspect} onChange={(e) => setKeepAspect(e.target.checked)} className="rounded" />
            Keep aspect ratio
          </label>
          <Button onClick={resize} disabled={loading} className="w-full">{loading ? "Resizing..." : "Resize Image"}</Button>
          {result && (
            <Button variant="outline" className="w-full" onClick={() => downloadBlob(result, `resized-${file.name}`)}>
              <Download className="mr-1 h-4 w-4" /> Download Resized Image
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
