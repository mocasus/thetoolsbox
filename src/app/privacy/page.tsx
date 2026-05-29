export default function PrivacyPage() {
  return (
    <div className="container py-10">
      <div className="prose prose-slate dark:prose-invert mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold text-foreground">Privacy Policy</h1>
        <p className="mt-4 text-muted-foreground">Last updated: January 2025</p>

        <div className="mt-8 space-y-6 text-muted-foreground">
          <section>
            <h2 className="text-xl font-semibold text-foreground">Data Processing</h2>
            <p>The Tools Box processes the majority of your data entirely within your browser using client-side JavaScript. This means:</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Your files are NOT uploaded to our servers</li>
              <li>Your text input is NOT stored or transmitted</li>
              <li>Processing happens on YOUR device</li>
              <li>We cannot see or access your data</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">Local Storage</h2>
            <p>We use browser LocalStorage only for:</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Saving your favorite tools (tool IDs only)</li>
              <li>Tracking recently used tools (tool IDs only)</li>
              <li>Theme preference (dark/light mode)</li>
            </ul>
            <p className="mt-2">This data stays on your device and is never sent to any server.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">Server-Side Tools</h2>
            <p>A small number of tools (clearly marked) may require server-side processing (e.g., URL checking tools). For these tools:</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Only the minimum required data is sent</li>
              <li>Data is processed and immediately discarded</li>
              <li>No data is stored or logged</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">Cookies</h2>
            <p>We do not use tracking cookies. The only cookies may be those required for basic site functionality.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">Analytics</h2>
            <p>We may use privacy-friendly analytics (no personal data collection) to understand general usage patterns and improve our tools.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">Contact</h2>
            <p>If you have questions about this policy, please reach out via the Request a Tool page.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
