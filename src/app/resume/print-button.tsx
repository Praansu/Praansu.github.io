'use client';

export default function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="no-print font-mono text-[13px] font-semibold uppercase tracking-[0.1em] bg-ink text-sheet dark:bg-chalk dark:text-night px-5 py-3 hover:bg-signal-deep dark:hover:bg-signal dark:hover:text-night transition-colors min-h-[44px]"
    >
      Print / Save as PDF
    </button>
  );
}
