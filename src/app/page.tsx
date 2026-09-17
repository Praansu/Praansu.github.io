import dynamic from 'next/dynamic';
import { ThemeProvider } from '@/components/ThemeProvider';
import { ProjectCard } from '@/components/ProjectCard';
import { SkillBar } from '@/components/SkillBar';
import { Reveal } from '@/components/Reveal';
import { projects, skills, experience, freelanceServices } from '@/lib/data';
import {
  Mail,
  ArrowRight,
  Mail as MailIcon,
  MapPin,
  GraduationCap,
  Globe,
  Sparkles,
  Bot,
  Boxes,
  Rocket,
  FlaskConical,
  Cpu,
} from 'lucide-react';

const Hero3D = dynamic(() => import('@/components/Hero3D'), {
  ssr: false,
  loading: () => (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_70%_30%,rgba(34,197,94,0.20),transparent_70%),radial-gradient(40%_35%_at_20%_80%,rgba(14,165,233,0.14),transparent_70%)]"
    />
  ),
});

const DarkModeToggle = dynamic(
  () => import('@/components/DarkModeToggle').then((mod) => mod.DarkModeToggle),
  { ssr: false }
);

const marqueeItems = [
  'PyTorch',
  'RAG Pipelines',
  'Agent Loops',
  'FastAPI',
  'Next.js',
  'TypeScript',
  'ChromaDB',
  'Groq',
  'Tool Calling',
  'Docker',
  'Tailwind',
  'ESP32',
];

const freelanceGroups = [
  {
    icon: Boxes,
    title: 'RAG Pipelines & Document AI',
    text: 'FastAPI + ChromaDB + Groq/OpenAI with SSE streaming, document CRUD, and compliant deletion.',
  },
  {
    icon: Bot,
    title: 'Custom Agent Loops',
    text: 'No-framework tool-calling agents combining RAG with live web search and transparent fallbacks.',
  },
  {
    icon: Rocket,
    title: 'ML Training & Deployment',
    text: 'PyTorch transfer learning (ResNet, MobileNet, EfficientNet) shipped as FastAPI + Docker services.',
  },
  {
    icon: Sparkles,
    title: 'Full-Stack AI Products',
    text: 'Next.js + TypeScript + Prisma + Stripe builds, from schema design to production deploy.',
  },
  {
    icon: FlaskConical,
    title: 'Evals & Research Engineering',
    text: 'Reproducible experiment harnesses, capability/reliability suites, stats, and paper-ready visuals.',
  },
  {
    icon: Cpu,
    title: 'IoT & Realtime Dashboards',
    text: 'ESP32 firmware, FastAPI websockets, live dashboards with booking and chatbot layers.',
  },
];

