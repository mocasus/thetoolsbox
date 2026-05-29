"use client";

import { useState } from "react";
import { FileUpload } from "@/components/ui/file-upload";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/ui/copy-button";
import { useToastContext } from "@/providers/toast-provider";
import { Trash2 } from "lucide-react";

export function QrCodeReader() {
  const [result, setResult] = useState("");
  const [preview, setPreview] = useState("");
  const { addToast } = useToastContext();

  const handleFiles = async (files: File[]) => {
    if (!files[0]) return;
    setPreview(URL.createObjectURL(files[0]));
    try {
      const { Html5Qrcode } = await import("html5-qrcode");
      const scanner = new Html5Qrcode("qr-reader-hidden");
      const decoded = await scanner.scanFile(files[0], true);
      setResult(decoded);
      addToast("QR code decoded!", "success");
      await scanner.clear();
    } catch {
      setResult("");
      addToast("Could not decode QR code from this image", "error");
    }
  };

  return (
    <div className="space-y-4">
      <div id="qr-reader-hidden" className="hidden" />
      <FileUpload accept="image/*" onFiles={handleFiles} description="Upload an image containing a QR code" />
      {preview && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <img src={preview} alt="QR" className="max-h-40 rounded-lg" />
            <Button variant="ghost" size="icon" onClick={() => { setPreview(""); setResult(""); }}><Trash2 className="h-4 w-4" /></Button>
          </div>
          {result ? (
            <div className="flex items-center justify-between rounded-lg bg-muted p-4">
              <div className="flex-1">
                <p className="text-xs text-muted-foreground">Decoded content:</p>
                <p className="mt-1 break-all text-sm font-medium">{result}</p>
              </div>
              <CopyButton text={result} />
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No QR code detected.</p>
          )}
        </div>
      )}
    </div>
  );
}
