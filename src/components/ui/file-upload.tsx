"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Upload } from "lucide-react";

interface FileUploadProps {
  accept?: string;
  multiple?: boolean;
  maxSize?: number;
  onFiles: (files: File[]) => void;
  className?: string;
  label?: string;
  description?: string;
}

export function FileUpload({
  accept,
  multiple = false,
  maxSize,
  onFiles,
  className,
  label = "Drop files here or click to upload",
  description,
}: FileUploadProps) {
  const [isDragging, setIsDragging] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    if (maxSize) {
      const valid = files.filter((f) => f.size <= maxSize);
      onFiles(valid);
    } else {
      onFiles(files);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    onFiles(files);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div
      className={cn(
        "relative flex min-h-[160px] cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-border bg-muted/30 p-6 text-center transition-colors hover:border-primary/50 hover:bg-muted/50",
        isDragging && "border-primary bg-primary/5",
        className
      )}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
    >
      <Upload className="mb-2 h-8 w-8 text-muted-foreground" />
      <p className="text-sm font-medium text-foreground">{label}</p>
      {description && (
        <p className="mt-1 text-xs text-muted-foreground">{description}</p>
      )}
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={handleChange}
        className="hidden"
      />
    </div>
  );
}
