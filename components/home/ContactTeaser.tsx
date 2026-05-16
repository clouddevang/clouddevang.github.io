'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Mail, Linkedin, ArrowRight } from 'lucide-react';
import { personal } from '@/data/resume';

export default function ContactTeaser() {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="relative rounded-3xl overflow-hidden border border-accent-blue/20 p-10 sm:p-14 text-center"
          style={{
            background: 'linear-gradient(135deg, rgba(0,212,255,0.06) 0%, rgba(0,255,136,0.04) 100%)',
          }}
        >
          {/* Background glow */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-40 bg-accent-blue/10 rounded-full blur-3xl" />
          </div>

          <p className="font-mono text-xs text-accent-green tracking-widest uppercase mb-3 relative z-10">
            GET IN TOUCH
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4 relative z-10">
            Ready to work{' '}
            <span className="gradient-text">together?</span>
          </h2>
          <p className="text-text-muted max-w-md mx-auto mb-8 relative z-10">
            Open to new opportunities, collaborations, and interesting conversations.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
            <a
              href={`mailto:${personal.email}`}
              className="btn-primary flex items-center gap-2 group"
            >
              <Mail size={18} />
              Send an Email
            </a>
            <a
              href={`https://linkedin.com/in/${personal.linkedin}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary flex items-center gap-2"
            >
              <Linkedin size={18} />
              LinkedIn
            </a>
            <Link
              href="/contact"
              className="flex items-center gap-1.5 text-sm text-accent-blue hover:text-accent-green transition-colors font-medium group"
            >
              Full contact page
              <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
