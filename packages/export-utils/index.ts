// Export utilities for JSON, CSV, and HTML (PDF-ready) formats

import type { SelfDescribingOutput } from '@specview/core/selfDescribing';

export function exportAsJSON<T>(output: SelfDescribingOutput<T>, filename = 'export.json') {
  const blob = new Blob([JSON.stringify(output, null, 2)], { type: 'application/json' });
  triggerDownload(blob, filename);
}

export function exportAsCSV<T>(data: T[], filename = 'export.csv') {
  if (!Array.isArray(data) || data.length === 0) return;

  const keys = Object.keys(data[0]);
  const csv = [keys.join(',')].concat(
    data.map(row => keys.map(k => JSON.stringify((row as any)[k] ?? '')).join(','))
  ).join('\n');

  const blob = new Blob([csv], { type: 'text/csv' });
  triggerDownload(blob, filename);
}

export function exportAsHTML<T>(output: SelfDescribingOutput<T>, filename = 'report.html') {
  const html = `
    <html>
      <head><title>${output.component_id}</title></head>
      <body>
        <h1>${output.description}</h1>
        <pre style="background:#f4f4f4;padding:1rem;border-radius:6px;">${JSON.stringify(output, null, 2)}</pre>
      </body>
    </html>
  `;
  const blob = new Blob([html], { type: 'text/html' });
  triggerDownload(blob, filename);
}

export function triggerDownload(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}