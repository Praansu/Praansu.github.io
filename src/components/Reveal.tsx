'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const EASE = [0.16, 1, 0.3, 1] as const;

interface RevealProps {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}

/** Restrained fade-rise reveal. No blur, no scale — print calm. */
export function Reveal({ children, delay = 0, y = 18, className }: RevealProps) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: reduce ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay, ease: [...EASE] }}
    >
      {children}
    </motion.div>
  );
}

function useInViewOnce<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      el.classList.add('is-inview');
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-inview');
            io.disconnect();
          }
        }
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}

interface MaskLinesProps {
  lines: ReactNode[];
  className?: string;
  stagger?: number;
}

/**
 * Line-mask headline reveal. The observer watches the untransformed
 * `.mask` wrapper; CSS transitions move the inner `.line` span.
 */
export function MaskLines({ lines, className, stagger = 0.09 }: MaskLinesProps) {
  const ref = useInViewOnce<HTMLSpanElement>();
  return (
    <span ref={ref} className={`mask-group ${className ?? ''}`} style={{ display: 'block' }}>
      {lines.map((line, i) => (
        <span key={i} className="mask" aria-hidden={i > 0}>
          <span
            className="line"
            style={{ transitionDelay: `${i * stagger}s` }}
          >
            {line}
          </span>
        </span>
      ))}
    </span>
  );
}

/** A hairline rule that draws itself left-to-right on scroll into view. */
export function Rule({ className = '' }: { className?: string }) {
  const ref = useInViewOnce<HTMLHRElement>();
  return <hr ref={ref} className={`rule-grow hairline border-t ${className}`} />;
}
