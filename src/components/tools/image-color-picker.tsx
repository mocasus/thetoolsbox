"use client";

import { useState, useRef } from "react";
import { FileUpload } from "@/components/ui/file-upload";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/ui/copy-button";
import { Trash2 } from "lucide-react";

export function ImageColorPicker() {
  const [preview, setPreview] = useState("");
  const [color, setColor] = useState<{ hex: string; rgb: string; hsl: string } | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  const handleFiles = (files: File[]) => {
    if (files[0]) {
      const url = URL.createObjectURL(files[0]);
      setPreview(url);
      setColor(null);
    }
  };

  const handleImageLoad = () => {
    if (!imgRef.current || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const img = imgRef.current;
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext("2d")!;
    ctx.drawImage(img, 0, 0);
  };

  const handleClick = (e: React.MouseEvent<HTMLImageElement>) => {
    if (!canvasRef.current || !imgRef.current) return;
    const rect = imgRef.current.getBoundingClientRect();
    const scaleX = imgRef.current.naturalWidth / rect.width;
    const scaleY = imgRef.current.naturalHeight / rect.height;
    const x = Math.floor((e.clientX - rect.left) * scaleX);
    const y = Math.floor((e.clientY - rect.top) * scaleY);
    const ctx = canvasRef.current.getContext("2d")!;
    const [r, g, b] = ctx.getImageData(x, y, 1, 1).data;
    const hex = `#${[r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("")}`;
    const rgb = `rgb(${r}, ${g}, ${b})`;
    const h = rgbToHsl(r, g, b);
    setColor({ hex, rgb, hsl: h });
  };

  return (
    <div className="space-y-4">
      {!preview ? (
        <FileUpload accept="image/*" onFiles={handleFiles} description="Upload an image to pick colors" />
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Click anywhere on the image to pick a color</p>
            <Button variant="ghost" size="icon" onClick={() => { setPreview(""); setColor(null); }}><Trash2 className="h-4 w-4" /></Button>
          </div>
          <div className="relative cursor-crosshair overflow-hidden rounded-lg border border-border">
            <img ref={imgRef} src={preview} alt="Source" className="max-h-80 w-full object-contain" onLoad={handleImageLoad} onClick={handleClick} />
          </div>
          <canvas ref={canvasRef} className="hidden" />
          {color && (
            <div className="flex items-center gap-4 rounded-lg bg-muted p-4">
              <div className="h-12 w-12 rounded-lg border border-border" style={{ backgroundColor: color.hex }} />
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2"><span className="text-sm font-mono">{color.hex}</span><CopyButton text={color.hex} /></div>
                <div className="flex items-center gap-2"><span className="text-sm font-mono">{color.rgb}</span><CopyButton text={color.rgb} /></div>
                <div className="flex items-center gap-2"><span className="text-sm font-mono">{color.hsl}</span><CopyButton text={color.hsl} /></div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function rgbToHsl(r: number, g: number, b: number): string {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }
  return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
}
