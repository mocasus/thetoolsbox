"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/ui/copy-button";
import { useToastContext } from "@/providers/toast-provider";
import { Trash2 } from "lucide-react";

export function HashtagGenerator() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const { addToast } = useToastContext();

  const generate = () => {
    if (!input.trim()) { addToast("Please enter keywords", "error"); return; }
    const tags = input
      .split(/[,\n\s]+/)
      .filter(Boolean)
      .map((w) => `#${w.toLowerCase().replace(/[^a-z0-9]/g, "")}`)
      .filter((t) => t.length > 1);
    setOutput(tags.join(" "));
    addToast(`Generated ${tags.length} hashtags`, "success");
  };

  return (
    <div className="space-y-4">
      <Textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="Enter keywords separated by commas, spaces, or new lines..." className="min-h-[100px]" />
      <Button onClick={generate} className="w-full">Generate Hashtags</Button>
      {output && (
        <div className="space-y-2">
          <div className="flex items-center justify-between"><label className="text-sm font-medium">Hashtags</label><CopyButton text={output} /></div>
          <Textarea value={output} readOnly className="min-h-[80px]" />
        </div>
      )}
    </div>
  );
}

export function CaptionFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const format = () => {
    // Instagram-friendly: replace \n with invisible char for line breaks
    const formatted = input.replace(/\n/g, "\n\n");
    setOutput(formatted);
  };

  return (
    <div className="space-y-4">
      <Textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="Write your caption here..." className="min-h-[150px]" />
      <Button onClick={format} className="w-full">Format Caption</Button>
      {output && (
        <div className="space-y-2">
          <div className="flex items-center justify-between"><label className="text-sm font-medium">Formatted (copy this)</label><CopyButton text={output} /></div>
          <Textarea value={output} readOnly className="min-h-[150px]" />
        </div>
      )}
    </div>
  );
}

export function WhatsappFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const applyFormat = (type: string) => {
    let formatted = input;
    switch (type) {
      case "bold": formatted = `*${input}*`; break;
      case "italic": formatted = `_${input}_`; break;
      case "strike": formatted = `~${input}~`; break;
      case "mono": formatted = "```" + input + "```"; break;
    }
    setOutput(formatted);
  };

  return (
    <div className="space-y-4">
      <Textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="Enter text to format..." className="min-h-[100px]" />
      <div className="flex flex-wrap gap-2">
        <Button variant="outline" size="sm" onClick={() => applyFormat("bold")}><strong>Bold</strong></Button>
        <Button variant="outline" size="sm" onClick={() => applyFormat("italic")}><em>Italic</em></Button>
        <Button variant="outline" size="sm" onClick={() => applyFormat("strike")}><s>Strike</s></Button>
        <Button variant="outline" size="sm" onClick={() => applyFormat("mono")}>Mono</Button>
      </div>
      {output && (
        <div className="space-y-2">
          <div className="flex items-center justify-between"><label className="text-sm font-medium">Formatted</label><CopyButton text={output} /></div>
          <Textarea value={output} readOnly className="min-h-[80px] font-mono" />
          <p className="text-xs text-muted-foreground">Paste this in WhatsApp to see formatting</p>
        </div>
      )}
    </div>
  );
}

export function ReadTimeCalculator() {
  const [text, setText] = useState("");
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const slowRead = Math.ceil(words / 150);
  const avgRead = Math.ceil(words / 200);
  const fastRead = Math.ceil(words / 250);

  return (
    <div className="space-y-4">
      <Textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Paste your article or text..." className="min-h-[200px]" />
      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-lg border border-border p-4 text-center">
          <p className="text-2xl font-bold">{slowRead} min</p>
          <p className="text-xs text-muted-foreground">Slow (150 wpm)</p>
        </div>
        <div className="rounded-lg border border-primary/50 bg-primary/5 p-4 text-center">
          <p className="text-2xl font-bold text-primary">{avgRead} min</p>
          <p className="text-xs text-muted-foreground">Average (200 wpm)</p>
        </div>
        <div className="rounded-lg border border-border p-4 text-center">
          <p className="text-2xl font-bold">{fastRead} min</p>
          <p className="text-xs text-muted-foreground">Fast (250 wpm)</p>
        </div>
      </div>
      <p className="text-sm text-muted-foreground">{words} words total</p>
    </div>
  );
}
