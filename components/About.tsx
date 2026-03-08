// filepath: components/About.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { personal, stats } from '@/data/resume';

function AnimatedCounter({
  value,
  suffix = '',
  prefix = '',
}: {
  value: string;
  suffix?: string;
  prefix?: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const numericValue = parseInt(value.replace(/,/g, ''), 10);

  useEffect(() => {
    if (!isInView) return;

    const duration = 2000;
    const steps = 60;
    const stepValue = numericValue / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += stepValue;
      if (current >= numericValue) {
        setCount(numericValue);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isInView, numericValue]);

  const formattedCount =
    numericValue >= 1000 ? count.toLocaleString() : count.toString();

  return (
    <span ref={ref}>
      {prefix}
      {isInView ? formattedCount : '0'}
      {suffix}
    </span>
  );
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export default function About() {
  const paragraphs = personal.summary.split('. ').reduce(
    (acc, sentence, i, arr) => {
      if (i < arr.length / 2) {
        acc[0] += sentence + '. ';
      } else {
        acc[1] += sentence + '. ';
      }
      return acc;
    },
    ['', '']
  );

  return (
    <section id="about" className="pt-6 pb-16 sm:pt-8 sm:pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <p className="text-accent-green font-mono text-sm mb-2 tracking-wider">
              INTRODUCTION
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
              About <span className="gradient-text">Me</span>
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-12 items-center">
            {/* Avatar */}
            <motion.div
              variants={itemVariants}
              className="flex justify-center lg:justify-end"
            >
              <div className="relative">
                <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-full bg-gradient-to-br from-accent-blue to-accent-green p-1">
                  <div className="w-full h-full rounded-full bg-card flex items-center justify-center">
                    <span className="text-5xl sm:text-6xl font-bold gradient-text">
                      DG
                    </span>
                  </div>
                </div>
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-accent-blue/30 to-accent-green/30 blur-2xl -z-10" />
              </div>
            </motion.div>

            {/* Bio */}
            <motion.div variants={itemVariants} className="lg:col-span-2 space-y-6">
              <p className="text-text-primary/90 text-base sm:text-lg leading-relaxed">
                {paragraphs[0]}
              </p>
              <p className="text-text-primary/90 text-base sm:text-lg leading-relaxed">
                {paragraphs[1]}
              </p>
            </motion.div>
          </div>

          {/* Stats */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-16"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="bg-card border border-border rounded-2xl p-6 text-center card-hover"
              >
                <div className="text-3xl sm:text-4xl font-bold gradient-text mb-2">
                  <AnimatedCounter
                    value={stat.value}
                    suffix={stat.suffix || ''}
                    prefix={stat.label === 'Cost Savings' ? '$' : ''}
                  />
                </div>
                <p className="text-text-muted text-sm sm:text-base">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
