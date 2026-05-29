"use client";

import { useState } from "react";
import { FileUpload } from "@/components/ui/file-upload";
import { Button } from "@/components/ui/button";
import { useToastContext } from "@/providers/toast-provider";
import { downloadBlob, readFileAsArrayBuffer } from "@/lib/utils";
import { Download, Trash2 } from "lucide-react";

export function ImagesToPdf() {
  const [files, setFiles] = useState<File[]>([]);
  const [result, setResult] = useState<Blob | null>(null);
  const [loading, setLoading] = useState(false);
  const { addToast } = useToastContext();

  const handleFiles = (newFiles: File[]) => { setFiles((prev) => [...prev, ...newFiles]); setResult(null); };

  const convert = async () => {
    if (files.length === 0) return;
    setLoading(true);
    try {
      const { PDFDocument } = await import("pdf-lib");
      const pdfDoc = await PDFDocument.create();
      for (const file of files) {
        const bytes = await readFileAsArrayBuffer(file);
        let image;
        if (file.type === "image/png") image = await pdfDoc.embedPng(bytes);
        else image = await pdfDoc.embedJpg(bytes);
        const page = pdfDoc.addPage([image.width, image.height]);
        page.drawImage(image, { x: 0, y: 0, width: image.width, height: image.height });
      }
      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes as unknown as BlobPart], { type: "application/pdf" });
      setResult(blob);
      addToast(`Created PDF with ${files.length} page(s)!`, "success");
    } catch { addToast("Failed to create PDF", "error"); }
    setLoading(false);
  };

  return (
    <div className="space-y-4">
      <FileUpload accept="image/png,image/jpeg" multiple onFiles={handleFiles} description="Upload images (JPG, PNG)" />
      {files.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">{files.length} image(s)</p>
            <Button variant="ghost" size="sm" onClick={() => { setFiles([]); setResult(null); }}><Trash2 className="mr-1 h-3 w-3" /> Clear</Button>
          </div>
          <Button onClick={convert} disabled={loading} className="w-full">{loading ? "Creating..." : "Convert to PDF"}</Button>
          {result && <Button variant="outline" className="w-full" onClick={() => downloadBlob(result, "images.pdf")}><Download className="mr-1 h-4 w-4" /> Download PDF</Button>}
        </div>
      )}
    </div>
  );
}
