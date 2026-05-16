'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { ChevronRight, ChevronLeft } from 'lucide-react';

interface ContentRowProps {
  label: string;
  title: string;
  href: string;
  children: React.ReactNode;
}

const SCROLL_BY = 320;

export default function ContentRow({ label, title, href, children }: ContentRowProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft,  setCanScrollLeft]  = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateArrows = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateArrows();
    el.addEventListener('scroll', updateArrows, { passive: true });
    const ro = new ResizeObserver(updateArrows);
    ro.observe(el);
    return () => {
      el.removeEventListener('scroll', updateArrows);
      ro.disconnect();
    };
  }, [updateArrows]);

  const scroll = (dir: 'left' | 'right') => {
    scrollRef.current?.scrollBy({ left: dir === 'left' ? -SCROLL_BY : SCROLL_BY, behavior: 'smooth' });
  };

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
          <div className="flex items-center gap-3">
            {/* Arrow buttons */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => scroll('left')}
                disabled={!canScrollLeft}
                aria-label="Scroll left"
                className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-200 ${
                  canScrollLeft
                    ? 'border-border bg-card text-text-primary hover:border-accent-blue hover:text-accent-blue hover:bg-accent-blue/10'
                    : 'border-border/30 bg-card/30 text-text-muted/30 cursor-not-allowed'
                }`}
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={() => scroll('right')}
                disabled={!canScrollRight}
                aria-label="Scroll right"
                className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-200 ${
                  canScrollRight
                    ? 'border-border bg-card text-text-primary hover:border-accent-blue hover:text-accent-blue hover:bg-accent-blue/10'
                    : 'border-border/30 bg-card/30 text-text-muted/30 cursor-not-allowed'
                }`}
              >
                <ChevronRight size={16} />
              </button>
            </div>

            <Link
              href={href}
              className="flex items-center gap-1 text-sm text-accent-blue hover:text-accent-green transition-colors font-medium group"
            >
              See All
              <ChevronRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Horizontal scroll container */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory -mx-4 px-4"
        >
          {children}
        </div>
      </div>
    </section>
  );
}
