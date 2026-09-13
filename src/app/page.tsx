'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
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
} from 'lucide-react';

const projects = [
  {
    name: 'AI Research Agent',
    description: 'Custom agent loop (no framework) combining document RAG with live web search. Streams tool calls live via SSE. Built with FastAPI, ChromaDB, Groq Llama 3.1 8B.',
    tech: ['Python', 'FastAPI', 'ChromaDB', 'Groq', 'SSE'],
    github: 'https://github.com/Praansu/ai-research-agent',
    demo: 'https://praansu.github.io/ai-research-agent',
    icon: Brain,
    highlight: 'No-framework agent loop with transparent fallback',
  },
  {
    name: 'PDF Chat RAG',
    description: 'Full RAG pipeline with document CRUD, streaming SSE responses, and GDPR-compliant deletion. PyMuPDF extraction, sentence-transformers embeddings, ChromaDB retrieval.',
    tech: ['Python', 'FastAPI', 'ChromaDB', 'PyMuPDF', 'SSE'],
    github: 'https://github.com/Praansu/pdf-chat-rag',
    demo: 'https://praansu.github.io/pdf-chat-rag',
    icon: Database,
    highlight: 'Full CRUD + streaming + GDPR-compliant deletion',
  },
  {
    name: 'Vehicle Image Classifier',
    description: 'ResNet18 transfer learning classifying bus/car/motorcycle/truck at 90% accuracy (400 images). Includes confusion matrix visualization and FastAPI inference API.',
    tech: ['PyTorch', 'ResNet18', 'FastAPI', 'Docker'],
    github: 'https://github.com/Praansu/vehicle-image-classifier',
    demo: 'https://praansu.github.io/vehicle-image-classifier',
    icon: Award,
    highlight: 'Confusion matrix + per-class accuracy, not just 90%',
  },
  {
    name: 'EcoVerda',
    description: 'Full-stack e-commerce for eco products — Next.js 16, TypeScript, Prisma, Stripe. Blur-up image placeholders, debounced search with URL sync, cart persistence.',
    tech: ['Next.js 16', 'TypeScript', 'Prisma', 'Stripe', 'Tailwind'],
    github: 'https://github.com/Praansu/eco-verda',
    demo: 'https://praansu.github.io/eco-verda',
    icon: Globe,
    highlight: 'Static export + blur-up placeholders + debounced search',
  },
  {
    name: 'ParkX',
    description: 'IoT smart parking system — ESP32 firmware, FastAPI backend, real-time web dashboard with AI chatbot and booking system.',
    tech: ['ESP32', 'FastAPI', 'WebSockets', 'IoT'],
    github: 'https://github.com/Praansu/ParkX',
    demo: null,
    icon: Server,
    highlight: 'ESP32 + FastAPI + real-time dashboard',
  },
  {
    name: 'Small Agent Reliability',
    description: 'Research: evaluating 9 models (1B–9B) as autonomous agents across 31 capability tasks + 14 reliability tasks. Qwen 2.5 Coder 7B leads at 85% composite reliability.',
    tech: ['Python', 'Ollama', 'Statistical Analysis', 'LaTeX'],
    github: 'https://github.com/Praansu/small-agent-reliability',
    demo: null,
    icon: BookOpen,
    highlight: 'Reliability ≠ model size; code-specialization beats raw scale',
  },
];

const skills = {
  'ML/AI': [
    { name: 'PyTorch', level: 90 },
    { name: 'scikit-learn', level: 85 },
    { name: 'XGBoost', level: 80 },
    { name: 'OpenCV', level: 75 },
    { name: 'sentence-transformers', level: 85 },
  ],
  'LLM/RAG': [
    { name: 'Groq (Llama 3)', level: 90 },
    { name: 'ChromaDB', level: 90 },
    { name: 'Agent loops (no framework)', level: 85 },
    { name: 'Tool calling', level: 85 },
    { name: 'RAG pipelines', level: 90 },
  ],
  'Backend': [
    { name: 'FastAPI', level: 90 },
    { name: 'Python', level: 95 },
    { name: 'Prisma ORM', level: 80 },
    { name: 'SQLite/PostgreSQL', level: 80 },
    { name: 'Docker', level: 80 },
  ],
  'Frontend': [
    { name: 'Next.js 14/15', level: 85 },
    { name: 'TypeScript', level: 85 },
    { name: 'Tailwind CSS', level: 90 },
    { name: 'React', level: 85 },
    { name: 'Vanilla JS', level: 80 },
  ],
  'IoT/Other': [
    { name: 'ESP32/Arduino', level: 75 },
    { name: 'Git/GitHub Actions', level: 85 },
    { name: 'Linux/CLI', level: 80 },
    { name: 'LaTeX', level: 70 },
  ],
};

