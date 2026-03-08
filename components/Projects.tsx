// filepath: components/Projects.tsx
'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { projects } from '@/data/resume';
import { BookOpen, Github, Shield, DollarSign, Activity, MessageSquare } from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  'Zero-Trust Platform Redesign': <Shield className="w-8 h-8" />,
  'Cloud Cost Optimization': <DollarSign className="w-8 h-8" />,
  'Unified Observability Stack': <Activity className="w-8 h-8" />,
  'Slack–Jira DevOps Automation': <MessageSquare className="w-8 h-8" />,
};

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

export default function Projects() {
  return (
    <section id="projects" className="pt-6 pb-16 sm:pt-8 sm:pb-20 bg-card/30">
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
              PORTFOLIO
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
              Featured <span className="gradient-text">Projects</span>
            </h2>
            <p className="text-text-muted mt-4 max-w-2xl mx-auto">
              Key infrastructure and platform initiatives I&apos;ve led
            </p>
          </motion.div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="bg-card border border-border rounded-2xl p-6 sm:p-8 card-hover group"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 rounded-xl bg-accent-blue/10 text-accent-blue">
                    {iconMap[project.title] || <Activity className="w-8 h-8" />}
                  </div>
                  <div className="flex items-center gap-3">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-text-muted hover:text-accent-blue transition-colors"
                        aria-label="View on GitHub"
                      >
                        <Github size={20} />
                      </a>
                    )}
                    {project.link && (
                      <Link
                        href={project.link}
                        className="text-text-muted hover:text-accent-blue transition-colors"
                        aria-label="Read case study"
                      >
                        <BookOpen size={20} />
                      </Link>
                    )}
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-text-primary mb-3 group-hover:text-accent-blue transition-colors">
                  {project.title}
                </h3>
                <p className="text-text-muted text-sm sm:text-base leading-relaxed mb-4">
                  {project.description}
                </p>

                {/* Metrics */}
                {project.metrics && (
                  <p className="text-accent-green font-mono text-sm mb-4">
                    {project.metrics}
                  </p>
                )}

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 text-xs font-mono bg-accent-green/10 text-accent-green rounded-md"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
