"use client";

import { Download } from "lucide-react";
import { Button } from "./button";
import { downloadBlob, downloadDataUrl } from "@/lib/utils";

interface DownloadButtonProps {
  blob?: Blob;
  dataUrl?: string;
  filename: string;
  className?: string;
  disabled?: boolean;
}

export function DownloadButton({ blob, dataUrl, filename, className, disabled }: DownloadButtonProps) {
  const handleDownload = () => {
    if (blob) {
      downloadBlob(blob, filename);
    } else if (dataUrl) {
      downloadDataUrl(dataUrl, filename);
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleDownload}
      className={className}
      disabled={disabled || (!blob && !dataUrl)}
    >
      <Download className="mr-1 h-3 w-3" />
      Download
    </Button>
  );
}
