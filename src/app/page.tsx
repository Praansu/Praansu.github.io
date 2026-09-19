'use client';

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
      className="fixed top-0 left-0 right-0 z-[70] h-[2px] origin-left bg-accent-deep dark:bg-accent-pale"
      style={{ scaleX }}
    />
  );
}

const NAV = [
  { n: '01', label: 'Work', href: '#work' },
  { n: '02', label: 'Capabilities', href: '#capabilities' },
  { n: '03', label: 'Background', href: '#background' },
  { n: '04', label: 'Services', href: '#services' },
  { n: '05', label: 'Contact', href: '#contact' },
];

function SectionHead({ n, kick, title, standfirst }: { n: string; kick: string; title: string; standfirst?: string }) {
  return (
    <div className="mb-10 sm:mb-14">
      <Reveal>
        <p className="font-mono text-xs tracking-[0.22em] uppercase text-accent-deep dark:text-accent-pale mb-4">
          {n} · {kick}
        </p>
      </Reveal>
      <Reveal delay={0.06}>
        <h2 className="font-display text-4xl sm:text-5xl font-semibold leading-[1.05] tracking-tight text-balance">
          {title}
        </h2>
      </Reveal>
      {standfirst && (
        <Reveal delay={0.12}>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft dark:text-cream-dim">
            {standfirst}
          </p>
        </Reveal>
      )}
    </div>
  );
}

function Dots({ level, name }: { level: number; name: string }) {
  const filled = Math.round(level / 20);
  return (
    <span
      role="img"
      aria-label={`${name}: ${level} out of 100`}
      className="font-mono text-[11px] tracking-[0.3em] text-ink dark:text-cream"
    >
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className={i < filled ? '' : 'opacity-25'}>
          ●
        </span>
      ))}
    </span>
  );
}

