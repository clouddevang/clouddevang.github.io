// filepath: components/Experience.tsx
'use client';

import { motion } from 'framer-motion';
import { experience } from '@/data/resume';
import { Briefcase, MapPin, Calendar } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5 },
  },
};

function highlightMetrics(text: string, metrics: string[]): React.ReactNode {
  if (metrics.length === 0) return text;

  let result: React.ReactNode[] = [];
  let lastIndex = 0;

  metrics.forEach((metric, index) => {
    const metricIndex = text.indexOf(metric, lastIndex);
    if (metricIndex !== -1) {
      if (metricIndex > lastIndex) {
        result.push(text.slice(lastIndex, metricIndex));
      }
      result.push(
        <span key={index} className="text-accent-blue font-bold">
          {metric}
        </span>
      );
      lastIndex = metricIndex + metric.length;
    }
  });

  if (lastIndex < text.length) {
    result.push(text.slice(lastIndex));
  }

  return result.length > 0 ? result : text;
}

export default function Experience() {
  return (
    <section id="experience" className="py-20 sm:py-32">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <p className="text-accent-green font-mono text-sm mb-2 tracking-wider">
              CAREER
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
              Work <span className="gradient-text">Experience</span>
            </h2>
          </motion.div>

          {/* Timeline */}
          <div className="relative pl-8 sm:pl-12">
            {/* Timeline Line */}
            <div className="timeline-line" />

            {experience.map((job, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="relative pb-12 last:pb-0"
              >
                {/* Timeline Dot */}
                <div className="timeline-dot" />

                {/* Content Card */}
                <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 ml-4 card-hover">
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-accent-blue">
                        {job.company}
                      </h3>
                      <p className="text-lg text-text-primary font-medium mt-1">
                        {job.role}
                      </p>
                    </div>
                    <div className="flex flex-col sm:items-end gap-2">
                      <span className="inline-flex items-center gap-2 text-sm font-mono text-accent-green bg-accent-green/10 px-3 py-1 rounded-lg">
                        <Calendar size={14} />
                        {job.startDate} – {job.endDate}
                      </span>
                      <span className="inline-flex items-center gap-2 text-sm text-text-muted">
                        <MapPin size={14} />
                        {job.location}
                      </span>
                    </div>
                  </div>

                  {/* Bullet Points */}
                  <ul className="space-y-3">
                    {job.bullets.slice(0, 5).map((bullet, bulletIndex) => (
                      <li
                        key={bulletIndex}
                        className="flex items-start gap-3 text-text-primary/90"
                      >
                        <span className="text-accent-green mt-1.5 flex-shrink-0">
                          ▹
                        </span>
                        <span className="text-sm sm:text-base leading-relaxed">
                          {highlightMetrics(bullet.text, bullet.metrics || [])}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {job.bullets.length > 5 && (
                    <p className="text-text-muted text-sm mt-4 ml-6">
                      + {job.bullets.length - 5} more achievements...
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
