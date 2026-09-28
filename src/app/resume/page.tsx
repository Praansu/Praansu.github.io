import type { Metadata } from 'next';
import PrintButton from './print-button';

export const metadata: Metadata = {
  title: 'Résumé — Praansu Karmacharya, Junior AI Developer',
  description: 'One-page résumé: Junior AI Developer intern at Aviyaan Tech, BSc (Hons) Computing with AI.',
};

const CONTACT = [
  'Kathmandu, Nepal',
  '+977 9818759455',
  'Praansu12@gmail.com',
  'praansu.github.io',
  'github.com/Praansu',
];

function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-faint dark:text-chalk-dim print:text-black/60">
      {children}
    </p>
  );
}

function Rule() {
  return <hr className="border-t-2 border-ink dark:border-chalk print:border-black my-4" />;
}

export default function ResumePage() {
  return (
    <div className="min-h-screen bg-sheet text-ink dark:bg-night dark:text-chalk print:bg-white print:text-black">
      <main className="max-w-3xl mx-auto px-6 py-10 print:py-0 print:px-0 print:max-w-none">
        <div className="no-print mb-6 flex flex-wrap items-center gap-3">
          <a
            href="/"
            className="font-mono text-[13px] uppercase tracking-[0.1em] underline underline-offset-4 hover:text-signal-deep dark:hover:text-signal min-h-[44px] inline-flex items-center"
          >
            ← Back to portfolio
          </a>
          <span className="font-mono text-xs opacity-50">A4 / Letter — margins: default</span>
        </div>

        {/* Header */}
        <header>
          <h1 className="display-poster text-5xl sm:text-6xl leading-[0.95] print:text-black">
            Praansu Karmacharya
          </h1>
          <p className="font-serifit italic text-2xl mt-1 text-signal-deep dark:text-signal print:text-black">
            Junior AI Developer — ML models, RAG systems, agent loops.
          </p>
          <p className="font-mono text-xs mt-3 leading-relaxed">{CONTACT.join('  ·  ')}</p>
        </header>

        <Rule />

        {/* Summary */}
        <section>
          <Kicker>Summary</Kicker>
          <p className="mt-2 text-[15px] leading-relaxed">
            Junior AI Developer intern at Aviyaan Tech (Mar 2026 — Present), building and
            experimenting with ML models — ensemble methods for traffic-count estimation and
            road-damage segmentation and classification. BSc (Hons) Computing with AI at
            Islington College, Kathmandu (2023 — 2028). Self-directed builds in RAG pipelines,
            agent tool-calling, and vision models, each with honest evaluation.
          </p>
        </section>

        <Rule />

        {/* Experience */}
        <section>
          <Kicker>Experience</Kicker>
          <div className="mt-2">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h2 className="text-lg font-semibold">Junior AI Developer (Intern) — Aviyaan Tech</h2>
              <span className="font-mono text-xs">Mar 2026 — Present · Kathmandu</span>
            </div>
            <ul className="mt-2 space-y-1.5 text-[15px] leading-relaxed list-disc pl-5">
              <li>
                Build and experiment with ML models for vision and counting tasks, from data
                prep through training and evaluation.
              </li>
              <li>
                Ensemble methods for traffic-count estimation under varied road conditions.
              </li>
              <li>
                Road-damage segmentation and classification experiments on pavement imagery.
              </li>
              <li>
                Report per-class metrics and failure cases instead of headline accuracy, and
                iterate from there.
              </li>
            </ul>
          </div>
        </section>

        <Rule />

        {/* Projects */}
        <section>
          <Kicker>Selected projects</Kicker>
          <ul className="mt-2 space-y-3 text-[15px] leading-relaxed">
            <li>
              <strong>AI Research Agent</strong> — no-framework agent loop over private
              documents plus web search, streaming every tool call live to the browser.
              <span className="font-mono text-xs block opacity-70">
                Python · FastAPI · ChromaDB · SSE · github.com/Praansu/ai-research-agent
              </span>
            </li>
            <li>
              <strong>Small-Agent Reliability Study</strong> — 9 open-weight models (1B–9B)
              scored as tool-using agents across 31 capability and 14 reliability tasks; Qwen
              2.5 Coder 7B led at 85% composite reliability.
              <span className="font-mono text-xs block opacity-70">
                Python · Ollama · pandas · LaTeX · github.com/Praansu/small-agent-reliability
              </span>
            </li>
            <li>
              <strong>Vehicle Image Classifier</strong> — ResNet-18 transfer learning, 4
              classes, with confusion matrix and per-class accuracy; served via FastAPI,
              containerised.
              <span className="font-mono text-xs block opacity-70">
                PyTorch · FastAPI · Docker · github.com/Praansu/vehicle-image-classifier
              </span>
            </li>
            <li>
              <strong>EcoVerda (demo storefront)</strong> — full-stack e-commerce demo: cart
              persistence, credentials auth, orders and reviews.
              <span className="font-mono text-xs block opacity-70">
                Next.js 16 · TypeScript · Prisma · Stripe · praansu.github.io/eco-verda
              </span>
            </li>
          </ul>
        </section>

        <Rule />

        {/* Education */}
        <section>
          <Kicker>Education</Kicker>
          <div className="mt-2 flex flex-wrap items-baseline justify-between gap-2">
            <h2 className="text-lg font-semibold">
              BSc (Hons) Computing with AI — Islington College, Kathmandu
            </h2>
            <span className="font-mono text-xs">2023 — 2028</span>
          </div>
          <p className="mt-1 text-[15px]">Focus on machine learning, AI systems, and full-stack development.</p>
        </section>

        <Rule />

        {/* Skills */}
        <section>
          <Kicker>Skills</Kicker>
          <dl className="mt-2 space-y-1.5 text-[15px] leading-relaxed">
            <div className="flex gap-3">
              <dt className="font-mono text-xs uppercase tracking-[0.14em] w-24 shrink-0 pt-1">ML / AI</dt>
              <dd>PyTorch, scikit-learn, XGBoost, OpenCV, sentence-transformers, pandas</dd>
            </div>
            <div className="flex gap-3">
              <dt className="font-mono text-xs uppercase tracking-[0.14em] w-24 shrink-0 pt-1">LLM</dt>
              <dd>FastAPI, ChromaDB, RAG pipelines, agent tool-calling, Groq / Ollama</dd>
            </div>
            <div className="flex gap-3">
              <dt className="font-mono text-xs uppercase tracking-[0.14em] w-24 shrink-0 pt-1">Full-stack</dt>
              <dd>Next.js, TypeScript, React, Tailwind, Prisma, PostgreSQL / SQLite</dd>
            </div>
            <div className="flex gap-3">
              <dt className="font-mono text-xs uppercase tracking-[0.14em] w-24 shrink-0 pt-1">Ops</dt>
              <dd>Docker, Git / GitHub Actions, Linux / shell, LaTeX</dd>
            </div>
          </dl>
        </section>

        <div className="no-print mt-10 flex flex-wrap gap-3">
          <PrintButton />
          <p className="font-mono text-xs opacity-60 self-center">
            Tip: enable “Background graphics” for the full blueprint look.
          </p>
        </div>
      </main>
    </div>
  );
}
