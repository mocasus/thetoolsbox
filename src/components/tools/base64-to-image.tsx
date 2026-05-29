"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToastContext } from "@/providers/toast-provider";
import { downloadDataUrl } from "@/lib/utils";
import { Download, Trash2 } from "lucide-react";

export function Base64ToImage() {
  const [input, setInput] = useState("");
  const [preview, setPreview] = useState("");
  const { addToast } = useToastContext();

  const convert = () => {
    let src = input.trim();
    if (!src) { addToast("Please enter a Base64 string", "error"); return; }
    if (!src.startsWith("data:")) {
      src = `data:image/png;base64,${src}`;
    }
    setPreview(src);
    addToast("Image decoded successfully!", "success");
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="mb-1.5 block text-sm font-medium">Base64 String</label>
        <Textarea
          placeholder="Paste Base64 string here (with or without data: prefix)..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="min-h-[150px] font-mono text-xs"
        />
      </div>
      <div className="flex gap-2">
        <Button onClick={convert} className="flex-1">Decode Image</Button>
        <Button variant="outline" onClick={() => { setInput(""); setPreview(""); }}><Trash2 className="h-4 w-4" /></Button>
      </div>
      {preview && (
        <div className="space-y-3">
          <img src={preview} alt="Decoded" className="max-h-64 rounded-lg border border-border" />
          <Button variant="outline" size="sm" onClick={() => downloadDataUrl(preview, "decoded-image.png")}>
            <Download className="mr-1 h-3 w-3" /> Download Image
          </Button>
        </div>
      )}
    </div>
  );
}
