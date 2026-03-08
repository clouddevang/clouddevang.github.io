// filepath: components/Education.tsx
'use client';

import { motion } from 'framer-motion';
import { education } from '@/data/resume';
import { GraduationCap, Calendar, MapPin } from 'lucide-react';

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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export default function Education() {
  return (
    <section id="education" className="py-20 sm:py-32">
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
              ACADEMIC BACKGROUND
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
              My <span className="gradient-text">Education</span>
            </h2>
          </motion.div>

          {/* Education Cards */}
          <div className="grid md:grid-cols-2 gap-6">
            {education.map((edu, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="bg-card border border-border rounded-2xl p-6 sm:p-8 card-hover relative overflow-hidden"
              >
                {/* Background Accent */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-accent-blue/10 to-accent-green/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />

                {/* Icon */}
                <div className="relative mb-6">
                  <div className="p-3 rounded-xl bg-accent-blue/10 text-accent-blue w-fit">
                    <GraduationCap size={28} />
                  </div>
                </div>

                {/* Content */}
                <div className="relative">
                  <h3 className="text-xl font-bold text-text-primary mb-2">
                    {edu.degree}, {edu.field}
                  </h3>
                  <p className="text-accent-blue font-medium mb-4">
                    {edu.institution}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 text-sm text-text-muted mb-6">
                    <span className="flex items-center gap-2">
                      <Calendar size={14} />
                      {edu.startYear} – {edu.endYear}
                    </span>
                    <span className="flex items-center gap-2">
                      <MapPin size={14} />
                      {edu.location}
                    </span>
                  </div>

                  {/* GPA Badge */}
                  <div className="inline-flex items-center">
                    <span className="px-4 py-2 rounded-full bg-gradient-to-r from-accent-blue to-accent-green text-background font-bold text-sm glow-blue">
                      GPA: {edu.gpa}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
