'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Calendar, MapPin, ArrowLeft, ArrowRight, ChevronLeft } from 'lucide-react';
import type { Experience } from '@/data/resume';

interface Props {
  job: Experience;
  prev: Experience | null;
  next: Experience | null;
}

function highlightMetrics(text: string, metrics: string[]): React.ReactNode {
  if (!metrics.length) return text;
  const result: React.ReactNode[] = [];
  let lastIndex = 0;
  metrics.forEach((metric, i) => {
    const idx = text.indexOf(metric, lastIndex);
    if (idx !== -1) {
      if (idx > lastIndex) result.push(text.slice(lastIndex, idx));
      result.push(<span key={i} className="text-accent-blue font-bold">{metric}</span>);
      lastIndex = idx + metric.length;
    }
  });
  if (lastIndex < text.length) result.push(text.slice(lastIndex));
  return result.length ? result : text;
}

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, delay: i * 0.06 },
  }),
};

export default function ExperienceDetail({ job, prev, next }: Props) {
  return (
    <div className="min-h-screen">
      {/* Page Hero */}
      <section className="relative pt-28 pb-10 overflow-hidden grid-pattern">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent-blue/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back link */}
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Link
              href="/experience"
              className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-accent-blue transition-colors mb-6 group"
            >
              <ChevronLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
              All Experience
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
          >
            <p className="font-mono text-xs text-accent-green tracking-widest uppercase mb-3">
              CAREER
            </p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary mb-3 leading-tight">
              <span className="gradient-text">{job.company}</span>
            </h1>
            <p className="text-xl text-text-primary/80 font-medium mb-5">{job.role}</p>

            {/* Meta badges */}
            <div className="flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-2 text-sm font-mono text-accent-green bg-accent-green/10 px-3 py-1.5 rounded-lg">
                <Calendar size={14} />
                {job.startDate} – {job.endDate}
              </span>
              <span className="inline-flex items-center gap-2 text-sm text-text-muted bg-card px-3 py-1.5 rounded-lg border border-border">
                <MapPin size={14} />
                {job.location}
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Bullets */}
      <section className="pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-card border border-border rounded-2xl p-6 sm:p-10">
            <ul className="space-y-5">
              {job.bullets.map((bullet, i) => (
                <motion.li
                  key={i}
                  custom={i}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  className="flex items-start gap-4"
                >
                  <span className="text-accent-green mt-1.5 flex-shrink-0 text-lg leading-none">▹</span>
                  <span className="text-text-primary/90 text-sm sm:text-base leading-relaxed">
                    {highlightMetrics(bullet.text, bullet.metrics ?? [])}
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Prev / Next navigation */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="flex items-center justify-between mt-10 gap-4"
          >
            {prev ? (
              <Link
                href={`/experience/${prev.slug}`}
                className="flex items-center gap-2 text-sm text-text-muted hover:text-accent-blue transition-colors group"
              >
                <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
                <div className="text-left">
                  <p className="text-xs text-text-muted/60 font-mono">Previous</p>
                  <p className="font-medium">{prev.company}</p>
                </div>
              </Link>
            ) : (
              <div />
            )}

            {next ? (
              <Link
                href={`/experience/${next.slug}`}
                className="flex items-center gap-2 text-sm text-text-muted hover:text-accent-blue transition-colors group text-right"
              >
                <div>
                  <p className="text-xs text-text-muted/60 font-mono">Next</p>
                  <p className="font-medium">{next.company}</p>
                </div>
                <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
            ) : (
              <div />
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
