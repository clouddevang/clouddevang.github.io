'use client';

import { motion } from 'framer-motion';

interface PageHeroProps {
  label?: string;
  title: string;
  titleHighlight: string;
  description?: string;
}

export default function PageHero({ title, titleHighlight, description }: PageHeroProps) {
  const beforeHighlight = title.slice(0, title.lastIndexOf(titleHighlight));
  const afterHighlight  = title.slice(title.lastIndexOf(titleHighlight) + titleHighlight.length);

  return (
    <section className="relative pt-28 pb-12 overflow-hidden grid-pattern">
      {/* Background orb */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent-blue/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-text-primary mb-4 leading-tight">
            {beforeHighlight}
            <span className="gradient-text">{titleHighlight}</span>
            {afterHighlight}
          </h1>
          {description && (
            <p className="text-text-muted text-lg max-w-2xl leading-relaxed">
              {description}
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
