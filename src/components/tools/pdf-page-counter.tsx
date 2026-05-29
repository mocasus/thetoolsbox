"use client";

import { useState } from "react";
import { FileUpload } from "@/components/ui/file-upload";
import { Button } from "@/components/ui/button";
import { useToastContext } from "@/providers/toast-provider";
import { readFileAsArrayBuffer, formatFileSize } from "@/lib/utils";
import { Trash2, FileText } from "lucide-react";

export function PdfPageCounter() {
  const [file, setFile] = useState<File | null>(null);
  const [info, setInfo] = useState<{ pages: number; size: string } | null>(null);
  const { addToast } = useToastContext();

  const handleFiles = async (files: File[]) => {
    if (!files[0]) return;
    setFile(files[0]);
    try {
      const { PDFDocument } = await import("pdf-lib");
      const bytes = await readFileAsArrayBuffer(files[0]);
      const pdf = await PDFDocument.load(bytes);
      setInfo({ pages: pdf.getPageCount(), size: formatFileSize(files[0].size) });
      addToast(`PDF has ${pdf.getPageCount()} pages`, "success");
    } catch { addToast("Failed to read PDF", "error"); }
  };

  return (
    <div className="space-y-4">
      {!file ? (
        <FileUpload accept=".pdf" onFiles={handleFiles} description="Upload a PDF to count pages" />
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between rounded-lg bg-muted p-3">
            <p className="text-sm font-medium">{file.name}</p>
            <Button variant="ghost" size="icon" onClick={() => { setFile(null); setInfo(null); }}><Trash2 className="h-4 w-4" /></Button>
          </div>
          {info && (
            <div className="flex items-center gap-4 rounded-lg border border-border p-6 text-center">
              <FileText className="h-10 w-10 text-primary" />
              <div className="text-left">
                <p className="text-3xl font-bold text-foreground">{info.pages}</p>
                <p className="text-sm text-muted-foreground">pages • {info.size}</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
