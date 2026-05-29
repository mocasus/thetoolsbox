import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="container py-12">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-violet-600">
                <span className="text-xs font-bold text-white">T</span>
              </div>
              <span className="font-bold text-foreground">The Tools Box</span>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              All-in-one digital tools for creators, developers, and businesses.
              Fast, free, no login required.
            </p>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold text-foreground">Categories</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/categories/image-tools" className="hover:text-foreground">Image Tools</Link></li>
              <li><Link href="/categories/pdf-tools" className="hover:text-foreground">PDF Tools</Link></li>
              <li><Link href="/categories/qr-barcode-tools" className="hover:text-foreground">QR & Barcode</Link></li>
              <li><Link href="/categories/text-content-tools" className="hover:text-foreground">Text & Content</Link></li>
              <li><Link href="/categories/website-seo-tools" className="hover:text-foreground">Website & SEO</Link></li>
              <li><Link href="/categories/developer-tools" className="hover:text-foreground">Developer Tools</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold text-foreground">Resources</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/tools" className="hover:text-foreground">All Tools</Link></li>
              <li><Link href="/favorites" className="hover:text-foreground">Favorites</Link></li>
              <li><Link href="/recent" className="hover:text-foreground">Recently Used</Link></li>
              <li><Link href="/request-tool" className="hover:text-foreground">Request a Tool</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold text-foreground">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/about" className="hover:text-foreground">About</Link></li>
              <li><Link href="/privacy" className="hover:text-foreground">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-foreground">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-6">
          <p className="text-center text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} The Tools Box. All tools process data in your browser. No data is sent to any server unless explicitly stated.
          </p>
        </div>
      </div>
    </footer>
  );
}
