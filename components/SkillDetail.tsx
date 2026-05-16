'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ChevronLeft, ArrowLeft, ArrowRight } from 'lucide-react';
import { Server, GitBranch, Activity, FileCode, Layers, Cloud } from 'lucide-react';
import { Languages } from 'lucide-react';
import { FaAws, FaMicrosoft } from 'react-icons/fa';
import { experience, certifications } from '@/data/resume';
import type { SkillGroup } from '@/data/resume';

interface Props {
  group: SkillGroup;
  prev: SkillGroup | null;
  next: SkillGroup | null;
}

const categoryConfig: Record<string, { bar: string; color: string; iconBg: string; badgeColor: string }> = {
  aws:           { bar: 'linear-gradient(90deg,#FF9900,#FFB84D)', color: '#FF9900', iconBg: 'rgba(255,153,0,0.15)',   badgeColor: 'rgba(255,153,0,0.10)'   },
  azure:         { bar: 'linear-gradient(90deg,#0078D4,#50B0F0)', color: '#0078D4', iconBg: 'rgba(0,120,212,0.15)',  badgeColor: 'rgba(0,120,212,0.10)'   },
  iac:           { bar: 'linear-gradient(90deg,#8B5CF6,#C084FC)', color: '#8B5CF6', iconBg: 'rgba(139,92,246,0.15)', badgeColor: 'rgba(139,92,246,0.10)'  },
  devops:        { bar: 'linear-gradient(90deg,#00FF88,#34D399)', color: '#00FF88', iconBg: 'rgba(0,255,136,0.12)',  badgeColor: 'rgba(0,255,136,0.08)'   },
  observability: { bar: 'linear-gradient(90deg,#00D4FF,#67E8F9)', color: '#00D4FF', iconBg: 'rgba(0,212,255,0.12)', badgeColor: 'rgba(0,212,255,0.08)'   },
  languages:     { bar: 'linear-gradient(90deg,#FBBF24,#FDE68A)', color: '#FBBF24', iconBg: 'rgba(251,191,36,0.12)', badgeColor: 'rgba(251,191,36,0.08)'  },
  fullstack:     { bar: 'linear-gradient(90deg,#EC4899,#F9A8D4)', color: '#EC4899', iconBg: 'rgba(236,72,153,0.12)', badgeColor: 'rgba(236,72,153,0.08)'  },
};

const iconMap: Record<string, React.ReactNode> = {
  aws:           <FaAws className="w-7 h-7" />,
  azure:         <FaMicrosoft className="w-7 h-7" />,
  iac:           <Server className="w-7 h-7" />,
  devops:        <GitBranch className="w-7 h-7" />,
  observability: <Activity className="w-7 h-7" />,
  languages:     <FileCode className="w-7 h-7" />,
  fullstack:     <Layers className="w-7 h-7" />,
};

// Map skill icon to cert type
const skillToCertType: Record<string, string> = { aws: 'aws', azure: 'azure', jlpt: 'jlpt' };

