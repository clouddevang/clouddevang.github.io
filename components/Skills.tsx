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

const categoryGlow: Record<string, { shadow: string; border: string; iconBg: string }> = {
  aws:           { shadow: '0 0 32px rgba(255,153,0,0.18)',    border: 'rgba(255,153,0,0.45)',    iconBg: 'rgba(255,153,0,0.15)' },
  azure:         { shadow: '0 0 32px rgba(0,120,212,0.18)',    border: 'rgba(0,120,212,0.45)',    iconBg: 'rgba(0,120,212,0.15)' },
  iac:           { shadow: '0 0 32px rgba(139,92,246,0.18)',   border: 'rgba(139,92,246,0.45)',   iconBg: 'rgba(139,92,246,0.15)' },
  devops:        { shadow: '0 0 32px rgba(0,255,136,0.15)',    border: 'rgba(0,255,136,0.45)',    iconBg: 'rgba(0,255,136,0.12)' },
  observability: { shadow: '0 0 32px rgba(0,212,255,0.15)',    border: 'rgba(0,212,255,0.45)',    iconBg: 'rgba(0,212,255,0.12)' },
  languages:     { shadow: '0 0 32px rgba(251,191,36,0.18)',   border: 'rgba(251,191,36,0.45)',   iconBg: 'rgba(251,191,36,0.12)' },
  fullstack:     { shadow: '0 0 32px rgba(236,72,153,0.18)',   border: 'rgba(236,72,153,0.45)',   iconBg: 'rgba(236,72,153,0.12)' },
};

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
    <section id="skills" className="pt-6 pb-16 sm:pt-8 sm:pb-20 bg-card/30">
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
            {skills.map((group, index) => {
              const glow = categoryGlow[group.icon];
              const isActive = activeCategory === group.category;
              return (
              <motion.div
                key={group.category}
                variants={itemVariants}
                onMouseEnter={() => setActiveCategory(group.category)}
                onMouseLeave={() => setActiveCategory(null)}
                className="bg-card border border-border rounded-2xl p-6 transition-all duration-300"
                style={isActive ? {
                  boxShadow: glow?.shadow,
                  borderColor: glow?.border,
                  transform: 'translateY(-4px)',
                } : {}}
              >
                <div className="flex items-center gap-3 mb-4">
                  <motion.div
                    animate={isActive ? { scale: 1.15, rotate: 5 } : { scale: 1, rotate: 0 }}
                    transition={{ duration: 0.2 }}
                    className="p-2 rounded-lg transition-colors duration-300"
                    style={{ background: isActive && glow ? glow.iconBg : 'rgba(0,212,255,0.1)', color: 'var(--accent-blue)' }}
                  >
                    {iconMap[group.icon] || <Cloud className="w-5 h-5" />}
                  </motion.div>
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
            );})}
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
