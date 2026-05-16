// filepath: components/Hero.tsx
'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Download, Zap, Award, Cloud } from 'lucide-react';
import { personal, roles } from '@/data/resume';

const floatingChips = [
  { text: 'Kubernetes', top: '22%', left: '6%',  delay: '0s',    color: '#326CE5' },
  { text: 'Terraform',  top: '16%', left: '76%', delay: '-3s',   color: '#8B5CF6' },
  { text: 'Docker',     top: '68%', left: '4%',  delay: '-1.5s', color: '#2496ED' },
  { text: 'Azure',      top: '72%', left: '78%', delay: '-4s',   color: '#0078D4' },
  { text: 'Datadog',    top: '44%', left: '87%', delay: '-2s',   color: '#9333EA' },
  { text: 'Python',     top: '42%', left: '2%',  delay: '-5s',   color: '#3776AB' },
  { text: 'Helm',       top: '30%', left: '82%', delay: '-1s',   color: '#277A9F' },
  { text: 'Linkerd',    top: '55%', left: '4%',  delay: '-3.5s', color: '#2BEDA7' },
];

export default function Hero() {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[currentRoleIndex];
    let timeout: NodeJS.Timeout;

    if (!isDeleting) {
      if (displayedText.length < currentRole.length) {
        timeout = setTimeout(() => {
          setDisplayedText(currentRole.slice(0, displayedText.length + 1));
        }, 100);
      } else {
        timeout = setTimeout(() => setIsDeleting(true), 2000);
      }
    } else {
      if (displayedText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayedText(displayedText.slice(0, -1));
        }, 50);
      } else {
        setIsDeleting(false);
        setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, currentRoleIndex]);

  const scrollToProjects = () => {
    const element = document.getElementById('projects');
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Grid Background */}
      <div className="absolute inset-0 grid-pattern opacity-40" />

      {/* Gradient Orbs */}
      <div className="hidden md:block absolute top-1/4 left-1/4 w-96 h-96 bg-accent-blue/20 rounded-full blur-[128px] animate-float" />
      <div className="hidden md:block absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-green/15 rounded-full blur-[128px] animate-float-delayed" />
      <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-purple-500/10 rounded-full blur-[96px] animate-float" style={{ animationDelay: '-2s' }} />

      {/* Floating Tech Chips — desktop only */}
      <div className="hidden lg:block pointer-events-none select-none">
        {floatingChips.map((chip) => (
          <div
            key={chip.text}
            className="absolute animate-float text-xs font-mono px-3 py-1.5 rounded-full border backdrop-blur-sm whitespace-nowrap"
            style={{
              top: chip.top,
              left: chip.left,
              borderColor: chip.color + '55',
              color: chip.color,
              background: chip.color + '18',
              animationDelay: chip.delay,
              animationDuration: '7s',
            }}
          >
            {chip.text}
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

        {/* Status Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-6"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent-green/40 bg-accent-green/10 text-accent-green text-sm font-mono">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-green opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-green" />
            </span>
            Available for opportunities
          </span>
        </motion.div>

        {/* Greeting */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-accent-green font-mono text-sm sm:text-base mb-3 tracking-widest"
        >
          HELLO, I&apos;M
        </motion.p>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-5xl sm:text-7xl lg:text-8xl font-bold mb-5 tracking-tight"
        >
          <span className="gradient-text">{personal.name}</span>
        </motion.h1>

        {/* Typewriter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-xl sm:text-2xl lg:text-3xl text-text-muted mb-6 h-10 flex items-center justify-center"
        >
          <span className="text-accent-blue font-mono">
            {displayedText}
            <span className="typewriter-cursor" />
          </span>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-text-muted text-base sm:text-lg max-w-xl mx-auto mb-10"
        >
          {personal.tagline}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
        >
          <button onClick={scrollToProjects} className="btn-primary flex items-center gap-2 group px-8">
            View My Work
            <ArrowDown size={18} className="group-hover:translate-y-1 transition-transform" />
          </button>
          <a href="/Devang_Goyal_Resume_v4.pdf" download className="btn-secondary flex items-center gap-2 group px-8">
            <Download size={18} className="group-hover:scale-110 transition-transform" />
            Download Resume
          </a>
        </motion.div>

        {/* Mini Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex items-center justify-center gap-8 sm:gap-12 pt-8 border-t border-border/50"
        >
          <div className="flex items-center gap-2">
            <Zap size={16} className="text-accent-blue flex-shrink-0" />
            <div className="text-left">
              <div className="text-lg font-bold text-text-primary leading-none">5+</div>
              <div className="text-xs text-text-muted mt-0.5">Yrs Exp</div>
            </div>
          </div>
          <div className="w-px h-8 bg-border" />
          <div className="flex items-center gap-2">
            <Award size={16} className="text-accent-green flex-shrink-0" />
            <div className="text-left">
              <div className="text-lg font-bold text-text-primary leading-none">7</div>
              <div className="text-xs text-text-muted mt-0.5">Certs</div>
            </div>
          </div>
          <div className="w-px h-8 bg-border" />
          <div className="flex items-center gap-2">
            <Cloud size={16} className="text-purple-400 flex-shrink-0" />
            <div className="text-left">
              <div className="text-lg font-bold text-text-primary leading-none">2</div>
              <div className="text-xs text-text-muted mt-0.5">Clouds</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-text-muted/40 rounded-full flex justify-center p-2">
          <div className="w-1.5 h-1.5 bg-accent-blue rounded-full" />
        </div>
      </motion.div>
    </section>
  );
}
