"use client";

import { useState } from "react";
import { FileUpload } from "@/components/ui/file-upload";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { useToastContext } from "@/providers/toast-provider";
import { downloadBlob } from "@/lib/utils";
import { Download, Trash2 } from "lucide-react";

export function WatermarkImage() {
  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState("The Tools Box");
  const [position, setPosition] = useState("bottom-right");
  const [fontSize, setFontSize] = useState("24");
  const [opacity, setOpacity] = useState("0.5");
  const [result, setResult] = useState<Blob | null>(null);
  const { addToast } = useToastContext();

  const handleFiles = (files: File[]) => { if (files[0]) { setFile(files[0]); setResult(null); } };

  const apply = async () => {
    if (!file || !text.trim()) return;
    try {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      await new Promise((r) => { img.onload = r; });
      const canvas = document.createElement("canvas");
      canvas.width = img.width; canvas.height = img.height;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0);
      ctx.globalAlpha = parseFloat(opacity);
      ctx.font = `${fontSize}px sans-serif`;
      ctx.fillStyle = "#ffffff";
      ctx.strokeStyle = "#000000";
      ctx.lineWidth = 2;

      const metrics = ctx.measureText(text);
      let x = 20, y = img.height - 30;
      if (position === "top-left") { x = 20; y = parseInt(fontSize) + 20; }
      else if (position === "top-right") { x = img.width - metrics.width - 20; y = parseInt(fontSize) + 20; }
      else if (position === "bottom-left") { x = 20; y = img.height - 20; }
      else if (position === "bottom-right") { x = img.width - metrics.width - 20; y = img.height - 20; }
      else if (position === "center") { x = (img.width - metrics.width) / 2; y = img.height / 2; }

      ctx.strokeText(text, x, y);
      ctx.fillText(text, x, y);
      const blob = await new Promise<Blob>((r) => canvas.toBlob((b) => r(b!), "image/png"));
      setResult(blob);
      addToast("Watermark added!", "success");
    } catch { addToast("Failed to apply watermark", "error"); }
  };

  return (
    <div className="space-y-4">
      {!file ? (
        <FileUpload accept="image/*" onFiles={handleFiles} description="Upload an image to watermark" />
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between rounded-lg bg-muted p-3">
            <p className="text-sm font-medium">{file.name}</p>
            <Button variant="ghost" size="icon" onClick={() => { setFile(null); setResult(null); }}><Trash2 className="h-4 w-4" /></Button>
          </div>
          <Input placeholder="Watermark text" value={text} onChange={(e) => setText(e.target.value)} />
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            <div><label className="mb-1 block text-xs text-muted-foreground">Position</label>
              <Select value={position} onChange={(e) => setPosition(e.target.value)} options={[
                { value: "top-left", label: "Top Left" }, { value: "top-right", label: "Top Right" },
                { value: "center", label: "Center" }, { value: "bottom-left", label: "Bottom Left" },
                { value: "bottom-right", label: "Bottom Right" },
              ]} /></div>
            <div><label className="mb-1 block text-xs text-muted-foreground">Font Size</label><Input type="number" value={fontSize} onChange={(e) => setFontSize(e.target.value)} /></div>
            <div><label className="mb-1 block text-xs text-muted-foreground">Opacity</label>
              <Select value={opacity} onChange={(e) => setOpacity(e.target.value)} options={[
                { value: "0.3", label: "30%" }, { value: "0.5", label: "50%" }, { value: "0.7", label: "70%" }, { value: "1", label: "100%" },
              ]} /></div>
          </div>
          <Button onClick={apply} className="w-full">Apply Watermark</Button>
          {result && <Button variant="outline" className="w-full" onClick={() => downloadBlob(result, `watermarked-${file.name}`)}><Download className="mr-1 h-4 w-4" /> Download</Button>}
        </div>
      )}
    </div>
  );
}
