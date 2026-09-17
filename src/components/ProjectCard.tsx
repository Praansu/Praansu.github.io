'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { Brain, Database, Award, Globe, Server, BookOpen, TrendingUp, ExternalLink } from 'lucide-react';

interface ProjectCardProps {
  name: string;
  description: string;
  tech: string[];
  github: string;
  demo: string | null;
  icon: string;
  highlight: string;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Brain,
  Database,
  Award,
  Globe,
  Server,
  BookOpen,
  TrendingUp,
};

export function ProjectCard({ name, description, tech, github, demo, icon: IconName, highlight }: ProjectCardProps) {
  const Icon = iconMap[IconName] || Brain;
  const ref = useRef<HTMLElement>(null);
  const [transform, setTransform] = useState('perspective(900px) rotateX(0deg) rotateY(0deg)');

  const onMove = (event: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    setTransform(
      `perspective(900px) rotateX(${(-py * 7).toFixed(2)}deg) rotateY(${(px * 9).toFixed(2)}deg) translateY(-4px)`
    );
  };

  const onLeave = () => {
    setTransform('perspective(900px) rotateX(0deg) rotateY(0deg)');
  };

  return (
    <article
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ transform }}
      className="group relative bg-white dark:bg-dark-900 rounded-2xl p-6 border border-gray-200 dark:border-dark-700 hover:border-primary-500/60 dark:hover:border-primary-500/60 transition-[border-color,box-shadow] duration-300 hover:shadow-[0_24px_60px_-24px_rgba(22,163,74,0.45)] will-change-transform"
    >
      <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-primary-500/0 via-primary-500/0 to-primary-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="relative">
        <div className="flex items-start gap-4 mb-4">
          <div className="p-3 bg-primary-100 dark:bg-primary-900/30 rounded-xl text-primary-600 dark:text-primary-400 group-hover:scale-110 transition-transform duration-300">
            <Icon className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h3 className="font-serif text-xl font-bold text-gray-900 dark:text-white">
              {name}
            </h3>
            <p className="text-sm text-primary-600 dark:text-primary-400 font-medium mt-1">
              {highlight}
            </p>
          </div>
        </div>
        <p className="text-gray-600 dark:text-dark-300 mb-4 leading-relaxed">
          {description}
        </p>
        <div className="flex flex-wrap gap-2 mb-5">
          {tech.map((item) => (
            <span
              key={item}
              className="px-2.5 py-1 text-xs font-medium bg-gray-100 dark:bg-dark-800 text-gray-600 dark:text-dark-300 rounded-full"
            >
              {item}
            </span>
          ))}
        </div>
        <div className="flex gap-3">
          <Link
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-gray-100 dark:bg-dark-800 text-gray-700 dark:text-dark-200 font-medium text-sm hover:bg-gray-200 dark:hover:bg-dark-700 transition-colors"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.305-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-.914 3.299-1.23 3.299-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
            Code
          </Link>
          {demo && (
            <Link
              href={demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-primary-600 text-white font-medium text-sm hover:bg-primary-700 transition-colors"
            >
              Live Demo
              <ExternalLink className="w-4 h-4" />
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
