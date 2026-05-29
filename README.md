# The Tools Box

> All-in-one digital tools for creators, developers, and businesses.

The Tools Box is a fast, free, privacy-friendly collection of 75+ digital tools that run entirely in your browser. No login. No upload to a server (unless absolutely necessary). Just open and use.

## Tech Stack

- Next.js 15 (App Router) + React 19
- TypeScript
- Tailwind CSS + shadcn/ui-style primitives
- Lucide Icons
- LocalStorage for favorites and recently used
- Client-side processing (pdf-lib, browser-image-compression, qrcode, etc.)

## Categories

- Image Tools
- PDF Tools
- QR & Barcode Tools
- Text & Content Tools
- Website & SEO Tools
- Developer Tools

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
src/
  app/            # Next.js App Router pages
  components/     # Reusable UI + tool components
    ui/           # shadcn-style primitives
    tools/        # One component per tool
    layout/       # Navbar, Footer, ToolLayout
  data/
    tools.ts      # Central registry of every tool
    categories.ts # Category metadata
  hooks/          # useFavorites, useRecent, useToast, ...
  lib/
    tools/        # Pure logic per tool category
    utils.ts      # cn(), formatters, ...
  providers/      # Theme, Toast, Favorites, Recent, CommandMenu
```

Adding a new tool:

1. Add an entry to `src/data/tools.ts`.
2. Create the tool component in `src/components/tools/<slug>.tsx`.
3. Register it in `src/components/tools/registry.ts`.

That's it — routing, layout, favorites, search, and command menu pick it up automatically.