const experience = [
  {
    role: 'CS Student',
    company: 'Islington College, Kathmandu',
    period: '2023 — Present',
    description: 'Bachelor of Computer Science. Focus on ML, AI, and full-stack development.',
  },
  {
    role: 'Freelance AI/ML Engineer',
    company: 'Self-employed',
    period: '2024 — Present',
    description: 'Building RAG pipelines, custom agent loops, ML model deployment, and full-stack AI products for clients.',
  },
];

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('darkMode');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(saved ? JSON.parse(saved) : prefersDark);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode, mounted]);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-white dark:bg-dark-950 flex items-center justify-center">
        <div className="animate-pulse text-primary-600 dark:text-primary-400 text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark bg-dark-950 text-dark-50' : 'bg-white text-gray-900'}`}>
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/80 dark:bg-dark-950/80 border-b border-gray-200 dark:border-dark-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="font-serif text-xl font-bold text-gray-900 dark:text-white">
              Praansu Karmacharya
            </Link>
            <div className="hidden md:flex items-center gap-8">
              <Link href="#projects" className="text-sm font-medium text-gray-600 dark:text-dark-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                Projects
              </Link>
              <Link href="#skills" className="text-sm font-medium text-gray-600 dark:text-dark-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                Skills
              </Link>
              <Link href="#experience" className="text-sm font-medium text-gray-600 dark:text-dark-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                Experience
              </Link>
              <Link href="#contact" className="text-sm font-medium text-gray-600 dark:text-dark-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                Contact
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-lg bg-gray-100 dark:bg-dark-800 text-gray-600 dark:text-dark-300 hover:bg-gray-200 dark:hover:bg-dark-700 transition-colors"
                aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center pt-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="animate-fade-in">
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
                <Link
                  href="#projects"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary-600 text-white font-semibold text-sm hover:bg-primary-700 transition-colors"
                >
                  View Projects
                  <ChevronRight className="w-4 h-4" />
                </Link>
                <Link
                  href="#contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border-2 border-gray-300 dark:border-dark-600 text-gray-700 dark:text-dark-200 font-semibold text-sm hover:bg-gray-100 dark:hover:bg-dark-800 transition-colors"
                >
                  Get in Touch
                  <MailIcon className="w-4 h-4" />
                </Link>
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
                  <MailIcon className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                  <span>Praansu12@gmail.com</span>
                </div>
              </div>
            </div>
            <div className="relative animate-slide-up">
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
            {projects.map((project, index) => (
              <article
                key={project.name}
                className="group bg-white dark:bg-dark-900 rounded-2xl p-6 border border-gray-200 dark:border-dark-700 hover:border-primary-500/50 dark:hover:border-primary-500/50 transition-all duration-300 hover:shadow-xl"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 bg-primary-100 dark:bg-primary-900/30 rounded-xl text-primary-600 dark:text-primary-400">
                    <project.icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-serif text-xl font-bold text-gray-900 dark:text-white">
                      {project.name}
                    </h3>
                    <p className="text-sm text-primary-600 dark:text-primary-400 font-medium mt-1">
                      {project.highlight}
                    </p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-dark-300 mb-4 leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 text-xs font-medium bg-gray-100 dark:bg-dark-800 text-gray-600 dark:text-dark-300 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-3">
                  <Link
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-gray-100 dark:bg-dark-800 text-gray-700 dark:text-dark-200 font-medium text-sm hover:bg-gray-200 dark:hover:bg-dark-700 transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    Code
                  </Link>
                  {project.demo && (
                    <Link
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-primary-600 text-white font-medium text-sm hover:bg-primary-700 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Demo
                    </Link>
                  )}
                </div>
              </article>
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
                  {category === 'ML/AI' && <Brain className="w-6 h-6 text-primary-600 dark:text-primary-400" />}
                  {category === 'LLM/RAG' && <Zap className="w-6 h-6 text-primary-600 dark:text-primary-400" />}
                  {category === 'Backend' && <Server className="w-6 h-6 text-primary-600 dark:text-primary-400" />}
                  {category === 'Frontend' && <Code className="w-6 h-6 text-primary-600 dark:text-primary-400" />}
                  {category === 'IoT/Other' && <Globe className="w-6 h-6 text-primary-600 dark:text-primary-400" />}
                  <h3 className="font-serif text-xl font-bold text-gray-900 dark:text-white">
                    {category}
                  </h3>
                </div>
                <div className="space-y-4">
                  {items.map((skill) => (
                    <div key={skill.name}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-medium text-gray-700 dark:text-dark-300">{skill.name}</span>
                        <span className="text-gray-500 dark:text-dark-400">{skill.level}%</span>
                      </div>
                      <div className="h-2 bg-gray-100 dark:bg-dark-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary-600 dark:bg-primary-500 rounded-full transition-all duration-1000 ease-out"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
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
                style={{ animationDelay: `${index * 200}ms` }}
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
                  <Linkedin className="w-6 h-6 text-primary-600 dark:text-primary-400" />
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
                  <Github className="w-6 h-6 text-primary-600 dark:text-primary-400" />
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
    </div>
  );
}