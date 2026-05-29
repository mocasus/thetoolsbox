"use client";

import { useState } from "react";
import { FileUpload } from "@/components/ui/file-upload";
import { Button } from "@/components/ui/button";
import { useToastContext } from "@/providers/toast-provider";
import { downloadBlob, readFileAsArrayBuffer } from "@/lib/utils";
import { Download, Trash2 } from "lucide-react";

export function MergePdf() {
  const [files, setFiles] = useState<File[]>([]);
  const [result, setResult] = useState<Blob | null>(null);
  const [loading, setLoading] = useState(false);
  const { addToast } = useToastContext();

  const handleFiles = (newFiles: File[]) => {
    setFiles((prev) => [...prev, ...newFiles]);
    setResult(null);
  };

  const merge = async () => {
    if (files.length < 2) { addToast("Please add at least 2 PDF files", "error"); return; }
    setLoading(true);
    try {
      const { PDFDocument } = await import("pdf-lib");
      const merged = await PDFDocument.create();
      for (const file of files) {
        const bytes = await readFileAsArrayBuffer(file);
        const pdf = await PDFDocument.load(bytes);
        const pages = await merged.copyPages(pdf, pdf.getPageIndices());
        pages.forEach((page) => merged.addPage(page));
      }
      const pdfBytes = await merged.save();
      const blob = new Blob([pdfBytes as unknown as BlobPart], { type: "application/pdf" });
      setResult(blob);
      addToast(`Merged ${files.length} PDFs successfully!`, "success");
    } catch { addToast("Failed to merge PDFs", "error"); }
    setLoading(false);
  };

  return (
    <div className="space-y-4">
      <FileUpload accept=".pdf" multiple onFiles={handleFiles} description="Upload 2 or more PDF files to merge" />
      {files.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">{files.length} PDF(s) selected</p>
            <Button variant="ghost" size="sm" onClick={() => { setFiles([]); setResult(null); }}><Trash2 className="mr-1 h-3 w-3" /> Clear</Button>
          </div>
          <div className="space-y-1 rounded-lg bg-muted p-3">
            {files.map((f, i) => (
              <p key={i} className="text-xs text-muted-foreground">{i + 1}. {f.name}</p>
            ))}
          </div>
          <Button onClick={merge} disabled={loading} className="w-full">{loading ? "Merging..." : "Merge PDFs"}</Button>
          {result && <Button variant="outline" className="w-full" onClick={() => downloadBlob(result, "merged.pdf")}><Download className="mr-1 h-4 w-4" /> Download Merged PDF</Button>}
        </div>
      )}
    </div>
  );
}
