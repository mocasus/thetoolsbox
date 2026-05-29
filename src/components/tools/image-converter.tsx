"use client";

import { useState } from "react";
import { FileUpload } from "@/components/ui/file-upload";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { useToastContext } from "@/providers/toast-provider";
import { downloadBlob } from "@/lib/utils";
import { Download, Trash2 } from "lucide-react";

interface ImageConverterProps {
  fromFormat: string;
  toFormat: string;
  mimeType: string;
  extension: string;
}

export function ImageConverter({ fromFormat, toFormat, mimeType, extension }: ImageConverterProps) {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<Blob | null>(null);
  const [loading, setLoading] = useState(false);
  const [quality, setQuality] = useState("0.9");
  const { addToast } = useToastContext();

  const handleFiles = (files: File[]) => {
    if (files[0]) { setFile(files[0]); setResult(null); }
  };

  const convert = async () => {
    if (!file) return;
    setLoading(true);
    try {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      await new Promise((r) => { img.onload = r; });
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d")!;
      if (mimeType === "image/jpeg") {
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      ctx.drawImage(img, 0, 0);
      const blob = await new Promise<Blob>((r) => canvas.toBlob((b) => r(b!), mimeType, parseFloat(quality)));
      setResult(blob);
      addToast(`Converted to ${toFormat} successfully!`, "success");
    } catch { addToast("Conversion failed", "error"); }
    setLoading(false);
  };

  return (
    <div className="space-y-4">
      {!file ? (
        <FileUpload accept="image/*" onFiles={handleFiles} description={`Upload a ${fromFormat} image`} />
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between rounded-lg bg-muted p-3">
            <p className="text-sm font-medium">{file.name}</p>
            <Button variant="ghost" size="icon" onClick={() => { setFile(null); setResult(null); }}><Trash2 className="h-4 w-4" /></Button>
          </div>
          {mimeType === "image/jpeg" && (
            <div className="flex items-center gap-3">
              <label className="text-sm">Quality:</label>
              <Select value={quality} onChange={(e) => setQuality(e.target.value)} options={[
                { value: "1.0", label: "Maximum" },
                { value: "0.9", label: "High" },
                { value: "0.7", label: "Medium" },
                { value: "0.5", label: "Low" },
              ]} />
            </div>
          )}
          <Button onClick={convert} disabled={loading} className="w-full">
            {loading ? "Converting..." : `Convert to ${toFormat}`}
          </Button>
          {result && (
            <Button variant="outline" className="w-full" onClick={() => downloadBlob(result, `${file.name.split('.')[0]}.${extension}`)}>
              <Download className="mr-1 h-4 w-4" /> Download {toFormat}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

export function JpgToPng() { return <ImageConverter fromFormat="JPG" toFormat="PNG" mimeType="image/png" extension="png" />; }
export function PngToJpg() { return <ImageConverter fromFormat="PNG" toFormat="JPG" mimeType="image/jpeg" extension="jpg" />; }
export function PngToWebp() { return <ImageConverter fromFormat="PNG" toFormat="WebP" mimeType="image/webp" extension="webp" />; }
export function WebpToPng() { return <ImageConverter fromFormat="WebP" toFormat="PNG" mimeType="image/png" extension="png" />; }