export default function Home() {
  return (
    <ThemeProvider>
      <div className="min-h-screen">
        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-50 border-b border-gray-200/70 dark:border-white/10 bg-white/75 dark:bg-dark-950/70 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <a href="#top" className="font-serif text-lg font-bold text-gray-900 dark:text-white">
                Praansu Karmacharya
              </a>
              <div className="hidden md:flex items-center gap-8">
                <a href="#projects" className="text-sm font-medium text-gray-600 dark:text-dark-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  Projects
                </a>
                <a href="#skills" className="text-sm font-medium text-gray-600 dark:text-dark-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  Skills
                </a>
                <a href="#experience" className="text-sm font-medium text-gray-600 dark:text-dark-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  Experience
                </a>
                <a href="#freelance" className="text-sm font-medium text-gray-600 dark:text-dark-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  Freelance
                </a>
                <a href="#contact" className="text-sm font-medium text-gray-600 dark:text-dark-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  Contact
                </a>
              </div>
              <div className="flex items-center gap-3">
                <a
                  href="#contact"
                  className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary-600 text-white text-sm font-semibold hover:bg-primary-700 transition-colors"
                >
                  Hire me
                  <ArrowRight className="w-4 h-4" />
                </a>
                <DarkModeToggle />
              </div>
            </div>
          </div>
        </nav>

        {/* Hero */}
        <header id="top" className="relative overflow-hidden pt-28 pb-16 sm:pt-32 sm:pb-20 px-4 sm:px-6 lg:px-8">
          <Hero3D />
          <div aria-hidden className="hero-grid pointer-events-none absolute inset-0" />
          <div className="relative max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-14 items-center">
              <Reveal>
                <p className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs font-semibold text-primary-700 dark:text-primary-300 uppercase tracking-wider mb-5">
                  <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse" />
                  CS Student · Islington College, Kathmandu
                </p>
                <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.08] text-gray-900 dark:text-white mb-6">
                  Building ML models &amp; AI products{' '}
                  <span className="text-gradient">from scratch</span>
                </h1>
                <p className="text-lg text-gray-600 dark:text-dark-300 max-w-xl mb-8 leading-relaxed">
                  I build ML models and the products around them — PyTorch, RAG pipelines,
                  agent tool-calling, and full-stack deployment. No frameworks where they
                  obscure understanding.
                </p>
                <div className="flex flex-wrap gap-4 mb-10">
                  <a
                    href="#projects"
                    className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary-600 text-white font-semibold text-sm hover:bg-primary-700 transition-all hover:shadow-[0_16px_40px_-16px_rgba(22,163,74,0.7)]"
                  >
                    View Projects
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </a>
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-gray-300 dark:border-white/15 text-gray-700 dark:text-dark-200 font-semibold text-sm hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
                  >
                    Get in Touch
                    <Mail className="w-4 h-4" />
                  </a>
                </div>
                <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-500 dark:text-dark-400 mb-10">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                    <span>Islington College, Kathmandu</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                    <span>Kathmandu, Nepal</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MailIcon className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                    <span>Praansu12@gmail.com</span>
                  </div>
                </div>
                <dl className="grid grid-cols-3 max-w-md gap-6 border-t border-gray-200 dark:border-white/10 pt-6">
                  <div>
                    <dt className="text-xs uppercase tracking-wider text-gray-500 dark:text-dark-400">Builds</dt>
                    <dd className="font-serif text-2xl font-bold text-gray-900 dark:text-white">{projects.length}</dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-wider text-gray-500 dark:text-dark-400">Domains</dt>
                    <dd className="font-serif text-2xl font-bold text-gray-900 dark:text-white">{Object.keys(skills).length}</dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-wider text-gray-500 dark:text-dark-400">Roles</dt>
                    <dd className="font-serif text-2xl font-bold text-gray-900 dark:text-white">{experience.length}</dd>
                  </div>
                </dl>
              </Reveal>

              <Reveal delay={0.12}>
                <div className="relative">
                  <div className="glass rounded-2xl p-6 sm:p-8 shadow-[0_32px_80px_-32px_rgba(2,6,23,0.45)]">
                    <div className="flex items-center gap-3 mb-5">
                      <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-500" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500" />
                        <div className="w-3 h-3 rounded-full bg-green-500" />
                      </div>
                      <div className="text-xs text-gray-500 dark:text-dark-400 font-mono">portfolio.tsx</div>
                    </div>
                    <pre className="text-[13px] sm:text-sm text-gray-800 dark:text-dark-200 font-mono overflow-x-auto leading-relaxed"><code>{`const engineer = {
  name: "Praansu Karmacharya",
  role: "AI/ML Engineer & Full-Stack Dev",
  stack: {
    ml: ["PyTorch", "scikit-learn", "XGBoost"],
    llm: ["Groq", "ChromaDB", "Agent Loops"],
    backend: ["FastAPI", "Python", "Docker"],
    frontend: ["Next.js", "TypeScript"],
  },
  currentlyBuilding: "AI Research Agent",
  availableForFreelance: true,
};`}</code></pre>
                  </div>
                  <div className="absolute -top-4 -right-2 sm:right-6 px-3 py-1.5 rounded-full glass text-xs font-semibold text-gray-700 dark:text-dark-200 shadow-lg">
                    RAG + live tool calls
                  </div>
                  <div className="absolute -bottom-4 left-4 sm:left-8 px-3 py-1.5 rounded-full glass text-xs font-semibold text-gray-700 dark:text-dark-200 shadow-lg">
                    90% classifier accuracy
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </header>

        {/* Tech marquee */}
        <div className="border-y border-gray-200 dark:border-white/10 bg-gray-50/80 dark:bg-white/[0.02] py-4 overflow-hidden">
          <div className="flex w-max animate-marquee gap-3 pr-3">
            {[...marqueeItems, ...marqueeItems].map((item, index) => (
              <span
                key={`${item}-${index}`}
                className="px-4 py-1.5 rounded-full text-sm font-medium bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-600 dark:text-dark-300 whitespace-nowrap"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Projects */}
        <section id="projects" className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <Reveal className="text-center mb-14">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-600 dark:text-primary-400 mb-3">
                Selected work
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Featured Projects
              </h2>
              <p className="text-lg text-gray-600 dark:text-dark-300 max-w-2xl mx-auto">
                Each project exists because I wanted to understand one specific thing. No tutorials, no copy-paste.
              </p>
            </Reveal>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
              {projects.map((project, index) => (
                <Reveal key={`${project.name}-${index}`} delay={Math.min(index * 0.06, 0.3)}>
                  <ProjectCard {...project} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Skills */}
        <section id="skills" className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-white/[0.02] border-y border-gray-200 dark:border-white/10">
          <div className="max-w-7xl mx-auto">
            <Reveal className="text-center mb-14">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-600 dark:text-primary-400 mb-3">
                Capabilities
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Technical Skills
              </h2>
              <p className="text-lg text-gray-600 dark:text-dark-300 max-w-2xl mx-auto">
                Depth in ML/AI and full-stack. I learn by building — every skill here came from a project that needed it.
              </p>
            </Reveal>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
              {Object.entries(skills).map(([category, items], index) => (
                <Reveal key={category} delay={Math.min(index * 0.06, 0.3)}>
                  <div className="h-full bg-white dark:bg-dark-900 rounded-2xl p-6 border border-gray-200 dark:border-white/10 hover:border-primary-500/50 transition-colors">
                    <h3 className="font-serif text-xl font-bold text-gray-900 dark:text-white mb-6">
                      {category}
                    </h3>
                    <div className="space-y-4">
                      {items.map((skill) => (
                        <SkillBar key={skill.name} name={skill.name} level={skill.level} />
                      ))}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Experience */}
        <section id="experience" className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <Reveal className="text-center mb-14">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-600 dark:text-primary-400 mb-3">
                Background
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
                Experience
              </h2>
            </Reveal>
            <div className="max-w-3xl mx-auto">
              {experience.map((exp, index) => (
                <Reveal key={exp.role} delay={index * 0.08}>
                  <div className="relative pl-8 pb-10 border-l-2 border-gray-200 dark:border-white/10 last:border-0 last:pb-0">
                    <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-primary-600 border-4 border-white dark:border-dark-950" />
                    <div className="bg-white dark:bg-dark-900 rounded-xl p-6 border border-gray-200 dark:border-white/10 hover:border-primary-500/40 transition-colors">
                      <div className="flex flex-wrap items-baseline gap-3 mb-3">
                        <h3 className="font-serif text-xl font-bold text-gray-900 dark:text-white">
                          {exp.role}
                        </h3>
                        <span className="px-3 py-1 text-xs font-medium bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full">
                          {exp.period}
                        </span>
                      </div>
                      <p className="text-gray-600 dark:text-dark-300 font-medium mb-2">{exp.company}</p>
                      <p className="text-gray-600 dark:text-dark-300">{exp.description}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Freelance */}
        <section id="freelance" className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 bg-primary-50/60 dark:bg-primary-900/10 border-y border-primary-100 dark:border-white/10">
          <div className="max-w-7xl mx-auto">
            <Reveal className="text-center mb-14">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-700 dark:text-primary-300 mb-3">
                Services
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Available for Freelance
              </h2>
              <p className="text-lg text-gray-600 dark:text-dark-300 max-w-2xl mx-auto">
                Production-ready AI/ML systems and full-stack products. Open to freelance projects, contract work, and interesting collaborations.
              </p>
            </Reveal>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {freelanceGroups.map((service, index) => (
                <Reveal key={service.title} delay={Math.min(index * 0.06, 0.3)}>
                  <div className="h-full p-6 bg-white dark:bg-dark-900 rounded-2xl border border-gray-200 dark:border-white/10 hover:border-primary-500/50 hover:shadow-[0_20px_50px_-24px_rgba(22,163,74,0.5)] transition-all">
                    <div className="p-2.5 w-fit bg-primary-100 dark:bg-primary-900/30 rounded-xl text-primary-600 dark:text-primary-400 mb-4">
                      <service.icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{service.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-dark-300 leading-relaxed">{service.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal className="max-w-6xl mx-auto mt-6">
              <details className="group bg-white dark:bg-dark-900 rounded-2xl border border-gray-200 dark:border-white/10 p-6">
                <summary className="cursor-pointer font-semibold text-gray-900 dark:text-white list-none flex items-center justify-between">
                  Full capability list ({freelanceServices.length} items)
                  <span className="text-primary-600 dark:text-primary-400 text-sm group-open:hidden">Show all</span>
                  <span className="text-primary-600 dark:text-primary-400 text-sm hidden group-open:inline">Hide</span>
                </summary>
                <ul className="mt-4 space-y-2.5">
                  {freelanceServices.map((service) => (
                    <li key={service} className="flex items-start gap-3 text-sm text-gray-600 dark:text-dark-300">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary-500 flex-shrink-0" />
                      {service}
                    </li>
                  ))}
                </ul>
              </details>
            </Reveal>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <Reveal className="text-center mb-14">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-600 dark:text-primary-400 mb-3">
                Contact
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Let&apos;s Work Together
              </h2>
              <p className="text-lg text-gray-600 dark:text-dark-300 max-w-2xl mx-auto">
                Available for freelance projects, full-time roles, and interesting conversations about AI/ML.
              </p>
            </Reveal>
            <Reveal className="max-w-2xl mx-auto">
              <div className="bg-white dark:bg-dark-900 rounded-2xl p-6 sm:p-8 border border-gray-200 dark:border-white/10">
                <div className="grid md:grid-cols-2 gap-5 mb-5">
                  <a
                    href="mailto:Praansu12@gmail.com"
                    className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
                  >
                    <MailIcon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                    <div>
                      <p className="text-sm text-gray-500 dark:text-dark-400">Email</p>
                      <p className="font-medium text-gray-900 dark:text-white">Praansu12@gmail.com</p>
                    </div>
                  </a>
                  <a
                    href="https://np.linkedin.com/in/praansu-karmacharya-694944368"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
                  >
                    <svg className="w-6 h-6 text-primary-600 dark:text-primary-400" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.141-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.433zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-dark-400">LinkedIn</p>
                      <p className="font-medium text-gray-900 dark:text-white">praansu-karmacharya</p>
                    </div>
                  </a>
                </div>
                <div className="grid md:grid-cols-2 gap-5">
                  <a
                    href="https://github.com/Praansu"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
                  >
                    <svg className="w-6 h-6 text-primary-600 dark:text-primary-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.305-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-.914 3.299-1.23 3.299-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-dark-400">GitHub</p>
                      <p className="font-medium text-gray-900 dark:text-white">github.com/Praansu</p>
                    </div>
                  </a>
                  <a
                    href="https://praansu.github.io"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
                  >
                    <Globe className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                    <div>
                      <p className="text-sm text-gray-500 dark:text-dark-400">Portfolio</p>
                      <p className="font-medium text-gray-900 dark:text-white">praansu.github.io</p>
                    </div>
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <footer className="py-8 px-4 sm:px-6 lg:px-8 border-t border-gray-200 dark:border-white/10">
          <div className="max-w-7xl mx-auto text-center">
            <p className="text-gray-500 dark:text-dark-400 text-sm">
              Built with Next.js, React Three Fiber, TypeScript, and Tailwind CSS. Deployed on GitHub Pages.
            </p>
            <p className="text-gray-500 dark:text-dark-400 text-sm mt-2">
              © {new Date().getFullYear()} Praansu Karmacharya. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </ThemeProvider>
  );
}
