"use client";

import { useState } from "react";
import { FileUpload } from "@/components/ui/file-upload";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToastContext } from "@/providers/toast-provider";
import { downloadBlob, readFileAsArrayBuffer } from "@/lib/utils";
import { Download, Trash2 } from "lucide-react";

export function RemovePdfPages() {
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [pagesToRemove, setPagesToRemove] = useState("");
  const [result, setResult] = useState<Blob | null>(null);
  const [loading, setLoading] = useState(false);
  const { addToast } = useToastContext();

  const handleFiles = async (files: File[]) => {
    if (!files[0]) return;
    setFile(files[0]); setResult(null);
    const { PDFDocument } = await import("pdf-lib");
    const bytes = await readFileAsArrayBuffer(files[0]);
    const pdf = await PDFDocument.load(bytes);
    setPageCount(pdf.getPageCount());
  };

  const remove = async () => {
    if (!file) return;
    setLoading(true);
    try {
      const { PDFDocument } = await import("pdf-lib");
      const bytes = await readFileAsArrayBuffer(file);
      const sourcePdf = await PDFDocument.load(bytes);
      const removeSet = new Set(pagesToRemove.split(",").map((s) => parseInt(s.trim())).filter((n) => !isNaN(n)));
      const keepIndices = sourcePdf.getPageIndices().filter((i) => !removeSet.has(i + 1));

      const newPdf = await PDFDocument.create();
      const pages = await newPdf.copyPages(sourcePdf, keepIndices);
      pages.forEach((p) => newPdf.addPage(p));
      const pdfBytes = await newPdf.save();
      const blob = new Blob([pdfBytes as unknown as BlobPart], { type: "application/pdf" });
      setResult(blob);
      addToast(`Removed ${removeSet.size} page(s), ${keepIndices.length} remaining`, "success");
    } catch { addToast("Failed to remove pages", "error"); }
    setLoading(false);
  };

  return (
    <div className="space-y-4">
      {!file ? (
        <FileUpload accept=".pdf" onFiles={handleFiles} description="Upload a PDF" />
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between rounded-lg bg-muted p-3">
            <div><p className="text-sm font-medium">{file.name}</p><p className="text-xs text-muted-foreground">{pageCount} pages</p></div>
            <Button variant="ghost" size="icon" onClick={() => { setFile(null); setResult(null); }}><Trash2 className="h-4 w-4" /></Button>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium">Pages to Remove</label>
            <Input placeholder="e.g. 1, 3, 5" value={pagesToRemove} onChange={(e) => setPagesToRemove(e.target.value)} />
            <p className="mt-1 text-xs text-muted-foreground">Comma-separated page numbers</p>
          </div>
          <Button onClick={remove} disabled={loading} className="w-full">{loading ? "Removing..." : "Remove Pages"}</Button>
          {result && <Button variant="outline" className="w-full" onClick={() => downloadBlob(result, `cleaned-${file.name}`)}><Download className="mr-1 h-4 w-4" /> Download</Button>}
        </div>
      )}
    </div>
  );
}
