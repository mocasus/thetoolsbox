"use client";

import { useState } from "react";
import { FileUpload } from "@/components/ui/file-upload";
import { Button } from "@/components/ui/button";
import { useToastContext } from "@/providers/toast-provider";
import { readFileAsArrayBuffer } from "@/lib/utils";
import { Trash2 } from "lucide-react";

export function PdfMetadataViewer() {
  const [file, setFile] = useState<File | null>(null);
  const [metadata, setMetadata] = useState<Record<string, string>>({});
  const { addToast } = useToastContext();

  const handleFiles = async (files: File[]) => {
    if (!files[0]) return;
    setFile(files[0]);
    try {
      const { PDFDocument } = await import("pdf-lib");
      const bytes = await readFileAsArrayBuffer(files[0]);
      const pdf = await PDFDocument.load(bytes);
      setMetadata({
        Title: pdf.getTitle() || "N/A",
        Author: pdf.getAuthor() || "N/A",
        Subject: pdf.getSubject() || "N/A",
        Creator: pdf.getCreator() || "N/A",
        Producer: pdf.getProducer() || "N/A",
        "Creation Date": pdf.getCreationDate()?.toISOString() || "N/A",
        "Modification Date": pdf.getModificationDate()?.toISOString() || "N/A",
        "Page Count": String(pdf.getPageCount()),
      });
      addToast("Metadata loaded!", "success");
    } catch { addToast("Failed to read metadata", "error"); }
  };

  return (
    <div className="space-y-4">
      {!file ? (
        <FileUpload accept=".pdf" onFiles={handleFiles} description="Upload a PDF to view metadata" />
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between rounded-lg bg-muted p-3">
            <p className="text-sm font-medium">{file.name}</p>
            <Button variant="ghost" size="icon" onClick={() => { setFile(null); setMetadata({}); }}><Trash2 className="h-4 w-4" /></Button>
          </div>
          <div className="rounded-lg border border-border">
            <table className="w-full text-sm">
              <tbody>
                {Object.entries(metadata).map(([key, val]) => (
                  <tr key={key} className="border-t border-border first:border-0">
                    <td className="px-4 py-2 font-medium text-foreground">{key}</td>
                    <td className="px-4 py-2 text-muted-foreground">{val}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
