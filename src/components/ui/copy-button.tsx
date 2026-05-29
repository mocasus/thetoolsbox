"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { Button } from "./button";
import { copyToClipboard } from "@/lib/utils";
import { useToastContext } from "@/providers/toast-provider";

interface CopyButtonProps {
  text: string;
  className?: string;
  variant?: "default" | "outline" | "ghost" | "secondary";
}

export function CopyButton({ text, className, variant = "outline" }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);
  const { addToast } = useToastContext();

  const handleCopy = async () => {
    try {
      await copyToClipboard(text);
      setCopied(true);
      addToast("Copied to clipboard!", "success");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      addToast("Failed to copy", "error");
    }
  };

  return (
    <Button variant={variant} size="sm" onClick={handleCopy} className={className}>
      {copied ? <Check className="mr-1 h-3 w-3" /> : <Copy className="mr-1 h-3 w-3" />}
      {copied ? "Copied" : "Copy"}
    </Button>
  );
}
