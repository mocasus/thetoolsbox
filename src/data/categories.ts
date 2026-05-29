export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  color: string;
}

export const categories: Category[] = [
  {
    id: "image-tools",
    name: "Image Tools",
    slug: "image-tools",
    description: "Compress, resize, convert, and edit images directly in your browser.",
    icon: "🖼️",
    color: "from-violet-500 to-purple-600",
  },
  {
    id: "pdf-tools",
    name: "PDF Tools",
    slug: "pdf-tools",
    description: "Merge, split, compress, and convert PDF files without uploading.",
    icon: "📄",
    color: "from-red-500 to-rose-600",
  },
  {
    id: "qr-barcode-tools",
    name: "QR & Barcode Tools",
    slug: "qr-barcode-tools",
    description: "Generate and read QR codes and barcodes for any use case.",
    icon: "📱",
    color: "from-cyan-500 to-blue-600",
  },
  {
    id: "text-content-tools",
    name: "Text & Content Tools",
    slug: "text-content-tools",
    description: "Count, format, clean, and transform text for any platform.",
    icon: "✍️",
    color: "from-emerald-500 to-green-600",
  },
  {
    id: "website-seo-tools",
    name: "Website & SEO Tools",
    slug: "website-seo-tools",
    description: "Generate meta tags, check links, and optimize your website.",
    icon: "🌐",
    color: "from-amber-500 to-orange-600",
  },
  {
    id: "developer-tools",
    name: "Developer Tools",
    slug: "developer-tools",
    description: "Format JSON, encode/decode, generate UUIDs, and more dev utilities.",
    icon: "💻",
    color: "from-blue-500 to-indigo-600",
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
