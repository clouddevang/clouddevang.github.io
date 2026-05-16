// filepath: components/About.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { personal, stats } from '@/data/resume';
import { ShieldCheck, Cloud, GitBranch, Award, Zap, DollarSign } from 'lucide-react';

function AnimatedCounter({ value, suffix = '', prefix = '' }: { value: string; suffix?: string; prefix?: string }) {
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
      if (current >= numericValue) { setCount(numericValue); clearInterval(timer); }
      else setCount(Math.floor(current));
    }, duration / steps);
    return () => clearInterval(timer);
  }, [isInView, numericValue]);

  const formattedCount = numericValue >= 1000 ? count.toLocaleString() : count.toString();
  return <span ref={ref}>{prefix}{isInView ? formattedCount : '0'}{suffix}</span>;
}

const specialties = [
  {
    icon: <ShieldCheck className="w-6 h-6" />,
    title: 'Site Reliability Engineering',
    desc: 'Zero-downtime deployments, incident response, SLO/SLI frameworks and MTTR reduction across mission-critical platforms.',
    color: '#00D4FF',
    bg: 'rgba(0,212,255,0.07)',
    border: 'rgba(0,212,255,0.2)',
  },
  {
    icon: <Cloud className="w-6 h-6" />,
    title: 'Cloud Architecture',
    desc: 'Multi-cloud on Azure and AWS — zero-trust VNet design, private endpoints, IAM least-privilege, sustained cost optimisation.',
    color: '#8B5CF6',
    bg: 'rgba(139,92,246,0.07)',
    border: 'rgba(139,92,246,0.2)',
  },
  {
    icon: <GitBranch className="w-6 h-6" />,
    title: 'Platform Engineering',
    desc: 'Terraform IaC, Kubernetes lifecycle management, CI/CD pipelines and developer tooling that ships reliably and fast.',
    color: '#00FF88',
    bg: 'rgba(0,255,136,0.07)',
    border: 'rgba(0,255,136,0.2)',
  },
];

const statConfig = [
  { icon: <Zap className="w-5 h-5" />,        gradient: 'from-accent-blue/15 to-cyan-400/5',    border: 'border-accent-blue/25',  iconColor: 'text-accent-blue',  iconBg: 'bg-accent-blue/10'  },
  { icon: <Award className="w-5 h-5" />,       gradient: 'from-purple-500/15 to-pink-500/5',     border: 'border-purple-500/25',   iconColor: 'text-purple-400',   iconBg: 'bg-purple-500/10'   },
  { icon: <Cloud className="w-5 h-5" />,       gradient: 'from-accent-green/15 to-emerald-400/5',border: 'border-accent-green/25', iconColor: 'text-accent-green', iconBg: 'bg-accent-green/10' },
  { icon: <DollarSign className="w-5 h-5" />,  gradient: 'from-orange-500/15 to-yellow-400/5',   border: 'border-orange-500/25',   iconColor: 'text-orange-400',   iconBg: 'bg-orange-500/10'   },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function About() {
  const paragraphs = personal.summary.split('. ').reduce(
    (acc, sentence, i, arr) => {
      if (i < arr.length / 2) acc[0] += sentence + '. ';
      else acc[1] += sentence + '. ';
      return acc;
    },
    ['', '']
  );

  return (
    <section id="about" className="pt-6 pb-16 sm:pt-8 sm:pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }}>

          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <p className="text-accent-green font-mono text-sm mb-2 tracking-wider flex items-center justify-center gap-3"><span className="opacity-50">01 ────</span> INTRODUCTION <span className="opacity-50">────</span></p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
              About <span className="gradient-text">Me</span>
            </h2>
          </motion.div>

          {/* Avatar + Bio */}
          <div className="grid lg:grid-cols-3 gap-12 items-center mb-16">
            <motion.div variants={itemVariants} className="flex justify-center lg:justify-end">
              <div className="relative">
                <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-full bg-gradient-to-br from-accent-blue to-accent-green p-1">
                  <div className="w-full h-full rounded-full bg-card flex items-center justify-center">
                    <span className="text-5xl sm:text-6xl font-bold gradient-text">DG</span>
                  </div>
                </div>
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-accent-blue/30 to-accent-green/30 blur-2xl -z-10" />
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="lg:col-span-2 space-y-5">
              <p className="text-text-primary/90 text-base sm:text-lg leading-relaxed">{paragraphs[0]}</p>
              <p className="text-text-primary/90 text-base sm:text-lg leading-relaxed">{paragraphs[1]}</p>
            </motion.div>
          </div>

          {/* What I Do */}
          <motion.div variants={itemVariants} className="mb-16">
            <p className="text-accent-green font-mono text-sm tracking-wider text-center mb-8">WHAT I DO</p>
            <div className="grid sm:grid-cols-3 gap-5">
              {specialties.map((s) => (
                <div
                  key={s.title}
                  className="specialty-card rounded-2xl p-6 border"
                  style={{ background: s.bg, borderColor: s.border }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: s.color + '20', color: s.color }}
                  >
                    {s.icon}
                  </div>
                  <h3 className="font-bold text-text-primary mb-2">{s.title}</h3>
                  <p className="text-text-muted text-sm leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Stats — unique colour per card */}
          <motion.div variants={itemVariants} className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {stats.map((stat, index) => {
              const cfg = statConfig[index];
              return (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.04, y: -4 }}
                  className={`bg-gradient-to-br ${cfg.gradient} border ${cfg.border} rounded-2xl p-6 text-center transition-all duration-300`}
                >
                  <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl ${cfg.iconBg} ${cfg.iconColor} mb-3`}>
                    {cfg.icon}
                  </div>
                  <div className="text-3xl sm:text-4xl font-bold gradient-text mb-1">
                    <AnimatedCounter
                      value={stat.value}
                      suffix={stat.suffix || ''}
                      prefix={stat.label === 'Cost Savings' ? '$' : ''}
                    />
                  </div>
                  <p className="text-text-muted text-sm">{stat.label}</p>
                </motion.div>
              );
            })}
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
