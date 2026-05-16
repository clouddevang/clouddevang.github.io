// filepath: components/Navbar.tsx
'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';

const navLinks = [
  { href: '#about',          label: 'About'          },
  { href: '#skills',         label: 'Skills'         },
  { href: '#experience',     label: 'Experience'     },
  { href: '#projects',       label: 'Projects'       },
  { href: '#education',      label: 'Education'      },
  { href: '#certifications', label: 'Certifications' },
  { href: '#blog',           label: 'Blog'           },
  { href: '#contact',        label: 'Contact'        },
];

// Walk the offsetParent chain to get the element's absolute top position.
// getBoundingClientRect() includes CSS transforms (framer-motion initial y:20
// shifts it), so it gives the wrong scroll target. offsetTop does not.
function getAbsoluteTop(element: HTMLElement): number {
  let top = 0;
  let el: HTMLElement | null = element;
  while (el) {
    top += el.offsetTop;
    el = el.offsetParent as HTMLElement | null;
  }
  return top;
}

// Smooth scroll to section in 480ms (easeOutCubic), navbar-aware.
function scrollToSection(element: HTMLElement) {
  const NAVBAR = 72;
  const target = Math.max(0, getAbsoluteTop(element) - NAVBAR);
  const start  = window.scrollY;
  const dist   = target - start;
  const dur    = 480;
  let t0: number | null = null;
  const ease = (t: number) => 1 - Math.pow(1 - t, 3);
  function step(now: number) {
    if (!t0) t0 = now;
    const t = Math.min((now - t0) / dur, 1);
    window.scrollTo(0, start + dist * ease(t));
    if (t < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

export default function Navbar() {
  const [isScrolled,       setIsScrolled]       = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection,    setActiveSection]    = useState('');
  const pathname = usePathname();
  const router   = useRouter();

  // After a full-page reload to '/', read sessionStorage and scroll to target
  // once React + framer-motion have settled (500ms is enough).
  useEffect(() => {
    if (pathname !== '/') return;
    const target = sessionStorage.getItem('scrollTarget');
    if (!target) return;
    sessionStorage.removeItem('scrollTarget');

    let attempts = 0;
    let timer: ReturnType<typeof setTimeout>;

    const tryScroll = () => {
      const el = document.getElementById(target);
      if (el) {
        scrollToSection(el);
      } else if (attempts < 10) {
        attempts++;
        timer = setTimeout(tryScroll, 100);
      }
    };

    // Small delay so React has painted the home page before we scroll.
    timer = setTimeout(tryScroll, 80);
    return () => clearTimeout(timer);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = navLinks
        .filter(l => l.href.startsWith('#'))
        .map(l => l.href.slice(1));

      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 100) {
          setActiveSection(id);
          break;
        }
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    if (!href.startsWith('#')) return;

    if (pathname === '/') {
      const el = document.getElementById(href.slice(1));
      if (el) scrollToSection(el);
    } else {
      // Client-side nav with scroll:false keeps the viewport in place
      // (no flash of page-top). The useEffect polls for the element
      // and scrolls once the home page has rendered.
      sessionStorage.setItem('scrollTarget', href.slice(1));
      router.push('/', { scroll: false });
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-background/80 navbar-blur border-b border-border'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-1 text-xl font-bold">
              <span className="text-accent-blue">&lt;</span>
              <span className="text-text-primary">DG</span>
              <span className="text-accent-blue">/&gt;</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => {
                const id = link.href.slice(1);
                const isActive =
                  (activeSection === id && pathname === '/') ||
                  (id === 'blog' && pathname.startsWith('/blog'));
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={(e) => {
                      if (link.href.startsWith('#')) {
                        e.preventDefault();
                        handleNavClick(link.href);
                      }
                    }}
                    className={`text-sm font-medium transition-colors duration-200 relative ${
                      isActive ? 'text-accent-blue' : 'text-text-muted hover:text-text-primary'
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <motion.div
                        layoutId="activeSection"
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-accent-blue"
                      />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-text-primary hover:text-accent-blue transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-16 z-40 md:hidden bg-background/95 navbar-blur border-b border-border"
          >
            <div className="px-4 py-4 space-y-2">
              {navLinks.map((link) => {
                const id = link.href.slice(1);
                const isActive =
                  (activeSection === id && pathname === '/') ||
                  (id === 'blog' && pathname.startsWith('/blog'));
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={(e) => {
                      if (link.href.startsWith('#')) e.preventDefault();
                      handleNavClick(link.href);
                    }}
                    className={`block py-3 px-4 rounded-lg text-base font-medium transition-colors ${
                      isActive
                        ? 'bg-accent-blue/10 text-accent-blue'
                        : 'text-text-muted hover:bg-card hover:text-text-primary'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
