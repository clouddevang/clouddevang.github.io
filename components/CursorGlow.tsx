'use client';

import { useEffect, useRef } from 'react';

export default function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only on desktop / fine-pointer devices
    if (!window.matchMedia('(pointer: fine)').matches) return;

    const el = ref.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      // Use transform (GPU-composited) — no layout recalculation
      el.style.transform = `translate(${e.clientX - 300}px, ${e.clientY - 300}px)`;
      el.style.opacity = '1';
    };

    const onLeave = () => {
      el.style.opacity = '0';
    };

    document.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseleave', onLeave);

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="fixed top-0 left-0 pointer-events-none z-[5] transition-opacity duration-500 opacity-0"
      style={{
        width: 600,
        height: 600,
        borderRadius: '50%',
        background:
          'radial-gradient(circle, rgba(0, 212, 255, 0.05) 0%, rgba(0, 255, 136, 0.02) 40%, transparent 70%)',
        willChange: 'transform',
      }}
    />
  );
}
