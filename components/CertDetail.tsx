'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ChevronLeft, ArrowLeft, ArrowRight, Calendar, Building2 } from 'lucide-react';
import { Languages } from 'lucide-react';
import { FaAws, FaMicrosoft } from 'react-icons/fa';
import { experience, skills } from '@/data/resume';
import type { Certification } from '@/data/resume';

interface Props {
  cert: Certification;
  prev: Certification | null;
  next: Certification | null;
}

const typeConfig = {
  aws:   { color: '#FF9900', bg: 'rgba(255,153,0,0.10)',  border: 'rgba(255,153,0,0.30)',  label: 'Amazon Web Services', icon: <FaAws className="w-12 h-12" />      },
  azure: { color: '#0078D4', bg: 'rgba(0,120,212,0.10)', border: 'rgba(0,120,212,0.30)', label: 'Microsoft Azure',      icon: <FaMicrosoft className="w-12 h-12" /> },
  jlpt:  { color: '#E63946', bg: 'rgba(230,57,70,0.10)', border: 'rgba(230,57,70,0.30)', label: 'Japan Foundation',      icon: <Languages className="w-12 h-12" />  },
};

// cert.type → skill group icon
const certToSkillIcon: Record<string, string> = { aws: 'aws', azure: 'azure' };

export default function CertDetail({ cert, prev, next }: Props) {
  const cfg = typeConfig[cert.type];

  // Related skill group
  const relatedSkillIcon = certToSkillIcon[cert.type];
  const relatedSkillGroup = relatedSkillIcon ? skills.find(g => g.icon === relatedSkillIcon) ?? null : null;

  // Related experience bullets — find bullets mentioning tech relevant to this cert's type
  const typeKeywords: Record<string, string[]> = {
    aws:   ['AWS', 'EC2', 'ECS', 'ECR', 'S3', 'VPC', 'IAM', 'KMS', 'CloudWatch', 'CodePipeline', 'Secrets Manager', 'CodeBuild'],
    azure: ['Azure', 'AKS', 'ACA', 'App Services', 'Key Vault', 'VNet', 'PIM', 'Azure Functions', 'Azure SQL'],
    jlpt:  ['Japan', 'Japanese'],
  };
  const keywords = typeKeywords[cert.type] ?? [];
  const relatedBullets: { company: string; role: string; text: string }[] = [];
  for (const job of experience) {
    for (const bullet of job.bullets) {
      if (keywords.some(kw => bullet.text.includes(kw))) {
        relatedBullets.push({ company: job.company, role: job.role, text: bullet.text });
        if (relatedBullets.length >= 3) break;
      }
    }
    if (relatedBullets.length >= 3) break;
  }

  const skillBadgeCfg: Record<string, { bar: string; color: string; badgeColor: string }> = {
    aws:   { bar: 'linear-gradient(90deg,#FF9900,#FFB84D)', color: '#FF9900', badgeColor: 'rgba(255,153,0,0.10)'  },
    azure: { bar: 'linear-gradient(90deg,#0078D4,#50B0F0)', color: '#0078D4', badgeColor: 'rgba(0,120,212,0.10)' },
  };

  return (
    <div className="min-h-screen">
      {/* Page Hero */}
      <section className="relative pt-28 pb-10 overflow-hidden grid-pattern">
        <div className="absolute top-0 left-1/3 w-96 h-96 rounded-full blur-3xl pointer-events-none opacity-10" style={{ background: cfg.color }} />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
            <Link href="/certifications" className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-accent-blue transition-colors mb-6 group">
              <ChevronLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
              All Certifications
            </Link>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.05 }}>
            <p className="font-mono text-xs tracking-widest uppercase mb-4" style={{ color: cfg.color }}>CREDENTIALS</p>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-text-primary leading-tight mb-5">{cert.name}</h1>
            <div className="flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-2 text-sm text-text-muted bg-card px-3 py-1.5 rounded-lg border border-border">
                <Building2 size={14} />{cert.issuer}
              </span>
              <span className="inline-flex items-center gap-2 text-sm font-mono px-3 py-1.5 rounded-lg" style={{ background: cfg.bg, color: cfg.color, border: `1px solid ${cfg.border}` }}>
                <Calendar size={14} />{cert.year}
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">

          {/* Visual cert card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="rounded-2xl p-8 flex flex-col sm:flex-row items-center gap-8"
            style={{ background: cfg.bg, border: `1px solid ${cfg.border}` }}
          >
            <div style={{ color: cfg.color }} className="flex-shrink-0">{cfg.icon}</div>
            <div>
              <p className="text-text-muted text-xs font-mono mb-1 uppercase tracking-wider">{cfg.label}</p>
              <h2 className="text-xl font-bold text-text-primary mb-2">{cert.name}</h2>
              <p className="text-sm font-mono" style={{ color: cfg.color }}>Issued {cert.year}</p>
            </div>
          </motion.div>

          {/* Description */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.15 }}>
            <h2 className="text-lg font-semibold text-text-primary mb-3">About This Certification</h2>
            <p className="text-text-primary/85 leading-relaxed text-base">{cert.description}</p>
          </motion.div>

          {/* Related Skills */}
          {relatedSkillGroup && skillBadgeCfg[cert.type] && (
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.2 }}>
              <h2 className="text-lg font-semibold text-text-primary mb-4">Related Skills</h2>
              <Link
                href={`/skills/${relatedSkillGroup.icon}`}
                className="block bg-card border border-border rounded-2xl p-5 hover:border-accent-blue/40 transition-colors group"
              >
                <div className="h-1 rounded-full mb-4" style={{ background: skillBadgeCfg[cert.type].bar }} />
                <p className="text-sm font-semibold text-text-primary group-hover:text-accent-blue transition-colors mb-3">
                  {relatedSkillGroup.category}
                </p>
                <div className="flex flex-wrap gap-2">
                  {relatedSkillGroup.skills.map(s => (
                    <span key={s.name} className="text-xs px-2 py-1 rounded font-mono" style={{ background: skillBadgeCfg[cert.type].badgeColor, color: skillBadgeCfg[cert.type].color }}>
                      {s.name}
                    </span>
                  ))}
                </div>
              </Link>
            </motion.div>
          )}

          {/* In Practice */}
          {relatedBullets.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.25 }}>
              <h2 className="text-lg font-semibold text-text-primary mb-4">In Practice</h2>
              <div className="bg-card border border-border rounded-2xl p-6 space-y-5">
                {relatedBullets.map((b, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="text-accent-green mt-1 flex-shrink-0">▹</span>
                    <div>
                      <p className="text-xs font-mono text-text-muted mb-1">{b.company} · {b.role}</p>
                      <p className="text-text-primary/85 text-sm leading-relaxed">{b.text}</p>
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
            transition={{ duration: 0.4, delay: 0.3 }}
            className="flex items-center justify-between pt-4 gap-4 border-t border-border"
          >
            {prev ? (
              <Link href={`/certifications/${prev.slug}`} className="flex items-center gap-2 text-sm text-text-muted hover:text-accent-blue transition-colors group">
                <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
                <div>
                  <p className="text-xs text-text-muted/60 font-mono">Previous</p>
                  <p className="font-medium line-clamp-1">{prev.name}</p>
                </div>
              </Link>
            ) : <div />}
            {next ? (
              <Link href={`/certifications/${next.slug}`} className="flex items-center gap-2 text-sm text-text-muted hover:text-accent-blue transition-colors group text-right">
                <div>
                  <p className="text-xs text-text-muted/60 font-mono">Next</p>
                  <p className="font-medium line-clamp-1">{next.name}</p>
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
