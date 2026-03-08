// filepath: app/blog/page.tsx
import { Metadata } from 'next';
import Link from 'next/link';
import { getAllPosts } from '@/lib/mdx';
import { Calendar, Clock, ArrowRight, ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Blog | Devang Goyal',
  description:
    'Technical articles on SRE, DevOps, Cloud Engineering, Azure, AWS, Kubernetes, and Infrastructure as Code.',
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-text-muted hover:text-accent-blue transition-colors mb-8"
        >
          <ArrowLeft size={16} />
          Back to Home
        </Link>

        {/* Header */}
        <div className="mb-12">
          <p className="text-accent-green font-mono text-sm mb-2 tracking-wider">
            INSIGHTS
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="gradient-text">Blog</span>
          </h1>
          <p className="text-text-muted text-lg">
            Technical articles and insights from real-world production experience
            in SRE, DevOps, and Cloud Engineering.
          </p>
        </div>

        {/* Posts List */}
        <div className="space-y-6">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="bg-card border border-border rounded-2xl p-6 sm:p-8 card-hover group"
            >
              {/* Meta */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-text-muted mb-4">
                <span className="flex items-center gap-1">
                  <Calendar size={14} />
                  {new Date(post.date).toLocaleDateString('en-US', {
                    month: 'long',
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
              <Link href={`/blog/${post.slug}`}>
                <h2 className="text-xl sm:text-2xl font-bold text-text-primary mb-3 group-hover:text-accent-blue transition-colors">
                  {post.title}
                </h2>
              </Link>

              {/* Summary */}
              <p className="text-text-muted leading-relaxed mb-4">
                {post.summary}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 text-xs font-mono bg-accent-blue/10 text-accent-blue rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Read More Link */}
              <Link
                href={`/blog/${post.slug}`}
                className="inline-flex items-center gap-2 text-accent-green font-medium text-sm group/link hover:gap-3 transition-all"
              >
                Read Article
                <ArrowRight
                  size={16}
                  className="group-hover/link:translate-x-1 transition-transform"
                />
              </Link>
            </article>
          ))}
        </div>

        {posts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-text-muted text-lg">
              No blog posts yet. Check back soon!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
