// filepath: components/Certifications.tsx
'use client';

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
  },
  azure: {
    borderColor: 'border-azure-blue/50',
    iconBg: 'bg-azure-blue/10',
    iconColor: 'text-azure-blue',
    icon: <FaMicrosoft className="w-6 h-6" />,
  },
  jlpt: {
    borderColor: 'border-jlpt-red/50',
    iconBg: 'bg-jlpt-red/10',
    iconColor: 'text-jlpt-red',
    icon: <Languages className="w-6 h-6" />,
  },
};

export default function Certifications() {
  return (
    <section id="certifications" className="py-20 sm:py-32 bg-card/30">
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
              CREDENTIALS
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
              Professional <span className="gradient-text">Certifications</span>
            </h2>
          </motion.div>

          {/* Certifications Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {certifications.map((cert, index) => {
              const styles = typeStyles[cert.type];

              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  className={`bg-card border-2 ${styles.borderColor} rounded-xl p-5 flex items-center gap-4 transition-all duration-300 hover:shadow-lg`}
                >
                  <div
                    className={`p-3 rounded-lg ${styles.iconBg} ${styles.iconColor} flex-shrink-0`}
                  >
                    {styles.icon}
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm sm:text-base font-semibold text-text-primary truncate">
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
