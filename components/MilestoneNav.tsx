'use client';

import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const pages = [
  { href: '/about',          label: 'About',         number: '01' },
  { href: '/experience',     label: 'Experience',    number: '02' },
  { href: '/skills',         label: 'Skills',        number: '03' },
  { href: '/projects',       label: 'Projects',      number: '04' },
  { href: '/certifications', label: 'Certifications',number: '05' },
  { href: '/blog',           label: 'Blog',          number: '06' },
  { href: '/contact',        label: 'Contact',       number: '07' },
];

export default function MilestoneNav() {
  const pathname = usePathname();
  const router = useRouter();
  const [hovered, setHovered] = useState<string | null>(null);

  // Only show on the home page
  if (pathname !== '/') return null;

  return (
    <div className="fixed right-5 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-4 items-end">
      {pages.map((page) => {
        const isActive = pathname === page.href;
        return (
          <button
            key={page.href}
            onClick={() => router.push(page.href)}
            onMouseEnter={() => setHovered(page.href)}
            onMouseLeave={() => setHovered(null)}
            className="flex items-center gap-2.5 group"
            aria-label={`Go to ${page.label}`}
          >
            {/* Label + number — slide in on hover */}
            <AnimatePresence>
              {hovered === page.href && (
                <motion.div
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 8 }}
                  transition={{ duration: 0.15 }}
                  className="flex items-center gap-1.5 bg-card/90 backdrop-blur-sm border border-border px-2.5 py-1 rounded-lg"
                >
                  <span className="text-xs font-mono text-accent-green">{page.number}</span>
                  <span className="text-xs font-medium text-text-primary whitespace-nowrap">
                    {page.label}
                  </span>
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
