"use client";

import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { useToastContext } from "@/providers/toast-provider";
import { Download, Trash2 } from "lucide-react";

export function QrCodeGenerator() {
  const [text, setText] = useState("https://example.com");
  const [size, setSize] = useState("256");
  const [qrDataUrl, setQrDataUrl] = useState("");
  const { addToast } = useToastContext();

  const generate = async () => {
    if (!text.trim()) { addToast("Please enter text or URL", "error"); return; }
    try {
      const QRCode = (await import("qrcode")).default;
      const url = await QRCode.toDataURL(text, { width: parseInt(size), margin: 2 });
      setQrDataUrl(url);
      addToast("QR code generated!", "success");
    } catch { addToast("Failed to generate QR code", "error"); }
  };

  const download = () => {
    if (!qrDataUrl) return;
    const a = document.createElement("a");
    a.href = qrDataUrl;
    a.download = "qrcode.png";
    a.click();
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="mb-1.5 block text-sm font-medium">Text or URL</label>
        <Input value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter text or URL..." />
      </div>
      <div className="flex items-center gap-3">
        <label className="text-sm">Size:</label>
        <Select value={size} onChange={(e) => setSize(e.target.value)} options={[
          { value: "128", label: "128px" }, { value: "256", label: "256px" },
          { value: "512", label: "512px" }, { value: "1024", label: "1024px" },
        ]} />
      </div>
      <div className="flex gap-2">
        <Button onClick={generate} className="flex-1">Generate QR Code</Button>
        <Button variant="outline" onClick={() => { setText(""); setQrDataUrl(""); }}><Trash2 className="h-4 w-4" /></Button>
      </div>
      {qrDataUrl && (
        <div className="flex flex-col items-center gap-4 rounded-lg border border-border p-6">
          <img src={qrDataUrl} alt="QR Code" className="rounded" />
          <Button variant="outline" size="sm" onClick={download}><Download className="mr-1 h-3 w-3" /> Download PNG</Button>
        </div>
      )}
    </div>
  );
}
