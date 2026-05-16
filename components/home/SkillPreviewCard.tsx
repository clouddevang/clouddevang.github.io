'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Server, GitBranch, Activity, FileCode, Layers } from 'lucide-react';
import { FaAws, FaMicrosoft } from 'react-icons/fa';
import type { SkillGroup } from '@/data/resume';

interface Props {
  group: SkillGroup;
}

const categoryConfig: Record<string, { bar: string; color: string; iconBg: string }> = {
  aws:           { bar: 'linear-gradient(90deg,#FF9900,#FFB84D)', color: '#FF9900', iconBg: 'rgba(255,153,0,0.15)' },
  azure:         { bar: 'linear-gradient(90deg,#0078D4,#50B0F0)', color: '#0078D4', iconBg: 'rgba(0,120,212,0.15)' },
  iac:           { bar: 'linear-gradient(90deg,#8B5CF6,#C084FC)', color: '#8B5CF6', iconBg: 'rgba(139,92,246,0.15)' },
  devops:        { bar: 'linear-gradient(90deg,#00FF88,#34D399)', color: '#00FF88', iconBg: 'rgba(0,255,136,0.12)' },
  observability: { bar: 'linear-gradient(90deg,#00D4FF,#67E8F9)', color: '#00D4FF', iconBg: 'rgba(0,212,255,0.12)' },
  languages:     { bar: 'linear-gradient(90deg,#FBBF24,#FDE68A)', color: '#FBBF24', iconBg: 'rgba(251,191,36,0.12)' },
  fullstack:     { bar: 'linear-gradient(90deg,#EC4899,#F9A8D4)', color: '#EC4899', iconBg: 'rgba(236,72,153,0.12)' },
};

const iconMap: Record<string, React.ReactNode> = {
  aws:           <FaAws className="w-5 h-5" />,
  azure:         <FaMicrosoft className="w-5 h-5" />,
  iac:           <Server className="w-5 h-5" />,
  devops:        <GitBranch className="w-5 h-5" />,
  observability: <Activity className="w-5 h-5" />,
  languages:     <FileCode className="w-5 h-5" />,
  fullstack:     <Layers className="w-5 h-5" />,
};

export default function SkillPreviewCard({ group }: Props) {
  const router = useRouter();
  const cfg = categoryConfig[group.icon] ?? categoryConfig.devops;
  const visibleSkills = group.skills.slice(0, 4);
  const remaining = group.skills.length - visibleSkills.length;

  return (
    <motion.div
      whileHover={{ scale: 1.03, y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      onClick={() => router.push(`/skills/${group.icon}`)}
      className="w-52 flex-shrink-0 snap-start bg-card border border-border rounded-2xl overflow-hidden cursor-pointer hover:border-white/20 transition-colors"
    >
      {/* Colored top bar */}
      <div className="h-1 w-full" style={{ background: cfg.bar }} />

      <div className="p-4">
        {/* Icon + Category */}
        <div className="flex items-center gap-2 mb-4">
          <span
            className="p-1.5 rounded-lg flex-shrink-0"
            style={{ color: cfg.color, background: cfg.iconBg }}
          >
            {iconMap[group.icon]}
          </span>
          <h3 className="text-sm font-bold text-text-primary leading-tight">{group.category}</h3>
        </div>

        {/* Skill pills */}
        <div className="flex flex-wrap gap-1.5">
          {visibleSkills.map((skill) => (
            <span
              key={skill.name}
              className="text-xs px-2 py-0.5 rounded font-mono"
              style={{ background: cfg.iconBg, color: cfg.color }}
            >
              {skill.name}
            </span>
          ))}
          {remaining > 0 && (
            <span className="text-xs px-2 py-0.5 rounded font-mono bg-border/50 text-text-muted">
              +{remaining}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
