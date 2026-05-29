"use client";

import { useState } from "react";
import { FileUpload } from "@/components/ui/file-upload";
import { Button } from "@/components/ui/button";
import { useToastContext } from "@/providers/toast-provider";
import { Trash2 } from "lucide-react";

export function ImageMetadataViewer() {
  const [file, setFile] = useState<File | null>(null);
  const [metadata, setMetadata] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const { addToast } = useToastContext();

  const handleFiles = async (files: File[]) => {
    if (!files[0]) return;
    setFile(files[0]);
    setLoading(true);
    try {
      const exifr = (await import("exifr")).default;
      const data = await exifr.parse(files[0]);
      if (data) {
        const flat: Record<string, string> = {};
        Object.entries(data).forEach(([key, val]) => {
          if (val !== undefined && val !== null && typeof val !== "object") {
            flat[key] = String(val);
          } else if (val instanceof Date) {
            flat[key] = val.toISOString();
          }
        });
        setMetadata(flat);
        addToast(`Found ${Object.keys(flat).length} metadata fields`, "success");
      } else {
        setMetadata({});
        addToast("No metadata found in this image", "info");
      }
    } catch {
      setMetadata({});
      addToast("Could not read metadata", "error");
    }
    setLoading(false);
  };

  return (
    <div className="space-y-4">
      {!file ? (
        <FileUpload accept="image/*" onFiles={handleFiles} description="Upload an image to view metadata (EXIF data)" />
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between rounded-lg bg-muted p-3">
            <p className="text-sm font-medium">{file.name}</p>
            <Button variant="ghost" size="icon" onClick={() => { setFile(null); setMetadata({}); }}><Trash2 className="h-4 w-4" /></Button>
          </div>
          {loading ? (
            <p className="text-sm text-muted-foreground">Reading metadata...</p>
          ) : Object.keys(metadata).length === 0 ? (
            <p className="text-sm text-muted-foreground">No metadata found.</p>
          ) : (
            <div className="max-h-96 overflow-y-auto rounded-lg border border-border">
              <table className="w-full text-sm">
                <thead className="bg-muted"><tr><th className="px-3 py-2 text-left font-medium">Field</th><th className="px-3 py-2 text-left font-medium">Value</th></tr></thead>
                <tbody>
                  {Object.entries(metadata).map(([key, val]) => (
                    <tr key={key} className="border-t border-border">
                      <td className="px-3 py-1.5 font-mono text-xs text-muted-foreground">{key}</td>
                      <td className="px-3 py-1.5 text-xs">{val}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
