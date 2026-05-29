"use client";

import { useState, useRef } from "react";
import { FileUpload } from "@/components/ui/file-upload";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToastContext } from "@/providers/toast-provider";
import { downloadBlob } from "@/lib/utils";
import { Download, Trash2 } from "lucide-react";

export function ImageCropper() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [cropX, setCropX] = useState("0");
  const [cropY, setCropY] = useState("0");
  const [cropW, setCropW] = useState("200");
  const [cropH, setCropH] = useState("200");
  const [result, setResult] = useState<Blob | null>(null);
  const { addToast } = useToastContext();

  const handleFiles = (files: File[]) => {
    if (files[0]) {
      setFile(files[0]);
      setResult(null);
      setPreview(URL.createObjectURL(files[0]));
    }
  };

  const crop = async () => {
    if (!file) return;
    try {
      const img = new Image();
      img.src = preview;
      await new Promise((r) => { img.onload = r; });
      const canvas = document.createElement("canvas");
      const w = parseInt(cropW), h = parseInt(cropH);
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, parseInt(cropX), parseInt(cropY), w, h, 0, 0, w, h);
      const blob = await new Promise<Blob>((r) => canvas.toBlob((b) => r(b!), "image/png"));
      setResult(blob);
      addToast("Image cropped successfully!", "success");
    } catch { addToast("Failed to crop", "error"); }
  };

  return (
    <div className="space-y-4">
      {!file ? (
        <FileUpload accept="image/*" onFiles={handleFiles} description="Upload an image to crop" />
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between rounded-lg bg-muted p-3">
            <p className="text-sm font-medium">{file.name}</p>
            <Button variant="ghost" size="icon" onClick={() => { setFile(null); setResult(null); }}><Trash2 className="h-4 w-4" /></Button>
          </div>
          {preview && <img src={preview} alt="Preview" className="max-h-48 rounded-lg object-contain" />}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div><label className="mb-1 block text-xs text-muted-foreground">X</label><Input type="number" value={cropX} onChange={(e) => setCropX(e.target.value)} /></div>
            <div><label className="mb-1 block text-xs text-muted-foreground">Y</label><Input type="number" value={cropY} onChange={(e) => setCropY(e.target.value)} /></div>
            <div><label className="mb-1 block text-xs text-muted-foreground">Width</label><Input type="number" value={cropW} onChange={(e) => setCropW(e.target.value)} /></div>
            <div><label className="mb-1 block text-xs text-muted-foreground">Height</label><Input type="number" value={cropH} onChange={(e) => setCropH(e.target.value)} /></div>
          </div>
          <Button onClick={crop} className="w-full">Crop Image</Button>
          {result && (
            <Button variant="outline" className="w-full" onClick={() => downloadBlob(result, `cropped-${file.name}`)}>
              <Download className="mr-1 h-4 w-4" /> Download Cropped Image
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
