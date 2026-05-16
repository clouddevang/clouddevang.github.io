'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Calendar, Clock } from 'lucide-react';

interface BlogPost {
  slug: string;
  title: string;
  date: string;
  summary: string;
  tags: string[];
  readTime: string;
}

interface Props {
  post: BlogPost;
}

export default function BlogPreviewCard({ post }: Props) {
  const router = useRouter();

  return (
    <motion.div
      whileHover={{ scale: 1.03, y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      onClick={() => router.push(`/blog/${post.slug}`)}
      className="w-72 flex-shrink-0 snap-start bg-card border border-border rounded-2xl p-5 cursor-pointer hover:border-accent-blue/30 transition-colors group flex flex-col"
    >
      {/* Meta */}
      <div className="flex items-center gap-3 text-xs text-text-muted mb-3">
        <span className="flex items-center gap-1">
          <Calendar size={11} />
          {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
        </span>
        <span className="flex items-center gap-1">
          <Clock size={11} />
          {post.readTime}
        </span>
      </div>

      {/* Title */}
      <h3 className="font-bold text-text-primary text-sm leading-snug mb-2 line-clamp-2 group-hover:text-accent-blue transition-colors">
        {post.title}
      </h3>

      {/* Tags */}
      <div className="flex flex-wrap gap-1 mt-auto pt-3">
        {post.tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="px-1.5 py-0.5 text-xs font-mono bg-accent-blue/10 text-accent-blue rounded"
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
