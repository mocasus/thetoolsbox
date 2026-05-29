"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { useToastContext } from "@/providers/toast-provider";
import { Download } from "lucide-react";

function QrResult({ dataUrl }: { dataUrl: string }) {
  if (!dataUrl) return null;
  return (
    <div className="flex flex-col items-center gap-3 rounded-lg border border-border p-6">
      <img src={dataUrl} alt="QR Code" className="rounded" />
      <Button variant="outline" size="sm" onClick={() => { const a = document.createElement("a"); a.href = dataUrl; a.download = "qrcode.png"; a.click(); }}>
        <Download className="mr-1 h-3 w-3" /> Download
      </Button>
    </div>
  );
}

async function generateQR(text: string): Promise<string> {
  const QRCode = (await import("qrcode")).default;
  return QRCode.toDataURL(text, { width: 256, margin: 2 });
}

export function WifiQrGenerator() {
  const [ssid, setSsid] = useState("");
  const [password, setPassword] = useState("");
  const [encryption, setEncryption] = useState("WPA");
  const [qr, setQr] = useState("");
  const { addToast } = useToastContext();

  const generate = async () => {
    if (!ssid.trim()) { addToast("Please enter WiFi name", "error"); return; }
    const wifiString = `WIFI:T:${encryption};S:${ssid};P:${password};;`;
    setQr(await generateQR(wifiString));
    addToast("WiFi QR generated!", "success");
  };

  return (
    <div className="space-y-4">
      <Input placeholder="WiFi Name (SSID)" value={ssid} onChange={(e) => setSsid(e.target.value)} />
      <Input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <Select value={encryption} onChange={(e) => setEncryption(e.target.value)} options={[
        { value: "WPA", label: "WPA/WPA2" }, { value: "WEP", label: "WEP" }, { value: "nopass", label: "None" },
      ]} />
      <Button onClick={generate} className="w-full">Generate WiFi QR</Button>
      <QrResult dataUrl={qr} />
    </div>
  );
}

export function WhatsappQrGenerator() {
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [qr, setQr] = useState("");
  const { addToast } = useToastContext();

  const generate = async () => {
    if (!phone.trim()) { addToast("Please enter phone number", "error"); return; }
    const url = `https://wa.me/${phone.replace(/[^0-9]/g, "")}${message ? `?text=${encodeURIComponent(message)}` : ""}`;
    setQr(await generateQR(url));
    addToast("WhatsApp QR generated!", "success");
  };

  return (
    <div className="space-y-4">
      <Input placeholder="Phone number (with country code, e.g. 628123456789)" value={phone} onChange={(e) => setPhone(e.target.value)} />
      <Textarea placeholder="Pre-filled message (optional)" value={message} onChange={(e) => setMessage(e.target.value)} className="min-h-[80px]" />
      <Button onClick={generate} className="w-full">Generate WhatsApp QR</Button>
      <QrResult dataUrl={qr} />
    </div>
  );
}

export function UrlQrGenerator() {
  const [url, setUrl] = useState("");
  const [qr, setQr] = useState("");
  const { addToast } = useToastContext();

  const generate = async () => {
    if (!url.trim()) { addToast("Please enter a URL", "error"); return; }
    setQr(await generateQR(url));
    addToast("URL QR generated!", "success");
  };

  return (
    <div className="space-y-4">
      <Input placeholder="https://example.com" value={url} onChange={(e) => setUrl(e.target.value)} />
      <Button onClick={generate} className="w-full">Generate URL QR</Button>
      <QrResult dataUrl={qr} />
    </div>
  );
}

export function VcardQrGenerator() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [org, setOrg] = useState("");
  const [qr, setQr] = useState("");
  const { addToast } = useToastContext();

  const generate = async () => {
    if (!name.trim()) { addToast("Please enter name", "error"); return; }
    const vcard = `BEGIN:VCARD\nVERSION:3.0\nFN:${name}\nTEL:${phone}\nEMAIL:${email}\nORG:${org}\nEND:VCARD`;
    setQr(await generateQR(vcard));
    addToast("vCard QR generated!", "success");
  };

  return (
    <div className="space-y-4">
      <Input placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} />
      <Input placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
      <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <Input placeholder="Organization" value={org} onChange={(e) => setOrg(e.target.value)} />
      <Button onClick={generate} className="w-full">Generate vCard QR</Button>
      <QrResult dataUrl={qr} />
    </div>
  );
}

export function EmailQrGenerator() {
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [qr, setQr] = useState("");
  const { addToast } = useToastContext();

  const generate = async () => {
    if (!email.trim()) { addToast("Please enter email", "error"); return; }
    const mailto = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setQr(await generateQR(mailto));
    addToast("Email QR generated!", "success");
  };

  return (
    <div className="space-y-4">
      <Input placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} />
      <Input placeholder="Subject" value={subject} onChange={(e) => setSubject(e.target.value)} />
      <Textarea placeholder="Body (optional)" value={body} onChange={(e) => setBody(e.target.value)} className="min-h-[80px]" />
      <Button onClick={generate} className="w-full">Generate Email QR</Button>
      <QrResult dataUrl={qr} />
    </div>
  );
}

export function SmsQrGenerator() {
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [qr, setQr] = useState("");
  const { addToast } = useToastContext();

  const generate = async () => {
    if (!phone.trim()) { addToast("Please enter phone number", "error"); return; }
    const sms = `sms:${phone}${message ? `?body=${encodeURIComponent(message)}` : ""}`;
    setQr(await generateQR(sms));
    addToast("SMS QR generated!", "success");
  };

  return (
    <div className="space-y-4">
      <Input placeholder="Phone number" value={phone} onChange={(e) => setPhone(e.target.value)} />
      <Textarea placeholder="Message (optional)" value={message} onChange={(e) => setMessage(e.target.value)} className="min-h-[80px]" />
      <Button onClick={generate} className="w-full">Generate SMS QR</Button>
      <QrResult dataUrl={qr} />
    </div>
  );
}
