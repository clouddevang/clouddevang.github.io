'use client';

import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface ContentRowProps {
  label: string;
  title: string;
  href: string;
  children: React.ReactNode;
}

export default function ContentRow({ label, title, href, children }: ContentRowProps) {
  return (
    <section className="py-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Row Header */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-baseline gap-3">
            <span className="font-mono text-xs text-accent-green tracking-widest uppercase">
              {label}
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-text-primary">{title}</h2>
          </div>
          <Link
            href={href}
            className="flex items-center gap-1 text-sm text-accent-blue hover:text-accent-green transition-colors font-medium group"
          >
            See All
            <ChevronRight
              size={16}
              className="group-hover:translate-x-0.5 transition-transform"
            />
          </Link>
        </div>

        {/* Horizontal scroll container */}
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory -mx-4 px-4">
          {children}
        </div>
      </div>
    </section>
  );
}
