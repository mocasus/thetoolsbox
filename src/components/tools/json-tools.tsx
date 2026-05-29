"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/ui/copy-button";
import { useToastContext } from "@/providers/toast-provider";
import { Trash2 } from "lucide-react";

export function JsonFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const { addToast } = useToastContext();

  const format = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, 2));
      addToast("JSON formatted!", "success");
    } catch (e: any) { addToast(`Invalid JSON: ${e.message}`, "error"); }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between"><label className="text-sm font-medium">Input JSON</label><Button variant="ghost" size="sm" onClick={() => { setInput(""); setOutput(""); }}><Trash2 className="mr-1 h-3 w-3" /> Clear</Button></div>
      <Textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder='{"key": "value"}' className="min-h-[150px] font-mono text-sm" />
      <Button onClick={format} className="w-full">Format JSON</Button>
      {output && (
        <div className="space-y-2">
          <div className="flex items-center justify-between"><label className="text-sm font-medium">Formatted</label><CopyButton text={output} /></div>
          <Textarea value={output} readOnly className="min-h-[200px] font-mono text-sm" />
        </div>
      )}
    </div>
  );
}

export function JsonValidator() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<{ valid: boolean; error?: string } | null>(null);
  const { addToast } = useToastContext();

  const validate = () => {
    try {
      JSON.parse(input);
      setResult({ valid: true });
      addToast("Valid JSON!", "success");
    } catch (e: any) {
      setResult({ valid: false, error: e.message });
      addToast("Invalid JSON", "error");
    }
  };

  return (
    <div className="space-y-4">
      <Textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="Paste JSON to validate..." className="min-h-[200px] font-mono text-sm" />
      <Button onClick={validate} className="w-full">Validate JSON</Button>
      {result && (
        <div className={`rounded-lg p-4 ${result.valid ? "border-green-500/20 bg-green-500/5" : "border-red-500/20 bg-red-500/5"} border`}>
          {result.valid ? (
            <p className="text-sm font-medium text-green-600">✓ Valid JSON</p>
          ) : (
            <div><p className="text-sm font-medium text-red-600">✗ Invalid JSON</p><p className="mt-1 text-xs text-muted-foreground">{result.error}</p></div>
          )}
        </div>
      )}
    </div>
  );
}

export function JsonMinifier() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const { addToast } = useToastContext();

  const minify = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed));
      addToast("JSON minified!", "success");
    } catch (e: any) { addToast(`Invalid JSON: ${e.message}`, "error"); }
  };

  return (
    <div className="space-y-4">
      <Textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="Paste formatted JSON..." className="min-h-[150px] font-mono text-sm" />
      <Button onClick={minify} className="w-full">Minify JSON</Button>
      {output && (
        <div className="space-y-2">
          <div className="flex items-center justify-between"><label className="text-sm font-medium">Minified ({output.length} chars)</label><CopyButton text={output} /></div>
          <Textarea value={output} readOnly className="min-h-[80px] font-mono text-xs" />
        </div>
      )}
    </div>
  );
}

export function JsonToCsv() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const { addToast } = useToastContext();

  const convert = () => {
    try {
      const data = JSON.parse(input);
      if (!Array.isArray(data) || data.length === 0) { addToast("Input must be a non-empty JSON array", "error"); return; }
      const headers = Object.keys(data[0]);
      const csv = [headers.join(","), ...data.map((row: any) => headers.map((h) => `"${String(row[h] ?? "").replace(/"/g, '""')}"`).join(","))].join("\n");
      setOutput(csv);
      addToast("Converted to CSV!", "success");
    } catch (e: any) { addToast(`Error: ${e.message}`, "error"); }
  };

  return (
    <div className="space-y-4">
      <Textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder='[{"name":"John","age":30}]' className="min-h-[150px] font-mono text-sm" />
      <Button onClick={convert} className="w-full">Convert to CSV</Button>
      {output && (
        <div className="space-y-2">
          <div className="flex items-center justify-between"><label className="text-sm font-medium">CSV Output</label><CopyButton text={output} /></div>
          <Textarea value={output} readOnly className="min-h-[120px] font-mono text-sm" />
        </div>
      )}
    </div>
  );
}

export function CsvToJson() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const { addToast } = useToastContext();

  const convert = () => {
    try {
      const lines = input.trim().split("\n");
      if (lines.length < 2) { addToast("Need header + at least one row", "error"); return; }
      const headers = lines[0].split(",").map((h) => h.trim().replace(/^"|"$/g, ""));
      const data = lines.slice(1).map((line) => {
        const values = line.split(",").map((v) => v.trim().replace(/^"|"$/g, ""));
        const obj: any = {};
        headers.forEach((h, i) => { obj[h] = values[i] || ""; });
        return obj;
      });
      setOutput(JSON.stringify(data, null, 2));
      addToast(`Converted ${data.length} rows to JSON!`, "success");
    } catch (e: any) { addToast(`Error: ${e.message}`, "error"); }
  };

  return (
    <div className="space-y-4">
      <Textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="name,age,city\nJohn,30,NYC" className="min-h-[150px] font-mono text-sm" />
      <Button onClick={convert} className="w-full">Convert to JSON</Button>
      {output && (
        <div className="space-y-2">
          <div className="flex items-center justify-between"><label className="text-sm font-medium">JSON Output</label><CopyButton text={output} /></div>
          <Textarea value={output} readOnly className="min-h-[150px] font-mono text-sm" />
        </div>
      )}
    </div>
  );
}