function highlightSkills(text: string, skillNames: string[]): React.ReactNode {
  // Sort by length descending so longer names match first (e.g. "Secrets Manager" before "Manager")
  const sorted = [...skillNames].sort((a, b) => b.length - a.length);
  const pattern = new RegExp(`(${sorted.map(s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'gi');
  const parts = text.split(pattern);
  return parts.map((part, i) =>
    skillNames.some(s => s.toLowerCase() === part.toLowerCase())
      ? <span key={i} className="text-accent-blue font-semibold">{part}</span>
      : part
  );
}

export default function SkillDetail({ group, prev, next }: Props) {
  const cfg = categoryConfig[group.icon] ?? categoryConfig.devops;
  const skillNames = group.skills.map(s => s.name);

  // Related certifications — match cert type to skill icon
  const relatedCerts = certifications.filter(c => c.type === skillToCertType[group.icon]);

  // Related experience bullets — any bullet mentioning at least one skill from this group
  const relatedBullets: { company: string; role: string; text: string; metrics: string[] }[] = [];
  for (const job of experience) {
    for (const bullet of job.bullets) {
      if (skillNames.some(s => bullet.text.toLowerCase().includes(s.toLowerCase()))) {
        relatedBullets.push({ company: job.company, role: job.role, text: bullet.text, metrics: bullet.metrics ?? [] });
        if (relatedBullets.length >= 4) break;
      }
    }
    if (relatedBullets.length >= 4) break;
  }

  const certTypeConfig: Record<string, { color: string; icon: React.ReactNode }> = {
    aws:   { color: '#FF9900', icon: <FaAws className="w-4 h-4" />      },
    azure: { color: '#0078D4', icon: <FaMicrosoft className="w-4 h-4" /> },
    jlpt:  { color: '#E63946', icon: <Languages className="w-4 h-4" />  },
  };

  return (
    <div className="min-h-screen">
      {/* Page Hero */}
      <section className="relative pt-28 pb-10 overflow-hidden grid-pattern">
        <div className="absolute top-0 left-1/3 w-96 h-96 rounded-full blur-3xl pointer-events-none opacity-10" style={{ background: cfg.color }} />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
            <Link href="/skills" className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-accent-blue transition-colors mb-6 group">
              <ChevronLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
              All Skills
            </Link>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.05 }}>
            <p className="font-mono text-xs tracking-widest uppercase mb-3" style={{ color: cfg.color }}>EXPERTISE</p>
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 rounded-2xl flex-shrink-0" style={{ background: cfg.iconBg, color: cfg.color }}>
                {iconMap[group.icon] ?? <Cloud className="w-7 h-7" />}
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary">{group.category}</h1>
            </div>
            <p className="text-text-muted text-sm">{group.skills.length} technologies</p>
          </motion.div>
        </div>
      </section>

      <section className="pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">

          {/* Description */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }}>
            <div className="h-1 rounded-full mb-6" style={{ background: cfg.bar }} />
            <p className="text-text-primary/85 leading-relaxed text-base">{group.description}</p>
          </motion.div>

          {/* Skills */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.15 }}>
            <h2 className="text-lg font-semibold text-text-primary mb-4">Technologies</h2>
            <div className="flex flex-wrap gap-3">
              {group.skills.map((skill, i) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2, delay: 0.2 + i * 0.04 }}
                  className="px-5 py-2.5 rounded-xl font-mono text-sm font-medium border"
                  style={{ background: cfg.badgeColor, color: cfg.color, borderColor: cfg.color + '40' }}
                >
                  {skill.name}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Related Certifications */}
          {relatedCerts.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.25 }}>
              <h2 className="text-lg font-semibold text-text-primary mb-4">Related Certifications</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {relatedCerts.map((cert) => {
                  const cc = certTypeConfig[cert.type];
                  return (
                    <Link
                      key={cert.slug}
                      href={`/certifications/${cert.slug}`}
                      className="flex items-center gap-3 bg-card border border-border rounded-xl p-4 hover:border-accent-blue/40 transition-colors group"
                    >
                      <span style={{ color: cc.color }}>{cc.icon}</span>
                      <div className="min-w-0">
                        <p className="text-text-primary text-sm font-medium line-clamp-1 group-hover:text-accent-blue transition-colors">{cert.name}</p>
                        <p className="text-text-muted text-xs font-mono mt-0.5">{cert.year}</p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* Related Experience */}
          {relatedBullets.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.3 }}>
              <h2 className="text-lg font-semibold text-text-primary mb-4">In Practice</h2>
              <div className="bg-card border border-border rounded-2xl p-6 space-y-5">
                {relatedBullets.map((b, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="text-accent-green mt-1 flex-shrink-0">▹</span>
                    <div>
                      <p className="text-xs font-mono text-text-muted mb-1">{b.company} · {b.role}</p>
                      <p className="text-text-primary/85 text-sm leading-relaxed">
                        {highlightSkills(b.text, skillNames)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Prev / Next */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.35 }}
            className="flex items-center justify-between pt-4 gap-4 border-t border-border"
          >
            {prev ? (
              <Link href={`/skills/${prev.icon}`} className="flex items-center gap-2 text-sm text-text-muted hover:text-accent-blue transition-colors group">
                <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
                <div>
                  <p className="text-xs text-text-muted/60 font-mono">Previous</p>
                  <p className="font-medium">{prev.category}</p>
                </div>
              </Link>
            ) : <div />}
            {next ? (
              <Link href={`/skills/${next.icon}`} className="flex items-center gap-2 text-sm text-text-muted hover:text-accent-blue transition-colors group text-right">
                <div>
                  <p className="text-xs text-text-muted/60 font-mono">Next</p>
                  <p className="font-medium">{next.category}</p>
                </div>
                <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
            ) : <div />}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
