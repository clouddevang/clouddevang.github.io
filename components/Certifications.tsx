// filepath: components/Certifications.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { certifications } from '@/data/resume';
import { Award, Languages } from 'lucide-react';
import { FaAws, FaMicrosoft } from 'react-icons/fa';

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
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4 },
  },
};

const typeStyles = {
  aws: {
    borderColor: 'border-aws-orange/50',
    iconBg: 'bg-aws-orange/10',
    iconColor: 'text-aws-orange',
    icon: <FaAws className="w-6 h-6" />,
    hoverBorder: 'rgba(255,153,0,0.8)',
    hoverShadow: '0 0 28px rgba(255,153,0,0.25), 0 8px 24px rgba(0,0,0,0.3)',
    hoverIconBg: 'rgba(255,153,0,0.2)',
  },
  azure: {
    borderColor: 'border-azure-blue/50',
    iconBg: 'bg-azure-blue/10',
    iconColor: 'text-azure-blue',
    icon: <FaMicrosoft className="w-6 h-6" />,
    hoverBorder: 'rgba(0,120,212,0.8)',
    hoverShadow: '0 0 28px rgba(0,120,212,0.25), 0 8px 24px rgba(0,0,0,0.3)',
    hoverIconBg: 'rgba(0,120,212,0.2)',
  },
  jlpt: {
    borderColor: 'border-jlpt-red/50',
    iconBg: 'bg-jlpt-red/10',
    iconColor: 'text-jlpt-red',
    icon: <Languages className="w-6 h-6" />,
    hoverBorder: 'rgba(230,57,70,0.8)',
    hoverShadow: '0 0 28px rgba(230,57,70,0.25), 0 8px 24px rgba(0,0,0,0.3)',
    hoverIconBg: 'rgba(230,57,70,0.2)',
  },
};

export default function Certifications() {
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);
  return (
    <section id="certifications" className="pt-6 pb-16 sm:pt-8 sm:pb-20 bg-card/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <p className="text-accent-green font-mono text-sm mb-2 tracking-wider flex items-center justify-center gap-3">
              <span className="opacity-50">06 ────</span> CREDENTIALS <span className="opacity-50">────</span>
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
              Professional <span className="gradient-text">Certifications</span>
            </h2>
          </motion.div>

          {/* Certifications Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {certifications.map((cert, index) => {
              const styles = typeStyles[cert.type];
              const isHovered = hoveredIndex === index;

              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.03, y: -3 }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className={`bg-card border-2 ${styles.borderColor} rounded-xl p-5 flex items-center gap-4 transition-all duration-300 cursor-default`}
                  style={{
                    borderColor: isHovered ? styles.hoverBorder : undefined,
                    boxShadow: isHovered ? styles.hoverShadow : undefined,
                  }}
                >
                  <motion.div
                    animate={isHovered ? { scale: 1.2, rotate: -8 } : { scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    className={`p-3 rounded-lg ${styles.iconColor} ${styles.iconBg} flex-shrink-0 transition-colors duration-300`}
                    style={{ background: isHovered ? styles.hoverIconBg : undefined }}
                  >
                    {styles.icon}
                  </motion.div>
                  <div className="min-w-0">
                    <h3 className="text-sm sm:text-base font-semibold text-text-primary">
                      {cert.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-text-muted font-mono mt-1">
                      {cert.year}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
