'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ChevronLeft, ArrowLeft, ArrowRight, Calendar, Building2 } from 'lucide-react';
import { Languages } from 'lucide-react';
import { FaAws, FaMicrosoft } from 'react-icons/fa';
import type { Certification } from '@/data/resume';

interface Props {
  cert: Certification;
  prev: Certification | null;
  next: Certification | null;
}

const typeConfig = {
  aws:   { color: '#FF9900', bg: 'rgba(255,153,0,0.10)',  border: 'rgba(255,153,0,0.30)',  label: 'Amazon Web Services', icon: <FaAws className="w-12 h-12" />      },
  azure: { color: '#0078D4', bg: 'rgba(0,120,212,0.10)', border: 'rgba(0,120,212,0.30)', label: 'Microsoft Azure',      icon: <FaMicrosoft className="w-12 h-12" /> },
  jlpt:  { color: '#E63946', bg: 'rgba(230,57,70,0.10)', border: 'rgba(230,57,70,0.30)', label: 'Japan Foundation',      icon: <Languages className="w-12 h-12" />  },
};

export default function CertDetail({ cert, prev, next }: Props) {
  const cfg = typeConfig[cert.type];

  return (
    <div className="min-h-screen">
      {/* Page Hero */}
      <section className="relative pt-28 pb-10 overflow-hidden grid-pattern">
        <div
          className="absolute top-0 left-1/3 w-96 h-96 rounded-full blur-3xl pointer-events-none opacity-10"
          style={{ background: cfg.color }}
        />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
            <Link
              href="/certifications"
              className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-accent-blue transition-colors mb-6 group"
            >
              <ChevronLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
              All Certifications
            </Link>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.05 }}>
            <p className="font-mono text-xs tracking-widest uppercase mb-4" style={{ color: cfg.color }}>
              CREDENTIALS
            </p>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-text-primary leading-tight mb-6">
              {cert.name}
            </h1>
            <div className="flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-2 text-sm text-text-muted bg-card px-3 py-1.5 rounded-lg border border-border">
                <Building2 size={14} />
                {cert.issuer}
              </span>
              <span
                className="inline-flex items-center gap-2 text-sm font-mono px-3 py-1.5 rounded-lg"
                style={{ background: cfg.bg, color: cfg.color, border: `1px solid ${cfg.border}` }}
              >
                <Calendar size={14} />
                {cert.year}
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Cert card */}
      <section className="pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="rounded-2xl p-10 flex flex-col sm:flex-row items-center gap-8"
            style={{ background: cfg.bg, border: `1px solid ${cfg.border}` }}
          >
            <div style={{ color: cfg.color }} className="flex-shrink-0">
              {cfg.icon}
            </div>
            <div>
              <p className="text-text-muted text-sm font-mono mb-1">{cfg.label}</p>
              <h2 className="text-xl font-bold text-text-primary mb-2">{cert.name}</h2>
              <p className="text-sm" style={{ color: cfg.color }}>Issued {cert.year}</p>
            </div>
          </motion.div>

          {/* Prev / Next */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="flex items-center justify-between mt-10 gap-4"
          >
            {prev ? (
              <Link
                href={`/certifications/${prev.slug}`}
                className="flex items-center gap-2 text-sm text-text-muted hover:text-accent-blue transition-colors group"
              >
                <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
                <div>
                  <p className="text-xs text-text-muted/60 font-mono">Previous</p>
                  <p className="font-medium line-clamp-1">{prev.name}</p>
                </div>
              </Link>
            ) : <div />}

            {next ? (
              <Link
                href={`/certifications/${next.slug}`}
                className="flex items-center gap-2 text-sm text-text-muted hover:text-accent-blue transition-colors group text-right"
              >
                <div>
                  <p className="text-xs text-text-muted/60 font-mono">Next</p>
                  <p className="font-medium line-clamp-1">{next.name}</p>
                </div>
                <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
            ) : <div />}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
