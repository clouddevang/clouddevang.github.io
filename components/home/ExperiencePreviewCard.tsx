'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Calendar, MapPin } from 'lucide-react';
import type { Experience } from '@/data/resume';

interface Props {
  job: Experience;
  index: number;
}

export default function ExperiencePreviewCard({ job, index }: Props) {
  const router = useRouter();
  // Find first bullet that has metrics and extract first metric
  const highlightBullet = job.bullets.find((b) => b.metrics && b.metrics.length > 0);
  const metric = highlightBullet?.metrics?.[0];

  return (
    <motion.div
      whileHover={{ scale: 1.03, y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      onClick={() => router.push(`/experience#job-${index}`)}
      className="w-72 flex-shrink-0 snap-start bg-card border border-border rounded-2xl p-5 cursor-pointer hover:border-accent-blue/40 transition-colors group"
    >
      {/* Company */}
      <div className="mb-3">
        <h3 className="text-accent-blue font-bold text-base truncate">{job.company}</h3>
        <p className="text-text-primary text-sm font-medium mt-0.5 line-clamp-1">{job.role}</p>
      </div>

      {/* Date & Location */}
      <div className="flex flex-col gap-1 mb-4">
        <span className="flex items-center gap-1.5 text-xs text-accent-green font-mono">
          <Calendar size={12} />
          {job.startDate} – {job.endDate}
        </span>
        <span className="flex items-center gap-1.5 text-xs text-text-muted">
          <MapPin size={12} />
          {job.location}
        </span>
      </div>

      {/* Highlight metric */}
      {metric && (
        <div className="mt-auto pt-3 border-t border-border/60">
          <span className="text-xs text-text-muted">Key impact: </span>
          <span className="text-xs font-bold text-accent-green">{metric}</span>
        </div>
      )}

      {/* Hover CTA */}
      <p className="text-xs text-accent-blue/0 group-hover:text-accent-blue/80 transition-colors mt-2 font-mono">
        View full history →
      </p>
    </motion.div>
  );
}
