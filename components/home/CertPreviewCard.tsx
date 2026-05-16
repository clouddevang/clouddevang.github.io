'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Languages } from 'lucide-react';
import { FaAws, FaMicrosoft } from 'react-icons/fa';
import type { Certification } from '@/data/resume';

interface Props {
  cert: Certification;
}

const typeConfig = {
  aws:   { color: '#FF9900', bg: 'rgba(255,153,0,0.12)',  border: 'rgba(255,153,0,0.3)',  icon: <FaAws className="w-6 h-6" />        },
  azure: { color: '#0078D4', bg: 'rgba(0,120,212,0.12)', border: 'rgba(0,120,212,0.3)', icon: <FaMicrosoft className="w-6 h-6" />  },
  jlpt:  { color: '#E63946', bg: 'rgba(230,57,70,0.12)', border: 'rgba(230,57,70,0.3)', icon: <Languages className="w-6 h-6" />   },
};

export default function CertPreviewCard({ cert }: Props) {
  const router = useRouter();
  const cfg = typeConfig[cert.type];

  return (
    <motion.div
      whileHover={{ scale: 1.03, y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      onClick={() => router.push('/certifications')}
      className="w-56 flex-shrink-0 snap-start bg-card rounded-2xl p-4 cursor-pointer hover:border-white/20 transition-colors flex flex-col items-center text-center"
      style={{ border: `1px solid ${cfg.border}` }}
    >
      {/* Icon */}
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center mb-3"
        style={{ background: cfg.bg, color: cfg.color }}
      >
        {cfg.icon}
      </div>

      {/* Name */}
      <p className="text-text-primary text-xs font-semibold line-clamp-2 leading-snug mb-2">
        {cert.name}
      </p>

      {/* Year */}
      <span
        className="text-xs font-mono mt-auto"
        style={{ color: cfg.color }}
      >
        {cert.year}
      </span>
    </motion.div>
  );
}
