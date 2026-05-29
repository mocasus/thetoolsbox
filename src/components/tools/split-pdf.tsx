"use client";

import { useState } from "react";
import { FileUpload } from "@/components/ui/file-upload";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToastContext } from "@/providers/toast-provider";
import { downloadBlob, readFileAsArrayBuffer } from "@/lib/utils";
import { Download, Trash2 } from "lucide-react";

export function SplitPdf() {
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [range, setRange] = useState("1-3");
  const [result, setResult] = useState<Blob | null>(null);
  const [loading, setLoading] = useState(false);
  const { addToast } = useToastContext();

  const handleFiles = async (files: File[]) => {
    if (!files[0]) return;
    setFile(files[0]);
    setResult(null);
    const { PDFDocument } = await import("pdf-lib");
    const bytes = await readFileAsArrayBuffer(files[0]);
    const pdf = await PDFDocument.load(bytes);
    setPageCount(pdf.getPageCount());
  };

  const split = async () => {
    if (!file) return;
    setLoading(true);
    try {
      const { PDFDocument } = await import("pdf-lib");
      const bytes = await readFileAsArrayBuffer(file);
      const sourcePdf = await PDFDocument.load(bytes);
      const newPdf = await PDFDocument.create();

      const pages = parseRange(range, sourcePdf.getPageCount());
      const copied = await newPdf.copyPages(sourcePdf, pages.map((p) => p - 1));
      copied.forEach((page) => newPdf.addPage(page));

      const pdfBytes = await newPdf.save();
      const blob = new Blob([pdfBytes as unknown as BlobPart], { type: "application/pdf" });
      setResult(blob);
      addToast(`Extracted ${pages.length} page(s)!`, "success");
    } catch { addToast("Failed to split PDF", "error"); }
    setLoading(false);
  };

  return (
    <div className="space-y-4">
      {!file ? (
        <FileUpload accept=".pdf" onFiles={handleFiles} description="Upload a PDF to split" />
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between rounded-lg bg-muted p-3">
            <div>
              <p className="text-sm font-medium">{file.name}</p>
              <p className="text-xs text-muted-foreground">{pageCount} pages</p>
            </div>
            <Button variant="ghost" size="icon" onClick={() => { setFile(null); setResult(null); }}><Trash2 className="h-4 w-4" /></Button>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium">Page Range</label>
            <Input placeholder="e.g. 1-3, 5, 7-9" value={range} onChange={(e) => setRange(e.target.value)} />
            <p className="mt-1 text-xs text-muted-foreground">Use commas and ranges (1-3, 5, 7-9)</p>
          </div>
          <Button onClick={split} disabled={loading} className="w-full">{loading ? "Splitting..." : "Extract Pages"}</Button>
          {result && <Button variant="outline" className="w-full" onClick={() => downloadBlob(result, "split.pdf")}><Download className="mr-1 h-4 w-4" /> Download</Button>}
        </div>
      )}
    </div>
  );
}

function parseRange(range: string, max: number): number[] {
  const pages: number[] = [];
  range.split(",").forEach((part) => {
    const trimmed = part.trim();
    if (trimmed.includes("-")) {
      const [start, end] = trimmed.split("-").map(Number);
      for (let i = start; i <= Math.min(end, max); i++) pages.push(i);
    } else {
      const n = parseInt(trimmed);
      if (n >= 1 && n <= max) pages.push(n);
    }
  });
  return [...new Set(pages)].sort((a, b) => a - b);
}
