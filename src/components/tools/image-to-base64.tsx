"use client";

import { useState } from "react";
import { FileUpload } from "@/components/ui/file-upload";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/ui/copy-button";
import { readFileAsDataURL } from "@/lib/utils";
import { Trash2 } from "lucide-react";

export function ImageToBase64() {
  const [result, setResult] = useState("");
  const [fileName, setFileName] = useState("");

  const handleFiles = async (files: File[]) => {
    if (files[0]) {
      setFileName(files[0].name);
      const dataUrl = await readFileAsDataURL(files[0]);
      setResult(dataUrl);
    }
  };

  return (
    <div className="space-y-4">
      <FileUpload accept="image/*" onFiles={handleFiles} description="Upload an image to convert to Base64" />
      {result && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">{fileName}</p>
            <div className="flex gap-2">
              <CopyButton text={result} />
              <Button variant="ghost" size="sm" onClick={() => setResult("")}><Trash2 className="h-3 w-3" /></Button>
            </div>
          </div>
          <Textarea value={result} readOnly className="min-h-[200px] font-mono text-xs" />
          <p className="text-xs text-muted-foreground">Length: {result.length.toLocaleString()} characters</p>
        </div>
      )}
    </div>
  );
}
