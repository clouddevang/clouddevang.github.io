'use client';

import { motion } from 'framer-motion';
import { Network, Utensils, Bot, Activity, ExternalLink } from 'lucide-react';
import type { Project } from '@/data/resume';

interface Props {
  project: Project;
  index: number;
}

const iconComponents = [Utensils, Network, Bot, Activity];
const accentColors = ['#00D4FF', '#8B5CF6', '#00FF88', '#FBBF24'];

export default function ProjectPreviewCard({ project, index }: Props) {
  const Icon = iconComponents[index % iconComponents.length];
  const color = accentColors[index % accentColors.length];
  const visibleTech = project.technologies.slice(0, 3);
  const remaining = project.technologies.length - visibleTech.length;
  const destination = project.github ?? project.link;

  const handleClick = () => {
    if (destination) {
      window.open(destination, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.03, y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      onClick={handleClick}
      className="w-72 flex-shrink-0 snap-start bg-card border border-border rounded-2xl p-5 cursor-pointer hover:border-white/20 transition-colors group"
    >
      {/* Icon row */}
      <div className="flex items-start justify-between mb-4">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: color + '20', color }}
        >
          <Icon size={20} />
        </div>
        {destination && (
          <ExternalLink size={14} className="text-text-muted/40 group-hover:text-accent-blue transition-colors flex-shrink-0 mt-1" />
        )}
      </div>

      {/* Title */}
      <h3 className="font-bold text-text-primary text-base mb-2 line-clamp-2 group-hover:text-accent-blue transition-colors">
        {project.title}
      </h3>

      {/* Description */}
      <p className="text-text-muted text-xs leading-relaxed mb-4 line-clamp-3">
        {project.description}
      </p>

      {/* Tech tags */}
      <div className="flex flex-wrap gap-1.5 mt-auto">
        {visibleTech.map((tech) => (
          <span
            key={tech}
            className="text-xs px-2 py-0.5 rounded font-mono bg-border/50 text-text-muted"
          >
            {tech}
          </span>
        ))}
        {remaining > 0 && (
          <span className="text-xs px-2 py-0.5 rounded font-mono bg-border/50 text-text-muted">
            +{remaining}
          </span>
        )}
      </div>
    </motion.div>
  );
}
