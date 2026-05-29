"use client";

import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { useToastContext } from "@/providers/toast-provider";
import { Download } from "lucide-react";

export function BarcodeGenerator() {
  const [text, setText] = useState("1234567890");
  const [format, setFormat] = useState("CODE128");
  const [barcode, setBarcode] = useState("");
  const svgRef = useRef<SVGSVGElement>(null);
  const { addToast } = useToastContext();

  const generate = async () => {
    if (!text.trim()) { addToast("Please enter text", "error"); return; }
    try {
      const JsBarcode = (await import("jsbarcode")).default;
      if (svgRef.current) {
        JsBarcode(svgRef.current, text, { format, displayValue: true, height: 80 });
        setBarcode("generated");
        addToast("Barcode generated!", "success");
      }
    } catch (e: any) {
      addToast(e?.message || "Invalid input for this format", "error");
    }
  };

  const download = () => {
    if (!svgRef.current) return;
    const svg = svgRef.current.outerHTML;
    const blob = new Blob([svg], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "barcode.svg"; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="mb-1.5 block text-sm font-medium">Text / Value</label>
        <Input value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter barcode value" />
      </div>
      <div className="flex items-center gap-3">
        <label className="text-sm">Format:</label>
        <Select value={format} onChange={(e) => setFormat(e.target.value)} options={[
          { value: "CODE128", label: "Code 128" },
          { value: "EAN13", label: "EAN-13" },
          { value: "UPC", label: "UPC" },
          { value: "CODE39", label: "Code 39" },
          { value: "ITF14", label: "ITF-14" },
        ]} />
      </div>
      <Button onClick={generate} className="w-full">Generate Barcode</Button>
      <div className="flex flex-col items-center gap-3 rounded-lg border border-border p-6">
        <svg ref={svgRef} />
        {barcode && (
          <Button variant="outline" size="sm" onClick={download}>
            <Download className="mr-1 h-3 w-3" /> Download SVG
          </Button>
        )}
      </div>
    </div>
  );
}
