import { Card } from "@/components/ui/card";
import { Zap, Shield, Globe, Lock, Heart, Code } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="container py-10">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold text-foreground">About The Tools Box</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          The Tools Box is a free, all-in-one collection of 75+ digital tools for
          creators, developers, and businesses. Our mission is to provide fast,
          practical tools that work directly in your browser without requiring
          login or uploading your data to any server.
        </p>

        <h2 className="mt-10 text-xl font-semibold text-foreground">Our Principles</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {[
            { icon: Shield, title: "Privacy First", desc: "Most tools process data entirely in your browser. Your files never leave your device." },
            { icon: Zap, title: "Fast & Reliable", desc: "No server round-trips means instant results. Tools work even with slow connections." },
            { icon: Lock, title: "No Login Required", desc: "Just open and use. No accounts, no email verification, no friction." },
            { icon: Heart, title: "Completely Free", desc: "All tools are free to use without limits. No premium tiers or paywalls." },
            { icon: Globe, title: "Works Everywhere", desc: "Responsive design works on desktop, tablet, and mobile browsers." },
            { icon: Code, title: "Developer Friendly", desc: "Built with modern tech and designed to be useful for developers at every level." },
          ].map((item) => (
            <Card key={item.title} className="p-5">
              <item.icon className="h-5 w-5 text-primary" />
              <h3 className="mt-2 font-semibold text-foreground">{item.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{item.desc}</p>
            </Card>
          ))}
        </div>

        <h2 className="mt-10 text-xl font-semibold text-foreground">Who Is This For?</h2>
        <ul className="mt-4 space-y-2 text-muted-foreground">
          <li>• <strong className="text-foreground">Developers</strong> — JSON formatting, encoding, regex testing, and more</li>
          <li>• <strong className="text-foreground">Content Creators</strong> — Image tools, text formatters, social media utilities</li>
          <li>• <strong className="text-foreground">Business Owners</strong> — QR codes, PDF tools, SEO generators</li>
          <li>• <strong className="text-foreground">Freelancers</strong> — All-in-one toolkit for various client needs</li>
          <li>• <strong className="text-foreground">Students</strong> — Word counters, converters, calculators</li>
          <li>• <strong className="text-foreground">Anyone</strong> — who needs quick digital tools without the hassle</li>
        </ul>
      </div>
    </div>
  );
}
