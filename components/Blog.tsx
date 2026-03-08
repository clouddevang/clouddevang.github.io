// filepath: components/Blog.tsx
'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

// Static blog data for homepage preview
const blogPosts = [
  {
    slug: 'zero-trust-azure',
    title: 'Building Zero-Trust Infrastructure on Azure: A Production Story',
    date: '2024-12-15',
    summary:
      'How we redesigned our entire backend infrastructure with VNet integration, private endpoints, and RBAC-enforced Key Vault access to achieve true zero-trust architecture.',
    tags: ['Azure', 'Security', 'SRE'],
    readTime: '8 min read',
  },
  {
    slug: 'keda-vs-azure-functions',
    title: 'KEDA vs Azure Functions: Choosing the Right Autoscaler',
    date: '2024-11-28',
    summary:
      'A deep dive into when to use Azure Container Apps with KEDA versus Azure Functions for event-driven scaling, based on real performance benchmarks.',
    tags: ['Kubernetes', 'Azure', 'DevOps'],
    readTime: '6 min read',
  },
  {
    slug: 'opentelemetry-in-practice',
    title: 'OpenTelemetry in Practice: Vendor-Agnostic Observability at Scale',
    date: '2024-11-10',
    summary:
      'Implementing distributed traces, metrics, and structured logs using the OTel SDK while maintaining flexibility to switch observability backends.',
    tags: ['Observability', 'OTel', 'Datadog'],
    readTime: '10 min read',
  },
];

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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export default function Blog() {
  const router = useRouter();

  return (
    <section id="blog" className="py-20 sm:py-32">
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
              INSIGHTS
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
              Latest <span className="gradient-text">Blog Posts</span>
            </h2>
            <p className="text-text-muted mt-4 max-w-2xl mx-auto">
              Sharing knowledge from real-world production experience
            </p>
          </motion.div>

          {/* Blog Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post) => (
              <motion.article
                key={post.slug}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                onClick={() => router.push(`/blog/${post.slug}`)}
                className="bg-card border border-border rounded-2xl p-6 card-hover group flex flex-col h-full cursor-pointer"
              >
                {/* Meta */}
                <div className="flex items-center gap-4 text-sm text-text-muted mb-4">
                  <span className="flex items-center gap-1">
                    <Calendar size={14} />
                    {new Date(post.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={14} />
                    {post.readTime}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-text-primary mb-3 group-hover:text-accent-blue transition-colors line-clamp-2">
                  {post.title}
                </h3>

                {/* Summary */}
                <p className="text-text-muted text-sm leading-relaxed mb-4 flex-grow line-clamp-3">
                  {post.summary}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-xs font-mono bg-accent-blue/10 text-accent-blue rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Read More */}
                <span className="inline-flex items-center gap-2 text-accent-green font-medium text-sm group-hover:gap-3 transition-all">
                  Read Article
                  <ArrowRight
                    size={16}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </span>
              </motion.article>
            ))}
          </div>

          {/* View All Link */}
          <motion.div variants={itemVariants} className="text-center mt-12">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 btn-secondary"
            >
              View All Posts
              <ArrowRight size={18} />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
