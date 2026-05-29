"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/ui/copy-button";
import { useToastContext } from "@/providers/toast-provider";
import { Trash2 } from "lucide-react";

function TextToolBase({ title, process, placeholder }: { title: string; process: (input: string) => string; placeholder?: string }) {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const { addToast } = useToastContext();

  const handleProcess = () => {
    if (!input.trim()) { addToast("Please enter some text", "error"); return; }
    setOutput(process(input));
    addToast("Done!", "success");
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium">Input</label>
        <Button variant="ghost" size="sm" onClick={() => { setInput(""); setOutput(""); }}><Trash2 className="mr-1 h-3 w-3" /> Clear</Button>
      </div>
      <Textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder={placeholder || "Enter text..."} className="min-h-[150px]" />
      <Button onClick={handleProcess} className="w-full">Process</Button>
      {output && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Result</label>
            <CopyButton text={output} />
          </div>
          <Textarea value={output} readOnly className="min-h-[150px]" />
        </div>
      )}
    </div>
  );
}

export function RemoveDuplicateLines() {
  return <TextToolBase title="Remove Duplicate Lines" process={(input) => [...new Set(input.split("\n"))].join("\n")} placeholder="Enter text with duplicate lines..." />;
}

export function SortLines() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const { addToast } = useToastContext();

  const sort = (type: string) => {
    const lines = input.split("\n").filter(Boolean);
    let sorted: string[];
    switch (type) {
      case "asc": sorted = [...lines].sort((a, b) => a.localeCompare(b)); break;
      case "desc": sorted = [...lines].sort((a, b) => b.localeCompare(a)); break;
      case "length": sorted = [...lines].sort((a, b) => a.length - b.length); break;
      case "reverse": sorted = [...lines].reverse(); break;
      default: sorted = lines;
    }
    setOutput(sorted.join("\n"));
    addToast("Lines sorted!", "success");
  };

  return (
    <div className="space-y-4">
      <Textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="Enter lines to sort..." className="min-h-[150px]" />
      <div className="flex flex-wrap gap-2">
        <Button variant="outline" size="sm" onClick={() => sort("asc")}>A → Z</Button>
        <Button variant="outline" size="sm" onClick={() => sort("desc")}>Z → A</Button>
        <Button variant="outline" size="sm" onClick={() => sort("length")}>By Length</Button>
        <Button variant="outline" size="sm" onClick={() => sort("reverse")}>Reverse</Button>
      </div>
      {output && (
        <div className="space-y-2">
          <div className="flex items-center justify-between"><label className="text-sm font-medium">Result</label><CopyButton text={output} /></div>
          <Textarea value={output} readOnly className="min-h-[150px]" />
        </div>
      )}
    </div>
  );
}

export function RemoveEmptyLines() {
  return <TextToolBase title="Remove Empty Lines" process={(input) => input.split("\n").filter((line) => line.trim() !== "").join("\n")} placeholder="Paste text with empty lines..." />;
}

export function RemoveExtraSpaces() {
  return <TextToolBase title="Remove Extra Spaces" process={(input) => input.split("\n").map((line) => line.replace(/\s+/g, " ").trim()).join("\n")} placeholder="Paste text with extra spaces..." />;
}

export function TextCleaner() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const { addToast } = useToastContext();

  const clean = (type: string) => {
    let result = input;
    switch (type) {
      case "trim": result = input.split("\n").map((l) => l.trim()).join("\n"); break;
      case "spaces": result = input.replace(/[ \t]+/g, " "); break;
      case "empty": result = input.split("\n").filter((l) => l.trim()).join("\n"); break;
      case "all": result = input.split("\n").map((l) => l.trim()).filter(Boolean).map((l) => l.replace(/\s+/g, " ")).join("\n"); break;
    }
    setOutput(result);
    addToast("Text cleaned!", "success");
  };

  return (
    <div className="space-y-4">
      <Textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="Paste messy text..." className="min-h-[150px]" />
      <div className="flex flex-wrap gap-2">
        <Button variant="outline" size="sm" onClick={() => clean("trim")}>Trim Lines</Button>
        <Button variant="outline" size="sm" onClick={() => clean("spaces")}>Fix Spaces</Button>
        <Button variant="outline" size="sm" onClick={() => clean("empty")}>Remove Empty</Button>
        <Button onClick={() => clean("all")} size="sm">Clean All</Button>
      </div>
      {output && (
        <div className="space-y-2">
          <div className="flex items-center justify-between"><label className="text-sm font-medium">Result</label><CopyButton text={output} /></div>
          <Textarea value={output} readOnly className="min-h-[150px]" />
        </div>
      )}
    </div>
  );
}
