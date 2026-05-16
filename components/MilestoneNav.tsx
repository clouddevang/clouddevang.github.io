'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const sections = [
  { id: 'about',          label: 'About',          number: '01' },
  { id: 'skills',         label: 'Skills',          number: '02' },
  { id: 'experience',     label: 'Experience',      number: '03' },
  { id: 'projects',       label: 'Projects',        number: '04' },
  { id: 'education',      label: 'Education',       number: '05' },
  { id: 'certifications', label: 'Certifications',  number: '06' },
  { id: 'blog',           label: 'Blog',            number: '07' },
  { id: 'contact',        label: 'Contact',         number: '08' },
];

export default function MilestoneNav() {
  const pathname = usePathname();
  const [active, setActive] = useState('');
  const [hovered, setHovered] = useState<string | null>(null);

  // All hooks must be called before any early return (Rules of Hooks).
  // Guard inside the effect body instead.
  useEffect(() => {
    if (pathname !== '/') return;

    const onScroll = () => {
      for (const s of [...sections].reverse()) {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top <= 140) {
          setActive(s.id);
          return;
        }
      }
      setActive('');
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [pathname]);

  if (pathname !== '/') return null;

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const NAVBAR = 72;
    const start = window.scrollY;
    const target = el.getBoundingClientRect().top + window.scrollY - NAVBAR;
    const distance = target - start;
    const duration = 480;
    let startTime: number | null = null;
    const ease = (t: number) => 1 - Math.pow(1 - t, 3);
    function step(now: number) {
      if (!startTime) startTime = now;
      const t = Math.min((now - startTime) / duration, 1);
      window.scrollTo(0, start + distance * ease(t));
      if (t < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  };

  return (
    <div className="fixed right-5 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-4 items-end">
      {sections.map((s) => {
        const isActive = active === s.id;
        return (
          <button
            key={s.id}
            onClick={() => scrollTo(s.id)}
            onMouseEnter={() => setHovered(s.id)}
            onMouseLeave={() => setHovered(null)}
            className="flex items-center gap-2.5 group"
            aria-label={`Go to ${s.label}`}
          >
            {/* Label + number — slide in on hover */}
            <AnimatePresence>
              {hovered === s.id && (
                <motion.div
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 8 }}
                  transition={{ duration: 0.15 }}
                  className="flex items-center gap-1.5 bg-card/90 backdrop-blur-sm border border-border px-2.5 py-1 rounded-lg"
                >
                  <span className="text-xs font-mono text-accent-green">{s.number}</span>
                  <span className="text-xs font-medium text-text-primary whitespace-nowrap">{s.label}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Dot */}
            <motion.div
              animate={
                isActive
                  ? { width: 10, height: 10, backgroundColor: '#00D4FF' }
                  : { width: 6, height: 6, backgroundColor: 'rgba(100,116,139,0.5)' }
              }
              transition={{ duration: 0.2 }}
              className="rounded-full flex-shrink-0"
              style={isActive ? { boxShadow: '0 0 8px rgba(0,212,255,0.7)' } : {}}
            />
          </button>
        );
      })}
    </div>
  );
}
