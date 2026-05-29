export default function TermsPage() {
  return (
    <div className="container py-10">
      <div className="prose prose-slate dark:prose-invert mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold text-foreground">Terms of Service</h1>
        <p className="mt-4 text-muted-foreground">Last updated: January 2025</p>

        <div className="mt-8 space-y-6 text-muted-foreground">
          <section>
            <h2 className="text-xl font-semibold text-foreground">Acceptance of Terms</h2>
            <p>By using The Tools Box, you agree to these terms. If you don&apos;t agree, please don&apos;t use our services.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">Service Description</h2>
            <p>The Tools Box provides free online digital tools for various purposes including image processing, PDF manipulation, text formatting, and more. Tools are provided &quot;as is&quot; without warranty.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">Usage</h2>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Tools are free for personal and commercial use</li>
              <li>Do not use tools for illegal purposes</li>
              <li>Do not attempt to overload or abuse the service</li>
              <li>We reserve the right to modify or discontinue tools</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">Limitation of Liability</h2>
            <p>The Tools Box is not responsible for any data loss, corruption, or damages resulting from tool usage. Always keep backups of important files before processing them.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">Intellectual Property</h2>
            <p>The Tools Box brand, design, and code are our property. The output you generate using our tools belongs to you.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">Changes</h2>
            <p>We may update these terms at any time. Continued use of the service constitutes acceptance of updated terms.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
