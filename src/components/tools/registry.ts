import { type ComponentType } from "react";

// Lazy imports for code splitting
import { ImageCompressor } from "./image-compressor";
import { ImageResizer } from "./image-resizer";
import { ImageCropper } from "./image-cropper";
import { JpgToPng, PngToJpg, PngToWebp, WebpToPng } from "./image-converter";
import { ImageToBase64 } from "./image-to-base64";
import { Base64ToImage } from "./base64-to-image";
import { FaviconGenerator } from "./favicon-generator";
import { AppIconGenerator } from "./app-icon-generator";
import { WatermarkImage } from "./watermark-image";
import { ImageColorPicker } from "./image-color-picker";
import { ImageMetadataViewer } from "./image-metadata-viewer";
import { ImageToPdf } from "./image-to-pdf";

import { MergePdf } from "./merge-pdf";
import { SplitPdf } from "./split-pdf";
import { CompressPdf } from "./compress-pdf";
import { PdfToImages } from "./pdf-to-images";
import { ImagesToPdf } from "./images-to-pdf";
import { RemovePdfPages } from "./remove-pdf-pages";
import { ReorderPdfPages } from "./reorder-pdf-pages";
import { PdfPageCounter } from "./pdf-page-counter";
import { PdfMetadataViewer } from "./pdf-metadata-viewer";
import { TextToPdf } from "./text-to-pdf";

import { QrCodeGenerator } from "./qr-code-generator";
import { QrCodeReader } from "./qr-code-reader";
import {
  WifiQrGenerator,
  WhatsappQrGenerator,
  UrlQrGenerator,
  VcardQrGenerator,
  EmailQrGenerator,
  SmsQrGenerator,
} from "./qr-generators";
import { BarcodeGenerator } from "./barcode-generator";
import { BulkQrGenerator } from "./bulk-qr-generator";

import { WordCounter } from "./word-counter";
import { CharacterCounter } from "./character-counter";
import { CaseConverter } from "./case-converter";
import {
  RemoveDuplicateLines,
  SortLines,
  RemoveEmptyLines,
  RemoveExtraSpaces,
  TextCleaner,
} from "./text-tools";
import { FindAndReplace } from "./find-and-replace";
import { SlugGenerator } from "./slug-generator";
import {
  HashtagGenerator,
  CaptionFormatter,
  WhatsappFormatter,
  ReadTimeCalculator,
} from "./content-tools";
import { MarkdownPreview } from "./markdown-preview";

import { MetaTagGenerator } from "./meta-tag-generator";
import {
  OpenGraphPreview,
  TwitterCardPreview,
  RobotsTxtGenerator,
  SitemapGenerator,
  UtmBuilder,
} from "./seo-tools";
import {
  RedirectChecker,
  HttpStatusChecker,
  UrlSlugChecker,
  LinkPreviewChecker,
} from "./web-checker-tools";

import {
  JsonFormatter,
  JsonValidator,
  JsonMinifier,
  JsonToCsv,
  CsvToJson,
} from "./json-tools";
import {
  Base64EncodeDecode,
  UrlEncodeDecode,
  JwtDecoder,
  UuidGenerator,
  PasswordGenerator,
} from "./dev-tools";
import {
  HashGenerator,
  RegexTester,
  DiffChecker,
  UnixTimestampConverter,
  CronParser,
} from "./dev-tools-2";

const registry: Record<string, ComponentType> = {
  // Image Tools
  "image-compressor": ImageCompressor,
  "image-resizer": ImageResizer,
  "image-cropper": ImageCropper,
  "jpg-to-png": JpgToPng,
  "png-to-jpg": PngToJpg,
  "png-to-webp": PngToWebp,
  "webp-to-png": WebpToPng,
  "image-to-base64": ImageToBase64,
  "base64-to-image": Base64ToImage,
  "favicon-generator": FaviconGenerator,
  "app-icon-generator": AppIconGenerator,
  "watermark-image": WatermarkImage,
  "image-color-picker": ImageColorPicker,
  "image-metadata-viewer": ImageMetadataViewer,
  "image-to-pdf": ImageToPdf,

  // PDF Tools
  "merge-pdf": MergePdf,
  "split-pdf": SplitPdf,
  "compress-pdf": CompressPdf,
  "pdf-to-images": PdfToImages,
  "images-to-pdf": ImagesToPdf,
  "remove-pdf-pages": RemovePdfPages,
  "reorder-pdf-pages": ReorderPdfPages,
  "pdf-page-counter": PdfPageCounter,
  "pdf-metadata-viewer": PdfMetadataViewer,
  "text-to-pdf": TextToPdf,

  // QR & Barcode Tools
  "qr-code-generator": QrCodeGenerator,
  "qr-code-reader": QrCodeReader,
  "wifi-qr-generator": WifiQrGenerator,
  "whatsapp-qr-generator": WhatsappQrGenerator,
  "url-qr-generator": UrlQrGenerator,
  "vcard-qr-generator": VcardQrGenerator,
  "email-qr-generator": EmailQrGenerator,
  "sms-qr-generator": SmsQrGenerator,
  "barcode-generator": BarcodeGenerator,
  "bulk-qr-generator": BulkQrGenerator,

  // Text & Content Tools
  "word-counter": WordCounter,
  "character-counter": CharacterCounter,
  "case-converter": CaseConverter,
  "remove-duplicate-lines": RemoveDuplicateLines,
  "sort-lines": SortLines,
  "remove-empty-lines": RemoveEmptyLines,
  "remove-extra-spaces": RemoveExtraSpaces,
  "find-and-replace": FindAndReplace,
  "text-cleaner": TextCleaner,
  "slug-generator": SlugGenerator,
  "hashtag-generator": HashtagGenerator,
  "caption-formatter": CaptionFormatter,
  "whatsapp-formatter": WhatsappFormatter,
  "markdown-preview": MarkdownPreview,
  "read-time-calculator": ReadTimeCalculator,

  // Website & SEO Tools
  "meta-tag-generator": MetaTagGenerator,
  "open-graph-preview": OpenGraphPreview,
  "twitter-card-preview": TwitterCardPreview,
  "robots-txt-generator": RobotsTxtGenerator,
  "sitemap-generator": SitemapGenerator,
  "utm-builder": UtmBuilder,
  "redirect-checker": RedirectChecker,
  "http-status-checker": HttpStatusChecker,
  "url-slug-checker": UrlSlugChecker,
  "link-preview-checker": LinkPreviewChecker,

  // Developer Tools
  "json-formatter": JsonFormatter,
  "json-validator": JsonValidator,
  "json-minifier": JsonMinifier,
  "json-to-csv": JsonToCsv,
  "csv-to-json": CsvToJson,
  "base64-encode-decode": Base64EncodeDecode,
  "url-encode-decode": UrlEncodeDecode,
  "jwt-decoder": JwtDecoder,
  "uuid-generator": UuidGenerator,
  "password-generator": PasswordGenerator,
  "hash-generator": HashGenerator,
  "regex-tester": RegexTester,
  "diff-checker": DiffChecker,
  "unix-timestamp-converter": UnixTimestampConverter,
  "cron-parser": CronParser,
};

export function getToolComponent(slug: string): ComponentType | null {
  return registry[slug] || null;
}
