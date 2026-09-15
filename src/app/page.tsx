import { Metadata, Viewport } from 'next';
import { Inter, Merriweather } from 'next/font/google';
import dynamic from 'next/dynamic';
import { ThemeProvider } from '@/components/ThemeProvider';
import { ProjectCard } from '@/components/ProjectCard';
import { SkillBar } from '@/components/SkillBar';

const DarkModeToggle = dynamic(() => import('@/components/DarkModeToggle').then(mod => mod.DarkModeToggle), {
  ssr: false,
});
import { projects, skills, experience, freelanceServices } from '@/lib/data';
import {
  Mail,
  Linkedin,
  Github,
  ExternalLink,
  Moon,
  Sun,
  Code,
  Brain,
  Server,
  Zap,
  ChevronRight,
  ArrowUpRight,
  Terminal,
  Database,
  Cloud,
  Globe,
  Award,
  BookOpen,
  Briefcase,
  Mail as MailIcon,
  MapPin,
  GraduationCap,
  TrendingUp,
} from 'lucide-react';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const merriweather = Merriweather({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-merriweather',
  weight: ['400', '700'],
});

export const metadata: Metadata = {
  title: 'Praansu Karmacharya — AI/ML Engineer & Full-Stack Developer',
  description: 'CS student at Islington College, Kathmandu. Building ML models & AI products — PyTorch, RAG, agent tool-calling, Next.js, TypeScript.',
  keywords: ['AI Engineer', 'ML Engineer', 'Full-Stack Developer', 'PyTorch', 'RAG', 'Next.js', 'TypeScript', 'Freelance'],
  authors: [{ name: 'Praansu Karmacharya' }],
  creator: 'Praansu Karmacharya',
  publisher: 'Praansu Karmacharya',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://praansu.github.io',
    title: 'Praansu Karmacharya — AI/ML Engineer & Full-Stack Developer',
    description: 'CS student at Islington College, Kathmandu. Building ML models & AI products.',
    siteName: 'Praansu Karmacharya Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Praansu Karmacharya — AI/ML Engineer & Full-Stack Developer',
    description: 'CS student at Islington College, Kathmandu. Building ML models & AI products.',
  },
  verification: {
    google: 'google-site-verification-code',
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function Home() {
  return (
    <ThemeProvider>
      <html lang="en" className={`${inter.variable} ${merriweather.variable}`} suppressHydrationWarning>
        <head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        </head>
        <body className={`${inter.className} ${merriweather.className} antialiased`}>
          {/* Navigation */}
          <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/80 dark:bg-dark-950/80 border-b border-gray-200 dark:border-dark-700">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                <a href="/" className="font-serif text-xl font-bold text-gray-900 dark:text-white">
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
                  <a href="#contact" className="text-sm font-medium text-gray-600 dark:text-dark-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                    Contact
                  </a>
                </div>
                <div className="flex items-center gap-4">
                  <DarkModeToggle />
                </div>
              </div>
            </div>
          </nav>

          {/* Hero Section */}
          <section className="min-h-screen flex items-center justify-center pt-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                <div>
                  <p className="text-sm font-semibold text-primary-600 dark:text-primary-400 uppercase tracking-wider mb-4">
                    CS Student at Islington College, Kathmandu
                  </p>
                  <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-gray-900 dark:text-white mb-6">
                    Building ML models & AI products
                    <br />
                    <span className="text-primary-600 dark:text-primary-400 not-italic">from scratch</span>
                  </h1>
                  <p className="text-lg text-gray-600 dark:text-dark-300 max-w-xl mb-8 leading-relaxed">
                    I build ML models and the products around them — PyTorch, RAG pipelines, agent tool-calling, and full-stack deployment. No frameworks where they obscure understanding.
                  </p>
                  <div className="flex flex-wrap gap-4 mb-10">
                    <a
                      href="#projects"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary-600 text-white font-semibold text-sm hover:bg-primary-700 transition-colors"
                    >
                      View Projects
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                    </a>
                    <a
                      href="#contact"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border-2 border-gray-300 dark:border-dark-600 text-gray-700 dark:text-dark-200 font-semibold text-sm hover:bg-gray-100 dark:hover:bg-dark-800 transition-colors"
                    >
                      Get in Touch
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                    </a>
                  </div>
                  <div className="flex flex-wrap gap-6 text-sm text-gray-500 dark:text-dark-400">
                    <div className="flex items-center gap-2">
                      <GraduationCap className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                      <span>Islington College, Kathmandu</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                      <span>Kathmandu, Nepal</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                      <span>Praansu12@gmail.com</span>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="bg-gray-100 dark:bg-dark-900 rounded-2xl p-8 border border-gray-200 dark:border-dark-700">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-500" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500" />
                        <div className="w-3 h-3 rounded-full bg-green-500" />
                      </div>
                      <div className="text-xs text-gray-500 dark:text-dark-400 font-mono">portfolio.tsx</div>
                    </div>
                    <pre className="text-sm text-gray-300 dark:text-dark-300 font-mono overflow-x-auto"><code>{`const engineer = {
  name: "Praansu Karmacharya",
  role: "AI/ML Engineer & Full-Stack Dev",
  stack: {
    ml: ["PyTorch", "scikit-learn", "XGBoost", "OpenCV"],
    llm: ["Groq", "ChromaDB", "Agent Loops", "RAG"],
    backend: ["FastAPI", "Python", "Prisma", "Docker"],
    frontend: ["Next.js", "TypeScript", "Tailwind", "React"],
  },
  currentlyBuilding: "AI Research Agent (no framework)",
  availableForFreelance: true,
};`}</code></pre>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Projects Section */}
          <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-dark-900">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                  Featured Projects
                </h2>
                <p className="text-lg text-gray-600 dark:text-dark-300 max-w-2xl mx-auto">
                  Each project exists because I wanted to understand one specific thing. No tutorials, no copy-paste.
                </p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project) => (
                  <ProjectCard key={project.name} {...project} />
                ))}
              </div>
            </div>
          </section>

          {/* Skills Section */}
          <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                  Technical Skills
                </h2>
                <p className="text-lg text-gray-600 dark:text-dark-300 max-w-2xl mx-auto">
                  Depth in ML/AI and full-stack. I learn by building — every skill here came from a project that needed it.
                </p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {Object.entries(skills).map(([category, items]) => (
                  <div
                    key={category}
                    className="bg-white dark:bg-dark-900 rounded-2xl p-6 border border-gray-200 dark:border-dark-700"
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <h3 className="font-serif text-xl font-bold text-gray-900 dark:text-white">
                        {category}
                      </h3>
                    </div>
                    <div className="space-y-4">
                      {items.map((skill) => (
                        <SkillBar key={skill.name} name={skill.name} level={skill.level} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Experience Section */}
          <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-dark-900">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                  Experience
                </h2>
              </div>
              <div className="max-w-3xl mx-auto">
                {experience.map((exp, index) => (
                  <div
                    key={exp.role}
                    className="relative pl-8 pb-12 border-l-2 border-gray-200 dark:border-dark-700 last:border-0"
                  >
                    <div className="absolute left-0 top-0 w-4 h-4 rounded-full bg-primary-600 border-4 border-white dark:border-dark-950" />
                    <div className="bg-white dark:bg-dark-900 rounded-xl p-6 border border-gray-200 dark:border-dark-700">
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
                ))}
              </div>
            </div>
          </section>

          {/* Freelance Section */}
          <section id="freelance" className="py-20 px-4 sm:px-6 lg:px-8 bg-primary-50 dark:bg-primary-900/20">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                  Available for Freelance
                </h2>
                <p className="text-lg text-gray-600 dark:text-dark-300 max-w-2xl mx-auto">
                  I build production-ready AI/ML systems and full-stack products. Open to freelance projects, contract work, and interesting collaborations.
                </p>
              </div>
              <div className="max-w-4xl mx-auto space-y-4">
                {freelanceServices.map((service, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-4 bg-white dark:bg-dark-900 rounded-xl border border-gray-200 dark:border-dark-700 hover:border-primary-500/50 dark:hover:border-primary-500/50 transition-colors"
                  >
                    <div className="p-2 bg-primary-100 dark:bg-primary-900/30 rounded-lg text-primary-600 dark:text-primary-400 flex-shrink-0">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                    </div>
                    <p className="text-gray-700 dark:text-dark-200 leading-relaxed">{service}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                  Let's Work Together
                </h2>
                <p className="text-lg text-gray-600 dark:text-dark-300 max-w-2xl mx-auto">
                  Available for freelance projects, full-time roles, and interesting conversations about AI/ML.
                </p>
              </div>
              <div className="max-w-2xl mx-auto">
                <div className="bg-white dark:bg-dark-900 rounded-2xl p-8 border border-gray-200 dark:border-dark-700">
                  <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <a
                      href="mailto:Praansu12@gmail.com"
                      className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 dark:bg-dark-800 hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors"
                    >
                      <Mail className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                      <div>
                        <p className="text-sm text-gray-500 dark:text-dark-400">Email</p>
                        <p className="font-medium text-gray-900 dark:text-white">Praansu12@gmail.com</p>
                      </div>
                    </a>
                    <a
                      href="https://np.linkedin.com/in/praansu-karmacharya-694944368"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 dark:bg-dark-800 hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors"
                    >
                      <svg className="w-6 h-6 text-primary-600 dark:text-primary-400" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.141-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.433zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-dark-400">LinkedIn</p>
                        <p className="font-medium text-gray-900 dark:text-white">praansu-karmacharya</p>
                      </div>
                    </a>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <a
                      href="https://github.com/Praansu"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 dark:bg-dark-800 hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors"
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
                      className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 dark:bg-dark-800 hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors"
                    >
                      <Globe className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                      <div>
                        <p className="text-sm text-gray-500 dark:text-dark-400">Portfolio</p>
                        <p className="font-medium text-gray-900 dark:text-white">praansu.github.io</p>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="py-8 px-4 sm:px-6 lg:px-8 border-t border-gray-200 dark:border-dark-700">
            <div className="max-w-7xl mx-auto text-center">
              <p className="text-gray-500 dark:text-dark-400 text-sm">
                Built with Next.js, TypeScript, and Tailwind CSS. Deployed on GitHub Pages.
              </p>
              <p className="text-gray-500 dark:text-dark-400 text-sm mt-2">
                © {new Date().getFullYear()} Praansu Karmacharya. All rights reserved.
              </p>
            </div>
          </footer>
        </body>
      </html>
    </ThemeProvider>
  );
}