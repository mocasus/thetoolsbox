"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { CopyButton } from "@/components/ui/copy-button";
import { useToastContext } from "@/providers/toast-provider";
import { Trash2, RefreshCw } from "lucide-react";

export function Base64EncodeDecode() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const { addToast } = useToastContext();

  const process = () => {
    try {
      if (mode === "encode") {
        setOutput(btoa(unescape(encodeURIComponent(input))));
      } else {
        setOutput(decodeURIComponent(escape(atob(input))));
      }
      addToast(`${mode === "encode" ? "Encoded" : "Decoded"} successfully!`, "success");
    } catch { addToast("Invalid input", "error"); }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Button variant={mode === "encode" ? "default" : "outline"} size="sm" onClick={() => setMode("encode")}>Encode</Button>
        <Button variant={mode === "decode" ? "default" : "outline"} size="sm" onClick={() => setMode("decode")}>Decode</Button>
      </div>
      <Textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder={mode === "encode" ? "Enter text to encode..." : "Enter Base64 to decode..."} className="min-h-[120px] font-mono text-sm" />
      <Button onClick={process} className="w-full">{mode === "encode" ? "Encode to Base64" : "Decode from Base64"}</Button>
      {output && (
        <div className="space-y-2">
          <div className="flex items-center justify-between"><label className="text-sm font-medium">Result</label><CopyButton text={output} /></div>
          <Textarea value={output} readOnly className="min-h-[120px] font-mono text-sm" />
        </div>
      )}
    </div>
  );
}

export function UrlEncodeDecode() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const { addToast } = useToastContext();

  const process = () => {
    try {
      setOutput(mode === "encode" ? encodeURIComponent(input) : decodeURIComponent(input));
      addToast("Done!", "success");
    } catch { addToast("Invalid input", "error"); }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Button variant={mode === "encode" ? "default" : "outline"} size="sm" onClick={() => setMode("encode")}>Encode</Button>
        <Button variant={mode === "decode" ? "default" : "outline"} size="sm" onClick={() => setMode("decode")}>Decode</Button>
      </div>
      <Textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder={mode === "encode" ? "Enter URL to encode..." : "Enter encoded URL..."} className="min-h-[100px] font-mono text-sm" />
      <Button onClick={process} className="w-full">{mode === "encode" ? "URL Encode" : "URL Decode"}</Button>
      {output && (
        <div className="space-y-2">
          <div className="flex items-center justify-between"><label className="text-sm font-medium">Result</label><CopyButton text={output} /></div>
          <Textarea value={output} readOnly className="min-h-[100px] font-mono text-sm" />
        </div>
      )}
    </div>
  );
}

export function JwtDecoder() {
  const [input, setInput] = useState("");
  const [header, setHeader] = useState("");
  const [payload, setPayload] = useState("");
  const { addToast } = useToastContext();

  const decode = () => {
    try {
      const parts = input.trim().split(".");
      if (parts.length !== 3) { addToast("Invalid JWT format", "error"); return; }
      const h = JSON.parse(atob(parts[0]));
      const p = JSON.parse(atob(parts[1]));
      setHeader(JSON.stringify(h, null, 2));
      setPayload(JSON.stringify(p, null, 2));
      addToast("JWT decoded!", "success");
    } catch { addToast("Failed to decode JWT", "error"); }
  };

  return (
    <div className="space-y-4">
      <Textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="Paste JWT token here..." className="min-h-[80px] font-mono text-xs" />
      <Button onClick={decode} className="w-full">Decode JWT</Button>
      {header && (
        <div className="space-y-3">
          <div><div className="flex items-center justify-between"><label className="text-sm font-medium text-blue-500">Header</label><CopyButton text={header} /></div><Textarea value={header} readOnly className="mt-1 min-h-[80px] font-mono text-sm" /></div>
          <div><div className="flex items-center justify-between"><label className="text-sm font-medium text-green-500">Payload</label><CopyButton text={payload} /></div><Textarea value={payload} readOnly className="mt-1 min-h-[120px] font-mono text-sm" /></div>
        </div>
      )}
    </div>
  );
}

export function UuidGenerator() {
  const [uuids, setUuids] = useState<string[]>([]);
  const [count, setCount] = useState("5");
  const { addToast } = useToastContext();

  const generate = () => {
    const n = parseInt(count) || 1;
    const generated = Array.from({ length: Math.min(n, 100) }, () => crypto.randomUUID());
    setUuids(generated);
    addToast(`Generated ${generated.length} UUID(s)!`, "success");
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <label className="text-sm">Count:</label>
        <Input type="number" min="1" max="100" value={count} onChange={(e) => setCount(e.target.value)} className="w-24" />
        <Button onClick={generate}><RefreshCw className="mr-1 h-4 w-4" /> Generate</Button>
      </div>
      {uuids.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between"><label className="text-sm font-medium">{uuids.length} UUID(s)</label><CopyButton text={uuids.join("\n")} /></div>
          <Textarea value={uuids.join("\n")} readOnly className="min-h-[150px] font-mono text-sm" />
        </div>
      )}
    </div>
  );
}

export function PasswordGenerator() {
  const [length, setLength] = useState("16");
  const [upper, setUpper] = useState(true);
  const [lower, setLower] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(true);
  const [password, setPassword] = useState("");
  const { addToast } = useToastContext();

  const generate = () => {
    let chars = "";
    if (upper) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (lower) chars += "abcdefghijklmnopqrstuvwxyz";
    if (numbers) chars += "0123456789";
    if (symbols) chars += "!@#$%^&*()_+-=[]{}|;:,.<>?";
    if (!chars) { addToast("Select at least one character set", "error"); return; }
    const array = new Uint32Array(parseInt(length) || 16);
    crypto.getRandomValues(array);
    const pw = Array.from(array).map((n) => chars[n % chars.length]).join("");
    setPassword(pw);
    addToast("Password generated!", "success");
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <label className="text-sm">Length:</label>
        <Input type="number" min="4" max="128" value={length} onChange={(e) => setLength(e.target.value)} className="w-24" />
      </div>
      <div className="flex flex-wrap gap-4">
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={upper} onChange={(e) => setUpper(e.target.checked)} /> Uppercase</label>
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={lower} onChange={(e) => setLower(e.target.checked)} /> Lowercase</label>
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={numbers} onChange={(e) => setNumbers(e.target.checked)} /> Numbers</label>
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={symbols} onChange={(e) => setSymbols(e.target.checked)} /> Symbols</label>
      </div>
      <Button onClick={generate} className="w-full"><RefreshCw className="mr-1 h-4 w-4" /> Generate Password</Button>
      {password && (
        <div className="flex items-center gap-2 rounded-lg bg-muted p-4">
          <code className="flex-1 break-all text-sm font-mono">{password}</code>
          <CopyButton text={password} />
        </div>
      )}
    </div>
  );
}
