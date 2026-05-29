"use client";

import { useState } from "react";
import { FileUpload } from "@/components/ui/file-upload";
import { Button } from "@/components/ui/button";
import { useToastContext } from "@/providers/toast-provider";
import { readFileAsArrayBuffer } from "@/lib/utils";
import { Trash2 } from "lucide-react";

export function PdfToImages() {
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const { addToast } = useToastContext();

  const handleFiles = async (files: File[]) => {
    if (!files[0]) return;
    setFile(files[0]);
    try {
      const { PDFDocument } = await import("pdf-lib");
      const bytes = await readFileAsArrayBuffer(files[0]);
      const pdf = await PDFDocument.load(bytes);
      setPageCount(pdf.getPageCount());
      addToast(`PDF loaded: ${pdf.getPageCount()} pages`, "info");
    } catch { addToast("Failed to read PDF", "error"); }
  };

  return (
    <div className="space-y-4">
      {!file ? (
        <FileUpload accept=".pdf" onFiles={handleFiles} description="Upload a PDF to extract pages as images" />
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between rounded-lg bg-muted p-3">
            <div>
              <p className="text-sm font-medium">{file.name}</p>
              <p className="text-xs text-muted-foreground">{pageCount} pages detected</p>
            </div>
            <Button variant="ghost" size="icon" onClick={() => { setFile(null); setPageCount(0); }}><Trash2 className="h-4 w-4" /></Button>
          </div>
          <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-3">
            <p className="text-sm text-amber-600">Note: Full PDF-to-image rendering requires a PDF renderer. This tool shows page count and metadata. For full rendering, consider using a desktop tool.</p>
          </div>
        </div>
      )}
    </div>
  );
}
