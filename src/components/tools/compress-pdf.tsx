"use client";

import { useState } from "react";
import { FileUpload } from "@/components/ui/file-upload";
import { Button } from "@/components/ui/button";
import { useToastContext } from "@/providers/toast-provider";
import { downloadBlob, readFileAsArrayBuffer, formatFileSize } from "@/lib/utils";
import { Download, Trash2 } from "lucide-react";

export function CompressPdf() {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<Blob | null>(null);
  const [loading, setLoading] = useState(false);
  const { addToast } = useToastContext();

  const handleFiles = (files: File[]) => { if (files[0]) { setFile(files[0]); setResult(null); } };

  const compress = async () => {
    if (!file) return;
    setLoading(true);
    try {
      const { PDFDocument } = await import("pdf-lib");
      const bytes = await readFileAsArrayBuffer(file);
      const pdf = await PDFDocument.load(bytes);
      // Basic compression: re-save without unused objects
      const pdfBytes = await pdf.save({ useObjectStreams: true });
      const blob = new Blob([pdfBytes as unknown as BlobPart], { type: "application/pdf" });
      setResult(blob);
      const reduction = Math.round((1 - blob.size / file.size) * 100);
      addToast(`Compressed: ${formatFileSize(file.size)} → ${formatFileSize(blob.size)} (${reduction > 0 ? reduction : 0}% smaller)`, "success");
    } catch { addToast("Failed to compress PDF", "error"); }
    setLoading(false);
  };

  return (
    <div className="space-y-4">
      {!file ? (
        <FileUpload accept=".pdf" onFiles={handleFiles} description="Upload a PDF to compress" />
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between rounded-lg bg-muted p-3">
            <div>
              <p className="text-sm font-medium">{file.name}</p>
              <p className="text-xs text-muted-foreground">Size: {formatFileSize(file.size)}</p>
            </div>
            <Button variant="ghost" size="icon" onClick={() => { setFile(null); setResult(null); }}><Trash2 className="h-4 w-4" /></Button>
          </div>
          <Button onClick={compress} disabled={loading} className="w-full">{loading ? "Compressing..." : "Compress PDF"}</Button>
          {result && (
            <div className="space-y-2">
              <p className="text-sm text-green-600">Compressed: {formatFileSize(result.size)}</p>
              <Button variant="outline" className="w-full" onClick={() => downloadBlob(result, `compressed-${file.name}`)}><Download className="mr-1 h-4 w-4" /> Download</Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
