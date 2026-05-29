<div align="center">

# 🧰 The Tools Box

### All-in-one digital tools for creators, developers, and businesses.

A fast, free, and privacy-friendly collection of **75+ digital tools** that run
entirely in your browser. No login. No sign-up. No uploading your files to a
server. Just open a tool and use it.

<p>
  <img alt="Next.js" src="https://img.shields.io/badge/Next.js-15-black?logo=next.js" />
  <img alt="React" src="https://img.shields.io/badge/React-19-149eca?logo=react" />
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5.7-3178c6?logo=typescript" />
  <img alt="Tailwind CSS" src="https://img.shields.io/badge/Tailwind_CSS-3.4-38bdf8?logo=tailwindcss" />
  <img alt="License" src="https://img.shields.io/badge/license-MIT-green" />
</p>

</div>

---

## 📑 Table of Contents

- [Features](#-features)
- [Tool Categories](#-tool-categories)
- [Tech Stack](#-tech-stack)
- [Quick Start](#-quick-start)
- [Available Scripts](#-available-scripts)
- [Project Structure](#-project-structure)
- [Adding a New Tool](#-adding-a-new-tool)
- [Architecture Notes](#-architecture-notes)
- [Keyboard Shortcuts](#-keyboard-shortcuts)
- [Privacy](#-privacy)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)


---

## ✨ Features

- ⚡ **Fast** — Tools run client-side, so results are instant with no network round-trips.
- 🆓 **Free** — Every tool is free to use, with no limits or paywalls.
- 🔓 **No login** — Open any tool and start working immediately.
- 🔒 **Privacy-friendly** — Files and text are processed in your browser and never uploaded.
- 🌗 **Dark & light mode** — Premium SaaS-style UI that respects your system theme.
- 🔍 **Instant search** — Find any tool in real time, or hit `Ctrl/⌘ + K` for the command menu.
- ⭐ **Favorites** — Save the tools you use most (stored in LocalStorage).
- 🕘 **Recently used** — Quickly jump back to tools you opened recently.
- 🔗 **Related tools** — Every tool page suggests relevant alternatives.
- 📱 **Responsive** — Works on desktop, tablet, and mobile.
- 🧩 **Extensible** — A central registry makes adding new tools trivial (scales to 150+).

## 🗂 Tool Categories

| Category | Count | Examples |
| --- | --- | --- |
| 🖼️ **Image Tools** | 15 | Compressor, Resizer, Cropper, JPG/PNG/WebP converters, Favicon & App Icon generators, Watermark, Color Picker, Metadata Viewer |
| 📄 **PDF Tools** | 10 | Merge, Split, Compress, Images↔PDF, Remove/Reorder Pages, Page Counter, Metadata Viewer, Text to PDF |
| 📱 **QR & Barcode Tools** | 10 | QR Generator/Reader, WiFi/WhatsApp/URL/vCard/Email/SMS QR, Barcode Generator, Bulk QR |
| ✍️ **Text & Content Tools** | 15 | Word/Character Counter, Case Converter, Sort/Dedupe Lines, Find & Replace, Slug/Hashtag Generator, Markdown Preview, Read Time |
| 🌐 **Website & SEO Tools** | 10 | Meta Tag Generator, OG/Twitter Preview, Robots.txt & Sitemap Generators, UTM Builder, Redirect/HTTP/Slug Checkers |
| 💻 **Developer Tools** | 15 | JSON Format/Validate/Minify/Convert, Base64/URL Encode, JWT Decoder, UUID/Password/Hash Generators, Regex Tester, Diff Checker, Cron Parser |

> **75 tools total.** The full, source-of-truth list lives in [`src/data/tools.ts`](src/data/tools.ts).


## 🛠 Tech Stack

| Area | Choice |
| --- | --- |
| Framework | [Next.js 15](https://nextjs.org/) (App Router) + [React 19](https://react.dev/) |
| Language | [TypeScript](https://www.typescriptlang.org/) |
| Styling | [Tailwind CSS](https://tailwindcss.com/) + shadcn/ui-style primitives |
| Icons | [Lucide](https://lucide.dev/) |
| Theming | [next-themes](https://github.com/pacocoursey/next-themes) (dark/light) |
| Command menu | [cmdk](https://cmdk.paco.me/) |
| PDF | [pdf-lib](https://pdf-lib.js.org/) |
| QR / Barcode | [qrcode](https://github.com/soldair/node-qrcode), [jsbarcode](https://github.com/lindell/JsBarcode), [html5-qrcode](https://github.com/mebjas/html5-qrcode) |
| Markdown | [marked](https://marked.js.org/) |
| Image EXIF | [exifr](https://github.com/MikeKovarik/exifr) |
| Cron | [cronstrue](https://github.com/bradymholt/cRonstrue) |
| Persistence | Browser `LocalStorage` (favorites, recents, theme) |

## 🚀 Quick Start

### Prerequisites

- **Node.js** `18.18+` or newer (Node `20`/`22` LTS recommended)
- **npm** `9+` (ships with Node) — or use `pnpm` / `yarn` if you prefer

Check your versions:

```bash
node -v
npm -v
```


### 1. Clone the repository

```bash
git clone https://github.com/mocasus/thetoolsbox.git
cd thetoolsbox
```

### 2. Install dependencies

```bash
npm install
# or: pnpm install
# or: yarn install
```

### 3. Start the development server

```bash
npm run dev
```

Open [**http://localhost:3000**](http://localhost:3000) in your browser. The page
hot-reloads as you edit files.

### 4. Build for production

```bash
npm run build   # create an optimized production build
npm run start   # serve the production build at http://localhost:3000
```

> 💡 **No environment variables required.** The app runs fully client-side out of
> the box — there is nothing to configure to get started.


## 📜 Available Scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Start the development server with hot reload |
| `npm run build` | Create an optimized production build |
| `npm run start` | Serve the production build (run `build` first) |
| `npm run lint` | Run ESLint across the project |

## 📁 Project Structure

```text
thetoolsbox/
├─ src/
│  ├─ app/                     # Next.js App Router pages
│  │  ├─ page.tsx              # Homepage (hero, search, categories)
│  │  ├─ layout.tsx            # Root layout + global providers
│  │  ├─ tools/                # /tools and /tools/[slug]
│  │  ├─ categories/[category] # Category listing pages
│  │  ├─ favorites/            # Saved favorite tools
│  │  ├─ recent/               # Recently used tools
│  │  ├─ about/ privacy/ terms/ request-tool/
│  │  └─ globals.css           # Tailwind + theme tokens
│  ├─ components/
│  │  ├─ ui/                   # Reusable primitives (button, card, input, ...)
│  │  ├─ layout/               # Navbar, Footer, ToolCard, ToolLayout
│  │  └─ tools/                # One component (or group) per tool
│  │     └─ registry.ts        # Maps a tool slug → its component
│  ├─ data/
│  │  ├─ tools.ts              # ⭐ Central registry of every tool (metadata)
│  │  └─ categories.ts         # Category metadata
│  ├─ hooks/                   # useToast, useFavorites, useRecent
│  ├─ lib/
│  │  └─ utils.ts              # cn(), file/clipboard/format helpers
│  └─ providers/               # Theme, Toast, Favorites, Recent, CommandMenu
├─ tailwind.config.ts
├─ next.config.ts
└─ tsconfig.json
```


## ➕ Adding a New Tool

The app is built so that adding a tool takes **three small steps**. Routing,
search, the command menu, favorites, and the tool layout all pick it up
automatically.

### Step 1 — Register the tool's metadata

Add an entry to the `tools` array in [`src/data/tools.ts`](src/data/tools.ts):

```ts
{
  id: "word-reverser",
  name: "Word Reverser",
  slug: "word-reverser",              // becomes /tools/word-reverser
  category: "Text & Content Tools",
  categorySlug: "text-content-tools", // must match a category slug
  description: "Reverse the words in any text",
  longDescription: "Reverse the order of words while keeping characters intact.",
  icon: "🔁",
  tags: ["text", "reverse", "words"],
  isPopular: false,
  isNew: true,
  isClientSide: true,                 // shows the privacy badge + note
  relatedTools: ["case-converter", "word-counter"],
  useCases: ["Fun text effects", "Puzzles", "Testing"],
}
```

### Step 2 — Build the tool component

Create `src/components/tools/word-reverser.tsx`:

```tsx
"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/ui/copy-button";

export function WordReverser() {
  const [input, setInput] = useState("");
  const output = input.split(" ").reverse().join(" ");

  return (
    <div className="space-y-4">
      <Textarea value={input} onChange={(e) => setInput(e.target.value)} />
      {output && (
        <div className="flex items-center justify-between">
          <p className="font-mono text-sm">{output}</p>
          <CopyButton text={output} />
        </div>
      )}
    </div>
  );
}
```


### Step 3 — Wire it into the registry

Import and map it by slug in
[`src/components/tools/registry.ts`](src/components/tools/registry.ts):

```ts
import { WordReverser } from "./word-reverser";

const registry: Record<string, ComponentType> = {
  // ...existing tools
  "word-reverser": WordReverser,
};
```

That's it. Visit `/tools/word-reverser` and the tool is live — complete with its
layout, category badge, related tools, favorites button, and search/command-menu
entries.

> Tools that don't have a component yet render a friendly "coming soon"
> placeholder, so you can register metadata first and build the UI later.

## 🧠 Architecture Notes

- **Single source of truth.** `src/data/tools.ts` drives the homepage, `/tools`,
  category pages, search, and the command menu. Update one file, everything stays
  in sync.
- **Reusable `ToolLayout`.** Every tool page wraps its component in
  `ToolLayout`, which renders the title, category badge, privacy note, use cases,
  and related tools — so individual tools only implement their core logic.
- **Reusable UI primitives.** `src/components/ui/` provides `Button`, `Card`,
  `Input`, `Textarea`, `Select`, `FileUpload`, `CopyButton`, and
  `DownloadButton` for a consistent look and behavior.
- **Providers.** Global state (theme, toasts, favorites, recents, command menu)
  is composed in `src/providers/index.tsx` and mounted once in the root layout.
- **Lazy-loaded heavy libs.** Libraries like `pdf-lib`, `qrcode`, `marked`, and
  `exifr` are dynamically imported inside the tools that need them, keeping the
  initial bundle small.

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
| --- | --- |
| `Ctrl + K` / `⌘ + K` | Open the command menu to search & jump to any tool |
| `Esc` | Close the command menu |


## 🔒 Privacy

The Tools Box is designed to be privacy-first:

- The vast majority of tools process your data **entirely in the browser** —
  files and text never leave your device.
- `LocalStorage` is used **only** for your favorites, recently used tools, and
  theme preference. None of this is sent anywhere.
- A small number of tools (clearly marked, e.g. URL/HTTP checkers) need
  server-side requests to function. These are the exception, not the rule.

See [`/privacy`](src/app/privacy/page.tsx) in the app for full details.

## ☁️ Deployment

This is a standard Next.js app and deploys anywhere Next.js is supported.

### Deploy to Vercel (recommended)

1. Push your fork to GitHub.
2. Import the repository at [vercel.com/new](https://vercel.com/new).
3. Keep the defaults (Vercel auto-detects Next.js) and click **Deploy**.

No environment variables are required.

### Self-host

```bash
npm run build
npm run start   # serves on port 3000 by default (PORT=4000 npm run start to change)
```

## 🤝 Contributing

Contributions are welcome! A typical flow:

1. Fork the repo and create a branch: `git checkout -b feat/my-tool`.
2. Add your tool following [Adding a New Tool](#-adding-a-new-tool).
3. Run `npm run build` to make sure everything compiles.
4. Open a pull request describing your change.

Have an idea but no time to build it? Use the in-app
[**Request a Tool**](src/app/request-tool/page.tsx) page.

## 📄 License

Released under the [MIT License](LICENSE). You're free to use, modify, and
distribute it.

---

<div align="center">
  <sub>Built with ❤️ using Next.js, TypeScript, and Tailwind CSS.</sub>
</div>
