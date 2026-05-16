'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Home, ArrowLeft, Terminal } from 'lucide-react';

const lines = [
  { text: '$ kubectl get page /unknown', delay: 0 },
  { text: 'Error: NotFound — no resources found', delay: 0.4, error: true },
  { text: '$ ping clouddevang.github.io/unknown', delay: 0.9 },
  { text: 'Request timeout for icmp_seq 404', delay: 1.3, error: true },
  { text: '$ exit 1', delay: 1.8 },
];

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="hidden md:block absolute top-1/4 left-1/4 w-96 h-96 bg-accent-blue/10 rounded-full blur-[128px]" />
      <div className="hidden md:block absolute bottom-1/4 right-1/4 w-72 h-72 bg-accent-green/8 rounded-full blur-[96px]" />

      <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 text-center">

        {/* 404 number */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-4"
        >
          <span className="text-[10rem] sm:text-[14rem] font-bold leading-none select-none"
            style={{
              background: 'linear-gradient(135deg, #00D4FF 0%, #00FF88 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              opacity: 0.15,
            }}
          >
            404
          </span>
        </motion.div>

        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex justify-center mb-6 -mt-16 sm:-mt-24"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-red-500/40 bg-red-500/10 text-red-400 text-sm font-mono">
            <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
            503 Service Unavailable
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="text-2xl sm:text-3xl font-bold text-text-primary mb-3"
        >
          Page not found in <span className="gradient-text">cluster</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="text-text-muted mb-8 max-w-md mx-auto"
        >
          The resource you requested has been scaled to zero, migrated, or never existed.
        </motion.p>

        {/* Terminal block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="bg-card border border-border rounded-xl p-5 mb-8 text-left font-mono text-sm"
        >
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-border">
            <Terminal size={14} className="text-accent-green" />
            <span className="text-text-muted text-xs">terminal</span>
            <div className="ml-auto flex gap-1.5">
              <span className="w-3 h-3 rounded-full bg-red-500/60" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/60" />
              <span className="w-3 h-3 rounded-full bg-green-500/60" />
            </div>
          </div>
          <div className="space-y-1.5">
            {lines.map((line, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: line.delay }}
                className={line.error ? 'text-red-400' : 'text-accent-green'}
              >
                {line.text}
              </motion.p>
            ))}
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.2 }}
              className="inline-block w-2 h-4 bg-accent-blue ml-0.5 typewriter-cursor"
            />
          </div>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href="/" className="btn-primary flex items-center gap-2 group">
            <Home size={18} />
            Back to Home
          </Link>
          <Link
            href="/experience"
            className="btn-secondary flex items-center gap-2 group"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-0.5 transition-transform" />
            View Experience
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
