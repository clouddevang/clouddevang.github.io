// filepath: components/Skills.tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { skills } from '@/data/resume';
import {
  Cloud,
  Server,
  GitBranch,
  Activity,
  FileCode,
  Layers,
  Sparkles,
} from 'lucide-react';
import { FaAws, FaMicrosoft } from 'react-icons/fa';

const iconMap: Record<string, React.ReactNode> = {
  aws: <FaAws className="w-5 h-5" />,
  azure: <FaMicrosoft className="w-5 h-5" />,
  iac: <Server className="w-5 h-5" />,
  devops: <GitBranch className="w-5 h-5" />,
  observability: <Activity className="w-5 h-5" />,
  languages: <FileCode className="w-5 h-5" />,
  fullstack: <Layers className="w-5 h-5" />,
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

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  return (
    <section id="skills" className="py-16 sm:py-20 bg-card/30">
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
              EXPERTISE
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
              Technical <span className="gradient-text">Skills</span>
            </h2>
            <p className="text-text-muted mt-4 max-w-2xl mx-auto">
              Technologies and tools I use to build scalable, reliable infrastructure
            </p>
          </motion.div>

          {/* Skills Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((group, index) => (
              <motion.div
                key={group.category}
                variants={itemVariants}
                onMouseEnter={() => setActiveCategory(group.category)}
                onMouseLeave={() => setActiveCategory(null)}
                className={`bg-card border border-border rounded-2xl p-6 card-hover ${
                  activeCategory === group.category ? 'border-accent-blue/40' : ''
                }`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-accent-blue/10 text-accent-blue">
                    {iconMap[group.icon] || <Cloud className="w-5 h-5" />}
                  </div>
                  <h3 className="text-lg font-semibold text-text-primary">
                    {group.category}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <motion.span
                      key={skill.name}
                      whileHover={{ scale: 1.05 }}
                      className="px-3 py-1.5 text-sm font-mono bg-background border border-border rounded-lg text-text-muted hover:border-accent-blue/50 hover:text-accent-blue transition-colors cursor-default"
                    >
                      {skill.name}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Emerging Tech */}
          <motion.div variants={itemVariants} className="mt-12">
            <div className="bg-card border border-accent-green/30 rounded-2xl p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-accent-green/10 text-accent-green">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-semibold text-text-primary">
                  Emerging Tech
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {['Agentic AI Workflows', 'ArgoCD', 'Platform Engineering'].map((skill) => (
                  <motion.span
                    key={skill}
                    whileHover={{ scale: 1.05 }}
                    className="px-3 py-1.5 text-sm font-mono bg-background border border-accent-green/30 rounded-lg text-accent-green cursor-default"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
