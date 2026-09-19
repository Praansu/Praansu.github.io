'use client';

import { useEffect, useState } from 'react';
import { motion, useScroll, useSpring, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, ArrowDown } from 'lucide-react';
import { ThemeProvider } from '@/components/ThemeProvider';
import { DarkModeToggle } from '@/components/DarkModeToggle';
import { Reveal, MaskLines, Rule } from '@/components/Reveal';
import { projects, skills, experience, freelanceServices } from '@/lib/data';

function ScrollProgress() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 });
  if (reduce) return null;
  return (
    <motion.div
      aria-hidden
      className="fixed top-0 left-0 right-0 z-[70] h-[3px] origin-left bg-signal"
      style={{ scaleX }}
    />
  );
}

/** Live Kathmandu time. Renders after mount so SSR never mismatches. */
function KtClock() {
  const [now, setNow] = useState<string | null>(null);
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZone: 'Asia/Kathmandu',
    });
    const tick = () => setNow(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return <span className="tabular-nums">{now ?? '--:--:--'}</span>;
}

const NAV = [
  { n: '01', label: 'Work', href: '#work' },
  { n: '02', label: 'Stack', href: '#stack' },
  { n: '03', label: 'Record', href: '#record' },
  { n: '04', label: 'Hire', href: '#hire' },
  { n: '05', label: 'Contact', href: '#contact' },
];

const TICKER = [
  'PyTorch',
  'RAG pipelines',
  'Agent tool-calling',
  'FastAPI',
  'Next.js',
  'TypeScript',
  'ChromaDB',
  'Docker',
  'YOLO',
  'OpenCV',
];

function SectionHead({
  n,
  kick,
  title,
  accent,
  standfirst,
}: {
  n: string;
  kick: string;
  title: string;
  accent?: string;
  standfirst?: string;
}) {
  return (
    <div className="mb-10 sm:mb-14 relative">
      <span aria-hidden className="ghost-numeral absolute -top-10 sm:-top-16 right-0 text-[6rem] sm:text-[10rem]">
        {n}
      </span>
      <Reveal>
        <p className="font-mono text-xs tracking-[0.22em] uppercase text-stamp dark:text-stamp-pale mb-4">
          FIG. {n} — {kick}
        </p>
      </Reveal>
      <Reveal delay={0.06}>
        <h2 className="display-poster text-5xl sm:text-7xl text-balance">
          {title}{' '}
          {accent && (
            <span className="font-serifit italic normal-case font-normal text-signal-deep dark:text-signal">
              {accent}
            </span>
          )}
        </h2>
      </Reveal>
      {standfirst && (
        <Reveal delay={0.12}>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft dark:text-chalk-dim">
            {standfirst}
          </p>
        </Reveal>
      )}
    </div>
  );
}

/** Ruler-tick proficiency bar. */
function Ticks({ level, name }: { level: number; name: string }) {
  return (
    <span
      role="img"
      aria-label={`${name}: ${level} out of 100`}
      className="relative block h-3 w-28 shrink-0 border border-ink dark:border-chalk overflow-hidden"
    >
      <span
        aria-hidden
        className="absolute inset-y-0 left-0 bg-ink dark:bg-chalk"
        style={{ width: `${level}%` }}
      />
      <span
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage:
            'repeating-linear-gradient(to right, transparent 0, transparent 9px, rgba(128,128,128,0.55) 9px, rgba(128,128,128,0.55) 10px)',
        }}
      />
    </span>
  );
}

