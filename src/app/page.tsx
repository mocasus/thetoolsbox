"use client";

import { useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ToolCard } from "@/components/layout/tool-card";
import { categories } from "@/data/categories";
import { tools, getPopularTools, getNewTools, searchTools } from "@/data/tools";
import {
  Search,
  Zap,
  Shield,
  Globe,
  Lock,
  Heart,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export default function HomePage() {
  const [query, setQuery] = useState("");
  const popularTools = getPopularTools();
  const newTools = getNewTools();
  const searchResults = searchTools(query);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-violet-500/5 to-cyan-500/5" />
        <div className="container relative py-20 lg:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-4">
              <Sparkles className="mr-1 h-3 w-3" />
              75+ Free Online Tools
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              The Tools{" "}
              <span className="bg-gradient-to-r from-blue-500 to-violet-600 bg-clip-text text-transparent">
                Box
              </span>
            </h1>
            <p className="mt-4 text-lg text-muted-foreground sm:text-xl">
              All-in-one digital tools for creators, developers, and businesses.
              <br className="hidden sm:block" />
              Fast, free, and privacy-friendly.
            </p>

            {/* Search Bar */}
            <div className="relative mx-auto mt-8 max-w-xl">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search 75+ tools... (e.g. image compress, QR code, JSON)"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="h-12 pl-10 pr-4 text-base"
              />
              {query && searchResults.length > 0 && (
                <div className="absolute left-0 right-0 top-full z-50 mt-2 max-h-72 overflow-y-auto rounded-xl border border-border bg-card p-2 shadow-xl">
                  {searchResults.slice(0, 8).map((tool) => (
                    <Link
                      key={tool.id}
                      href={`/tools/${tool.slug}`}
                      className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm hover:bg-accent"
                    >
                      <span>{tool.icon}</span>
                      <div>
                        <p className="font-medium text-foreground">{tool.name}</p>
                        <p className="text-xs text-muted-foreground">{tool.description}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
              <span className="text-xs text-muted-foreground">Popular:</span>
              {popularTools.slice(0, 5).map((t) => (
                <Link key={t.id} href={`/tools/${t.slug}`}>
                  <Badge variant="outline" className="cursor-pointer hover:bg-accent">
                    {t.name}
                  </Badge>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="border-b border-border py-12">
        <div className="container">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {[
              { icon: Zap, label: "Fast", desc: "Instant processing" },
              { icon: Heart, label: "Free", desc: "No hidden costs" },
              { icon: Lock, label: "No Login", desc: "Use immediately" },
              { icon: Shield, label: "Private", desc: "Client-side processing" },
              { icon: Globe, label: "Browser-based", desc: "Works everywhere" },
            ].map((b) => (
              <div key={b.label} className="flex flex-col items-center gap-2 rounded-xl p-4 text-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <b.icon className="h-5 w-5 text-primary" />
                </div>
                <p className="text-sm font-medium text-foreground">{b.label}</p>
                <p className="text-xs text-muted-foreground">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16">
        <div className="container">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-foreground">Categories</h2>
            <Link href="/tools">
              <Button variant="ghost" size="sm">
                View all tools <ArrowRight className="ml-1 h-3 w-3" />
              </Button>
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((cat) => (
              <Link key={cat.id} href={`/categories/${cat.slug}`}>
                <Card className="group flex items-center gap-4 p-5 transition-all hover:border-primary/30 hover:shadow-md">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${cat.color} text-white`}>
                    <span className="text-xl">{cat.icon}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground group-hover:text-primary">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-muted-foreground">{cat.description}</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Tools */}
      <section className="border-t border-border py-16">
        <div className="container">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-foreground">Popular Tools</h2>
            <Link href="/tools">
              <Button variant="ghost" size="sm">
                See all <ArrowRight className="ml-1 h-3 w-3" />
              </Button>
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {popularTools.slice(0, 8).map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </div>
      </section>

      {/* New Tools */}
      {newTools.length > 0 && (
        <section className="border-t border-border py-16">
          <div className="container">
            <div className="mb-8 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">
                <Sparkles className="mr-2 inline h-5 w-5 text-green-500" />
                New Tools
              </h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {newTools.map((tool) => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="border-t border-border py-16">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold text-foreground">
              Can&apos;t find what you need?
            </h2>
            <p className="mt-2 text-muted-foreground">
              Request a new tool and we&apos;ll build it for you.
            </p>
            <Link href="/request-tool">
              <Button className="mt-4">Request a Tool</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