export default function Home() {
  return (
    <ThemeProvider>
      <ScrollProgress />
      <div className="min-h-screen">
        {/* Masthead */}
        <nav className="fixed top-0 left-0 right-0 z-50 border-b hairline bg-paper/90 dark:bg-night/90 backdrop-blur-sm">
          <div className="max-w-5xl mx-auto px-5 sm:px-8">
            <div className="flex items-center justify-between h-16 gap-4">
              <a href="#top" className="font-display text-lg font-bold tracking-tight shrink-0">
                Praansu Karmacharya
              </a>
              <div className="hidden md:flex items-center gap-7">
                {NAV.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="font-mono text-[13px] text-ink-soft dark:text-cream-dim hover:text-accent-deep dark:hover:text-accent-pale transition-colors"
                  >
                    <span className="opacity-50 mr-1">{item.n}</span>
                    {item.label}
                  </a>
                ))}
              </div>
              <div className="flex items-center gap-3">
                <a
                  href="#contact"
                  className="hidden sm:inline-flex font-mono text-[13px] font-medium underline decoration-accent-deep dark:decoration-accent-pale decoration-2 underline-offset-4 hover:opacity-70 transition-opacity"
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
                  className="font-mono text-xs text-ink-soft dark:text-cream-dim whitespace-nowrap"
                >
                  <span className="opacity-50 mr-1">{item.n}</span>
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </nav>

        {/* Hero */}
        <header id="top" className="pt-32 sm:pt-40 pb-14 sm:pb-20 px-5 sm:px-8">
          <div className="max-w-5xl mx-auto">
            <Reveal>
              <p className="font-mono text-xs sm:text-[13px] tracking-[0.18em] uppercase text-ink-faint dark:text-cream-dim mb-8">
                Portfolio — Kathmandu, Nepal · Open to freelance
              </p>
            </Reveal>
            <h1 className="font-display font-semibold tracking-tight leading-[1.02] text-[13.5vw] sm:text-7xl lg:text-[5.4rem] text-balance">
              <MaskLines
                lines={[
                  <>I build machine&#8209;learning</>,
                  <>
                    systems <em className="font-bold">&amp; the products</em>
                  </>,
                  <>
                    around <em className="font-bold">them.</em>
                  </>,
                ]}
              />
            </h1>
            <div className="grid sm:grid-cols-[1fr_220px] gap-10 mt-10">
              <Reveal delay={0.15}>
                <p className="dropcap text-lg sm:text-xl leading-relaxed text-ink-soft dark:text-cream-dim max-w-2xl">
                  I&apos;m Praansu, a CS student at Islington College. I work in PyTorch,
                  RAG pipelines, and agent tool-calling — and I ship the full-stack
                  products around them. No frameworks where they obscure understanding;
                  every project below exists because I wanted to learn one specific
                  thing properly.
                </p>
              </Reveal>
              <Reveal delay={0.22}>
                <dl className="font-mono text-xs leading-loose text-ink-faint dark:text-cream-dim border-l hairline pl-5">
                  <div>
                    <dt className="uppercase tracking-[0.18em] opacity-70">Study</dt>
                    <dd className="text-ink dark:text-cream">Islington College</dd>
                  </div>
                  <div className="mt-3">
                    <dt className="uppercase tracking-[0.18em] opacity-70">Mail</dt>
                    <dd>
                      <a
                        href="mailto:Praansu12@gmail.com"
                        className="text-ink dark:text-cream underline decoration-rule-light dark:decoration-rule-dark underline-offset-4 hover:text-accent-deep dark:hover:text-accent-pale transition-colors break-all"
                      >
                        Praansu12@gmail.com
                      </a>
                    </dd>
                  </div>
                  <div className="mt-3">
                    <dt className="uppercase tracking-[0.18em] opacity-70">Elsewhere</dt>
                    <dd className="flex gap-3">
                      <a
                        href="https://github.com/Praansu"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-ink dark:text-cream underline decoration-rule-light dark:decoration-rule-dark underline-offset-4 hover:text-accent-deep dark:hover:text-accent-pale transition-colors"
                      >
                        GitHub
                      </a>
                      <a
                        href="https://np.linkedin.com/in/praansu-karmacharya-694944368"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-ink dark:text-cream underline decoration-rule-light dark:decoration-rule-dark underline-offset-4 hover:text-accent-deep dark:hover:text-accent-pale transition-colors"
                      >
                        LinkedIn
                      </a>
                    </dd>
                  </div>
                </dl>
              </Reveal>
            </div>
            <Reveal delay={0.1}>
              <div className="grid grid-cols-3 gap-6 border-t hairline mt-12 pt-6 max-w-2xl">
                {[
                  { v: String(projects.length).padStart(2, '0'), l: 'Builds shipped' },
                  { v: String(Object.keys(skills).length).padStart(2, '0'), l: 'Skill domains' },
                  { v: String(experience.length).padStart(2, '0'), l: 'Working roles' },
                ].map((s) => (
                  <div key={s.l}>
                    <dd className="font-display text-3xl sm:text-4xl font-semibold">{s.v}</dd>
                    <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-faint dark:text-cream-dim mt-1">
                      {s.l}
                    </dt>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="mt-12 font-mono text-xs text-ink-faint dark:text-cream-dim flex items-center gap-2">
                <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
                Scroll — the work is below
              </p>
            </Reveal>
          </div>
        </header>

        <div className="max-w-5xl mx-auto px-5 sm:px-8">
          <Rule />
        </div>

        {/* 01 — Work */}
        <section id="work" className="py-16 sm:py-24 px-5 sm:px-8">
          <div className="max-w-5xl mx-auto">
            <SectionHead
              n="01"
              kick="Selected work"
              title="Work that taught me something."
              standfirst="Seven builds, each chasing one question — agent loops without frameworks, RAG that deletes properly, classifiers measured honestly. No tutorials, no copy-paste."
            />
            <ol>
              {projects.map((project, index) => (
                <li key={project.name}>
                  <Reveal>
                    <article className="group grid sm:grid-cols-[56px_1fr] gap-2 sm:gap-6 py-9 border-t hairline last:border-b">
                      <span className="font-mono text-sm text-ink-faint dark:text-cream-dim pt-1.5">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <div>
                        <h3 className="font-display text-2xl sm:text-[2rem] font-semibold leading-tight tracking-tight">
                          <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_2px] bg-left-bottom bg-no-repeat group-hover:bg-[length:100%_2px] transition-[background-size] duration-500">
                            {project.name}
                          </span>
                        </h3>
                        <p className="mt-2 font-serif italic text-[17px] text-accent-deep dark:text-accent-pale">
                          {project.highlight}
                        </p>
                        <p className="mt-3 leading-relaxed text-ink-soft dark:text-cream-dim max-w-2xl">
                          {project.description}
                        </p>
                        <p className="mt-4 font-mono text-xs tracking-wide text-ink-faint dark:text-cream-dim">
                          {project.tech.join(' · ')}
                        </p>
                        <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 font-mono text-[13px] font-medium uppercase tracking-[0.12em] underline decoration-rule-light dark:decoration-rule-dark underline-offset-4 hover:text-accent-deep dark:hover:text-accent-pale hover:decoration-accent-deep dark:hover:decoration-accent-pale transition-colors"
                          >
                            GitHub <ArrowUpRight className="w-3.5 h-3.5" />
                          </a>
                          {project.demo && (
                            <a
                              href={project.demo}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 font-mono text-[13px] font-medium uppercase tracking-[0.12em] underline decoration-rule-light dark:decoration-rule-dark underline-offset-4 hover:text-accent-deep dark:hover:text-accent-pale hover:decoration-accent-deep dark:hover:decoration-accent-pale transition-colors"
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

        <div className="max-w-5xl mx-auto px-5 sm:px-8">
          <Rule />
        </div>

        {/* 02 — Capabilities */}
        <section id="capabilities" className="py-16 sm:py-24 px-5 sm:px-8">
          <div className="max-w-5xl mx-auto">
            <SectionHead
              n="02"
              kick="Capabilities"
              title="What I reach for."
              standfirst="Depth in ML and LLM systems, enough full-stack to ship them alone. Every entry here was earned by a project that needed it."
            />
            <div className="grid md:grid-cols-2 gap-x-14">
              {Object.entries(skills).map(([category, items], ci) => (
                <Reveal key={category} delay={Math.min(ci * 0.05, 0.2)}>
                  <div className="py-8 border-t hairline last:border-b md:last:border-b-0">
                    <h3 className="font-mono text-xs uppercase tracking-[0.22em] text-ink-faint dark:text-cream-dim mb-5">
                      {category}
                    </h3>
                    <ul className="space-y-3">
                      {items.map((skill) => (
                        <li key={skill.name} className="flex items-baseline gap-3">
                          <span className="text-[17px]">{skill.name}</span>
                          <span
                            aria-hidden
                            className="flex-1 border-b border-dotted border-ink-faint/50 dark:border-cream-dim/40 -translate-y-1"
                          />
                          <Dots level={skill.level} name={skill.name} />
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <div className="max-w-5xl mx-auto px-5 sm:px-8">
          <Rule />
        </div>

        {/* 03 — Background */}
        <section id="background" className="py-16 sm:py-24 px-5 sm:px-8">
          <div className="max-w-5xl mx-auto">
            <SectionHead n="03" kick="Background" title="Where I've been." />
            <ol className="max-w-3xl">
              {experience.map((exp) => (
                <li key={exp.role}>
                  <Reveal>
                    <div className="grid sm:grid-cols-[180px_1fr] gap-1 sm:gap-6 py-8 border-t hairline last:border-b">
                      <span className="font-mono text-[13px] text-ink-faint dark:text-cream-dim pt-1">
                        {exp.period}
                      </span>
                      <div>
                        <h3 className="font-display text-2xl font-semibold tracking-tight">
                          {exp.role}
                        </h3>
                        <p className="font-serif italic text-ink-soft dark:text-cream-dim mt-1">
                          {exp.company}
                        </p>
                        <p className="mt-3 leading-relaxed text-ink-soft dark:text-cream-dim">
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

        <div className="max-w-5xl mx-auto px-5 sm:px-8">
          <Rule />
        </div>

        {/* 04 — Services */}
        <section id="services" className="py-16 sm:py-24 px-5 sm:px-8">
          <div className="max-w-5xl mx-auto">
            <SectionHead
              n="04"
              kick="Services"
              title="Available for freelance."
              standfirst="Production-ready AI/ML systems and full-stack products — contract work, freelance projects, and collaborations worth doing."
            />
            <ol className="grid sm:grid-cols-2 gap-x-14">
              {freelanceServices.slice(0, 8).map((service, i) => (
                <li key={service}>
                  <Reveal delay={Math.min(i * 0.04, 0.2)}>
                    <div className="flex gap-5 py-6 border-t hairline">
                      <span className="font-display text-xl font-semibold text-ink-faint dark:text-cream-dim">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <p className="leading-relaxed text-ink-soft dark:text-cream-dim">{service}</p>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ol>
            <Reveal>
              <details className="group mt-4 border hairline px-6 py-5">
                <summary className="cursor-pointer font-mono text-[13px] uppercase tracking-[0.14em] flex items-center justify-between min-h-[44px]">
                  Full capability list ({freelanceServices.length})
                  <span className="group-open:hidden underline underline-offset-4">Show</span>
                  <span className="hidden group-open:inline underline underline-offset-4">Hide</span>
                </summary>
                <ul className="mt-4 space-y-2.5 pb-2">
                  {freelanceServices.map((service) => (
                    <li
                      key={service}
                      className="flex items-baseline gap-3 text-[15px] text-ink-soft dark:text-cream-dim"
                    >
                      <span aria-hidden className="text-accent-deep dark:text-accent-pale">
                        —
                      </span>
                      {service}
                    </li>
                  ))}
                </ul>
              </details>
            </Reveal>
          </div>
        </section>

        <div className="max-w-5xl mx-auto px-5 sm:px-8">
          <Rule />
        </div>

        {/* 05 — Contact */}
        <section id="contact" className="py-16 sm:py-24 px-5 sm:px-8">
          <div className="max-w-5xl mx-auto">
            <Reveal>
              <p className="font-mono text-xs tracking-[0.22em] uppercase text-accent-deep dark:text-accent-pale mb-4">
                05 · Contact
              </p>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="font-display text-4xl sm:text-6xl font-semibold leading-[1.05] tracking-tight text-balance max-w-3xl">
                Let&apos;s build something that <em>works.</em>
              </h2>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-6 text-lg leading-relaxed text-ink-soft dark:text-cream-dim max-w-2xl">
                Freelance projects, full-time roles, or a good conversation about
                AI/ML — my inbox is open. I reply within a day or two.
              </p>
            </Reveal>
            <Reveal delay={0.16}>
              <a
                href="mailto:Praansu12@gmail.com"
                className="inline-block mt-8 font-display text-2xl sm:text-4xl font-semibold underline decoration-accent-deep dark:decoration-accent-pale decoration-[3px] underline-offset-8 hover:opacity-70 transition-opacity break-all"
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
                    className="group flex items-baseline justify-between gap-4 py-4 border-t hairline last:border-b"
                  >
                    <span className="font-mono text-xs uppercase tracking-[0.2em] text-ink-faint dark:text-cream-dim">
                      {row.l}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[17px] group-hover:text-accent-deep dark:group-hover:text-accent-pale transition-colors">
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
          <div className="max-w-5xl mx-auto border-t hairline pt-6 flex flex-col sm:flex-row gap-2 sm:items-baseline justify-between">
            <p className="font-mono text-xs text-ink-faint dark:text-cream-dim">
              Set in Playfair Display, Source Serif 4 &amp; JetBrains Mono. Built with
              Next.js — no trackers, no cookies.
            </p>
            <p className="font-mono text-xs text-ink-faint dark:text-cream-dim">
              © {new Date().getFullYear()} Praansu Karmacharya
            </p>
          </div>
        </footer>
      </div>
    </ThemeProvider>
  );
}