export default function Home() {
  return (
    <ThemeProvider>
      <ScrollProgress />
      <div className="min-h-screen relative z-[1]">
        {/* Masthead */}
        <nav className="fixed top-0 left-0 right-0 z-50 border-b-2 border-ink dark:border-chalk bg-sheet/90 dark:bg-night/90 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto px-5 sm:px-8">
            <div className="flex items-center justify-between h-16 gap-4">
              <a href="#top" className="flex items-center gap-2.5 shrink-0">
                <span className="font-mono text-[11px] font-bold border-2 border-ink dark:border-chalk px-1.5 py-0.5">
                  PK—26
                </span>
                <span className="font-grotesk font-bold tracking-tight hidden sm:inline">
                  Praansu Karmacharya
                </span>
              </a>
              <div className="hidden md:flex items-center gap-7">
                {NAV.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="font-mono text-[13px] text-ink-soft dark:text-chalk-dim hover:text-stamp dark:hover:text-stamp-pale transition-colors"
                  >
                    <span className="opacity-50 mr-1">{item.n}</span>
                    {item.label}
                  </a>
                ))}
              </div>
              <div className="flex items-center gap-3">
                <span className="hidden lg:inline font-mono text-xs text-ink-faint dark:text-chalk-dim">
                  KTM <KtClock />
                </span>
                <a
                  href="#contact"
                  className="hidden sm:inline-flex font-mono text-[13px] font-semibold uppercase tracking-[0.1em] bg-ink text-sheet dark:bg-chalk dark:text-night px-4 py-2 hover:bg-signal-deep dark:hover:bg-signal dark:hover:text-night transition-colors min-h-[44px] items-center"
                >
                  Hire me
                </a>
                <DarkModeToggle />
              </div>
            </div>
            <div className="md:hidden flex gap-5 overflow-x-auto pb-3 -mt-1">
              {NAV.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="font-mono text-xs text-ink-soft dark:text-chalk-dim whitespace-nowrap py-1"
                >
                  <span className="opacity-50 mr-1">{item.n}</span>
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </nav>

        {/* Hero */}
        <header id="top" className="pt-32 sm:pt-40 pb-10 sm:pb-14 px-5 sm:px-8">
          <div className="max-w-6xl mx-auto relative">
            <Reveal>
              <div className="flex flex-wrap items-center gap-3 mb-8">
                <span className="sticker text-signal-deep dark:text-signal border-signal-deep dark:border-signal">
                  ● Open to work
                </span>
                <span className="font-mono text-xs text-ink-faint dark:text-chalk-dim">
                  SHEET 001 / 2026 — REV C
                </span>
              </div>
            </Reveal>
            <h1 className="display-poster text-[19vw] sm:text-[7.5rem] lg:text-[9rem]">
              <MaskLines
                lines={[
                  <>Machine</>,
                  <span key="o" className="ghost-numeral text-[19vw] sm:text-[7.5rem] lg:text-[9rem]">
                    Learning
                  </span>,
                ]}
              />
            </h1>
            <Reveal delay={0.1}>
              <p className="font-serifit italic text-3xl sm:text-5xl mt-2 text-ink dark:text-chalk">
                engineer <span className="text-signal-deep dark:text-signal">that ships.</span>
              </p>
            </Reveal>

            <div className="grid lg:grid-cols-[1fr_300px] gap-10 mt-10 items-start">
              <Reveal delay={0.15}>
                <p className="text-lg sm:text-xl leading-relaxed text-ink-soft dark:text-chalk-dim max-w-2xl">
                  I&apos;m Praansu — CS student in Kathmandu, 6 months as a{' '}
                  <strong className="text-ink dark:text-chalk font-semibold">Junior AI Developer</strong>{' '}
                  at Aviyaan Tech.
                  I work in PyTorch, RAG pipelines, and agent tool-calling, and I build the
                  full-stack products around them. Every project below exists because I wanted
                  to learn one specific thing properly.
                </p>
                <div className="grid grid-cols-3 gap-6 border-t-2 border-ink dark:border-chalk mt-10 pt-6 max-w-2xl">
                  {[
                    { v: String(projects.length).padStart(2, '0'), l: 'Builds shipped' },
                    { v: String(Object.keys(skills).length).padStart(2, '0'), l: 'Stack areas' },
                    { v: String(experience.length).padStart(2, '0'), l: 'Working roles' },
                  ].map((s) => (
                    <div key={s.l}>
                      <dd className="display-poster text-4xl sm:text-5xl">{s.v}</dd>
                      <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-faint dark:text-chalk-dim mt-1">
                        {s.l}
                      </dt>
                    </div>
                  ))}
                </div>
              </Reveal>
              <Reveal delay={0.22}>
                <dl className="font-mono text-xs leading-loose border-2 border-ink dark:border-chalk p-5 bg-sheet-dim/60 dark:bg-night-raised/60">
                  <div className="flex justify-between gap-3 border-b border-ink/20 dark:border-chalk/20 pb-2">
                    <dt className="uppercase tracking-[0.18em] opacity-70">Role</dt>
                    <dd className="text-right">Junior AI Developer</dd>
                  </div>
                  <div className="flex justify-between gap-3 border-b border-ink/20 dark:border-chalk/20 py-2">
                    <dt className="uppercase tracking-[0.18em] opacity-70">Status</dt>
                    <dd className="text-right inline-flex items-center gap-2">
                      <span aria-hidden className="w-2 h-2 rounded-full bg-signal motion-safe:animate-pulse" />
                      Open to freelance
                    </dd>
                  </div>
                  <div className="flex justify-between gap-3 border-b border-ink/20 dark:border-chalk/20 py-2">
                    <dt className="uppercase tracking-[0.18em] opacity-70">Base</dt>
                    <dd className="text-right">Kathmandu, NPT</dd>
                  </div>
                  <div className="flex justify-between gap-3 border-b border-ink/20 dark:border-chalk/20 py-2">
                    <dt className="uppercase tracking-[0.18em] opacity-70">Local</dt>
                    <dd className="text-right">
                      <KtClock />
                    </dd>
                  </div>
                  <div className="flex justify-between gap-3 border-b border-ink/20 dark:border-chalk/20 py-2">
                    <dt className="uppercase tracking-[0.18em] opacity-70">Mail</dt>
                    <dd>
                      <a
                        href="mailto:Praansu12@gmail.com"
                        className="underline underline-offset-4 hover:text-stamp dark:hover:text-stamp-pale transition-colors break-all"
                      >
                        Praansu12@gmail.com
                      </a>
                    </dd>
                  </div>
                  <div className="flex justify-between gap-3 pt-2">
                    <dt className="uppercase tracking-[0.18em] opacity-70">Else</dt>
                    <dd className="flex gap-3">
                      <a
                        href="https://github.com/Praansu"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline underline-offset-4 hover:text-stamp dark:hover:text-stamp-pale transition-colors"
                      >
                        GitHub
                      </a>
                      <a
                        href="https://np.linkedin.com/in/praansu-karmacharya-694944368"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline underline-offset-4 hover:text-stamp dark:hover:text-stamp-pale transition-colors"
                      >
                        LinkedIn
                      </a>
                    </dd>
                  </div>
                </dl>
              </Reveal>
            </div>

            {/* Rotating badge */}
            <div aria-hidden className="hidden lg:block absolute top-6 right-2 w-32 h-32">
              <svg viewBox="0 0 100 100" className="slow-spin w-full h-full">
                <defs>
                  <path id="circ" d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" />
                </defs>
                <text className="font-mono" fontSize="10.5" letterSpacing="2.5" fill="currentColor">
                  <textPath href="#circ">OPEN TO WORK • OPEN TO WORK •</textPath>
                </text>
              </svg>
              <ArrowDown className="absolute inset-0 m-auto w-5 h-5" />
            </div>

            <Reveal delay={0.15}>
              <p className="mt-12 font-mono text-xs text-ink-faint dark:text-chalk-dim flex items-center gap-2">
                <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
                Scroll — the work is below
              </p>
            </Reveal>
          </div>
        </header>

        {/* Ticker band */}
        <div aria-hidden className="border-y-2 border-ink dark:border-chalk bg-ink text-sheet dark:bg-chalk dark:text-night overflow-hidden py-2.5 select-none">
          <div className="ticker-track font-mono text-[13px] uppercase tracking-[0.2em]">
            {[0, 1].map((copy) => (
              <span key={copy} className="flex shrink-0">
                {TICKER.map((t) => (
                  <span key={`${copy}-${t}`} className="px-5 whitespace-nowrap">
                    {t} <span className="text-signal dark:text-signal-deep pl-5">✳</span>
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>

        {/* 01 — Work */}
        <section id="work" className="py-16 sm:py-24 px-5 sm:px-8">
          <div className="max-w-6xl mx-auto">
            <SectionHead
              n="01"
              kick="Selected work"
              title="Work that taught"
              accent="me something."
              standfirst="Seven builds, each chasing one question — agent loops without frameworks, RAG that deletes properly, classifiers measured honestly. No tutorials, no copy-paste."
            />
            <ol>
              {projects.map((project, index) => (
                <li key={project.name}>
                  <Reveal>
                    <article className="fill-sweep group grid sm:grid-cols-[72px_1fr] gap-2 sm:gap-6 py-9 sm:py-10 border-t-2 border-ink dark:border-chalk last:border-b-2 px-2 sm:px-4 -mx-2 sm:-mx-4">
                      <span className="display-poster text-4xl sm:text-5xl sweep-dim text-ink/30 dark:text-chalk/30 pt-1">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <div>
                        <h3 className="display-poster text-3xl sm:text-5xl">{project.name}</h3>
                        <p className="mt-2 font-serifit italic text-xl text-signal-deep dark:text-signal">
                          {project.highlight}
                        </p>
                        <p className="sweep-dim mt-3 leading-relaxed text-ink-soft dark:text-chalk-dim max-w-2xl">
                          {project.description}
                        </p>
                        <p className="sweep-dim mt-4 font-mono text-xs tracking-wide text-ink-faint dark:text-chalk-dim">
                          {project.tech.join(' · ')}
                        </p>
                        <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 font-mono text-[13px] font-semibold uppercase tracking-[0.12em] underline underline-offset-4 min-h-[44px]"
                          >
                            GitHub <ArrowUpRight className="w-3.5 h-3.5" />
                          </a>
                          {project.demo && (
                            <a
                              href={project.demo}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 font-mono text-[13px] font-semibold uppercase tracking-[0.12em] underline underline-offset-4 min-h-[44px]"
                            >
                              Live demo <ArrowUpRight className="w-3.5 h-3.5" />
                            </a>
                          )}
                        </div>
                      </div>
                    </article>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* 02 — Stack */}
        <section id="stack" className="py-16 sm:py-24 px-5 sm:px-8">
          <div className="max-w-6xl mx-auto">
            <SectionHead
              n="02"
              kick="Capabilities"
              title="What I reach"
              accent="for."
              standfirst="Depth in ML and LLM systems, enough full-stack to ship them alone. Every entry here was earned by a project that needed it."
            />
            <div className="grid md:grid-cols-2 gap-x-14">
              {Object.entries(skills).map(([category, items], ci) => (
                <Reveal key={category} delay={Math.min(ci * 0.05, 0.2)}>
                  <div className="py-8 border-t-2 border-ink dark:border-chalk">
                    <h3 className="font-mono text-xs uppercase tracking-[0.22em] text-ink-faint dark:text-chalk-dim mb-5">
                      [{category}]
                    </h3>
                    <ul className="space-y-4">
                      {items.map((skill) => (
                        <li key={skill.name} className="flex items-center justify-between gap-4">
                          <span className="text-[17px] font-medium">{skill.name}</span>
                          <Ticks level={skill.level} name={skill.name} />
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* 03 — Record */}
        <section id="record" className="py-16 sm:py-24 px-5 sm:px-8">
          <div className="max-w-6xl mx-auto">
            <SectionHead n="03" kick="Background" title="Service record." />
            <ol className="max-w-4xl">
              {experience.map((exp, i) => (
                <li key={exp.role}>
                  <Reveal>
                    <div className="grid sm:grid-cols-[150px_1fr] gap-1 sm:gap-6 py-8 border-t-2 border-ink dark:border-chalk last:border-b-2">
                      <span className="font-mono text-[13px] text-ink-faint dark:text-chalk-dim pt-2">
                        {exp.period}
                      </span>
                      <div className="border-l-4 border-signal pl-5">
                        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-faint dark:text-chalk-dim">
                          Entry {String(i + 1).padStart(2, '0')}
                        </p>
                        <h3 className="display-poster text-3xl sm:text-4xl mt-1">{exp.role}</h3>
                        <p className="font-serifit italic text-xl text-ink-soft dark:text-chalk-dim mt-1">
                          {exp.company}
                        </p>
                        <p className="mt-3 leading-relaxed text-ink-soft dark:text-chalk-dim max-w-2xl">
                          {exp.description}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* 04 — Hire */}
        <section id="hire" className="py-16 sm:py-24 px-5 sm:px-8">
          <div className="max-w-6xl mx-auto">
            <SectionHead
              n="04"
              kick="Services"
              title="Open job"
              accent="tickets."
              standfirst="Production-ready AI/ML systems and full-stack products — contract work, freelance projects, and collaborations worth doing."
            />
            <ol className="grid sm:grid-cols-2 gap-5">
              {freelanceServices.slice(0, 8).map((service, i) => (
                <li key={service}>
                  <Reveal delay={Math.min(i * 0.04, 0.2)}>
                    <div className="border-2 border-ink dark:border-chalk h-full">
                      <p className="font-mono text-[11px] uppercase tracking-[0.2em] border-b-2 border-ink dark:border-chalk px-4 py-2 flex justify-between">
                        <span>JOB-{String(i + 1).padStart(2, '0')}</span>
                        <span className="text-signal-deep dark:text-signal">OPEN</span>
                      </p>
                      <p className="leading-relaxed text-ink-soft dark:text-chalk-dim px-4 py-4">
                        {service}
                      </p>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ol>
            <Reveal>
              <details className="group mt-5 border-2 border-ink dark:border-chalk px-6 py-5">
                <summary className="cursor-pointer font-mono text-[13px] uppercase tracking-[0.14em] flex items-center justify-between min-h-[44px]">
                  Full capability list ({freelanceServices.length})
                  <span className="group-open:hidden underline underline-offset-4">Show</span>
                  <span className="hidden group-open:inline underline underline-offset-4">Hide</span>
                </summary>
                <ul className="mt-4 space-y-2.5 pb-2">
                  {freelanceServices.map((service) => (
                    <li
                      key={service}
                      className="flex items-baseline gap-3 text-[15px] text-ink-soft dark:text-chalk-dim"
                    >
                      <span aria-hidden className="text-signal-deep dark:text-signal">
                        ✳
                      </span>
                      {service}
                    </li>
                  ))}
                </ul>
              </details>
            </Reveal>
          </div>
        </section>

        {/* 05 — Contact */}
        <section id="contact" className="py-16 sm:py-24 px-5 sm:px-8">
          <div className="max-w-6xl mx-auto">
            <Reveal>
              <p className="font-mono text-xs tracking-[0.22em] uppercase text-stamp dark:text-stamp-pale mb-4">
                FIG. 05 — Contact
              </p>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="display-poster text-[15vw] sm:text-8xl leading-[0.9] text-balance">
                Let&apos;s build
                <br />
                <span className="font-serifit italic normal-case font-normal text-signal-deep dark:text-signal">
                  something real.
                </span>
              </h2>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-6 text-lg leading-relaxed text-ink-soft dark:text-chalk-dim max-w-2xl">
                Freelance projects, full-time roles, or a good argument about RAG chunking —
                my inbox is open. I reply within a day or two.
              </p>
            </Reveal>
            <Reveal delay={0.16}>
              <a
                href="mailto:Praansu12@gmail.com"
                className="inline-block mt-8 display-poster text-3xl sm:text-5xl underline decoration-signal decoration-4 underline-offset-8 hover:text-signal-deep dark:hover:text-signal transition-colors break-all"
              >
                Praansu12@gmail.com
              </a>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="mt-12 max-w-2xl">
                {[
                  { l: 'GitHub', v: 'github.com/Praansu', h: 'https://github.com/Praansu' },
                  { l: 'LinkedIn', v: 'praansu-karmacharya', h: 'https://np.linkedin.com/in/praansu-karmacharya-694944368' },
                  { l: 'Portfolio', v: 'praansu.github.io', h: 'https://praansu.github.io' },
                ].map((row) => (
                  <a
                    key={row.l}
                    href={row.h}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-baseline justify-between gap-4 py-4 border-t-2 border-ink dark:border-chalk last:border-b-2 min-h-[44px]"
                  >
                    <span className="font-mono text-xs uppercase tracking-[0.2em] text-ink-faint dark:text-chalk-dim">
                      {row.l}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[17px] group-hover:text-stamp dark:group-hover:text-stamp-pale transition-colors">
                      {row.v} <ArrowUpRight className="w-4 h-4" />
                    </span>
                  </a>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* Colophon */}
        <footer className="px-5 sm:px-8 pb-10 pt-4">
          <div className="max-w-6xl mx-auto border-t-2 border-ink dark:border-chalk pt-6 flex flex-col sm:flex-row gap-2 sm:items-baseline justify-between">
            <p className="font-mono text-xs text-ink-faint dark:text-chalk-dim">
              Set in Anton, Instrument Serif, Space Grotesk &amp; JetBrains Mono. Built with
              Next.js — no trackers, no cookies. Last revised Sep 2026.
            </p>
            <p className="font-mono text-xs text-ink-faint dark:text-chalk-dim">
              KTM <KtClock /> · © {new Date().getFullYear()} Praansu Karmacharya
            </p>
          </div>
          <div className="max-w-6xl mx-auto mt-6">
            <Rule />
          </div>
        </footer>
      </div>
    </ThemeProvider>
  );
}
