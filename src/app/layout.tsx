import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/providers";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "The Tools Box - All-in-one Digital Tools",
  description:
    "All-in-one digital tools for creators, developers, and businesses. Fast, free, no login required. 75+ tools for images, PDFs, QR codes, text, SEO, and development.",
  keywords: [
    "tools",
    "online tools",
    "image compressor",
    "pdf merger",
    "qr generator",
    "developer tools",
    "free tools",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
