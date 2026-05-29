"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToastContext } from "@/providers/toast-provider";
import { downloadBlob } from "@/lib/utils";
import { Download, Trash2 } from "lucide-react";

export function TextToPdf() {
  const [text, setText] = useState("");
  const [title, setTitle] = useState("Document");
  const [result, setResult] = useState<Blob | null>(null);
  const [loading, setLoading] = useState(false);
  const { addToast } = useToastContext();

  const convert = async () => {
    if (!text.trim()) { addToast("Please enter some text", "error"); return; }
    setLoading(true);
    try {
      const { PDFDocument, StandardFonts, rgb } = await import("pdf-lib");
      const pdfDoc = await PDFDocument.create();
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const fontSize = 12;
      const margin = 50;
      const lineHeight = fontSize * 1.5;

      const lines = text.split("\n");
      let page = pdfDoc.addPage();
      let { height } = page.getSize();
      let y = height - margin;

      for (const line of lines) {
        if (y < margin + lineHeight) {
          page = pdfDoc.addPage();
          height = page.getSize().height;
          y = height - margin;
        }
        page.drawText(line, { x: margin, y, size: fontSize, font, color: rgb(0, 0, 0) });
        y -= lineHeight;
      }

      pdfDoc.setTitle(title);
      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes as unknown as BlobPart], { type: "application/pdf" });
      setResult(blob);
      addToast("PDF created!", "success");
    } catch { addToast("Failed to create PDF", "error"); }
    setLoading(false);
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="mb-1.5 block text-sm font-medium">Document Title</label>
        <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="My Document" />
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium">Text Content</label>
        <Textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter or paste your text here..." className="min-h-[200px]" />
      </div>
      <div className="flex gap-2">
        <Button onClick={convert} disabled={loading} className="flex-1">{loading ? "Creating..." : "Convert to PDF"}</Button>
        <Button variant="outline" onClick={() => { setText(""); setResult(null); }}><Trash2 className="h-4 w-4" /></Button>
      </div>
      {result && <Button variant="outline" className="w-full" onClick={() => downloadBlob(result, `${title}.pdf`)}><Download className="mr-1 h-4 w-4" /> Download PDF</Button>}
    </div>
  );
}
