"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { CopyButton } from "@/components/ui/copy-button";
import { useToastContext } from "@/providers/toast-provider";

export function HashGenerator() {
  const [input, setInput] = useState("");
  const [results, setResults] = useState<Record<string, string>>({});
  const { addToast } = useToastContext();

  const generate = async () => {
    if (!input) { addToast("Please enter text", "error"); return; }
    const encoder = new TextEncoder();
    const data = encoder.encode(input);
    const algorithms = ["SHA-1", "SHA-256", "SHA-384", "SHA-512"];
    const hashes: Record<string, string> = {};
    for (const algo of algorithms) {
      const hash = await crypto.subtle.digest(algo, data);
      hashes[algo] = Array.from(new Uint8Array(hash)).map((b) => b.toString(16).padStart(2, "0")).join("");
    }
    setResults(hashes);
    addToast("Hashes generated!", "success");
  };

  return (
    <div className="space-y-4">
      <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Enter text to hash..." />
      <Button onClick={generate} className="w-full">Generate Hashes</Button>
      {Object.keys(results).length > 0 && (
        <div className="space-y-2">
          {Object.entries(results).map(([algo, hash]) => (
            <div key={algo} className="flex items-center gap-2 rounded-lg bg-muted p-3">
              <span className="w-16 shrink-0 text-xs font-medium text-muted-foreground">{algo}</span>
              <code className="flex-1 break-all text-xs">{hash}</code>
              <CopyButton text={hash} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function RegexTester() {
  const [pattern, setPattern] = useState("");
  const [flags, setFlags] = useState("g");
  const [text, setText] = useState("");
  const [matches, setMatches] = useState<string[]>([]);
  const [error, setError] = useState("");
  const { addToast } = useToastContext();

  const test = () => {
    setError("");
    try {
      const regex = new RegExp(pattern, flags);
      const found = text.match(regex) || [];
      setMatches(found);
      addToast(`Found ${found.length} match(es)`, "success");
    } catch (e: any) {
      setError(e.message);
      setMatches([]);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input value={pattern} onChange={(e) => setPattern(e.target.value)} placeholder="Regular expression" className="flex-1 font-mono" />
        <Input value={flags} onChange={(e) => setFlags(e.target.value)} placeholder="Flags" className="w-20 font-mono" />
      </div>
      <Textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Test string..." className="min-h-[120px]" />
      <Button onClick={test} className="w-full">Test Regex</Button>
      {error && <p className="text-sm text-red-500">{error}</p>}
      {matches.length > 0 && (
        <div className="rounded-lg bg-muted p-3">
          <p className="mb-2 text-sm font-medium">{matches.length} match(es) found:</p>
          <div className="flex flex-wrap gap-2">
            {matches.map((m, i) => (
              <span key={i} className="rounded bg-primary/10 px-2 py-0.5 text-xs font-mono text-primary">{m}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function DiffChecker() {
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [diff, setDiff] = useState<{ type: string; line: string }[]>([]);
  const { addToast } = useToastContext();

  const compare = () => {
    const lines1 = text1.split("\n");
    const lines2 = text2.split("\n");
    const result: { type: string; line: string }[] = [];
    const maxLen = Math.max(lines1.length, lines2.length);
    for (let i = 0; i < maxLen; i++) {
      if (i >= lines1.length) result.push({ type: "added", line: lines2[i] });
      else if (i >= lines2.length) result.push({ type: "removed", line: lines1[i] });
      else if (lines1[i] !== lines2[i]) {
        result.push({ type: "removed", line: lines1[i] });
        result.push({ type: "added", line: lines2[i] });
      } else result.push({ type: "same", line: lines1[i] });
    }
    setDiff(result);
    addToast("Comparison complete!", "success");
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
        <div><label className="mb-1 block text-sm font-medium">Original</label><Textarea value={text1} onChange={(e) => setText1(e.target.value)} placeholder="First text..." className="min-h-[150px] font-mono text-sm" /></div>
        <div><label className="mb-1 block text-sm font-medium">Changed</label><Textarea value={text2} onChange={(e) => setText2(e.target.value)} placeholder="Second text..." className="min-h-[150px] font-mono text-sm" /></div>
      </div>
      <Button onClick={compare} className="w-full">Compare</Button>
      {diff.length > 0 && (
        <div className="max-h-80 overflow-y-auto rounded-lg border border-border font-mono text-xs">
          {diff.map((d, i) => (
            <div key={i} className={`px-3 py-0.5 ${d.type === "added" ? "bg-green-500/10 text-green-600" : d.type === "removed" ? "bg-red-500/10 text-red-600" : "text-muted-foreground"}`}>
              <span className="mr-2">{d.type === "added" ? "+" : d.type === "removed" ? "-" : " "}</span>{d.line}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function UnixTimestampConverter() {
  const [timestamp, setTimestamp] = useState(String(Math.floor(Date.now() / 1000)));
  const [date, setDate] = useState("");

  const toDate = () => {
    const ts = parseInt(timestamp);
    const d = ts > 9999999999 ? new Date(ts) : new Date(ts * 1000);
    setDate(d.toISOString());
  };

  const toTimestamp = () => {
    if (date) setTimestamp(String(Math.floor(new Date(date).getTime() / 1000)));
  };

  const now = () => setTimestamp(String(Math.floor(Date.now() / 1000)));

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        <div><label className="mb-1 block text-sm font-medium">Unix Timestamp</label>
          <div className="flex gap-2">
            <Input value={timestamp} onChange={(e) => setTimestamp(e.target.value)} className="font-mono" />
            <Button variant="outline" size="sm" onClick={now}>Now</Button>
            <Button size="sm" onClick={toDate}>→ Date</Button>
          </div>
        </div>
        <div><label className="mb-1 block text-sm font-medium">Date/Time (ISO)</label>
          <div className="flex gap-2">
            <Input value={date} onChange={(e) => setDate(e.target.value)} placeholder="2024-01-15T10:30:00.000Z" className="font-mono" />
            <Button size="sm" onClick={toTimestamp}>→ Timestamp</Button>
          </div>
        </div>
      </div>
      <div className="rounded-lg bg-muted p-3 text-sm text-muted-foreground">
        <p>Current: {Math.floor(Date.now() / 1000)} (seconds) | {Date.now()} (milliseconds)</p>
      </div>
    </div>
  );
}

export function CronParser() {
  const [input, setInput] = useState("*/5 * * * *");
  const [description, setDescription] = useState("");
  const { addToast } = useToastContext();

  const parse = async () => {
    try {
      const cronstrue = (await import("cronstrue")).default;
      const desc = cronstrue.toString(input);
      setDescription(desc);
      addToast("Parsed!", "success");
    } catch { addToast("Invalid cron expression", "error"); setDescription(""); }
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="mb-1.5 block text-sm font-medium">Cron Expression</label>
        <div className="flex gap-2">
          <Input value={input} onChange={(e) => setInput(e.target.value)} className="font-mono" placeholder="* * * * *" />
          <Button onClick={parse}>Parse</Button>
        </div>
      </div>
      {description && (
        <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
          <p className="text-sm font-medium text-primary">{description}</p>
        </div>
      )}
      <div className="rounded-lg bg-muted p-3 text-xs text-muted-foreground">
        <p className="font-mono">┌───────────── minute (0-59)</p>
        <p className="font-mono">│ ┌───────────── hour (0-23)</p>
        <p className="font-mono">│ │ ┌───────────── day of month (1-31)</p>
        <p className="font-mono">│ │ │ ┌───────────── month (1-12)</p>
        <p className="font-mono">│ │ │ │ ┌───────────── day of week (0-6)</p>
        <p className="font-mono">* * * * *</p>
      </div>
      <div className="flex flex-wrap gap-2">
        {[
          { label: "Every minute", value: "* * * * *" },
          { label: "Every 5 min", value: "*/5 * * * *" },
          { label: "Every hour", value: "0 * * * *" },
          { label: "Daily midnight", value: "0 0 * * *" },
          { label: "Weekly Monday", value: "0 0 * * 1" },
        ].map((preset) => (
          <Button key={preset.value} variant="outline" size="sm" onClick={() => { setInput(preset.value); parse(); }}>{preset.label}</Button>
        ))}
      </div>
    </div>
  );
}
