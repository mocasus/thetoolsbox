"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/ui/copy-button";
import { useToastContext } from "@/providers/toast-provider";
import { Trash2 } from "lucide-react";

export function FindAndReplace() {
  const [input, setInput] = useState("");
  const [find, setFind] = useState("");
  const [replace, setReplace] = useState("");
  const [useRegex, setUseRegex] = useState(false);
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [output, setOutput] = useState("");
  const [count, setCount] = useState(0);
  const { addToast } = useToastContext();

  const process = () => {
    if (!find) { addToast("Please enter text to find", "error"); return; }
    try {
      let regex: RegExp;
      if (useRegex) {
        regex = new RegExp(find, caseSensitive ? "g" : "gi");
      } else {
        const escaped = find.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        regex = new RegExp(escaped, caseSensitive ? "g" : "gi");
      }
      const matches = input.match(regex);
      setCount(matches ? matches.length : 0);
      setOutput(input.replace(regex, replace));
      addToast(`Replaced ${matches?.length || 0} occurrence(s)`, "success");
    } catch (e) { addToast("Invalid regex pattern", "error"); }
  };

  return (
    <div className="space-y-4">
      <Textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="Enter text..." className="min-h-[150px]" />
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Input placeholder="Find..." value={find} onChange={(e) => setFind(e.target.value)} />
        <Input placeholder="Replace with..." value={replace} onChange={(e) => setReplace(e.target.value)} />
      </div>
      <div className="flex flex-wrap gap-4">
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={useRegex} onChange={(e) => setUseRegex(e.target.checked)} /> Regex</label>
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={caseSensitive} onChange={(e) => setCaseSensitive(e.target.checked)} /> Case sensitive</label>
      </div>
      <div className="flex gap-2">
        <Button onClick={process} className="flex-1">Find & Replace</Button>
        <Button variant="outline" onClick={() => { setInput(""); setOutput(""); setFind(""); setReplace(""); }}><Trash2 className="h-4 w-4" /></Button>
      </div>
      {output && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">{count} replacement(s)</label>
            <CopyButton text={output} />
          </div>
          <Textarea value={output} readOnly className="min-h-[150px]" />
        </div>
      )}
    </div>
  );
}
